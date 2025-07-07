import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class EditEmployeePage extends LitElement {
  static styles = css`
    div {
      color: red;
      background-color: gray;
    }
  `;
  render() {
    return html` <div>EditEmployeePage page</div> `;
  }
}
customElements.define("edit-page", EditEmployeePage);
