import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { generateAIResponse } from "@/lib/gemini-service";
import { saveChatHistory } from "@/lib/chat-service";

const ChatInterface = ({ chatHistory, setChatHistory }) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when chat history changes
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [chatHistory]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Create user message
    const userMessage = {
      id: uuidv4(),
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    };

    // Update chat history with user message
    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    saveChatHistory(updatedHistory);

    // Clear input
    setMessage("");

    // Show typing indicator
    setIsTyping(true);

    try {
      // Generate AI response using Gemini
      const botResponse = await generateAIResponse(userMessage, updatedHistory);

      // Update chat history with bot response
      const finalHistory = [...updatedHistory, botResponse];
      setChatHistory(finalHistory);
      saveChatHistory(finalHistory);
    } catch (error) {
      console.error("Error generating response:", error);

      // Add error message
      const errorMessage = {
        id: uuidv4(),
        role: "bot",
        content:
          "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date().toISOString(),
      };

      setChatHistory([...updatedHistory, errorMessage]);
      saveChatHistory([...updatedHistory, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Card className="flex flex-col h-full border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl">
          <Bot className="mr-2 h-5 w-5 text-primary" />
          Financial Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <AnimatePresence initial={false}>
            {chatHistory.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`chat-bubble ${
                  chat.role === "user" ? "user" : "bot"
                }`}
              >
                <div className="flex items-start">
                  {chat.role === "bot" ? (
                    <Sparkles className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                  ) : (
                    <User className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                  )}
                  <div className="whitespace-pre-wrap">{chat.content}</div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="chat-bubble bot"
              >
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>

        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about stocks, market trends, or investment advice..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
