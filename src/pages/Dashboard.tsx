
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import KYCProgressBar from '@/components/KYCProgressBar';
import ProfileForm from '@/components/Dashboard/ProfileForm';
import DocumentUploader from '@/components/Dashboard/DocumentUploader';
import LandSearch from '@/components/Dashboard/LandSearch';
import TestEmailButton from '@/components/Dashboard/TestEmailButton';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const { user, isLoading } = useAuth();

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
        <div className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, {user.fullName || user.email}
            </h1>
            <p className="text-muted-foreground">
              Complete your KYC process to unlock all features
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* KYC Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <KYCProgressBar />
          </motion.div>

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
