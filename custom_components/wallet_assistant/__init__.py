from __future__ import annotations

from pathlib import Path

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

try:
    from homeassistant.components.http import StaticPathConfig
except ImportError:
    StaticPathConfig = None

from .api import (
    LegacyWalletAssistantItemAPI,
    LegacyWalletAssistantListAPI,
    WalletAssistantItemAPI,
    WalletAssistantListAPI,
)
from .const import DOMAIN, FRONTEND_PATH, PLATFORMS
from .services.storage import WalletStorage


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    await _async_setup_once(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    await _async_setup_once(hass)
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)


async def _async_setup_once(hass: HomeAssistant) -> None:
    hass.data.setdefault(DOMAIN, {})
    if hass.data[DOMAIN].get("setup_complete"):
        return

    storage = WalletStorage(hass)
    await storage.load()
    hass.data[DOMAIN]["storage"] = storage

    await _async_register_frontend(hass)

    hass.http.register_view(WalletAssistantListAPI(hass))
    hass.http.register_view(WalletAssistantItemAPI(hass))
    hass.http.register_view(LegacyWalletAssistantListAPI(hass))
    hass.http.register_view(LegacyWalletAssistantItemAPI(hass))

    hass.data[DOMAIN]["setup_complete"] = True


async def _async_register_frontend(hass: HomeAssistant) -> None:
    frontend_file = Path(__file__).parent / "frontend" / "wallet-assistant-card.js"
    if StaticPathConfig is not None and hasattr(hass.http, "async_register_static_paths"):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(FRONTEND_PATH, str(frontend_file), True)]
        )
        return

    hass.http.register_static_path(FRONTEND_PATH, str(frontend_file), True)
