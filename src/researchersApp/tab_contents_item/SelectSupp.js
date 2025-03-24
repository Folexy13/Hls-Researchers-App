import React,{useState} from 'react'
import NutrientTP from './NutrientTP'


function SelectSupp(props) {
  const [displayOptions, setDisplayOptions] = useState(null)
  const sectionNames= ['Researchers Pack','Profs Pack',"Dr's Pack",'HLS Pack']
  // const thumbnails = JSON.parse(localStorage.getItem("thumbnails"))
  
  const clickToDisplay = i =>{
    if (displayOptions === i) {
      return setDisplayOptions(null)
    }
    setDisplayOptions(i)
  }

  const handleDispatchClick = () => {
    const supplementsObject = {};
    sectionNames.forEach((sectionName, index) => {
      supplementsObject[sectionName] = props.selectedSupplements[index];
    });
    console.log(supplementsObject);
  };
  
  return (
    <div
      className={
        props.toggleContent === 2
          ? "select-supplements active"
          : "select-supplements"
      }
      id="select-supplements"
    >
      {sectionNames.map((item, i ) => {
        return (
          <NutrientTP
            key={i}
            index={i}
            packName={item}
            toggleOptions={clickToDisplay}
            displayOptions={displayOptions}
            addFromGalleryOption={props.onTabClick}
            selectedSupplements={props.selectedSupplements}
            setSelectedSupplements={props.setSelectedSupplements}
            addSupplement={props.addSupplement}
            showGallery={props.showGallery}
            toggleGallery={props.toggleGallery}
            setCurrentSection={props.setCurrentSection}
            // toggleIndex = {props.toggleIndex}
          />
        );
      })}
      <button id="submit-supplements" onClick={handleDispatchClick}>Dispatch to Benfek</button>
    </div>
  );
}

export default SelectSupp