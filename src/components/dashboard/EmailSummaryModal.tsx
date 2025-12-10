import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, X } from 'lucide-react';
import type { EmailSummaryResponse } from '@/types/email';
import { emailService } from '@/services/emailService';
import { toast } from 'sonner';

interface EmailSummaryModalProps {
  open: boolean;
  onClose: () => void;
  messageId: string;
  emailSubject?: string;
}

export function EmailSummaryModal({
  open,
  onClose,
  messageId,
  emailSubject,
}: EmailSummaryModalProps) {
  const [summary, setSummary] = useState<EmailSummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && messageId) {
      fetchSummary();
    } else {
      // Reset state when modal closes
      setSummary(null);
      setError(null);
    }
  }, [open, messageId]);

  const fetchSummary = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await emailService.summarizeEmail(messageId);
      setSummary(result);
    } catch (err) {
      console.error('Failed to fetch email summary:', err);
      setError('Failed to generate summary. Please try again.');
      toast.error('Failed to generate summary');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="h-5 w-5 text-purple-600" />
              AI Email Summary
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {emailSubject && (
            <DialogDescription className="text-left">
              {emailSubject}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="mt-4">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
              <p className="text-sm text-gray-500">
                Generating AI summary...
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-700 text-sm">{error}</p>
              <Button
                onClick={fetchSummary}
                variant="outline"
                size="sm"
                className="mt-3"
              >
                Try Again
              </Button>
            </div>
          )}

          {summary && !isLoading && (
            <div className="space-y-6">
              {/* One-line subject */}
              {summary.oneLineSubject && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-purple-900 mb-2">
                    📌 Quick Summary
                  </h3>
                  <p className="text-purple-800 font-medium">
                    {summary.oneLineSubject}
                  </p>
                </div>
              )}

              {/* Bullet points */}
              {summary.bullets && summary.bullets.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    🔑 Key Points
                  </h3>
                  <ul className="space-y-2">
                    {summary.bullets.map((bullet, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-semibold mt-0.5">
                          {index + 1}
                        </span>
                        <span className="flex-1 pt-0.5">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full summary */}
              {summary.summary && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    📄 Full Summary
                  </h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {summary.summary}
                    </p>
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="border-t pt-4 space-y-2 text-xs text-gray-500">
                {summary.from && (
                  <div>
                    <span className="font-semibold">From:</span> {summary.from}
                  </div>
                )}
                {summary.to && (
                  <div>
                    <span className="font-semibold">To:</span> {summary.to}
                  </div>
                )}
                {summary.date && (
                  <div>
                    <span className="font-semibold">Date:</span> {summary.date}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
