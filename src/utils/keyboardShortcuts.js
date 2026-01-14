/**
 * Global Keyboard Shortcuts for Nexus
 * Handles all keyboard shortcuts across the app
 */

export const SHORTCUTS = {
  // Navigation shortcuts
  'p': { name: 'Games', action: 'navigate', target: '/games', description: 'Open Games' },
  'g': { name: 'Games', action: 'navigate', target: '/games', description: 'Open Games' },
  's': { name: 'Study Tools', action: 'navigate', target: '/studytools', description: 'Open Study Tools' },
  'm': { name: 'Music', action: 'navigate', target: '/music', description: 'Open Music' },
  'v': { name: 'Videos', action: 'navigate', target: '/videos', description: 'Open Videos' },
  'b': { name: 'Browser', action: 'navigate', target: '/browser', description: 'Open Browser' },
  'u': { name: 'Utilities', action: 'navigate', target: '/utilities', description: 'Open Utilities' },
  'd': { name: 'Dashboard', action: 'navigate', target: '/dashboard', description: 'Go to Dashboard' },
  'h': { name: 'Habits', action: 'navigate', target: '/habits', description: 'Open Habits' },
  'a': { name: 'Analytics', action: 'navigate', target: '/analytics', description: 'Open Analytics' },
  
  // Special actions
  'Escape': { name: 'Panic Mode', action: 'panic', description: 'Activate Panic Mode (ESC)' },
  '?': { name: 'Help', action: 'help', description: 'Show keyboard shortcuts' },
};

/**
 * Check if keyboard shortcut should be ignored
 * (e.g., when user is typing in an input field)
 */
export function shouldIgnoreShortcut(event) {
  const target = event.target;
  const tagName = target.tagName.toLowerCase();
  
  // Ignore if user is typing in input/textarea
  if (tagName === 'input' || tagName === 'textarea' || target.isContentEditable) {
    return true;
  }
  
  // Ignore if modifier keys are pressed (Ctrl, Alt, Meta)
  // except for Escape which should always work
  if (event.key !== 'Escape' && (event.ctrlKey || event.altKey || event.metaKey)) {
    return true;
  }
  
  return false;
}

export default SHORTCUTS;
