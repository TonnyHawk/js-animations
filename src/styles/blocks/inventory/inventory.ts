import { waitForUIElementToRender } from "../../../utils/index";

waitForUIElementToRender("#inventory-screen", function () {
	const tabs = Array.from(document.getElementsByClassName("inventory__nav-item")) as HTMLElement[];
	const inventoryInner = document.querySelector("#inventory-screen .popup-screen__inner");

	tabs.forEach((el: HTMLElement) => {
		el.addEventListener("click", function () {
			switchActiveTab(this);
		});
	});

	function switchActiveTab(tab: HTMLElement) {
		// toggle active tab
		tabs.forEach((el) => {
			if (el !== tab) {
				el.classList.remove("is-active");
			} else el.classList.add("is-active");
		});
		// toggle inventory theme to show different tab layouts
		const tabClass = tab.dataset.tabClass || "";
		if (inventoryInner) {
			for (let i = 0; i < inventoryInner.classList.length; i++) {
				if (inventoryInner.classList[i].includes("inventory_tab")) inventoryInner.classList.remove(inventoryInner.classList[i]);
			}
			if (tabClass !== "") inventoryInner.classList.add(tabClass);
		}
	}
});
