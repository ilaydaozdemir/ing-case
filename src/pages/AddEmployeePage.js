import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "../components/SubHeaderLayout.js";
import "../components/EmployeeArea.js";
import { store, addEmployee } from "../store/store.js";

export class AddEmployeePage extends LitElement {
  static properties = {
    formData: { type: Object },
    errors: { type: Object },
  };
  constructor() {
    super();
    this.formData = {
      firstName: "",
      lastName: "",
      dob: "",
      employmentDate: "",
      phone: "",
      email: "",
      department: "",
      position: "",
    };
    this.errors = {};
  }
  handleInputChange(e) {
    const { key, value } = e.detail;
    this.formData = { ...this.formData, [key]: value };
    this.errors = { ...this.errors, [key]: "" };
  }
  validate() {
    const errors = {};

    if (!this.formData.firstName.trim()) {
      errors.firstName = "First name is required.";
    }
    if (!this.formData.lastName.trim()) {
      errors.lastName = "Last name is required.";
    }
    if (!this.formData.dob) {
      errors.dob = "Date of birth is required.";
    } else if (new Date(this.formData.dob) >= new Date()) {
      errors.dob = "Date of birth must be in the past.";
    }
    if (!this.formData.employmentDate) {
      errors.employmentDate = "Employment date is required.";
    }
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(this.formData.phone)) {
      errors.phone = "Invalid phone number.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      errors.email = "Invalid email address.";
    }
    const departments = ["Analytics", "Tech"];
    if (!departments.includes(this.formData.department)) {
      errors.department = "Please select a valid department.";
    }
    const positions = ["Junior", "Medior", "Senior"];
    if (!positions.includes(this.formData.position)) {
      errors.position = "Please select a valid position.";
    }
    this.errors = errors;
    return Object.keys(errors).length === 0;
  }
  handleSubmit() {
    if (this.validate()) {
      store.dispatch(addEmployee(this.formData));
      window.location.href = "/";
    } else {
      console.warn("Form validation failed", this.errors);
    }
  }
  handleCancel() {
    window.history.back();
  }
  static styles = css``;
  render() {
    return html` <sub-header-layout>
      <employee-area
        .formData=${this.formData}
        .errors=${this.errors}
        @input-change=${this.handleInputChange}
        @submit-click=${this.handleSubmit}
        @cancel-click=${this.handleCancel}
      ></employee-area>
    </sub-header-layout>`;
  }
}
customElements.define("add-page", AddEmployeePage);
