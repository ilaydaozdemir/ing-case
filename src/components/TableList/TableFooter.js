import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class TableFooter extends LitElement {
  static properties = {
    currentPage: { type: Number },
    totalPages: { type: Number },
  };
  static styles = css`
    .footer {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 12px;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      flex-direction: row;
    }
    .page {
      width: 36px;
      height: 36px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0f0e0e5b;
    }
    .page:hover {
      border-radius: 50%;
      background-color: #ff6101;
      color: white;
    }
    .arrow {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0f0e0e5b;
      &:hover {
        color: #ff6101;
      }
    }
    .active {
      background-color: #ff6101;
      color: white;
      font-weight: bold;
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    .dots {
      padding: 6px 10px;
      color: #aaa;
      pointer-events: none;
    }
    @media (max-width: 480px) {
      .footer {
        font-size: 12px;
        gap: 6px;
      }
      .page,
      .arrow {
        padding: 4px 8px;
        min-width: 24px;
      }
    }
  `;

  constructor() {
    super();
    this.currentPage = 1;
    this.totalPages = 1;
  }
  _changePage(page) {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.dispatchEvent(
        new CustomEvent("page-change", {
          detail: { page },
          bubbles: true,
          composed: true,
        })
      );
    }
  }
  _renderPages() {
    const pages = [];
    const { currentPage, totalPages } = this;
    pages.push(html`
      <div class="arrow" @click=${() => this._changePage(currentPage - 1)}>
        <iconify-icon
          icon="mdi:chevron-left"
          width="24"
          height="24"
        ></iconify-icon>
      </div>
    `);
    pages.push(this._renderPageNumber(1));
    if (currentPage > 3) {
      pages.push(html`<div class="dots">...</div>`);
    }
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(this._renderPageNumber(i));
      }
    }
    if (currentPage < totalPages - 2) {
      pages.push(html`<div class="dots">...</div>`);
    }
    if (totalPages > 1) {
      pages.push(this._renderPageNumber(totalPages));
    }
    pages.push(html`
      <div class="arrow" @click=${() => this._changePage(currentPage + 1)}>
        <iconify-icon
          icon="mdi:chevron-right"
          width="24"
          height="24"
        ></iconify-icon>
      </div>
    `);
    return pages;
  }
  _renderPageNumber(page) {
    return html`
      <div
        class="page ${this.currentPage === page ? "active" : ""}"
        @click=${() => this._changePage(page)}
      >
        ${page}
      </div>
    `;
  }

  render() {
    return html`<div class="footer">${this._renderPages()}</div>`;
  }
}

customElements.define("table-footer", TableFooter);
