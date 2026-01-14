# ⌨️ Nexus Keyboard Shortcuts

## Quick Navigation

| Key | Action | Description |
|-----|--------|-------------|
| **P** or **G** | Open Games | Jump straight to the Games page |
| **S** | Open Study Tools | Access flashcards, notes, timer, and more |
| **M** | Open Music | Go to the Music page |
| **V** | Open Videos | Jump to Videos page |
| **B** | Open Browser | Open the built-in Nexus Browser |
| **U** | Open Utilities | Access calculator, converter, whiteboard |
| **D** | Dashboard | Return to the main Dashboard |
| **H** | Habits Tracker | View your daily habits and streaks |
| **A** | Analytics | See your usage statistics |

## Special Actions

| Key | Action | Description |
|-----|--------|-------------|
| **ESC** | 🚨 Panic Mode | Emergency exit - clears session and redirects to safe page |
| **?** | Show Help | Display this keyboard shortcuts modal |

## Features

✅ **Smart Detection** - Shortcuts are disabled when typing in input fields  
✅ **Visual Feedback** - Modal with all shortcuts (press `?`)  
✅ **Emergency Exit** - Press ESC to instantly activate panic mode  
✅ **Fast Navigation** - No need to click, just press a key  
✅ **Context-Aware** - Won't navigate if already on the page  

## Panic Mode (ESC)

When you press **ESC**, Nexus will:
1. ⏸️ Pause all audio and video
2. 🧹 Clear session storage
3. 🔒 Clear sensitive data
4. 🌐 Redirect to: `google.com/search?q=math+homework`

Perfect for quick exits when you need privacy!

## Usage Tips

💡 **Quick Switch**: Press `P` from anywhere to jump to Games  
💡 **Study Mode**: Press `S` to quickly access study tools  
💡 **Help Anytime**: Press `?` to see all available shortcuts  
💡 **Emergency**: ESC always works, even in input fields  

## Implementation Details

**Files:**
- `src/utils/keyboardShortcuts.js` - Shortcut definitions
- `src/Components/UI/KeyboardHandler.js` - Global listener
- `src/Components/UI/ShortcutsModal.js` - Help modal
- `src/Layout.js` - Integration point

**How It Works:**
1. Global `keydown` listener attached to window
2. Checks if user is typing (ignores shortcuts in inputs)
3. Maps key to action (navigate, panic, help)
4. Executes action based on current context
5. Prevents default browser behavior when needed

**Safety Features:**
- Only lowercase letters trigger navigation
- Modifier keys (Ctrl, Alt, Meta) are ignored (except ESC)
- Won't navigate if already on target page
- Input fields are automatically excluded
- ESC always works for emergency exits

---

**Enjoy faster navigation with keyboard shortcuts! 🚀**
