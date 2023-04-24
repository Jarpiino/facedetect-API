import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="facerec center ma">
      <img
        id="inputimage"
        className="inputimage br3 shadow-5"
        src={imageUrl}
        alt="sus"
        width={"500px"}
        height={"auto"}
      />
      <div
        className="bounding-box"
        style={{
          top: box.topRow,
          right: box.rightCol,
          bottom: box.bottomRow,
          left: box.leftCol,
        }}
      ></div>
    </div>
  );
};

export default FaceRecognition;
