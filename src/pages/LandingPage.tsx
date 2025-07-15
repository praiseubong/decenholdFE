
import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Users, AlertTriangle, Building, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import SignUpModal from "@/components/SignUpModal";
import LoginModal from "@/components/LoginModal";

const LandingPage = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const features = [
    {
      icon: Shield,
      title: "NFT Land Certificates",
      description: "Convert your land ownership into secure, blockchain-verified NFTs with government backing."
    },
    {
      icon: Users,
      title: "Co-ownership Management",
      description: "Transparent blockchain records for shared property ownership with automated governance."
    },
    {
      icon: AlertTriangle,
      title: "Fraud Prevention",
      description: "Real-time notifications and AI-powered monitoring for suspicious property activities."
    },
    {
      icon: Building,
      title: "Government Integration",
      description: "Direct partnership with land ministries for legal verification and compliance."
    }
  ];

  const handleToggleModals = () => {
    if (isLoginOpen) {
      setIsLoginOpen(false);
      setIsSignUpOpen(true);
    } else {
      setIsSignUpOpen(false);
      setIsLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="ghost" 
                onClick={() => setIsLoginOpen(true)}
                className="hidden sm:inline-flex"
              >
                Login
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => setIsSignUpOpen(true)}
                className="bg-gradient-primary hover:opacity-90"
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-20 left-10 w-4 h-4 bg-brand-gold rounded-full opacity-60"
          />
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="absolute top-32 right-16 w-6 h-6 bg-accent rounded-full opacity-40"
          />
          <motion.div
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
            className="absolute bottom-40 left-20 w-3 h-3 bg-primary rounded-full opacity-50"
          />
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-primary-foreground mb-6 max-w-4xl mx-auto leading-tight">
              Own and Verify Land on the{" "}
              <span className="bg-gradient-to-r from-brand-gold to-accent bg-clip-text text-transparent">
                Blockchain
              </span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl text-primary-foreground/90 mb-10 max-w-3xl mx-auto"
          >
            NFT-backed proof of ownership, in partnership with government land ministries.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                onClick={() => setIsSignUpOpen(true)}
                className="bg-background text-primary hover:bg-background/90 shadow-soft group"
              >
                <Sparkles className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Get Started
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => setIsLoginOpen(true)}
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Login
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Revolutionizing Land Ownership
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Secure, transparent, and government-backed blockchain technology for real estate.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  transition: { duration: 0.2 }
                }}
                className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-glow transition-all duration-300 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-primary/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors"
                >
                  <feature.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto shadow-soft"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-card-foreground mb-2">
                Look Up Property
              </h3>
              <p className="text-muted-foreground">
                Search by parcel ID or address to view ownership details
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Enter parcel ID or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-primary hover:opacity-90">
                  Search
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo className="w-6 h-6" />
            <div className="flex flex-wrap gap-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Government Partnership
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2024 Decentralized Holdings. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SignUpModal 
        isOpen={isSignUpOpen} 
        onClose={() => setIsSignUpOpen(false)} 
      />
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onToggleSignUp={handleToggleModals}
      />
    </div>
  );
};

export default LandingPage;
