import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class EmployeeArea extends LitElement {
  static styles = css`
    .employee-area {
      background-color: white;
      padding: 2rem;
      width: 100%;
      margin: 0 auto;
      max-width: 1200px;
      min-height: auto;
      overflow-y: hidden;
    }
    .employee-wrapper {
      background-color: white;
      padding: 1rem;
      gap: 2rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .area-1,
    .area-2,
    .area-3 {
      flex: 1 1 300px;
      min-width: 280px;
      margin-right: 3rem;
    }
    .input {
      margin-top: 1rem;
    }
    input {
      padding: 0.5rem 1rem;
      border: 1px solid #9e9e9efb;
      border-radius: 4px;
      outline: none;
      width: 100%;
      box-sizing: border-box;
    }
    select {
      padding: 0.5rem 1rem;
      border: 1px solid #9e9e9efb;
      border-radius: 4px;
      outline: none;
      width: 100%;
      box-sizing: border-box;
    }
    .sub-area {
      margin-bottom: 3rem;
    }
    .button-area {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin-top: 2rem;
      gap: 1rem;
    }
    .save {
      margin-right: 3rem;
      padding: 8px;
      text-align: center;
      border-radius: 6px;
      width: 200px;
      background-color: #ff6101;
      border: 1px solid #ff6101;
      border: none;
      color: white;
    }
    .cancel {
      margin-right: 2rem;
      padding: 8px;
      text-align: center;
      border-radius: 6px;
      width: 200px;
      border: 1px solid #541aabcc;
      color: #541aabcc;
      background-color: white;
    }
    @media (max-width: 768px) {
      .employee-wrapper {
        flex-direction: column;
        padding: 1rem;
      }
      .area-1,
      .area-2,
      .area-3 {
        margin-right: 0;
      }
    }
  `;

  render() {
    return html`
      <div class="employee-area">
        <div class="employee-wrapper">
          <div class="area-1">
            <div class="sub-area">
              <span class="title"> First Name </span>
              <div class="input"><input type="text" /></div>
            </div>
            <div class="sub-area">
              <span class="title"> Date of Birth </span>
              <div class="input"><input type="date" /></div>
            </div>
            <div class="sub-area">
              <span class="title"> Department </span>
              <div class="input"><input type="text" /></div>
            </div>
          </div>
          <div class="area-2">
            <div class="sub-area">
              <span class="title"> Last Name </span>
              <div class="input"><input type="text" /></div>
            </div>
            <div class="sub-area">
              <span class="title"> Phone </span>
              <div class="input"><input type="tel" /></div>
            </div>
            <div class="sub-area">
              <span class="title"> Position </span>
              <div class="input">
                <select id="position" name="position">
                  <option value="">Select...</option>
                  <option value="analytics">Analytics</option>
                  <option value="development">Development</option>
                  <option value="hr">Human Resources</option>
                </select>
              </div>
            </div>
          </div>
          <div class="area-3">
            <div class="sub-area">
              <span class="title"> Date of Employment</span>
              <div class="input"><input type="date" /></div>
            </div>
            <div class="sub-area">
              <span class="title"> Email </span>
              <div class="input"><input type="email" /></div>
            </div>
          </div>
        </div>
        <div class="button-area">
          <button class="save">Save</button>
          <button class="cancel">Cancel</button>
        </div>
      </div>
    `;
  }
}
customElements.define("employee-area", EmployeeArea);
