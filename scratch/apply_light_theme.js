const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'sections', 'WebServiceDetail.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const startMarker = '{/* ── 3. Interactive Calculator Section ── */}';
const endMarker   = '{/* ── 4. Technical Architecture Stack Section ── */}';

const si = content.indexOf(startMarker);
const ei = content.indexOf(endMarker);
if (si === -1 || ei === -1) { console.error('Markers not found'); process.exit(1); }

// We need to inject a useState import for calcStep. Check if it's already imported.
// The file already uses useState so we just need to add calcStep state.
// We'll add it inline by injecting into the component body — find the useState block.
// Actually let's look for `const [projectType` and add calcStep before it.
const stateMarker = 'const [projectType,';
const stateIdx = content.indexOf(stateMarker);
if (stateIdx === -1) { console.error('State marker not found'); process.exit(1); }

// Inject calcStep state before projectType
const newStates = `const [calcStep, setCalcStep] = useState<number>(1);\n  `;
if (!content.includes('calcStep')) {
  content = content.substring(0, stateIdx) + newStates + content.substring(stateIdx);
}

// Re-find markers after injection
const si2 = content.indexOf(startMarker);
const ei2 = content.indexOf(endMarker);

const newSection = `
      <section className="py-20 bg-[#F7F8FA] border-y border-slate-200/70 relative z-10" id="calculator">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

          {/* ── Heading ── */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-200 mb-3" style={{fontFamily:"'Inter',sans-serif"}}>
              Pricing Estimator
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sora text-slate-900 mb-2">
              Build Your <span className="text-indigo-600">Custom Quote</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto" style={{fontFamily:"'Inter',sans-serif"}}>
              Answer 4 quick questions and get a transparent, instant estimate — no sales calls needed.
            </p>
          </div>

          {/* ── Card ── */}
          <div
            className="rounded-[28px] border border-slate-200/80 bg-white overflow-hidden grid md:grid-cols-12"
            style={{boxShadow:"0 8px 40px rgba(10,14,40,0.07), 0 1px 3px rgba(10,14,40,0.04)"}}
          >

            {/* Slider CSS */}
            <style dangerouslySetInnerHTML={{__html:\`
              .calc-r::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#000;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.22);transition:transform .15s}
              .calc-r::-webkit-slider-thumb:hover{transform:scale(1.15)}
              .calc-r::-moz-range-thumb{width:18px;height:18px;border:none;border-radius:50%;background:#000;cursor:pointer}
              .calc-r::-webkit-slider-runnable-track{background:linear-gradient(to right,#000 var(--pct,0%),#e2e8f0 var(--pct,0%));border-radius:999px}
            \`}}/>

            {/* ═══ LEFT CONFIGURATOR ═══ */}
            <div className="md:col-span-8 p-6 sm:p-10" style={{fontFamily:"'Inter',sans-serif"}}>

              {/* Step Progress Bar */}
              <div className="flex items-center gap-0 mb-8">
                {[1,2,3,4].map((s) => (
                  <div key={s} className="flex items-center flex-1 last:flex-none">
                    <button
                      onClick={() => calcStep > s && setCalcStep(s)}
                      className={\`flex items-center justify-center w-8 h-8 rounded-full text-[11px] font-black transition-all duration-300 flex-shrink-0 \${
                        s < calcStep
                          ? "bg-slate-900 text-white cursor-pointer"
                          : s === calcStep
                          ? "bg-black text-white ring-4 ring-black/15 scale-110"
                          : "bg-slate-100 text-slate-400 cursor-default"
                      }\`}
                    >
                      {s < calcStep ? "✓" : s}
                    </button>
                    {s < 4 && (
                      <div className="flex-1 h-[2px] mx-2 rounded-full overflow-hidden bg-slate-100">
                        <div className={\`h-full bg-black rounded-full transition-all duration-500 \${calcStep > s ? "w-full" : "w-0"}\`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Step Labels */}
              <div className="grid grid-cols-4 text-center mb-8 -mt-5">
                {["Project Type","Engagement","Pages","Add-ons"].map((lbl, i) => (
                  <span key={i} className={\`text-[9px] font-extrabold uppercase tracking-widest transition-colors duration-200 \${
                    i + 1 === calcStep ? "text-black" : i + 1 < calcStep ? "text-slate-500" : "text-slate-300"
                  }\`}>{lbl}</span>
                ))}
              </div>

              {/* ── STEP 1: Project Type ── */}
              {calcStep === 1 && (
                <div className="space-y-5">
                  <div>
                    <p className="text-xl font-extrabold text-slate-900 font-sora mb-1">What are you building?</p>
                    <p className="text-xs text-slate-400 font-medium">Choose the type that best matches your vision.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {([
                      { id:"landing",   label:"Landing Page",     desc:"Single page to convert visitors",       base:80000,  icon:"🏠" },
                      { id:"portal",    label:"Web Application",  desc:"Custom features, user dashboard, logic", base:220000, icon:"⚙️" },
                      { id:"ecommerce", label:"E-Commerce Store",  desc:"Product catalogue, cart, checkout",      base:280000, icon:"🛒" },
                      { id:"saas",      label:"SaaS Platform",    desc:"Multi-tenant, subscriptions, APIs",      base:250000, icon:"🚀" },
                    ] as {id:string;label:string;desc:string;base:number;icon:string}[]).map((t) => {
                      const sel = projectType === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => { setProjectType(t.id as any); setTimeout(() => setCalcStep(2), 320); }}
                          className={\`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 group \${
                            sel
                              ? "border-black bg-black text-white shadow-lg"
                              : "border-slate-200 bg-white hover:border-slate-400 hover:shadow-md"
                          }\`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-xl mt-0.5">{t.icon}</span>
                            <div>
                              <p className={\`text-sm font-extrabold tracking-tight \${sel ? "text-white" : "text-slate-800"}\`}>{t.label}</p>
                              <p className={\`text-[11px] mt-0.5 \${sel ? "text-white/70" : "text-slate-400"}\`}>{t.desc}</p>
                              <p className={\`text-xs font-black font-mono mt-1.5 \${sel ? "text-yellow-300" : "text-indigo-600"}\`}>from ₹{t.base.toLocaleString("en-IN")}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 2: Engagement Model ── */}
              {calcStep === 2 && (
                <div className="space-y-5">
                  <div>
                    <p className="text-xl font-extrabold text-slate-900 font-sora mb-1">How do you want to work?</p>
                    <p className="text-xs text-slate-400 font-medium">This determines the billing structure and timeline.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {([
                      { id:"fixed",    label:"Fixed Price",       desc:"Defined scope, one-time delivery. Best for clear requirements.", tag:"Most Common", tagColor:"bg-blue-50 text-blue-700 border-blue-100" },
                      { id:"retainer", label:"Monthly Retainer",  desc:"Ongoing dev, priority support, 10% off. Best for growing products.", tag:"Save 10%",    tagColor:"bg-emerald-50 text-emerald-700 border-emerald-100" },
                    ] as {id:string;label:string;desc:string;tag:string;tagColor:string}[]).map((opt) => {
                      const sel = billingModel === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => { setBillingModel(opt.id as any); setTimeout(() => setCalcStep(3), 320); }}
                          className={\`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 \${
                            sel ? "border-black bg-black text-white shadow-lg" : "border-slate-200 bg-white hover:border-slate-400 hover:shadow-md"
                          }\`}
                        >
                          <span className={\`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border mb-2 inline-block \${sel ? "bg-white/20 text-white border-white/20" : opt.tagColor}\`}>{opt.tag}</span>
                          <p className={\`text-sm font-extrabold \${sel ? "text-white" : "text-slate-800"}\`}>{opt.label}</p>
                          <p className={\`text-[11px] mt-1 \${sel ? "text-white/65" : "text-slate-400"}\`}>{opt.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                  <button onClick={() => setCalcStep(1)} className="text-xs text-slate-400 hover:text-slate-600 font-semibold transition-colors mt-1">← Back</button>
                </div>
              )}

              {/* ── STEP 3: Pages ── */}
              {calcStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <p className="text-xl font-extrabold text-slate-900 font-sora mb-1">How many pages?</p>
                    <p className="text-xs text-slate-400 font-medium">Each additional page beyond the first adds ₹8,000.</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-bold text-slate-600">Pages / Screens</span>
                      <span className="text-2xl font-black text-black font-mono">{pageCount}</span>
                    </div>
                    <input
                      type="range" min={1} max={25} value={pageCount}
                      onChange={(e) => setPageCount(parseInt(e.target.value))}
                      className="calc-r w-full h-[3px] bg-slate-200 rounded-full appearance-none cursor-pointer outline-none block"
                      style={{"--pct": \`\${(pageCount - 1) / 24 * 100}%\`} as any}
                    />
                    <div className="flex justify-between mt-3 text-[9px] font-bold text-slate-400 font-mono">
                      {[1,5,10,15,20,25].map(v => <span key={v} className={pageCount >= v ? "text-slate-700" : ""}>{v}</span>)}
                    </div>
                    {pageCount > 1 && (
                      <p className="mt-3 text-xs font-semibold text-indigo-600">+ ₹{((pageCount - 1) * 8000).toLocaleString("en-IN")} for {pageCount - 1} extra {pageCount - 1 === 1 ? "page" : "pages"}</p>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <button onClick={() => setCalcStep(2)} className="text-xs text-slate-400 hover:text-slate-600 font-semibold transition-colors">← Back</button>
                    <button
                      onClick={() => setCalcStep(4)}
                      className="px-6 py-2.5 rounded-xl bg-black text-white text-xs font-extrabold uppercase tracking-widest hover:bg-slate-800 transition-all duration-200 shadow-md hover:-translate-y-0.5"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 4: Add-ons ── */}
              {calcStep === 4 && (
                <div className="space-y-5">
                  <div>
                    <p className="text-xl font-extrabold text-slate-900 font-sora mb-1">Any add-on features?</p>
                    <p className="text-xs text-slate-400 font-medium">Toggle what you need — pricing updates instantly.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {([
                      { stateKey:"auth",     label:"User Auth & Login",       sub:"JWT, OAuth, role-based access",      price:40000, badge:"Security",   bc:"text-blue-600 bg-blue-50 border-blue-200" },
                      { stateKey:"payments", label:"Payment Gateway",          sub:"Razorpay / Stripe integration",       price:50000, badge:"Popular",    bc:"text-emerald-600 bg-emerald-50 border-emerald-200" },
                      { stateKey:"crm",      label:"CRM & Lead Capture",       sub:"Form-to-CRM, automation triggers",    price:35000, badge:"Sales",      bc:"text-amber-600 bg-amber-50 border-amber-200" },
                      { stateKey:"database", label:"Custom DB Architecture",   sub:"PostgreSQL schema, indexing, APIs",   price:45000, badge:"Enterprise", bc:"text-purple-600 bg-purple-50 border-purple-200" },
                      { stateKey:"pwa",      label:"PWA / Mobile-Ready",       sub:"Offline support, install prompt",     price:30000, badge:"Mobile",     bc:"text-cyan-600 bg-cyan-50 border-cyan-200" },
                      { stateKey:"seo",      label:"Technical SEO Setup",      sub:"Meta, schema, Core Web Vitals",       price:20000, badge:"Growth",     bc:"text-rose-600 bg-rose-50 border-rose-200" },
                    ] as {stateKey:string;label:string;sub:string;price:number;badge:string;bc:string}[]).map((svc) => {
                      const map: Record<string, [boolean, (v:boolean)=>void]> = {
                        auth:     [hasAuth,     setHasAuth],
                        payments: [hasPayments, setHasPayments],
                        crm:      [hasCrm,      setHasCrm],
                        database: [hasDatabase, setHasDatabase],
                        pwa:      [hasPwa,      setHasPwa],
                        seo:      [hasAuth,     setHasAuth],
                      };
                      const [on, toggle] = map[svc.stateKey];
                      return (
                        <button
                          key={svc.stateKey}
                          type="button"
                          onClick={() => toggle(!on)}
                          className={\`w-full text-left flex items-center gap-3 py-3 px-4 rounded-2xl border-2 transition-all duration-200 \${
                            on ? "border-black bg-black" : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                          }\`}
                        >
                          {/* Toggle Knob */}
                          <div className={\`flex-shrink-0 w-9 h-5 rounded-full relative transition-all duration-300 \${on ? "bg-white/25" : "bg-slate-100"}\`}>
                            <div className={\`w-4 h-4 rounded-full absolute top-0.5 transition-all duration-300 shadow \${on ? "bg-white translate-x-4" : "bg-slate-400 translate-x-0.5"}\`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className={\`text-xs font-extrabold \${on ? "text-white" : "text-slate-800"}\`}>{svc.label}</span>
                              {!on && <span className={\`text-[7px] font-black uppercase px-1.5 py-0.5 rounded-full border \${svc.bc}\`}>{svc.badge}</span>}
                            </div>
                            <p className={\`text-[10px] mt-0.5 truncate \${on ? "text-white/55" : "text-slate-400"}\`}>{svc.sub}</p>
                          </div>
                          <span className={\`text-[10px] font-black font-mono flex-shrink-0 \${on ? "text-yellow-300" : "text-slate-500"}\`}>+₹{svc.price.toLocaleString("en-IN")}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button onClick={() => setCalcStep(3)} className="text-xs text-slate-400 hover:text-slate-600 font-semibold transition-colors">← Back</button>
                </div>
              )}

              {/* Completed selections recap chips */}
              {calcStep > 1 && (
                <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-100">
                  {projectType && (
                    <button onClick={() => setCalcStep(1)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold hover:bg-slate-700 transition-colors">
                      {projectType === "landing" ? "Landing Page" : projectType === "portal" ? "Web App" : projectType === "ecommerce" ? "E-Commerce" : "SaaS Platform"}
                      <span className="opacity-50 text-[8px]">✎</span>
                    </button>
                  )}
                  {calcStep > 2 && (
                    <button onClick={() => setCalcStep(2)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold hover:bg-slate-700 transition-colors">
                      {billingModel === "fixed" ? "Fixed Price" : "Monthly Retainer"}
                      <span className="opacity-50 text-[8px]">✎</span>
                    </button>
                  )}
                  {calcStep > 3 && (
                    <button onClick={() => setCalcStep(3)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold hover:bg-slate-700 transition-colors">
                      {pageCount} {pageCount === 1 ? "page" : "pages"}
                      <span className="opacity-50 text-[8px]">✎</span>
                    </button>
                  )}
                </div>
              )}

            </div>

            {/* ═══ RIGHT SUMMARY ═══ */}
            <div
              className="md:col-span-4 flex flex-col justify-between p-6 sm:p-8 relative"
              style={{background:"#FACC15", fontFamily:"'Inter',sans-serif"}}
            >
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-black/50 mb-0.5">Your Estimate</p>
                  <h3 className="text-lg font-black text-black font-sora">Summary</h3>
                </div>

                <div className="space-y-2 text-[12px] font-semibold text-black/80">
                  {projectType ? (
                    <div className="flex justify-between">
                      <span>{projectType === "landing" ? "Landing Page" : projectType === "portal" ? "Web App" : projectType === "ecommerce" ? "E-Commerce" : "SaaS Platform"}</span>
                      <span className="font-black text-black font-mono">Base</span>
                    </div>
                  ) : <p className="text-[11px] text-black/40 italic">Select a project type to begin…</p>}
                  {pageCount > 1 && <div className="flex justify-between"><span>+ {pageCount} pages</span><span className="font-black font-mono">₹{((pageCount-1)*8000).toLocaleString("en-IN")}</span></div>}
                  {hasAuth     && <div className="flex justify-between"><span>+ Auth & Login</span><span className="font-black font-mono">₹40,000</span></div>}
                  {hasPayments && <div className="flex justify-between"><span>+ Payment Gateway</span><span className="font-black font-mono">₹50,000</span></div>}
                  {hasCrm      && <div className="flex justify-between"><span>+ CRM Integration</span><span className="font-black font-mono">₹35,000</span></div>}
                  {hasDatabase && <div className="flex justify-between"><span>+ Database Setup</span><span className="font-black font-mono">₹45,000</span></div>}
                  {hasPwa      && <div className="flex justify-between"><span>+ PWA / Mobile</span><span className="font-black font-mono">₹30,000</span></div>}
                  {billingModel === "retainer" && (
                    <div className="flex justify-between text-emerald-900"><span>Retainer discount</span><span className="font-black font-mono">–10%</span></div>
                  )}
                </div>

                <div className="h-px bg-black/20" />

                {/* Promo */}
                <div className="rounded-xl border border-black/20 bg-black/8 px-3.5 py-2.5">
                  <p className="text-[9px] font-black uppercase tracking-widest text-black/50 mb-0.5">Promo Code</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black text-black">NEXTGEN10</span>
                    <span className="text-[8px] font-black text-emerald-900 bg-white/50 px-2 py-0.5 rounded-full border border-black/10">10% OFF</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-6 md:mt-0">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-black/50">Total Estimate</p>
                  <div className="text-3xl sm:text-4xl font-black text-black mt-0.5 font-sora tracking-tight">
                    ₹{estimatedCost.toLocaleString("en-IN")}
                  </div>
                  {billingModel === "retainer" && (
                    <p className="text-[10px] font-bold text-emerald-900 mt-0.5">Retainer discount applied</p>
                  )}
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" id="terms_agree2" defaultChecked className="mt-0.5 w-4 h-4 rounded cursor-pointer" style={{accentColor:"#000"}} />
                  <label htmlFor="terms_agree2" className="text-[10px] leading-snug text-black/65 cursor-pointer font-medium">
                    I agree to the <span className="underline font-bold text-black">Terms of Service</span>.
                  </label>
                </div>

                <button
                  onClick={handleApplyEstimate}
                  className="w-full bg-black text-white font-extrabold text-[11px] uppercase tracking-widest py-3.5 rounded-xl shadow-lg hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  style={{fontFamily:"'Inter',sans-serif"}}
                >
                  Book Free Consultation
                </button>

                <p className="text-[9px] text-black/45 text-center font-medium">
                  No payment now. Free 30-min strategy call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
`;

const result = content.substring(0, si2) + startMarker + newSection + content.substring(ei2);
fs.writeFileSync(filePath, result, 'utf8');
console.log("Success: Step-funnel calculator written!");
