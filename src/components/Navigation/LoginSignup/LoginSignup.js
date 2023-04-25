import React from "react";

const LoginSignup = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <div
        onClick={() => {
          onRouteChange("signout");
        }}
        style={{ display: "flex", flexDirection: "row", padding: "0 20px" }}
      >
        <p className="f3 link dim black underline pa3 pointer">Sign out</p>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "row", padding: "0 20px" }}>
        <p
          onClick={() => {
            onRouteChange("signin");
          }}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign in
        </p>
        <p
          onClick={() => {
            onRouteChange("register");
          }}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>
      </div>
    );
  }
};

export default LoginSignup;
