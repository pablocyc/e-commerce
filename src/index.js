import "./components/PicketItems.js";
import "./components/YourCart.js";

document.addEventListener("item-selected", (ev) => {
  console.log(ev.detail);
  const cart = document.querySelector("your-cart");
  cart.setItem(ev.detail.index, ev.detail.status);
});
