export function err(
  component: string,
  message: string,
) {
  throw new Error(`${component}: ${message}`);
}
