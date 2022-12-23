import React, { useState } from "react";
import InventoryItem from "../objects/inventory/items/InventoryItem";

const InventoryComponent = ({ isActive, items }: { isActive: boolean; items: InventoryItem[] }) => {
	console.log(items);

	return (
		<div className={`popup-screen ${isActive ? "is-active" : ""}`} id="inventory-screen">
			<div className="popup-screen__inner popup-screen__inventory inventory inventory_tab_ammo">
				<div className="inventory__head">
					<div className="inventory__nav">
						<div className="inventory__nav-item" data-tab-className="">
							<div className="inventory__nav-item-icon">
								<img src="img/inventory/chest.png" alt="" className="inventory__nav-item-image" />
							</div>
							<p className="inventory__nav-item-title">General</p>
						</div>
						<div className="inventory__nav-item is-active" data-tab-className="inventory_tab_ammo">
							<div className="inventory__nav-item-icon">
								<img src="img/inventory/magazine.png" alt="" className="inventory__nav-item-image" />
							</div>
							<p className="inventory__nav-item-title">Ammunition</p>
						</div>
					</div>
				</div>
				<div className="inventory__body">
					<div className="inventory__main">
						<div className="inventory__search">
							<div className="inventory__search-icon">
								<svg
									className="inventory__search-icon-image bi bi-search"
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 16 16"
								>
									<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
								</svg>
							</div>
							<form action="" className="inventory__search-form">
								<input type="text" name="" id="" className="inventory__search-text-input" placeholder="Search..." />
							</form>
						</div>
						<div className="inventory__scroll scroll">
							<div className="scroll__track"></div>
							<div className="scroll__thumb"></div>
						</div>
						<div className="inventory__items">
							<div className="inventory__item available">
								<img src="img/inventory/chicken-leg.png" alt="" className="inventory__item-image" />
								<p className="inventory__item-counter">10</p>
							</div>
							<div className="inventory__item available is-active">
								<img src="img/inventory/bullets.png" alt="" className="inventory__item-image" />
								<p className="inventory__item-counter">29</p>
							</div>
							<div className="inventory__item"></div>
							<div className="inventory__item"></div>
							<div className="inventory__item large"></div>
							<div className="inventory__item"></div>
							<div className="inventory__item"></div>
							<div className="inventory__item"></div>
							<div className="inventory__item"></div>
						</div>
						<div className="inventory__progress-box progress-box">
							<div className="progress-box__item">
								<div className="progress-box__label-line">
									<p className="progress-box__indicator-name">Speed</p>
									<p className="progress-box__indicator-value">256</p>
								</div>
								<div className="progress-box__bar progress-bar">
									<div className="progress-box__background-bar progress-bar__background"></div>
									<div className="progress-box__main-bar progress-bar__main-line"></div>
								</div>
							</div>
							<div className="progress-box__item">
								<div className="progress-box__label-line">
									<p className="progress-box__indicator-name">Damage</p>
									<p className="progress-box__indicator-value">167</p>
								</div>
								<div className="progress-box__bar progress-bar">
									<div className="progress-box__background-bar progress-bar__background"></div>
									<div className="progress-box__main-bar progress-bar__main-line"></div>
								</div>
							</div>
							<div className="progress-box__item">
								<div className="progress-box__label-line">
									<p className="progress-box__indicator-name">Range</p>
									<p className="progress-box__indicator-value">214</p>
								</div>
								<div className="progress-box__bar progress-bar">
									<div className="progress-box__background-bar progress-bar__background"></div>
									<div className="progress-box__main-bar progress-bar__main-line"></div>
								</div>
							</div>
						</div>
					</div>
					<div className="inventory__asside">
						<div className="inventory__item-card card">
							<div className="card__head">
								<div className="card__head-background"></div>
								<div className="card__head-icon-effect"></div>
								<img src="img/inventory/bullets.png" alt="" className="card__head-icon-image" />
							</div>
							<div className="card__body">
								<p className="card__title">Bullet</p>
								<p className="card__description">No gun can shot without bullet, right? Applicable to any weapon</p>
								<div className="card__actions">
									<div className="card__action error">
										<p className="card__action-text">Drop</p>
									</div>
									<div className="card__action success">
										<p className="card__action-text">Apply</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InventoryComponent;
