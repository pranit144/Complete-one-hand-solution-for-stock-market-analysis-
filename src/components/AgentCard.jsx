
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

const AgentCard = ({ agent, onActivate }) => {
  // Dynamically get the icon component
  const IconComponent = LucideIcons[agent.icon] || LucideIcons.Bot;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="agent-card"
    >
      <Card className="h-full border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <IconComponent className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg">{agent.name}</CardTitle>
          </div>
          <CardDescription>{agent.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Capabilities:</p>
            <ul className="space-y-1">
              {agent.capabilities.map((capability, index) => (
                <li key={index} className="text-sm flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                  {capability}
                </li>
              ))}
            </ul>
          </div>
          <Button 
            onClick={() => onActivate(agent)} 
            className="w-full"
            variant="outline"
          >
            Activate Agent
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AgentCard;
