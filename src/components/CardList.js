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
    .wrapper {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .card-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 40px;
      justify-content: center;
      margin-top: 10px;
    }

    .card-item {
      display: flex;
      justify-content: center;
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
  }

  _handleDelete(e) {
    const email = e.detail;
    store.dispatch(deleteEmployee(email));
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="card-list" @delete-card=${this._handleDelete}>
          ${this.employees.map(
            (emp) =>
              html`<div class="card-item">
                <card-item .employee=${emp}></card-item>
              </div>`
          )}
        </div>
      </div>
      <table-footer></table-footer>
    `;
  }
}

customElements.define("card-container", CardList);
