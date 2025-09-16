import { useState } from 'react';
import { Info, ChevronUp, ChevronDown, X, Slash } from 'lucide-react';
import { useChatStore } from '@/lib/store';
import { mockDocuments } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function UserProfile() {
  const { activeContact, setDocumentsModalOpen } = useChatStore();
  const [attributesOpen, setAttributesOpen] = useState(true);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [filesOpen, setFilesOpen] = useState(false);
  
  if (!activeContact) return null;

  const contactDocuments = mockDocuments.filter(doc => doc.contactId === activeContact.id);

  const handleRemoveTag = (tagToRemove: string) => {
    // In a real app, this would update the contact's tags via API
    console.log('Removing tag:', tagToRemove);
  };

  const handleToggleBlock = () => {
    // In a real app, this would toggle the contact's blocked status via API
    console.log('Toggling block status for:', activeContact.name);
  };

  return (
    <div className="w-80 bg-card border-l border-border overflow-y-auto custom-scrollbar">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4" data-testid="profile-title">User Profile</h3>
        
        {/* User Info */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
            <span className="text-lg font-medium text-muted-foreground">
              {activeContact.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h4 className="font-medium flex items-center" data-testid="profile-name">
              {activeContact.name} ✓
            </h4>
            <p className="text-sm text-muted-foreground" data-testid="profile-phone">
              {activeContact.phone}
            </p>
          </div>
        </div>
        
        {/* Status and Stats */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <span className="text-sm font-medium text-primary" data-testid="status-active">
              {activeContact.status?.charAt(0).toUpperCase() + activeContact.status?.slice(1) || 'Active'} ∨
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Company</span>
            <span className="text-sm" data-testid="company-value">
              {activeContact.company || '-'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Last Active</span>
            <span className="text-sm" data-testid="last-active">
              {activeContact.lastActive ? activeContact.lastActive.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              }) : 'Never'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Total Messages</span>
            <span className="text-sm" data-testid="total-messages">
              {activeContact.totalMessages}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Tokens Used</span>
            <div className="flex items-center space-x-1">
              <span className="text-sm" data-testid="tokens-used">
                {activeContact.tokensUsed}
              </span>
              <Info className="w-3 h-3 text-muted-foreground" />
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Source</span>
            <span className="text-sm" data-testid="source">
              {activeContact.source}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Incoming</span>
            <span className={`text-sm ${activeContact.isBlocked ? 'text-red-500' : 'text-green-500'}`} data-testid="incoming-status">
              {activeContact.isBlocked ? 'Blocked' : 'Active'}
            </span>
          </div>
        </div>
        
        {/* Attributes Accordion */}
        <div className="border-b border-border pb-4 mb-4">
          <Collapsible open={attributesOpen} onOpenChange={setAttributesOpen}>
            <CollapsibleTrigger 
              className="flex items-center justify-between w-full p-3 hover:bg-accent/50 rounded-md transition-colors"
              data-testid="accordion-attributes"
            >
              <span className="font-medium">Attributes</span>
              {attributesOpen ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pb-3 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Company</span>
                <span className="text-sm">{activeContact.company || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">City</span>
                <span className="text-sm">{activeContact.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Country</span>
                <span className="text-sm">{activeContact.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Created</span>
                <span className="text-sm">
                  {activeContact.createdAt ? activeContact.createdAt.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Website</span>
                <span className="text-sm">{activeContact.website}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm">{activeContact.email}</span>
              </div>
              {activeContact.attributes && 
                typeof activeContact.attributes === 'object' && 
                activeContact.attributes !== null && 
                'admin' in activeContact.attributes ? (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Admin</span>
                  <span className="text-sm">
                    {String((activeContact.attributes as Record<string, unknown>).admin || '-')}
                  </span>
                </div>
              ) : null}
              {activeContact.attributes && 
                typeof activeContact.attributes === 'object' && 
                activeContact.attributes !== null && 
                'adminMobile' in activeContact.attributes ? (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Admin Mobile</span>
                  <span className="text-sm">
                    {String((activeContact.attributes as Record<string, unknown>).adminMobile || '-')}
                  </span>
                </div>
              ) : null}
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Tags Accordion */}
        <div className="border-b border-border pb-4 mb-4">
          <Collapsible open={tagsOpen} onOpenChange={setTagsOpen}>
            <CollapsibleTrigger 
              className="flex items-center justify-between w-full p-3 hover:bg-accent/50 rounded-md transition-colors"
              data-testid="accordion-tags"
            >
              <span className="font-medium">Tags</span>
              {tagsOpen ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pb-3 space-y-3">
              <div className="flex flex-wrap gap-2">
                {activeContact.tags?.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="tag-purple flex items-center space-x-1"
                    data-testid={`tag-${tag.toLowerCase()}`}
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1"
                      data-testid={`remove-tag-${tag.toLowerCase()}`}
                    >
                      <X className="w-3 h-3 cursor-pointer" />
                    </button>
                  </Badge>
                ))}
              </div>
              <button 
                className="text-primary text-sm hover:underline"
                data-testid="button-create-tag"
              >
                + Create & Add Tag
              </button>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Files & Media Accordion */}
        <div className="border-b border-border pb-4 mb-4">
          <Collapsible open={filesOpen} onOpenChange={setFilesOpen}>
            <CollapsibleTrigger 
              className="flex items-center justify-between w-full p-3 hover:bg-accent/50 rounded-md transition-colors"
              data-testid="accordion-files"
            >
              <span className="font-medium">Files & Media (200 MB)</span>
              {filesOpen ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pb-3 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Documents</span>
                <button 
                  onClick={() => setDocumentsModalOpen(true)}
                  className="text-primary text-sm hover:underline"
                  data-testid="button-view-documents"
                >
                  View all
                </button>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Images</span>
                <button className="text-primary text-sm hover:underline" data-testid="button-view-images">
                  View all
                </button>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Audio</span>
                <button className="text-primary text-sm hover:underline" data-testid="button-view-audio">
                  View all
                </button>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Video</span>
                <button className="text-primary text-sm hover:underline" data-testid="button-view-video">
                  View all
                </button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Block/Unblock Button */}
        <div className="mt-6">
          <Button
            onClick={handleToggleBlock}
            variant="outline"
            className="w-full border-destructive text-destructive hover:bg-destructive/10"
            data-testid="button-toggle-block"
          >
            <Slash className="w-4 h-4 mr-2" />
            {activeContact.isBlocked ? 'Unblock' : 'Block'} Incoming Messages
          </Button>
        </div>
      </div>
    </div>
  );
}
