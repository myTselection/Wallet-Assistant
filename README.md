[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub release](https://img.shields.io/github/release/myTselection/Wallet-Assistant.svg)](https://github.com/myTselection/Wallet-Assistant/releases)
![GitHub repo size](https://img.shields.io/github/repo-size/myTselection/Wallet-Assistant.svg)

[![GitHub issues](https://img.shields.io/github/issues/myTselection/Wallet-Assistant.svg)](https://github.com/myTselection/Wallet-Assistant/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/myTselection/Wallet-Assistant.svg)](https://github.com/myTselection/Wallet-Assistant/commits/main)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/myTselection/Wallet-Assistant.svg)](https://github.com/myTselection/Wallet-Assistant/graphs/commit-activity)

## Wallet Assistant - Loyalty cards, vouchers and shop promotions - Home Assistant Custom Integration

A combined Home Assistant custom integration and Lovelace dashboard card that makes it easy to manage loyalty cards, vouchers, and store promotions directly within Home Assistant.

<details><summary>Several similar solutions already exist, and I tried a number of them before starting this project. While they all offer useful functionality, none of them fully matched my requirements.</summary>

* **[VoucherVault](https://github.com/l4rm4nd/VoucherVault)** is an excellent open-source application with extensive features for managing loyalty cards, vouchers, and coupons. It integrates well with Home Assistant through a dedicated custom integration. If you're looking for a comprehensive and secure solution to manage a large collection of cards and vouchers, it's definitely worth considering. For my use case, however, it felt somewhat over-engineered and resource-intensive. Running VoucherVault typically requires multiple components, including the web application itself, Redis, a database (or SQLite), and the Home Assistant integration, which adds complexity if you only need to manage a small personal collection.

* **[Shopping List Manager](https://github.com/thekiwismarthome/shopping-list-manager-card)** is a Home Assistant custom integration with a companion Lovelace card that focuses primarily on shopping lists. It also includes support for storing loyalty cards associated with stores. While the concept is useful, the loyalty card functionality was too limited for my needs.

* **[Card Wallet](https://github.com/rozgonyiadam/hass-cardwallet)** ([forum](https://community.home-assistant.io/t/save-store-cards-loyalty-cards-in-home-assistant-with-a-widget-on-your-phone/487522/16)) is a lightweight and elegant Home Assistant integration for storing loyalty cards. It uses a separate **[Lovelace card](https://github.com/rozgonyiadam/lovelace-cardwallet)** for the user interface and stores data in a simple JSON file. I initially started extending this project because I appreciated its straightforward design and simplicity. However, as I continued adding features, I realized it would be more practical to build a solution tailored to my own vision. I wanted to add voucher support, combine the frontend and backend into a single repository, and introduce additional features for managing promotions and special offers.

</details>

So I started with the Card Wallet code and extended it.

## ⭐ Features

* Single custom HACS integration installation
* UI config flow setup of the integration
* Bundled Lovelace dashboard card served by the integration
* Support loyalty cards, linked to Home Assistant users
  * User-friendly default grid view, can be switched to list view
  * Easy direct filtering while typing to quickly retrieve the needed card
  * Easily add a logo by typing the base URL of the company and retrieve image using [logo.dev](https://logo.dev)
  * Simple storage in a JSON file within the Home Assistant folder
  * Support QR and barcode representation, last used representation is used as default
  * By default see all cards of all users, if desired filter and switch between your own cards and other Home Assistant user cards
  * Add new cards directly from the UI
  * Edit or delete your cards
  * Responsive design
* Support for voucher cards, linked to Home Assistant users
  * Show vouchers inline with loyalty cards, or filter the view by type
  * Easy direct filtering while typing to quickly retrieve the needed item
  * See expiry dates
  * Sensor with number of vouchers that will expire soon

## Installation

1. Add this repository to HACS as a custom integration repository.
2. Install **Wallet Assistant** from HACS and restart Home Assistant.
3. Add **Wallet Assistant** from **Settings > Devices & services > Add integration**.
4. Add the dashboard resource:

```yaml
url: /wallet_assistant_static/wallet-assistant-card.js
type: module
```

5. Add a manual Lovelace card:

```yaml
type: custom:wallet-assistant-card
```

The legacy `custom:cardwallet-card` tag and `/api/cardwallet` API remain available for existing dashboards, but new dashboards should use `custom:wallet-assistant-card`.

## Storage and Migration

Wallet Assistant stores items in `wallet_assistant_items.json` in the Home Assistant config folder. If an older `cardwallet_cards.json` file exists and the new file does not, Wallet Assistant reads those card records and writes them in the new item model on the next save.

## Dashboard Resource

The dashboard card is built into `custom_components/wallet_assistant/frontend/wallet-assistant-card.js` and served by the integration at `/wallet_assistant_static/wallet-assistant-card.js`, so the backend and dashboard can be installed from a single HACS repository.

## 📷 Screenshots

## 🙏 Credits

- [Card Wallet](https://github.com/rozgonyiadam) - Original code base and main base functionality
- [node-qrcode](https://github.com/soldair/node-qrcode) - Used for QR code generation
- [JsBarcode](https://github.com/lindell/JsBarcode) - Used for barcode rendering
