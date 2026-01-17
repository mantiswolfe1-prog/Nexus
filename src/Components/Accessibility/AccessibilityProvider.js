import { useEffect } from 'react';
import { useSettings } from '../../hooks/useSettings.js';

export default function AccessibilityProvider({ children }) {
  const { settings } = useSettings();

  useEffect(() => {
    const root = document.documentElement;
    const a11y = settings.accessibility || {};
    
    // Theme Mode
    if (settings.theme?.mode === 'light') {
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f5f5f5');
      root.style.setProperty('--text-primary', '#000000');
      root.style.setProperty('--text-secondary', '#666666');
    } else if (settings.theme?.mode === 'amoled') {
      root.style.setProperty('--bg-primary', '#000000');
      root.style.setProperty('--bg-secondary', '#0a0a0a');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#a0a0a0');
    } else {
      root.style.setProperty('--bg-primary', settings.theme?.background || '#0a0a0f');
      root.style.setProperty('--bg-secondary', '#1a1a1f');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#a0a0a0');
    }

    // Accent Color
    root.style.setProperty('--accent-color', settings.theme?.accent || '#00f0ff');

    // Contrast
    if (settings.theme?.contrast === 'high') {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Blur & Transparency
    root.classList.toggle('no-blur', !settings.theme?.blur);
    root.classList.toggle('no-transparency', !settings.theme?.transparency);

    // Layout Density
    root.setAttribute('data-density', settings.layout?.density || 'default');

    // Motion & Animations
    const animationLevel = settings.motion?.animations || 'full';
    root.setAttribute('data-animations', animationLevel);
    root.classList.toggle('no-animations', animationLevel === 'none');
    root.classList.toggle('reduced-motion', animationLevel === 'reduced');

    // === Visual Accessibility ===
    root.classList.toggle('grayscale-mode', a11y.grayscale);
    
    // Colorblind Modes
    root.setAttribute('data-colorblind', a11y.colorblindMode || 'none');
    root.classList.toggle('colorblind-deuteranopia', a11y.colorblindMode === 'deuteranopia');
    root.classList.toggle('colorblind-protanopia', a11y.colorblindMode === 'protanopia');
    root.classList.toggle('colorblind-tritanopia', a11y.colorblindMode === 'tritanopia');
    root.classList.toggle('colorblind-achromatopsia', a11y.colorblindMode === 'achromatopsia');
    
    // Cursor
    root.setAttribute('data-cursor-size', a11y.cursorSize || 'normal');
    root.classList.toggle('cursor-highlight', a11y.cursorHighlight);
    
    // Links & Labels
    root.classList.toggle('link-underlines', a11y.linkUnderlines);
    root.classList.toggle('icon-labels', a11y.iconLabels);
    
    // Text Selection Color
    if (a11y.textSelectionColor) {
      root.style.setProperty('--selection-color', a11y.textSelectionColor);
    }

    // === Reading Support ===
    root.classList.toggle('dyslexia-font', a11y.dyslexiaFont);
    root.classList.toggle('reading-ruler', a11y.readingRuler);
    root.setAttribute('data-line-height', a11y.lineHeight || 'normal');
    root.classList.toggle('focus-mode', a11y.focusMode);
    root.classList.toggle('bionic-reading', a11y.bionicReading);
    root.classList.toggle('reading-guide', a11y.readingGuide);
    root.classList.toggle('large-text', a11y.largeText);

    // === Audio & Feedback ===
    root.setAttribute('data-sound-effects', a11y.soundEffects ? 'on' : 'off');
    root.setAttribute('data-alert-tones', a11y.alertTones ? 'on' : 'off');
    root.classList.toggle('reduced-sound', a11y.reducedSound);

    // === Input Alternatives ===
    root.classList.toggle('sticky-keys', a11y.stickyKeys);
    root.classList.toggle('click-assist', a11y.clickAssist);
    if (a11y.clickAssist && a11y.clickDelay) {
      root.style.setProperty('--click-delay', `${a11y.clickDelay}ms`);
    }
    root.classList.toggle('one-handed-mode', a11y.oneHandedMode);

    // === Cognitive Support ===
    root.classList.toggle('simplified-ui', a11y.simplifiedUI);
    root.classList.toggle('plain-language', a11y.plainLanguage);
    root.setAttribute('data-confirmations', a11y.extraConfirmations ? 'extra' : 'normal');

    // === Safety ===
    root.classList.toggle('photosensitive-mode', a11y.photosensitiveMode);
    root.classList.toggle('no-autoplay', a11y.autoplayControl);
    root.classList.toggle('panic-button-enabled', a11y.panicButton);

    // === General ===
    root.classList.toggle('enhanced-focus', a11y.focusIndicators);
    root.classList.toggle('reduced-transparency', a11y.reducedTransparency);
    root.classList.toggle('screen-reader-optimized', a11y.screenReaderOptimized);

    // Scroll Speed
    if (settings.input?.scrollSpeed) {
      root.style.setProperty('--scroll-speed', settings.input.scrollSpeed);
    }

  }, [settings]);

  // Panic Button: ESC key to quickly switch to innocent-looking site
  useEffect(() => {
    if (!settings.accessibility?.panicButton) return;

    const panicSites = {
      classroom: 'https://classroom.google.com',
      ixl: 'https://www.ixl.com',
      canva: 'https://www.canva.com',
      docs: 'https://docs.google.com',
      drive: 'https://drive.google.com',
      gmail: 'https://mail.google.com',
      newtab: 'https://www.google.com',
      blank: 'about:blank'
    };

    const handlePanicButton = (e) => {
      if (e.key === 'Escape') {
        const site = panicSites[settings.accessibility?.panicSite || 'classroom'];
        
        // Save current page and timestamp to localStorage for quick return
        try {
          const panicData = {
            url: window.location.href,
            timestamp: Date.now()
          };
          localStorage.setItem('nexus-panic-return', JSON.stringify(panicData));
        } catch (err) {
          console.error('Could not save return URL');
        }
        
        // Redirect immediately
        window.location.href = site;
      }
    };

    window.addEventListener('keydown', handlePanicButton);
    return () => window.removeEventListener('keydown', handlePanicButton);
  }, [settings.accessibility?.panicButton, settings.accessibility?.panicSite]);

  // Break Reminders
  useEffect(() => {
    if (!settings.accessibility?.breakReminders) return;

    const interval = (settings.accessibility?.breakInterval || 25) * 60 * 1000;
    const timer = setInterval(() => {
      if (document.hasFocus() && !document.hidden) {
        const notification = document.createElement('div');
        notification.style.cssText = 'position:fixed;top:20px;right:20px;background:rgba(0,240,255,0.95);color:#000;padding:16px 24px;border-radius:12px;z-index:99999;font-weight:600;box-shadow:0 4px 12px rgba(0,0,0,0.3);';
        notification.textContent = '☕ Time for a break! Rest your eyes for a few minutes.';
        document.body.appendChild(notification);
        
        if (settings.accessibility?.soundEffects) {
          // Play a gentle chime sound
          const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjKJ0fPTgjMGHm7A7+OZSA0PVKvu8KdXEwlDmN/wxHUjBS 5+zPLaizsIGGS57OibUQ4LTqfi8LhlHAU2jdXzzn0pBSp7yvDckjwIE1y06+qmWBIJPpnf8sFuJAU1ic/z1II0Bhxqvu7mnEoODlGp7O+nWBMJQ5zg8MV4JgUugM3y2Yk5Bxhku+vnnlAOCU6n4/C4Zh0FNo7W88+AKwUrfMvx3JQ+Cg==');
          audio.volume = settings.accessibility?.reducedSound ? 0.3 : 0.6;
          audio.play().catch(() => {});
        }
        
        setTimeout(() => notification.remove(), 5000);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [settings.accessibility?.breakReminders, settings.accessibility?.breakInterval, settings.accessibility?.soundEffects, settings.accessibility?.reducedSound]);

  return children;
}
