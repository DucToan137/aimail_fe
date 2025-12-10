import { useState } from 'react';
import type { Email } from '@/types/email';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { EmailSummaryModal } from './EmailSummaryModal';
import { cn } from '@/lib/utils';
import { Paperclip, Star, Sparkles } from 'lucide-react';

interface KanbanCardProps {
  email: Email;
  isSelected: boolean;
  isDragging: boolean;
  onSelect: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

export function KanbanCard({
  email,
  isSelected,
  isDragging,
  onSelect,
  onDragStart,
  onDragEnd,
}: KanbanCardProps) {
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getInitials = (name: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAISummary = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card selection when clicking AI Summary button
    setShowSummaryModal(true);
  };

  return (
    <Card
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move';
        onDragStart();
      }}
      onDragEnd={onDragEnd}
      onClick={onSelect}
      className={cn(
        'cursor-pointer transition-all hover:shadow-md',
        isSelected && 'ring-2 ring-primary',
        isDragging && 'opacity-50',
        !email.isRead && 'bg-accent/50'
      )}
    >
      <CardContent className="px-3  space-y-2">
        {/* Sender */}
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {getInitials(email.from.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className={cn(
              'text-sm truncate',
              !email.isRead && 'font-semibold'
            )}>
              {email.from.name || email.from.email}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDate(email.timestamp)}
            </p>
          </div>
          {email.isStarred && (
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          )}
        </div>

        {/* Subject */}
        <h4 className={cn(
          'text-sm line-clamp-2',
          !email.isRead && 'font-semibold'
        )}>
          {email.subject}
        </h4>

        {/* Preview */}
        <p className="text-xs text-muted-foreground line-clamp-2">
          {email.preview}
        </p>

        {/* AI Summary Button */}
        <Button
          onClick={handleAISummary}
          variant="outline"
          size="sm"
          className="w-full gap-1.5   from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 border-purple-200 text-purple-700 hover:text-purple-800"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">AI Summary</span>
        </Button>

        {/* Metadata */}
        <div className="flex items-center gap-2 pt-1">
          {email.hasAttachments && (
            <Badge variant="secondary" className="text-xs">
              <Paperclip className="h-3 w-3 mr-1" />
              {email.attachments?.length || 1}
            </Badge>
          )}
          {!email.isRead && (
            <Badge variant="default" className="text-xs">
              Unread
            </Badge>
          )}
        </div>
      </CardContent>

      {/* Email Summary Modal */}
      <EmailSummaryModal
        open={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        messageId={email.messages?.[0]?.id || email.id}
        emailSubject={email.subject}
      />
    </Card>
  );
}
