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

    console.log("\n2. Adding Anurag...");
    const teamPayload = {
      name: "Anurag",
      role: "Cinematographer",
      expertise: "Cinematography & Media Production",
      image: "/images/team/anurag.png",
      linkedin: "",
      twitter: "",
      github: "",
      sortOrder: 17
    };

    const teamRes = await fetch("http://localhost:3000/api/team", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieHeader
      },
      body: JSON.stringify(teamPayload)
    });
    console.log("Team POST Status:", teamRes.status);
    const teamData = await teamRes.text();
    console.log("Team POST Response:", teamData);

  } catch (err) {
    console.error("Error executing script:", err);
  }
}

run();
