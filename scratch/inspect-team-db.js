async function run() {
  try {
    const res = await fetch("http://localhost:3000/api/team");
    const json = await res.json();
    console.log("Source:", json.source);
    console.log("Team members in DB:");
    for (const m of json.data || []) {
      console.log(`- ID: ${m.id}, Name: ${m.name}, Role: ${m.role}, Image: ${m.image}`);
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
