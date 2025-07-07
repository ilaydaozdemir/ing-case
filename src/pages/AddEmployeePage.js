import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class AddEmployeePage extends LitElement {
  static styles = css`
    div {
      padding-top: 80px;
      color: red;
      background-color: gray;
      margin-top: 60px;
    }
  `;
  render() {
    return html` <div>AddEmployeePage page</div> `;
  }
}
customElements.define("add-page", AddEmployeePage);
