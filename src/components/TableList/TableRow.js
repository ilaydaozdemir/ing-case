import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class TableRow extends LitElement {
  static properties = {
    employee: { type: Object },
  };
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    .row {
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
      border-top: 1px solid #ddddddaf;
      background-color: #fff;
      align-items: center;
      font-size: 12px;
    }
    .row:hover {
      background-color: #f9f9f9;
    }
    .actions {
      display: flex;
    }
    .actions iconify-icon {
      cursor: pointer;
      color: #ff6201a9;
    }
    .actions iconify-icon:hover {
      color: #ff6101;
    }
  `;
  static properties = {
    employee: { type: Object },
  };
  constructor() {
    super();
    this.employee = {};
  }
  _onCheckboxChanged(e) {
    const checked = e.detail.checked;
    const updated = { ...this.employee, checked };
    this.dispatchEvent(
      new CustomEvent("row-checkbox-changed", {
        detail: {
          employee: updated,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
  render() {
    const emp = this.employee || {
      firstName: "John",
      lastName: "Doe",
      dateOfEmployment: "1990-01-01",
      birthDate: "1990-01-01",
      phone: "+90 555 555 55 55",
      email: "john.doe@gmail.com",
      department: "it",
      position: "Senior",
      checked: false,
    };
    return html`
      <div class="row">
        <checkbox-component
          .checked=${this.employee.checked}
          @checkbox-changed=${this._onCheckboxChanged}
        ></checkbox-component>
        <div data-label="First Name">${emp.firstName}</div>
        <div data-label="Last Name">${emp.lastName}</div>
        <div data-label="Date of Employment">${emp.dateOfEmployment}</div>
        <div data-label="Date of Birth">${emp.birthDate}</div>
        <div data-label="Phone">${emp.phone}</div>
        <div data-label="Email">${emp.email}</div>
        <div data-label="Department">${emp.department}</div>
        <div data-label="Position">${emp.position}</div>
        <div class="actions" data-label="Actions">
          <iconify-icon icon="mdi:pencil" width="20" height="20"></iconify-icon>
          <iconify-icon icon="mdi:delete" width="20" height="20"></iconify-icon>
        </div>
      </div>
    `;
  }
}
customElements.define("table-row", TableRow);
