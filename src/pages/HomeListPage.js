import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "../components/TableList/TableEmployee.js";
import "../components/SubHeaderLayout.js";
import "../components/CardList.js";
export class HomeListPage extends LitElement {
  static properties = {
    viewType: { type: String },
  };
  static styles = css`
    .wrapper {
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
          : html` <div class="wrapper">
              ${Array.from({ length: 1 }).map(
                () => html`<card-container></card-container>`
              )}
            </div>`}
      </sub-header-layout>
    `;
  }
}
customElements.define("home-list-page", HomeListPage);
