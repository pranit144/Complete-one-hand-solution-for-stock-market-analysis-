
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const MarketOverview = ({ indices }) => {
  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl">Market Overview</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {indices.map((index, i) => (
          <motion.div
            key={index.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{index.name}</p>
              <div className="flex items-center text-sm">
                <span className="mr-2">{index.price.toLocaleString()}</span>
                <span className={`flex items-center ${index.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {index.change >= 0 ? (
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                  )}
                  {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
            <div className="w-24">
              <p className="text-xs text-right mb-1">YTD: {index.yearToDate.toFixed(2)}%</p>
              <Progress 
                value={index.yearToDate} 
                max={30}
                className={`h-2 ${index.yearToDate >= 0 ? 'bg-secondary' : 'bg-red-900/30'}`}
              >
                <div 
                  className={`h-full ${index.yearToDate >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(Math.abs(index.yearToDate) / 30 * 100, 100)}%` }}
                />
              </Progress>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
