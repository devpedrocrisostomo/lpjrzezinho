import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const isUserSite = repoName.endsWith(".github.io");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages && repoName && !isUserSite ? `/${repoName}` : "",
  assetPrefix: isGithubPages && repoName && !isUserSite ? `/${repoName}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages && repoName && !isUserSite ? `/${repoName}` : "",
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
