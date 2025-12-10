import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import type { Mailbox } from '@/types/email';
import { 
  Inbox, 
  Star,
  FileEdit, 
  Archive, 
  Trash2, 
  Briefcase, 
  User,
  Mail,
  LogOut,
  ChevronDown,
  ChevronUp,
  Users,
  Tag,
  Bell,
  MessageSquare,
  Clock,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface MailboxListProps {
  mailboxes: Mailbox[];
  selectedMailboxId: string;
  onSelectMailbox: (mailboxId: string) => void;
  onDeleteLabel?: (labelId: string, labelName: string) => Promise<void>;
  isLoading?: boolean;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Inbox,
  Star,
  Clock,
  FileEdit,
  Archive,
  Trash2,
  Briefcase,
  User,
  Mail,
  Users,
  Tag,
  Bell,
  MessageSquare,
};

export function MailboxList({ mailboxes, selectedMailboxId, onSelectMailbox, onDeleteLabel, isLoading = false }: MailboxListProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showMore, setShowMore] = useState(false);
  const [labelToDelete, setLabelToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const mainMailboxes = mailboxes.filter(m => m.isMain);
  const secondaryMailboxes = mailboxes.filter(m => !m.isMain);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDeleteLabel = async () => {
    if (!labelToDelete || !onDeleteLabel) return;

    setIsDeleting(true);
    try {
      await onDeleteLabel(labelToDelete.id, labelToDelete.name);
      setLabelToDelete(null);
    } catch (error) {
      console.error('Failed to delete label:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 border-r">
      <div className="p-4 border-b bg-white">
        <h2 className="font-semibold text-lg">Mailboxes</h2>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <ul className="space-y-1">
            {mainMailboxes.map((mailbox) => {
            const Icon = iconMap[mailbox.icon] || Mail;
            const isSelected = mailbox.id === selectedMailboxId;
            
            return (
              <li key={mailbox.id}>
                <button
                  onClick={() => onSelectMailbox(mailbox.id)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                    isSelected
                      ? 'bg-blue-100 text-blue-900 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                  aria-label={`${mailbox.name} mailbox${mailbox.unreadCount ? `, ${mailbox.unreadCount} unread` : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{mailbox.name}</span>
                  </div>
                  {mailbox.unreadCount ? (
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        'ml-auto',
                        isSelected ? 'bg-blue-200 text-blue-900' : ''
                      )}
                    >
                      {mailbox.unreadCount}
                    </Badge>
                  ) : null}
                </button>
              </li>
            );
          })}

          {secondaryMailboxes.length > 0 && (
            <>
              <li>
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {showMore ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    <span>{showMore ? 'Show less' : 'More'}</span>
                  </div>
                </button>
              </li>

              {showMore && secondaryMailboxes.map((mailbox) => {
                const Icon = iconMap[mailbox.icon] || Mail;
                const isSelected = mailbox.id === selectedMailboxId;
                const isUserLabel = mailbox.type === 'user';
                
                return (
                  <li key={mailbox.id}>
                    <div className="relative group">
                      <button
                        onClick={() => onSelectMailbox(mailbox.id)}
                        className={cn(
                          'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                          isSelected
                            ? 'bg-blue-100 text-blue-900 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        )}
                        aria-label={`${mailbox.name} mailbox${mailbox.unreadCount ? `, ${mailbox.unreadCount} unread` : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4" />
                          <span>{mailbox.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {mailbox.unreadCount ? (
                            <Badge 
                              variant="secondary" 
                              className={cn(
                                isSelected ? 'bg-blue-200 text-blue-900' : ''
                              )}
                            >
                              {mailbox.unreadCount}
                            </Badge>
                          ) : null}
                        </div>
                      </button>
                      {isUserLabel && onDeleteLabel && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setLabelToDelete({ id: mailbox.id, name: mailbox.name });
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                          title="Delete label"
                        >
                          <X className="h-3 w-3 text-red-600" />
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </>
          )}
          </ul>
        )}
      </nav>
      
      {/* User Profile Section */}
      <div className="p-3 border-t bg-white">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start h-auto p-2 hover:bg-gray-100">
              <div className="flex items-center gap-3 w-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user ? getUserInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left overflow-hidden">
                  <p className="text-sm font-medium truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Delete Label Confirmation Dialog */}
      <AlertDialog open={!!labelToDelete} onOpenChange={(open) => !open && setLabelToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Label</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the label "{labelToDelete?.name}"? This will remove the label from all emails and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteLabel}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
