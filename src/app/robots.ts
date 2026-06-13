import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/admin/", "/telecallers/", "/superadmin/", "/api/"],
      },
    ],
    sitemap: "https://nextgentechsolution.org/sitemap.xml",
    host: "https://nextgentechsolution.org",
  };
}
