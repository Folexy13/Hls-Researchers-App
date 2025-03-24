import React, { useState } from 'react';


function AddSupplementForm(props) {
  const [drugName, setDrugName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState([]);
  const [dosageForm, setDosageForm] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [healthBenefitsDescription, setHealthBenefitsDescription] = useState('');
  const [price, setPrice] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(drugName);
    console.log({
      drugName,
      brandName,
      gender,
      age,
      dosageForm,
      lifestyle,
      healthBenefitsDescription,
      price,
    });
  };

  return (
    <div className="form-container">
      <form id="add-supplement-form" onSubmit={handleSubmit}>
        <label htmlFor="drug-name">Drug Name:</label>
        <input
          type="text"
          id="drug-name"
          name="drug-name"
          value={drugName}
          onChange={(event) => setDrugName(event.target.value)}
        />

        <label htmlFor="brand-name">Brand Name:</label>
        <input
          type="text"
          id="brand-name"
          name="brand-name"
          value={brandName}
          onChange={(event) => setBrandName(event.target.value)}
        />

        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option value="">Select an option</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label htmlFor="age">Age:</label>
        <select
          id="age"
          name="age"
          multiple
          value={age}
          onChange={(event) => setAge(Array.from(event.target.selectedOptions, (option) => option.value))}
        >
          <option value="18-24">18-24</option>
          <option value="25-34">25-34</option>
          <option value="35-44">35-44</option>
          <option value="45-54">45-54</option>
          <option value="55+">55+</option>
        </select>

        <label htmlFor="dosage-form">Dosage Form:</label>
        <select
          id="dosage-form"
          name="dosage-form"
          value={dosageForm}
          onChange={(event) => setDosageForm(event.target.value)}
        >
          <option value="">Select an option</option>
          <option value="tablet">Tablet</option>
          <option value="capsule">Capsule</option>
          <option value="liquid">Liquid</option>
        </select>

        <label htmlFor="lifestyle">Lifestyle:</label>
        <select
          id="lifestyle"
          name="lifestyle"
          value={lifestyle}
          onChange={(event) => setLifestyle(event.target.value)}
        >
          <option value="">Select an option</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten-free">Gluten-free</option>
        </select>

        <label htmlFor="health-benefits-description">Health Benefits Description:</label>
        <textarea
          id="health-benefits-description"
          name="health-benefits-description"
          value={healthBenefitsDescription}
          onChange={(event) => setHealthBenefitsDescription(event.target.value)}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(event) => setPrice(event.target.valueAsNumber)}
        />

        <input type="submit" value="Add Supplement" />
      </form>
    </div>
  );
}

export default AddSupplementForm;