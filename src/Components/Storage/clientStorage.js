// Client-side encrypted storage utility using IndexedDB
const DB_NAME = 'NexusDB';
const DB_VERSION = 1;

let db = null;

const initDB = () => {
  return new Promise((resolve, reject) => {
    if (db) return resolve(db);
    
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      
      if (!database.objectStoreNames.contains('user')) {
        database.createObjectStore('user', { keyPath: 'id' });
      }
      if (!database.objectStoreNames.contains('settings')) {
        database.createObjectStore('settings', { keyPath: 'id' });
      }
      if (!database.objectStoreNames.contains('favorites')) {
        database.createObjectStore('favorites', { keyPath: 'id' });
      }
      if (!database.objectStoreNames.contains('aiHistory')) {
        database.createObjectStore('aiHistory', { keyPath: 'id', autoIncrement: true });
      }
      if (!database.objectStoreNames.contains('widgets')) {
        database.createObjectStore('widgets', { keyPath: 'id' });
      }
    };
  });
};

// Simple encryption/decryption using account code as key
const encrypt = (data, key) => {
  try {
    const str = JSON.stringify(data);
    const encoded = btoa(str + '::' + key.slice(0, 8));
    return encoded;
  } catch (e) {
    console.error('Encryption failed:', e);
    return null;
  }
};

const decrypt = (encrypted, key) => {
  try {
    const decoded = atob(encrypted);
    const [str, checksum] = decoded.split('::');
    if (checksum !== key.slice(0, 8)) throw new Error('Invalid key');
    return JSON.parse(str);
  } catch (e) {
    console.error('Decryption failed:', e);
    return null;
  }
};

export const storage = {
  async init() {
    return initDB();
  },
  
  async saveUser(username, accountCode) {
    const db = await initDB();
    const userData = { username, createdAt: new Date().toISOString(), accessCode: accountCode };
    const encrypted = encrypt(userData, accountCode);
    return new Promise((resolve, reject) => {
      const tx = db.transaction(['user'], 'readwrite');
      const store = tx.objectStore('user');
      const request = store.put({ id: accountCode, data: encrypted });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },
  
  async loadUser(accountCode) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(['user'], 'readonly');
      const store = tx.objectStore('user');
      const request = store.get(accountCode);
      request.onsuccess = () => {
        const result = request.result;
        if (!result) {
          resolve(null);
        } else {
          const decrypted = decrypt(result.data, accountCode);
          resolve(decrypted);
        }
      };
      request.onerror = () => reject(request.error);
    });
  },

  // Invite code management
  getInviteCode() {
    const code = localStorage.getItem('nexus_invite_code');
    if (!code) {
      // Generate initial code
      const newCode = this.regenerateInviteCode();
      return newCode;
    }
    return code;
  },

  regenerateInviteCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    localStorage.setItem('nexus_invite_code', code);
    return code;
  },
  
  async saveSettings(settings) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(['settings'], 'readwrite');
      const store = tx.objectStore('settings');
      const request = store.put({ id: 'current', ...settings });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },
  
  async loadSettings() {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(['settings'], 'readonly');
      const store = tx.objectStore('settings');
      const request = store.get('current');
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  },
  
  async saveFavorites(favorites) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(['favorites'], 'readwrite');
      const store = tx.objectStore('favorites');
      const request = store.put({ id: 'current', games: favorites });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },
  
  async loadFavorites() {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(['favorites'], 'readonly');
      const store = tx.objectStore('favorites');
      const request = store.get('current');
      request.onsuccess = () => resolve(request.result?.games || []);
      request.onerror = () => reject(request.error);
    });
  },
  
  async saveAIHistory(message) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(['aiHistory'], 'readwrite');
      const store = tx.objectStore('aiHistory');
      const request = store.add({ ...message, timestamp: new Date().toISOString() });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },
  
  async loadAIHistory() {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(['aiHistory'], 'readonly');
      const store = tx.objectStore('aiHistory');
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  },
  
  async clearAIHistory() {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(['aiHistory'], 'readwrite');
      const store = tx.objectStore('aiHistory');
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },
  
  async deleteAllData() {
    const db = await initDB();
    const stores = ['user', 'settings', 'favorites', 'aiHistory', 'widgets'];
    return Promise.all(stores.map(storeName => 
      new Promise((resolve, reject) => {
        const tx = db.transaction([storeName], 'readwrite');
        const store = tx.objectStore(storeName);
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      })
    ));
  },
  
  async exportData() {
    const db = await initDB();
    const stores = ['user', 'settings', 'favorites', 'aiHistory', 'widgets'];
    const data = {};
    
    for (const storeName of stores) {
      const tx = db.transaction([storeName], 'readonly');
      const store = tx.objectStore(storeName);
      data[storeName] = await new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
    
    return data;
  }
};

// Session management
export const session = {
  set(accountCode, remember = false, isAdmin = false) {
    const data = JSON.stringify({ code: accountCode, admin: isAdmin });
    if (remember) {
      localStorage.setItem('nexus_session', btoa(data));
    } else {
      sessionStorage.setItem('nexus_session', btoa(data));
    }
  },
  
  get() {
    const persistent = localStorage.getItem('nexus_session');
    const temp = sessionStorage.getItem('nexus_session');
    const encoded = persistent || temp;
    if (!encoded) return null;
    try {
      const data = JSON.parse(atob(encoded));
      return data.code;
    } catch {
      return null;
    }
  },
  
  isAdmin() {
    const persistent = localStorage.getItem('nexus_session');
    const temp = sessionStorage.getItem('nexus_session');
    const encoded = persistent || temp;
    if (!encoded) return false;
    try {
      const data = JSON.parse(atob(encoded));
      return data.admin === true;
    } catch {
      return false;
    }
  },
  
  clear() {
    localStorage.removeItem('nexus_session');
    sessionStorage.removeItem('nexus_session');
  },
  
  isActive() {
    return !!this.get();
  }
};
