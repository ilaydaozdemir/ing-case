import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./CheckboxComponent.js";
export class TableHeader extends LitElement {
  static properties = {
    checkedAll: { type: Boolean },
  };
  constructor() {
    super();
    this.selectAll = false;
  }
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
}
customElements.define("table-header", TableHeader);
