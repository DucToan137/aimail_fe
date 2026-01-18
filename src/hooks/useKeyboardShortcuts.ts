import { useEffect, useRef } from "react";

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  description: string;
  handler: () => void;
  preventDefault?: boolean;
}

interface UseKeyboardShortcutsOptions {
  enabled?: boolean;
  shortcuts: KeyboardShortcut[];
}

/**
 * Custom hook for keyboard shortcuts
 * @param options Configuration object with shortcuts and enabled flag
 */
export function useKeyboardShortcuts({
  enabled = true,
  shortcuts,
}: UseKeyboardShortcutsOptions) {
  const shortcutsRef = useRef(shortcuts);

  // Update ref when shortcuts change
  useEffect(() => {
    shortcutsRef.current = shortcuts;
  }, [shortcuts]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      const target = event.target as HTMLElement;
      const isInputField =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      // Allow Escape key even in input fields
      if (isInputField && event.key !== "Escape") {
        return;
      }

      // Find matching shortcut
      const shortcut = shortcutsRef.current.find((s) => {
        const keyMatch =
          s.key.toLowerCase() === event.key.toLowerCase() ||
          s.key === event.code;
        const ctrlMatch = s.ctrlKey === undefined || s.ctrlKey === event.ctrlKey;
        const shiftMatch =
          s.shiftKey === undefined || s.shiftKey === event.shiftKey;
        const altMatch = s.altKey === undefined || s.altKey === event.altKey;
        const metaMatch =
          s.metaKey === undefined || s.metaKey === event.metaKey;

        return keyMatch && ctrlMatch && shiftMatch && altMatch && metaMatch;
      });

      if (shortcut) {
        if (shortcut.preventDefault !== false) {
          event.preventDefault();
        }
        shortcut.handler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled]);

  return null;
}
