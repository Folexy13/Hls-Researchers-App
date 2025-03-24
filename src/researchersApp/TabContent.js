import React,{useState} from 'react'
import UserProfile from './tab_contents_item/UserProfile'
import SelectSupp from './tab_contents_item/SelectSupp'
import Gallery from './tab_contents_item/gallery'


function TabContent(props) {
  const [selectedSupplements, setSelectedSupplements] = useState({});
  
  const [showGallery, setShowGallery] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

  const handleToggleGallery = (display) => {
    setShowGallery(display);
  };

  
  return (
    <div className="tab-content">
      <UserProfile toggleContent={props.toggleContent} />
      <SelectSupp
        toggleContent={props.toggleContent}
        onTabClick={props.onTabClick}
        selectedSupplements={selectedSupplements}
        setSelectedSupplements={setSelectedSupplements}
        // addSupplement = {handleAddSupplements}
        showGallery={showGallery}
        toggleGallery={handleToggleGallery}
        setCurrentSection={(index) => setCurrentSection(index)}
      />
      <Gallery
        toggleContent={props.toggleContent}
        selectedSupplements={selectedSupplements}
        setSelectedSupplements={(selectedSupplements) =>
          setSelectedSupplements(selectedSupplements)
        }
        currentSection={currentSection}
        toggleGallery={handleToggleGallery}
        backToSelectSupp={props.onTabClick}
      />
    </div>
  );
}

export default TabContent
