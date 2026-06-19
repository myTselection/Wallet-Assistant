from __future__ import annotations

import json
from pathlib import Path

_MANIFEST = json.loads((Path(__file__).parent / "manifest.json").read_text(encoding="utf-8"))

DOMAIN = "wallet_assistant"
NAME = "Wallet Assistant"
VERSION = _MANIFEST["version"]

PLATFORMS = ["sensor"]

API_BASE = "/api/wallet_assistant"
FRONTEND_PATH = "/wallet_assistant_static/wallet-assistant-card.js"

STORAGE_FILE = "wallet_assistant_items.json"

SIGNAL_ITEMS_UPDATED = f"{DOMAIN}_items_updated"

TYPE_LOYALTY = "loyalty"
TYPE_VOUCHER = "voucher"
TYPE_PROMOTION = "promotion"
ITEM_TYPES = {TYPE_LOYALTY, TYPE_VOUCHER, TYPE_PROMOTION}

DEFAULT_BARCODE_FORMAT = "CODE128"
DEFAULT_EXPIRY_WARNING_DAYS = 14
