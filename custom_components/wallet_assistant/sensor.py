from __future__ import annotations

from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DEFAULT_EXPIRY_WARNING_DAYS, DOMAIN, SIGNAL_ITEMS_UPDATED
from .services.storage import WalletStorage


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    async_add_entities([ExpiringVouchersSensor(hass, entry)])


class ExpiringVouchersSensor(SensorEntity):
    _attr_icon = "mdi:ticket-percent"
    _attr_name = "Expiring vouchers"

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.storage = WalletStorage(hass)
        self._attr_unique_id = f"{DOMAIN}_{entry.entry_id}_expiring_vouchers"
        self._attr_native_value = 0

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass,
                SIGNAL_ITEMS_UPDATED,
                self._handle_items_updated,
            )
        )
        self._update_value()

    @property
    def extra_state_attributes(self) -> dict:
        return {"warning_days": DEFAULT_EXPIRY_WARNING_DAYS}

    async def async_update(self) -> None:
        self._update_value()

    @callback
    def _handle_items_updated(self) -> None:
        self._update_value()
        self.async_write_ha_state()

    def _update_value(self) -> None:
        self._attr_native_value = self.storage.count_expiring_vouchers(
            DEFAULT_EXPIRY_WARNING_DAYS
        )
