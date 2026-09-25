import { Filter, SortAsc, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export interface EmailFilterOptions {
  sort: "newest" | "oldest" | "sender";
  unreadOnly: boolean;
  hasAttachments: boolean;
}

interface EmailFiltersProps {
  filters: EmailFilterOptions;
  onFiltersChange: (filters: EmailFilterOptions) => void;
  onClear?: () => void;
  className?: string;
  compact?: boolean;
}

export function EmailFilters({
  filters,
  onFiltersChange,
  onClear,
  className,
  compact,
}: EmailFiltersProps) {
  const { language } = useLanguage();
  const hasActiveFilters = filters.unreadOnly || filters.hasAttachments;

  const handleSortChange = (sort: "newest" | "oldest" | "sender") => {
    onFiltersChange({ ...filters, sort });
  };

  const handleFilterToggle = (key: "unreadOnly" | "hasAttachments") => {
    onFiltersChange({ ...filters, [key]: !filters[key] });
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size={compact ? "icon-sm" : "sm"}
            className="gap-2"
          >
            {filters.sort === "newest" ? (
              <SortDesc className="h-4 w-4" />
            ) : (
              <SortAsc className="h-4 w-4" />
            )}
            <span className={cn("hidden", !compact && "sm:inline")}>
              {language === "vi" ? "Sắp xếp" : "Sort"}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{language === "vi" ? "Sắp xếp theo" : "Sort by"}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleSortChange("newest")}
            className={cn(filters.sort === "newest" && "bg-accent")}
          >
            <SortDesc className="h-4 w-4 mr-2" />
            {language === "vi" ? "Mới nhất trước" : "Newest First"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleSortChange("oldest")}
            className={cn(filters.sort === "oldest" && "bg-accent")}
          >
            <SortAsc className="h-4 w-4 mr-2" />
            {language === "vi" ? "Cũ nhất trước" : "Oldest First"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleSortChange("sender")}
            className={cn(filters.sort === "sender" && "bg-accent")}
          >
            <span className="mr-2">👤</span>
            {language === "vi" ? "Theo người gửi" : "By Sender"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filter Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size={compact ? "icon-sm" : "sm"}
            className="gap-2 relative"
          >
            <Filter className="h-4 w-4" />
            <span className={cn("hidden", !compact && "sm:inline")}>
              {language === "vi" ? "Bộ lọc" : "Filter"}
            </span>
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{language === "vi" ? "Lọc theo" : "Filter by"}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={filters.unreadOnly}
            onCheckedChange={() => handleFilterToggle("unreadOnly")}
          >
            {language === "vi" ? "Chỉ thư chưa đọc" : "Unread only"}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filters.hasAttachments}
            onCheckedChange={() => handleFilterToggle("hasAttachments")}
          >
            {language === "vi" ? "Có tệp đính kèm" : "Has attachments"}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onFiltersChange({
              ...filters,
              unreadOnly: false,
              hasAttachments: false,
            });
            // Trigger reload/sync after clearing
            onClear?.();
          }}
          className="text-xs"
        >
          {language === "vi" ? "Xóa bộ lọc" : "Clear"}
        </Button>
      )}
    </div>
  );
}
