import React, { useState } from "react";
import Website from "./FirstWaveConfidence_Website.jsx";
import QuizFunnel from "./FirstWaveConfidence_QuizFunnel.jsx";

export default function App() {
  const [view, setView] = useState("website");

  return (
    <>
      <div style={{position:"fixed",top:10,right:10,zIndex:10000,display:"flex",gap:8,background:"rgba(0,0,0,.4)",padding:8,borderRadius:999}}>
        <button onClick={() => setView("website")} style={{padding:"8px 12px",borderRadius:999,border:"none",cursor:"pointer",fontWeight:700}}>Website</button>
        <button onClick={() => setView("quiz")} style={{padding:"8px 12px",borderRadius:999,border:"none",cursor:"pointer",fontWeight:700}}>Quiz Funnel</button>
      </div>
      {view === "website" ? <Website /> : <QuizFunnel />}
    </>
  );
}
