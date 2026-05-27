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

// ── Animated Counter ───────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const isPercent = suffix === "%";
          const end = parseInt(target);
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, suffix, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Top Bar ────────────────────────────────────────────────────────
function TopBar() {
  return (
    <div style={{
      background: COLORS.green, padding: "8px 5%",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      fontFamily: FONT, fontSize: 13, fontWeight: 700, color: COLORS.white,
      letterSpacing: 0.5,
    }}>
      <span>📞 {PHONE} &nbsp;|&nbsp; ✉️ {EMAIL}</span>
      <a href="#contact" style={{
        background: COLORS.darkBlue, color: COLORS.white,
        padding: "4px 12px", borderRadius: 20, textDecoration: "none",
        fontSize: 11, fontWeight: 800, letterSpacing: 0.5,
      }}>GET FREE QUOTE</a>
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────
function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(11,31,58,0.98)" : COLORS.darkBlue,
      padding: "0 5%", height: 66,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      fontFamily: FONT,
      boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.25)" : "none",
      transition: "box-shadow 0.3s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 30 }}>✈️</span>
        <div>
          <div style={{ color: COLORS.white, fontWeight: 900, fontSize: 15, letterSpacing: 2 }}>MOUSSA'S</div>
          <div style={{ color: COLORS.green, fontWeight: 800, fontSize: 10, letterSpacing: 3 }}>MULTI SERVICES</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 30 }}>
        {NAV.map(n => (
          <a key={n} href={`#${n.toLowerCase()}`}
            onClick={() => setActive(n)}
            style={{
              color: active === n ? COLORS.green : "#CBD5E8",
              textDecoration: "none", fontWeight: 700, fontSize: 13,
              letterSpacing: 1, borderBottom: active === n ? `2px solid ${COLORS.green}` : "2px solid transparent",
              paddingBottom: 2, transition: "all 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = COLORS.green}
            onMouseLeave={e => e.target.style.color = active === n ? COLORS.green : "#CBD5E8"}
          >{n}</a>
        ))}
      </div>
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" style={{
      minHeight: "92vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "100px 5% 80px",
      fontFamily: FONT, position: "relative", overflow: "hidden",
    }}>

      {/* Slideshow images with fade transition */}
      {SLIDES.map((slide, i) => (
        <div key={slide.src} style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${slide.src})`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: i === current ? 1 : 0,
          transition: "opacity 1.2s ease-in-out",
          zIndex: 0,
        }} />
      ))}

      {/* Dark overlay for text readability */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(11,31,58,0.75) 0%, rgba(11,31,58,0.85) 100%)",
        zIndex: 1,
      }} />

      {/* Slide label badge */}
      <div style={{
        position: "absolute", top: 90, left: "50%", transform: "translateX(-50%)",
        background: "rgba(76,175,80,0.2)", border: `1px solid ${COLORS.green}`,
        borderRadius: 30, padding: "4px 18px", zIndex: 3,
        color: COLORS.green, fontWeight: 700, fontSize: 11, letterSpacing: 2,
        transition: "opacity 0.5s",
      }}>
        {SLIDES[current].label.toUpperCase()}
      </div>

      {/* Dot indicators */}
      <div style={{
        position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 8, zIndex: 3,
      }}>
        {SLIDES.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{
            width: i === current ? 28 : 8, height: 8,
            borderRadius: 4, cursor: "pointer",
            background: i === current ? COLORS.green : "rgba(255,255,255,0.35)",
            transition: "all 0.4s ease",
          }} />
        ))}
      </div>

      {/* All text content */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>

        <div style={{
          background: "rgba(76,175,80,0.15)", border: `1px solid ${COLORS.green}`,
          borderRadius: 30, padding: "6px 22px", marginBottom: 28,
          color: COLORS.green, fontWeight: 700, fontSize: 12, letterSpacing: 3,
        }}>
          HOUSTON, TEXAS • EST. 2024
        </div>

        <h1 style={{
          fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", color: COLORS.white,
          fontWeight: 900, lineHeight: 1.1, margin: "0 0 20px",
          maxWidth: 820, letterSpacing: -1,
        }}>
          Property &amp; Aircraft<br />
          <span style={{
            background: `linear-gradient(90deg, ${COLORS.green}, #81C784)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Services Done Right</span>
        </h1>

        <p style={{
          color: "#A8BFD8", fontSize: "clamp(1rem, 2vw, 1.18rem)",
          maxWidth: 580, margin: "0 0 44px", lineHeight: 1.75, fontWeight: 500,
        }}>
          Reliable cleaning, lawn care, moving, renovation, and aircraft cleaning services in Houston, Texas.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 64 }}>
          <a
            href="tel:+12813753218"
            onClick={e => { window.location.href = "tel:+12813753218"; }}
            style={{
              background: COLORS.green, color: COLORS.white,
              padding: "15px 38px", borderRadius: 8, fontWeight: 800,
              fontSize: 15, textDecoration: "none", letterSpacing: 1,
              boxShadow: "0 6px 24px rgba(76,175,80,0.45)", cursor: "pointer",
            }}>📞 Call Now</a>

          <a
            href={`mailto:${EMAIL}?subject=Free%20Estimate%20Request&body=Hello%20Moussa's%20Multi%20Services%2C%0A%0AI%20would%20like%20to%20request%20a%20free%20estimate.%0A%0AThank%20you.`}
            onClick={e => {
              window.location.href = `mailto:${EMAIL}?subject=Free%20Estimate%20Request&body=Hello%20Moussa's%20Multi%20Services%2C%0A%0AI%20would%20like%20to%20request%20a%20free%20estimate.%0A%0AThank%20you.`;
            }}
            style={{
              background: "transparent", color: COLORS.white,
              padding: "15px 38px", borderRadius: 8, fontWeight: 800,
              fontSize: 15, textDecoration: "none", letterSpacing: 1,
              border: "2px solid rgba(255,255,255,0.25)", cursor: "pointer",
            }}>📩 Free Estimate</a>
        </div>

        {/* Animated Stats */}
        <div style={{
          display: "flex", gap: 56, flexWrap: "wrap", justifyContent: "center",
          borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 40,
        }}>
          {[
            { target: 500, suffix: "+", label: "Happy Clients" },
            { target: 5, suffix: "", label: "Services" },
            { target: 100, suffix: "%", label: "Satisfaction" },
          ].map(({ target, suffix, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ color: COLORS.green, fontSize: 34, fontWeight: 900, lineHeight: 1 }}>
                <AnimatedCounter target={target} suffix={suffix} duration={2000} />
              </div>
              <div style={{ color: "#7A9ABF", fontSize: 12, letterSpacing: 2, marginTop: 4 }}>{label.toUpperCase()}</div>
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
    <div style={{
      background: COLORS.green, padding: "18px 5%",
      textAlign: "center", fontFamily: FONT,
    }}>
      <p style={{
        color: COLORS.white, fontWeight: 800,
        fontSize: "clamp(0.95rem, 2.2vw, 1.2rem)", margin: 0, letterSpacing: 0.5,
      }}>
        🔥 One Company. Multiple Services. — We handle everything so you don't have to call multiple companies.
      </p>
    </div>
  );
}

// ── Services ───────────────────────────────────────────────────────
function Services() {
  return (
    <section id="services" style={{ padding: "90px 5%", background: COLORS.lightGray, fontFamily: FONT }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div style={{ color: COLORS.green, fontWeight: 800, letterSpacing: 4, fontSize: 12, marginBottom: 10 }}>WHAT WE OFFER</div>
        <h2 style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)", color: COLORS.darkBlue, fontWeight: 900, margin: 0 }}>Our Services</h2>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
        gap: 24, maxWidth: 1150, margin: "0 auto",
      }}>
        {SERVICES.map((s, i) => (
          <div key={s.title} style={{
            background: COLORS.white, borderRadius: 16, padding: "36px 28px",
            boxShadow: "0 2px 20px rgba(11,31,58,0.07)",
            borderTop: `4px solid ${i % 2 === 0 ? COLORS.darkBlue : COLORS.green}`,
            transition: "transform 0.22s, box-shadow 0.22s", cursor: "default",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-7px)";
              e.currentTarget.style.boxShadow = "0 14px 36px rgba(11,31,58,0.14)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 20px rgba(11,31,58,0.07)";
            }}
          >
            <div style={{ fontSize: 46, marginBottom: 16 }}>{s.icon}</div>
            <h3 style={{ color: COLORS.darkBlue, fontWeight: 800, fontSize: 17, marginBottom: 10 }}>{s.title}</h3>
            <p style={{ color: COLORS.midGray, lineHeight: 1.65, margin: "0 0 20px", fontSize: 14 }}>{s.desc}</p>
            <a href={`mailto:${EMAIL}?subject=Quote Request: ${s.title}&body=Hello, I am interested in your ${s.title} service. Please send me a quote.`}
              style={{ color: COLORS.green, fontWeight: 800, fontSize: 12, letterSpacing: 1, textDecoration: "none" }}>
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
      padding: "90px 5%",
      background: `linear-gradient(135deg, ${COLORS.darkBlue}, #132d52)`,
      fontFamily: FONT,
    }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <div style={{ color: COLORS.green, fontWeight: 800, letterSpacing: 4, fontSize: 12, marginBottom: 10 }}>THE DIFFERENCE</div>
        <h2 style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)", color: COLORS.white, fontWeight: 900, margin: 0 }}>
          Why Choose Moussa's Multi Services?
        </h2>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20, maxWidth: 950, margin: "0 auto",
      }}>
        {WHY_US.map(item => (
          <div key={item} style={{
            display: "flex", alignItems: "center", gap: 16,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 12, padding: "22px 24px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: COLORS.green, display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 18, flexShrink: 0,
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
    <section id="gallery" style={{ padding: "90px 5%", background: COLORS.white, fontFamily: FONT }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <div style={{ color: COLORS.green, fontWeight: 800, letterSpacing: 4, fontSize: 12, marginBottom: 10 }}>PORTFOLIO</div>
        <h2 style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)", color: COLORS.darkBlue, fontWeight: 900, margin: 0 }}>Our Work</h2>
        <p style={{ color: COLORS.midGray, marginTop: 12, fontSize: 15 }}>Before &amp; After — Real results from real jobs</p>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 20, maxWidth: 1100, margin: "0 auto",
      }}>
        {GALLERY.map((g, i) => (
          <div key={g.label} style={{
            background: i % 3 === 0 ? COLORS.lightGray : i % 3 === 1 ? COLORS.accent : "#E8F5E9",
            borderRadius: 16, height: 180,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            fontSize: 52, gap: 12, cursor: "pointer",
            transition: "transform 0.2s", border: "2px solid transparent",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.border = `2px solid ${COLORS.green}`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.border = "2px solid transparent";
            }}
          >
            {g.emoji}
            <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.darkBlue, letterSpacing: 1 }}>{g.label}</span>
          </div>
        ))}
      </div>
      <p style={{ textAlign: "center", color: COLORS.midGray, fontSize: 13, marginTop: 24, fontStyle: "italic" }}>
        💡 Replace placeholders with real photos in production
      </p>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ padding: "90px 5%", background: COLORS.lightGray, fontFamily: FONT }}>
      <div style={{
        maxWidth: 900, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56,
        alignItems: "center",
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.darkBlue}, #1a3a6b)`,
          borderRadius: 20, padding: "60px 40px", textAlign: "center",
          boxShadow: "0 12px 40px rgba(11,31,58,0.2)",
        }}>
          <div style={{ fontSize: 72, marginBottom: 16 }}>✈️🏠</div>
          <div style={{ color: COLORS.white, fontWeight: 900, fontSize: 22, letterSpacing: 2 }}>MOUSSA'S</div>
          <div style={{ color: COLORS.green, fontWeight: 800, fontSize: 13, letterSpacing: 3, marginBottom: 20 }}>MULTI SERVICES</div>
          <div style={{
            background: "rgba(76,175,80,0.15)", borderRadius: 8,
            padding: "10px 16px", color: COLORS.green,
            fontWeight: 700, fontSize: 12, letterSpacing: 2,
          }}>RELIABLE • PROFESSIONAL • TRUSTED</div>
        </div>
        <div>
          <div style={{ color: COLORS.green, fontWeight: 800, letterSpacing: 4, fontSize: 12, marginBottom: 10 }}>WHO WE ARE</div>
          <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", color: COLORS.darkBlue, fontWeight: 900, margin: "0 0 20px" }}>
            About Us
          </h2>
          <p style={{ color: COLORS.midGray, lineHeight: 1.85, fontSize: 15, marginBottom: 28 }}>
            Moussa's Multi Services is committed to delivering dependable and high-quality property and aircraft services throughout Houston. Our mission is to provide professional solutions with integrity, efficiency, and customer satisfaction at the center of everything we do.
          </p>
          <a href={`mailto:${EMAIL}?subject=Free Estimate Request&body=Hello, I would like to request a free estimate.`}
            style={{
              display: "inline-block", background: COLORS.darkBlue, color: COLORS.white,
              padding: "13px 30px", borderRadius: 8, fontWeight: 800,
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

  const handleSend = () => {
    if (!form.name || !form.phone) return;
    // Build mailto link and open it — sends directly to Moussa's email
    const subject = encodeURIComponent(`Free Quote Request — ${form.service || "General"}`);
    const body = encodeURIComponent(
      `Hello Moussa's Multi Services,\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService Needed: ${form.service}\n\nMessage:\n${form.message}\n\nThank you.`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputStyle = {
    width: "100%", padding: "13px 16px", marginBottom: 14,
    border: "2px solid #E2E8F0", borderRadius: 8, fontSize: 14,
    fontFamily: FONT, outline: "none", boxSizing: "border-box",
    color: COLORS.darkBlue, background: COLORS.white,
  };

  return (
    <section id="contact" style={{ padding: "90px 5%", background: COLORS.white, fontFamily: FONT }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div style={{ color: COLORS.green, fontWeight: 800, letterSpacing: 4, fontSize: 12, marginBottom: 10 }}>REACH OUT</div>
        <h2 style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)", color: COLORS.darkBlue, fontWeight: 900, margin: 0 }}>Contact Us</h2>
        <p style={{ color: COLORS.midGray, marginTop: 10, fontSize: 15 }}>Call or text for a free quote — <strong>Houston, Texas</strong></p>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1.4fr",
        gap: 40, maxWidth: 960, margin: "0 auto",
      }}>
        {/* Left — info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            { icon: "📞", label: "Phone / Fax", val: PHONE, big: true, href: "tel:+12813753218" },
            { icon: "✉️", label: "Email Address", val: EMAIL, href: `mailto:${EMAIL}` },
            { icon: "📍", label: "Office Location", val: ADDRESS },
          ].map(({ icon, label, val, big, href }) => (
            <div key={label} style={{
              background: COLORS.lightGray, borderRadius: 14, padding: "22px 24px",
              display: "flex", alignItems: "center", gap: 16,
              borderLeft: `4px solid ${COLORS.green}`,
            }}>
              <div style={{
                width: 50, height: 50, borderRadius: 12, background: "#E8F5E9",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, flexShrink: 0,
              }}>{icon}</div>
              <div>
                <div style={{ color: COLORS.midGray, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>{label.toUpperCase()}</div>
                {href ? (
                  <a href={href} style={{
                    color: COLORS.darkBlue, fontWeight: big ? 900 : 700,
                    fontSize: big ? 20 : 14, textDecoration: "none",
                  }}>{val}</a>
                ) : (
                  <div style={{ color: COLORS.darkBlue, fontWeight: 700, fontSize: 14 }}>{val}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right — form */}
        <div style={{
          background: COLORS.lightGray, borderRadius: 20, padding: "40px 36px",
          boxShadow: "0 4px 28px rgba(11,31,58,0.07)",
        }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 60 }}>✅</div>
              <h3 style={{ color: COLORS.darkBlue, fontWeight: 800 }}>Request Sent!</h3>
              <p style={{ color: COLORS.midGray }}>Your email app opened with all the details. We'll be in touch shortly!</p>
              <button onClick={() => setSent(false)} style={{
                background: COLORS.green, color: COLORS.white, border: "none",
                padding: "10px 24px", borderRadius: 8, fontWeight: 700,
                cursor: "pointer", fontFamily: FONT, marginTop: 10,
              }}>Send Another</button>
            </div>
          ) : (
            <>
              <h3 style={{ color: COLORS.darkBlue, fontWeight: 900, margin: "0 0 24px", fontSize: 20 }}>Request a Free Quote</h3>
              <input style={inputStyle} placeholder="Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input style={inputStyle} placeholder="Phone Number *" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              <input style={inputStyle} placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <select style={{ ...inputStyle, color: form.service ? COLORS.darkBlue : "#999" }}
                value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                <option value="" disabled>Service Needed</option>
                {SERVICES.map(s => <option key={s.title} value={s.title}>{s.icon} {s.title}</option>)}
              </select>
              <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 90 }}
                placeholder="Message (optional)" value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })} />
              <button onClick={handleSend} style={{
                width: "100%", background: COLORS.darkBlue, color: COLORS.white,
                padding: "16px", borderRadius: 8, border: "none",
                fontWeight: 900, fontSize: 15, cursor: "pointer",
                letterSpacing: 1, fontFamily: FONT,
                boxShadow: "0 4px 18px rgba(11,31,58,0.25)",
                transition: "background 0.2s",
                opacity: (!form.name || !form.phone) ? 0.6 : 1,
              }}
                onMouseEnter={e => e.target.style.background = "#0d2a4d"}
                onMouseLeave={e => e.target.style.background = COLORS.darkBlue}
              >SEND REQUEST →</button>
              <p style={{ color: COLORS.midGray, fontSize: 11, textAlign: "center", marginTop: 10 }}>
                * Required fields. This will open your email app with all details pre-filled.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: COLORS.darkBlue, padding: "56px 5% 24px",
      fontFamily: FONT, color: "#7A9ABF",
    }}>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 40, maxWidth: 1100, margin: "0 auto 40px",
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 26 }}>✈️</span>
            <div>
              <div style={{ color: COLORS.white, fontWeight: 900, fontSize: 16, letterSpacing: 2 }}>MOUSSA'S</div>
              <div style={{ color: COLORS.green, fontWeight: 800, fontSize: 10, letterSpacing: 3 }}>MULTI SERVICES</div>
            </div>
          </div>
          <p style={{ lineHeight: 1.75, fontSize: 13 }}>
            Property &amp; Aircraft Services Done Right.<br />
            {ADDRESS}<br />
            📞 {PHONE}<br />
            ✉️ {EMAIL}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <div style={{ color: COLORS.white, fontWeight: 800, marginBottom: 18, letterSpacing: 1, fontSize: 13 }}>QUICK LINKS</div>
          {NAV.map(n => (
            <div key={n} style={{ marginBottom: 10 }}>
              <a href={`#${n.toLowerCase()}`} style={{
                color: "#7A9ABF", textDecoration: "none", fontSize: 14, transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = COLORS.green}
                onMouseLeave={e => e.target.style.color = "#7A9ABF"}
              >{n}</a>
            </div>
          ))}
        </div>

        {/* Services */}
        <div>
          <div style={{ color: COLORS.white, fontWeight: 800, marginBottom: 18, letterSpacing: 1, fontSize: 13 }}>SERVICES</div>
          {SERVICES.map(s => (
            <div key={s.title} style={{ fontSize: 13, marginBottom: 8 }}>{s.icon} {s.title}</div>
          ))}
        </div>

        {/* Social */}
        <div>
          <div style={{ color: COLORS.white, fontWeight: 800, marginBottom: 18, letterSpacing: 1, fontSize: 13 }}>FOLLOW US</div>
          <div style={{ display: "flex", gap: 14 }}>
            <a href="https://www.facebook.com/share/18m8w2nN1P/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{
              width: 46, height: 46, borderRadius: 12, background: "#1877F2",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", textDecoration: "none", transition: "transform 0.2s, opacity 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.opacity = "1"; }}
              title="Facebook"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.273h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
            </a>
            <a href="#" style={{
              width: 46, height: 46, borderRadius: 12,
              background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", textDecoration: "none", transition: "transform 0.2s, opacity 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.opacity = "1"; }}
              title="Instagram"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" style={{
              width: 46, height: 46, borderRadius: 12, background: "#010101",
              border: "1px solid rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", textDecoration: "none", transition: "transform 0.2s, opacity 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.opacity = "1"; }}
              title="TikTok"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24,
        textAlign: "center", fontSize: 12,
      }}>
        © 2026 Moussa's Multi Services. All rights reserved. &nbsp;•&nbsp; moussaservices.com
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