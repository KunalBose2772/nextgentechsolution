const fs = require("fs");
const path = require("path");

// Manually parse .env file
const envPath = path.join(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const parts = trimmed.split("=");
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join("=").trim().replace(/^["']|["']$/g, "");
        process.env[key] = val;
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function run() {
  const url = `${supabaseUrl}/rest/v1/?apikey=${supabaseKey}`;
  console.log("Fetching OpenAPI definition from:", url);
  try {
    const res = await fetch(url);
    const json = await res.json();
    const projectsTable = json.definitions.projects;
    if (projectsTable) {
      console.log("Projects Table Properties:");
      console.log(JSON.stringify(projectsTable.properties, null, 2));
    } else {
      console.log("Projects table not found in OpenAPI definition!");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
