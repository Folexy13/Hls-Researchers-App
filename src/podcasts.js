import { useState, useEffect } from "react";
import { Upload, Button, List, Modal, Form, Input } from "antd";
import axios from "axios";
import {
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";

const apiBaseUrl = "https://hlsnigeria.com.ng"; 
const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("authToken") || "",
  },
});

function Podcasts() {
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await api.get(`${apiBaseUrl}/podcasts/`);
        setFileList(response.data);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };

    fetchPodcasts();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    const authToken = localStorage.getItem("authToken") || "";
    const decoded = jwtDecode(authToken);
    form.validateFields().then(async (values) => {
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("user", decoded.user_id);
        formData.append("audio_file", values.audioFile?.[0].originFileObj);
        if (values.thumbnail) {
          formData.append("thumbnail", values.thumbnail);
        }

        await api.post(`${apiBaseUrl}/podcasts/`, formData);

        const response = await api.get(`${apiBaseUrl}/podcasts/`);
        setFileList(response.data);

        form.resetFields();
        setIsModalVisible(false);
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false);
      }
    });
  };

  const handleModalCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleDelete = async (file) => {
    try {
      await api.delete(`${apiBaseUrl}/podcasts/${file.id}/`);
      const response = await api.get(`${apiBaseUrl}/podcasts/`);
      setFileList(response.data);
    } catch (error) {
      console.error("Error deleting podcast:", error);
    }
  };

  const handleEdit = (file) => {
    setCurrentFile(file);
    setIsModalVisible(true);
    form.setFieldsValue({
      title: file.title,
      description: file.description,
      thumbnail: file.thumbnail,
      audioFile: file.audio_file ? [file.audio_file] : [],
    });
  };

  const captureThumbnail = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      video.src = URL.createObjectURL(file);
      video.addEventListener("loadedmetadata", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.currentTime = 1;
      });

      video.addEventListener("seeked", () => {
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnail = canvas.toDataURL("image/jpeg");
          resolve(thumbnail);
        } else {
          reject(new Error("Canvas context not available"));
        }
      });

      video.addEventListener("error", (error) => {
        reject(error);
      });
    });
  };

  const handleAudioUpload = async (file) => {
    try {
      const thumbnail = await captureThumbnail(file);
      form.setFieldsValue({
        thumbnail,
      });
      return false;
    } catch (error) {
      console.error("Error capturing thumbnail:", error);
      return false;
    }
  };

  const filteredPodcasts = fileList.filter((file) =>
    file.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen sm:block flex items-center justify-center bg-gray-100 p-4">
      <div className="md:max-w-7xl w-11/12 mx-auto">
        

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Podcasts</h1>

          <Input
            placeholder="Search podcasts..."
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-6"
          />

          {filteredPodcasts.length > 0 ? (
            <List
              className="mt-4"
              bordered
              dataSource={filteredPodcasts}
              renderItem={(file) => (
                <List.Item>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4">
                      {file.thumbnail && (
                        <img
                          src={file.thumbnail}
                          alt="Thumbnail"
                          className="w-10 h-10 sm:w-24 sm:h-16 object-cover rounded"
                        />
                      )}
                      <div>
                        <h3 className="font-bold">{file.title}</h3>
                        <p className="text-sm text-gray-600">
                          {file.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(file)}
                      />
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(file)}
                      />
                    </div>
                  </div>
                </List.Item>
              )}
            />
          ) : (
            <p className="text-center text-gray-500">No podcasts found.</p>
          )}

          <div className="mt-6">
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={showModal}
            >
              Add Podcast
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title={currentFile ? "Edit Podcast" : "Add Podcast"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleModalOk}
          >
            {currentFile ? "Update" : "Add"}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="audioFile"
            label="Audio File"
            rules={[
              { required: true, message: "Please upload an audio file!" },
            ]}
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload
              beforeUpload={handleAudioUpload}
              accept="video/*"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload Audio</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="thumbnail" hidden>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Podcasts;