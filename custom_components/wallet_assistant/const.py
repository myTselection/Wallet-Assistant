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

CONF_PRICE_WATCH_SERVICES = "price_watch_services"

TYPE_LOYALTY = "loyalty"
TYPE_VOUCHER = "voucher"
TYPE_PROMOTION = "promotion"
ITEM_TYPES = {TYPE_LOYALTY, TYPE_VOUCHER, TYPE_PROMOTION}

DEFAULT_BARCODE_FORMAT = "CODE128"
VIEW_BARCODE = "barcode"
VIEW_QR = "qr"
DEFAULT_VIEW = VIEW_BARCODE
DEFAULT_VIEWS = {VIEW_BARCODE, VIEW_QR}
DEFAULT_EXPIRY_WARNING_DAYS = 14

DEFAULT_PRICE_WATCH_SERVICES = (
    {
        "name": "Google Shop",
        "url_template": "https://www.google.com/search?tbm=shop&q={query}",
        "enabled": True,
    },
    {
        "name": "Hagglezon",
        "url_template": "https://www.hagglezon.com/en/s/{query}",
        "enabled": True,
    },
    {
        "name": "Tweakers",
        "url_template": "https://tweakers.net/pricewatch/zoeken/?keyword={query}",
        "enabled": True,
    },
    {
        "name": "MaxSpar",
        "url_template": "https://fr.maxspar.de/s/{query}",
        "enabled": True,
    },
    {
        "name": "Idealo",
        "url_template": "https://www.idealo.fr/prechcat.html?q={query}",
        "enabled": True,
    },
    {
        "name": "Geizhals",
        "url_template": "https://geizhals.eu/?fs={query}",
        "enabled": True,
    },
    {
        "name": "Kieskeurig",
        "url_template": "https://www.kieskeurig.be/search?q={query}",
        "enabled": True,
    },
)


def format_price_watch_services_config(services=DEFAULT_PRICE_WATCH_SERVICES) -> str:
    """Format price-watch services as editable options text."""
    lines = []
    for service in services:
        prefix = "" if service.get("enabled", True) else "# "
        lines.append(f"{prefix}{service['name']}|{service['url_template']}")
    return "\n".join(lines)


def parse_price_watch_services_config(value: str | None) -> list[dict[str, str | bool]]:
    """Parse editable price-watch service text into service dictionaries."""
    if not value:
        value = format_price_watch_services_config()

    services = []
    for raw_line in str(value).splitlines():
        line = raw_line.strip()
        if not line:
            continue

        enabled = True
        if line.startswith("#"):
            enabled = False
            line = line[1:].strip()

        if "|" not in line:
            continue

        name, url_template = [part.strip() for part in line.split("|", 1)]
        if (
            not name
            or "{query}" not in url_template
            or not url_template.startswith(("https://", "http://"))
        ):
            continue

        services.append(
            {
                "name": name,
                "url_template": url_template,
                "enabled": enabled,
            }
        )

    return services
