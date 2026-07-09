async function verify() {
  try {
    console.log("Fetching public portfolio...");
    const pRes = await fetch("http://localhost:3000/api/portfolio");
    const pData = await pRes.json();
    const portfolioList = pData.data || [];
    const testPortfolio = portfolioList.find(p => p.projectId === "test-automated-canvas");
    
    console.log("\nPortfolio Verification:");
    if (testPortfolio) {
      console.log("SUCCESS: Found newly added portfolio item!");
      console.log(JSON.stringify(testPortfolio, null, 2));
    } else {
      console.log("FAILED: Could not find portfolio item.");
    }

    console.log("\nFetching public team members...");
    const tRes = await fetch("http://localhost:3000/api/team");
    const tData = await tRes.json();
    const teamList = tData.data || [];
    const testMember = teamList.find(m => m.name === "Sarah Jenkins");

    console.log("\nTeam Member Verification:");
    if (testMember) {
      console.log("SUCCESS: Found newly added team member!");
      console.log(JSON.stringify(testMember, null, 2));
    } else {
      console.log("FAILED: Could not find team member.");
    }

  } catch (err) {
    console.error("Verification failed:", err);
  }
}
verify();
