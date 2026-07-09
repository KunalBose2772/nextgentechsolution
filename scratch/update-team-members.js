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

    console.log("2. Fetching current team members to locate Sarah Jenkins...");
    const getRes = await fetch("http://localhost:3000/api/team", {
      headers: { "Cookie": cookieHeader }
    });
    const getJson = await getRes.json();
    const members = getJson.data ?? [];
    
    const sarah = members.find(m => m.name.toLowerCase().includes("sarah jenkins"));
    if (sarah) {
      console.log(`Found Sarah Jenkins (ID: ${sarah.id}). Removing...`);
      const delRes = await fetch(`http://localhost:3000/api/team/${sarah.id}`, {
        method: "DELETE",
        headers: { "Cookie": cookieHeader }
      });
      console.log("Delete status:", delRes.status);
    } else {
      console.log("Sarah Jenkins not found in database.");
    }

    console.log("\n3. Adding Shovam Kumar...");
    const teamPayload = {
      name: "Shovam Kumar",
      role: "Senior Full Stack Developer",
      expertise: "Full Stack Architecture & Scalable Cloud Apps",
      image: "/images/team/shovam_v2.png",
      linkedin: "",
      twitter: "",
      github: "",
      sortOrder: 9
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
