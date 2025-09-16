import { X, FileText, Eye, Download, Trash2 } from 'lucide-react';
import { useChatStore } from '@/lib/store';
import { mockDocuments } from '@/lib/mock-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function DocumentsModal() {
  const { isDocumentsModalOpen, setDocumentsModalOpen, activeContact } = useChatStore();

  if (!activeContact) return null;

  const contactDocuments = mockDocuments.filter(doc => doc.contactId === activeContact.id);

  const handleView = (docId: string) => {
    console.log('Viewing document:', docId);
  };

  const handleDownload = (docId: string) => {
    console.log('Downloading document:', docId);
  };

  const handleDelete = (docId: string) => {
    console.log('Deleting document:', docId);
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getDocumentColor = (index: number) => {
    return index % 2 === 0 ? 'text-red-600 bg-red-100' : 'text-blue-600 bg-blue-100';
  };

  return (
    <Dialog open={isDocumentsModalOpen} onOpenChange={setDocumentsModalOpen}>
      <DialogContent className="max-w-lg" data-testid="modal-documents">
        <DialogHeader>
          <DialogTitle>Documents</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
          {contactDocuments.map((doc, index) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 border border-border rounded-md"
              data-testid={`document-${doc.id}`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded flex items-center justify-center ${getDocumentColor(index)}`}>
                  {getDocumentIcon(doc.type)}
                </div>
                <div>
                  <p className="text-sm font-medium" data-testid={`document-name-${doc.id}`}>
                    {doc.name}
                  </p>
                  <p className="text-xs text-muted-foreground" data-testid={`document-size-${doc.id}`}>
                    {doc.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto"
                  onClick={() => handleView(doc.id)}
                  data-testid={`button-view-${doc.id}`}
                >
                  <Eye className="w-4 h-4 text-primary" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto"
                  onClick={() => handleDownload(doc.id)}
                  data-testid={`button-download-${doc.id}`}
                >
                  <Download className="w-4 h-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto"
                  onClick={() => handleDelete(doc.id)}
                  data-testid={`button-delete-${doc.id}`}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
