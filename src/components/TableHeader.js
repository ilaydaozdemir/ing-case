import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./CheckboxComponent.js";
export class TableHeader extends LitElement {
  static properties = {
    selectAll: { type: Boolean },
  };
  constructor() {
    super();
    this.selectAll = false;
  }
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    .header {
      display: grid;
      grid-template-columns: 12px repeat(9, minmax(120px, 1fr));
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
    @media (max-width: 768px) {
      .header {
        font-size: 12px;
        padding: 10px;
        gap: 0.5rem;
        grid-template-columns: repeat(10, minmax(100px, 1fr));
      }
    }
  `;
  render() {
    return html`
      <div class="header">
        <checkbox-component
          .checked=${this.selectAll}
          @checkbox-changed=${this._toggleAll}
        ></checkbox-component>
        <div>First Name</div>
        <div>Last Name</div>
        <div>Date of Employment</div>
        <div>Date of Birth</div>
        <div>Phone</div>
        <div>Email</div>
        <div>Department</div>
        <div>Position</div>
        <div>Actions</div>
      </div>
    `;
  }
  _toggleAll(e) {
    this.checkedAll = e.detail.checked;
    this.dispatchEvent(
      new CustomEvent("select-all", {
        detail: { checked: this.checkedAll },
        bubbles: true,
        composed: true,
      })
    );
  }
}
customElements.define("table-header", TableHeader);
