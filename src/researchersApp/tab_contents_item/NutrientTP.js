import React,{ useState } from 'react'
import AddSupplementForm from '../NewSuppForm';


function NutrientTP(props) {
  const [showForm, setShowForm] = useState(false); 
  

  const handleAddNewClick = () => {
    props.toggleOptions(props.index); 
    setShowForm(!showForm); 
  };

  const handleSectionClick = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      props.toggleOptions(props.index);
    }
  };


  const handleGalleryClick = ()=> {
    props.toggleOptions(props.index);
    props.toggleGallery(props.addFromGalleryOption(3));
    props.setCurrentSection(props.index);
  }
  
  const handleRemoveSupplement = (event, drugName) => {
    event.stopPropagation();
    const newSelectedSupplements = { ...props.selectedSupplements };
    newSelectedSupplements[props.index] = newSelectedSupplements[props.index].filter((item) => item !== drugName);
    props.setSelectedSupplements(newSelectedSupplements);
  };

  const handleFormSubmit = (drugName) => {
    const newSelectedSupplements = { ...props.selectedSupplements };
    if (!newSelectedSupplements[props.index]) {
      newSelectedSupplements[props.index] = [];
    }
    newSelectedSupplements[props.index].push(drugName);
    props.setSelectedSupplements(newSelectedSupplements);
    setShowForm(false);
  };


  return (
    <>
      <div onClick={handleSectionClick} className='supplement-section'>
        <div className="pack-type-element">
          <h3 className="pack-type-name">{props.packName}</h3>
          <span className="plus-icon">{props.displayOptions === props.index ? '-' : '+' } </span>
        </div>
        {props.displayOptions === props.index && (
          <ul className="options-list">
            <li onClick={handleAddNewClick} className="add-new-option">
              Add New
            </li>
            <li onClick={handleGalleryClick} className="add-from-gallery-option">Add from Gallery</li>
          </ul>
        )} 
        {props.selectedSupplements[props.index] && 
        ( <ul className="added-supplements-list" style ={{ display: Object.values(props.selectedSupplements[props.index]) && Object.values(props.selectedSupplements[props.index]).length > 0 ? 'flex' : 'none' }}>
            {Object.values(props.selectedSupplements[props.index]).map ((drugName, index) => (
              <li key={index} onClick={(event) => handleRemoveSupplement(event,drugName)}>{drugName}</li>
            ))}
          </ul>
        )}
      </div>
      {showForm && 
        <AddSupplementForm 
        index={props.index}
        onSubmit={(drugName) => handleFormSubmit(drugName)} />}
    </>   
  );
}
export default NutrientTP