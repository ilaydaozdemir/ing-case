import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class CheckboxComponent extends LitElement {
  static styles = css`
    label {
      display: flex;
      font-size: 12px;
      cursor: pointer;
    }
    input[type="checkbox"] {
      accent-color: #ff6101;
    }
  `;
  static properties = {
    checked: { type: Boolean, reflect: true },
  };
  constructor() {
    super();
    this.checked = false;
  }
  handleChange(e) {
    this.checked = e.target.checked;
    this.dispatchEvent(
      new CustomEvent("checkbox-changed", {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      })
    );
  }
  render() {
    return html`
      <label>
        <input
          type="checkbox"
          .checked=${this.checked}
          @change=${this.handleChange}
        />
      </label>
    `;
  }
}

customElements.define("checkbox-component", CheckboxComponent);
