
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981', '#6b7280'];

const PortfolioSummary = ({ portfolio }) => {
  const isPositive = portfolio.dayChange >= 0;

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl">Portfolio Summary</CardTitle>
        <CardDescription>
          Total Value: ${portfolio.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'} mr-4`}>
            <span className="text-lg font-bold">
              {isPositive ? '+' : ''}${portfolio.dayChange.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="ml-1">
              {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            {isPositive ? '+' : ''}{portfolio.dayChangePercent.toFixed(2)}% today
          </span>
        </div>

        <div className="flex mb-6">
          <div className="w-1/2 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolio.allocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="percentage"
                >
                  {portfolio.allocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Allocation']}
                  labelFormatter={(index) => portfolio.allocation[index].category}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2">
            <p className="text-sm font-medium mb-2">Allocation</p>
            <div className="space-y-1">
              {portfolio.allocation.map((item, index) => (
                <motion.div 
                  key={item.category}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center text-xs"
                >
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="flex-1">{item.category}</span>
                  <span className="font-medium">{item.percentage}%</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Top Holdings</p>
          <div className="space-y-2">
            {portfolio.holdings.slice(0, 3).map((holding, index) => (
              <motion.div 
                key={holding.ticker}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{holding.ticker}</p>
                  <p className="text-xs text-muted-foreground">{holding.shares} shares</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${holding.value.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{holding.weight}% of portfolio</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;
