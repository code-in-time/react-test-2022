import React, { useEffect } from "react";
import PaymentsData from "./PaymentsData";

import "bootstrap/dist/css/bootstrap.min.css";
import "./app.scss";

const App = () => {
  return <>
    <h1>This is a payment application</h1>
    <hr />
    <PaymentsData />
  </>;
};

export default App;
