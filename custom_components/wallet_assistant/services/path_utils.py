from ..const import STORAGE_FILE


def get_storage_path(hass) -> str:
    return hass.config.path(STORAGE_FILE)
