// components/FeatureCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function FeatureCard({ title, color, link }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 0px 20px rgba(255,255,255,0.2)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => navigate(link)}
      className="cursor-pointer"
    >
      <Card
        className={`w-48 h-48 rounded-3xl bg-gradient-to-br ${color} text-white shadow-xl backdrop-blur-md bg-opacity-30 border border-white/10`}
      >
        <CardContent className="flex items-center justify-center h-full text-center">
          <h1 className="text-2xl font-bold tracking-wide">{title}</h1>
        </CardContent>
      </Card>
    </motion.div>
  );
}
