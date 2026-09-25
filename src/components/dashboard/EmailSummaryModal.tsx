import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
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
  const { language } = useLanguage();
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
      setError(
        language === 'vi'
          ? 'Không thể tạo tóm tắt. Vui lòng thử lại.'
          : 'Failed to generate summary. Please try again.',
      );
      toast.error(
        language === 'vi'
          ? 'Không thể tạo tóm tắt'
          : 'Failed to generate summary',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-purple-600" />
            {language === 'vi' ? 'Tóm tắt email bằng AI' : 'AI Email Summary'}
          </DialogTitle>
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
                {language === 'vi'
                  ? 'Đang tạo tóm tắt AI...'
                  : 'Generating AI summary...'}
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
                {language === 'vi' ? 'Thử lại' : 'Try Again'}
              </Button>
            </div>
          )}

          {summary && !isLoading && (
            <div className="space-y-6">
              {/* One-line subject */}
              {summary.oneLineSubject && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-purple-900 mb-2">
                    {language === 'vi' ? '📌 Tóm tắt nhanh' : '📌 Quick Summary'}
                  </h3>
                  <p className="text-purple-800 font-medium">
                    {summary.oneLineSubject}
                  </p>
                </div>
              )}

              {/* Bullet points */}
              {summary.bullets && summary.bullets.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    {language === 'vi' ? '🔑 Điểm chính' : '🔑 Key Points'}
                  </h3>
                  <ul className="space-y-2">
                    {summary.bullets.map((bullet, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center text-xs font-semibold mt-0.5">
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
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    {language === 'vi' ? '📄 Tóm tắt chi tiết' : '📄 Full Summary'}
                  </h3>
                  <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                      {summary.summary}
                    </p>
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
                {summary.from && (
                  <div>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                      {language === 'vi' ? 'Người gửi:' : 'From:'}
                    </span>{' '}
                    {summary.from}
                  </div>
                )}
                {summary.to && (
                  <div>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                      {language === 'vi' ? 'Người nhận:' : 'To:'}
                    </span>{' '}
                    {summary.to}
                  </div>
                )}
                {summary.date && (
                  <div>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                      {language === 'vi' ? 'Ngày:' : 'Date:'}
                    </span>{' '}
                    {summary.date}
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
