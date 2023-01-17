import PLATES from "../data/plastes.json";

class PicketItems extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  handleEvent(event) {
    if (event.type === "click") {
      const action = event.composedPath()[0].dataset.action;
      let element = event.composedPath()[0];
      let check = true;
      if (action === "cart" || action === "cart-text") {
        if (action === "cart-text") {
          element = event.composedPath()[1];
        }
        let index = element.classList[1];
        const iconImage = this.shadowRoot.querySelector(`.${index} img`);
        const indexString = index.lastIndexOf("-");
        index = index.substring(indexString + 1);

        if (!iconImage) {
          element.style.setProperty("--primary-color", "#232323");
          const icon = document.createElement("img");
          icon.src = "images/check.svg";
          icon.alt = "icon-check";
          element.innerText = "In Cart";
          element.prepend(icon);
        } else {
          check = false;
          element.style.setProperty("--primary-color", "#6b00f5");
          element.innerText = "Add to Cart";
          iconImage.remove();
        }
        const itemEvent = new CustomEvent("item-selected", {
          detail: { from: "Menu", index, status: check },
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(itemEvent);
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
        max-height: 812px;
        overflow-y: scroll;
      }

      .title {
        font-weight: 700;
        font-size: 2em;
        display: inline;
        margin-top: 2.5rem;
        margin-left: 1rem;
      }

      .plates-items {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-self: flex-end;
        margin: 2rem 0;
      }

      .card {
        display: flex;
        justify-content: right;
        position: relative;
        background: var(--card-color);
        border-radius: 20px 0 0 20px;
        width: 321px;
        height: 150px;
      }

      .plate-image {
        width: 148px;
        height: 148px;
        position: absolute;
        left: -24px;
        top: -24px;
      }

      .plate-contain {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-width: 150px;
        margin-right: 2rem;
        margin-top: 1rem;
      }

      .plate-name {
        margin: 0;
        font-size: 18px;
        font-weight: 400;
      }

      .plate-price {
        font-size: 2rem;
        font-weight: 700;
      }

      .plate-button {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        align-items: center;
        border: none;
        background-color: var(--primary-color);
        color: white;
        font-family: Poppins, sans-serif;
        font-size: 1rem;
        font-weight: 700;
        padding: 4px 1.5rem;
        border-radius: 20px;
        cursor: pointer;
      }

      .plate-button img {
        width: 24px;
        width: 24px;
      }
    `;
  }

  setItems() {
    let html = "";
    PLATES.forEach((plate, index) => {
      html += /* html */`
      <div class="card" style="--card-color: ${plate.color}">
        <img src="images/plate__${plate.image}.png" alt="${plate.plate}" class="plate-image">
        <main class="plate-contain">
          <h2 class="plate-name">${plate.name}</h2>
          <span class="plate-price">$${plate.price}</span>
          <button data-action="cart" class="plate-button index-${index}">
            <span unselectable="on" data-action="cart-text">Add to Cart</span>
          </button>
        </main>
      </div>`;
    });
    return html;
  }

  init() {
    this.button = this.shadowRoot.querySelector(".plates-items");
    this.button.addEventListener("click", this);
  }

  connectedCallback() {
    this.render();
    this.init();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${PicketItems.styles}</style>
    <div class="container">
      <h1 class="title">To Go Menu</h1>
      <div class="plates-items">
        ${this.setItems()}
      </div>
    </div>`;
  }
}

customElements.define("picket-items", PicketItems);
