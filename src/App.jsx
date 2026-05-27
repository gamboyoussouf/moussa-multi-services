import { useState, useEffect, useRef } from "react";

const COLORS = {
  darkBlue: "#0B1F3A",
  green: "#4CAF50",
  white: "#FFFFFF",
  lightGray: "#F5F5F5",
  midGray: "#6B7A99",
  accent: "#E8F0FA",
};

const FONT = "'Montserrat', 'Poppins', sans-serif";
const PHONE = "(281) 375-3218";
const EMAIL = "keibiz@moussaservices.com";
const ADDRESS = "3050 Post Oak Blvd, Suite 510, Houston, TX 77056";

const SERVICES = [
  { icon: "🧹", title: "Cleaning Services", desc: "Residential & commercial cleaning tailored to your needs." },
  { icon: "🌱", title: "Lawn Care", desc: "Professional mowing, trimming, and yard maintenance." },
  { icon: "🚚", title: "Moving Services", desc: "Reliable local moving and hauling services." },
  { icon: "🏠", title: "Property Renovation", desc: "Property repairs, improvements, and maintenance solutions." },
  { icon: "✈️", title: "Aircraft Cleaning", desc: "Interior and exterior aircraft cleaning with professional care." },
];

const WHY_US = [
  "Reliable & Professional",
  "Affordable Pricing",
  "Quality Workmanship",
  "Fast Response Time",
  "Customer Satisfaction Guaranteed",
];

const GALLERY = [
  { emoji: "🏠", label: "Clean Homes" },
  { emoji: "🌿", label: "Lawn Work" },
  { emoji: "🚚", label: "Moving Truck" },
  { emoji: "🔨", label: "Renovation" },
  { emoji: "✈️", label: "Aircraft Cleaning" },
  { emoji: "🧹", label: "Commercial Clean" },
];

const NAV = ["Home", "Services", "About", "Gallery", "Contact"];

// ── Hook: detect mobile ────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
}

// ── Animated Counter ───────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const end = parseInt(target);
        const steps = 60;
        const increment = end / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Top Bar ────────────────────────────────────────────────────────
function TopBar() {
  const isMobile = useIsMobile();
  return (
    <div style={{
      background: COLORS.green, padding: isMobile ? "8px 4%" : "8px 5%",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      fontFamily: FONT, fontSize: isMobile ? 11 : 13, fontWeight: 700,
      color: COLORS.white, flexWrap: "wrap", gap: 6,
    }}>
      <span style={{ fontSize: isMobile ? 10 : 13 }}>
        {isMobile ? `📞 ${PHONE}` : `📞 ${PHONE} | ✉️ ${EMAIL}`}
      </span>
      <a href="#contact" style={{
        background: COLORS.darkBlue, color: COLORS.white,
        padding: "4px 12px", borderRadius: 20, textDecoration: "none",
        fontSize: 11, fontWeight: 800, letterSpacing: 0.5, whiteSpace: "nowrap",
      }}>GET FREE QUOTE</a>
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────
function Navbar({ active, setActive }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: COLORS.darkBlue, padding: "0 5%", minHeight: 62,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      fontFamily: FONT, boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 26 }}>✈️</span>
        <div>
          <div style={{ color: COLORS.white, fontWeight: 900, fontSize: 13, letterSpacing: 2 }}>MOUSSA'S</div>
          <div style={{ color: COLORS.green, fontWeight: 800, fontSize: 9, letterSpacing: 3 }}>MULTI SERVICES</div>
        </div>
      </div>

      {/* Desktop menu */}
      {!isMobile && (
        <div style={{ display: "flex", gap: 28 }}>
          {NAV.map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setActive(n)} style={{
              color: active === n ? COLORS.green : "#CBD5E8",
              textDecoration: "none", fontWeight: 700, fontSize: 13,
              borderBottom: active === n ? `2px solid ${COLORS.green}` : "2px solid transparent",
              paddingBottom: 2, transition: "all 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = COLORS.green}
              onMouseLeave={e => e.target.style.color = active === n ? COLORS.green : "#CBD5E8"}
            >{n}</a>
          ))}
        </div>
      )}

      {/* Mobile hamburger */}
      {isMobile && (
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "none", border: "none", cursor: "pointer",
          color: COLORS.white, fontSize: 26, padding: 4,
        }}>☰</button>
      )}

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: "absolute", top: 62, left: 0, right: 0,
          background: COLORS.darkBlue, zIndex: 200,
          borderTop: `2px solid ${COLORS.green}`,
          display: "flex", flexDirection: "column",
        }}>
          {NAV.map(n => (
            <a key={n} href={`#${n.toLowerCase()}`}
              onClick={() => { setActive(n); setMenuOpen(false); }}
              style={{
                color: active === n ? COLORS.green : COLORS.white,
                textDecoration: "none", fontWeight: 700, fontSize: 15,
                padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >{n}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── Hero Slideshow ─────────────────────────────────────────────────
const SLIDES = [
  { src: "./cleaning.webp", label: "Cleaning Services" },
  { src: "./moving.jpeg", label: "Moving Services" },
  { src: "./aircraft.jpg", label: "Aircraft Cleaning" },
  { src: "./renovation.jpg", label: "Property Renovation" },
  { src: "./lawn.jpg", label: "Lawn Care" },
];

function Hero() {
  const [current, setCurrent] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" style={{
      minHeight: isMobile ? "100svh" : "92vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: isMobile ? "80px 6% 60px" : "100px 5% 80px",
      fontFamily: FONT, position: "relative", overflow: "hidden",
    }}>
      {SLIDES.map((slide, i) => (
        <div key={slide.src} style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${slide.src})`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: i === current ? 1 : 0,
          transition: "opacity 1.2s ease-in-out", zIndex: 0,
        }} />
      ))}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(11,31,58,0.75) 0%, rgba(11,31,58,0.88) 100%)",
        zIndex: 1,
      }} />

      {/* Dot indicators */}
      <div style={{
        position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 8, zIndex: 3,
      }}>
        {SLIDES.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{
            width: i === current ? 24 : 8, height: 8, borderRadius: 4, cursor: "pointer",
            background: i === current ? COLORS.green : "rgba(255,255,255,0.35)",
            transition: "all 0.4s ease",
          }} />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <div style={{
          background: "rgba(76,175,80,0.15)", border: `1px solid ${COLORS.green}`,
          borderRadius: 30, padding: "5px 16px", marginBottom: 20,
          color: COLORS.green, fontWeight: 700, fontSize: isMobile ? 10 : 12, letterSpacing: 2,
        }}>
          HOUSTON, TEXAS • EST. 2024
        </div>

        <h1 style={{
          fontSize: isMobile ? "2rem" : "clamp(2.4rem, 5.5vw, 4.2rem)",
          color: COLORS.white, fontWeight: 900, lineHeight: 1.15,
          margin: "0 0 16px", letterSpacing: -1,
        }}>
          Property &amp; Aircraft<br />
          <span style={{
            background: `linear-gradient(90deg, ${COLORS.green}, #81C784)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Services Done Right</span>
        </h1>

        <p style={{
          color: "#A8BFD8", fontSize: isMobile ? "0.95rem" : "1.1rem",
          maxWidth: 540, margin: "0 0 36px", lineHeight: 1.7, fontWeight: 500,
        }}>
          Reliable cleaning, lawn care, moving, renovation, and aircraft cleaning services in Houston, Texas.
        </p>

        <div style={{
          display: "flex", gap: 12,
          flexDirection: isMobile ? "column" : "row",
          width: isMobile ? "100%" : "auto",
          marginBottom: 48,
        }}>
          <a href="tel:+12813753218" style={{
            background: COLORS.green, color: COLORS.white,
            padding: "14px 32px", borderRadius: 8, fontWeight: 800,
            fontSize: 15, textDecoration: "none", letterSpacing: 1,
            boxShadow: "0 6px 24px rgba(76,175,80,0.45)",
            textAlign: "center",
          }}>📞 Call Now</a>
          <a href={`mailto:${EMAIL}?subject=Free%20Estimate%20Request&body=Hello%20Moussa's%20Multi%20Services%2C%0A%0AI%20would%20like%20to%20request%20a%20free%20estimate.%0A%0AThank%20you.`}
            style={{
              background: "transparent", color: COLORS.white,
              padding: "14px 32px", borderRadius: 8, fontWeight: 800,
              fontSize: 15, textDecoration: "none", letterSpacing: 1,
              border: "2px solid rgba(255,255,255,0.3)", textAlign: "center",
            }}>📩 Free Estimate</a>
        </div>

        <div style={{
          display: "flex", gap: isMobile ? 32 : 56, flexWrap: "wrap", justifyContent: "center",
          borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 32,
        }}>
          {[
            { target: 500, suffix: "+", label: "Happy Clients" },
            { target: 5, suffix: "", label: "Services" },
            { target: 100, suffix: "%", label: "Satisfaction" },
          ].map(({ target, suffix, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ color: COLORS.green, fontSize: isMobile ? 28 : 34, fontWeight: 900, lineHeight: 1 }}>
                <AnimatedCounter target={target} suffix={suffix} duration={2000} />
              </div>
              <div style={{ color: "#7A9ABF", fontSize: 11, letterSpacing: 2, marginTop: 4 }}>{label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Banner ─────────────────────────────────────────────────────────
function Banner() {
  return (
    <div style={{ background: COLORS.green, padding: "16px 5%", textAlign: "center", fontFamily: FONT }}>
      <p style={{ color: COLORS.white, fontWeight: 800, fontSize: "clamp(0.85rem, 2vw, 1.1rem)", margin: 0 }}>
        🔥 One Company. Multiple Services. — We handle everything so you don't have to call multiple companies.
      </p>
    </div>
  );
}

// ── Services ───────────────────────────────────────────────────────
function Services() {
  return (
    <section id="services" style={{ padding: "70px 5%", background: COLORS.lightGray, fontFamily: FONT }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ color: COLORS.green, fontWeight: 800, letterSpacing: 4, fontSize: 12, marginBottom: 10 }}>WHAT WE OFFER</div>
        <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 3rem)", color: COLORS.darkBlue, fontWeight: 900, margin: 0 }}>Our Services</h2>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 20, maxWidth: 1150, margin: "0 auto",
      }}>
        {SERVICES.map((s, i) => (
          <div key={s.title} style={{
            background: COLORS.white, borderRadius: 16, padding: "32px 24px",
            boxShadow: "0 2px 20px rgba(11,31,58,0.07)",
            borderTop: `4px solid ${i % 2 === 0 ? COLORS.darkBlue : COLORS.green}`,
            transition: "transform 0.22s, box-shadow 0.22s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(11,31,58,0.14)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 20px rgba(11,31,58,0.07)"; }}
          >
            <div style={{ fontSize: 42, marginBottom: 14 }}>{s.icon}</div>
            <h3 style={{ color: COLORS.darkBlue, fontWeight: 800, fontSize: 17, marginBottom: 10 }}>{s.title}</h3>
            <p style={{ color: COLORS.midGray, lineHeight: 1.65, margin: "0 0 18px", fontSize: 14 }}>{s.desc}</p>
            <a href={`mailto:${EMAIL}?subject=Quote: ${s.title}`} style={{ color: COLORS.green, fontWeight: 800, fontSize: 12, letterSpacing: 1, textDecoration: "none" }}>
              GET A QUOTE →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Why Choose Us ──────────────────────────────────────────────────
function WhyUs() {
  return (
    <section id="whyus" style={{
      padding: "70px 5%",
      background: `linear-gradient(135deg, ${COLORS.darkBlue}, #132d52)`,
      fontFamily: FONT,
    }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ color: COLORS.green, fontWeight: 800, letterSpacing: 4, fontSize: 12, marginBottom: 10 }}>THE DIFFERENCE</div>
        <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 3rem)", color: COLORS.white, fontWeight: 900, margin: 0 }}>
          Why Choose Moussa's Multi Services?
        </h2>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 16, maxWidth: 950, margin: "0 auto",
      }}>
        {WHY_US.map(item => (
          <div key={item} style={{
            display: "flex", alignItems: "center", gap: 14,
            background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "18px 20px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%", background: COLORS.green,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, flexShrink: 0,
            }}>✔</div>
            <span style={{ color: COLORS.white, fontWeight: 700, fontSize: 15 }}>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Gallery ────────────────────────────────────────────────────────
function Gallery() {
  return (
    <section id="gallery" style={{ padding: "70px 5%", background: COLORS.white, fontFamily: FONT }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ color: COLORS.green, fontWeight: 800, letterSpacing: 4, fontSize: 12, marginBottom: 10 }}>PORTFOLIO</div>
        <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 3rem)", color: COLORS.darkBlue, fontWeight: 900, margin: 0 }}>Our Work</h2>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 16, maxWidth: 1100, margin: "0 auto",
      }}>
        {GALLERY.map((g, i) => (
          <div key={g.label} style={{
            background: i % 3 === 0 ? COLORS.lightGray : i % 3 === 1 ? COLORS.accent : "#E8F5E9",
            borderRadius: 16, height: 160,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            fontSize: 44, gap: 10, cursor: "pointer", transition: "transform 0.2s",
            border: "2px solid transparent",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.border = `2px solid ${COLORS.green}`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.border = "2px solid transparent"; }}
          >
            {g.emoji}
            <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.darkBlue, letterSpacing: 1 }}>{g.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────────
function About() {
  const isMobile = useIsMobile();
  return (
    <section id="about" style={{ padding: "70px 5%", background: COLORS.lightGray, fontFamily: FONT }}>
      <div style={{
        maxWidth: 900, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? 32 : 56, alignItems: "center",
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.darkBlue}, #1a3a6b)`,
          borderRadius: 20, padding: "48px 32px", textAlign: "center",
          boxShadow: "0 12px 40px rgba(11,31,58,0.2)",
        }}>
          <div style={{ fontSize: 60, marginBottom: 12 }}>✈️🏠</div>
          <div style={{ color: COLORS.white, fontWeight: 900, fontSize: 20, letterSpacing: 2 }}>MOUSSA'S</div>
          <div style={{ color: COLORS.green, fontWeight: 800, fontSize: 12, letterSpacing: 3, marginBottom: 16 }}>MULTI SERVICES</div>
          <div style={{
            background: "rgba(76,175,80,0.15)", borderRadius: 8, padding: "10px 16px",
            color: COLORS.green, fontWeight: 700, fontSize: 11, letterSpacing: 2,
          }}>RELIABLE • PROFESSIONAL • TRUSTED</div>
        </div>
        <div>
          <div style={{ color: COLORS.green, fontWeight: 800, letterSpacing: 4, fontSize: 12, marginBottom: 10 }}>WHO WE ARE</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: COLORS.darkBlue, fontWeight: 900, margin: "0 0 16px" }}>About Us</h2>
          <p style={{ color: COLORS.midGray, lineHeight: 1.85, fontSize: 15, marginBottom: 24 }}>
            Moussa's Multi Services is committed to delivering dependable and high-quality property and aircraft services throughout Houston. Our mission is to provide professional solutions with integrity, efficiency, and customer satisfaction at the center of everything we do.
          </p>
          <a href={`mailto:${EMAIL}?subject=Free Estimate Request`} style={{
            display: "inline-block", background: COLORS.darkBlue, color: COLORS.white,
            padding: "13px 28px", borderRadius: 8, fontWeight: 800,
            fontSize: 13, textDecoration: "none", letterSpacing: 1,
          }}>📩 GET FREE QUOTE</a>
        </div>
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const isMobile = useIsMobile();

  const handleSend = () => {
    if (!form.name || !form.phone) return;
    const subject = encodeURIComponent(`Free Quote Request — ${form.service || "General"}`);
    const body = encodeURIComponent(`Hello Moussa's Multi Services,\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${form.service}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputStyle = {
    width: "100%", padding: "13px 14px", marginBottom: 12,
    border: "2px solid #E2E8F0", borderRadius: 8, fontSize: 14,
    fontFamily: FONT, outline: "none", boxSizing: "border-box",
    color: COLORS.darkBlue, background: COLORS.white,
  };

  return (
    <section id="contact" style={{ padding: "70px 5%", background: COLORS.white, fontFamily: FONT }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ color: COLORS.green, fontWeight: 800, letterSpacing: 4, fontSize: 12, marginBottom: 10 }}>REACH OUT</div>
        <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 3rem)", color: COLORS.darkBlue, fontWeight: 900, margin: 0 }}>Contact Us</h2>
        <p style={{ color: COLORS.midGray, marginTop: 10, fontSize: 15 }}>Call or text for a free quote — <strong>Houston, Texas</strong></p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr",
        gap: 32, maxWidth: 960, margin: "0 auto",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { icon: "📞", label: "Phone / Fax", val: PHONE, big: true, href: "tel:+12813753218" },
            { icon: "✉️", label: "Email Address", val: EMAIL, href: `mailto:${EMAIL}` },
            { icon: "📍", label: "Office Location", val: ADDRESS },
          ].map(({ icon, label, val, big, href }) => (
            <div key={label} style={{
              background: COLORS.lightGray, borderRadius: 14, padding: "18px 20px",
              display: "flex", alignItems: "center", gap: 14,
              borderLeft: `4px solid ${COLORS.green}`,
            }}>
              <div style={{
                width: 46, height: 46, borderRadius: 10, background: "#E8F5E9",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, flexShrink: 0,
              }}>{icon}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ color: COLORS.midGray, fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>{label.toUpperCase()}</div>
                {href ? (
                  <a href={href} style={{
                    color: COLORS.darkBlue, fontWeight: big ? 900 : 700,
                    fontSize: big ? 18 : 13, textDecoration: "none",
                    wordBreak: "break-all",
                  }}>{val}</a>
                ) : (
                  <div style={{ color: COLORS.darkBlue, fontWeight: 700, fontSize: 13, wordBreak: "break-word" }}>{val}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: COLORS.lightGray, borderRadius: 20, padding: isMobile ? "28px 20px" : "36px 32px", boxShadow: "0 4px 28px rgba(11,31,58,0.07)" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 56 }}>✅</div>
              <h3 style={{ color: COLORS.darkBlue, fontWeight: 800 }}>Request Sent!</h3>
              <p style={{ color: COLORS.midGray }}>Your email app opened with all details pre-filled.</p>
              <button onClick={() => setSent(false)} style={{
                background: COLORS.green, color: COLORS.white, border: "none",
                padding: "10px 24px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontFamily: FONT,
              }}>Send Another</button>
            </div>
          ) : (
            <>
              <h3 style={{ color: COLORS.darkBlue, fontWeight: 900, margin: "0 0 20px", fontSize: 18 }}>Request a Free Quote</h3>
              <input style={inputStyle} placeholder="Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input style={inputStyle} placeholder="Phone Number *" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              <input style={inputStyle} placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <select style={{ ...inputStyle, color: form.service ? COLORS.darkBlue : "#999" }}
                value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                <option value="" disabled>Service Needed</option>
                {SERVICES.map(s => <option key={s.title} value={s.title}>{s.icon} {s.title}</option>)}
              </select>
              <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
                placeholder="Message (optional)" value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })} />
              <button onClick={handleSend} style={{
                width: "100%", background: COLORS.darkBlue, color: COLORS.white,
                padding: "15px", borderRadius: 8, border: "none",
                fontWeight: 900, fontSize: 15, cursor: "pointer", letterSpacing: 1, fontFamily: FONT,
                opacity: (!form.name || !form.phone) ? 0.6 : 1,
              }}>SEND REQUEST →</button>
              <p style={{ color: COLORS.midGray, fontSize: 11, textAlign: "center", marginTop: 10 }}>* Required fields</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────
function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background: COLORS.darkBlue, padding: "48px 5% 24px", fontFamily: FONT, color: "#7A9ABF" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
        gap: 32, maxWidth: 1100, margin: "0 auto 36px",
      }}>
        <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 22 }}>✈️</span>
            <div>
              <div style={{ color: COLORS.white, fontWeight: 900, fontSize: 14, letterSpacing: 2 }}>MOUSSA'S</div>
              <div style={{ color: COLORS.green, fontWeight: 800, fontSize: 9, letterSpacing: 3 }}>MULTI SERVICES</div>
            </div>
          </div>
          <p style={{ lineHeight: 1.75, fontSize: 13 }}>
            Property &amp; Aircraft Services Done Right.<br />
            {ADDRESS}<br />📞 {PHONE}<br />✉️ {EMAIL}
          </p>
        </div>

        <div>
          <div style={{ color: COLORS.white, fontWeight: 800, marginBottom: 14, letterSpacing: 1, fontSize: 12 }}>QUICK LINKS</div>
          {NAV.map(n => (
            <div key={n} style={{ marginBottom: 8 }}>
              <a href={`#${n.toLowerCase()}`} style={{ color: "#7A9ABF", textDecoration: "none", fontSize: 13 }}
                onMouseEnter={e => e.target.style.color = COLORS.green}
                onMouseLeave={e => e.target.style.color = "#7A9ABF"}
              >{n}</a>
            </div>
          ))}
        </div>

        <div>
          <div style={{ color: COLORS.white, fontWeight: 800, marginBottom: 14, letterSpacing: 1, fontSize: 12 }}>SERVICES</div>
          {SERVICES.map(s => (
            <div key={s.title} style={{ fontSize: 12, marginBottom: 7 }}>{s.icon} {s.title}</div>
          ))}
        </div>

        <div>
          <div style={{ color: COLORS.white, fontWeight: 800, marginBottom: 14, letterSpacing: 1, fontSize: 12 }}>FOLLOW US</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="https://www.facebook.com/share/18m8w2nN1P/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{
              width: 44, height: 44, borderRadius: 10, background: "#1877F2",
              display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none",
              transition: "transform 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.273h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
            </a>
            <a href="#" style={{
              width: 44, height: 44, borderRadius: 10,
              background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none",
              transition: "transform 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" style={{
              width: 44, height: 44, borderRadius: 10, background: "#010101",
              border: "1px solid rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none",
              transition: "transform 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, textAlign: "center", fontSize: 12 }}>
        © 2026 Moussa's Multi Services. All rights reserved. • moussaservices.com
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("Home");
  return (
    <div style={{ fontFamily: FONT }}>
      <TopBar />
      <Navbar active={active} setActive={setActive} />
      <Hero />
      <Banner />
      <Services />
      <WhyUs />
      <Gallery />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}