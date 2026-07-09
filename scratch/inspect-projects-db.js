const { createClient } = require("@supabase/supabase-js");
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

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Service Role Key in environment!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Fetching one row from projects table to see available columns...");
  const { data, error } = await supabase.from("projects").select("*").limit(1);
  if (error) {
    console.error("Error fetching projects:", error);
  } else {
    console.log("Success! Columns in projects row:", data.length > 0 ? Object.keys(data[0]) : "No rows found");
  }

  // Let's check by querying a non-existent ID to see if it responds with column names or structure
  console.log("\nTrying a schema introspection select query...");
  const { data: cols, error: colsErr } = await supabase.from("projects").select("id, project_id, title, client, lead_id, status, start_date, end_date, value, description, assigned_team, tags, progress, updates, created_at, updated_at").limit(1);
  if (colsErr) {
    console.error("Select error:", colsErr);
  } else {
    console.log("Standard columns are present.");
  }

  // Let's check developer_id specifically
  console.log("\nChecking developer_id column specifically...");
  const { data: devCol, error: devColErr } = await supabase.from("projects").select("developer_id, developer_name").limit(1);
  if (devColErr) {
    console.error("developer_id check failed:", devColErr);
  } else {
    console.log("developer_id and developer_name columns exist in DB!", devCol);
  }
}

run();
