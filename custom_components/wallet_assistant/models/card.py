from dataclasses import dataclass
from typing import Optional

from ..const import DEFAULT_BARCODE_FORMAT, ITEM_TYPES, TYPE_LOYALTY


@dataclass
class WalletItem:
    item_id: str
    name: str
    code: str
    owner: str
    user_id: str
    item_type: str = TYPE_LOYALTY
    format: Optional[str] = DEFAULT_BARCODE_FORMAT
    logo_slug: Optional[str] = None
    expires_on: Optional[str] = None
    notes: Optional[str] = None
    promo_url: Optional[str] = None

    @classmethod
    def from_dict(cls, data: dict) -> "WalletItem":
        item_type = data.get("item_type") or TYPE_LOYALTY
        if item_type not in ITEM_TYPES:
            item_type = TYPE_LOYALTY

        return cls(
            item_id=data.get("item_id"),
            name=data.get("name", ""),
            code=data.get("code", ""),
            owner=data.get("owner", ""),
            user_id=data.get("user_id", ""),
            item_type=item_type,
            format=data.get("format") or DEFAULT_BARCODE_FORMAT,
            logo_slug=data.get("logo_slug") or None,
            expires_on=data.get("expires_on") or data.get("expiry_date") or None,
            notes=data.get("notes") or None,
            promo_url=data.get("promo_url") or data.get("url") or None,
        )

    def to_dict(self) -> dict:
        return {
            "item_id": self.item_id,
            "name": self.name,
            "code": self.code,
            "owner": self.owner,
            "user_id": self.user_id,
            "item_type": self.item_type,
            "format": self.format or DEFAULT_BARCODE_FORMAT,
            "logo_slug": self.logo_slug,
            "expires_on": self.expires_on,
            "notes": self.notes,
            "promo_url": self.promo_url,
        }
