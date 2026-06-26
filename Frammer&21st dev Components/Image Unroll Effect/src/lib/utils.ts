export type ImageSource = string | { src?: string } | undefined | null;

export function resolveImageSource(input: ImageSource): string | undefined {
  if (!input) return undefined;
  if (typeof input === "string") return input.trim() || undefined;
  return input.src || undefined;
}

export function mapRollRadiusUiToInternal(ui: number): number {
  if (ui <= 0.1) return 0.01;
  if (ui >= 1) return 0.13;
  const t = (ui - 0.1) / (1 - 0.1);
  return 0.01 + t * (0.13 - 0.01);
}

export function calculateCameraFov(
  width: number,
  height: number,
  distance: number
): number {
  const aspect = width / height;
  return (2 * Math.atan(width / aspect / (2 * distance))) * (180 / Math.PI);
}
