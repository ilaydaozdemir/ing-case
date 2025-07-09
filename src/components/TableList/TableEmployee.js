import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./TableRow.js";
import "./TableHeader.js";
import "./TableFooter.js";
import { store } from "../../store/store.js";
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
    this.employees = store.getState().employees;
    this.currentPage = 1;
    store.subscribe(() => {
      this.employees = store.getState().employees;
      this.requestUpdate();
    });
  }
  render() {
    const start = (this.currentPage - 1) * 10;
    const end = this.currentPage * 10;
    const paginatedEmployees = this.employees.slice(start, end);
    return html`
      <div class="table-wrapper">
        <div
          class="table"
          @select-all=${this._handleSelectAll}
          @row-checkbox-changed=${this._handleRowCheckboxChange}
        >
          <table-header .checkedAll=${this.checkedAll}></table-header>
          ${paginatedEmployees.map(
            (emp) => html`<table-row .employee=${{ ...emp }}></table-row>`
          )}
          <table-footer
            .currentPage=${this.currentPage}
            .totalPages=${Math.ceil(this.employees.length / 10)}
            @page-change=${this._onPageChange}
          ></table-footer>
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
      emp.email === updatedEmp.email ? updatedEmp : emp
    );
    this.checkedAll = this.employees.every((emp) => emp.checked);
  }
}
customElements.define("table-employee", TableEmployee);
