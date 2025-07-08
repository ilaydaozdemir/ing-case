import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./TableList/TableFooter.js";
export class Card extends LitElement {
  static styles = css`
    .card-wrapper {
      width: 350px;
      height: auto;
      background-color: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      padding: 1rem;
    }
    .card {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .text {
      color: #0f0e0e5b;
      font-size: 12px;
    }
    .information {
      font-size: 14px;
      margin-bottom: 2rem;
    }
    .card-left-side {
    }
    .card-right-side {
    }
    .button-area {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
    }
    button {
      margin-right: 0.5rem;
      border: none;
      border-radius: 3px;
      padding: 6px;
    }
    .edit,
    .delete {
      display: flex;
      align-items: center;
      padding: 8px;
      color: white;
    }
    span {
      margin-right: 6px;
    }
    .edit {
      background-color: #541aabcc;
    }
    .delete {
      background-color: #ff6101;
    }
  `;
  render() {
    return html` <div class="card-wrapper">
        <div class="card">
          <div>
            <div class="text">First Name:</div>
            <div class="information">Ahmet</div>
            <div class="text">First Date of Employment</div>
            <div class="information">23/09/2022</div>
            <div class="text">Phone</div>
            <div class="information">+(90) 532 123 45 67</div>
            <div class="text">Department</div>
            <div class="information">Analytics</div>
          </div>
          <div>
            <div class="text">Last Name</div>
            <div class="information">Sourtimes</div>
            <div class="text">Date of Birth</div>
            <div class="information">23/09/2022</div>
            <div class="text">Email</div>
            <div class="information">ahmet@sourtimes.org</div>
            <div class="text">Position</div>
            <div class="information">Junior</div>
          </div>
        </div>
        <div class="button-area ">
          <button class="edit">
            <span
              ><iconify-icon
                icon="mdi:square-edit-outline"
                width="16"
                height="16"
              ></iconify-icon> </span
            >Edit
          </button>
          <button class="delete">
            <span
              ><iconify-icon
                icon="mdi:delete-outline"
                width="16"
                height="16"
              ></iconify-icon> </span
            >Delete
          </button>
        </div>
      </div>
      <table-footer></table-footer>`;
  }
}
customElements.define("card-list", Card);
