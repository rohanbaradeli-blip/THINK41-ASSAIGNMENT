import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [jumpTo, setJumpTo] = useState("");
  const lineRefs = useRef([]);

  const handleJump = () => {
    const lineNumber = parseInt(jumpTo);
    if (
      !isNaN(lineNumber) &&
      lineNumber > 0 &&
      lineNumber <= lineRefs.current.length
    ) {
      lineRefs.current[lineNumber - 1]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const lines = text.split("\n");

  return (
    <div className="container">
      <div className="editor-wrapper">
        <div className="line-numbers">
          {lines.map((_, i) => (
            <div key={i} className="line-number">{i + 1}</div>
          ))}
        </div>
        <div className="text-lines">
          {lines.map((line, i) => (
            <div
              key={i}
              ref={el => (lineRefs.current[i] = el)}
              className="text-line"
            >
              {line || "\u00A0"}
            </div>
          ))}
        </div>
      </div>

      <textarea
        className="textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        rows={20}
      />

      <div className="jump-controls">
        <input
          type="number"
          value={jumpTo}
          onChange={(e) => setJumpTo(e.target.value)}
          placeholder="Line number"
        />
        <button onClick={handleJump}>Jump</button>
      </div>
    </div>
  );
}

export default App;
