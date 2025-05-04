
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const StockCard = ({ stock }) => {
  const isPositive = stock.change >= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="stock-card"
    >
      <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">{stock.id}</CardTitle>
              <p className="text-sm text-muted-foreground">{stock.name}</p>
            </div>
            <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
              <span className="font-medium">{isPositive ? '+' : ''}{stock.changePercent}%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <span className="text-2xl font-bold">${stock.price.toFixed(2)}</span>
            <span className={`ml-2 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? '+' : ''}{stock.change.toFixed(2)}
            </span>
          </div>
          
          <div className="h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stock.history.slice(-30)}>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-md bg-background p-2 shadow-md border border-border text-xs">
                          <p className="font-medium">{payload[0].payload.date}</p>
                          <p className="text-primary">${payload[0].value.toFixed(2)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke={isPositive ? "#22c55e" : "#ef4444"} 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
            <div>
              <p className="font-medium">Volume</p>
              <p>{stock.volume}</p>
            </div>
            <div>
              <p className="font-medium">P/E</p>
              <p>{stock.pe}</p>
            </div>
            <div>
              <p className="font-medium">Mkt Cap</p>
              <p>{stock.marketCap}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StockCard;
