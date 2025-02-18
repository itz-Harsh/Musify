import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

const BASE_URL = "https://musify-harsh.vercel.app/"; // Change this to your deployed Vercel URL

const pages = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/Browse", changefreq: "daily", priority: 1 },
  { url: "/Music", changefreq: "daily", priority: 1 },
  // Add more pages manually
];

// Create a writable stream
const sitemap = new SitemapStream({ hostname: BASE_URL });
const writeStream = createWriteStream("public/sitemap.xml");

// Write pages to sitemap
pages.forEach((page) => sitemap.write(page));
sitemap.end();

// Save the sitemap file
streamToPromise(sitemap).then(() => console.log("✅ Sitemap generated successfully!"));

sitemap.pipe(writeStream);
