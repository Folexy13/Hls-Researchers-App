import React, { useState } from 'react';
import profileData from '../../data/profileData.json';

function UserProfile(props) {
  const [code, setCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [showNutrientPack, setShowNutrientPack] = useState(false);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleCodeSubmit = (event) => {
    event.preventDefault();
    if (code === 'benfek') { // Replace with your desired code
      setIsCodeValid(true);
    } else {
      alert('Invalid code');
    }
  };

  const handleFetchNutrientPack = () => {
    setShowNutrientPack(true);
  };

  return (
    <div
      className={
        props.toggleContent === 1 ? "user-profile active" : "user-profile"
      }
      id="user-profile"
    >
      <div
        className="benfek-profile-code"
        style={{ display: isCodeValid ? "none" : "block" }}
      >
        <label htmlFor="benfek-code">Enter benfek's code:</label>
        <input
          type="text"
          id="benfek-code"
          name="benfek's-code"
          value={code}
          onChange={handleCodeChange}
        />
        <button id="submit-benfek-code" onClick={handleCodeSubmit}>
          Submit
        </button>
      </div>
      {isCodeValid && (
        <div className="user-profile-container">
          <h1>{profileData.nickname}'s Profile</h1>
          <div className="profile-cards-container">
            <div className="profile-card">
              <h2>Basics</h2>
              <ul>
                <li>
                  <strong>Gender:</strong> {profileData.gender}
                </li>
                <li>
                  <strong>Age:</strong> {profileData.age}
                </li>
                <li>
                  <strong>Weight:</strong> {profileData.weight} kg
                </li>
                <li>
                  <strong>Height:</strong> {profileData.height} cm
                </li>
              </ul>
            </div>
            <div className="profile-card">
              <h2>Lifestyle</h2>
              <ul>
                <li>
                  <strong>Habits:</strong> {profileData.habits.join(", ")}
                </li>
                <li>
                  <strong>Recreation:</strong>{" "}
                  {profileData.recreation.join(", ")}
                </li>
                <li>
                  <strong>Lifestyle:</strong> {profileData.lifestyle.join(", ")}
                </li>
              </ul>
            </div>
            <div className="profile-card">
              <h2>Health Factors</h2>
              <ul>
                <li>
                  <strong>Health Complaints:</strong>{" "}
                  {profileData.health_complaints.join(", ")}
                </li>
                <li>
                  <strong>Current Medications:</strong>{" "}
                  {profileData.current_medications.join(", ")}
                </li>
                <li>
                  <strong>Genetic History:</strong>{" "}
                  {profileData.genetic_history.join(", ")}
                </li>
                <li>
                  <strong>Allergies:</strong> {profileData.allergies.join(", ")}
                </li>
                <li>
                  <strong>Health Fears:</strong> {profileData.health_fears}
                </li>
              </ul>
            </div>
            <div className="profile-card">
              <h2>Preferences</h2>
              <ul>
                <li>
                  <strong>Drug Form:</strong> {profileData.drug_form.join(", ")}
                </li>
                <li>
                  <strong>Health Budget:</strong> {profileData.health_budget}
                </li>
              </ul>
            </div>
          </div>
          <button
            className="fetch-nutrient-pack-button"
            onClick={handleFetchNutrientPack}
          >
            Fetch Pack
          </button>
          {showNutrientPack && (
            // Render nutrient pack details here
            <div>Nutrient Pack Details will be displayed here</div>
          )}
        </div>
      )}
    </div>
  );
}


export default UserProfile