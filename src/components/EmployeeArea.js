import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class EmployeeArea extends LitElement {
  static properties = {
    formData: { type: Object },
    errors: { type: Object },
  };
  constructor() {
    super();
    this.formData = {};
    this.errors = {};
  }
  static styles = css`
    .employee-area {
      background-color: white;
      padding: 2rem;
      width: 100%;
      margin: 0 auto;
      max-width: 1200px;
      min-height: auto;
      overflow-y: hidden;
    }
    .employee-wrapper {
      background-color: white;
      padding: 1rem;
      gap: 2rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .area-1,
    .area-2,
    .area-3 {
      flex: 1 1 300px;
      min-width: 280px;
      margin-right: 3rem;
    }
    .input {
      margin-top: 1rem;
    }
    input {
      padding: 0.5rem 1rem;
      border: 1px solid #9e9e9efb;
      border-radius: 4px;
      outline: none;
      width: 100%;
      box-sizing: border-box;
    }
    select {
      padding: 0.5rem 1rem;
      border: 1px solid #9e9e9efb;
      border-radius: 4px;
      outline: none;
      width: 100%;
      box-sizing: border-box;
    }
    .sub-area {
      margin-bottom: 3rem;
    }
    .button-area {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin-top: 2rem;
      gap: 1rem;
    }
    .save {
      margin-right: 3rem;
      padding: 8px;
      text-align: center;
      border-radius: 6px;
      width: 200px;
      background-color: #ff6101;
      border: 1px solid #ff6101;
      border: none;
      color: white;
    }
    .cancel {
      margin-right: 2rem;
      padding: 8px;
      text-align: center;
      border-radius: 6px;
      width: 200px;
      border: 1px solid #541aabcc;
      color: #541aabcc;
      background-color: white;
    }
    @media (max-width: 768px) {
      .employee-wrapper {
        flex-direction: column;
        padding: 1rem;
      }
      .area-1,
      .area-2,
      .area-3 {
        margin-right: 0;
      }
    }
    .error {
      color: #d32f2f;
      background-color: #fdecea;
      border-left: 4px solid #d32f2f;
      padding: 0.3rem 0.5rem;
      border-radius: 2px;
      font-size: 0.85rem;
      margin-top: 0.3rem;
      font-weight: 600;
      font-family: Arial, sans-serif;
    }
  `;

  handleInput(key, e) {
    this.dispatchEvent(
      new CustomEvent("input-change", {
        detail: { key, value: e.target.value },
        bubbles: true,
        composed: true,
      })
    );
  }
  handleSubmit() {
    this.dispatchEvent(
      new CustomEvent("submit-click", { bubbles: true, composed: true })
    );
  }
  handleCancel() {
    this.dispatchEvent(
      new CustomEvent("cancel-click", { bubbles: true, composed: true })
    );
  }
  renderInput(label, key, type = "text") {
    return html`
      <div class="sub-area">
        <span class="title">${label}</span>
        <div class="input">
          <input
            type=${type}
            .value=${this.formData[key] || ""}
            @input=${(e) => this.handleInput(key, e)}
          />
          ${this.errors[key]
            ? html`<div class="error">${this.errors[key]}</div>`
            : ""}
        </div>
      </div>
    `;
  }
  renderSelect(label, key, options = []) {
    return html`
      <div class="sub-area">
        <span class="title">${label}</span>
        <div class="input">
          <select
            .value=${this.formData[key] || ""}
            @change=${(e) => this.handleInput(key, e)}
          >
            <option value="">Select...</option>
            ${options.map((opt) => html`<option value=${opt}>${opt}</option>`)}
          </select>
          ${this.errors[key]
            ? html`<div class="error">${this.errors[key]}</div>`
            : ""}
        </div>
      </div>
    `;
  }
  render() {
    return html`
      <div class="employee-area">
        <div class="employee-wrapper">
          <div class="area-1">
            <div class="sub-area">
              ${this.renderInput("First Name", "firstName")}
              ${this.renderInput("Date of Birth", "dob", "date")}
              ${this.renderSelect("Department", "department", [
                "Analytics",
                "Tech",
              ])}
            </div>
          </div>
          <div class="area-2">
            <div class="sub-area">
              ${this.renderInput("Last Name", "lastName")}
              ${this.renderInput("Phone", "phone", "tel")}
              ${this.renderSelect("Position", "position", [
                "Junior",
                "Medior",
                "Senior",
              ])}
            </div>
          </div>
          <div class="area-3">
            <div class="sub-area">
              ${this.renderInput(
                "Date of Employment",
                "employmentDate",
                "date"
              )}
              ${this.renderInput("Email", "email", "email")}
            </div>
          </div>
        </div>
        <div class="button-area">
          <button class="save" @click=${this.handleSubmit}>Save</button>
          <button class="cancel" @click=${this.handleCancel}>Cancel</button>
        </div>
      </div>
    `;
  }
}
customElements.define("employee-area", EmployeeArea);
