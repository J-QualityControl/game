const BOX_ID_REGEX = /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/;

export function normalizeBoxId(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

export function assertValidBoxId(value: string): string {
  const normalized = normalizeBoxId(value);
  if (!BOX_ID_REGEX.test(normalized)) {
    throw new Error(`Invalid BOX-ID format: ${value}`);
  }
  return normalized;
}
