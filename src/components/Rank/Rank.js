import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <p className="f3 white">{`${name}, your current entry count is: `}</p>
      <p className="f1 white">{`${entries}`}</p>
    </div>
  );
};

export default Rank;
