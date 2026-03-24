import React, { useState, useEffect, useCallback } from "react";

/*
  FIRST WAVE CONFIDENCE — QUIZ FUNNEL
  Pre-sell page between ads/organic → main website
  
  Mark's 3 principles:
  1. Micro-commitments (yes-yes-yes hypnotic state)
  2. Seeding beliefs (subconsciously install empowering beliefs)
  3. Pre-handling objections (overcome before offer is presented)
  
  Rules applied:
  - 8 real questions + 3 intra-quiz belief cards + email capture + results
  - Format switches every 2-3 questions (cards, pills, icons, visual)
  - Gradualization: non-invasive → personal
  - Dopamine-inducing selection states
  - 30% completion rate target design
  - Every question maps to belief architecture
*/

const P = {
  cream: "#FDF8F0", sand: "#F5EDE0", warmWhite: "#FFFDF9",
  navy: "#0F2B3C", navyLight: "#1A3D52",
  ocean: "#1B7FA3", oceanLight: "#2A9AC4", oceanPale: "#E8F4F8",
  seafoam: "#5FBFA0", seafoamPale: "#E6F5F0",
  coral: "#E8735A", coralPale: "#FEF0EC",
  gold: "#D4A843", goldPale: "#FBF5E6",
  text: "#1A1A1A", textMid: "#4A4A4A", textLight: "#7A7A7A",
  white: "#FFFFFF", divider: "#E8E0D4",
};

const fontH = "'Playfair Display',Georgia,serif";
const fontB = "'DM Sans','Helvetica Neue',sans-serif";

// ─── QUIZ DATA ───
// Each step: question | belief-card | email | results
const STEPS = [
  // Q1 — Non-invasive opener, micro-commitment
  {
    type: "question", format: "single-card", id: "experience",
    label: "Let's find your perfect lesson",
    question: "Have you ever tried surfing before?",
    purpose: "Micro-commitment · Non-invasive opener",
    options: [
      { id: "never", text: "Never — this would be my first time", emoji: "🏖️" },
      { id: "once", text: "Once, but it didn't go great", emoji: "😅" },
      { id: "few", text: "A couple times — still a beginner", emoji: "🌊" },
    ],
  },
  // Q2 — Seeds the dream state
  {
    type: "question", format: "multi-pill", id: "excites",
    label: "The dream",
    question: "What excites you most about finally trying?",
    sub: "Pick all that apply",
    purpose: "Seeds dream state · Micro-commitment",
    options: [
      { id: "bucket", text: "Checking it off my bucket list ✓" },
      { id: "memory", text: "An unforgettable San Diego memory" },
      { id: "partner", text: "Doing something new with my person" },
      { id: "prove", text: "Proving to myself I can do it" },
      { id: "photo", text: "That photo of me on a wave 📸" },
    ],
    multi: true,
  },
  // Q3 — Names the fear, pre-handles objections, seeds belief #3
  {
    type: "question", format: "multi-card", id: "nervous",
    label: "Be honest",
    question: "What makes you most nervous about trying?",
    sub: "Pick all that apply — no judgment here",
    purpose: "Pre-handles objections · Seeds belief #3",
    options: [
      { id: "stupid", text: "Looking stupid in front of people", emoji: "😰" },
      { id: "athletic", text: "Not being athletic enough", emoji: "💪" },
      { id: "ignored", text: "Being ignored in a crowded group", emoji: "👥" },
      { id: "ocean", text: "The ocean itself — it's intimidating", emoji: "🌊" },
      { id: "money", text: "Wasting my money on a bad experience", emoji: "💸" },
    ],
    multi: true,
  },
  // BELIEF CARD 1 — Seeds belief #3 (nerves are normal)
  {
    type: "belief-card", id: "belief1",
    emoji: "💛",
    headline: "You're not alone.",
    body: "92% of our students said they were nervous before their first lesson. Every single one of them said they'd do it again.",
    stat: "92%",
    statLabel: "felt nervous before — then loved it",
    belief: "Seeds Belief #3: My nerves are normal and this lesson is designed for people like me.",
  },
  // Q4 — Segments for package, micro-commitment (icon format change)
  {
    type: "question", format: "icon-card", id: "who",
    label: "Your crew",
    question: "Who will you be surfing with?",
    purpose: "Micro-commitment · Package segmentation",
    options: [
      { id: "solo", text: "Just me", icon: "🙋" },
      { id: "partner", text: "My partner", icon: "💑" },
      { id: "group", text: "Friends or family", icon: "👨‍👩‍👧‍👦" },
      { id: "occasion", text: "It's a special occasion", icon: "🎉" },
    ],
  },
  // Q5 — Pre-handles "not athletic" objection, seeds belief #2
  {
    type: "question", format: "visual-scale", id: "fitness",
    label: "Real talk",
    question: "How would you describe your fitness level?",
    sub: "Be honest — there's no wrong answer here",
    purpose: "Pre-handles 'not athletic enough' · Seeds belief #2",
    options: [
      { id: "couch", text: "Couch enthusiast", emoji: "🛋️", color: P.coral },
      { id: "average", text: "I walk... sometimes", emoji: "🚶", color: P.gold },
      { id: "active", text: "Pretty active", emoji: "🏃", color: P.seafoam },
      { id: "athlete", text: "Very athletic", emoji: "💪", color: P.ocean },
    ],
  },
  // BELIEF CARD 2 — Seeds belief #2 (don't need to be athletic)
  {
    type: "belief-card", id: "belief2",
    emoji: "🤙",
    headline: "Here's what our students say:",
    quote: "\"We are NOT athletic people. Like, at all. But our instructor was so patient and made it feel like there was zero pressure. We both stood up.\"",
    author: "— David & Jenny K., couple, first-timers",
    belief: "Seeds Belief #2: I don't need to be athletic to succeed.",
  },
  // Q6 — Seeds belief #4 (different from tourist trap), format change to "pick 2"
  {
    type: "question", format: "pick-two", id: "matters",
    label: "What counts",
    question: "What matters most to you in a surf lesson?",
    sub: "Pick your top two",
    purpose: "Seeds belief #4 · Pre-handles objections",
    options: [
      { id: "patient", text: "A patient, calm instructor" },
      { id: "small", text: "Small group — real attention" },
      { id: "standup", text: "Actually standing up on a wave" },
      { id: "fun", text: "Having a blast, win or lose" },
      { id: "photos", text: "Great photos to remember it" },
    ],
    maxSelect: 2,
  },
  // Q7 — Intent signal, scheduling, micro-commitment
  {
    type: "question", format: "single-card", id: "when",
    label: "Timing",
    question: "When are you thinking of doing this?",
    purpose: "Micro-commitment · Intent signal",
    options: [
      { id: "week", text: "This week — I'm ready", emoji: "⚡" },
      { id: "month", text: "Sometime this month", emoji: "📅" },
      { id: "soon", text: "In the next few months", emoji: "🗓️" },
      { id: "local", text: "I live here — flexible", emoji: "🏠" },
    ],
  },
  // BELIEF CARD 3 — Seeds belief about age
  {
    type: "belief-card", id: "belief3",
    emoji: "🏄",
    headline: "Age is just a number out here.",
    body: "We've taught students from 14 to 68. One of our favorite stories is a 55-year-old who almost did a whale watching tour instead. He caught three waves and called it the best decision of his trip.",
    belief: "Pre-handles 'too old' objection.",
  },
  // Q8 — Age (gradualization — more personal, later in quiz)
  {
    type: "question", format: "pill-select", id: "age",
    label: "Almost there",
    question: "What's your age range?",
    sub: "This helps us personalize your recommendation",
    purpose: "Gradualization · Segmentation",
    options: [
      { id: "u25", text: "Under 25" },
      { id: "25-35", text: "25–35" },
      { id: "36-45", text: "36–45" },
      { id: "46-55", text: "46–55" },
      { id: "55+", text: "55+" },
    ],
  },
  // EMAIL CAPTURE
  { type: "email", id: "email" },
  // RESULTS
  { type: "results", id: "results" },
];

// ─── COMPONENTS ───

function ProgressBar({ current, total }) {
  const pct = Math.min((current / total) * 100, 100);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 4, background: P.divider,
    }}>
      <div style={{
        height: "100%", width: `${pct}%`,
        background: `linear-gradient(90deg, ${P.ocean}, ${P.seafoam})`,
        borderRadius: "0 2px 2px 0",
        transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
      }} />
    </div>
  );
}

function QuizHeader({ current, total, onBack }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "16px 20px", position: "fixed", top: 4, left: 0, right: 0,
      zIndex: 99, background: "rgba(253,248,240,0.9)",
      backdropFilter: "blur(12px)",
    }}>
      <button onClick={onBack} style={{
        background: "none", border: "none", fontSize: 20, cursor: "pointer",
        color: P.textLight, fontFamily: fontB, padding: "4px 8px",
        opacity: current > 0 ? 1 : 0.3,
      }}>
        ←
      </button>
      <div style={{
        fontFamily: fontH, fontSize: 16, fontWeight: 600,
        color: P.navy, letterSpacing: -0.3,
      }}>
        Learn2Surf<span style={{ color: P.ocean }}>SD</span>
      </div>
      <div style={{
        fontFamily: fontB, fontSize: 12, fontWeight: 600,
        color: P.textLight, minWidth: 40, textAlign: "right",
      }}>
        {current + 1}/{total}
      </div>
    </div>
  );
}

// Option card for single/multi select
function OptionCard({ text, emoji, icon, selected, onClick, style }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 14,
      width: "100%", padding: "18px 20px", borderRadius: 16,
      border: selected ? `2px solid ${P.ocean}` : `1.5px solid ${P.divider}`,
      background: selected ? P.oceanPale : P.white,
      cursor: "pointer", textAlign: "left",
      transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
      transform: selected ? "scale(1.02)" : "scale(1)",
      boxShadow: selected ? `0 4px 20px rgba(27,127,163,0.15)` : "none",
      fontFamily: fontB, fontSize: 15, fontWeight: 500, color: P.text,
      ...style,
    }}>
      {(emoji || icon) && (
        <span style={{ fontSize: 24, flexShrink: 0 }}>{emoji || icon}</span>
      )}
      <span style={{ flex: 1 }}>{text}</span>
      <span style={{
        width: 22, height: 22, borderRadius: 11, flexShrink: 0,
        border: selected ? `2px solid ${P.ocean}` : `2px solid ${P.divider}`,
        background: selected ? P.ocean : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s",
      }}>
        {selected && <span style={{ color: P.white, fontSize: 12, fontWeight: 700 }}>✓</span>}
      </span>
    </button>
  );
}

function PillOption({ text, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "12px 22px", borderRadius: 50,
      border: selected ? `2px solid ${P.ocean}` : `1.5px solid ${P.divider}`,
      background: selected ? P.ocean : P.white,
      color: selected ? P.white : P.text,
      cursor: "pointer", fontFamily: fontB, fontSize: 14, fontWeight: 600,
      transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
      transform: selected ? "scale(1.05)" : "scale(1)",
    }}>
      {text}
    </button>
  );
}

function VisualScaleOption({ text, emoji, color, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, minWidth: 0, padding: "20px 8px", borderRadius: 16,
      border: selected ? `2px solid ${color}` : `1.5px solid ${P.divider}`,
      background: selected ? `${color}18` : P.white,
      cursor: "pointer", textAlign: "center",
      transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
      transform: selected ? "scale(1.06)" : "scale(1)",
    }}>
      <div style={{ fontSize: 28, marginBottom: 6 }}>{emoji}</div>
      <div style={{
        fontFamily: fontB, fontSize: 11, fontWeight: 600,
        color: selected ? color : P.textMid,
      }}>{text}</div>
    </button>
  );
}

// ─── QUESTION RENDERER ───
function QuestionStep({ step, answers, setAnswer, onNext }) {
  const current = answers[step.id] || (step.multi || step.maxSelect ? [] : null);
  const canProceed = step.multi || step.maxSelect
    ? Array.isArray(current) && current.length > 0
    : current !== null;

  const toggle = (optId) => {
    if (step.multi) {
      const arr = Array.isArray(current) ? [...current] : [];
      const idx = arr.indexOf(optId);
      if (idx >= 0) arr.splice(idx, 1); else arr.push(optId);
      setAnswer(step.id, arr);
    } else if (step.maxSelect) {
      const arr = Array.isArray(current) ? [...current] : [];
      const idx = arr.indexOf(optId);
      if (idx >= 0) { arr.splice(idx, 1); }
      else if (arr.length < step.maxSelect) { arr.push(optId); }
      setAnswer(step.id, arr);
    } else {
      setAnswer(step.id, optId);
      // Auto-advance on single select after brief delay
      setTimeout(onNext, 350);
    }
  };

  const isSelected = (optId) => {
    if (Array.isArray(current)) return current.includes(optId);
    return current === optId;
  };

  return (
    <div className="fwq-animate" style={{
      display: "flex", flexDirection: "column", minHeight: "100%",
      justifyContent: "center", padding: "80px 24px 120px",
      maxWidth: 480, margin: "0 auto", width: "100%",
    }}>
      <p style={{
        fontFamily: fontB, fontSize: 12, fontWeight: 700,
        color: P.ocean, textTransform: "uppercase", letterSpacing: 1.5,
        marginBottom: 10,
      }}>{step.label}</p>

      <h2 style={{
        fontFamily: fontH, fontSize: 28, fontWeight: 700,
        color: P.navy, lineHeight: 1.15, marginBottom: step.sub ? 8 : 28,
      }}>{step.question}</h2>

      {step.sub && (
        <p style={{
          fontFamily: fontB, fontSize: 14, color: P.textLight,
          marginBottom: 28,
        }}>{step.sub}</p>
      )}

      {/* SINGLE-CARD or MULTI-CARD */}
      {(step.format === "single-card" || step.format === "multi-card") && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {step.options.map(o => (
            <OptionCard
              key={o.id} text={o.text} emoji={o.emoji}
              selected={isSelected(o.id)} onClick={() => toggle(o.id)}
            />
          ))}
        </div>
      )}

      {/* ICON-CARD */}
      {step.format === "icon-card" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {step.options.map(o => (
            <button key={o.id} onClick={() => toggle(o.id)} style={{
              padding: 20, borderRadius: 16, textAlign: "center",
              border: isSelected(o.id) ? `2px solid ${P.ocean}` : `1.5px solid ${P.divider}`,
              background: isSelected(o.id) ? P.oceanPale : P.white,
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
              transform: isSelected(o.id) ? "scale(1.04)" : "scale(1)",
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{o.icon}</div>
              <div style={{ fontFamily: fontB, fontSize: 14, fontWeight: 600, color: P.text }}>{o.text}</div>
            </button>
          ))}
        </div>
      )}

      {/* MULTI-PILL */}
      {step.format === "multi-pill" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {step.options.map(o => (
            <PillOption key={o.id} text={o.text} selected={isSelected(o.id)} onClick={() => toggle(o.id)} />
          ))}
        </div>
      )}

      {/* PILL-SELECT (single) */}
      {step.format === "pill-select" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
          {step.options.map(o => (
            <PillOption key={o.id} text={o.text} selected={isSelected(o.id)} onClick={() => toggle(o.id)} />
          ))}
        </div>
      )}

      {/* PICK-TWO */}
      {step.format === "pick-two" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {step.options.map(o => (
            <OptionCard
              key={o.id} text={o.text}
              selected={isSelected(o.id)} onClick={() => toggle(o.id)}
            />
          ))}
        </div>
      )}

      {/* VISUAL-SCALE */}
      {step.format === "visual-scale" && (
        <div style={{ display: "flex", gap: 8 }}>
          {step.options.map(o => (
            <VisualScaleOption
              key={o.id} text={o.text} emoji={o.emoji} color={o.color}
              selected={isSelected(o.id)} onClick={() => toggle(o.id)}
            />
          ))}
        </div>
      )}

      {/* Continue button for multi-select */}
      {(step.multi || step.maxSelect) && (
        <button
          onClick={canProceed ? onNext : undefined}
          style={{
            marginTop: 28, padding: "16px 36px", borderRadius: 50,
            border: "none", fontFamily: fontB, fontSize: 16, fontWeight: 700,
            background: canProceed ? P.ocean : P.divider,
            color: canProceed ? P.white : P.textLight,
            cursor: canProceed ? "pointer" : "default",
            transition: "all 0.3s",
            boxShadow: canProceed ? `0 4px 20px rgba(27,127,163,0.3)` : "none",
            alignSelf: "center",
          }}
        >
          Continue →
        </button>
      )}
    </div>
  );
}

// ─── BELIEF CARD RENDERER ───
function BeliefCardStep({ step, onNext }) {
  return (
    <div className="fwq-animate" style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "100%",
      padding: "80px 24px 120px", maxWidth: 480, margin: "0 auto", width: "100%",
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        background: P.oceanPale, display: "flex",
        alignItems: "center", justifyContent: "center",
        fontSize: 32, marginBottom: 24,
      }}>
        {step.emoji}
      </div>

      <h2 style={{
        fontFamily: fontH, fontSize: 28, fontWeight: 700,
        color: P.navy, textAlign: "center", lineHeight: 1.2,
        marginBottom: 20,
      }}>{step.headline}</h2>

      {step.stat && (
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{
            fontFamily: fontH, fontSize: 52, fontWeight: 800,
            color: P.ocean, lineHeight: 1,
          }}>{step.stat}</div>
          <div style={{
            fontFamily: fontB, fontSize: 14, color: P.textLight,
            marginTop: 6,
          }}>{step.statLabel}</div>
        </div>
      )}

      {step.body && (
        <p style={{
          fontFamily: fontB, fontSize: 17, color: P.textMid,
          lineHeight: 1.6, textAlign: "center", maxWidth: 400,
          marginBottom: 16,
        }}>{step.body}</p>
      )}

      {step.quote && (
        <div style={{
          background: P.white, borderRadius: 16, padding: 24,
          borderLeft: `4px solid ${P.ocean}`, marginBottom: 16,
          maxWidth: 400, width: "100%",
        }}>
          <p style={{
            fontFamily: fontB, fontSize: 15, color: P.textMid,
            lineHeight: 1.55, fontStyle: "italic", margin: 0,
          }}>{step.quote}</p>
          {step.author && (
            <p style={{
              fontFamily: fontB, fontSize: 13, color: P.textLight,
              marginTop: 12, fontStyle: "normal",
            }}>{step.author}</p>
          )}
        </div>
      )}

      <button onClick={onNext} style={{
        marginTop: 20, padding: "16px 40px", borderRadius: 50,
        border: "none", fontFamily: fontB, fontSize: 16, fontWeight: 700,
        background: P.ocean, color: P.white, cursor: "pointer",
        boxShadow: `0 4px 20px rgba(27,127,163,0.3)`,
        transition: "all 0.3s",
      }}>
        Continue →
      </button>
    </div>
  );
}

// ─── EMAIL CAPTURE ───
function EmailStep({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const valid = name.trim().length > 0 && email.includes("@");

  return (
    <div className="fwq-animate" style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "100%",
      padding: "80px 24px 120px", maxWidth: 440, margin: "0 auto", width: "100%",
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: "50%",
        background: P.goldPale, display: "flex",
        alignItems: "center", justifyContent: "center",
        fontSize: 28, marginBottom: 20,
      }}>🎯</div>

      <h2 style={{
        fontFamily: fontH, fontSize: 28, fontWeight: 700,
        color: P.navy, textAlign: "center", lineHeight: 1.2,
        marginBottom: 8,
      }}>
        Your personalized lesson<br />
        <span style={{ fontStyle: "italic", color: P.ocean }}>recommendation is ready.</span>
      </h2>

      <p style={{
        fontFamily: fontB, fontSize: 15, color: P.textLight,
        textAlign: "center", marginBottom: 32, lineHeight: 1.5,
      }}>
        Enter your name and email to see which lesson is the best fit for you — plus a special offer just for quiz takers.
      </p>

      <div style={{ width: "100%", marginBottom: 14 }}>
        <input
          type="text" placeholder="Your first name"
          value={name} onChange={e => setName(e.target.value)}
          style={{
            width: "100%", padding: "16px 20px", borderRadius: 14,
            border: `1.5px solid ${P.divider}`, background: P.white,
            fontFamily: fontB, fontSize: 16, color: P.text,
            outline: "none", boxSizing: "border-box",
          }}
          onFocus={e => e.target.style.borderColor = P.ocean}
          onBlur={e => e.target.style.borderColor = P.divider}
        />
      </div>
      <div style={{ width: "100%", marginBottom: 28 }}>
        <input
          type="email" placeholder="Your email address"
          value={email} onChange={e => setEmail(e.target.value)}
          style={{
            width: "100%", padding: "16px 20px", borderRadius: 14,
            border: `1.5px solid ${P.divider}`, background: P.white,
            fontFamily: fontB, fontSize: 16, color: P.text,
            outline: "none", boxSizing: "border-box",
          }}
          onFocus={e => e.target.style.borderColor = P.ocean}
          onBlur={e => e.target.style.borderColor = P.divider}
        />
      </div>

      <button onClick={() => valid && onSubmit(name, email)} style={{
        width: "100%", padding: "18px", borderRadius: 50,
        border: "none", fontFamily: fontB, fontSize: 17, fontWeight: 700,
        background: valid ? P.ocean : P.divider,
        color: valid ? P.white : P.textLight,
        cursor: valid ? "pointer" : "default",
        boxShadow: valid ? `0 4px 20px rgba(27,127,163,0.3)` : "none",
        transition: "all 0.3s",
      }}>
        See My Recommendation →
      </button>

      <p style={{
        fontFamily: fontB, fontSize: 11, color: P.textLight,
        textAlign: "center", marginTop: 16, lineHeight: 1.4,
      }}>
        🔒 No spam, ever. Just your lesson recommendation and a welcome offer.
      </p>
    </div>
  );
}

// ─── RESULTS PAGE ───
function ResultsPage({ answers, userName }) {
  // Determine recommendation based on answers
  const who = answers.who || "solo";
  const fitness = answers.fitness || "average";
  const timing = answers.when || "month";

  let recPkg, recName, recPrice, recWhy, recTag;
  if (who === "solo" || who === "partner") {
    if (who === "partner") {
      recPkg = "duo"; recName = "First Wave Duo"; recPrice = "$119–149/person";
      recTag = "Perfect for couples"; recWhy = "Based on your answers, the Duo lesson gives you and your partner dedicated coaching time together — with your instructor right beside you both.";
    } else {
      recPkg = "private"; recName = "First Wave Private"; recPrice = "$179";
      recTag = "Recommended for you"; recWhy = "Based on your answers, the Private lesson gives you 100% of your coach's attention — the fastest path to standing up and the most comfortable setting for first-timers.";
    }
  } else if (who === "occasion") {
    recPkg = "vip"; recName = "Ultimate VIP Experience"; recPrice = "$279";
    recTag = "Best for celebrations"; recWhy = "For a special occasion, the VIP experience gives you the private lesson plus professional photos, a branded rash guard, and a highlights reel — memories you'll keep forever.";
  } else {
    recPkg = "group"; recName = "First Wave Group"; recPrice = "$89/person";
    recTag = "Great for groups"; recWhy = "With friends or family, the Group lesson keeps the energy high. Max 4-6 per instructor, so everyone still gets personal attention.";
  }

  const nervousItems = answers.nervous || [];
  const reassurances = [];
  if (nervousItems.includes("stupid")) reassurances.push({ icon: "💛", text: "94% of our students felt the same nervousness — and every one said they'd do it again." });
  if (nervousItems.includes("athletic")) reassurances.push({ icon: "💪", text: "You don't need to be athletic. Our method works because it's about confidence first, not fitness." });
  if (nervousItems.includes("ignored")) reassurances.push({ icon: "👤", text: "Max 4-6 students per coach in groups. Private is 1-on-1. You will not be ignored." });
  if (nervousItems.includes("ocean")) reassurances.push({ icon: "🌊", text: "We start on the sand, then knee-deep water. You set the pace. All coaches are CPR/lifeguard certified." });
  if (nervousItems.includes("money")) reassurances.push({ icon: "🛡️", text: "Our First Wave Promise: if you don't feel safe and supported, we make it right. Guaranteed." });
  if (reassurances.length === 0) reassurances.push({ icon: "🤙", text: "You're going to love this. Our students rate us 4.9 stars — and most of them were nervous too." });

  return (
    <div className="fwq-animate" style={{
      padding: "80px 20px 60px", maxWidth: 480,
      margin: "0 auto", width: "100%",
    }}>
      {/* Celebration */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: `linear-gradient(135deg, ${P.oceanPale}, ${P.seafoamPale})`,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontSize: 36, marginBottom: 16,
        }}>🏄</div>

        <h2 style={{
          fontFamily: fontH, fontSize: 30, fontWeight: 700,
          color: P.navy, lineHeight: 1.15, marginBottom: 8,
        }}>
          {userName ? `${userName}, here's` : "Here's"} your<br />
          <span style={{ fontStyle: "italic", color: P.ocean }}>perfect lesson.</span>
        </h2>
      </div>

      {/* Recommendation Card */}
      <div style={{
        background: P.white, borderRadius: 24, overflow: "hidden",
        border: `2px solid ${P.ocean}`,
        boxShadow: `0 8px 40px rgba(27,127,163,0.12)`,
        marginBottom: 24,
      }}>
        <div style={{
          background: P.ocean, color: P.white, padding: "10px 20px",
          fontFamily: fontB, fontSize: 12, fontWeight: 700,
          letterSpacing: 1, textTransform: "uppercase", textAlign: "center",
        }}>
          {recTag}
        </div>
        <div style={{ padding: 28 }}>
          <h3 style={{ fontFamily: fontH, fontSize: 26, fontWeight: 700, color: P.navy, marginBottom: 4 }}>
            {recName}
          </h3>
          <div style={{ marginBottom: 20 }}>
            <span style={{ fontFamily: fontH, fontSize: 36, fontWeight: 800, color: P.ocean }}>{recPrice}</span>
          </div>
          <p style={{
            fontFamily: fontB, fontSize: 15, color: P.textMid,
            lineHeight: 1.55, marginBottom: 20,
          }}>{recWhy}</p>

          <div style={{
            background: P.cream, borderRadius: 14, padding: 16, marginBottom: 20,
          }}>
            {["All gear included", "Beach coaching + water time", "CPR/lifeguard certified coach", "First Wave Promise™ guarantee"].map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, marginBottom: i < 3 ? 8 : 0,
                fontFamily: fontB, fontSize: 14, color: P.textMid,
              }}>
                <span style={{ color: P.seafoam, fontWeight: 700 }}>✓</span>{item}
              </div>
            ))}
          </div>

          <a
            href="#book"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "100%", padding: "18px", borderRadius: 50,
              border: "none", fontFamily: fontB, fontSize: 17, fontWeight: 700,
              background: P.ocean, color: P.white, textDecoration: "none",
              boxShadow: `0 4px 20px rgba(27,127,163,0.3)`,
              cursor: "pointer",
            }}
          >
            Book This Lesson →
          </a>
        </div>
      </div>

      {/* Personalized reassurances based on their fears */}
      {reassurances.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <p style={{
            fontFamily: fontB, fontSize: 12, fontWeight: 700,
            color: P.ocean, textTransform: "uppercase", letterSpacing: 1.5,
            marginBottom: 12,
          }}>
            About those nerves...
          </p>
          {reassurances.map((r, i) => (
            <div key={i} style={{
              background: P.white, borderRadius: 14, padding: "16px 18px",
              marginBottom: 8, display: "flex", gap: 12, alignItems: "flex-start",
              border: `1px solid ${P.divider}`,
            }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{r.icon}</span>
              <p style={{
                fontFamily: fontB, fontSize: 14, color: P.textMid,
                lineHeight: 1.5, margin: 0,
              }}>{r.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Quiz-taker special offer */}
      <div style={{
        background: P.goldPale, borderRadius: 18, padding: 24,
        border: `1px solid rgba(212,168,67,0.2)`, textAlign: "center",
        marginBottom: 24,
      }}>
        <p style={{
          fontFamily: fontB, fontSize: 13, fontWeight: 700,
          color: P.gold, textTransform: "uppercase", letterSpacing: 1,
          marginBottom: 8,
        }}>Quiz-taker bonus</p>
        <p style={{
          fontFamily: fontH, fontSize: 22, fontWeight: 700,
          color: P.navy, marginBottom: 8,
        }}>
          Add pro photos for just $29
        </p>
        <p style={{
          fontFamily: fontB, fontSize: 14, color: P.textMid,
          lineHeight: 1.5,
        }}>
          That's $10 off the regular price. Capture your first wave — delivered same-day to your phone. Available when you book.
        </p>
      </div>

      {/* See all options link */}
      <div style={{ textAlign: "center" }}>
        <a href="#all-lessons" style={{
          fontFamily: fontB, fontSize: 14, fontWeight: 600,
          color: P.ocean, textDecoration: "none",
        }}>
          See all lesson options →
        </a>
      </div>
    </div>
  );
}

// ─── MAIN QUIZ APP ───
export default function QuizFunnel() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userName, setUserName] = useState("");
  const [direction, setDirection] = useState(1); // 1 forward, -1 back

  const totalQuestions = STEPS.filter(s => s.type === "question").length;
  const currentQuestionNum = STEPS.slice(0, currentStep + 1).filter(s => s.type === "question").length;

  const step = STEPS[currentStep];
  const isLast = currentStep >= STEPS.length - 1;

  const goNext = useCallback(() => {
    if (!isLast) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    }
  }, [isLast]);

  const goBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const setAnswer = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleEmailSubmit = (name, email) => {
    setUserName(name);
    setAnswers(prev => ({ ...prev, email_name: name, email_address: email }));
    goNext();
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    .fwq-animate {
      animation: fwqSlideIn 0.45s cubic-bezier(0.4,0,0.2,1) forwards;
    }
    @keyframes fwqSlideIn {
      from { opacity: 0; transform: translateX(${direction > 0 ? '30' : '-30'}px); }
      to { opacity: 1; transform: translateX(0); }
    }
    input::placeholder { color: ${P.textLight}; }
    input:focus { border-color: ${P.ocean} !important; box-shadow: 0 0 0 3px rgba(27,127,163,0.1); }
  `;

  return (
    <>
      <style>{css}</style>
      <div style={{
        background: P.cream, minHeight: "100vh",
        fontFamily: fontB, color: P.text,
        display: "flex", flexDirection: "column",
      }}>
        <ProgressBar current={currentQuestionNum} total={totalQuestions + 1} />

        {step.type !== "results" && (
          <QuizHeader
            current={currentQuestionNum - (step.type === "question" ? 1 : 0)}
            total={totalQuestions}
            onBack={goBack}
          />
        )}

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }} key={currentStep}>
          {step.type === "question" && (
            <QuestionStep
              step={step}
              answers={answers}
              setAnswer={setAnswer}
              onNext={goNext}
            />
          )}
          {step.type === "belief-card" && (
            <BeliefCardStep step={step} onNext={goNext} />
          )}
          {step.type === "email" && (
            <EmailStep onSubmit={handleEmailSubmit} />
          )}
          {step.type === "results" && (
            <ResultsPage answers={answers} userName={userName} />
          )}
        </div>
      </div>
    </>
  );
}
