import "./components/MenuItems.js";
import "./components/YourCart.js";

document.addEventListener("item-selected", (ev) => {
  const cart = document.querySelector("your-cart");
  cart.setItem(ev.detail.index, ev.detail.status);
});

document.addEventListener("item-delete", (ev) => {
  const menu = document.querySelector("menu-items");
  menu.unCheckButton(ev.detail.index);
});
