async function run() {
  try {
    console.log("1. Logging in as Admin...");
    const loginRes = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@nextgentech.com", password: "Admin@123" })
    });
    
    const rawCookie = loginRes.headers.get("set-cookie");
    if (!rawCookie) {
      throw new Error("No set-cookie header found in login response");
    }
    
    const tokenMatch = rawCookie.match(/crm-token=([^;]+)/);
    if (!tokenMatch) {
      throw new Error("Could not parse crm-token from set-cookie");
    }
    const cookieHeader = `crm-token=${tokenMatch[1]}`;

    console.log("\n2. Updating Shovam Kumar's image path in database...");
    const updatePayload = {
      image: "/images/team/shovam_v2.png"
    };

    const teamRes = await fetch("http://localhost:3000/api/team/8e8638f9-5d38-4d25-9eae-a3e05c23176d", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieHeader
      },
      body: JSON.stringify(updatePayload)
    });
    console.log("PATCH Status:", teamRes.status);
    const teamData = await teamRes.text();
    console.log("PATCH Response:", teamData);

  } catch (err) {
    console.error("Error executing script:", err);
  }
}

run();
