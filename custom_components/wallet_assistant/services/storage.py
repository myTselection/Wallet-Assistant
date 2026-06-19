from __future__ import annotations

from datetime import date
import json
import os
from typing import List, Optional

from homeassistant.helpers.dispatcher import async_dispatcher_send

from ..const import SIGNAL_ITEMS_UPDATED, TYPE_VOUCHER
from ..models.card import WalletItem
from .path_utils import get_legacy_storage_path, get_storage_path


class WalletStorage:
    _instance = None

    def __new__(cls, hass):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self, hass):
        if self._initialized:
            return
        self.hass = hass
        self.file_path = get_storage_path(hass)
        self.legacy_file_path = get_legacy_storage_path(hass)
        self.items: List[WalletItem] = []
        self._initialized = True

    async def load(self) -> None:
        raw_list = await self.hass.async_add_executor_job(self._read_items)
        self.items = [WalletItem.from_dict(item) for item in raw_list if item.get("item_id") or item.get("card_id")]

    async def add_item(self, item: WalletItem) -> WalletItem:
        self.items.append(item)
        await self._save_items()
        return item

    async def update_item(self, user_id: str, item_id: str, new_data: dict) -> Optional[WalletItem]:
        for idx, item in enumerate(self.items):
            if item.item_id == item_id and item.user_id == user_id:
                merged = {**item.to_dict(), **new_data, "item_id": item.item_id, "user_id": item.user_id}
                updated_item = WalletItem.from_dict(merged)
                self.items[idx] = updated_item
                await self._save_items()
                return updated_item
        return None

    async def delete_item(self, user_id: str, item_id: str) -> bool:
        original_len = len(self.items)
        self.items = [item for item in self.items if not (item.item_id == item_id and item.user_id == user_id)]
        if len(self.items) < original_len:
            await self._save_items()
            return True
        return False

    async def get_all(self) -> List[WalletItem]:
        return self.items

    async def get_item_by_id(self, item_id: str) -> Optional[WalletItem]:
        return next((item for item in self.items if item.item_id == item_id), None)

    def get_user_items(self, user_id: str) -> List[WalletItem]:
        return [item for item in self.items if item.user_id == user_id]

    def count_expiring_vouchers(self, days: int) -> int:
        today = date.today()
        count = 0
        for item in self.items:
            if item.item_type != TYPE_VOUCHER or not item.expires_on:
                continue
            expiry = _parse_date(item.expires_on)
            if expiry is None:
                continue
            if 0 <= (expiry - today).days <= days:
                count += 1
        return count

    async def _save_items(self) -> None:
        data = [item.to_dict() for item in self.items]
        await self.hass.async_add_executor_job(self._write_items, data)
        async_dispatcher_send(self.hass, SIGNAL_ITEMS_UPDATED)

    def _read_items(self) -> list[dict]:
        path = self.file_path if os.path.exists(self.file_path) else self.legacy_file_path
        if not os.path.exists(path):
            return []

        with open(path, "r", encoding="utf-8") as file:
            try:
                return json.load(file) or []
            except json.JSONDecodeError:
                return []

    def _write_items(self, data: list[dict]) -> None:
        with open(self.file_path, "w", encoding="utf-8") as file:
            json.dump(data, file, indent=2)

    add_card = add_item
    update_card = update_item
    delete_card = delete_item
    get_card_by_id = get_item_by_id


CardStorage = WalletStorage


def _parse_date(value: str) -> Optional[date]:
    try:
        return date.fromisoformat(value)
    except (TypeError, ValueError):
        return None
