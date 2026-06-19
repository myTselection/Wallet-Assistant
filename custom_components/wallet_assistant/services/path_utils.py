from ..const import LEGACY_STORAGE_FILE, STORAGE_FILE


def get_storage_path(hass) -> str:
    return hass.config.path(STORAGE_FILE)


def get_legacy_storage_path(hass) -> str:
    return hass.config.path(LEGACY_STORAGE_FILE)
