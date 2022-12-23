import "./styles/main.scss";
import Game from "./objects/Game";
import ReactDOM from "react-dom/client";
import React from "react";
import Inventory from "./components/Inventory.jsx";

const game = new Game();
game.start();

const inventoryMenu = ReactDOM.createRoot(document.getElementById("inventory-menu"));
inventoryMenu.render(<Inventory isActive={false} />);
