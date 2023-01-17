(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerpolicy&&(s.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?s.credentials="include":i.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();const d=[{name:"French Fries with Ketchup",price:"4.50",image:"french-fries",color:"#7ab3f3"},{name:"Salmon and Vegetables",price:"5.12",image:"salmon-vegetables",color:"#e979b2"},{name:"Spaghetti with Sauce",price:"7.82",image:"spaghetti-meat-sauce",color:"#d7d7f9"},{name:"Bacon with Eggs",price:"2.23",image:"bacon-eggs",color:"#78f7bb"},{name:"Chicken and Salad",price:"5.03",image:"chicken-salad",color:"#7ab3f3"},{name:"Fish Sticks and Chips",price:"3.84",image:"fish-sticks-fries",color:"#e979b2"},{name:"Ravioli",price:"2.94",image:"ravioli",color:"#d7d7f9"},{name:"Tortellini",price:"4.99",image:"tortellini",color:"#78f7bb"}];class m extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}handleEvent(t){if(t.type==="click"){const e=t.composedPath()[0].dataset.action;let a=t.composedPath()[0],i=!0;if(e){e==="cart-text"&&(a=t.composedPath()[1]);let s=a.classList[1];const r=this.shadowRoot.querySelector(`.${s} img`),o=s.lastIndexOf("-");if(s=s.substring(o+1),r)i=!1,a.style.setProperty("--primary-color","#6b00f5"),a.innerText="Add to Cart";else{a.style.setProperty("--primary-color","#232323");const l=document.createElement("img");l.src="images/check.svg",l.alt="icon-check",a.innerText="In Cart",a.prepend(l)}const c=new CustomEvent("item-selected",{detail:{from:"Menu",index:s,status:i},bubbles:!0,composed:!0});this.dispatchEvent(c)}}}static get styles(){return`
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
    `}unCheckButton(t){const e=this.shadowRoot.querySelector(`.index-${t}`);e.style.setProperty("--primary-color","#6b00f5"),e.innerText="Add to Cart"}setItems(){let t="";return d.forEach((e,a)=>{t+=`
      <div class="card" style="--card-color: ${e.color}">
        <img src="images/plate__${e.image}.png" alt="${e.plate}" class="plate-image">
        <main class="plate-contain">
          <h2 class="plate-name">${e.name}</h2>
          <span class="plate-price">$${e.price}</span>
          <button data-action="cart" class="plate-button index-${a}">
            <span unselectable="on" data-action="cart-text">Add to Cart</span>
          </button>
        </main>
      </div>`}),t}init(){this.button=this.shadowRoot.querySelector(".plates-items"),this.button.addEventListener("click",this)}connectedCallback(){this.render(),this.init()}render(){this.shadowRoot.innerHTML=`
    <style>${m.styles}</style>
    <div class="container">
      <h1 class="title">To Go Menu</h1>
      <div class="plates-items">
        ${this.setItems()}
      </div>
    </div>`}}customElements.define("menu-items",m);class p extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}handleEvent(t){if(t.type==="click"){const e=t.composedPath()[1].dataset.button;if(e){const a=t.composedPath()[4].childNodes[1].lastElementChild,i=t.composedPath()[2].childNodes[3],s=t.composedPath()[2].childNodes[7];let r=parseInt(a.innerText);const o=e.split("-")[1];let c=this.getUnformat(s.innerText);if(e.split("-")[0]==="right"&&(r+=1,this.updatePrices(o),c+=this.getPrice(o)),e.split("-")[0]==="left"){if(r-=1,r<=0){this.deleteItem(o);const l=new CustomEvent("item-delete",{detail:{from:"Cart",index:o},bubbles:!0,composed:!0});this.dispatchEvent(l);return}this.updatePrices(o,!1),c-=this.getPrice(o)}s.innerText=this.getFormat(c),a.innerText=r.toString(),i.innerText=r.toString()}}}static get styles(){return`
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
    `}setItem(t,e){e?(this.addItem(t),this.updatePrices(t)):this.deleteItem(t)}deleteItem(t){this.shadowRoot.querySelector(`.index-${t}`).remove(),this.updatePrices(t,!1)}addItem(t){const e=this.getFormat(d[t].price),a=document.createElement("template");a.innerHTML=`
      <div class="plate-shop index-${t}">
        <div class="main">
          <div class="image">
            <img src="images/plate__${d[t].image}.png" alt="">
            <div class="quantity-image total-items">1</div>
          </div>
          <div class="description">
            <h2 class="title-plate">${d[t].name}</h2>
            <p class="price-unit">${e}</p>
            <div class="quantity">
              <button data-button="left-${t}">
                <img src="images/btn-left.svg" alt="button left">
              </button>
              <span class="total-quantity total-items">1</span>
              <button data-button="right-${t}">
                <img src="images/btn-right.svg" alt="button right">
              </button>
              <span class="total-price">${e}</span>
            </div>
          </div>
        </div>
        <div class="line line-item"></div>
      </div>
    `;const i=a.content.cloneNode(!0);this.cartItems.appendChild(i)}getPrice(t){return parseFloat(d[t].price)}updatePrices(t,e=!0){const a=this.getPrice(t);let i=this.getUnformat(this.prices[0].textContent);e?i+=a:i-=a;const s=i*.1,r=i+s;this.prices[0].textContent=this.getFormat(i),this.prices[1].textContent=this.getFormat(s),this.prices[2].textContent=this.getFormat(r)}getFormat(t){const e={style:"currency",currency:"USD"};return new Intl.NumberFormat("en-US",e).format(t)}getUnformat(t){return parseFloat(t.replace(/[^0-9.-]+/g,""))}init(){this.cartItems=this.shadowRoot.querySelector(".cart-items"),this.prices=this.shadowRoot.querySelectorAll(".price"),this.cartItems.addEventListener("click",this)}connectedCallback(){this.render(),this.init()}render(){this.shadowRoot.innerHTML=`
    <style>${p.styles}</style>
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
    </div>`}}customElements.define("your-cart",p);document.addEventListener("item-selected",n=>{document.querySelector("your-cart").setItem(n.detail.index,n.detail.status)});document.addEventListener("item-delete",n=>{document.querySelector("menu-items").unCheckButton(n.detail.index)});
