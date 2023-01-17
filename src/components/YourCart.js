import PLATES from "../data/plastes.json";

class YourCart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  handleEvent(event) {
    if (event.type === "click") {
      const button = event.composedPath()[1].dataset.button;

      if (button) {
        const textImg = event.composedPath()[4].childNodes[1].lastElementChild;
        const textBtn = event.composedPath()[2].childNodes[3];
        const priceItem = event.composedPath()[2].childNodes[7];

        let num = parseInt(textImg.innerText);
        const index = button.split("-")[1];
        let itemTotalPrice = this.getUnformat(priceItem.innerText);
        if (button.split("-")[0] === "right") {
          num += 1;
          this.updatePrices(index);
          itemTotalPrice += this.getPrice(index);
        }
        if (button.split("-")[0] === "left") {
          num -= 1;
          if (num <= 0) {
            this.deleteItem(index);
            const itemEvent = new CustomEvent("item-delete", {
              detail: { from: "Cart", index },
              bubbles: true,
              composed: true
            });
            this.dispatchEvent(itemEvent);
            return;
          }
          this.updatePrices(index, false);
          itemTotalPrice -= this.getPrice(index);
        }
        priceItem.innerText = this.getFormat(itemTotalPrice);
        textImg.innerText = num.toString();
        textBtn.innerText = num.toString();
      }
    }
  }

  static get styles() {
    return /* css */`
      :host {
      }

      .container {
        display: flex;
        flex-direction: column;
        max-width: var(--max-width);
        max-height: var(--max-height);
        background: #FFFFFF;
        box-shadow: 0px 0px 70px #c7cbe3;
        border-radius: 25px;
        width: 375px;
        height: 812px;
        overflow-y: scroll;
      }

      .title {
        font-weight: 700;
        font-size: 2em;
        margin-top: 2.5rem;
        margin-left: 2rem;
        margin-bottom: 0;
      }

      .plate-shop {
        margin-top: 1rem;
      }

      .line {
        width: 85%;
        border: 2px solid var(--border-color);
        margin: 0 auto;
      }

      .line-item {
        border-width: 1px;
        margin-top: 1rem;
      }

      .price-items {
        width: 80%;
        margin: 2rem auto;
        display: flex;
        flex-direction: column;
        align-items: right;
        gap: 0.5rem;
      }

      .item {
        display: flex;
        justify-content: right;
        align-items: center;
        gap: 2rem;
      }

      .item h2 {
        margin: 0;
        font-size: 1rem;
        font-weight: 700;
      }

      .price {
        font-size: 2rem;
        font-weight: 700;
      }

      .main {
        display: flex;
        justify-content: space-between;
        gap: 0.8rem;
        width: 85%;
        margin: 0 auto;
      }

      .description {
        width: 100%;
      }

      .image {
        position: relative;
      }

      .image img {
        width: 64px;
        height: 64px;
      }

      .quantity-image {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: black;
        position: absolute;
        color: white;
        top: 14%;
        left: 25%;
      }

      .title-plate {
        font-size: 18px;
        font-weight: 400;
        margin: 0;
      }

      .price-unit {
        font-weight: 700;
        margin: 0;
      }

      .quantity {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 700;
      }

      button {
        all: unset;
      }

      button img {
        width: 32px;
        cursor: pointer;
      }

      .total-price {
        font-size: 2rem;
      }
    `;
  }

  setItem(index, status) {
    if (status) {
      this.addItem(index);
      this.updatePrices(index);
    } else {
      this.deleteItem(index);
    }
  }

  deleteItem(index) {
    const itemCart = this.shadowRoot.querySelector(`.index-${index}`);
    const totalItems = this.shadowRoot.querySelector(`.index-${index} .total-items`).innerText;

    itemCart.remove();
    this.updatePrices(index, false, this.getUnformat(totalItems));
  }

  addItem(index) {
    const priceFormat = this.getFormat(PLATES[index].price);
    const template = document.createElement("template");

    template.innerHTML = /* html */`
      <div class="plate-shop index-${index}">
        <div class="main">
          <div class="image">
            <img src="images/plate__${PLATES[index].image}.png" alt="">
            <div class="quantity-image total-items">1</div>
          </div>
          <div class="description">
            <h2 class="title-plate">${PLATES[index].name}</h2>
            <p class="price-unit">${priceFormat}</p>
            <div class="quantity">
              <button data-button="left-${index}">
                <img src="images/btn-left.svg" alt="button left">
              </button>
              <span class="total-quantity total-items">1</span>
              <button data-button="right-${index}">
                <img src="images/btn-right.svg" alt="button right">
              </button>
              <span class="total-price">${priceFormat}</span>
            </div>
          </div>
        </div>
        <div class="line line-item"></div>
      </div>
    `;
    const html = template.content.cloneNode((true));
    this.cartItems.appendChild(html);
  }

  getPrice(index) {
    return parseFloat(PLATES[index].price);
  }

  updatePrices(index, inc = true, totalItems = 1) {
    const price = this.getPrice(index);
    let subTotal = this.getUnformat(this.prices[0].textContent);
    if (inc) { subTotal += price; } else { subTotal -= (price * totalItems); }
    const tax = subTotal * 0.1;
    const total = subTotal + tax;

    this.prices[0].textContent = this.getFormat(subTotal);
    this.prices[1].textContent = this.getFormat(tax);
    this.prices[2].textContent = this.getFormat(total);
  }

  getFormat(num) {
    const options = { style: "currency", currency: "USD" };
    return new Intl.NumberFormat("en-US", options).format(num);
  }

  getUnformat(num) {
    return parseFloat(num.replace(/[^0-9.-]+/g, ""));
  }

  init() {
    this.cartItems = this.shadowRoot.querySelector(".cart-items");
    this.prices = this.shadowRoot.querySelectorAll(".price");
    this.cartItems.addEventListener("click", this);
  }

  connectedCallback() {
    this.render();
    this.init();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${YourCart.styles}</style>
    <div class="container">
      <h1 class="title">Your Cart</h1>
      <div class="cart-items">
      </div>
      <div class="line"></div>
      <div class="price-items">
        <div class="item subtotal">
          <h2>Subtotal:</h2>
          <span class="price">${this.getFormat(0)}</span>
        </div>
        <div class="item tax">
          <h2>Tax:</h2>
          <span class="price">${this.getFormat(0)}</span>
        </div>
        <div class="item total">
          <h2>Total:</h2>
          <span class="price">${this.getFormat(0)}</span>
        </div>
      </div>
    </div>`;
  }
}

customElements.define("your-cart", YourCart);
