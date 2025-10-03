import React, { useRef } from "react";
import user from "../../assets/user.png";
import logo from "../../assets/logo.png";
import "./Mainbar.css";
import { FaRegCompass, FaRegMessage, FaReact } from "react-icons/fa6";
import { IoBulbOutline, IoSend } from "react-icons/io5";
import { useAppContext } from "../../Context/Context";

function Mainbar() {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    }
  };

  const {
    input,
    setInput,
    recentPrompt,
    showResult,
    loading,
    displayedData,
    onSent,
    newChat,
  } = useAppContext();

  return (
    <div className="mainbar">
      {/* Navbar */}
      <nav>
        <h2>Gemini</h2>
        <img src={user} alt="user" />
      </nav>

      {/* Main content */}
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Rehan.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                onClick={() =>
                  onSent(
                    "Suggest beautiful places to see on an upcoming road trip"
                  )
                }
                className="card"
              >
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <FaRegCompass />
              </div>

              <div
                onClick={() =>
                  onSent("Briefly summarize this concept: urban planning")
                }
                className="card"
              >
                <p>Briefly summarize this concept: urban planning</p>
                <IoBulbOutline />
              </div>

              <div
                onClick={() =>
                  onSent(
                    "Brainstorm team bonding activities for our work retreat"
                  )
                }
                className="card"
              >
                <p>Brainstorm team bonding activities for our work retreat</p>
                <FaRegMessage />
              </div>

              <div
                onClick={() =>
                  onSent("Tell me about React JS and React Native")
                }
                className="card"
              >
                <p>Tell me about React JS and React Native</p>
                <FaReact />
              </div>
            </div>
          </>
        ) : (
          <div className="result-box">
            <div className="result-title">
              <img src={user} alt="user" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={logo} alt="logo" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <div className="result-text">
                  {displayedData.split("\n").map((line, index) => {
                    line = line.trim();
                    if (!line) return null;
                    if (line.startsWith("###"))
                      return <h3 key={index}>{line.replace(/###\s*/, "")}</h3>;
                    else if (/^\d+\./.test(line))
                      return <li key={index}>{line}</li>;
                    else if (/^[-*]/.test(line))
                      return (
                        <li key={index}>{line.replace(/^[-*]\s*/, "")}</li>
                      );
                    else return <p key={index}>{line}</p>;
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="main-bottom">
          <div className="text-box">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              ref={textareaRef}
              placeholder="Enter a prompt here"
              rows={1}
              onInput={handleInput}
            />
            <IoSend
              className="send-btn"
              onClick={() => {
                if (input.trim()) onSent(input);
              }}
            />
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
}

export default Mainbar;
