import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "../components/TableList/TableEmployee.js";
import "../components/SubHeaderLayout.js";
import "../components/Card.js";
export class HomeListPage extends LitElement {
  static properties = {
    viewType: { type: String },
  };
  static styles = css`
    div {
    }
  `;
  constructor() {
    super();
    this.viewType = "table";
  }
  _handleViewChange(e) {
    this.viewType = e.detail.view;
  }
  render() {
    return html`
      <sub-header-layout @view-change=${this._handleViewChange}>
        ${this.viewType === "table"
          ? html` <div><table-employee></table-employee></div>`
          : html` <div
              style="display: flex; flex-wrap: wrap; gap: 1rem; padding: 1rem"
            >
              ${Array.from({ length: 1 }).map(
                () => html`<card-list></card-list>`
              )}
            </div>`}
      </sub-header-layout>
    `;
  }
}
customElements.define("home-list-page", HomeListPage);
