import { createContext, useState, useContext, useEffect } from "react";
import runChat from "../config/gemini";

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPromptData, setPrevPromptData] = useState([]); // prompt + response
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [displayedData, setDisplayedData] = useState("");

  // Send prompt
  const onSent = async (prompt) => {
    try {
      setResultData("");
      setDisplayedData("");
      setLoading(true);
      setShowResult(true);

      const response = await runChat(prompt);

      setResultData(response);
      setPrevPromptData([...prevPromptData, { prompt, response }]); // save history
      setRecentPrompt(prompt);
      setInput("");
    } catch (error) {
      console.error("Error in onSent:", error);
      setResultData("Error fetching response.");
      setDisplayedData("Error fetching response.");
    } finally {
      setLoading(false);
    }
  };

  // Typing effect
  useEffect(() => {
    if (!loading && resultData) {
      setDisplayedData("");
      let i = 0;
      const interval = setInterval(() => {
        if (i < resultData.length) {
          setDisplayedData((prev) => prev + resultData.charAt(i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 5); // speed adjust
      return () => clearInterval(interval);
    }
  }, [loading, resultData]);

  // Start new chat
  const newChat = () => {
    setShowResult(false);
    setLoading(false);
    setInput("");
    setRecentPrompt("");
    setResultData("");
    setDisplayedData("");
  };

  const ContextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPromptData,
    setPrevPromptData,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    displayedData,
    setDisplayedData,
    onSent,
    newChat,
  };

  return (
    <AppContext.Provider value={ContextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
