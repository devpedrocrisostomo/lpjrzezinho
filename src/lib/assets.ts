const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetVersion = process.env.NEXT_PUBLIC_ASSET_VERSION ?? "local";

export function assetPath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const separator = normalizedPath.includes("?") ? "&" : "?";

  return `${basePath}${normalizedPath}${separator}v=${assetVersion}`;
}
