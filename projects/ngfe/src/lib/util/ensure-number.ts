/**
 * Convert value to number if possible.
 */
export function ensureNumber(value: string | undefined): number | undefined {
  return value === '' || isNaN(value as any) ? undefined : Number(value);
}
