
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Copy, Wallet, LogOut } from 'lucide-react';
import KYCProgressBar from '@/components/KYCProgressBar';
import ProfileForm from '@/components/Dashboard/ProfileForm';
import DocumentUploader from '@/components/Dashboard/DocumentUploader';
import LandSearch from '@/components/Dashboard/LandSearch';
import TestEmailButton from '@/components/Dashboard/TestEmailButton';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, isLoading, logout } = useAuth();
  const { toast } = useToast();

  const copyWalletAddress = () => {
    if (user?.walletAddress) {
      navigator.clipboard.writeText(user.walletAddress);
      toast({
        title: "Copied!",
        description: "Wallet address copied to clipboard.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-6xl space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, {user.fullName || user.email}
            </h1>
            <p className="text-muted-foreground">
              Manage your land ownership and complete your verification
            </p>
          </motion.div>
          
          <Button variant="outline" onClick={logout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* User Summary & Wallet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Your Wallet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Wallet Address</p>
                      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                        <code className="flex-1 text-sm font-mono">
                          {user.walletAddress || '0x1234...5678'}
                        </code>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={copyWalletAddress}
                          className="shrink-0"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-primary">0</p>
                        <p className="text-sm text-muted-foreground">Land Parcels</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-accent">
                          {user.kycStatus === 'approved' ? '✓' : '⏳'}
                        </p>
                        <p className="text-sm text-muted-foreground">KYC Status</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <KYCProgressBar />
            </motion.div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <ProfileForm />
              <TestEmailButton />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <DocumentUploader />
              <LandSearch />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
