import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import type { Email } from "@/types/email";
import {
  Star,
  Paperclip,
  RefreshCw,
  Trash2,
  Mail,
  MailOpen,
  Edit,
  Inbox,
  Trash,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EmailSummaryModal } from "./EmailSummaryModal";

interface EmailListProps {
  emails: Email[];
  selectedEmailId: string | null;
  mailboxId: string;
  onSelectEmail: (emailId: string) => void;
  onToggleStar: (emailId: string) => void;
  onRefresh: () => void;
  onCompose: () => void;
  onDelete: (emailIds: string[]) => void;
  onPermanentDelete?: (emailIds: string[]) => void;
  onMoveToInbox?: (emailIds: string[]) => void;
  onToggleRead: (emailIds: string[]) => void;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  hideActionButtons?: boolean;
}

export function EmailList({
  emails,
  selectedEmailId,
  mailboxId,
  onSelectEmail,
  onToggleStar,
  onRefresh,
  onCompose,
  onDelete,
  onPermanentDelete,
  onMoveToInbox,
  onToggleRead,
  isLoading = false,
  isLoadingMore = false,
  hasMore = false,
  onLoadMore,
  hideActionButtons = false,
}: EmailListProps) {
  const { t, language } = useLanguage();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [summaryEmailId, setSummaryEmailId] = useState<string | null>(null);
  const [summaryEmailSubject, setSummaryEmailSubject] = useState<
    string | undefined
  >();

  const handleSelectAll = () => {
    if (selectedIds.size === emails.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(emails.map((e) => e.id)));
    }
  };

  const handleToggleSelect = (emailId: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(emailId)) {
      newSelected.delete(emailId);
    } else {
      newSelected.add(emailId);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkDelete = () => {
    if (mailboxId === "TRASH" && onPermanentDelete) {
      setShowDeleteDialog(true);
    } else {
      onDelete(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };

  const confirmPermanentDelete = () => {
    if (onPermanentDelete) {
      onPermanentDelete(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
    setShowDeleteDialog(false);
  };

  const handleBulkMoveToInbox = () => {
    if (onMoveToInbox) {
      onMoveToInbox(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };

  const handleBulkToggleRead = () => {
    onToggleRead(Array.from(selectedIds));
    setSelectedIds(new Set());
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const locale = language === "vi" ? "vi-VN" : "en-US";

    if (days === 0) {
      return date.toLocaleTimeString(locale, {
        hour: "numeric",
        minute: "2-digit",
      });
    } else if (days === 1) {
      return language === "vi" ? "Hôm qua" : "Yesterday";
    } else if (days < 7) {
      return date.toLocaleDateString(locale, { weekday: "short" });
    } else {
      return date.toLocaleDateString(locale, {
        month: "short",
        day: "numeric",
      });
    }
  };

  const formatSnoozeTime = (snoozedUntil: string) => {
    const date = new Date(snoozedUntil);
    const now = new Date();
    const locale = language === "vi" ? "vi-VN" : "en-US";

    const timeStr = date.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "2-digit",
    });

    if (date.toDateString() === now.toDateString()) {
      return language === "vi" ? `Hôm nay, ${timeStr}` : `Today, ${timeStr}`;
    }

    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
      return language === "vi" ? `Ngày mai, ${timeStr}` : `Tomorrow, ${timeStr}`;
    }

    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7 && diffDays > 0) {
      const dayName = date.toLocaleDateString(locale, { weekday: "short" });
      return `${dayName}, ${timeStr}`;
    }

    const dateStr = date.toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
    });
    return `${dateStr}, ${timeStr}`;
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800">
      {/* Action Bar */}
      {(!hideActionButtons || selectedIds.size > 0) && (
        <div className="p-2 sm:p-4 border-b border-zinc-200 dark:border-zinc-800 space-y-2 bg-white dark:bg-zinc-950">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {!hideActionButtons && (
              <Button onClick={onCompose} size="sm" className="gap-1.5">
                <Edit className="h-4 w-4" />
                <span className="hidden xs:inline">{t("nav.compose")}</span>
              </Button>
            )}
            {!hideActionButtons && (
              <Button
                onClick={onRefresh}
                variant="outline"
                size="sm"
                className="gap-1.5"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="hidden xs:inline">{t("common.refresh")}</span>
              </Button>
            )}
          </div>

          {selectedIds.size > 0 && (
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                {selectedIds.size} {language === "vi" ? "đã chọn" : "selected"}
              </span>

              {mailboxId === "TRASH" ? (
                <>
                  <Button
                    onClick={handleBulkDelete}
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-red-600 hover:text-red-700"
                  >
                    <Trash className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden xs:inline">
                      {language === "vi" ? "Xóa vĩnh viễn" : "Delete Forever"}
                    </span>
                  </Button>
                  <Button
                    onClick={handleBulkMoveToInbox}
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                  >
                    <Inbox className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden xs:inline">
                      {language === "vi" ? "Chuyển vào Hộp thư" : "Move to Inbox"}
                    </span>
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleBulkDelete}
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                >
                  <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">{t("common.delete")}</span>
                </Button>
              )}

              <Button
                onClick={handleBulkToggleRead}
                variant="outline"
                size="sm"
                className="gap-1.5"
              >
                <MailOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">
                  {language === "vi" ? "Đổi trạng thái đọc" : "Toggle Read"}
                </span>
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {!isLoading && (
            <div className="px-2 sm:px-4 py-2 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2 sm:gap-3">
              <Checkbox
                checked={
                  selectedIds.size === emails.length && emails.length > 0
                }
                onCheckedChange={handleSelectAll}
                aria-label="Select all emails"
              />
              <span className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                {emails.length} {language === "vi" ? "thư" : emails.length === 1 ? "email" : "emails"}
              </span>
            </div>
          )}

          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-600" />
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                {language === "vi" ? "Đang tải..." : "Loading..."}
              </p>
            </div>
          ) : null}

          {!isLoading && emails.length === 0 ? (
            <div className="p-4 sm:p-8 text-center text-zinc-500 dark:text-zinc-400">
              <Mail className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 opacity-50" />
              <p className="text-xs sm:text-sm">
                {language === "vi" ? "Không có thư nào trong thư mục này" : "No emails in this folder"}
              </p>
            </div>
          ) : null}

          {!isLoading &&
            emails.map((email) => {
              const isSelected = email.id === selectedEmailId;
              const isChecked = selectedIds.has(email.id);
              const isSkeleton =
                email.from.name === "(Unknown)" ||
                (!email.subject && !email.preview);

              return (
                <div
                  key={email.id}
                  className={cn(
                    "px-2 sm:px-4 py-2 sm:py-3 cursor-pointer transition-colors border-l-4",
                    isSelected && "bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-50 dark:hover:bg-blue-950/50",
                    !email.isRead
                      ? "bg-blue-50/30 dark:bg-blue-950/20 border-l-blue-500 font-medium"
                      : "border-l-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
                  )}
                  onClick={() => onSelectEmail(email.id)}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    {/* Checkbox */}
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() => handleToggleSelect(email.id)}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Select email from ${email.from.name}`}
                    />

                    {/* Star */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStar(email.id);
                      }}
                      className="mt-0.5 sm:mt-1 shrink-0"
                      aria-label={
                        email.isStarred ? "Unstar email" : "Star email"
                      }
                    >
                      <Star
                        className={cn(
                          "h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors",
                          email.isStarred
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-zinc-400 dark:text-zinc-600 hover:text-yellow-400",
                        )}
                      />
                    </button>

                    {/* Email Content */}
                    <div className="flex-1 min-w-0 overflow-hidden">
                      {isSkeleton ? (
                        <div className="animate-pulse">
                          <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5 sm:mb-1">
                            <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
                            <div className="ml-auto h-3 w-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
                          </div>
                          <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded mb-1" />
                          <div className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5 sm:mb-1">
                            <span
                              className={cn(
                                "text-xs sm:text-sm truncate flex-1 min-w-0",
                                !email.isRead
                                  ? "font-semibold text-zinc-900 dark:text-zinc-100"
                                  : "text-zinc-700 dark:text-zinc-300",
                              )}
                            >
                              {email.from.name}
                            </span>
                            <div className="flex items-center gap-1 shrink-0">
                              {email.hasAttachments && (
                                <Paperclip className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-zinc-400 dark:text-zinc-500" />
                              )}
                              {email.snoozedUntil ? (
                                <>
                                  <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-500" />
                                  <span className="text-[10px] sm:text-xs text-blue-600 dark:text-blue-400 whitespace-nowrap font-medium">
                                    {formatSnoozeTime(email.snoozedUntil)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                                  {formatTime(email.timestamp)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div
                            className={cn(
                              "text-xs sm:text-sm truncate mb-0.5 sm:mb-1",
                              !email.isRead
                                ? "font-semibold text-zinc-900 dark:text-zinc-100"
                                : "text-zinc-600 dark:text-zinc-400",
                            )}
                          >
                            {email.subject}
                          </div>
                          <div
                            className={cn(
                              "text-xs sm:text-sm truncate",
                              !email.isRead
                                ? "text-zinc-700 dark:text-zinc-300 font-medium"
                                : "text-zinc-500 dark:text-zinc-400",
                            )}
                          >
                            {email.preview}
                          </div>

                          {/* AI Summary Button */}
                          <div className="mt-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSummaryEmailId(
                                  email.messages?.[0]?.id || email.id,
                                );
                                setSummaryEmailSubject(email.subject);
                              }}
                              className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/40 border border-purple-200 dark:border-purple-800/60 rounded transition-colors"
                            >
                              <Sparkles className="h-3 w-3" />
                              {t("email.aiSummary")}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

          {!isLoading && hasMore && (
            <div className="p-4 text-center border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
              {isLoadingMore ? (
                <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent text-blue-600" />
                  {language === "vi" ? "Đang tải thêm..." : "Loading more..."}
                </div>
              ) : (
                <Button
                  onClick={onLoadMore}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto min-w-[120px]"
                >
                  {language === "vi" ? "Tải thêm" : "Load More"}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === "vi" ? "Xóa vĩnh viễn?" : "Delete Forever?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === "vi"
                ? `Hành động này sẽ xóa vĩnh viễn ${selectedIds.size} thư đã chọn. Thao tác này không thể hoàn tác.`
                : `This will permanently delete ${selectedIds.size} email${selectedIds.size > 1 ? "s" : ""}. This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmPermanentDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {language === "vi" ? "Xóa vĩnh viễn" : "Delete Forever"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Email Summary Modal */}
      <EmailSummaryModal
        open={!!summaryEmailId}
        onClose={() => {
          setSummaryEmailId(null);
          setSummaryEmailSubject(undefined);
        }}
        messageId={summaryEmailId || ""}
        emailSubject={summaryEmailSubject}
      />
    </div>
  );
}
