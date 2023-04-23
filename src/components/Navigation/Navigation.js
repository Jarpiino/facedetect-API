import React from "react";
import Logo from "./Logo/Logo";
import LoginSignup from "./LoginSignup/LoginSignup";

const Navigation = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <div>
        <Logo />
      </div>
      <div>
        <LoginSignup />
      </div>
    </nav>
  );
};

export default Navigation;
