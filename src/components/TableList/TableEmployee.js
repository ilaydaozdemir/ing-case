import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./TableRow.js";
import "./TableHeader.js";
import "./TableFooter.js";
import { store } from "../../store/store.js";
import "../Modal.js";
import { deleteEmployee } from "../../store/store.js";
export class TableEmployee extends LitElement {
  static properties = {
    employees: { type: Array },
    checkedAll: { type: Boolean },
    modalOpen: { type: Boolean },
    selectedEmail: { type: String },
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
      this.employees = [...store.getState().employees];
      this.requestUpdate();
    });
    this.modalOpen = false;
    this.selectedEmail = "";
  }
  _handleOpenDeleteModal(e) {
    const { id, firstName, lastName } = e.detail;
    this.selectedId = e.detail.id;
    this.selectedName = firstName;
    this.selectedSurname = lastName;
    this.modalOpen = true;
  }
  _handleConfirmDelete(e) {
    const id = e.detail.id;
    store.dispatch(deleteEmployee(id));
    this.modalOpen = false;
  }
  _handleCancelDelete() {
    this.modalOpen = false;
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
          @request-delete=${this._handleOpenDeleteModal}
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
        <delete-modal
          .open=${this.modalOpen}
          .employeeId=${this.selectedId}
          .employeeName=${this.selectedName}
          .employeeSurname=${this.selectedSurname}
          @confirm-delete=${this._handleConfirmDelete}
          @cancel-delete=${this._handleCancelDelete}
        ></delete-modal>
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
      emp.id === updatedEmp.id ? updatedEmp : emp
    );
    this.checkedAll = this.employees.every((emp) => emp.checked);
  }
}
customElements.define("table-employee", TableEmployee);
