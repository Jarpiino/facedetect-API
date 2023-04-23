import React from "react";
import Tilt from "react-parallax-tilt";

const Logo = () => {
  return (
    <div>
      <Tilt
        style={{
          display: "flex",
          height: "150px",
          width: "150px",
          fontSize: "3rem",
          borderRadius: "5rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              margin: "-18px 0 0 0",
              textShadow: "rgb(0 0 0 / 54%) 0 2px 5px",
            }}
          >
            🧠
          </h1>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
