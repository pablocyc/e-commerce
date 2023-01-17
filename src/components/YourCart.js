import PLATES from "../data/plastes.json";

class YourCart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.subTotal = 0;
    this.tax = 0;
    this.total = 0;
  }

  handleEvent(event) {

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
        gap: 1.5rem;
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
        top: 17%;
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
    const price = parseFloat(PLATES[index].price);
    let subTotal = this.getUnformat(this.prices[0].textContent);
    if (status) {
      this.addItem(index, price);
      subTotal += price;
      this.updatePrices(subTotal);
    }
  }

  addItem(index, price) {
    const priceFormat = this.getFormat(price);
    const template = document.createElement("template");

    template.innerHTML = /* html */`
      <div class="plate-shop">
        <div class="main">
          <div class="image">
            <img src="images/plate__${PLATES[index].image}.png" alt="">
            <div class="quantity-image">1</div>
          </div>
          <div class="description">
            <h2 class="title-plate">${PLATES[index].name}</h2>
            <p class="price-unit">${priceFormat}</p>
            <div class="quantity">
              <button>
                <img src="images/btn-left.svg" alt="button left">
              </button>
              <span class="total-quantity">1</span>
              <button>
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

  updatePrices(subTotal) {
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
