import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import StockCard from "@/components/StockCard";
import NewsCard from "@/components/NewsCard";
import MarketOverview from "@/components/MarketOverview";
import PortfolioSummary from "@/components/PortfolioSummary";
import ChatInterface from "@/components/ChatInterface";
import AgentCard from "@/components/AgentCard";
import {
  mockStocks,
  mockNews,
  mockIndices,
  mockPortfolio,
  mockAgents,
  mockChatHistory,
} from "@/lib/mock-data";
import { loadChatHistory, saveChatHistory } from "@/lib/chat-service";
import {
  Bot,
  BarChart3,
  Newspaper,
  PieChart,
  Search,
  Sparkles,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

function DashboardPage({ session, handleLogout }) {
  // Accept session and handleLogout props
  const { toast } = useToast();
  const [chatHistory, setChatHistory] = useState([]);
  const [activeAgent, setActiveAgent] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const savedHistory = loadChatHistory();
    setChatHistory(savedHistory);

    toast({
      title: `Welcome, ${session?.user?.email || "User"}!`,
      description: "Your AI-powered financial assistant is ready.",
      duration: 5000,
    });
  }, [toast, session, navigate]);

  const handleActivateAgent = (agent) => {
    // Navigate to the agent's URL
    window.open(agent.url, "_blank");

    setActiveAgent(agent);

    toast({
      title: `${agent.name} Activated`,
      description: `The ${agent.name} is now analyzing data...`,
      duration: 3000,
    });

    setTimeout(() => {
      const newMessage = {
        id: Date.now().toString(),
        role: "bot",
        content: generateAgentResponse(agent),
        timestamp: new Date().toISOString(),
      };

      // Use functional update to ensure correct state based on previous history
      setChatHistory((prevHistory) => {
        const updatedHistory = [...prevHistory, newMessage];
        saveChatHistory(updatedHistory); // Save history after agent response
        return updatedHistory;
      });
      setActiveAgent(null);
    }, 3000);
  };

  const generateAgentResponse = (agent) => {
    switch (agent.id) {
      case "market-analyst":
        return "**Market Analysis Report**\n\nThe S&P 500 is showing resilience with a 0.66% gain today, supported by strong performance in technology and healthcare sectors. Recent economic data suggests inflation is cooling, which may influence the Fed's rate decision next month.\n\nSector rotation is favoring growth stocks again, with technology outperforming value sectors by 3.2% this month. The VIX volatility index remains low at 14.2, indicating market complacency.\n\nKey levels to watch: S&P 500 resistance at 4,400 and support at 4,280. Breaking above resistance could signal continuation of the bull trend.";

      case "stock-researcher":
        return "**Stock Analysis: AAPL**\n\n**Fundamental Analysis:**\n- Revenue: $94.8B (Q2 2023), +2.5% YoY\n- EPS: $1.52, beating estimates by $0.09\n- Gross Margin: 44.3%, improved from 43.7% last year\n- Services revenue reached all-time high of $20.9B\n\n**Technical Analysis:**\n- Trading above 50-day and 200-day moving averages\n- RSI at 62, not yet overbought\n- Support at $172, resistance at $182\n\n**Outlook:**\nApple shows strong fundamentals with services growth offsetting hardware slowdown. The stock appears fairly valued at current P/E of 29.45 compared to 5-year average of 26.3. Consider accumulating on pullbacks to support levels.";

      case "portfolio-optimizer":
        return "**Portfolio Optimization Recommendations**\n\n1. **Risk Assessment:** Your portfolio has a beta of 1.2, indicating higher volatility than the market. Consider reducing exposure to high-beta tech stocks.\n\n2. **Diversification Analysis:** Technology sector represents 42% of your portfolio, creating concentration risk. Recommend reducing to 30-35% and reallocating to defensive sectors.\n\n3. **Suggested Adjustments:**\n   - Reduce TSLA position by 30%\n   - Add exposure to healthcare (consider JNJ or UNH)\n   - Increase fixed income allocation to 15-20% of portfolio\n   - Add 5% international exposure via VXUS or EFA\n\nThese changes would reduce portfolio volatility by approximately 15% while maintaining similar return potential.";

      case "news-analyzer":
        return "**Financial News Impact Analysis**\n\n**Fed Signals Rate Hike Pause (Financial Times)**\nSentiment: Positive for equities, especially growth stocks\nPotential Impact: Reduced borrowing costs could boost corporate profits and stock valuations\nAffected Sectors: Technology (+), Real Estate (+), Utilities (+), Financials (-)\n\n**Apple Unveils New AI Features (TechCrunch)**\nSentiment: Positive for AAPL\nPotential Impact: Could drive new upgrade cycle and services growth\nTrend: Part of broader AI integration across tech companies\n\n**Key Takeaway:** Recent news flow is predominantly bullish for equities, with monetary policy and AI advancements being the primary positive catalysts.";

      default:
        return "I've analyzed the market data and found some interesting patterns. Let me know if you'd like more specific information about any particular aspect of the financial markets or your portfolio.";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground grid-pattern">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 pointer-events-none" />

      <header className="sticky top-0 z-10 border-b border-border/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <Sparkles className="h-6 w-6 text-primary mr-2" />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              StockInsight Pro
              </h1>
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <section id="dashboard" className="mb-8 scroll-mt-20">
            <div className="flex items-center mb-6">
              <BarChart3 className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-2xl font-bold">Market Dashboard</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {mockStocks.slice(0, 4).map((stock) => (
                    <StockCard key={stock.id} stock={stock} />
                  ))}
                </div>
              </div>

              <div>
                <MarketOverview indices={mockIndices} />
              </div>
            </div>
          </section>

          <section id="agents" className="mb-8 scroll-mt-20">
            <div className="flex items-center mb-6">
              <Bot className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-2xl font-bold">AI Agents</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onActivate={handleActivateAgent}
                />
              ))}
            </div>
          </section>

          <section id="portfolio" className="mb-8 scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="flex items-center mb-6">
                  <Newspaper className="h-6 w-6 text-primary mr-2" />
                  <h2 className="text-2xl font-bold">Financial News</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockNews.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-6">
                  <PieChart className="h-6 w-6 text-primary mr-2" />
                  <h2 className="text-2xl font-bold">Portfolio</h2>
                </div>

                <PortfolioSummary portfolio={mockPortfolio} />
              </div>
            </div>
          </section>

          <section id="chat" className="scroll-mt-20">
            <div className="flex items-center mb-6">
              <Search className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-2xl font-bold">Financial Assistant</h2>
            </div>

            <div className="h-[500px]">
              <ChatInterface
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
              />
            </div>
          </section>
        </motion.div>
      </main>

      {/* <footer className="border-t border-border/40 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Sparkles className="h-5 w-5 text-primary mr-2" />
              <span className="font-medium">StockInsight Pro</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Powered by AI. Data for demonstration purposes only. Not financial advice.</p>
            </div>
          </div>
        </div>
      </footer> */}

      <Toaster />
    </div>
  );
}

export default DashboardPage;
