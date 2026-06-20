from __future__ import annotations

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.helpers import selector

from .const import (
    CONF_PRICE_WATCH_SERVICES,
    DOMAIN,
    NAME,
    format_price_watch_services_config,
    parse_price_watch_services_config,
)


class WalletAssistantConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Config flow for Wallet Assistant."""

    VERSION = 1

    @staticmethod
    def async_get_options_flow(config_entry):
        return WalletAssistantOptionsFlow(config_entry)

    async def async_step_user(self, user_input=None):
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()
        return self.async_create_entry(title=NAME, data={})


class WalletAssistantOptionsFlow(config_entries.OptionsFlow):
    """Options flow for Wallet Assistant."""

    def __init__(self, config_entry):
        self._config_entry = config_entry

    async def async_step_init(self, user_input=None):
        errors = {}

        if user_input is not None:
            services_text = user_input.get(CONF_PRICE_WATCH_SERVICES, "")
            if not _is_valid_price_watch_services_config(services_text):
                errors[CONF_PRICE_WATCH_SERVICES] = "invalid_price_watch_services"
            else:
                return self.async_create_entry(title="", data=user_input)

        default_services = self._config_entry.options.get(
            CONF_PRICE_WATCH_SERVICES,
            format_price_watch_services_config(),
        )

        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema(
                {
                    vol.Required(
                        CONF_PRICE_WATCH_SERVICES,
                        default=default_services,
                    ): selector.TextSelector(
                        selector.TextSelectorConfig(multiline=True)
                    )
                }
            ),
            errors=errors,
        )


def _is_valid_price_watch_services_config(value: str) -> bool:
    for raw_line in str(value or "").splitlines():
        line = raw_line.strip()
        if not line:
            continue
        if line.startswith("#"):
            line = line[1:].strip()
        if "|" not in line:
            return False
        name, url_template = [part.strip() for part in line.split("|", 1)]
        if (
            not name
            or "{query}" not in url_template
            or not url_template.startswith(("https://", "http://"))
        ):
            return False

    return bool(parse_price_watch_services_config(value))
