const LABEL_N_REGEX = /^[A-Z]+-[0-9]{1,10}$/;

export function normalizeLabelN(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

export function assertValidLabelN(value: string): string {
  const normalized = normalizeLabelN(value);
  if (!LABEL_N_REGEX.test(normalized)) {
    throw new Error(`Invalid LABEL-N format: ${value}`);
  }
  return normalized;
}
