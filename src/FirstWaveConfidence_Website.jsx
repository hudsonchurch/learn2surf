import React, { useState, useEffect, useRef } from "react";

/*
  FIRST WAVE CONFIDENCE — San Diego Beginner Surf Lessons
  Full sales page / landing page following PRD Section 6.3
  
  Design: "Coastal Luxury Calm" — warm, premium, inviting.
  Think high-end wellness retreat meets surf culture.
  Makes a nervous adult feel SAFE, not like entering a frat party.
  
  Copy: Gary Halbert direct-response style — conversational, emotional,
  specific, story-driven. Voice of Customer language throughout.
  Belief installation mapped to each section per PRD.
*/

// ─── PALETTE ───
const P = {
  cream: "#FDF8F0",
  sand: "#F5EDE0",
  sandDark: "#EBE0CC",
  warmWhite: "#FFFDF9",
  navy: "#0F2B3C",
  navyLight: "#1A3D52",
  ocean: "#1B7FA3",
  oceanLight: "#2A9AC4",
  oceanPale: "#E8F4F8",
  seafoam: "#5FBFA0",
  seafoamPale: "#E6F5F0",
  coral: "#E8735A",
  coralPale: "#FEF0EC",
  gold: "#D4A843",
  goldPale: "#FBF5E6",
  text: "#1A1A1A",
  textMid: "#4A4A4A",
  textLight: "#7A7A7A",
  white: "#FFFFFF",
  divider: "#E8E0D4",
};

// ─── STYLES ───
const fontStack = "'Playfair Display','Georgia','Times New Roman',serif";
const bodyStack = "'DM Sans','Helvetica Neue','Helvetica',sans-serif";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap');
  
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  
  .fwc-fade-in {
    opacity: 0;
    transform: translateY(24px);
    animation: fwcFadeUp 0.7s ease forwards;
  }
  @keyframes fwcFadeUp {
    to { opacity: 1; transform: translateY(0); }
  }
  .fwc-wave {
    animation: fwcWaveBob 6s ease-in-out infinite;
  }
  @keyframes fwcWaveBob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  .fwc-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 18px 40px; border-radius: 50px; border: none;
    font-family: ${bodyStack}; font-size: 17px; font-weight: 700;
    cursor: pointer; transition: all 0.3s ease;
    letter-spacing: 0.3px; text-decoration: none;
  }
  .fwc-btn-primary {
    background: ${P.ocean}; color: ${P.white};
    box-shadow: 0 4px 20px rgba(27,127,163,0.35);
  }
  .fwc-btn-primary:hover {
    background: ${P.oceanLight}; transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(27,127,163,0.4);
  }
  .fwc-btn-outline {
    background: transparent; color: ${P.ocean};
    border: 2px solid ${P.ocean};
  }
  .fwc-btn-outline:hover {
    background: ${P.oceanPale}; transform: translateY(-1px);
  }
  .fwc-section { padding: 80px 20px; max-width: 860px; margin: 0 auto; }
  @media (max-width: 640px) {
    .fwc-section { padding: 50px 16px; }
  }
  .fwc-quote {
    position: relative; padding-left: 24px;
    border-left: 3px solid ${P.ocean};
    font-style: italic; color: ${P.textMid};
  }
`;

// ─── NAV ───
function Nav({ onBook }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      padding: scrolled ? "12px 20px" : "18px 20px",
      background: scrolled ? "rgba(253,248,240,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${P.divider}` : "none",
      transition: "all 0.35s ease",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <div style={{
        fontFamily: fontStack, fontSize: 20, fontWeight: 700,
        color: scrolled ? P.navy : P.white,
        letterSpacing: -0.5, transition: "color 0.35s",
      }}>
        Learn2Surf<span style={{ color: P.ocean }}> San Diego</span>
      </div>
      <button onClick={onBook} className="fwc-btn fwc-btn-primary"
        style={{ padding: "10px 24px", fontSize: 14 }}>
        Book Your Lesson
      </button>
    </nav>
  );
}

// ─── HERO ───
function Hero({ onBook }) {
  return (
    <section style={{
      position: "relative", minHeight: "100vh",
      background: `linear-gradient(180deg, ${P.navy} 0%, ${P.navyLight} 50%, ${P.ocean} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", padding: "100px 20px 60px",
    }}>
      {/* Decorative wave shapes */}
      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, overflow: "hidden", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 120" fill="none" style={{ width: "100%", display: "block" }}>
          <path d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0Z" fill={P.cream} />
        </svg>
      </div>
      {/* Floating decorative circles */}
      <div className="fwc-wave" style={{
        position: "absolute", top: "15%", right: "8%", width: 120, height: 120,
        borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)",
      }} />
      <div className="fwc-wave" style={{
        position: "absolute", bottom: "25%", left: "5%", width: 80, height: 80,
        borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)",
        animationDelay: "2s",
      }} />

      <div className="fwc-fade-in" style={{ textAlign: "center", maxWidth: 720, position: "relative", zIndex: 2 }}>
        {/* Social proof pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.12)", borderRadius: 50,
          padding: "8px 20px", marginBottom: 28, backdropFilter: "blur(8px)",
        }}>
          <span style={{ fontSize: 14 }}>⭐⭐⭐⭐⭐</span>
          <span style={{ fontFamily: bodyStack, fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
            Rated 4.9 by 500+ first-timers
          </span>
        </div>

        <h1 style={{
          fontFamily: fontStack, fontSize: "clamp(36px, 7vw, 62px)",
          fontWeight: 700, color: P.white, lineHeight: 1.1,
          letterSpacing: -1, marginBottom: 24,
        }}>
          Stand Up on Your First
          <br />
          <span style={{ fontStyle: "italic", color: P.gold }}>Surf Lesson</span>
          <br />
          <span style={{ fontSize: "0.55em", fontWeight: 400, letterSpacing: 0 }}>
            — even if you've never touched a board before
          </span>
        </h1>

        <p style={{
          fontFamily: bodyStack, fontSize: "clamp(16px, 2.5vw, 20px)",
          color: "rgba(255,255,255,0.8)", lineHeight: 1.6,
          maxWidth: 560, margin: "0 auto 36px",
        }}>
          San Diego's zero-intimidation surf lesson. Patient coaching, small groups,
          and a beginner-first method that helps nervous first-timers feel safe,
          have fun, and catch a real wave.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onBook} className="fwc-btn fwc-btn-primary" style={{ fontSize: 18 }}>
            Book Your First Wave →
          </button>
        </div>

        <p style={{
          fontFamily: bodyStack, fontSize: 13, color: "rgba(255,255,255,0.5)",
          marginTop: 20,
        }}>
          All gear included · No experience needed · First Wave Promise guarantee
        </p>
      </div>
    </section>
  );
}

// ─── SOCIAL PROOF BAR ───
function ProofBar() {
  const items = [
    { num: "500+", label: "First-timers taught" },
    { num: "94%", label: "Stand up on lesson one" },
    { num: "4.9★", label: "Average review rating" },
    { num: "1:4", label: "Max instructor ratio" },
  ];
  return (
    <section style={{ background: P.cream, padding: "40px 20px" }}>
      <div style={{
        maxWidth: 860, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8,
      }}>
        {items.map((it, i) => (
          <div key={i} style={{ textAlign: "center", padding: "12px 4px" }}>
            <div style={{ fontFamily: fontStack, fontSize: 28, fontWeight: 700, color: P.ocean }}>
              {it.num}
            </div>
            <div style={{ fontFamily: bodyStack, fontSize: 12, color: P.textLight, fontWeight: 500, marginTop: 4 }}>
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PAIN / PROBLEM ───
function PainSection() {
  return (
    <section style={{ background: P.cream }}>
      <div className="fwc-section">
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
          <p style={{
            fontFamily: bodyStack, fontSize: 14, fontWeight: 700,
            color: P.ocean, textTransform: "uppercase", letterSpacing: 2,
            marginBottom: 16,
          }}>
            Let's be honest
          </p>
          <h2 style={{
            fontFamily: fontStack, fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 700, color: P.navy, lineHeight: 1.15, marginBottom: 28,
          }}>
            You've wanted to try surfing<br />
            <span style={{ fontStyle: "italic", color: P.ocean }}>for years.</span>
          </h2>
          <p style={{
            fontFamily: bodyStack, fontSize: 18, color: P.textMid,
            lineHeight: 1.7, marginBottom: 24,
          }}>
            It's on your bucket list. You've watched the videos. You've imagined
            yourself out there catching a wave in San Diego with the sun on your face.
          </p>
          <p style={{
            fontFamily: bodyStack, fontSize: 18, color: P.textMid,
            lineHeight: 1.7, marginBottom: 32,
          }}>
            But every time you get close to actually booking a lesson,
            something stops you. And if you're being honest with yourself,
            you know exactly what it is.
          </p>
        </div>

        {/* Fear cards */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16, maxWidth: 720, margin: "0 auto 40px",
        }}>
          {[
            { q: "What if I can't stand up at all and just look ridiculous?", icon: "😰" },
            { q: "What if the instructor has a surf-bro attitude and I feel judged?", icon: "😬" },
            { q: "What if it's just a crowded tourist trap and nobody actually pays attention to me?", icon: "😤" },
          ].map((f, i) => (
            <div key={i} style={{
              background: P.white, borderRadius: 16, padding: 24,
              border: `1px solid ${P.divider}`,
            }}>
              <span style={{ fontSize: 28 }}>{f.icon}</span>
              <p style={{
                fontFamily: bodyStack, fontSize: 15, color: P.textMid,
                lineHeight: 1.5, marginTop: 12, fontStyle: "italic",
              }}>
                "{f.q}"
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <p style={{
            fontFamily: fontStack, fontSize: 26, fontWeight: 600,
            color: P.navy, lineHeight: 1.4, marginBottom: 16,
          }}>
            If any of that sounds familiar —<br />
            <span style={{ color: P.ocean, fontStyle: "italic" }}>you're in exactly the right place.</span>
          </p>
          <p style={{
            fontFamily: bodyStack, fontSize: 17, color: P.textMid,
            lineHeight: 1.65,
          }}>
            Those fears are completely normal. In fact, most of our students
            felt the exact same way before their first lesson. The difference?
            They chose a lesson that was actually <em>designed</em> for people like you.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── THE INTIMIDATION GAP (UMP) ───
function IntimidationGap() {
  return (
    <section style={{ background: P.warmWhite }}>
      <div className="fwc-section">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{
            fontFamily: bodyStack, fontSize: 13, fontWeight: 700,
            color: P.coral, textTransform: "uppercase", letterSpacing: 2,
            marginBottom: 14,
          }}>
            Here's why most first-timers fail
          </p>
          <h2 style={{
            fontFamily: fontStack, fontSize: "clamp(26px, 5vw, 38px)",
            fontWeight: 700, color: P.navy, lineHeight: 1.15, marginBottom: 20,
          }}>
            It's called <span style={{ fontStyle: "italic", color: P.coral }}>the Intimidation Gap</span>
          </h2>
        </div>

        <div style={{
          background: P.coralPale, borderRadius: 20, padding: "36px 32px",
          maxWidth: 680, margin: "0 auto 36px",
          border: `1px solid rgba(232,115,90,0.15)`,
        }}>
          <p style={{
            fontFamily: bodyStack, fontSize: 17, color: P.textMid,
            lineHeight: 1.7,
          }}>
            Most surf schools throw beginners into <strong>generic, crowded lessons</strong> before
            they feel calm, oriented, or emotionally safe.
          </p>
          <p style={{
            fontFamily: bodyStack, fontSize: 17, color: P.textMid,
            lineHeight: 1.7, marginTop: 16,
          }}>
            The instructor is splitting attention six ways. You're confused about where to stand on
            the board. Someone's surfboard just hit you in the ankle. And now you're supposed to
            "just relax and have fun."
          </p>
          <p style={{
            fontFamily: fontStack, fontSize: 22, fontWeight: 600,
            color: P.coral, marginTop: 20, lineHeight: 1.35,
          }}>
            Once fear spikes, technique collapses.
            And you leave thinking surfing "just isn't for you."
          </p>
        </div>

        <p style={{
          fontFamily: bodyStack, fontSize: 17, color: P.textMid,
          lineHeight: 1.7, textAlign: "center", maxWidth: 600, margin: "0 auto",
        }}>
          But here's the thing — it was never about your talent, your age, or your
          fitness level. It was about the <em>lesson</em>. And we built ours
          to close that gap entirely.
        </p>
      </div>
    </section>
  );
}

// ─── THE METHOD (UMS) ───
function MethodSection() {
  return (
    <section style={{ background: P.navy, color: P.white, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -1, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" fill="none" style={{ width: "100%", display: "block" }}>
          <path d="M0 60L1440 0V60H0Z" fill={P.warmWhite} />
        </svg>
      </div>
      <div className="fwc-section" style={{ paddingTop: 100 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{
            fontFamily: bodyStack, fontSize: 13, fontWeight: 700,
            color: P.gold, textTransform: "uppercase", letterSpacing: 2,
            marginBottom: 14,
          }}>
            Our approach
          </p>
          <h2 style={{
            fontFamily: fontStack, fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 700, lineHeight: 1.15, marginBottom: 20,
          }}>
            The First Wave<br />
            <span style={{ fontStyle: "italic", color: P.gold }}>Confidence Method</span>
          </h2>
          <p style={{
            fontFamily: bodyStack, fontSize: 17,
            color: "rgba(255,255,255,0.7)", maxWidth: 560, margin: "0 auto",
            lineHeight: 1.6,
          }}>
            A beginner-first lesson structure that puts your confidence
            before technique — because you can't learn if you don't feel safe first.
          </p>
        </div>

        {/* Steps */}
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          {[
            {
              step: "01", title: "Calm Beach Coaching",
              desc: "Before you touch the water, your coach walks you through everything on the sand. Simple pop-up cues. Board positioning. What waves look like. No rush, no pressure, no jargon.",
              icon: "🏖️",
            },
            {
              step: "02", title: "Confidence-First Setup",
              desc: "We start in knee-deep water. Your coach is right beside you. You practice the pop-up where you can literally stand up and reset. It's designed to build muscle memory before the waves.",
              icon: "🤝",
            },
            {
              step: "03", title: "Guided Wave Selection",
              desc: "Your coach picks the right wave for you — not too big, not too small. They position your board, give you the signal, and stay close enough to guide you through every attempt.",
              icon: "🌊",
            },
            {
              step: "04", title: "Your First Real Wave",
              desc: "This is the moment. Your coach pushes you in at exactly the right time. The wave catches you. You pop up. And you feel something you'll never forget.",
              icon: "🏄",
            },
          ].map((s, i) => (
            <div key={i} style={{
              display: "flex", gap: 24, marginBottom: 36,
              alignItems: "flex-start",
            }}>
              <div style={{
                minWidth: 56, height: 56, borderRadius: 16,
                background: "rgba(212,168,67,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28,
              }}>
                {s.icon}
              </div>
              <div>
                <div style={{
                  fontFamily: bodyStack, fontSize: 12, fontWeight: 700,
                  color: P.gold, letterSpacing: 1, marginBottom: 6,
                }}>
                  STEP {s.step}
                </div>
                <h3 style={{
                  fontFamily: fontStack, fontSize: 22, fontWeight: 600,
                  marginBottom: 8, lineHeight: 1.2,
                }}>
                  {s.title}
                </h3>
                <p style={{
                  fontFamily: bodyStack, fontSize: 15,
                  color: "rgba(255,255,255,0.65)", lineHeight: 1.6,
                }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" fill="none" style={{ width: "100%", display: "block" }}>
          <path d="M0 0L1440 60V0H0Z" fill={P.cream} />
        </svg>
      </div>
    </section>
  );
}

// ─── MEET YOUR COACH ───
function CoachSection() {
  return (
    <section style={{ background: P.cream }}>
      <div className="fwc-section">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{
            fontFamily: bodyStack, fontSize: 13, fontWeight: 700,
            color: P.ocean, textTransform: "uppercase", letterSpacing: 2,
            marginBottom: 14,
          }}>
            Your instructor
          </p>
          <h2 style={{
            fontFamily: fontStack, fontSize: "clamp(28px, 5vw, 38px)",
            fontWeight: 700, color: P.navy, lineHeight: 1.15,
          }}>
            Not a surf bro.<br />
            <span style={{ fontStyle: "italic", color: P.ocean }}>A patient coach.</span>
          </h2>
        </div>

        <div style={{
          background: P.white, borderRadius: 24, overflow: "hidden",
          border: `1px solid ${P.divider}`, maxWidth: 640, margin: "0 auto",
        }}>
          <div style={{
            background: `linear-gradient(135deg, ${P.oceanPale}, ${P.seafoamPale})`,
            padding: "48px 32px", textAlign: "center",
          }}>
            <div style={{
              width: 100, height: 100, borderRadius: "50%",
              background: P.ocean, margin: "0 auto 16px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 44, color: P.white, fontFamily: fontStack, fontWeight: 700,
              boxShadow: `0 4px 24px rgba(27,127,163,0.3)`,
            }}>
              🤙
            </div>
            <h3 style={{ fontFamily: fontStack, fontSize: 24, fontWeight: 700, color: P.navy }}>
              Your Calm Local Coach
            </h3>
            <p style={{ fontFamily: bodyStack, fontSize: 14, color: P.textLight, marginTop: 4 }}>
              Certified · CPR/Lifeguard Trained · 10+ Years in San Diego
            </p>
          </div>
          <div style={{ padding: "28px 32px" }}>
            {[
              { trait: "Patient", desc: "Will never rush you. Every student learns at their own pace." },
              { trait: "Calm", desc: "Explains the ocean simply. No jargon, no attitude, no ego." },
              { trait: "Close", desc: "Stays in the water right beside you on every wave attempt." },
              { trait: "Encouraging", desc: "Celebrates your effort, not just the stand-up. Progress is the win." },
            ].map((t, i) => (
              <div key={i} style={{
                display: "flex", gap: 14, padding: "14px 0",
                borderBottom: i < 3 ? `1px solid ${P.divider}` : "none",
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: 4,
                  background: P.seafoam, marginTop: 7, flexShrink: 0,
                }} />
                <div>
                  <span style={{ fontFamily: bodyStack, fontSize: 15, fontWeight: 700, color: P.navy }}>
                    {t.trait}.
                  </span>{" "}
                  <span style={{ fontFamily: bodyStack, fontSize: 15, color: P.textMid }}>
                    {t.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ───
function Testimonials() {
  const reviews = [
    {
      name: "Sarah M.", tag: "First-timer, age 42", stars: 5,
      text: "I was SO nervous. I almost cancelled twice. But from the moment we met on the beach, I felt completely at ease. And then I actually stood up! My husband got a photo of me grinning like a kid. Best part of our entire San Diego trip.",
      objection: "Overcomes: fear of embarrassment",
    },
    {
      name: "David & Jenny K.", tag: "Couple, first time", stars: 5,
      text: "We are NOT athletic people. Like, at all. But our instructor was so patient and made it feel like there was zero pressure. Jenny stood up on her third try. I took a few more. But we both left absolutely stoked.",
      objection: "Overcomes: not athletic enough",
    },
    {
      name: "Marcus T.", tag: "Solo traveler, age 55", stars: 5,
      text: "I figured I was too old for this. I almost just did a whale watching tour instead. But this was the best decision I made on my whole trip. The instructor made me feel like I belonged out there. Caught three waves.",
      objection: "Overcomes: too old",
    },
    {
      name: "Lauren B.", tag: "Bachelorette group of 6", stars: 5,
      text: "We booked this for my best friend's bachelorette. Half our group was terrified of the ocean. Every single one of us stood up at least once. The photos are UNREAL. Worth every single penny.",
      objection: "Overcomes: worth the money",
    },
  ];
  return (
    <section style={{ background: P.warmWhite }}>
      <div className="fwc-section">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{
            fontFamily: bodyStack, fontSize: 13, fontWeight: 700,
            color: P.seafoam, textTransform: "uppercase", letterSpacing: 2,
            marginBottom: 14,
          }}>
            Real stories from real first-timers
          </p>
          <h2 style={{
            fontFamily: fontStack, fontSize: "clamp(28px, 5vw, 38px)",
            fontWeight: 700, color: P.navy, lineHeight: 1.15,
          }}>
            They were nervous too.<br />
            <span style={{ fontStyle: "italic", color: P.seafoam }}>Here's what happened.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {reviews.map((r, i) => (
            <div key={i} style={{
              background: P.white, borderRadius: 20, padding: 28,
              border: `1px solid ${P.divider}`,
              display: "flex", flexDirection: "column",
            }}>
              <div style={{ fontSize: 16, marginBottom: 12 }}>{"⭐".repeat(r.stars)}</div>
              <p style={{
                fontFamily: bodyStack, fontSize: 15, color: P.textMid,
                lineHeight: 1.6, flex: 1, marginBottom: 16,
              }}>
                "{r.text}"
              </p>
              <div style={{ borderTop: `1px solid ${P.divider}`, paddingTop: 14 }}>
                <div style={{ fontFamily: bodyStack, fontSize: 14, fontWeight: 700, color: P.navy }}>
                  {r.name}
                </div>
                <div style={{ fontFamily: bodyStack, fontSize: 12, color: P.textLight }}>
                  {r.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PACKAGES ───
function Packages({ onBook }) {
  const pkgs = [
    {
      name: "First Wave Group", sub: "The Perfect Start",
      price: "$89", unit: "per person",
      details: ["4–6 students per instructor", "2-hour session", "All gear included", "Beach coaching + water time", "Best for: friends, families, budget-friendly intro"],
      popular: false, color: P.ocean,
    },
    {
      name: "First Wave Private", sub: "Most Popular",
      price: "$179", unit: "per session",
      details: ["1-on-1 with your coach", "90-minute session", "All gear included", "Maximum personal attention", "Best for: nervous beginners who want close coaching"],
      popular: true, color: P.ocean,
    },
    {
      name: "Ultimate VIP", sub: "The Full Experience",
      price: "$279", unit: "per session",
      details: ["1-on-1 private lesson", "Professional photos & video", "Branded rash guard to keep", "Post-lesson highlights reel", "Best for: bucket-list experience, gifts, celebrations"],
      popular: false, color: P.gold,
    },
  ];
  return (
    <section style={{ background: P.cream }}>
      <div className="fwc-section">
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <p style={{
            fontFamily: bodyStack, fontSize: 13, fontWeight: 700,
            color: P.ocean, textTransform: "uppercase", letterSpacing: 2,
            marginBottom: 14,
          }}>
            Choose your lesson
          </p>
          <h2 style={{
            fontFamily: fontStack, fontSize: "clamp(28px, 5vw, 38px)",
            fontWeight: 700, color: P.navy, lineHeight: 1.15,
          }}>
            Three ways to catch<br />
            <span style={{ fontStyle: "italic", color: P.ocean }}>your first wave</span>
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 16, alignItems: "start",
        }}>
          {pkgs.map((p, i) => (
            <div key={i} style={{
              background: P.white, borderRadius: 24, overflow: "hidden",
              border: p.popular ? `2px solid ${P.ocean}` : `1px solid ${P.divider}`,
              position: "relative",
              transform: p.popular ? "scale(1.03)" : "none",
              boxShadow: p.popular ? "0 8px 40px rgba(27,127,163,0.15)" : "none",
            }}>
              {p.popular && (
                <div style={{
                  background: P.ocean, color: P.white,
                  textAlign: "center", padding: "8px 0",
                  fontFamily: bodyStack, fontSize: 12, fontWeight: 700,
                  letterSpacing: 1, textTransform: "uppercase",
                }}>
                  Most Popular
                </div>
              )}
              <div style={{ padding: 28 }}>
                <h3 style={{ fontFamily: fontStack, fontSize: 22, fontWeight: 700, color: P.navy, marginBottom: 4 }}>
                  {p.name}
                </h3>
                <p style={{ fontFamily: bodyStack, fontSize: 13, color: P.textLight, marginBottom: 20 }}>
                  {p.sub}
                </p>
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontFamily: fontStack, fontSize: 40, fontWeight: 800, color: p.color }}>
                    {p.price}
                  </span>
                  <span style={{ fontFamily: bodyStack, fontSize: 14, color: P.textLight, marginLeft: 4 }}>
                    {p.unit}
                  </span>
                </div>
                {p.details.map((d, di) => (
                  <div key={di} style={{
                    display: "flex", gap: 10, marginBottom: 10,
                    fontFamily: bodyStack, fontSize: 14, color: P.textMid,
                  }}>
                    <span style={{ color: P.seafoam, fontWeight: 700 }}>✓</span>
                    {d}
                  </div>
                ))}
                <button
                  onClick={onBook}
                  className={`fwc-btn ${p.popular ? "fwc-btn-primary" : "fwc-btn-outline"}`}
                  style={{ width: "100%", marginTop: 20 }}
                >
                  Book This Lesson
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order bump teaser */}
        <div style={{
          textAlign: "center", marginTop: 36, padding: "24px 20px",
          background: P.goldPale, borderRadius: 16,
          border: `1px solid rgba(212,168,67,0.2)`,
        }}>
          <p style={{ fontFamily: bodyStack, fontSize: 14, color: P.textMid }}>
            <strong style={{ color: P.gold }}>📸 Add pro photos for just $39</strong> — capture the moment you catch your first wave.
            Available at checkout.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ───
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    {
      q: "I'm not athletic at all. Can I really do this?",
      a: "Absolutely. Most of our students would describe themselves the same way. Our method is designed for complete beginners — we start on the sand, move to shallow water, and progress at your pace. You don't need to be strong, fit, or coordinated. You just need to show up.",
    },
    {
      q: "What if I can't stand up?",
      a: "Here's our honest answer: 94% of our students stand up at least once. But even if you're in the other 6%, you're still going to have an incredible time. The real win isn't perfection — it's the feeling of being out there, catching a wave, and leaving the beach with a story and a smile. That's what our guarantee is about.",
    },
    {
      q: "How big are the groups? Will I get ignored?",
      a: "Our group lessons max out at 4–6 students per instructor. Our private lessons are 1-on-1. Either way, your coach stays in the water right beside you. You will not be left alone out there.",
    },
    {
      q: "I'm worried about the ocean. Is it safe?",
      a: "Completely valid concern. We choose beginner-friendly beaches with manageable waves. All our coaches are CPR/lifeguard certified. We start in knee-deep water and only move deeper when you feel ready. Your comfort level sets the pace.",
    },
    {
      q: "What do I need to bring?",
      a: "Just yourself and a swimsuit. We provide the wetsuit, the board, and all the coaching. We'll send you a full \"what to expect\" email after you book so there are zero surprises.",
    },
    {
      q: "I'm in my 40s / 50s / 60s. Am I too old for this?",
      a: "Not even close. We've taught students from 12 to 68. One of our favorite testimonials is from a 55-year-old who almost did a whale watching tour instead. He caught three waves and called it the best decision of his trip.",
    },
    {
      q: "Is this just a tourist trap?",
      a: "We get why you'd worry about that. Check our Google reviews — 4.9 stars from 500+ real students, most of them first-timers. We're a locally owned, instructor-led operation. No cattle-call groups. No bait-and-switch. Just patient coaching on the beach.",
    },
    {
      q: "What's your cancellation policy?",
      a: "Full refund if you cancel 24+ hours in advance. If conditions aren't safe for beginners on your day, we'll reschedule at no charge. Your First Wave Promise guarantee also means that if you don't feel safe and supported during your lesson, we make it right.",
    },
  ];
  return (
    <section style={{ background: P.warmWhite }}>
      <div className="fwc-section">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{
            fontFamily: bodyStack, fontSize: 13, fontWeight: 700,
            color: P.ocean, textTransform: "uppercase", letterSpacing: 2,
            marginBottom: 14,
          }}>
            Questions?
          </p>
          <h2 style={{
            fontFamily: fontStack, fontSize: "clamp(28px, 5vw, 38px)",
            fontWeight: 700, color: P.navy, lineHeight: 1.15,
          }}>
            Everything you want to know<br />
            <span style={{ fontStyle: "italic", color: P.ocean }}>(but were afraid to ask)</span>
          </h2>
        </div>

        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {faqs.map((f, i) => (
            <div key={i} style={{
              borderBottom: `1px solid ${P.divider}`,
              cursor: "pointer",
            }} onClick={() => setOpen(open === i ? null : i)}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "20px 0", gap: 16,
              }}>
                <h3 style={{
                  fontFamily: bodyStack, fontSize: 16, fontWeight: 600,
                  color: P.navy, lineHeight: 1.35,
                }}>
                  {f.q}
                </h3>
                <span style={{
                  fontSize: 22, color: P.ocean, fontWeight: 300,
                  transition: "transform 0.3s",
                  transform: open === i ? "rotate(45deg)" : "none",
                  flexShrink: 0,
                }}>
                  +
                </span>
              </div>
              <div style={{
                maxHeight: open === i ? 300 : 0,
                overflow: "hidden",
                transition: "max-height 0.4s ease",
              }}>
                <p style={{
                  fontFamily: bodyStack, fontSize: 15, color: P.textMid,
                  lineHeight: 1.65, paddingBottom: 20,
                }}>
                  {f.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GUARANTEE ───
function Guarantee() {
  return (
    <section style={{ background: P.cream }}>
      <div className="fwc-section">
        <div style={{
          background: `linear-gradient(135deg, ${P.seafoamPale}, ${P.oceanPale})`,
          borderRadius: 28, padding: "48px 36px", textAlign: "center",
          border: `1px solid rgba(95,191,160,0.2)`,
          maxWidth: 640, margin: "0 auto",
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: P.white, margin: "0 auto 20px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 32, boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          }}>
            🛡️
          </div>
          <h2 style={{
            fontFamily: fontStack, fontSize: 30, fontWeight: 700,
            color: P.navy, marginBottom: 16, lineHeight: 1.2,
          }}>
            The First Wave Promise
          </h2>
          <p style={{
            fontFamily: bodyStack, fontSize: 17, color: P.textMid,
            lineHeight: 1.65, maxWidth: 480, margin: "0 auto",
          }}>
            If you don't feel <strong>safe, supported, and stoked</strong> by
            the end of your lesson, we'll make it right — guaranteed.
          </p>
          <p style={{
            fontFamily: bodyStack, fontSize: 14, color: P.textLight,
            lineHeight: 1.55, maxWidth: 440, margin: "16px auto 0",
          }}>
            This isn't a "stand up or your money back" gimmick. That kind of pressure
            is the opposite of what beginners need. This is our promise that your
            emotional experience — feeling safe, feeling supported, feeling like you
            belong out there — is our #1 priority.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ───
function FinalCTA({ onBook }) {
  return (
    <section style={{
      background: `linear-gradient(180deg, ${P.navy} 0%, ${P.navyLight} 60%, ${P.ocean} 100%)`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -1, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" fill="none" style={{ width: "100%", display: "block" }}>
          <path d="M0 60L1440 0V60H0Z" fill={P.cream} />
        </svg>
      </div>
      <div className="fwc-section" style={{ textAlign: "center", paddingTop: 100, paddingBottom: 80 }}>
        <h2 style={{
          fontFamily: fontStack, fontSize: "clamp(30px, 6vw, 48px)",
          fontWeight: 700, color: P.white, lineHeight: 1.1, marginBottom: 20,
        }}>
          Your first wave is<br />
          <span style={{ fontStyle: "italic", color: P.gold }}>waiting for you.</span>
        </h2>
        <p style={{
          fontFamily: bodyStack, fontSize: 18,
          color: "rgba(255,255,255,0.75)",
          lineHeight: 1.65, maxWidth: 520, margin: "0 auto 36px",
        }}>
          Spots are limited to keep groups small and coaching personal.
          Pick your date, choose your lesson, and we'll take care of the rest.
        </p>
        <button onClick={onBook} className="fwc-btn fwc-btn-primary"
          style={{ fontSize: 18, padding: "20px 48px", background: P.gold, boxShadow: `0 4px 24px rgba(212,168,67,0.4)` }}>
          Book Your Lesson Now →
        </button>
        <div style={{
          display: "flex", gap: 20, justifyContent: "center",
          marginTop: 28, flexWrap: "wrap",
        }}>
          {["All gear included", "No experience needed", "First Wave Promise™"].map((t, i) => (
            <span key={i} style={{
              fontFamily: bodyStack, fontSize: 13,
              color: "rgba(255,255,255,0.5)",
            }}>
              ✓ {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer style={{
      background: P.navy, padding: "40px 20px 28px",
      textAlign: "center",
    }}>
      <div style={{
        fontFamily: fontStack, fontSize: 20, fontWeight: 700,
        color: P.white, letterSpacing: -0.5, marginBottom: 12,
      }}>
        Learn2Surf<span style={{ color: P.ocean }}> San Diego</span>
      </div>
      <p style={{
        fontFamily: bodyStack, fontSize: 13,
        color: "rgba(255,255,255,0.4)", lineHeight: 1.5,
        maxWidth: 400, margin: "0 auto 20px",
      }}>
        San Diego's zero-intimidation beginner surf lesson.
        Locally owned and operated.
      </p>
      <div style={{
        display: "flex", gap: 24, justifyContent: "center",
        marginBottom: 20,
      }}>
        {["Instagram", "TikTok", "Google Reviews"].map((l, i) => (
          <a key={i} href="#" style={{
            fontFamily: bodyStack, fontSize: 13, fontWeight: 600,
            color: "rgba(255,255,255,0.5)", textDecoration: "none",
          }}>
            {l}
          </a>
        ))}
      </div>
      <p style={{
        fontFamily: bodyStack, fontSize: 11,
        color: "rgba(255,255,255,0.25)",
      }}>
        © 2026 Learn2Surf San Diego. San Diego, CA.
      </p>
    </footer>
  );
}

// ─── BOOKING MODAL ───
function BookingModal({ onClose }) {
  const [selected, setSelected] = useState("private");
  const options = [
    { id: "group", name: "Group Lesson", price: "$89/person", sub: "4-6 students" },
    { id: "private", name: "Private Lesson", price: "$179", sub: "1-on-1 coaching" },
    { id: "vip", name: "Ultimate VIP", price: "$279", sub: "Private + photos + gear" },
  ];
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(15,43,60,0.6)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: P.white, borderRadius: 28, padding: 36,
        maxWidth: 440, width: "100%", maxHeight: "85vh", overflowY: "auto",
        boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h3 style={{ fontFamily: fontStack, fontSize: 24, fontWeight: 700, color: P.navy }}>
            Book Your Lesson
          </h3>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: 24,
            color: P.textLight, cursor: "pointer",
          }}>×</button>
        </div>

        {options.map(o => (
          <div key={o.id} onClick={() => setSelected(o.id)} style={{
            padding: 18, borderRadius: 14, marginBottom: 10, cursor: "pointer",
            border: selected === o.id ? `2px solid ${P.ocean}` : `1px solid ${P.divider}`,
            background: selected === o.id ? P.oceanPale : P.white,
            transition: "all 0.2s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: bodyStack, fontSize: 16, fontWeight: 700, color: P.navy }}>
                  {o.name}
                </div>
                <div style={{ fontFamily: bodyStack, fontSize: 13, color: P.textLight }}>{o.sub}</div>
              </div>
              <div style={{ fontFamily: fontStack, fontSize: 22, fontWeight: 700, color: P.ocean }}>{o.price}</div>
            </div>
          </div>
        ))}

        {/* Order bump */}
        <div style={{
          padding: 16, borderRadius: 14, marginTop: 8, marginBottom: 20,
          background: P.goldPale, border: `1px solid rgba(212,168,67,0.2)`,
        }}>
          <label style={{ display: "flex", gap: 12, cursor: "pointer", alignItems: "flex-start" }}>
            <input type="checkbox" style={{ marginTop: 3, accentColor: P.gold }} />
            <div>
              <div style={{ fontFamily: bodyStack, fontSize: 14, fontWeight: 700, color: P.navy }}>
                📸 Add Pro Photos +$39
              </div>
              <div style={{ fontFamily: bodyStack, fontSize: 12, color: P.textLight }}>
                Professional photos of your lesson delivered same day
              </div>
            </div>
          </label>
        </div>

        <button className="fwc-btn fwc-btn-primary" style={{ width: "100%", fontSize: 17 }}>
          Continue to Scheduling →
        </button>
        <p style={{
          fontFamily: bodyStack, fontSize: 12, color: P.textLight,
          textAlign: "center", marginTop: 14,
        }}>
          🛡️ Protected by the First Wave Promise guarantee
        </p>
      </div>
    </div>
  );
}

// ─── MAIN APP ───
export default function FirstWaveConfidence() {
  const [showBooking, setShowBooking] = useState(false);
  const openBooking = () => setShowBooking(true);

  return (
    <>
      <style>{css}</style>
      <div style={{ fontFamily: bodyStack, color: P.text, background: P.cream, overflowX: "hidden" }}>
        <Nav onBook={openBooking} />
        <Hero onBook={openBooking} />
        <ProofBar />
        <PainSection />
        <IntimidationGap />
        <MethodSection />
        <CoachSection />
        <Testimonials />
        <Packages onBook={openBooking} />
        <FAQ />
        <Guarantee />
        <FinalCTA onBook={openBooking} />
        <Footer />
        {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
      </div>
    </>
  );
}
