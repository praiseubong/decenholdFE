import { useState } from "react";
import { Shield, Users, AlertTriangle, Building, Search } from "lucide-react";
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
      title: "NFT Minting",
      description: "Convert your land ownership into secure, blockchain-verified NFTs."
    },
    {
      icon: Users,
      title: "Co-ownership Dashboard",
      description: "Manage shared property ownership with transparent blockchain records."
    },
    {
      icon: AlertTriangle,
      title: "Fraud Alerts",
      description: "Real-time notifications for suspicious activity on your property."
    },
    {
      icon: Building,
      title: "Government Integration",
      description: "Direct partnership with land ministries for legal verification."
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
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setIsLoginOpen(true)}
              className="hidden sm:inline-flex"
            >
              Login
            </Button>
            <Button 
              onClick={() => setIsSignUpOpen(true)}
              className="bg-gradient-primary hover:opacity-90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-primary-foreground mb-6 max-w-4xl mx-auto leading-tight">
            Own and Verify Land on the Blockchain
          </h1>
          <p className="text-xl sm:text-2xl text-primary-foreground/90 mb-10 max-w-3xl mx-auto">
            NFT-backed proof of ownership, in partnership with government land ministries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setIsSignUpOpen(true)}
              className="bg-background text-primary hover:bg-background/90 shadow-soft"
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => setIsLoginOpen(true)}
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Login
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Revolutionizing Land Ownership
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Secure, transparent, and government-backed blockchain technology for real estate.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-glow transition-all duration-300 group"
              >
                <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Search Section */}
          <div className="bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto shadow-soft">
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
              <Button className="bg-gradient-primary hover:opacity-90">
                Search
              </Button>
            </div>
          </div>
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