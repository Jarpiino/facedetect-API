import React from "react";
import Logo from "./Logo/Logo";
import LoginSignup from "./LoginSignup/LoginSignup";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    <nav>
      <div>
        <Logo />
      </div>
      <div>
        <LoginSignup isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      </div>
    </nav>
  );
};

export default Navigation;
