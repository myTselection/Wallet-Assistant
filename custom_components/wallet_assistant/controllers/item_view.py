from __future__ import annotations

from homeassistant.components.http import HomeAssistantView

from ..const import API_BASE, LEGACY_API_BASE
from ..services.storage import WalletStorage


class WalletAssistantItemAPI(HomeAssistantView):
    url = f"{API_BASE}/{{item_id}}"
    name = "api:wallet_assistant:item"
    requires_auth = True

    def __init__(self, hass):
        self.storage = WalletStorage(hass)

    async def delete(self, request, item_id):
        user_id = request["hass_user"].id

        if not user_id or not item_id:
            return self.json({"error": "missing user_id or item_id"}, status_code=400)

        item = await self.storage.get_item_by_id(item_id)
        if not item:
            return self.json({"error": "item not found"}, status_code=404)

        if item.user_id != user_id:
            return self.json({"error": "not allowed to delete this item"}, status_code=403)

        deleted = await self.storage.delete_item(user_id, item_id)
        return self.json({"status": "deleted" if deleted else "not found"})

    async def put(self, request, item_id):
        data = await request.json()
        user_id = request["hass_user"].id

        if not user_id or not item_id:
            return self.json({"error": "missing user_id or item_id"}, status_code=400)

        updated = await self.storage.update_item(user_id, item_id, data)
        if updated:
            return self.json(updated.to_dict())
        return self.json({"error": "item not found"}, status_code=404)


class LegacyWalletAssistantItemAPI(WalletAssistantItemAPI):
    url = f"{LEGACY_API_BASE}/{{item_id}}"
    name = "api:cardwallet:item"
