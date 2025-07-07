import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class TableHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    .header {
      display: grid;
      box-sizing: border-box;
      grid-template-columns: 12px repeat(9, minmax(120px, 1fr));
      gap: 1rem;
      padding: 12px 16px;
      background-color: #f0f0f0;
      border-bottom: 2px solid #ccc;
      font-weight: bold;
      font-size: 12px;
      color: #333;
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
        <div></div>
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
