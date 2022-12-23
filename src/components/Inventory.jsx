import React from "react";

const InventoryComponent = (props) => {
	return (
		<div class="popup-screen is-active" id="inventory-screen">
			<div class="popup-screen__inner popup-screen__inventory inventory inventory_tab_ammo">
				<div class="inventory__head">
					<div class="inventory__nav">
						<div class="inventory__nav-item" data-tab-class="">
							<div class="inventory__nav-item-icon">
								<img src="img/inventory/chest.png" alt="" class="inventory__nav-item-image" />
							</div>
							<p class="inventory__nav-item-title">General</p>
						</div>
						<div class="inventory__nav-item is-active" data-tab-class="inventory_tab_ammo">
							<div class="inventory__nav-item-icon">
								<img src="img/inventory/magazine.png" alt="" class="inventory__nav-item-image" />
							</div>
							<p class="inventory__nav-item-title">Ammunition</p>
						</div>
					</div>
				</div>
				<div class="inventory__body">
					<div class="inventory__main">
						<div class="inventory__search">
							<div class="inventory__search-icon">
								<svg
									class="inventory__search-icon-image bi bi-search"
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 16 16"
								>
									<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
								</svg>
							</div>
							<form action="" class="inventory__search-form">
								<input type="text" name="" id="" class="inventory__search-text-input" placeholder="Search..." />
							</form>
						</div>
						<div class="inventory__scroll scroll">
							<div class="scroll__track"></div>
							<div class="scroll__thumb"></div>
						</div>
						<div class="inventory__items">
							<div class="inventory__item available">
								<img src="img/inventory/chicken-leg.png" alt="" class="inventory__item-image" />
								<p class="inventory__item-counter">10</p>
							</div>
							<div class="inventory__item available is-active">
								<img src="img/inventory/bullets.png" alt="" class="inventory__item-image" />
								<p class="inventory__item-counter">29</p>
							</div>
							<div class="inventory__item"></div>
							<div class="inventory__item"></div>
							<div class="inventory__item large"></div>
							<div class="inventory__item"></div>
							<div class="inventory__item"></div>
							<div class="inventory__item"></div>
							<div class="inventory__item"></div>
						</div>
						<div class="inventory__progress-box progress-box">
							<div class="progress-box__item">
								<div class="progress-box__label-line">
									<p class="progress-box__indicator-name">Speed</p>
									<p class="progress-box__indicator-value">256</p>
								</div>
								<div class="progress-box__bar progress-bar">
									<div class="progress-box__background-bar progress-bar__background"></div>
									<div class="progress-box__main-bar progress-bar__main-line"></div>
								</div>
							</div>
							<div class="progress-box__item">
								<div class="progress-box__label-line">
									<p class="progress-box__indicator-name">Damage</p>
									<p class="progress-box__indicator-value">167</p>
								</div>
								<div class="progress-box__bar progress-bar">
									<div class="progress-box__background-bar progress-bar__background"></div>
									<div class="progress-box__main-bar progress-bar__main-line"></div>
								</div>
							</div>
							<div class="progress-box__item">
								<div class="progress-box__label-line">
									<p class="progress-box__indicator-name">Range</p>
									<p class="progress-box__indicator-value">214</p>
								</div>
								<div class="progress-box__bar progress-bar">
									<div class="progress-box__background-bar progress-bar__background"></div>
									<div class="progress-box__main-bar progress-bar__main-line"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="inventory__asside">
						<div class="inventory__item-card card">
							<div class="card__head">
								<div class="card__head-background"></div>
								<div class="card__head-icon-effect"></div>
								<img src="img/inventory/bullets.png" alt="" class="card__head-icon-image" />
							</div>
							<div class="card__body">
								<p class="card__title">Bullet</p>
								<p class="card__description">No gun can shot without bullet, right? Applicable to any weapon</p>
								<div class="card__actions">
									<div class="card__action error">
										<p class="card__action-text">Drop</p>
									</div>
									<div class="card__action success">
										<p class="card__action-text">Apply</p>
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
