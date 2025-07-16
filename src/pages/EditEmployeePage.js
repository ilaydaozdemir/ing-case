import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "../components/SubHeaderLayout.js";
import { Router } from "https://cdn.jsdelivr.net/npm/@vaadin/router/+esm";
import "../components/EmployeeArea.js";
import { store, updateEmployee } from "../store/store.js";
export class EditEmployeePage extends LitElement {
  static properties = {
    formData: { type: Object },
    errors: { type: Object },
    viewType: { type: String },
  };
  constructor() {
    super();
    this.formData = {};
    this.errors = {};
    this.unsubscribe = null;
    this.viewType = "table";
  }
  connectedCallback() {
    super.connectedCallback();
    const path = window.location.pathname;
    const parts = path.split("/");
    const id = decodeURIComponent(parts[2]);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(window.location.search);
    this.viewType = url.searchParams.get("view") || "table";
    this.unsubscribe = store.subscribe(() => {
      this.requestUpdate();
    });

    const employee = store.getState().employees.find((emp) => emp.id === id);
    if (employee) {
      this.formData = { ...employee };
      this.requestUpdate();
    } else {
      console.warn("Employee not found for ID:", id);
    }
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
    store.dispatch(updateEmployee(this.formData));
    if (this.viewType === "card") {
      Router.go("/cards");
    } else {
      Router.go("/");
    }
  }

  handleCancel() {
    if (this.viewType === "card") {
      Router.go("/cards");
    } else {
      Router.go("/");
    }
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
