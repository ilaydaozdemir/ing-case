import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "../CheckboxComponent.js";
import { t } from "../../i18n.js";
export class TableHeader extends LitElement {
  static properties = {
    checkedAll: { type: Boolean },
    language: { type: String },
  };
  constructor() {
    super();
    this.checkedAll = false;
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
  _toggleAll(e) {
    const checked = e.detail.checked;
    this.checkedAll = checked;
    this.dispatchEvent(
      new CustomEvent("select-all", {
        detail: { checked },
        bubbles: true,
        composed: true,
      })
    );
  }
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    .header {
      display: grid;
      grid-template-columns:
        12px
        100px
        100px
        140px
        140px
        160px
        260px
        120px
        120px
        80px;
      gap: 1rem;
      padding: 12px 16px;
      background-color: white;
      font-weight: 400;
      font-size: 12px;
      color: #ff6101;
      position: sticky;
      top: 70px;
      z-index: 1000;
    }
  `;
  render() {
    return html`
      <div class="header">
        <checkbox-component
          .checked=${this.checkedAll}
          @checkbox-changed=${this._toggleAll}
        ></checkbox-component>
        <div>${t("form.name", this.language)}</div>
        <div>${t("form.surname", this.language)}</div>
        <div>${t("form.doe", this.language)}</div>
        <div>${t("form.birthday", this.language)}</div>
        <div>${t("form.phone", this.language)}</div>
        <div>Email</div>
        <div>${t("form.department", this.language)}</div>
        <div>${t("form.position", this.language)}</div>
        <div>${t("form.actions", this.language)}</div>
      </div>
    `;
  }
}

customElements.define("table-header", TableHeader);
