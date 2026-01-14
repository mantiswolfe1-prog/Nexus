import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SHORTCUTS, shouldIgnoreShortcut } from '../../utils/keyboardShortcuts.js';
import ShortcutsModal from './ShortcutsModal.js';

export default function KeyboardHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Ignore shortcuts when typing
      if (shouldIgnoreShortcut(event)) {
        return;
      }

      const key = event.key.toLowerCase();
      const shortcut = SHORTCUTS[key] || SHORTCUTS[event.key]; // Check both lowercase and original

      if (!shortcut) {
        return;
      }

      // Handle different action types
      switch (shortcut.action) {
        case 'navigate':
          // Don't navigate if already on the page
          if (location.pathname !== shortcut.target) {
            event.preventDefault();
            navigate(shortcut.target);
          }
          break;

        case 'panic':
          event.preventDefault();
          handlePanicMode();
          break;

        case 'help':
          event.preventDefault();
          setShowHelp(true);
          break;

        default:
          break;
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate, location]);

  const handlePanicMode = () => {
    // Stop any audio/video
    document.querySelectorAll('audio, video').forEach(el => {
      el.pause();
      el.currentTime = 0;
    });
    
    // Clear any sensitive data from session storage
    try {
      sessionStorage.clear();
    } catch (e) {
      console.error('Failed to clear session storage:', e);
    }
    
    // Redirect to safe page
    window.location.href = 'https://www.google.com/search?q=math+homework';
  };

  return <ShortcutsModal isOpen={showHelp} onClose={() => setShowHelp(false)} />;
}
