async function run() {
  try {
    console.log("1. Logging in as Admin...");
    const loginRes = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@nextgentech.com", password: "Admin@123" })
    });
    console.log("Login Status:", loginRes.status);
    
    const rawCookie = loginRes.headers.get("set-cookie");
    if (!rawCookie) {
      throw new Error("No set-cookie header found in login response");
    }
    
    const tokenMatch = rawCookie.match(/crm-token=([^;]+)/);
    if (!tokenMatch) {
      throw new Error("Could not parse crm-token from set-cookie header");
    }
    const cookieHeader = `crm-token=${tokenMatch[1]}`;
    console.log("Successfully extracted token cookie.");

    console.log("\n2. Adding Saovik Biswas...");
    const teamPayload = {
      name: "Saovik Biswas",
      role: "Senior App Developer",
      expertise: "Mobile Application Design & Cross-Platform Systems",
      image: "/images/team/saovik.png",
      linkedin: "",
      twitter: "",
      github: "",
      sortOrder: 14
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
    console.error("Failed to add team member:", err);
  }
}

run();
