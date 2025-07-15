
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Users, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PropertyResult {
  id: string;
  parcelId: string;
  address: string;
  owner: {
    name: string;
    kycVerified: boolean;
  };
  coOwners: Array<{
    name: string;
    percentage: number;
    kycVerified: boolean;
  }>;
  verified: boolean;
}

const LandSearch = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<PropertyResult | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      setResult({
        id: '1',
        parcelId: 'DH-2024-001',
        address: '123 Blockchain Avenue, Lagos, Nigeria',
        owner: {
          name: 'John Doe',
          kycVerified: true,
        },
        coOwners: [
          { name: 'Jane Smith', percentage: 30, kycVerified: true },
          { name: 'Bob Johnson', percentage: 20, kycVerified: false },
        ],
        verified: true,
      });
      setIsSearching(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Land Verification Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter parcel ID or address..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                type="submit" 
                disabled={isSearching || !query.trim()}
                className="bg-gradient-primary hover:opacity-90"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </motion.div>
          </form>

          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-green-600">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Property Verified</span>
              </div>

              <div className="grid gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Property Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Parcel ID:</strong> {result.parcelId}</p>
                    <p className="flex items-start gap-1">
                      <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      {result.address}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Primary Owner</h4>
                  <div className="flex items-center justify-between">
                    <span>{result.owner.name}</span>
                    <div className="flex items-center gap-1">
                      {result.owner.kycVerified ? (
                        <Shield className="w-4 h-4 text-green-500" />
                      ) : (
                        <Shield className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-sm">
                        {result.owner.kycVerified ? 'KYC Verified' : 'Not Verified'}
                      </span>
                    </div>
                  </div>
                </div>

                {result.coOwners.length > 0 && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Co-owners
                    </h4>
                    <div className="space-y-2">
                      {result.coOwners.map((coOwner, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span>{coOwner.name}</span>
                            <span className="text-muted-foreground">({coOwner.percentage}%)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {coOwner.kycVerified ? (
                              <Shield className="w-3 h-3 text-green-500" />
                            ) : (
                              <Shield className="w-3 h-3 text-red-500" />
                            )}
                            <span className="text-xs">
                              {coOwner.kycVerified ? 'Verified' : 'Not Verified'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LandSearch;
