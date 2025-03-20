
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-resort-50 to-white p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="relative mb-8">
            <span className="text-9xl font-bold text-resort-200">404</span>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-medium text-resort-800">
              Page not found
            </span>
          </div>
          
          <p className="text-lg text-resort-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <Link to="/">
            <Button className="bg-ocean-600 hover:bg-ocean-700">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
