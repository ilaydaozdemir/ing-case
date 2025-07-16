import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import { t } from "../i18n.js";
export class DeleteModal extends LitElement {
  static properties = {
    open: { type: Boolean },
    employeeId: { type: String },
    employeeName: { type: String },
    employeeSurname: { type: String },
    language: { type: String },
  };
  static styles = css`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    }
    .modal {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      max-width: 400px;
      text-align: start;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
    .title {
      display: flex;
      justify-content: flex-start;
      font-weight: bold;
      font-size: 20px;
      color: #ff6101;
    }
    .modal button {
      cursor: pointer;
      width: 100%;
      margin: 4px;
    }
    .confirm {
      margin-right: 3rem;
      padding: 8px;
      text-align: center;
      border-radius: 6px;
      width: 200px;
      background-color: #ff6101;
      border: 1px solid #ff6101;
      border: none;
      color: white;
    }
    .cancel {
      margin-right: 2rem;
      padding: 8px;
      text-align: center;
      border-radius: 6px;
      width: 200px;
      border: 1px solid #541aabcc;
      color: #541aabcc;
      background-color: white;
    }
  `;
  constructor() {
    super();
    this.open = false;
    this.employeeId = "";
    this.employeeName = "";
    this.employeeSurname = "";
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
  _confirmDelete() {
    this.dispatchEvent(
      new CustomEvent("confirm-delete", {
        detail: { id: this.employeeId },
        bubbles: true,
        composed: true,
      })
    );
    this.open = false;
  }
  _cancelDelete() {
    this.dispatchEvent(
      new CustomEvent("cancel-delete", { bubbles: true, composed: true })
    );
    this.open = false;
  }
  render() {
    if (!this.open) return html``;
    return html`
      <div class="modal-backdrop">
        <div class="modal">
          <div class="title">${t("modal.title", this.language)}</div>
          <p>
            ${t("modal.desc1", this.language)} ${this.employeeName}
            ${this.employeeSurname} ${t("modal.desc2", this.language)}
          </p>
          <div>
            <button class="confirm" @click=${this._confirmDelete}>
              ${t("modal.button", this.language)}
            </button>
          </div>
          <div>
            <button class="cancel" @click=${this._cancelDelete}>
              ${t("button.cancel", this.language)}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define("delete-modal", DeleteModal);
