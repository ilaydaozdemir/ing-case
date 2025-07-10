import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import { store, deleteEmployee } from "../store/store.js";
import "./Card.js";
import { Router } from "https://cdn.jsdelivr.net/npm/@vaadin/router/+esm";

export class CardList extends LitElement {
  static properties = {
    employees: { type: Array },
  };

  static styles = css`
    .card-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  `;

  constructor() {
    super();
    this.employees = store.getState().employees;

    this.unsubscribe = store.subscribe(() => {
      this.employees = [...store.getState().employees];
      this.requestUpdate();
    });

    window.addEventListener("navigate-edit", (e) => {
      Router.go(`/edit/${e.detail}`);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) this.unsubscribe();
    window.removeEventListener("navigate-edit", this._navHandler);
  }

  _handleDelete(e) {
    const email = e.detail;
    store.dispatch(deleteEmployee(email));
  }

  render() {
    return html`
      <div class="card-list" @delete-card=${this._handleDelete}>
        ${this.employees.map(
          (emp) => html`<card-item .employee=${emp}></card-item>`
        )}
      </div>
    `;
  }
}

customElements.define("card-container", CardList);
