import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import styleContent from './wallet-assistant-style.css' assert { type: 'text' };

const DIGIT_ONLY_FORMATS = new Set([
  "EAN", "EAN13", "EAN8", "UPC", "ITF", "ITF14",
  "MSI", "MSI10", "MSI11", "MSI1010", "MSI1110", "pharmacode"
]);
const LOGO_DEV_PUBLISHABLE_KEY = "pk_Svpm4b4MRmC5bvOmTw9jdg";
const API_PATH = "wallet_assistant";
const TYPE_LABELS = {
  loyalty: "Card",
  voucher: "Voucher",
  promotion: "Promo"
};
const CARD_TYPE = "wallet-assistant-card";

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === CARD_TYPE)) {
  window.customCards.push({
    type: CARD_TYPE,
    name: "Wallet Assistant",
    description: "Manage loyalty cards, vouchers, and promotions.",
    preview: false,
    documentationURL: "https://github.com/myTselection/Wallet-Assistant",
  });
}

function sanitizeCode(value, fmt) {
  let s = String(value ?? "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "");
  if (DIGIT_ONLY_FORMATS.has(fmt)) s = s.replace(/\D/g, "");
  return s;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function getCardInitial(name) {
  return String(name || "?").trim().charAt(0).toUpperCase() || "?";
}

function getLogoUrl(slug, size = 64) {
  const cleanSlug = String(slug ?? "").trim();
  if (!cleanSlug) return "";
  return `https://img.logo.dev/${encodeURIComponent(cleanSlug)}?token=${LOGO_DEV_PUBLISHABLE_KEY}&size=${size}&format=webp&retina=true`;
}

function getItemId(item) {
  return item?.item_id;
}

function getItemType(item) {
  return item?.item_type || "loyalty";
}

function getTypeLabel(item) {
  return TYPE_LABELS[getItemType(item)] || "Item";
}

function formatExpiry(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function normalizeItem(item) {
  return {
    ...item,
    item_id: getItemId(item),
    item_type: getItemType(item),
    format: item.format || "CODE128",
    code: item.code || "",
    expires_on: item.expires_on || ""
  };
}

function renderBarcodeCentral(target, code, fmt, opts = {}, errorTarget = null) {
  const clean = sanitizeCode(code, fmt);
  if (target instanceof HTMLCanvasElement) {
    const ctx = target.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, target.width, target.height);
  } else {
    while (target.firstChild) target.removeChild(target.firstChild);
  }
  if (errorTarget) errorTarget.style.display = "none";

  try {
    JsBarcode(target, clean, {
      format: fmt,
      width: 5,
      height: 80,
      ...opts
    });
    return { ok: true };
  } catch (err) {
    const msg = `Invalid input for ${fmt}.` + (err?.message ? ` (${err.message})` : "");
    if (errorTarget) {
      errorTarget.textContent = msg;
      errorTarget.style.display = "block";
    } else if (target && target.parentElement) {
      const div = document.createElement("div");
      div.className = "error";
      div.style.cssText = "color:red;font-size:0.9em;";
      div.textContent = msg;
      target.replaceWith(div);
    }

    //console.error("Barcode render error:", err);
    return { ok: false, message: msg };
  }
}

class WalletAssistantCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.viewModes = {};
    this.selectedCard = null;
    this.activeTab = "own";
    this.activeType = "all";
    this._inputState = { name: "", code: "", logo_slug: "", item_type: "loyalty", expires_on: "" };

    this.toolbarContainer = document.createElement("div");
    this.toolbarContainer.className = "toolbar";
    this.dynamicContainer = document.createElement("div");

    this.filterText = "";
    this.showAddDialog = false;
    this.cardViewMode = "grid";

    const style = document.createElement("style");
    style.textContent = styleContent;
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(this.toolbarContainer);
    this.shadowRoot.appendChild(this.dynamicContainer);

    this.toolbarContainer.innerHTML = `
      <div class="tabs">
        <div class="tab active" id="tab-own">My Items</div>
        <div class="tab" id="tab-others">Others' Items</div>
      </div>
      <div class="type-filter">
        <button class="type-pill active" id="type-all" type="button">All</button>
        <button class="type-pill" id="type-loyalty" type="button">Cards</button>
        <button class="type-pill" id="type-voucher" type="button">Vouchers</button>
      </div>
      <div class="action-row">
        <input id="filter" class="filter-input" placeholder="Filter items..." value="" />
        <button id="toggle-card-view" class="toolbar-icon-button" title="Grid view"><ha-icon icon="mdi:view-grid"></ha-icon></button>
        <button id="add-card" class="toolbar-icon-button" title="Add item"><ha-icon icon="mdi:plus"></ha-icon></button>
      </div>
    `;

    this.toolbarContainer.querySelector("#filter")
      ?.addEventListener("input", (event) => {
        this.filterText = event.target.value;
        this.render();
      });

    this.toolbarContainer.querySelector("#add-card")
      ?.addEventListener("click", () => {
        this.showAddDialog = true;
        this.render();
      });

    this.toolbarContainer.querySelector("#toggle-card-view")
      ?.addEventListener("click", () => {
        this.cardViewMode = this.cardViewMode === "list" ? "grid" : "list";
        this.render();
      });

    this.toolbarContainer.querySelector("#tab-own")
      ?.addEventListener("click", () => {
        this.activeTab = "own";
        this.render();
      });
    this.toolbarContainer.querySelector("#tab-others")
      ?.addEventListener("click", () => {
        this.activeTab = "others";
        this.render();
      });

    ["all", "loyalty", "voucher"].forEach(type => {
      this.toolbarContainer.querySelector(`#type-${type}`)
        ?.addEventListener("click", () => {
          this.activeType = type;
          this.render();
        });
    });
  }

  setConfig(config) {
    this._config = config;
  }

  static getStubConfig() {
    return {};
  }

  set hass(hass) {
    this._hass = hass;
    this.loadCards();
  }

  async loadCards() {
    const nameEl = this.shadowRoot.getElementById("add-name") || this.shadowRoot.getElementById("name");
    const codeEl = this.shadowRoot.getElementById("add-code") || this.shadowRoot.getElementById("code");
    const logoSlugEl = this.shadowRoot.getElementById("add-logo-slug") || this.shadowRoot.getElementById("logo-slug");
    const typeEl = this.shadowRoot.getElementById("add-type");
    const expiresEl = this.shadowRoot.getElementById("add-expires-on");
    const activeId = this.shadowRoot.activeElement?.id || document.activeElement?.id;
    if (nameEl || codeEl || logoSlugEl || typeEl || expiresEl) {
      this._inputState.name = nameEl?.value || "";
      this._inputState.code = codeEl?.value || "";
      this._inputState.logo_slug = logoSlugEl?.value || "";
      this._inputState.item_type = typeEl?.value || "loyalty";
      this._inputState.expires_on = expiresEl?.value || "";
      this._inputState.focusId = activeId;
    }

    const all = await this._hass.callApi("get", API_PATH);
    const uid = this._hass.user.id;

    const items = all.map(normalizeItem);
    this.ownCards = items.filter(c => c.user_id === uid);
    this.otherCards = items.filter(c => c.user_id !== uid);
    this.render();
  }

  toggleCodeType(cardId) {
    this.viewModes[cardId] = this.viewModes[cardId] === "barcode" ? "qr" : "barcode";
    this.render();
  }

  openCard(cardId) {
    this.selectedCard = [...this.ownCards, ...this.otherCards].find(c => getItemId(c) === cardId);
    if (!this.viewModes[cardId]) {
      this.viewModes[cardId] = localStorage.getItem(`wallet-assistant-mode-${cardId}`) || "barcode";
    }
    this.render();
  }

  closeCard() {
    this.selectedCard = null;
    this.render();
  }

  async addCard(e) {
    e.preventDefault();
    const nameEl = this.shadowRoot.getElementById("add-name") || this.shadowRoot.getElementById("name");
    const codeEl = this.shadowRoot.getElementById("add-code") || this.shadowRoot.getElementById("code");
    const logoSlugEl = this.shadowRoot.getElementById("add-logo-slug") || this.shadowRoot.getElementById("logo-slug");
    const typeEl = this.shadowRoot.getElementById("add-type");
    const expiresEl = this.shadowRoot.getElementById("add-expires-on");
    const name = nameEl?.value?.trim();
    const code = codeEl?.value?.trim();
    const logoSlug = logoSlugEl?.value?.trim() || "";
    const itemType = typeEl?.value || "loyalty";
    const expiresOn = expiresEl?.value || "";
    if (!name || !code) return alert("Missing fields");
    await this._hass.callApi("post", API_PATH, {
      name,
      code,
      logo_slug: logoSlug,
      owner: this._hass.user.name,
      user_id: this._hass.user.id,
      item_type: itemType,
      expires_on: itemType === "voucher" ? expiresOn : "",
      format: "CODE128" // default for new cards
    });

    this._inputState = { name: "", code: "", logo_slug: "", item_type: "loyalty", expires_on: "" };
    if (nameEl) nameEl.value = "";
    if (codeEl) codeEl.value = "";
    if (logoSlugEl) logoSlugEl.value = "";
    if (typeEl) typeEl.value = "loyalty";
    if (expiresEl) expiresEl.value = "";
    this.showAddDialog = false;
    this.loadCards();
  }

  closeAddDialog() {
    this.showAddDialog = false;
    this.render();
  }

  async deleteCard(card) {
    await this._hass.callApi("delete", `${API_PATH}/${getItemId(card)}`, {
      user_id: card.user_id
    });
    this.closeCard();
    this.loadCards();
  }

  async updateCard(card) {
    const supportedFormats = [
      "CODE128", "CODE128A", "CODE128B", "CODE128C",
      "EAN13", "EAN8",
      "UPC",
      "CODE39",
      "ITF14", "ITF",
      "MSI", "MSI10", "MSI11", "MSI1010", "MSI1110",
      "pharmacode", "codabar", "CODE93"
    ];

    const dialog = document.createElement("div");
    dialog.className = "edit-dialog";
    dialog.innerHTML = `
      <div class="dialog-content">
        <label>Name</label>
        <input id="edit-name" type="text" value="${escapeHtml(card.name)}" />
        <label>Barcode number</label>
        <input id="edit-code" type="text" value="${escapeHtml(card.code)}" />
        <label>Logo.dev slug</label>
        <input id="edit-logo-slug" type="text" value="${escapeHtml(card.logo_slug || "")}" placeholder="example.com" />
        <label>Type</label>
        <select id="edit-type">
          <option value="loyalty" ${getItemType(card) === "loyalty" ? "selected" : ""}>Loyalty card</option>
          <option value="voucher" ${getItemType(card) === "voucher" ? "selected" : ""}>Voucher</option>
          <option value="promotion" ${getItemType(card) === "promotion" ? "selected" : ""}>Promotion</option>
        </select>
        <label>Expiry date</label>
        <input id="edit-expires-on" type="date" value="${escapeHtml(card.expires_on || "")}" />
        <label>Default barcode format</label>
        <select id="edit-format">
          ${supportedFormats
            .map(
              (f) =>
                `<option value="${f}" ${f === (card.format || "CODE128") ? "selected" : ""}>${f}</option>`
            )
            .join("")}
        </select>

        <div id="preview-wrap" style="margin-top:10px; text-align:center;">
          <canvas id="preview-canvas"></canvas>
          <div id="preview-error" style="color:red; font-size:0.9em; display:none;"></div>
        </div>

        <div class="btn-row">
          <button id="save-btn"><ha-icon icon="mdi:content-save"></ha-icon> Save</button>
          <button id="cancel-btn"><ha-icon icon="mdi:close"></ha-icon> Cancel</button>
        </div>
      </div>
    `;

    // inline style (kept same as before)
    dialog.style.cssText = `
      position: fixed; top:0; left:0; right:0; bottom:0;
      background:rgba(0,0,0,0.4);
      display:flex; align-items:center; justify-content:center;
      z-index:1000;
    `;
    dialog.querySelector(".dialog-content").style.cssText = `
      background:#fff; padding:1em; border-radius:8px; width:320px; max-width:90vw;
      display:flex; flex-direction:column; gap:0.5em;
    `;

    this.shadowRoot.appendChild(dialog);

    const nameInput = dialog.querySelector("#edit-name");
    const codeInput = dialog.querySelector("#edit-code");
    const logoSlugInput = dialog.querySelector("#edit-logo-slug");
    const typeSelect = dialog.querySelector("#edit-type");
    const expiresInput = dialog.querySelector("#edit-expires-on");
    const formatSelect = dialog.querySelector("#edit-format");
    const previewCanvas = dialog.querySelector("#preview-canvas");
    const errorDiv = dialog.querySelector("#preview-error");

    // --- live preview ---
    const renderPreview = () => {
      const fmt = formatSelect.value;
      const codeValue = codeInput?.value?.trim() || card.code;
      renderBarcodeCentral(previewCanvas, codeValue, fmt, { width: 2, height: 60 }, errorDiv);
    };
    formatSelect.addEventListener("change", renderPreview);
    codeInput?.addEventListener("input", renderPreview);
    renderPreview(); // initial

    // --- buttons ---
    dialog.querySelector("#cancel-btn").addEventListener("click", () => dialog.remove());

    dialog.querySelector("#save-btn").addEventListener("click", async () => {
      const newName = nameInput.value;
      const newCode = dialog.querySelector("#edit-code").value;
      const newLogoSlug = logoSlugInput.value.trim();
      const newType = typeSelect.value;
      const newExpiresOn = expiresInput.value;
      const newFormat = formatSelect.value;

      const updated = await this._hass.callApi("put", `${API_PATH}/${getItemId(card)}`, {
        user_id: card.user_id,
        name: newName,
        code: newCode,
        logo_slug: newLogoSlug,
        item_type: newType,
        expires_on: newType === "voucher" ? newExpiresOn : "",
        format: newFormat
      });
      const updatedCard = {
        name: newName,
        code: newCode,
        logo_slug: newLogoSlug,
        item_type: newType,
        expires_on: newType === "voucher" ? newExpiresOn : "",
        format: newFormat,
        ...(updated || {})
      };

      // locally update caches
      this.ownCards = this.ownCards.map((c) =>
        getItemId(c) === getItemId(card) ? normalizeItem({ ...c, ...updatedCard }) : c
      );
      this.otherCards = this.otherCards.map((c) =>
        getItemId(c) === getItemId(card) ? normalizeItem({ ...c, ...updatedCard }) : c
      );

      // if card is open, refresh the live canvas + title
      if (this.selectedCard && getItemId(this.selectedCard) === getItemId(card)) {
        this.selectedCard = normalizeItem({ ...this.selectedCard, ...updatedCard });

        const container = this.dynamicContainer.querySelector("#code-preview");
        if (container) {
          const canvas = document.createElement("canvas");
          container.innerHTML = "";
          container.appendChild(canvas);

          const fmt = this.selectedCard.format || "CODE128";
          renderBarcodeCentral(canvas, this.selectedCard.code, fmt);
        }

        const titleEl = this.dynamicContainer.querySelector(".card-title");
        if (titleEl) titleEl.textContent = this.selectedCard.name;
      }

      dialog.remove();
      this.render();
    });
  }

  render() {
    const cardListEl = this.dynamicContainer.querySelector(".cardlist");
    const scrollPosition = cardListEl ? cardListEl.scrollTop : 0;
    const previousFocusedElement = this.shadowRoot.activeElement;
    const previousFocusedId = previousFocusedElement?.id;
    const previousSelectionStart = previousFocusedElement?.selectionStart;
    const previousSelectionEnd = previousFocusedElement?.selectionEnd;

    const cards = this.activeTab === "own" ? this.ownCards : this.otherCards;
    const filter = (this.filterText || "").trim().toLowerCase();
    const typedCards = this.activeType === "all"
      ? cards
      : cards.filter(card => getItemType(card) === this.activeType);
    const filteredCards = filter
      ? typedCards.filter(card =>
          card.name.toLowerCase().includes(filter) ||
          String(card.owner || "").toLowerCase().includes(filter) ||
          getTypeLabel(card).toLowerCase().includes(filter)
        )
      : typedCards;

    const filterInput = this.toolbarContainer.querySelector("#filter");
    const toggleViewButton = this.toolbarContainer.querySelector("#toggle-card-view");
    const tabOwn = this.toolbarContainer.querySelector("#tab-own");
    const tabOthers = this.toolbarContainer.querySelector("#tab-others");
    if (filterInput) filterInput.value = this.filterText;
    if (toggleViewButton) {
      const isGridView = this.cardViewMode === "grid";
      toggleViewButton.title = isGridView ? "List view" : "Grid view";
      toggleViewButton.setAttribute("aria-label", toggleViewButton.title);
      toggleViewButton.innerHTML = `<ha-icon icon="${isGridView ? "mdi:view-list" : "mdi:view-grid"}"></ha-icon>`;
    }
    if (tabOwn) tabOwn.classList.toggle("active", this.activeTab === "own");
    if (tabOthers) tabOthers.classList.toggle("active", this.activeTab === "others");
    ["all", "loyalty", "voucher"].forEach(type => {
      this.toolbarContainer.querySelector(`#type-${type}`)
        ?.classList.toggle("active", this.activeType === type);
    });

    const selectedLogoUrl = this.selectedCard ? getLogoUrl(this.selectedCard.logo_slug, 96) : "";
    const selectedInitial = this.selectedCard ? getCardInitial(this.selectedCard.name) : "";
    const selectedExpiry = this.selectedCard?.expires_on ? formatExpiry(this.selectedCard.expires_on) : "";

    this.dynamicContainer.innerHTML = `
      <div class="cardlist ${this.cardViewMode === "grid" ? "grid-view" : "list-view"}">
        ${filteredCards.length ? filteredCards.map(card => {
          const logoUrl = getLogoUrl(card.logo_slug, 64);
          const initial = getCardInitial(card.name);
          const typeLabel = getTypeLabel(card);
          const expiry = card.expires_on ? formatExpiry(card.expires_on) : "";
          return `
          <div class="card ${getItemType(card)}" data-card-id="${escapeHtml(getItemId(card))}" title="${escapeHtml(card.name)}">
            <div class="card-logo-wrap">
              ${logoUrl
                ? `<img class="card-logo" src="${escapeHtml(logoUrl)}" alt="" data-initial="${escapeHtml(initial)}" loading="lazy" />`
                : `<div class="card-logo-placeholder">${escapeHtml(initial)}</div>`}
            </div>
            <div class="card-details">
              <strong>${escapeHtml(card.name)}</strong>
              <small class="item-meta">
                <span>${escapeHtml(typeLabel)}</span>
                ${expiry ? `<span class="expiry"><ha-icon icon="mdi:calendar-clock"></ha-icon>${escapeHtml(expiry)}</span>` : ""}
                ${this.activeTab === "others" ? `<span><ha-icon icon="mdi:account"></ha-icon>${escapeHtml(card.owner)}</span>` : ""}
              </small>
            </div>
          </div>
        `;
        }).join("") : `<div class="no-results">No matching items</div>`}
      </div>
      ${this.selectedCard ? `
        <div class="popup">
          <div class="popup-header">
            <div class="popup-logo-wrap">
              ${selectedLogoUrl
                ? `<img class="card-logo popup-logo" src="${escapeHtml(selectedLogoUrl)}" alt="" data-initial="${escapeHtml(selectedInitial)}" loading="lazy" />`
                : `<div class="card-logo-placeholder popup-logo-placeholder">${escapeHtml(selectedInitial)}</div>`}
            </div>
            <h3 class="card-title">${escapeHtml(this.selectedCard.name)}</h3>
          </div>
          <div class="popup-meta">
            <span>${escapeHtml(getTypeLabel(this.selectedCard))}</span>
            ${selectedExpiry ? `<span><ha-icon icon="mdi:calendar-clock"></ha-icon>${escapeHtml(selectedExpiry)}</span>` : ""}
          </div>
          <div class="code" id="code-preview"></div>
          <div class="button-group">
            <button id="toggle-code"><ha-icon icon="mdi:cached"></ha-icon> QR/Barcode</button>
            ${this.selectedCard.user_id === this._hass.user.id ? `
              <button id="edit"><ha-icon icon="mdi:pencil"></ha-icon> Edit</button>
              <button id="delete"><ha-icon icon="mdi:delete"></ha-icon> Delete</button>
            ` : ""}
          </div>
          <ha-icon icon="mdi:close" class="close-btn" id="close" title="Close"></ha-icon>
        </div>
      ` : ""}
      ${this.showAddDialog ? `
        <div class="dialog-overlay" id="add-dialog">
          <div class="dialog-content">
            <h3>Add new item</h3>
            <form id="add-card-form" class="popup-form">
              <input id="add-name" placeholder="Name" value="${escapeHtml(this._inputState.name || "")}" />
              <input id="add-code" placeholder="Code" value="${escapeHtml(this._inputState.code || "")}" />
              <input id="add-logo-slug" placeholder="Logo.dev slug (optional)" value="${escapeHtml(this._inputState.logo_slug || "")}" />
              <select id="add-type">
                <option value="loyalty" ${(this._inputState.item_type || "loyalty") === "loyalty" ? "selected" : ""}>Loyalty card</option>
                <option value="voucher" ${this._inputState.item_type === "voucher" ? "selected" : ""}>Voucher</option>
                <option value="promotion" ${this._inputState.item_type === "promotion" ? "selected" : ""}>Promotion</option>
              </select>
              <input id="add-expires-on" type="date" value="${escapeHtml(this._inputState.expires_on || "")}" />
              <div class="btn-row">
                <button type="submit" id="save-btn"><ha-icon icon="mdi:content-save"></ha-icon> Save</button>
                <button type="button" id="cancel-add-btn"><ha-icon icon="mdi:close"></ha-icon> Cancel</button>
              </div>
            </form>
          </div>
        </div>
      ` : ""}
    `;

    this.dynamicContainer.querySelectorAll("[data-card-id]").forEach(el =>
      el.addEventListener("click", () => this.openCard(el.getAttribute("data-card-id")))
    );

    this.dynamicContainer.querySelectorAll(".card-logo").forEach(img =>
      img.addEventListener("error", () => {
        const placeholder = document.createElement("div");
        placeholder.className = img.classList.contains("popup-logo")
          ? "card-logo-placeholder popup-logo-placeholder"
          : "card-logo-placeholder";
        placeholder.textContent = img.dataset.initial || "?";
        img.replaceWith(placeholder);
      })
    );

    if (this.showAddDialog) {
      const addForm = this.dynamicContainer.querySelector("#add-card-form");
      addForm?.addEventListener("submit", this.addCard.bind(this));
      this.dynamicContainer.querySelector("#cancel-add-btn")
        ?.addEventListener("click", () => this.closeAddDialog());

      const addName = this.shadowRoot.getElementById("add-name");
      const addCode = this.shadowRoot.getElementById("add-code");
      const addLogoSlug = this.shadowRoot.getElementById("add-logo-slug");
      const addType = this.shadowRoot.getElementById("add-type");
      const addExpiresOn = this.shadowRoot.getElementById("add-expires-on");
      addName?.addEventListener("input", (event) => { this._inputState.name = event.target.value; });
      addCode?.addEventListener("input", (event) => { this._inputState.code = event.target.value; });
      addLogoSlug?.addEventListener("input", (event) => { this._inputState.logo_slug = event.target.value; });
      addType?.addEventListener("change", (event) => { this._inputState.item_type = event.target.value; });
      addExpiresOn?.addEventListener("input", (event) => { this._inputState.expires_on = event.target.value; });
    }

    if (this.selectedCard) {
      const selectedId = getItemId(this.selectedCard);
      const mode = this.viewModes[selectedId] || "barcode";
      localStorage.setItem(`wallet-assistant-mode-${selectedId}`, mode);
      const container = this.dynamicContainer.querySelector("#code-preview");
      container.innerHTML = "";

      if (mode === "qr") {
        const canvas = document.createElement("canvas");
        container.appendChild(canvas);
        QRCode.toCanvas(
          canvas,
          this.selectedCard.code,
          { width: 160, margin: 1 },
          (error) => { if (error) console.error("QR generation error:", error); },
        );
      } else {
        const canvas = document.createElement("canvas");
        container.appendChild(canvas);
        const fmt = this.selectedCard.format || "CODE128";
        // központi render (nincs duplikált try/catch)
        renderBarcodeCentral(canvas, this.selectedCard.code, fmt);
      }

      this.dynamicContainer.querySelector("#toggle-code")
        ?.addEventListener("click", () => this.toggleCodeType(selectedId));
      this.dynamicContainer.querySelector("#close")
        ?.addEventListener("click", () => this.closeCard());

      if (this.selectedCard.user_id === this._hass.user.id) {
        this.dynamicContainer.querySelector("#delete")
          ?.addEventListener("click", () => this.deleteCard(this.selectedCard));
        this.dynamicContainer.querySelector("#edit")
          ?.addEventListener("click", () => this.updateCard(this.selectedCard));
      }
    }

    const newCardListEl = this.dynamicContainer.querySelector(".cardlist");
    if (newCardListEl) newCardListEl.scrollTop = scrollPosition;

    if (previousFocusedId === "filter" && filterInput) {
      filterInput.focus();
      if (typeof previousSelectionStart === "number" && typeof previousSelectionEnd === "number") {
        filterInput.setSelectionRange(previousSelectionStart, previousSelectionEnd);
      }
    }
  }
}

customElements.define(CARD_TYPE, WalletAssistantCard);
