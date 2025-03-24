import React, { useState } from "react";
import thumbnails from "../../data/thumbnails";

function Gallery(props) {
  const [selectedThumbnails, setSelectedThumbnails] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);

  // const addTN = (tn) => {
  //   localStorage.setItem("thumbnails", JSON.stringify(tn));
  //   setSelectedThumbnails([]);
  // };

const handleAddSupplement = () => {
  const selectedSupplementNames = Object.values(
    selectedThumbnails[props.currentSection]
  );
  console.log(selectedSupplementNames);
  props.setSelectedSupplements((prevSelectedSupplements) => ({
    ...prevSelectedSupplements,
    [props.currentSection]: selectedSupplementNames,
  }));
  console.log(props.selectedSupplements);
  props.toggleGallery(props.backToSelectSupp(2));
};
  


  const handleThumbnailClick = (index) => {
    const newSelectedThumbnails = { ...selectedThumbnails };
    if (!newSelectedThumbnails[props.currentSection]) {
      newSelectedThumbnails[props.currentSection] = {};
    }
    if (newSelectedThumbnails[props.currentSection][index]) {
      delete newSelectedThumbnails[props.currentSection][index];
    } else {
      newSelectedThumbnails[props.currentSection][index] =
        thumbnails[index].supplementName;
    }
    setSelectedThumbnails(newSelectedThumbnails);
  };
  
  
  const handleShowOverlay = () => {
    setShowOverlay(!showOverlay);
  }
  
  
  
  return (
    <div
      className={props.toggleContent === 3 ? "gallery active" : "gallery"}
      id="gallery"
    >
      {Object.keys(selectedThumbnails).length > 0 && (
        <button onClick={handleShowOverlay} className="show-selected-items">
          Show Selected Items
        </button>
      )}

      {showOverlay && (
        <div className="overlay" onClick={() => setShowOverlay(false)}>
          <div>
            <ul id="selected-gallery-items">
              <h2>Selected Supplements</h2>
              {selectedThumbnails &&
                Object.keys(selectedThumbnails).length > 0 &&
                Object.values(selectedThumbnails[props.currentSection]).map(
                  (supplementName, index) => (
                    <li key={index}>{supplementName}</li>
                  )
                )}
              <button
                id="add-selected-supplements-button"
                onClick={handleAddSupplement}
              >
                {" "}
                Add Supplements
              </button>
            </ul>
          </div>
        </div>
      )}

      <p>Filter by:</p>
      <div className="supplement-filter-bar">
        <div className="category_filter">
          <select id="category_filter_list" name="category-filter">
            <option value="">All Supplements</option>
            <option value="vitamins">by age</option>
            <option value="minerals">by Gender</option>
            <option value="herbal-supplements">by Lifetyle</option>
            <option value="protein-powders">by Health Benefits</option>
            <option value="amino-acids">by Price</option>
          </select>
        </div>
        <div className="sub-category_filter">
          <select id="sub-category_filter_list" name="sub-category-filter">
            <option value="">All Supplements</option>
            <option value="vitamins">by age</option>
            <option value="minerals">by Gender</option>
            <option value="herbal-supplements">by Lifetyle</option>
            <option value="protein-powders">by Health Benefits</option>
            <option value="amino-acids">by Price</option>
          </select>
        </div>
        <div className="supplement_name">
          <label htmlFor="supplement_name" className="supplement_name">
            <input type="text" placeholder="supplement name" />
          </label>
        </div>
      </div>

      <div className="gallery-thumbnails">
        {thumbnails.map((thumbnail, index) => (
          <div
            key = {index}
            className= {`thumbnail ${
              selectedThumbnails[props.currentSection] &&
              selectedThumbnails[props.currentSection][index]
                ? "selected"
                : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <div className="image-wrapper">
              <img src={thumbnail.imageSource} alt="" />
            </div>
            <p>
              {thumbnail.supplementName}
              {selectedThumbnails[props.currentSection] &&
                selectedThumbnails[props.currentSection][index] && (
                  <span className="green-dot" />
                )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
