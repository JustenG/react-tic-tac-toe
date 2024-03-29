import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/output.css";
import "./components/App.css";

import App from "./components/App";

const elementId :string = 'root';
const element = document.getElementById(elementId);
if (!element) throw new Error('No element with id "' + elementId + '" found');
const root = createRoot(element);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);