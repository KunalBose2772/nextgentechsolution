const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

function loadEnv() {
  const envPath = path.join(__dirname, "../.env");
  const envContent = fs.readFileSync(envPath, "utf-8");
  const config = {};
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const parts = trimmed.split("=");
    const key = parts[0].trim();
    const val = parts.slice(1).join("=").trim();
    config[key] = val;
  });
  return config;
}

async function run() {
  const env = loadEnv();
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Missing URL or KEY in .env");
    return;
  }

  const supabase = createClient(url, key);
  const { data, error } = await supabase.from("website_team").select("*");
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Team rows from Supabase:");
    data.forEach((row) => {
      console.log(`- ID: ${row.id}, Name: ${row.name}, Role: ${row.role}, Image: ${row.image}`);
    });
  }
}

run();
