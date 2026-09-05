import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "https://aqvyron-backend.onrender.com").replace(/\/$/, "");

const fallbackAnalytics = {
  growth: 18.4,
  top_category: "Technology",
  monthly_revenue: [
    { month: "Jan", value: 42000 },
    { month: "Feb", value: 48000 },
    { month: "Mar", value: 53000 },
    { month: "Apr", value: 61000 },
    { month: "May", value: 68000 },
    { month: "Jun", value: 76000 },
  ],
};

const fallbackSources = [
  { name: "PostgreSQL", type: "DATABASE", status: "Connected" },
  { name: "CSV Data", type: "FILE", status: "Connected" },
  { name: "Excel Reports", type: "FILE", status: "Connected" },
];

const fallbackInsights = [
  { title: "Revenue Growth", value: "+18.4%", description: "Revenue performance is showing a positive growth trend." },
  { title: "Customer Activity", value: "24.8K", description: "Active users continue to interact with the platform." },
  { title: "Conversion", value: "7.82%", description: "Current conversion performance remains healthy." },
];

const navItems = [
  ["overview", "Overview"],
  ["analytics", "Analytics"],
  ["products", "Platform"],
  ["insights", "Insights"],
  ["technology", "Architecture"],
  ["contact", "Contact"],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [formStatus, setFormStatus] = useState({ type: "", text: "" });
  const [analyticsData, setAnalyticsData] = useState(null);
  const [dataSourcesData, setDataSourcesData] = useState([]);
  const [insightsData, setInsightsData] = useState([]);
  const [backendStatus, setBackendStatus] = useState("CONNECTING");
  const [loading, setLoading] = useState(true);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  useEffect(() => {
    const loadBackendData = async () => {
      setBackendStatus("CONNECTING");
      try {
        const [analyticsResponse, sourcesResponse, insightsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/analytics/`),
          fetch(`${API_BASE_URL}/api/datasources/`),
          fetch(`${API_BASE_URL}/api/insights/`),
        ]);

        if (!analyticsResponse.ok || !sourcesResponse.ok || !insightsResponse.ok) {
          throw new Error("API request failed");
        }

        const [analytics, sources, insights] = await Promise.all([
          analyticsResponse.json(),
          sourcesResponse.json(),
          insightsResponse.json(),
        ]);

        setAnalyticsData(analytics);
        setDataSourcesData(sources.sources || []);
        setInsightsData(insights.insights || []);
        setBackendStatus("CONNECTED");
      } catch (error) {
        console.error("AQVYRON API error:", error);
        setAnalyticsData(fallbackAnalytics);
        setDataSourcesData(fallbackSources);
        setInsightsData(fallbackInsights);
        setBackendStatus("DEMO MODE");
      } finally {
        setLoading(false);
      }
    };

    loadBackendData();
  }, []);

  useEffect(() => {
    const sections = navItems.map(([id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0.05, 0.2, 0.5] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const analytics = analyticsData || fallbackAnalytics;
  const sources = dataSourcesData.length ? dataSourcesData : fallbackSources;
  const insights = insightsData.length ? insightsData : fallbackInsights;

  const chartMax = useMemo(
    () => Math.max(...analytics.monthly_revenue.map((item) => item.value), 1),
    [analytics]
  );
const handleSubmit = async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const payload = Object.fromEntries(new FormData(form).entries());

  setFormStatus({
    type: "loading",
    text: "Sending your message…",
  });

  try {
    const response = await fetch(`${API_BASE_URL}/api/contact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type") || "";

    let data = {};

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = {
        detail: text,
      };
    }

    if (!response.ok) {
      const serverError =
        data.detail ||
        data.error ||
        data.message ||
        data.name?.[0] ||
        data.email?.[0] ||
        data.subject?.[0] ||
        data.message?.[0] ||
        `Server returned ${response.status}`;

      throw new Error(serverError);
    }

    form.reset();

    setFormStatus({
      type: "success",
      text: "Message received. We'll get back to you soon.",
    });
  } catch (error) {
    console.error("AQVYRON Contact API Error:", error);

    setFormStatus({
      type: "error",
      text: error.message || "Unable to send message.",
    });
  }
};
  
    
  return (
    <div className="app">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <nav className="navbar">
        <div className="nav-container">
          <button className="brand" onClick={() => scrollToSection("overview")} aria-label="AQVYRON home">
            <span className="brand-mark"><span /></span>
            <span>
              <strong>AQVYRON</strong>
              <small>INTELLIGENCE SYSTEM</small>
            </span>
          </button>

          <button className="menu-btn" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? "×" : "☰"}
          </button>

          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            {navItems.map(([id, label]) => (
              <button key={id} className={activeSection === id ? "active" : ""} onClick={() => scrollToSection(id)}>
                {label}
              </button>
            ))}
          </div>

          <button className="nav-cta" onClick={() => scrollToSection("contact")}>Start a conversation ↗</button>
        </div>
      </nav>

      <main>
        <section className="hero section-shell" id="overview">
          <div className="hero-copy">
            <div className="kicker"><span className="pulse" /> BUSINESS INTELLIGENCE / DATA + AI</div>
            <h1>Data that <em>thinks.</em><br />Decisions that <span>move.</span></h1>
            <p className="hero-description">AQVYRON is an intelligent business intelligence system that turns fragmented business data into a clear, connected decision layer.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => scrollToSection("analytics")}>Explore intelligence <span>↗</span></button>
              <button className="ghost-button" onClick={() => scrollToSection("technology")}>View system architecture</button>
            </div>
            <div className="hero-proof">
              <span><b>01</b> INGEST</span><i />
              <span><b>02</b> ANALYZE</span><i />
              <span><b>03</b> PREDICT</span><i />
              <span><b>04</b> ACT</span>
            </div>
          </div>

          <div className="hero-orbit" aria-hidden="true">
            <div className="orbit-ring ring-one" />
            <div className="orbit-ring ring-two" />
            <div className="orbit-ring ring-three" />
            <div className="core-card">
              <span className="core-label">AQVYRON CORE</span>
              <div className="core-graphic"><span /><span /><span /><span /><span /></div>
              <strong>Decision Layer</strong>
              <small>DATA → SIGNAL → ACTION</small>
            </div>
            <span className="orbit-tag tag-one">DATA</span>
            <span className="orbit-tag tag-two">AI</span>
            <span className="orbit-tag tag-three">INSIGHT</span>
          </div>
        </section>

        <section className="signal-strip">
          <div><span className="status-dot" /> SYSTEM {backendStatus === "CONNECTED" ? "CONNECTED" : backendStatus === "DEMO MODE" ? "IN DEMO MODE" : "CONNECTING"}</div>
          <div>API <b>{API_BASE_URL.replace(/^https?:\/\//, "")}</b></div>
          <div>INTELLIGENCE LAYER <b>READY</b></div>
          <div>BUILD <b>01.0</b></div>
        </section>

        <section className="section-shell section-block" id="analytics">
          <div className="section-intro">
            <span className="section-index">01 / LIVE INTELLIGENCE</span>
            <h2>A command center for<br /><span>business signals.</span></h2>
            <p>One connected view across performance, data sources and emerging business patterns. The dashboard below is powered by the Django API when available.</p>
          </div>

          <div className="metric-grid">
            {[
              ["Growth signal", `+${analytics.growth}%`, "vs previous period", "↗"],
              ["Top category", analytics.top_category, "highest current segment", "◈"],
              ["Data sources", String(sources.length).padStart(2, "0"), "connected endpoints", "⌁"],
              ["API status", backendStatus, "AQVYRON service", backendStatus === "CONNECTED" ? "●" : "○"],
            ].map(([label, value, note, icon]) => (
              <article className="metric-card" key={label}>
                <div className="metric-top"><span>{label}</span><b>{icon}</b></div>
                <strong>{value}</strong>
                <small>{note}</small>
              </article>
            ))}
          </div>

          <div className="analytics-panel">
            <div className="panel-heading">
              <div><span>REVENUE SIGNAL / DEMO DATASET</span><h3>Performance trajectory</h3></div>
              <div className="growth-badge">+{analytics.growth}% <small>growth</small></div>
            </div>
            <div className="chart-area">
              {loading ? <div className="chart-loading">Synchronizing intelligence layer…</div> : analytics.monthly_revenue.map((item) => (
                <div className="chart-column" key={item.month}>
                  <div className="bar-wrap"><div className="bar" style={{ height: `${Math.max((item.value / chartMax) * 100, 12)}%` }} /></div>
                  <span>{item.month}</span>
                  <small>₹{Math.round(item.value / 1000)}k</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell section-block platform-block" id="products">
          <div className="section-intro compact">
            <span className="section-index">02 / INTELLIGENCE STACK</span>
            <h2>One system.<br /><span>Four decision layers.</span></h2>
          </div>
          <div className="stack-grid">
            {[
              ["01", "AQVYRON Intelligence", "Unified command layer", "Connect business data, analytics and decision signals in one operational view."],
              ["02", "Analytics Studio", "Understand the now", "Explore performance, trends and metrics through an analytical workspace."],
              ["03", "Predictive Signals", "See what is next", "Use historical patterns and emerging signals to explore forward-looking business signals."],
              ["04", "Decision Support", "Move with confidence", "Turn analytics and business signals into clearer recommendations and next actions."],
            ].map(([num, title, label, text]) => (
              <article className={`stack-card ${num === "01" ? "featured" : ""}`} key={num}>
                <span className="card-num">{num}</span><span className="card-label">{label}</span>
                <h3>{title}</h3><p>{text}</p><span className="card-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell section-block insights-block" id="insights">
          <div className="section-intro compact">
            <span className="section-index">03 / BUSINESS SIGNALS</span>
            <h2>From raw numbers<br />to <span>useful signals.</span></h2>
          </div>
          <div className="insight-layout">
            <div className="insight-list">
              {insights.map((insight, index) => (
                <article className="insight-row" key={insight.title}>
                  <span className="insight-index">0{index + 1}</span>
                  <div><span>{insight.title}</span><h3>{insight.value}</h3><p>{insight.description}</p></div>
                  <b>↗</b>
                </article>
              ))}
            </div>
            <div className="sources-panel">
              <div className="panel-heading"><div><span>CONNECTED INPUTS</span><h3>Data fabric</h3></div><span className="mini-live">● ACTIVE</span></div>
              {sources.map((source, index) => (
                <div className="source-row" key={source.name}><span>0{index + 1}</span><strong>{source.name}</strong><small>{source.type}</small><b>● {source.status}</b></div>
              ))}
              <div className="source-foot">Designed to connect the data you already have.</div>
            </div>
          </div>
        </section>

        <section className="section-shell section-block architecture-block" id="technology">
          <div className="section-intro">
            <span className="section-index">04 / SYSTEM ARCHITECTURE</span>
            <h2>Built as a<br /><span>decision pipeline.</span></h2>
            <p>A clean separation between interface, API, intelligence logic and persistent data makes AQVYRON easier to evolve and deploy.</p>
          </div>
          <div className="pipeline">
            {["React / Vite", "Django REST API", "Intelligence Layer", "PostgreSQL"].map((item, index) => (
              <div className="pipeline-step" key={item}><span>0{index + 1}</span><strong>{item}</strong><small>{["Experience layer", "Service layer", "Decision layer", "Data layer"][index]}</small>{index < 3 && <i>→</i>}</div>
            ))}
          </div>
          <div className="tech-foot"><span>FRONTEND</span><b>React.js · Vite · CSS</b><span>BACKEND</span><b>Python · Django · DRF</b><span>DATA</span><b>PostgreSQL</b><span>DEPLOYMENT</span><b>Render · Gunicorn</b></div>
        </section>

        <section className="section-shell section-block contact-block" id="contact">
          <div className="contact-copy">
            <span className="section-index">05 / CONNECT</span>
            <h2>Let's turn your<br /><span>data into direction.</span></h2>
            <p>Have a question about AQVYRON, the architecture or the project? Send a message through the connected API.</p>
            <div className="contact-note"><span>●</span> Secure API submission<br /><small>Your message is stored by the Django backend.</small></div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field-row"><label><span>01</span> Name<input name="name" required placeholder="Your name" /></label><label><span>02</span> Email<input name="email" type="email" required placeholder="you@example.com" /></label></div>
            <label><span>03</span> Subject<input name="subject" required placeholder="What would you like to discuss?" /></label>
            <label><span>04</span> Message<textarea name="message" required minLength={10} rows="5" placeholder="Tell us a little about your requirement…" /></label>
            <div className="form-bottom"><button className="primary-button" type="submit" disabled={formStatus.type === "loading"}>{formStatus.type === "loading" ? "Sending…" : "Send message ↗"}</button>{formStatus.text && <span className={`form-status ${formStatus.type}`}>{formStatus.text}</span>}</div>
          </form>
        </section>
      </main>
       
       <footer className="footer section-shell">
  <div className="footer-main">
    <div className="footer-brand">
      <div className="footer-logo">
        AQVYRON<span>•</span>
      </div>

      <p>
        Intelligent Business Intelligence & Data Analytics System
      </p>

      <span className="footer-status">
        <span className="status-dot" />
        Intelligence system online
      </span>
    </div>

    <div className="footer-links">
      <div>
        <h4>Platform</h4>
        <button onClick={() => scrollToSection("overview")}>Overview</button>
        <button onClick={() => scrollToSection("analytics")}>Analytics</button>
        <button onClick={() => scrollToSection("insights")}>Insights</button>
      </div>

      <div>
        <h4>Technology</h4>
        <button onClick={() => scrollToSection("technology")}>
          Technology
        </button>
        <button onClick={() => scrollToSection("data")}>
          Data Fabric
        </button>
        <button onClick={() => scrollToSection("architecture")}>
          Architecture
        </button>
      </div>

      <div>
        <h4>Project</h4>
        <button onClick={() => scrollToSection("contact")}>
          Contact
        </button>
        <button onClick={() => scrollToSection("overview")}>
          Back to top ↑
        </button>
      </div>
    </div>
  </div>

  <div className="footer-bottom">
    <span>© 2026 AQVYRON. All rights reserved.</span>

    <span className="footer-project">
      College / Research Project
    </span>

    <span>Built for intelligent decisions.</span>
  </div>
</footer>



    </div>
  );
}

export default App;
