import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "../components/SubHeaderLayout.js";
import { Router } from "https://cdn.jsdelivr.net/npm/@vaadin/router/+esm";
import "../components/EmployeeArea.js";
import { store } from "../store/store.js";
export class EditEmployeePage extends LitElement {
  static properties = {
    formData: { type: Object },
    errors: { type: Object },
  };
  constructor() {
    super();
    this.formData = {};
    this.errors = {};
    this.unsubscribe = null;
  }
  connectedCallback() {
    super.connectedCallback();
    const path = window.location.pathname;
    const parts = path.split("/");
    const email = decodeURIComponent(parts[2]);
    console.log("EDITING EMAIL:", email);
    const employee = store
      .getState()
      .employees.find((emp) => emp.email === email);
    if (employee) {
      this.formData = { ...employee };
    }
    console.log("EDIT PAGE FORM DATA:", this.formData);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  handleInputChange(e) {
    const { key, value } = e.detail;
    this.formData = { ...this.formData, [key]: value };
  }
  handleSubmit() {
    store.dispatch({
      type: "UPDATE_EMPLOYEE",
      payload: this.formData,
    });
    Router.go("/");
  }
  handleCancel() {
    Router.go("/edit/:email");
  }
  static styles = css`
    div {
      color: red;
      background-color: gray;
    }
  `;
  render() {
    return html`
      <sub-header-layout>
        <employee-area
          .formData=${this.formData}
          .errors=${this.errors}
          @input-change=${this.handleInputChange}
          @submit-click=${this.handleSubmit}
          @cancel-click=${this.handleCancel}
        ></employee-area>
      </sub-header-layout>
    `;
  }
}
customElements.define("edit-page", EditEmployeePage);
