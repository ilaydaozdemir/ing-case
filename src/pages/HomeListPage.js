import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class HomeListPage extends LitElement {
  static styles = css`
    div {
      color: red;
      background-color: gray;
    }
  `;
  render() {
    return html` <div>HomeListPage page</div> `;
  }
}
customElements.define("home-list-page", HomeListPage);
