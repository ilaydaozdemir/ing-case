import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "../components/SubHeaderLayout.js";
import "../components/EmployeeArea.js";
export class AddEmployeePage extends LitElement {
  static styles = css``;
  render() {
    return html` <sub-header-layout>
      <employee-area></employee-area>
    </sub-header-layout>`;
  }
}
customElements.define("add-page", AddEmployeePage);
