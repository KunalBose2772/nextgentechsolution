async function runTest() {
  try {
    console.log("1. Logging in as Admin...");
    const loginRes = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@nextgentech.com", password: "Admin@123" })
    });
    console.log("Login Status:", loginRes.status);
    
    // Extract set-cookie header
    const rawCookie = loginRes.headers.get("set-cookie");
    if (!rawCookie) {
      throw new Error("No set-cookie header found in login response");
    }
    
    // Parse crm-token cookie
    const tokenMatch = rawCookie.match(/crm-token=([^;]+)/);
    if (!tokenMatch) {
      throw new Error("Could not parse crm-token from set-cookie header");
    }
    const cookieHeader = `crm-token=${tokenMatch[1]}`;
    console.log("Successfully extracted token cookie.");

    console.log("\n2. Adding a new Portfolio Item...");
    const portfolioPayload = {
      projectId: "test-automated-canvas",
      title: "Automated Verification Engine",
      tags: ["Testing", "Node.js", "Automation"],
      category: "DevOps",
      image: "/images/portfolio/security.png",
      description: "An automated cloud testing and pipeline verification architecture deployed to monitor live metrics.",
      outcomes: ["100% test coverage", "Realtime status logs", "Zero configuration deployments"],
      accent: "#ff0055"
    };

    const portfolioRes = await fetch("http://localhost:3000/api/portfolio", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Cookie": cookieHeader
      },
      body: JSON.stringify(portfolioPayload)
    });
    console.log("Portfolio POST Status:", portfolioRes.status);
    const portfolioData = await portfolioRes.text();
    console.log("Portfolio POST Response:", portfolioData);

    console.log("\n3. Adding a new Team Member...");
    const teamPayload = {
      name: "Sarah Jenkins",
      role: "Lead QA Architect",
      expertise: "Automated System Verification",
      image: "/images/team/ananya.png",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
      sortOrder: 10
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
    console.error("Test failed with error:", err);
  }
}

runTest();
