
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, Check, X, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  type: 'passport' | 'nin' | 'utility-bill';
  fileName: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
}

const DocumentUploader = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const documentTypes = [
    { id: 'passport', label: 'Passport', required: true },
    { id: 'nin', label: 'National ID (NIN)', required: true },
    { id: 'utility-bill', label: 'Utility Bill', required: true },
  ];

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileUpload = async (files: File[]) => {
    for (const file of files) {
      // Simulate upload
      const newDoc: Document = {
        id: Date.now().toString(),
        type: 'passport', // In real app, this would be determined
        fileName: file.name,
        status: 'pending',
        uploadedAt: new Date().toISOString(),
      };

      setDocuments(prev => [...prev, newDoc]);

      // Simulate API call
      setTimeout(() => {
        setDocuments(prev => 
          prev.map(doc => 
            doc.id === newDoc.id 
              ? { ...doc, status: Math.random() > 0.3 ? 'approved' : 'rejected' as const }
              : doc
          )
        );
      }, 2000);

      toast({
        title: "Document Uploaded",
        description: `${file.name} has been uploaded for review.`,
      });
    }
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'approved':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <X className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'pending':
        return 'border-yellow-200 bg-yellow-50';
      case 'approved':
        return 'border-green-200 bg-green-50';
      case 'rejected':
        return 'border-red-200 bg-red-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Zone */}
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              isDragging 
                ? 'border-primary bg-primary/5 scale-105' 
                : 'border-border hover:border-primary/50'
            }`}
          >
            <motion.div
              animate={{ scale: isDragging ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Drop files here</h3>
              <p className="text-muted-foreground mb-4">
                Or click to select files (PDF, JPG, PNG up to 10MB)
              </p>
              <Button variant="outline">
                Browse Files
              </Button>
            </motion.div>
          </div>

          {/* Document Requirements */}
          <div>
            <h4 className="font-medium mb-3">Required Documents</h4>
            <div className="grid gap-3">
              {documentTypes.map((type) => {
                const uploaded = documents.find(doc => doc.type === type.id);
                return (
                  <div
                    key={type.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      uploaded ? getStatusColor(uploaded.status) : 'bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <File className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">{type.label}</span>
                      {type.required && <span className="text-red-500">*</span>}
                    </div>
                    {uploaded && getStatusIcon(uploaded.status)}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Uploaded Documents */}
          {documents.length > 0 && (
            <div>
              <h4 className="font-medium mb-3">Uploaded Documents</h4>
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor(doc.status)}`}
                  >
                    <div className="flex items-center gap-3">
                      <File className="w-5 h-5" />
                      <div>
                        <p className="font-medium">{doc.fileName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(doc.status)}
                      <span className="text-sm capitalize">{doc.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DocumentUploader;
