// Save chat history to localStorage
export const saveChatHistory = (chatHistory) => {
  try {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  } catch (error) {
    console.error("Error saving chat history:", error);
  }
};

// Load chat history from localStorage
export const loadChatHistory = () => {
  try {
    const savedHistory = localStorage.getItem("chatHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  } catch (error) {
    console.error("Error loading chat history:", error);
    return [];
  }
};
