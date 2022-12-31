import React from "react";
export default function Number(props) {
  return (
    <div
      className={`Number ${props.selected ? "Active" : " "}`}
      onClick={() => {
        props.HandleClick(props.id);
      }}
    >
      <h4>{props.number}</h4>
    </div>
  );
}
