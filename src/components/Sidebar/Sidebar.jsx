import React, { useState } from "react";
import "./Sidebar.css";
import { FiMenu } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { FaRegMessage } from "react-icons/fa6";
import { MdOutlineQuestionMark, MdOutlineSettings } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { useAppContext } from "../../Context/Context";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const {
    prevPromptData,
    setDisplayedData,
    setRecentPrompt,
    setShowResult,
    setLoading,
  } = useAppContext();

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="top">
        <div className="menu-icon" onClick={toggleSidebar}>
          <FiMenu />
        </div>

        <div
          className="new-chat"
          onClick={() => {
            setDisplayedData("");
            setRecentPrompt("");
            setShowResult(false);
          }}
        >
          <IoMdAdd /> {isOpen && <p>New Chat</p>}
        </div>

        {isOpen && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPromptData.length === 0 ? (
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                No history yet
              </p>
            ) : (
              prevPromptData
                .slice()
                .reverse()
                .map((item, index) => (
                  <div
                    key={index}
                    className="recent-entry"
                    onClick={() => {
                      setRecentPrompt(item.prompt);
                      setDisplayedData(item.response); // show old response
                      setShowResult(true);
                    }}
                  >
                    <FaRegMessage />
                    <p>{item.prompt}</p>
                  </div>
                ))
            )}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item">
          <MdOutlineQuestionMark /> {isOpen && <p>Help</p>}
        </div>
        <div className="bottom-item">
          <FiClock /> {isOpen && <p>Activity</p>}
        </div>
        <div className="bottom-item">
          <MdOutlineSettings /> {isOpen && <p>Setting</p>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
