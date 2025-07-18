import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import { t } from "../i18n.js";
export class SubHeaderLayout extends LitElement {
  static properties = {
    viewType: { type: String },
    iconsVisible: { type: Boolean },
    language: { type: String },
  };
  static styles = css`
    :host {
      display: block;
    }
    header {
      background-color: #f2f2f289;
      padding: 1rem;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 70px;
      z-index: 900;
    }
    .title {
      font-size: x-large;
      margin-top: 2rem;
      color: #ff6101;
    }
    .icons {
      margin-top: 2rem;
      span {
        color: #ff6201a9;
        cursor: pointer;
        &:hover {
          color: #ff6101;
        }
      }
    }
    .active-icon {
      color: #ff6101 !important;
    }
    main {
      height: 100%;
      background-color: #f2f2f289;
    }
  `;
  constructor() {
    super();
    this.viewType = "table";
    this.iconsVisible = true;
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
  connectedCallback() {
    super.connectedCallback();
    this._checkPathVisibility();
    const path = window.location.pathname;
    this.pageTitle = this._getTitleFromPath(path);
  }
  _getTitleFromPath(path) {
    if (path === "/") return `${t("page.title.1", this.language)}`;
    if (path.startsWith("/edit")) return `${t("page.title.3", this.language)}`;
    if (path === "/add") return `${t("page.title.2", this.language)}`;
    return "ING CASE";
  }

  _checkPathVisibility() {
    const path = window.location.pathname.toLowerCase();
    this.iconsVisible = !(path.includes("add") || path.includes("edit"));
  }
  _changeView(view) {
    this.viewType = view;
    this.dispatchEvent(
      new CustomEvent("view-change", {
        detail: { view },
        bubbles: true,
        composed: true,
      })
    );
  }
  render() {
    return html`
      <header>
        <span class="title">${this.pageTitle}</span>
        ${this.iconsVisible
          ? html`
              <div class="icons">
                <span
                  @click=${() => this._changeView("table")}
                  class=${this.viewType === "table" ? "active-icon" : ""}
                >
                  <iconify-icon
                    icon="mdi:view-headline"
                    width="24"
                    height="24"
                  ></iconify-icon
                ></span>

                <span
                  @click=${() => this._changeView("list")}
                  class=${this.viewType === "list" ? "active-icon" : ""}
                >
                  <iconify-icon
                    icon="mdi:view-grid-outline"
                    width="24"
                    height="24"
                  ></iconify-icon
                ></span>
              </div>
            `
          : null}
      </header>
      <main>
        <slot></slot>
      </main>
    `;
  }
}
customElements.define("sub-header-layout", SubHeaderLayout);
