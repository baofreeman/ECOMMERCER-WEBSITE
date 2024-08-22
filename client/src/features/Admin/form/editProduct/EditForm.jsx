import React from "react";
import MainForm from "./MainForm";

const EditForm = ({ product }) => {
  return (
    <div>
      <h1>Edit form</h1>
      <MainForm product={product} />
    </div>
  );
};

export default EditForm;
