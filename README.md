## Wallet-Assistant - Loyalty cards, vouchers and shop promo's - Home Assistant Custom Integration 

A Home Assistant custom integration (HACS) that makes it easy to manage loyalty cards, vouchers, and store promotions directly within Home Assistant.

<details><summary>Several similar solutions already exist, and I tried a number of them before starting this project. While they all offer useful functionality, none of them fully matched my requirements.</summary>

* **[VoucherVault](https://github.com/l4rm4nd/VoucherVault)** is an excellent open-source application with extensive features for managing loyalty cards, vouchers, and coupons. It integrates well with Home Assistant through a dedicated custom integration. If you're looking for a comprehensive and secure solution to manage a large collection of cards and vouchers, it's definitely worth considering. For my use case, however, it felt somewhat over-engineered and resource-intensive. Running VoucherVault typically requires multiple components, including the web application itself, Redis, a database (or SQLite), and the Home Assistant integration, which adds complexity if you only need to manage a small personal collection.

* **[Shopping List Manager](https://github.com/thekiwismarthome/shopping-list-manager-card)** is a Home Assistant custom integration with a companion Lovelace card that focuses primarily on shopping lists. It also includes support for storing loyalty cards associated with stores. While the concept is useful, the loyalty card functionality was too limited for my needs.

* **[Card Wallet](https://github.com/rozgonyiadam/hass-cardwallet)** is a lightweight and elegant Home Assistant integration for storing loyalty cards. It uses a separate **[Lovelace card](https://github.com/rozgonyiadam/lovelace-cardwallet)** for the user interface and stores data in a simple JSON file. I initially started extending this project because I appreciated its straightforward design and simplicity. However, as I continued adding features, I realized it would be more practical to build a solution tailored to my own vision. I wanted to add voucher support, combine the frontend and backend into a single repository, and introduce additional features for managing promotions and special offers.

</details>

So I started with the Card Wallet code and extended it:

* Single custom HACS integration installation
* UI cover flow setup of the integration
* Support loyalty cards, linked to Home Assistant users
  * Userfriendly default grid view, can be switch to list view
  * Easy direct filter cards while typing to quickly retrieve the needed card
  * Easily add a logo by typing the base url of the company and retrieve image using [logo.dev](https://logo.dev)
  * Simple storage in json file within the Home Assistant folder
  * Support QR and barcode representation, last used representation is used as default
  * By default see all cards of all users, if desired filter and switch between your own cards and other Home Assistant user cards
  * Add new cards directly from the UI
  * Edit or delete your cards
  * Responsive design
* Support for voucher cards, linked to Home Assistant users
  * Show vouchers inline with loyalty cards, or split the view to filer by type
  * Easy direct filter cards while typing to quickly retrieve the needed card
  * See expiry dates
  * Sensor with number of cards that will expire soon

## 🙏 Credits

- [Card Wallet](https://github.com/rozgonyiadam) — Original code base and main base functionality
- [node-qrcode](https://github.com/soldair/node-qrcode) — Used for QR code generation
- [JsBarcode](https://github.com/lindell/JsBarcode) — Used for barcode rendering
