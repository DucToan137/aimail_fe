import { useState } from 'react';
import type { Email, Mailbox } from '@/types/email';
import { KanbanColumn } from './KanbanColumn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

interface KanbanBoardProps {
  mailboxes: Mailbox[];
  emails: Email[];
  selectedEmailId: string | null;
  onEmailSelect: (emailId: string) => void;
  onEmailMove: (emailId: string, targetMailboxId: string) => Promise<void>;
  onCreateLabel: (labelName: string) => Promise<void>;
  onRefresh: () => void;
}

export function KanbanBoard({
  mailboxes,
  emails,
  selectedEmailId,
  onEmailSelect,
  onEmailMove,
  onCreateLabel,
  onRefresh,
}: KanbanBoardProps) {
  const [draggedEmailId, setDraggedEmailId] = useState<string | null>(null);
  const [newLabelName, setNewLabelName] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreatingLabel, setIsCreatingLabel] = useState(false);

  // Filter to show main mailboxes and custom labels (exclude system categories)
  const kanbanColumns = mailboxes.filter(
    (m) => m.isMain || m.type === 'custom'
  );

  const handleDragStart = (emailId: string) => {
    setDraggedEmailId(emailId);
  };

  const handleDragEnd = () => {
    setDraggedEmailId(null);
  };

  const handleDrop = async (targetMailboxId: string) => {
    if (!draggedEmailId) return;
    
    try {
      await onEmailMove(draggedEmailId, targetMailboxId);
      onRefresh();
    } catch (error) {
      console.error('Failed to move email:', error);
    } finally {
      setDraggedEmailId(null);
    }
  };

  const handleCreateLabel = async () => {
    if (!newLabelName.trim()) return;

    setIsCreatingLabel(true);
    try {
      await onCreateLabel(newLabelName.trim());
      setNewLabelName('');
      setIsCreateDialogOpen(false);
      onRefresh();
    } catch (error) {
      console.error('Failed to create label:', error);
    } finally {
      setIsCreatingLabel(false);
    }
  };

  const getEmailsForMailbox = (mailboxId: string): Email[] => {
    // For INBOX, show emails that are in INBOX mailbox
    // For other mailboxes, we'll need to fetch them separately or track labels better
    // For now, we'll show all emails in INBOX by default, and filter based on mailboxId for others
    return emails.filter((email) => {
      // If the email has a mailboxId set, use that for filtering
      if (email.mailboxId) {
        return email.mailboxId === mailboxId;
      }
      // Otherwise, show in INBOX by default
      return mailboxId === 'INBOX';
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Kanban View</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Column
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Label</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Input
                  placeholder="Label name (e.g., To Do, Done)"
                  value={newLabelName}
                  onChange={(e) => setNewLabelName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateLabel();
                    }
                  }}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreateDialogOpen(false);
                    setNewLabelName('');
                  }}
                  disabled={isCreatingLabel}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateLabel}
                  disabled={!newLabelName.trim() || isCreatingLabel}
                >
                  {isCreatingLabel ? 'Creating...' : 'Create'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full gap-4 p-4 min-w-max">
          {kanbanColumns.map((mailbox) => (
            <KanbanColumn
              key={mailbox.id}
              mailbox={mailbox}
              emails={getEmailsForMailbox(mailbox.id)}
              selectedEmailId={selectedEmailId}
              draggedEmailId={draggedEmailId}
              onEmailSelect={onEmailSelect}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
