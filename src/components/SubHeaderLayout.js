import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class SubHeaderLayout extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    header {
      background-color: #f2f2f289;
      padding: 1rem;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 70px;
      z-index: 900;
      .title {
        font-size: x-large;
        margin-top: 2rem;
        color: #ff6101;
      }
      .icons {
        margin-top: 2rem;
        span {
          color: #ff6201a9;
          cursor: pointer;
          &:hover {
            color: #ff6101;
          }
        }
      }
    }
    main {
      height: 100%;
      background-color: #f2f2f289;
    }
  `;
  render() {
    return html`
      <header>
        <span class="title">Employee List</span>
        <div class="icons">
          <span>
            <iconify-icon
              icon="mdi:view-headline"
              width="24"
              height="24"
            ></iconify-icon
          ></span>

          <span>
            <iconify-icon
              icon="mdi:view-grid-outline"
              width="24"
              height="24"
            ></iconify-icon
          ></span>
        </div>
      </header>
      <main>
        <slot></slot>
      </main>
    `;
  }
}
customElements.define("sub-header-layout", SubHeaderLayout);
