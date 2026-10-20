import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Denver Christmas Lights Services",
    short_name: "Denver Lights",
    start_url: "/",
    display: "browser",
    background_color: "#8e1b16",
    theme_color: "#8e1b16",
    icons: [
      {
        src: "/icons/denver-lights-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/denver-lights-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
