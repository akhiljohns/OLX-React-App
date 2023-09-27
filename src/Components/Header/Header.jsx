import React, { useContext } from "react";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext } from "../../Store/Context";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            <span className="boldCapitalizedText" >
              {user.displayName}
            </span>
          ) : (
            <a href="/login">
              <span className="boldCapitalizedText" >Login</span>
            </a>
          )}
          <hr />
        </div>
        <div>
         {user && <span className="boldCapitalizedText logout" onClick={()=>{
            const auth = getAuth();
            signOut(auth).then(() => {
              navigate("/login");
              
            }).catch((error) => {
              console.log(error)
            });
            
          }} >LOGOUT</span> }
        </div>
          

        <div className="sellMenu" onClick={()=>{
          navigate('/create')
        }}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
