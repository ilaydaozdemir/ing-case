import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./TableRow.js";
import "./TableHeader.js";
export class TableEmployee extends LitElement {
  static properties = {
    employees: { type: Array },
    checkedAll: { type: Boolean },
  };
  static styles = css`
    .table-wrapper {
      overflow-x: auto;
      width: 100%;
    }
    .table {
      min-width: 1400px;
      width: max-content;
    }
  `;
  constructor() {
    super();
    this.checkedAll = false;
    this.employees = [
      {
        firstName: "Ayşe",
        lastName: "Yılmaz",
        dateOfEmployment: "2022-03-15",
        birthDate: "1994-07-12",
        phone: "+90 532 111 22 33",
        email: "ayse.yilmaz@gmail.com",
        department: "Analytics",
        position: "Medior",
        checked: false,
      },
      {
        firstName: "Mehmet",
        lastName: "Yılmaz",
        dateOfEmployment: "2022-03-15",
        birthDate: "1994-07-12",
        phone: "+90 532 111 22 33",
        email: "ayse.yilmaz@gmail.com",
        department: "Analytics",
        position: "Medior",
        checked: false,
      },
      {
        firstName: "Selman",
        lastName: "Yılmaz",
        dateOfEmployment: "2022-03-15",
        birthDate: "1994-07-12",
        phone: "+90 532 111 22 33",
        email: "ayse.yilmaz@gmail.com",
        department: "Analytics",
        position: "Medior",
        checked: false,
      },
      {
        firstName: "Lale",
        lastName: "Yılmaz",
        dateOfEmployment: "2022-03-15",
        birthDate: "1994-07-12",
        phone: "+90 532 111 22 33",
        email: "ayse.yilmaz@gmail.com",
        department: "Analytics",
        position: "Medior",
        checked: false,
      },
      {
        firstName: "Namık",
        lastName: "Yılmaz",
        dateOfEmployment: "2022-03-15",
        birthDate: "1994-07-12",
        phone: "+90 532 111 22 33",
        email: "ayse.yilmaz@gmail.com",
        department: "Analytics",
        position: "Medior",
        checked: false,
      },
      {
        firstName: "Huseyin",
        lastName: "Yılmaz",
        dateOfEmployment: "2022-03-15",
        birthDate: "1994-07-12",
        phone: "+90 532 111 22 33",
        email: "ayse.yilmaz@gmail.com",
        department: "Analytics",
        position: "Medior",
        checked: false,
      },
      {
        firstName: "Gamze",
        lastName: "Yılmaz",
        dateOfEmployment: "2022-03-15",
        birthDate: "1994-07-12",
        phone: "+90 532 111 22 33",
        email: "ayse.yilmaz@gmail.com",
        department: "Analytics",
        position: "Medior",
        checked: false,
      },
      {
        firstName: "Ali",
        lastName: "Yılmaz",
        dateOfEmployment: "2022-03-15",
        birthDate: "1994-07-12",
        phone: "+90 532 111 22 33",
        email: "ayse.yilmaz@gmail.com",
        department: "Analytics",
        position: "Medior",
        checked: false,
      },
    ];
  }
  render() {
    return html`
      <div class="table-wrapper">
        <div
          class="table"
          @select-all=${this._handleSelectAll}
          @row-checkbox-changed=${this._handleRowCheckboxChange}
        >
          <table-header .checkedAll=${this.checkedAll}></table-header>
          ${this.employees.map(
            (emp) => html`<table-row .employee=${{ ...emp }}></table-row>`
          )}
        </div>
      </div>
    `;
  }
  _handleSelectAll(e) {
    const checked = e.detail.checked;
    this.checkedAll = checked;
    this.employees = this.employees.map((emp) => ({ ...emp, checked }));
  }
  _handleRowCheckboxChange(e) {
    const updatedEmp = e.detail.employee;
    this.employees = this.employees.map((emp) =>
      emp.firstName === updatedEmp.firstName ? updatedEmp : emp
    );
    this.checkedAll = this.employees.every((emp) => emp.checked);
  }
}
customElements.define("table-employee", TableEmployee);
