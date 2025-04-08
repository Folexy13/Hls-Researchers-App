import React,{useState, useEffect} from 'react'
import { TiThMenu } from "react-icons/ti";
import { Link } from 'react-router-dom';


function HeaderMenu() {
  const [showMenu, setShowMenu] = useState(false);
  

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleBodyClick = (event) => {
    if (!event.target.closest(".hamburger-menu")) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleBodyClick);
    return () => {
      document.removeEventListener("click", handleBodyClick);
    };
  }, []);


  return (
    <div className="nav-bar">
      <div className="nav_logo">
        <img src={"/IMAGES/hls logo.jpg"} alt="" />
      </div>
      <div className="hamburger-menu">
        <TiThMenu
          width="30px"
          height="30px"
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            fontWeight: 200,
          }}
          size="35"
          color="#494646a9"
          onClick={handleMenuClick}
        />
        <ul className={`menu-list ${showMenu ? "show-menu" : "hide"}`}>
          <li className="publish" id="publish_blog">
            {" "}
            Publish blog
          </li>
          <Link to="/podcasts" className="publish" id="publish_podcast">
            {" "}
            Publish podcast
          </Link>
          <li className="logout" id="researcher_logout">
            {" "}
            log out
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderMenu