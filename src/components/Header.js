import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import { Router } from "https://cdn.jsdelivr.net/npm/@vaadin/router/+esm";
export class Header extends LitElement {
  static properties = {
    language: { type: String },
  };
  static styles = css`
    header {
      position: fixed;
      top: 0;
      left: 0;
      height: 60px;
      width: 99%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      color: #ff6101;
      z-index: 10000;
    }
    header nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    header nav span {
      margin-left: 1rem;
      color: #ff6201b2;
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
      transition: color 0.3s ease;
    }
    header nav span:hover {
      color: #ff6101;
    }
  `;
  constructor() {
    super();
    this.language = localStorage.getItem("lang") || "en";
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("language-changed", this._onLanguageChanged);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("language-changed", this._onLanguageChanged);
  }
  _onLanguageChanged = (e) => {
    this.language = e.detail;
    this.requestUpdate();
  };
  navigateTo(path) {
    Router.go(path);
  }
  toggleLanguage() {
    const newLang = this.language === "en" ? "tr" : "en";
    localStorage.setItem("lang", newLang);
    this.language = newLang;
    this.requestUpdate();
    window.dispatchEvent(
      new CustomEvent("language-changed", { detail: newLang })
    );
  }
  render() {
    return html`
      <header>
        <div class="logo" @click=${() => this.navigateTo("/")}>
          <img src="./logo.png" alt="logo" />
        </div>
        <nav>
          <span @click=${() => this.navigateTo("/")}>
            <iconify-icon
              icon="mdi:headset"
              width="24"
              height="24"
            ></iconify-icon
            >Employees
          </span>
          <span @click=${() => this.navigateTo("/add")}>
            <iconify-icon icon="mdi:plus" width="24" height="24"></iconify-icon
            >Add New
          </span>
          <span @click=${this.toggleLanguage}>
            <iconify-icon
              icon=${this.language === "en"
                ? "twemoji:flag-united-kingdom"
                : "twemoji:flag-turkey"}
              width="24"
              height="24"
            ></iconify-icon>
          </span>
        </nav>
      </header>
    `;
  }
}
customElements.define("ing-header", Header);
