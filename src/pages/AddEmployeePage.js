import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import { v4 as uuidv4 } from "https://cdn.jsdelivr.net/npm/uuid@9.0.0/+esm";
import "../components/SubHeaderLayout.js";
import "../components/EmployeeArea.js";
import { store, addEmployee } from "../store/store.js";
import { t } from "../i18n.js";

export class AddEmployeePage extends LitElement {
  static properties = {
    formData: { type: Object },
    errors: { type: Object },
    language: { type: String },
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
    this.language = localStorage.getItem("lang") || "tr";
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

  handleInputChange(e) {
    const { key, value } = e.detail;
    this.formData = { ...this.formData, [key]: value };
    this.errors = { ...this.errors, [key]: "" };
  }

  validate() {
    const errors = {};
    if (!this.formData.firstName.trim()) {
      errors.firstName = t("firstName.required", this.language);
    }

    if (!this.formData.lastName.trim()) {
      errors.lastName = t("lastName.required", this.language);
    }

    if (!this.formData.dob) {
      errors.dob = t("dob.required", this.language);
    } else if (new Date(this.formData.dob) >= new Date()) {
      errors.dob = t("dob.past", this.language);
    }

    if (!this.formData.employmentDate) {
      errors.employmentDate = t("employmentDate.required", this.language);
    }

    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(this.formData.phone)) {
      errors.phone = t("invalid.phone", this.language);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      errors.email = t("invalid.email", this.language);
    }

    const departments = ["Analytics", "Tech"];
    if (!departments.includes(this.formData.department)) {
      errors.department = t("select.valid.department", this.language);
    }

    const positions = ["Junior", "Medior", "Senior"];
    if (!positions.includes(this.formData.position)) {
      errors.position = t("select.valid.position", this.language);
    }

    this.errors = errors;
    return Object.keys(errors).length === 0;
  }

  handleSubmit() {
    if (this.validate()) {
      const newEmployee = {
        id: uuidv4(),
        ...this.formData,
        checked: false,
      };
      store.dispatch(addEmployee(newEmployee));
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
    const labels = {
      firstName: t("form.name", this.language),
      lastName: t("form.surname", this.language),
      dob: t("form.birthday", this.language),
      employmentDate: t("form.doe", this.language),
      phone: t("form.phone", this.language),
      email: "Email",
      department: t("form.department", this.language),
      position: t("form.position", this.language),
      save: t("button.save", this.language),
      cancel: t("button.cancel", this.language),
    };

    return html`
      <sub-header-layout>
        <employee-area
          .formData=${this.formData}
          .errors=${this.errors}
          .labels=${labels}
          @input-change=${this.handleInputChange}
          @submit-click=${this.handleSubmit}
          @cancel-click=${this.handleCancel}
        ></employee-area>
      </sub-header-layout>
    `;
  }
}

customElements.define("add-page", AddEmployeePage);
