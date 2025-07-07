import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./TableRow.js";
import "./TableHeader.js";
export class TableEmployee extends LitElement {
  static styles = css`
    .table-wrapper {
      overflow-x: auto;
      width: 100%;
    }
    .table {
      min-width: 1200px;
      margin-top: 80px;
    }
  `;
  static properties = {
    employees: { type: Array },
  };
  constructor() {
    super();
    this.employees = [
      {
        checkbox: "✔️",
        firstName: "Ayşe",
        lastName: "Yılmaz",
        dateOfEmployment: "2022-03-15",
        birthDate: "1994-07-12",
        phone: "+90 532 111 22 33",
        email: "ayse.yilmaz@example.com",
        department: "Analytics",
        position: "Medior",
      },
      {
        checkbox: "✔️",
        firstName: "Mehmet",
        lastName: "Yılmaz",
        dateOfEmployment: "2022-03-15",
        birthDate: "1994-07-12",
        phone: "+90 532 111 22 33",
        email: "ayse.yilmaz@example.com",
        department: "Analytics",
        position: "Medior",
      },
    ];
  }
  render() {
    return html`
      <div class="table-wrapper">
        <div class="table">
          <table-header></table-header>
          ${this.employees.map(
            (emp) => html`<table-row .employee=${emp}></table-row>`
          )}
        </div>
      </div>
    `;
  }
}
customElements.define("table-employee", TableEmployee);
