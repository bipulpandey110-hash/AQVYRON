import { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://aqvyron-backend.onrender.com"
).replace(/\/$/, "");

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
  {
    title: "Revenue Growth",
    value: "+18.4%",
    description: "Revenue performance is showing a positive growth trend.",
  },
  {
    title: "Customer Activity",
    value: "24.8K",
    description: "Active users continue to interact with the platform.",
  },
  {
    title: "Conversion",
    value: "7.82%",
    description: "Current conversion performance remains healthy.",
  },
];

const navItems = [
  ["overview", "Overview", "/"],
  ["analytics", "Analytics", "/analytics"],
  ["products", "Platform", "/products"],
  ["insights", "Insights", "/insights"],
  ["technology", "Architecture", "/technology"],
  ["contact", "Contact", "/contact"],
];

const productItems = [
  {
    num: "01",
    title: "AQVYRON Intelligence",
    label: "Unified command layer",
    text: "Connect business data, analytics and decision signals in one operational view.",
    path: "/products/aqvyron-intelligence",
  },
  {
    num: "02",
    title: "Analytics Studio",
    label: "Understand the now",
    text: "Explore performance, trends and metrics through an analytical workspace.",
    path: "/products/analytics-studio",
  },
  {
    num: "03",
    title: "Predictive Signals",
    label: "See what is next",
    text: "Use historical patterns and emerging signals to explore forward-looking business signals.",
    path: "/products/predictive-signals",
  },
  {
    num: "04",
    title: "Decision Support",
    label: "Move with confidence",
    text: "Turn analytics and business signals into clearer recommendations and next actions.",
    path: "/products/decision-support",
  },
];

function Brand({ onClick }) {
  return (
    <button className="brand" onClick={onClick} aria-label="AQVYRON home">
      <span className="brand-mark">
        <span />
      </span>

      <span>
        <strong>AQVYRON</strong>
        <small>INTELLIGENCE SYSTEM</small>
      </span>
    </button>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const goHome = () => {
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Brand onClick={goHome} />

        <button
          className="menu-btn"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "×" : "☰"}
        </button>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          {navItems.map(([id, label, path]) => (
            <Link
              key={id}
              to={path}
              className={
                location.pathname === path ||
                (path === "/products" &&
                  location.pathname.startsWith("/products/"))
                  ? "active"
                  : ""
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          className="nav-cta"
          to="/contact"
          onClick={() => setMenuOpen(false)}
        >
          Start a conversation ↗
        </Link>
      </div>
    </nav>
  );
}

function PageLayout({ children }) {
  return (
    <div className="app">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero section-shell">
        <div className="hero-copy">
          <div className="kicker">
            <span className="pulse" />
            BUSINESS INTELLIGENCE / DATA + AI
          </div>

          <h1>
            Data that <em>thinks.</em>
            <br />
            Decisions that <span>move.</span>
          </h1>

          <p className="hero-description">
            AQVYRON is an intelligent business intelligence system that turns
            fragmented business data into a clear, connected decision layer.
          </p>

          <div className="hero-actions">
            <button
              className="primary-button"
              onClick={() => navigate("/analytics")}
            >
              Explore intelligence <span>↗</span>
            </button>

            <button
              className="ghost-button"
              onClick={() => navigate("/technology")}
            >
              View system architecture
            </button>
          </div>

          <div className="hero-proof">
            <span>
              <b>01</b> INGEST
            </span>
            <i />
            <span>
              <b>02</b> ANALYZE
            </span>
            <i />
            <span>
              <b>03</b> SIGNAL
            </span>
            <i />
            <span>
              <b>04</b> ACT
            </span>
          </div>
        </div>

        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit-ring ring-one" />
          <div className="orbit-ring ring-two" />
          <div className="orbit-ring ring-three" />

          <div className="core-card">
            <span className="core-label">AQVYRON CORE</span>

            <div className="core-graphic">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <strong>Decision Layer</strong>
            <small>DATA → SIGNAL → ACTION</small>
          </div>

          <span className="orbit-tag tag-one">DATA</span>
          <span className="orbit-tag tag-two">AI</span>
          <span className="orbit-tag tag-three">INSIGHT</span>
        </div>
      </section>

      <section className="home-feature-grid section-shell">
        <article className="feature-card">
          <span>01</span>
          <h3>Connected Analytics</h3>
          <p>
            Bring business metrics, data sources and performance signals into
            one clear interface.
          </p>
          <button onClick={() => navigate("/analytics")}>
            Explore Analytics ↗
          </button>
        </article>

        <article className="feature-card">
          <span>02</span>
          <h3>Intelligence Platform</h3>
          <p>
            Explore the AQVYRON platform and its decision-oriented product
            layers.
          </p>
          <button onClick={() => navigate("/products")}>
            Explore Platform ↗
          </button>
        </article>

        <article className="feature-card">
          <span>03</span>
          <h3>System Architecture</h3>
          <p>
            Understand how the React interface, Django API and PostgreSQL
            database work together.
          </p>
          <button onClick={() => navigate("/technology")}>
            View Architecture ↗
          </button>
        </article>
      </section>

      <section className="signal-strip">
        <div>
          <span className="status-dot" />
          INTELLIGENCE SYSTEM
        </div>

        <div>
          API <b>CONNECTED</b>
        </div>

        <div>
          DATA LAYER <b>READY</b>
        </div>

        <div>
          BUILD <b>01.0</b>
        </div>
      </section>
    </>
  );
}

function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [dataSourcesData, setDataSourcesData] = useState([]);
  const [backendStatus, setBackendStatus] = useState("CONNECTING");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBackendData = async () => {
      try {
        const [analyticsResponse, sourcesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/analytics/`),
          fetch(`${API_BASE_URL}/api/datasources/`),
        ]);

        if (!analyticsResponse.ok || !sourcesResponse.ok) {
          throw new Error("API request failed");
        }

        const [analytics, sources] = await Promise.all([
          analyticsResponse.json(),
          sourcesResponse.json(),
        ]);

        setAnalyticsData(analytics);
        setDataSourcesData(sources.sources || []);
        setBackendStatus("CONNECTED");
      } catch (error) {
        console.error("AQVYRON Analytics API error:", error);

        setAnalyticsData(fallbackAnalytics);
        setDataSourcesData(fallbackSources);
        setBackendStatus("DEMO MODE");
      } finally {
        setLoading(false);
      }
    };

    loadBackendData();
  }, []);

  const analytics = analyticsData || fallbackAnalytics;
  const sources = dataSourcesData.length
    ? dataSourcesData
    : fallbackSources;

  const chartMax = useMemo(
    () =>
      Math.max(
        ...analytics.monthly_revenue.map((item) => item.value),
        1
      ),
    [analytics]
  );

  return (
    <section className="section-shell page-section">
      <div className="section-intro">
        <span className="section-index">01 / LIVE INTELLIGENCE</span>

        <h2>
          A command center for
          <br />
          <span>business signals.</span>
        </h2>

        <p>
          One connected view across performance, data sources and emerging
          business patterns.
        </p>
      </div>

      <div className="metric-grid">
        {[
          ["Growth signal", `+${analytics.growth}%`, "vs previous period", "↗"],
          [
            "Top category",
            analytics.top_category,
            "highest current segment",
            "◈",
          ],
          [
            "Data sources",
            String(sources.length).padStart(2, "0"),
            "connected endpoints",
            "⌁",
          ],
          [
            "API status",
            backendStatus,
            "AQVYRON service",
            backendStatus === "CONNECTED" ? "●" : "○",
          ],
        ].map(([label, value, note, icon]) => (
          <article className="metric-card" key={label}>
            <div className="metric-top">
              <span>{label}</span>
              <b>{icon}</b>
            </div>

            <strong>{value}</strong>
            <small>{note}</small>
          </article>
        ))}
      </div>

      <div className="analytics-panel">
        <div className="panel-heading">
          <div>
            <span>REVENUE SIGNAL / DEMO DATASET</span>
            <h3>Performance trajectory</h3>
          </div>

          <div className="growth-badge">
            +{analytics.growth}%
            <small>growth</small>
          </div>
        </div>

        <div className="chart-area">
          {loading ? (
            <div className="chart-loading">
              Synchronizing intelligence layer…
            </div>
          ) : (
            analytics.monthly_revenue.map((item) => (
              <div className="chart-column" key={item.month}>
                <div className="bar-wrap">
                  <div
                    className="bar"
                    style={{
                      height: `${Math.max(
                        (item.value / chartMax) * 100,
                        12
                      )}%`,
                    }}
                  />
                </div>

                <span>{item.month}</span>
                <small>₹{Math.round(item.value / 1000)}k</small>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="page-action-row">
        <Link className="primary-button button-link" to="/insights">
          View business insights ↗
        </Link>

        <Link className="ghost-button button-link" to="/products">
          Explore platform
        </Link>
      </div>
    </section>
  );
}

function ProductsPage() {
  return (
    <section className="section-shell page-section">
      <div className="section-intro compact">
        <span className="section-index">02 / INTELLIGENCE STACK</span>

        <h2>
          One system.
          <br />
          <span>Four decision layers.</span>
        </h2>

        <p>
          Explore the core product layers that make up the AQVYRON intelligence
          platform.
        </p>
      </div>

      <div className="stack-grid">
        {productItems.map((item) => (
          <Link
            className={`stack-card ${
              item.num === "01" ? "featured" : ""
            }`}
            key={item.num}
            to={item.path}
          >
            <span className="card-num">{item.num}</span>
            <span className="card-label">{item.label}</span>

            <h3>{item.title}</h3>
            <p>{item.text}</p>

            <span className="card-arrow">↗</span>

            <span className="card-action">Open page</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProductDetailPage({ product }) {
  return (
    <section className="section-shell page-section detail-page">
      <div className="detail-top">
        <span className="section-index">
          {product.num} / AQVYRON PLATFORM
        </span>

        <Link className="back-link" to="/products">
          ← Back to platform
        </Link>
      </div>

      <div className="detail-content">
        <span className="detail-label">{product.label}</span>

        <h1>{product.title}</h1>

        <p className="detail-description">{product.text}</p>

        <div className="detail-grid">
          <article>
            <span>01</span>
            <h3>Purpose</h3>
            <p>
              Designed as part of the AQVYRON intelligence platform to help
              users understand business data and support better decisions.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Integration</h3>
            <p>
              Works within the broader AQVYRON architecture using the web
              interface, backend APIs and connected data layer.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Experience</h3>
            <p>
              Built around a clean, focused interface so important information
              remains easy to explore and understand.
            </p>
          </article>
        </div>
      </div>

      <div className="page-action-row">
        <Link className="primary-button button-link" to="/contact">
          Discuss AQVYRON ↗
        </Link>

        <Link className="ghost-button button-link" to="/technology">
          View architecture
        </Link>
      </div>
    </section>
  );
}

function InsightsPage() {
  const [insightsData, setInsightsData] = useState([]);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/insights/`);

        if (!response.ok) {
          throw new Error("Insights API request failed");
        }

        const data = await response.json();
        setInsightsData(data.insights || []);
      } catch (error) {
        console.error("AQVYRON Insights API error:", error);
        setInsightsData(fallbackInsights);
      }
    };

    loadInsights();
  }, []);

  const insights = insightsData.length
    ? insightsData
    : fallbackInsights;

  return (
    <section className="section-shell page-section">
      <div className="section-intro compact">
        <span className="section-index">03 / BUSINESS SIGNALS</span>

        <h2>
          From raw numbers
          <br />
          to <span>useful signals.</span>
        </h2>

        <p>
          Analytics becomes more useful when important patterns are presented
          clearly.
        </p>
      </div>

      <div className="insight-layout">
        <div className="insight-list">
          {insights.map((insight, index) => (
            <article className="insight-row" key={insight.title}>
              <span className="insight-index">
                0{index + 1}
              </span>

              <div>
                <span>{insight.title}</span>
                <h3>{insight.value}</h3>
                <p>{insight.description}</p>
              </div>

              <b>↗</b>
            </article>
          ))}
        </div>

        <div className="sources-panel">
          <div className="panel-heading">
            <div>
              <span>CONNECTED INPUTS</span>
              <h3>Data fabric</h3>
            </div>

            <span className="mini-live">● ACTIVE</span>
          </div>

          {fallbackSources.map((source, index) => (
            <div className="source-row" key={source.name}>
              <span>0{index + 1}</span>
              <strong>{source.name}</strong>
              <small>{source.type}</small>
              <b>● {source.status}</b>
            </div>
          ))}

          <div className="source-foot">
            Designed to connect the data you already have.
          </div>
        </div>
      </div>

      <div className="page-action-row">
        <Link className="primary-button button-link" to="/analytics">
          View analytics ↗
        </Link>

        <Link className="ghost-button button-link" to="/products">
          Explore platform
        </Link>
      </div>
    </section>
  );
}

function TechnologyPage() {
  const pipeline = [
    ["01", "React / Vite", "Experience layer"],
    ["02", "Django REST API", "Service layer"],
    ["03", "Intelligence Layer", "Decision layer"],
    ["04", "PostgreSQL", "Data layer"],
  ];

  return (
    <section className="section-shell page-section">
      <div className="section-intro">
        <span className="section-index">04 / SYSTEM ARCHITECTURE</span>

        <h2>
          Built as a
          <br />
          <span>decision pipeline.</span>
        </h2>

        <p>
          A clean separation between interface, API, intelligence logic and
          persistent data makes AQVYRON easier to evolve and deploy.
        </p>
      </div>

      <div className="pipeline">
        {pipeline.map(([num, title, label], index) => (
          <div className="pipeline-step" key={title}>
            <span>{num}</span>
            <strong>{title}</strong>
            <small>{label}</small>

            {index < pipeline.length - 1 && <i>→</i>}
          </div>
        ))}
      </div>

      <div className="architecture-info">
        <article>
          <span>FRONTEND</span>
          <strong>React.js · Vite · CSS</strong>
        </article>

        <article>
          <span>BACKEND</span>
          <strong>Python · Django · DRF</strong>
        </article>

        <article>
          <span>DATABASE</span>
          <strong>PostgreSQL</strong>
        </article>

        <article>
          <span>DEPLOYMENT</span>
          <strong>Render · Gunicorn</strong>
        </article>
      </div>

      <div className="page-action-row">
        <Link className="primary-button button-link" to="/contact">
          Contact AQVYRON ↗
        </Link>

        <Link className="ghost-button button-link" to="/products">
          View platform
        </Link>
      </div>
    </section>
  );
}

function ContactPage() {
  const [formStatus, setFormStatus] = useState({
    type: "",
    text: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const payload = Object.fromEntries(
      new FormData(form).entries()
    );

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

      const contentType =
        response.headers.get("content-type") || "";

      let data = {};

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { detail: text };
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
    <section className="section-shell page-section contact-page">
      <div className="contact-copy">
        <span className="section-index">05 / CONNECT</span>

        <h1>
          Let's turn your
          <br />
          <span>data into direction.</span>
        </h1>

        <p>
          Have a question about AQVYRON, the architecture or the project?
          Send a message through the connected API.
        </p>

        <div className="contact-note">
          <span>●</span>
          Secure API submission
          <small>
            Your message is stored by the Django backend.
          </small>
        </div>

        <div className="social-links">
          <a
            href="https://github.com/bipulpandey110-hash/AQVYRON"
            target="_blank"
            rel="noreferrer"
          >
            <span>GH</span>
            GitHub
            <b>↗</b>
          </a>

          <a
            href="https://www.linkedin.com/in/bipul-kumar-pandey-921494359"
            target="_blank"
            rel="noreferrer"
          >
            <span>in</span>
            LinkedIn
            <b>↗</b>
          </a>

          <a href="mailto:bipulpandey110@gmail.com">
            <span>@</span>
            Email
            <b>↗</b>
          </a>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="field-row">
          <label>
            <span>01</span>
            Name
            <input
              name="name"
              required
              placeholder="Your name"
            />
          </label>

          <label>
            <span>02</span>
            Email
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
            />
          </label>
        </div>

        <label>
          <span>03</span>
          Subject
          <input
            name="subject"
            required
            placeholder="What would you like to discuss?"
          />
        </label>

        <label>
          <span>04</span>
          Message
          <textarea
            name="message"
            required
            minLength={10}
            rows="6"
            placeholder="Tell us a little about your requirement…"
          />
        </label>

        <div className="form-bottom">
          <button
            className="primary-button"
            type="submit"
            disabled={formStatus.type === "loading"}
          >
            {formStatus.type === "loading"
              ? "Sending…"
              : "Send message ↗"}
          </button>

          {formStatus.text && (
            <span
              className={`form-status ${formStatus.type}`}
            >
              {formStatus.text}
            </span>
          )}
        </div>
      </form>
    </section>
  );
}

function Footer() {
  return (
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
            <Link to="/">Overview</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/products">Platform</Link>
            <Link to="/insights">Insights</Link>
          </div>

          <div>
            <h4>Technology</h4>
            <Link to="/technology">Architecture</Link>
            <Link to="/products">Data Fabric</Link>
            <Link to="/technology">Technology</Link>
          </div>

          <div>
            <h4>Project</h4>
            <Link to="/contact">Contact</Link>
            <a
              href="https://github.com/bipulpandey110-hash/AQVYRON"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/bipul-kumar-pandey-921494359"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
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
  );
}

const productRoutes = productItems.map((product) => (
  <Route
    key={product.path}
    path={product.path}
    element={<ProductDetailPage product={product} />}
  />
));

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {productRoutes}

          <Route
            path="*"
            element={
              <section className="section-shell page-section not-found">
                <span className="section-index">404 / PAGE NOT FOUND</span>

                <h1>
                  This page
                  <br />
                  <span>doesn't exist.</span>
                </h1>

                <Link
                  className="primary-button button-link"
                  to="/"
                >
                  Back to AQVYRON ↗
                </Link>
              </section>
            }
          />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;