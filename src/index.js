import "./styles/main.scss";
import Game from "./objects/Game";
import ReactDOM from "react-dom/client";
import React from "react";
import Inventory from "./components/Inventory.jsx";

const game = new Game();
game.start();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Inventory />);
