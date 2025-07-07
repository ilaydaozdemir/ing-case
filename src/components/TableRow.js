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
      grid-template-columns: 12px repeat(9, minmax(120px, 1fr));
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
    //mobile
    @media (max-width: 768px) {
      .row {
        gap: 0.5rem;
        grid-template-columns: repeat(10, minmax(100px, 1fr));
        grid-row-gap: 8px;
        font-size: 12px;
        padding: 10px;
      }
      .row > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .row > div::before {
        content: attr(data-label);
        font-weight: bold;
        color: #888;
      }
      .actions {
        justify-content: flex-end;
      }
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
    this.dispatchEvent(
      new CustomEvent("row-checkbox-changed", {
        detail: {
          employee: { ...this.employee, checked },
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
      email: "john.doe@example.com",
      department: "it",
      position: "Senior",
      checked: false,
    };
    return html`
      <div class="row">
        <checkbox-component
          .checked=${emp.checked}
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
