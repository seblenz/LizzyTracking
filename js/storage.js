/**
 * LizzyTracker - Storage Module
 * Handles IndexedDB operations for persistent local storage
 */

const Storage = {
    dbName: 'LizzyTrackerDB',
    dbVersion: 1,
    db: null,

    // Store definitions
    stores: {
        settings: 'settings',
        pregnancyNotes: 'pregnancyNotes',
        pregnancyTasks: 'pregnancyTasks',
        visitData: 'visitData',
        feedings: 'feedings',
        sleepLogs: 'sleepLogs',
        diaperLogs: 'diaperLogs',
        growthMeasurements: 'growthMeasurements',
        milestones: 'milestones',
        moments: 'moments',
        pediatricVisits: 'pediatricVisits'
    },

    /**
     * Initialize the database
     */
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => {
                console.error('Failed to open database:', request.error);
                // Fallback to localStorage
                this.useLocalStorage = true;
                resolve(true);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('Database opened successfully');
                resolve(true);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create object stores
                if (!db.objectStoreNames.contains(this.stores.settings)) {
                    db.createObjectStore(this.stores.settings, { keyPath: 'key' });
                }

                if (!db.objectStoreNames.contains(this.stores.pregnancyNotes)) {
                    const store = db.createObjectStore(this.stores.pregnancyNotes, { keyPath: 'id', autoIncrement: true });
                    store.createIndex('date', 'date', { unique: false });
                    store.createIndex('week', 'week', { unique: false });
                }

                if (!db.objectStoreNames.contains(this.stores.pregnancyTasks)) {
                    const store = db.createObjectStore(this.stores.pregnancyTasks, { keyPath: 'id', autoIncrement: true });
                    store.createIndex('week', 'week', { unique: false });
                    store.createIndex('completed', 'completed', { unique: false });
                }

                if (!db.objectStoreNames.contains(this.stores.visitData)) {
                    const store = db.createObjectStore(this.stores.visitData, { keyPath: 'id', autoIncrement: true });
                    store.createIndex('week', 'week', { unique: false });
                    store.createIndex('type', 'type', { unique: false });
                }

                if (!db.objectStoreNames.contains(this.stores.feedings)) {
                    const store = db.createObjectStore(this.stores.feedings, { keyPath: 'id', autoIncrement: true });
                    store.createIndex('date', 'date', { unique: false });
                    store.createIndex('type', 'type', { unique: false });
                }

                if (!db.objectStoreNames.contains(this.stores.sleepLogs)) {
                    const store = db.createObjectStore(this.stores.sleepLogs, { keyPath: 'id', autoIncrement: true });
                    store.createIndex('date', 'date', { unique: false });
                }

                if (!db.objectStoreNames.contains(this.stores.diaperLogs)) {
                    const store = db.createObjectStore(this.stores.diaperLogs, { keyPath: 'id', autoIncrement: true });
                    store.createIndex('date', 'date', { unique: false });
                    store.createIndex('type', 'type', { unique: false });
                }

                if (!db.objectStoreNames.contains(this.stores.growthMeasurements)) {
                    const store = db.createObjectStore(this.stores.growthMeasurements, { keyPath: 'id', autoIncrement: true });
                    store.createIndex('date', 'date', { unique: false });
                }

                if (!db.objectStoreNames.contains(this.stores.milestones)) {
                    const store = db.createObjectStore(this.stores.milestones, { keyPath: 'id' });
                    store.createIndex('achieved', 'achieved', { unique: false });
                    store.createIndex('category', 'category', { unique: false });
                }

                if (!db.objectStoreNames.contains(this.stores.moments)) {
                    const store = db.createObjectStore(this.stores.moments, { keyPath: 'id', autoIncrement: true });
                    store.createIndex('date', 'date', { unique: false });
                }

                if (!db.objectStoreNames.contains(this.stores.pediatricVisits)) {
                    const store = db.createObjectStore(this.stores.pediatricVisits, { keyPath: 'id', autoIncrement: true });
                    store.createIndex('age', 'age', { unique: false });
                }

                console.log('Database schema created/upgraded');
            };
        });
    },

    /**
     * Generic add operation
     */
    async add(storeName, data) {
        if (this.useLocalStorage) {
            return this.localStorageAdd(storeName, data);
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);

            // Add timestamp if not present
            if (!data.createdAt) {
                data.createdAt = new Date().toISOString();
            }
            data.updatedAt = new Date().toISOString();

            const request = store.add(data);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    },

    /**
     * Generic update operation
     */
    async update(storeName, data) {
        if (this.useLocalStorage) {
            return this.localStorageUpdate(storeName, data);
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);

            data.updatedAt = new Date().toISOString();

            const request = store.put(data);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    },

    /**
     * Generic delete operation
     */
    async delete(storeName, id) {
        if (this.useLocalStorage) {
            return this.localStorageDelete(storeName, id);
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);

            request.onsuccess = () => {
                resolve(true);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    },

    /**
     * Get single item by ID
     */
    async get(storeName, id) {
        if (this.useLocalStorage) {
            return this.localStorageGet(storeName, id);
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(id);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    },

    /**
     * Get all items from a store
     */
    async getAll(storeName) {
        if (this.useLocalStorage) {
            return this.localStorageGetAll(storeName);
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result || []);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    },

    /**
     * Get items by index
     */
    async getByIndex(storeName, indexName, value) {
        if (this.useLocalStorage) {
            return this.localStorageGetByIndex(storeName, indexName, value);
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const index = store.index(indexName);
            const request = index.getAll(value);

            request.onsuccess = () => {
                resolve(request.result || []);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    },

    /**
     * Get items by date range
     */
    async getByDateRange(storeName, startDate, endDate) {
        if (this.useLocalStorage) {
            return this.localStorageGetByDateRange(storeName, startDate, endDate);
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const index = store.index('date');
            const range = IDBKeyRange.bound(startDate, endDate);
            const request = index.getAll(range);

            request.onsuccess = () => {
                resolve(request.result || []);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    },

    /**
     * Clear all data from a store
     */
    async clear(storeName) {
        if (this.useLocalStorage) {
            return this.localStorageClear(storeName);
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();

            request.onsuccess = () => {
                resolve(true);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    },

    /**
     * Clear all data from all stores
     */
    async clearAll() {
        const storeNames = Object.values(this.stores);
        for (const storeName of storeNames) {
            await this.clear(storeName);
        }
        return true;
    },

    // Settings-specific methods
    async getSetting(key) {
        const result = await this.get(this.stores.settings, key);
        return result ? result.value : null;
    },

    async setSetting(key, value) {
        return this.update(this.stores.settings, { key, value });
    },

    async getAllSettings() {
        const settings = await this.getAll(this.stores.settings);
        const result = {};
        settings.forEach(s => {
            result[s.key] = s.value;
        });
        return result;
    },

    // LocalStorage fallback methods
    localStorageAdd(storeName, data) {
        const items = this.localStorageGetAll(storeName);
        data.id = data.id || Date.now();
        data.createdAt = data.createdAt || new Date().toISOString();
        data.updatedAt = new Date().toISOString();
        items.push(data);
        localStorage.setItem(`lizzy_${storeName}`, JSON.stringify(items));
        return data.id;
    },

    localStorageUpdate(storeName, data) {
        const items = this.localStorageGetAll(storeName);
        const index = items.findIndex(item => item.id === data.id || item.key === data.key);
        data.updatedAt = new Date().toISOString();
        if (index >= 0) {
            items[index] = data;
        } else {
            items.push(data);
        }
        localStorage.setItem(`lizzy_${storeName}`, JSON.stringify(items));
        return data.id || data.key;
    },

    localStorageDelete(storeName, id) {
        const items = this.localStorageGetAll(storeName);
        const filtered = items.filter(item => item.id !== id && item.key !== id);
        localStorage.setItem(`lizzy_${storeName}`, JSON.stringify(filtered));
        return true;
    },

    localStorageGet(storeName, id) {
        const items = this.localStorageGetAll(storeName);
        return items.find(item => item.id === id || item.key === id) || null;
    },

    localStorageGetAll(storeName) {
        try {
            const data = localStorage.getItem(`lizzy_${storeName}`);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    },

    localStorageGetByIndex(storeName, indexName, value) {
        const items = this.localStorageGetAll(storeName);
        return items.filter(item => item[indexName] === value);
    },

    localStorageGetByDateRange(storeName, startDate, endDate) {
        const items = this.localStorageGetAll(storeName);
        return items.filter(item => {
            const date = item.date;
            return date >= startDate && date <= endDate;
        });
    },

    localStorageClear(storeName) {
        localStorage.removeItem(`lizzy_${storeName}`);
        return true;
    },

    // Export all data
    async exportData() {
        const data = {
            exportDate: new Date().toISOString(),
            version: '1.0',
            settings: await this.getAllSettings(),
            pregnancyNotes: await this.getAll(this.stores.pregnancyNotes),
            pregnancyTasks: await this.getAll(this.stores.pregnancyTasks),
            visitData: await this.getAll(this.stores.visitData),
            feedings: await this.getAll(this.stores.feedings),
            sleepLogs: await this.getAll(this.stores.sleepLogs),
            diaperLogs: await this.getAll(this.stores.diaperLogs),
            growthMeasurements: await this.getAll(this.stores.growthMeasurements),
            milestones: await this.getAll(this.stores.milestones),
            moments: await this.getAll(this.stores.moments),
            pediatricVisits: await this.getAll(this.stores.pediatricVisits)
        };
        return data;
    },

    // Export as CSV
    async exportCSV() {
        const data = await this.exportData();
        const csvSections = [];

        // Helper to convert array to CSV
        const arrayToCSV = (arr, name) => {
            if (!arr || arr.length === 0) return '';
            const headers = Object.keys(arr[0]);
            const rows = arr.map(item =>
                headers.map(h => {
                    const val = item[h];
                    if (typeof val === 'object') return JSON.stringify(val);
                    if (typeof val === 'string' && val.includes(',')) return `"${val}"`;
                    return val;
                }).join(',')
            );
            return `\n### ${name} ###\n${headers.join(',')}\n${rows.join('\n')}`;
        };

        csvSections.push(`LizzyTracker Export - ${data.exportDate}`);
        csvSections.push(arrayToCSV(data.pregnancyNotes, 'Pregnancy Notes'));
        csvSections.push(arrayToCSV(data.pregnancyTasks, 'Pregnancy Tasks'));
        csvSections.push(arrayToCSV(data.feedings, 'Feedings'));
        csvSections.push(arrayToCSV(data.sleepLogs, 'Sleep Logs'));
        csvSections.push(arrayToCSV(data.diaperLogs, 'Diaper Logs'));
        csvSections.push(arrayToCSV(data.growthMeasurements, 'Growth Measurements'));
        csvSections.push(arrayToCSV(data.milestones, 'Milestones'));
        csvSections.push(arrayToCSV(data.moments, 'Moments'));

        return csvSections.filter(s => s).join('\n\n');
    },

    // Import data
    async importData(jsonData) {
        try {
            const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

            // Import settings
            if (data.settings) {
                for (const [key, value] of Object.entries(data.settings)) {
                    await this.setSetting(key, value);
                }
            }

            // Import each data type
            const importStore = async (storeName, items) => {
                if (items && Array.isArray(items)) {
                    for (const item of items) {
                        await this.update(storeName, item);
                    }
                }
            };

            await importStore(this.stores.pregnancyNotes, data.pregnancyNotes);
            await importStore(this.stores.pregnancyTasks, data.pregnancyTasks);
            await importStore(this.stores.visitData, data.visitData);
            await importStore(this.stores.feedings, data.feedings);
            await importStore(this.stores.sleepLogs, data.sleepLogs);
            await importStore(this.stores.diaperLogs, data.diaperLogs);
            await importStore(this.stores.growthMeasurements, data.growthMeasurements);
            await importStore(this.stores.milestones, data.milestones);
            await importStore(this.stores.moments, data.moments);
            await importStore(this.stores.pediatricVisits, data.pediatricVisits);

            return true;
        } catch (error) {
            console.error('Import failed:', error);
            throw error;
        }
    }
};

// Make it available globally
if (typeof window !== 'undefined') {
    window.Storage = Storage;
}
