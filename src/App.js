// import './App.css';
// import Dashboard from './Dashboard';
// import Account from './Account';
// import Benfek from './Benfek';
// import Publish from './Publish';

// function App() {
//   return (
//     <div className="dashboard">
//       <Dashboard />
//       <Account />
//       <Benfek />
//       <Publish />
//     </div>
//   );
// }

// export default App;
// import './App.css'
import './index.css'
import React, {useState} from 'react'
import HeaderMenu from './researchersApp/HeaderMenu'
import TabMenu from './researchersApp/TabMenu'
import TabContent from './researchersApp/TabContent'

  function App() {
    const [toggleContent, setToggleContent] = useState(1)

    const handleClick = (index)=>{
      setToggleContent(index)
    }                        
  return (
    <div className="container">
      
      <HeaderMenu />
      <TabMenu onTabClick = {handleClick}/>
      <TabContent 
        toggleContent = {toggleContent}
        onTabClick = {handleClick}  
        // toggleIndex = {index}
      />

    </div>
  )
}

export default App
