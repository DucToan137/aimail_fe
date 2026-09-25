import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import type { Mailbox } from "@/types/email";
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
  Settings,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SettingsModal } from "@/components/settings/SettingsModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

export function MailboxList({
  mailboxes,
  selectedMailboxId,
  onSelectMailbox,
  onDeleteLabel,
  isLoading = false,
}: MailboxListProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [labelToDelete, setLabelToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const mainMailboxes = mailboxes.filter((m) => m.isMain);
  const secondaryMailboxes = mailboxes.filter((m) => !m.isMain);

  const getMailboxDisplayName = (mailbox: Mailbox) => {
    const id = mailbox.id.toUpperCase();
    const name = (mailbox.name || "").toUpperCase();
    const type = (mailbox.type || "").toUpperCase();

    if (id === "INBOX" || name === "INBOX") return t("nav.inbox");
    if (id === "STARRED" || name === "STARRED") return t("nav.starred");
    if (id === "SENT" || name === "SENT") return t("nav.sent");
    if (id === "DRAFT" || id === "DRAFTS" || name === "DRAFT" || name === "DRAFTS") return t("nav.drafts");
    if (id === "TRASH" || name === "TRASH") return t("nav.trash");
    if (id === "SPAM" || name === "SPAM") return t("nav.spam");
    if (id === "SNOOZED" || name === "SNOOZED" || type === "SNOOZED" || name.includes("SNOOZE")) return t("nav.snoozed");

    // Gmail system category labels
    if (id === "IMPORTANT" || name === "IMPORTANT") return language === "vi" ? "Quan trọng" : "Important";
    if (id === "CATEGORY_FORUMS" || name === "FORUMS" || name === "CATEGORY_FORUMS") return language === "vi" ? "Diễn đàn" : "Forums";
    if (id === "CATEGORY_UPDATES" || name === "UPDATES" || name === "CATEGORY_UPDATES") return language === "vi" ? "Cập nhật" : "Updates";
    if (id === "CATEGORY_PERSONAL" || name === "PERSONAL" || name === "CATEGORY_PERSONAL") return language === "vi" ? "Cá nhân" : "Personal";
    if (id === "CATEGORY_PROMOTIONS" || name === "PROMOTIONS" || name === "CATEGORY_PROMOTIONS") return language === "vi" ? "Quảng cáo" : "Promotions";
    if (id === "CATEGORY_SOCIAL" || name === "SOCIAL" || name === "CATEGORY_SOCIAL") return language === "vi" ? "Mạng xã hội" : "Social";

    return mailbox.name;
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success(language === "vi" ? "Đã đăng xuất" : "Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(language === "vi" ? "Đăng xuất thất bại" : "Logout failed");
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
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
      console.error("Failed to delete label:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#fafafa] dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
        <h2 className="font-semibold text-lg tracking-tight">{t("nav.mailboxes")}</h2>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-10 bg-zinc-200 dark:bg-zinc-800/80 rounded-lg animate-pulse"
              />
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
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                      isSelected
                        ? "bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 font-medium"
                        : "text-zinc-700 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-100",
                    )}
                    aria-label={`${mailbox.name} mailbox${
                      mailbox.unreadCount
                        ? `, ${mailbox.unreadCount} unread`
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{getMailboxDisplayName(mailbox)}</span>
                    </div>
                    {mailbox.unreadCount ? (
                      <Badge
                        variant="secondary"
                        className={cn(
                          "ml-auto",
                          isSelected
                            ? "bg-blue-200 dark:bg-blue-900/60 text-blue-900 dark:text-blue-200"
                            : "",
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
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {showMore ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                      <span>
                        {showMore
                          ? language === "vi"
                            ? "Thu gọn"
                            : "Show less"
                          : language === "vi"
                          ? "Xem thêm"
                          : "More"}
                      </span>
                    </div>
                  </button>
                </li>

                {showMore &&
                  secondaryMailboxes.map((mailbox) => {
                    const Icon = iconMap[mailbox.icon] || Mail;
                    const isSelected = mailbox.id === selectedMailboxId;
                    const isUserLabel = mailbox.type === "user";

                    return (
                      <li key={mailbox.id}>
                        <div className="relative group">
                          <button
                            onClick={() => onSelectMailbox(mailbox.id)}
                            className={cn(
                              "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                              isSelected
                                ? "bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 font-medium"
                                : "text-zinc-700 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-100",
                            )}
                            aria-label={`${mailbox.name} mailbox${
                              mailbox.unreadCount
                                ? `, ${mailbox.unreadCount} unread`
                                : ""
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="h-4 w-4" />
                              <span>{getMailboxDisplayName(mailbox)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {mailbox.unreadCount ? (
                                <Badge
                                  variant="secondary"
                                  className={cn(
                                    isSelected
                                      ? "bg-blue-200 dark:bg-blue-900/60 text-blue-900 dark:text-blue-200"
                                      : "",
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
                                setLabelToDelete({
                                  id: mailbox.id,
                                  name: mailbox.name,
                                });
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 dark:hover:bg-red-950/50 rounded"
                              title={language === "vi" ? "Xóa nhãn" : "Delete label"}
                            >
                              <X className="h-3 w-3 text-red-600 dark:text-red-400" />
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
      <div className="p-3 border-t bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex-1 justify-start h-auto p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
            >
              <div className="flex items-center gap-3 w-full min-w-0">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user ? getUserInitials(user.name) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left overflow-hidden">
                  <p className="text-sm font-medium truncate text-zinc-900 dark:text-zinc-100">{user?.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsSettingsOpen(true)} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>{t("common.settings")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t("common.logout")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSettingsOpen(true)}
            className="w-8 h-8 p-0 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 cursor-pointer"
            title={t("common.settings")}
          >
            <Settings className="w-4 h-4" />
          </Button>
          <ThemeToggle />
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />

      {/* Delete Label Confirmation Dialog */}
      <AlertDialog
        open={!!labelToDelete}
        onOpenChange={(open) => !open && setLabelToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{language === "vi" ? "Xóa nhãn" : "Delete Label"}</AlertDialogTitle>
            <AlertDialogDescription>
              {language === "vi"
                ? `Bạn có chắc chắn muốn xóa nhãn "${labelToDelete?.name}"? Thao tác này sẽ gỡ nhãn khỏi toàn bộ email và không thể hoàn tác.`
                : `Are you sure you want to delete the label "${labelToDelete?.name}"? This will remove the label from all emails and cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteLabel}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white"
            >
              {isDeleting ? (language === "vi" ? "Đang xóa..." : "Deleting...") : t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
