import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "../components/TableEmployee.js";
export class HomeListPage extends LitElement {
  static styles = css`
    div {
    }
  `;
  render() {
    return html`
      <sub-header-page>
        <div><table-employee></table-employee></div>
      </sub-header-page>
    `;
  }
}
customElements.define("home-list-page", HomeListPage);
