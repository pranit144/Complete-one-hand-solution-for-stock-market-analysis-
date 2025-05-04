
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const NewsCard = ({ news }) => {
  const sentimentColor = {
    positive: "bg-green-500/10 text-green-500 border-green-500/20",
    negative: "bg-red-500/10 text-red-500 border-red-500/20",
    neutral: "bg-blue-500/10 text-blue-500 border-blue-500/20"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="h-full border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-base font-bold leading-tight">{news.title}</CardTitle>
            <Badge variant="outline" className={`text-xs ${sentimentColor[news.sentiment]}`}>
              {news.sentiment}
            </Badge>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span>{news.source}</span>
            <span className="mx-2">•</span>
            <CalendarDays className="h-3 w-3 mr-1" />
            <span>{news.date}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">{news.summary}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {news.tickers.map(ticker => (
              <Badge key={ticker} variant="secondary" className="text-xs">
                ${ticker}
              </Badge>
            ))}
          </div>
          <div className="flex justify-end">
            <a href={news.url} className="inline-flex items-center text-xs text-primary hover:underline">
              Read more <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NewsCard;
