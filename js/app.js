/**
 * LizzyTracker - Main Application
 * Pregnancy and Early Childhood Tracking PWA
 */

const App = {
    currentView: 'home',
    currentTab: {},
    settings: {},
    initialized: false,

    /**
     * Initialize the application
     */
    async init() {
        try {
            // Initialize storage
            await Storage.init();

            // Load settings
            await this.loadSettings();

            // Set up event listeners
            this.setupEventListeners();

            // Initialize views
            this.initializeViews();

            // Hide loading screen
            setTimeout(() => {
                document.getElementById('loading-screen').classList.add('hidden');
            }, 500);

            this.initialized = true;
            console.log('App initialized successfully');
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showToast('Failed to initialize app', 'error');
        }
    },

    /**
     * Load settings from storage
     */
    async loadSettings() {
        this.settings = await Storage.getAllSettings();

        // Set default values
        if (!this.settings.weightUnit) this.settings.weightUnit = 'imperial';
        if (!this.settings.lengthUnit) this.settings.lengthUnit = 'imperial';

        // Apply settings to form
        this.applySettingsToForm();
    },

    /**
     * Apply settings to the settings form
     */
    applySettingsToForm() {
        const { dueDate, conceptionDate, babyName, birthDate, birthWeightLbs, birthWeightOz, birthLength, weightUnit, lengthUnit } = this.settings;

        if (dueDate) document.getElementById('due-date').value = dueDate;
        if (conceptionDate) document.getElementById('conception-date').value = conceptionDate;
        if (babyName) document.getElementById('baby-name').value = babyName;
        if (birthDate) document.getElementById('birth-date').value = birthDate;
        if (birthWeightLbs) document.getElementById('birth-weight-lbs').value = birthWeightLbs;
        if (birthWeightOz) document.getElementById('birth-weight-oz').value = birthWeightOz;
        if (birthLength) document.getElementById('birth-length').value = birthLength;

        document.querySelector(`input[name="weight-unit"][value="${weightUnit || 'imperial'}"]`).checked = true;
        document.querySelector(`input[name="length-unit"][value="${lengthUnit || 'imperial'}"]`).checked = true;
    },

    /**
     * Save settings
     */
    async saveSettings() {
        const settings = {
            dueDate: document.getElementById('due-date').value,
            conceptionDate: document.getElementById('conception-date').value,
            babyName: document.getElementById('baby-name').value,
            birthDate: document.getElementById('birth-date').value,
            birthWeightLbs: document.getElementById('birth-weight-lbs').value,
            birthWeightOz: document.getElementById('birth-weight-oz').value,
            birthLength: document.getElementById('birth-length').value,
            weightUnit: document.querySelector('input[name="weight-unit"]:checked').value,
            lengthUnit: document.querySelector('input[name="length-unit"]:checked').value
        };

        for (const [key, value] of Object.entries(settings)) {
            await Storage.setSetting(key, value);
        }

        this.settings = settings;
        this.showToast('Settings saved!', 'success');

        // Refresh views
        this.updatePregnancyView();
        this.updateBabyView();
        this.updateHomeView();
    },

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item, .menu-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                if (view) this.navigateTo(view);
            });
        });

        // Menu toggle
        document.getElementById('menu-btn').addEventListener('click', () => this.toggleMenu(true));
        document.getElementById('close-menu').addEventListener('click', () => this.toggleMenu(false));
        document.getElementById('menu-overlay').addEventListener('click', () => this.toggleMenu(false));

        // Mode selection on home
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.navigateTo(mode === 'pregnancy' ? 'pregnancy' : 'baby');
            });
        });

        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                const view = e.currentTarget.closest('.view').id.replace('-view', '');
                this.switchTab(view, tab);
            });
        });

        // Settings
        document.getElementById('save-settings').addEventListener('click', () => this.saveSettings());
        document.getElementById('export-json').addEventListener('click', () => this.exportJSON());
        document.getElementById('export-csv').addEventListener('click', () => this.exportCSV());
        document.getElementById('clear-data').addEventListener('click', () => this.confirmClearData());

        // Export/Import from menu
        document.getElementById('export-data-btn').addEventListener('click', () => this.exportJSON());
        document.getElementById('import-data-btn').addEventListener('click', () => document.getElementById('import-file').click());
        document.getElementById('import-file').addEventListener('change', (e) => this.importData(e));

        // Modal
        document.getElementById('modal-close').addEventListener('click', () => this.closeModal());
        document.getElementById('modal-cancel').addEventListener('click', () => this.closeModal());
        document.querySelector('.modal-overlay').addEventListener('click', () => this.closeModal());

        // Pregnancy actions
        document.getElementById('add-pregnancy-task').addEventListener('click', () => this.showAddTaskModal('pregnancy'));
        document.getElementById('add-pregnancy-note').addEventListener('click', () => this.showAddNoteModal('pregnancy'));

        // Baby quick actions
        document.getElementById('quick-feed').addEventListener('click', () => this.showFeedingModal());
        document.getElementById('quick-sleep').addEventListener('click', () => this.showSleepModal());
        document.getElementById('quick-diaper').addEventListener('click', () => this.showDiaperModal());
        document.getElementById('quick-moment').addEventListener('click', () => this.showMomentModal());

        // Baby tab actions
        document.getElementById('add-feeding').addEventListener('click', () => this.showFeedingModal());
        document.getElementById('add-sleep').addEventListener('click', () => this.showSleepModal());
        document.getElementById('add-diaper').addEventListener('click', () => this.showDiaperModal());
        document.getElementById('add-growth').addEventListener('click', () => this.showGrowthModal());
        document.getElementById('add-milestone').addEventListener('click', () => this.showMilestoneModal());
    },

    /**
     * Toggle side menu
     */
    toggleMenu(open) {
        document.getElementById('side-menu').classList.toggle('open', open);
        document.getElementById('menu-overlay').classList.toggle('open', open);
    },

    /**
     * Navigate to a view
     */
    navigateTo(viewName) {
        // Hide all views
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

        // Show selected view
        const view = document.getElementById(`${viewName}-view`);
        if (view) {
            view.classList.add('active');
            this.currentView = viewName;
        }

        // Update nav
        document.querySelectorAll('.nav-item').forEach(n => {
            n.classList.toggle('active', n.dataset.view === viewName);
        });
        document.querySelectorAll('.menu-item').forEach(n => {
            n.classList.toggle('active', n.dataset.view === viewName);
        });

        // Update header
        const titles = {
            home: 'LizzyTracker',
            pregnancy: 'Pregnancy',
            baby: 'Baby',
            settings: 'Settings'
        };
        document.getElementById('header-title').textContent = titles[viewName] || 'LizzyTracker';

        // Close menu
        this.toggleMenu(false);

        // Refresh view data
        if (viewName === 'pregnancy') this.updatePregnancyView();
        if (viewName === 'baby') this.updateBabyView();
        if (viewName === 'home') this.updateHomeView();
    },

    /**
     * Switch tab within a view
     */
    switchTab(view, tabName) {
        const viewEl = document.getElementById(`${view}-view`);
        if (!viewEl) return;

        // Update tab buttons
        viewEl.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // Update tab content
        viewEl.querySelectorAll('.tab-content').forEach(content => {
            const contentId = content.id.replace(`${view}-`, '');
            content.classList.toggle('active', contentId === tabName);
        });

        this.currentTab[view] = tabName;

        // Refresh tab-specific content
        if (view === 'baby') {
            this.updateBabyTabContent(tabName);
        }
    },

    /**
     * Initialize views with data
     */
    initializeViews() {
        this.updateHomeView();
        this.updatePregnancyView();
        this.updateBabyView();
    },

    /**
     * Update home view
     */
    async updateHomeView() {
        const quickStatus = document.getElementById('quick-status');
        let statusHTML = '';

        if (this.settings.dueDate) {
            const week = this.getCurrentPregnancyWeek();
            if (week > 0 && week <= 42) {
                const size = AppData.babySizes[Math.min(week, 40)] || { icon: '👶', text: 'your baby' };
                statusHTML = `
                    <div class="quick-status-card">
                        <h3>Pregnancy Status</h3>
                        <p><strong>Week ${week}</strong> - Baby is the size of ${size.text} ${size.icon}</p>
                        <p>${this.getDaysUntilDueDate()} days until due date</p>
                    </div>
                `;
            }
        }

        if (this.settings.birthDate) {
            const age = this.getBabyAge();
            statusHTML += `
                <div class="quick-status-card">
                    <h3>Baby Status</h3>
                    <p><strong>${this.settings.babyName || 'Baby'}</strong> is ${age}</p>
                </div>
            `;
        }

        quickStatus.innerHTML = statusHTML;
    },

    /**
     * Get current pregnancy week
     */
    getCurrentPregnancyWeek() {
        if (!this.settings.dueDate) return 0;

        const dueDate = new Date(this.settings.dueDate);
        const today = new Date();

        // Calculate conception date (40 weeks before due date)
        const conceptionDate = new Date(dueDate);
        conceptionDate.setDate(conceptionDate.getDate() - 280);

        // Calculate weeks since conception
        const diffTime = today - conceptionDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(diffDays / 7);

        return Math.max(0, Math.min(weeks, 42));
    },

    /**
     * Get days until due date
     */
    getDaysUntilDueDate() {
        if (!this.settings.dueDate) return 0;

        const dueDate = new Date(this.settings.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        dueDate.setHours(0, 0, 0, 0);

        const diffTime = dueDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return Math.max(0, diffDays);
    },

    /**
     * Get baby's age as a string
     */
    getBabyAge() {
        if (!this.settings.birthDate) return '--';

        const birthDate = new Date(this.settings.birthDate);
        const today = new Date();

        const diffTime = today - birthDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Not born yet';
        if (diffDays === 0) return 'Born today!';
        if (diffDays === 1) return '1 day old';
        if (diffDays < 7) return `${diffDays} days old`;
        if (diffDays < 14) return '1 week old';
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks old`;
        if (diffDays < 60) return '1 month old';

        const months = Math.floor(diffDays / 30);
        const weeks = Math.floor((diffDays % 30) / 7);

        if (weeks > 0) {
            return `${months} month${months > 1 ? 's' : ''}, ${weeks} week${weeks > 1 ? 's' : ''} old`;
        }
        return `${months} month${months > 1 ? 's' : ''} old`;
    },

    /**
     * Update pregnancy view
     */
    async updatePregnancyView() {
        const week = this.getCurrentPregnancyWeek();
        const daysRemaining = this.getDaysUntilDueDate();

        // Update week display
        document.getElementById('current-week').textContent = week || '--';
        document.getElementById('days-remaining').textContent = `${daysRemaining} days to go`;

        // Update progress bar (40 weeks = 100%)
        const progress = Math.min((week / 40) * 100, 100);
        document.getElementById('week-progress-fill').style.width = `${progress}%`;

        // Update baby size
        const size = AppData.babySizes[Math.min(week, 40)] || { icon: '🌱', text: 'developing' };
        document.querySelector('.baby-size').innerHTML = `
            <span class="size-icon">${size.icon}</span>
            <span class="size-text">Baby is the size of ${size.text}</span>
        `;

        // Update week info
        this.updateWeekInfo(week);

        // Update visits timeline
        await this.updateVisitsTimeline();

        // Update tasks
        await this.updatePregnancyTasks();

        // Update notes
        await this.updatePregnancyNotes();
    },

    /**
     * Update week-specific information
     */
    updateWeekInfo(week) {
        const info = AppData.weeklyInfo[week] || AppData.weeklyInfo[Math.min(Math.max(week, 4), 40)];

        if (info) {
            document.getElementById('week-info').innerHTML = `
                <ul>${info.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>
            `;
            document.getElementById('development-info').innerHTML = `
                <ul>${info.development.map(dev => `<li>${dev}</li>`).join('')}</ul>
            `;
            document.getElementById('symptoms-info').innerHTML = `
                <ul>${info.symptoms.map(sym => `<li>${sym}</li>`).join('')}</ul>
            `;
        }
    },

    /**
     * Update visits timeline
     */
    async updateVisitsTimeline() {
        const currentWeek = this.getCurrentPregnancyWeek();
        const visits = AppData.prenatalVisits;
        const visitData = await Storage.getAll(Storage.stores.visitData);

        let html = '';

        for (const visit of visits) {
            const savedData = visitData.find(v => v.week === visit.week && v.type === 'prenatal');
            const status = this.getVisitStatus(visit.week, currentWeek, savedData);

            html += `
                <div class="visit-card ${status}" data-week="${visit.week}" onclick="App.showVisitModal(${visit.week}, 'prenatal')">
                    <div class="visit-header">
                        <span class="visit-week">${visit.title}</span>
                        <span class="visit-status ${status}">${this.getStatusLabel(status)}</span>
                    </div>
                    <div class="visit-date">Week ${visit.week}</div>
                    <div class="visit-checklist-preview">
                        ${visit.questions.length} questions to ask, ${visit.tasks.length} tasks
                    </div>
                </div>
            `;
        }

        document.getElementById('visits-timeline').innerHTML = html;
    },

    /**
     * Get visit status
     */
    getVisitStatus(visitWeek, currentWeek, savedData) {
        if (savedData && savedData.completed) return 'completed';
        if (visitWeek === currentWeek || (visitWeek < currentWeek && visitWeek >= currentWeek - 2)) return 'current';
        if (visitWeek < currentWeek) return 'completed';
        return 'upcoming';
    },

    /**
     * Get status label
     */
    getStatusLabel(status) {
        const labels = {
            completed: 'Completed',
            current: 'Current',
            upcoming: 'Upcoming'
        };
        return labels[status] || 'Upcoming';
    },

    /**
     * Show visit modal
     */
    async showVisitModal(week, type) {
        const visit = type === 'prenatal'
            ? AppData.prenatalVisits.find(v => v.week === week)
            : AppData.pediatricVisits.find(v => v.age === week);

        if (!visit) return;

        const savedData = (await Storage.getAll(Storage.stores.visitData))
            .find(v => v.week === week && v.type === type) || {};

        const questionsChecked = savedData.questionsChecked || [];
        const tasksChecked = savedData.tasksChecked || [];

        let html = `
            <div class="visit-modal-content">
                <h4>Questions to Ask</h4>
                <div class="checklist" id="questions-checklist">
                    ${visit.questions.map((q, i) => `
                        <div class="checklist-item ${questionsChecked.includes(i) ? 'completed' : ''}">
                            <div class="checklist-checkbox ${questionsChecked.includes(i) ? 'checked' : ''}"
                                 data-type="question" data-index="${i}">
                                ${questionsChecked.includes(i) ? '✓' : ''}
                            </div>
                            <span class="checklist-text">${q}</span>
                        </div>
                    `).join('')}
                </div>

                <h4 style="margin-top: 20px;">Tasks to Complete</h4>
                <div class="checklist" id="tasks-checklist">
                    ${visit.tasks.map((t, i) => `
                        <div class="checklist-item ${tasksChecked.includes(i) ? 'completed' : ''}">
                            <div class="checklist-checkbox ${tasksChecked.includes(i) ? 'checked' : ''}"
                                 data-type="task" data-index="${i}">
                                ${tasksChecked.includes(i) ? '✓' : ''}
                            </div>
                            <span class="checklist-text">${t}</span>
                        </div>
                    `).join('')}
                </div>

                ${type === 'pediatric' && visit.vaccinations && visit.vaccinations.length > 0 ? `
                    <h4 style="margin-top: 20px;">Expected Vaccinations</h4>
                    <ul style="padding-left: 20px;">
                        ${visit.vaccinations.map(v => `<li>${v}</li>`).join('')}
                    </ul>
                ` : ''}

                <h4 style="margin-top: 20px;">Notes</h4>
                <textarea id="visit-notes" class="form-textarea" placeholder="Add your visit notes here...">${savedData.notes || ''}</textarea>
            </div>
        `;

        this.showModal(visit.title, html, async () => {
            // Save visit data
            const questions = [];
            const tasks = [];

            document.querySelectorAll('#questions-checklist .checklist-checkbox.checked').forEach(cb => {
                questions.push(parseInt(cb.dataset.index));
            });

            document.querySelectorAll('#tasks-checklist .checklist-checkbox.checked').forEach(cb => {
                tasks.push(parseInt(cb.dataset.index));
            });

            const data = {
                id: savedData.id,
                week: week,
                type: type,
                questionsChecked: questions,
                tasksChecked: tasks,
                notes: document.getElementById('visit-notes').value,
                completed: questions.length === visit.questions.length && tasks.length === visit.tasks.length
            };

            if (savedData.id) {
                await Storage.update(Storage.stores.visitData, data);
            } else {
                await Storage.add(Storage.stores.visitData, data);
            }

            this.closeModal();
            this.updateVisitsTimeline();
            this.updatePediatricVisits();
            this.showToast('Visit data saved!', 'success');
        });

        // Add checkbox listeners
        document.querySelectorAll('.checklist-checkbox').forEach(cb => {
            cb.addEventListener('click', (e) => {
                e.currentTarget.classList.toggle('checked');
                e.currentTarget.innerHTML = e.currentTarget.classList.contains('checked') ? '✓' : '';
                e.currentTarget.closest('.checklist-item').classList.toggle('completed');
            });
        });
    },

    /**
     * Update pregnancy tasks
     */
    async updatePregnancyTasks() {
        const tasks = await Storage.getAll(Storage.stores.pregnancyTasks);
        const sortedTasks = tasks.sort((a, b) => {
            if (a.completed === b.completed) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return a.completed ? 1 : -1;
        });

        if (sortedTasks.length === 0) {
            document.getElementById('pregnancy-tasks-list').innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📝</div>
                    <div class="empty-state-text">No tasks yet. Add your first task!</div>
                </div>
            `;
            return;
        }

        const html = sortedTasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="App.toggleTask(${task.id})">
                    ${task.completed ? '✓' : ''}
                </div>
                <div class="task-content">
                    <div class="task-text">${task.text}</div>
                    <div class="task-meta">${task.completed ? `Completed ${this.formatDate(task.completedAt)}` : `Added ${this.formatDate(task.createdAt)}`}</div>
                </div>
                <div class="task-actions">
                    <button class="task-action-btn" onclick="App.deleteTask(${task.id})">🗑️</button>
                </div>
            </div>
        `).join('');

        document.getElementById('pregnancy-tasks-list').innerHTML = html;
    },

    /**
     * Toggle task completion
     */
    async toggleTask(id) {
        const tasks = await Storage.getAll(Storage.stores.pregnancyTasks);
        const task = tasks.find(t => t.id === id);

        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            await Storage.update(Storage.stores.pregnancyTasks, task);
            this.updatePregnancyTasks();
        }
    },

    /**
     * Delete task
     */
    async deleteTask(id) {
        if (confirm('Delete this task?')) {
            await Storage.delete(Storage.stores.pregnancyTasks, id);
            this.updatePregnancyTasks();
            this.showToast('Task deleted', 'success');
        }
    },

    /**
     * Show add task modal
     */
    showAddTaskModal(type) {
        const html = `
            <div class="form-group">
                <label for="task-text">Task Description</label>
                <textarea id="task-text" class="form-textarea" placeholder="What needs to be done?"></textarea>
            </div>
        `;

        this.showModal('Add Task', html, async () => {
            const text = document.getElementById('task-text').value.trim();
            if (!text) {
                this.showToast('Please enter a task description', 'error');
                return;
            }

            await Storage.add(Storage.stores.pregnancyTasks, {
                text,
                completed: false,
                type
            });

            this.closeModal();
            this.updatePregnancyTasks();
            this.showToast('Task added!', 'success');
        });
    },

    /**
     * Update pregnancy notes
     */
    async updatePregnancyNotes() {
        const notes = await Storage.getAll(Storage.stores.pregnancyNotes);
        const sortedNotes = notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (sortedNotes.length === 0) {
            document.getElementById('pregnancy-notes-list').innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📔</div>
                    <div class="empty-state-text">No notes yet. Start your pregnancy journal!</div>
                </div>
            `;
            return;
        }

        const html = sortedNotes.map(note => `
            <div class="note-item" data-id="${note.id}">
                <div class="note-header">
                    <span class="note-date">${this.formatDate(note.createdAt)} - Week ${note.week || '--'}</span>
                    <button class="task-action-btn" onclick="App.deleteNote(${note.id})">🗑️</button>
                </div>
                <div class="note-content">${note.text}</div>
            </div>
        `).join('');

        document.getElementById('pregnancy-notes-list').innerHTML = html;
    },

    /**
     * Delete note
     */
    async deleteNote(id) {
        if (confirm('Delete this note?')) {
            await Storage.delete(Storage.stores.pregnancyNotes, id);
            this.updatePregnancyNotes();
            this.showToast('Note deleted', 'success');
        }
    },

    /**
     * Show add note modal
     */
    showAddNoteModal(type) {
        const week = this.getCurrentPregnancyWeek();

        const html = `
            <div class="form-group">
                <label for="note-text">Your Note</label>
                <textarea id="note-text" class="form-textarea" rows="6" placeholder="How are you feeling today?"></textarea>
            </div>
            <div class="form-group">
                <label for="note-week">Week (optional)</label>
                <input type="number" id="note-week" class="form-input" value="${week}" min="1" max="42">
            </div>
        `;

        this.showModal('Add Note', html, async () => {
            const text = document.getElementById('note-text').value.trim();
            if (!text) {
                this.showToast('Please enter a note', 'error');
                return;
            }

            await Storage.add(Storage.stores.pregnancyNotes, {
                text,
                week: parseInt(document.getElementById('note-week').value) || null,
                type
            });

            this.closeModal();
            this.updatePregnancyNotes();
            this.showToast('Note added!', 'success');
        });
    },

    // ==================== Baby Tracking ====================

    /**
     * Update baby view
     */
    async updateBabyView() {
        // Update age display
        const age = this.getBabyAge();
        document.getElementById('baby-age').textContent = age;
        document.getElementById('display-baby-name').textContent = this.settings.babyName || '';

        // Update today's summary
        await this.updateTodaySummary();

        // Update recent activity
        await this.updateRecentActivity();

        // Update current tab content
        const currentTab = this.currentTab.baby || 'today';
        await this.updateBabyTabContent(currentTab);
    },

    /**
     * Update today's summary
     */
    async updateTodaySummary() {
        const today = new Date().toISOString().split('T')[0];

        // Count feedings
        const feedings = await Storage.getAll(Storage.stores.feedings);
        const todayFeedings = feedings.filter(f => f.date && f.date.startsWith(today));
        document.getElementById('today-feeding').textContent = todayFeedings.length;

        // Calculate sleep
        const sleepLogs = await Storage.getAll(Storage.stores.sleepLogs);
        const todaySleep = sleepLogs.filter(s => s.date && s.date.startsWith(today));
        const totalMinutes = todaySleep.reduce((sum, s) => sum + (s.duration || 0), 0);
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        document.getElementById('today-sleep').textContent = `${hours}h${mins > 0 ? ` ${mins}m` : ''}`;

        // Count diapers
        const diapers = await Storage.getAll(Storage.stores.diaperLogs);
        const todayDiapers = diapers.filter(d => d.date && d.date.startsWith(today));
        document.getElementById('today-diapers').textContent = todayDiapers.length;
    },

    /**
     * Update recent activity
     */
    async updateRecentActivity() {
        const activities = [];

        // Get recent feedings
        const feedings = await Storage.getAll(Storage.stores.feedings);
        feedings.slice(-5).forEach(f => {
            activities.push({
                type: 'feeding',
                icon: '🍼',
                title: AppData.feedingTypes.find(t => t.id === f.feedingType)?.label || 'Feeding',
                time: f.date,
                data: f
            });
        });

        // Get recent sleep
        const sleepLogs = await Storage.getAll(Storage.stores.sleepLogs);
        sleepLogs.slice(-5).forEach(s => {
            activities.push({
                type: 'sleep',
                icon: '😴',
                title: `Sleep - ${s.duration} min`,
                time: s.date,
                data: s
            });
        });

        // Get recent diapers
        const diapers = await Storage.getAll(Storage.stores.diaperLogs);
        diapers.slice(-5).forEach(d => {
            activities.push({
                type: 'diaper',
                icon: AppData.diaperTypes.find(t => t.id === d.diaperType)?.icon || '👶',
                title: AppData.diaperTypes.find(t => t.id === d.diaperType)?.label || 'Diaper',
                time: d.date,
                data: d
            });
        });

        // Sort by time, most recent first
        activities.sort((a, b) => new Date(b.time) - new Date(a.time));

        const list = document.getElementById('activity-list');
        if (activities.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📊</div>
                    <div class="empty-state-text">No activity logged yet today</div>
                </div>
            `;
            return;
        }

        list.innerHTML = activities.slice(0, 10).map(a => `
            <div class="activity-item">
                <span class="activity-icon">${a.icon}</span>
                <div class="activity-details">
                    <div class="activity-title">${a.title}</div>
                    <div class="activity-time">${this.formatTime(a.time)}</div>
                </div>
            </div>
        `).join('');
    },

    /**
     * Update baby tab content
     */
    async updateBabyTabContent(tabName) {
        switch (tabName) {
            case 'feeding':
                await this.updateFeedingTab();
                break;
            case 'sleep':
                await this.updateSleepTab();
                break;
            case 'diapers':
                await this.updateDiaperTab();
                break;
            case 'growth':
                await this.updateGrowthTab();
                break;
            case 'milestones':
                await this.updateMilestonesTab();
                break;
            case 'pediatric':
                await this.updatePediatricVisits();
                break;
        }
    },

    /**
     * Update feeding tab
     */
    async updateFeedingTab() {
        const feedings = await Storage.getAll(Storage.stores.feedings);
        const today = new Date().toISOString().split('T')[0];
        const todayFeedings = feedings.filter(f => f.date && f.date.startsWith(today));

        document.getElementById('feeding-today-count').textContent = `${todayFeedings.length} feedings`;

        const lastFeeding = feedings.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        document.getElementById('last-feeding-time').textContent = lastFeeding ? this.formatTime(lastFeeding.date) : '--';

        const sortedFeedings = feedings.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (sortedFeedings.length === 0) {
            document.getElementById('feeding-list').innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🍼</div>
                    <div class="empty-state-text">No feedings logged yet</div>
                </div>
            `;
            return;
        }

        document.getElementById('feeding-list').innerHTML = sortedFeedings.slice(0, 20).map(f => {
            const type = AppData.feedingTypes.find(t => t.id === f.feedingType);
            return `
                <div class="log-item">
                    <span class="log-icon">${type?.icon || '🍼'}</span>
                    <div class="log-details">
                        <div class="log-title">${type?.label || 'Feeding'}</div>
                        <div class="log-subtitle">${f.duration ? `${f.duration} min` : ''}${f.amount ? ` ${f.amount} oz` : ''}${f.notes ? ` - ${f.notes}` : ''}</div>
                    </div>
                    <div class="log-time">${this.formatTime(f.date)}</div>
                    <button class="task-action-btn" onclick="App.deleteFeeding(${f.id})">🗑️</button>
                </div>
            `;
        }).join('');
    },

    /**
     * Show feeding modal
     */
    showFeedingModal() {
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 16);

        const html = `
            <div class="form-group">
                <label>Feeding Type</label>
                <div class="radio-group">
                    ${AppData.feedingTypes.map(type => `
                        <label class="radio-label">
                            <input type="radio" name="feeding-type" value="${type.id}">
                            <span>${type.icon} ${type.label}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
            <div class="form-group">
                <label for="feeding-time">Time</label>
                <input type="datetime-local" id="feeding-time" class="form-input" value="${dateStr}">
            </div>
            <div class="form-group">
                <label for="feeding-duration">Duration (minutes)</label>
                <input type="number" id="feeding-duration" class="form-input" placeholder="e.g., 15">
            </div>
            <div class="form-group">
                <label for="feeding-amount">Amount (oz) - for bottles</label>
                <input type="number" id="feeding-amount" class="form-input" step="0.5" placeholder="e.g., 4">
            </div>
            <div class="form-group">
                <label for="feeding-notes">Notes</label>
                <input type="text" id="feeding-notes" class="form-input" placeholder="Any notes...">
            </div>
        `;

        this.showModal('Log Feeding', html, async () => {
            const feedingType = document.querySelector('input[name="feeding-type"]:checked')?.value;
            if (!feedingType) {
                this.showToast('Please select a feeding type', 'error');
                return;
            }

            await Storage.add(Storage.stores.feedings, {
                feedingType,
                date: document.getElementById('feeding-time').value,
                duration: parseInt(document.getElementById('feeding-duration').value) || null,
                amount: parseFloat(document.getElementById('feeding-amount').value) || null,
                notes: document.getElementById('feeding-notes').value
            });

            this.closeModal();
            this.updateBabyView();
            this.showToast('Feeding logged!', 'success');
        });
    },

    /**
     * Delete feeding
     */
    async deleteFeeding(id) {
        if (confirm('Delete this feeding entry?')) {
            await Storage.delete(Storage.stores.feedings, id);
            this.updateBabyView();
            this.showToast('Entry deleted', 'success');
        }
    },

    /**
     * Update sleep tab
     */
    async updateSleepTab() {
        const sleepLogs = await Storage.getAll(Storage.stores.sleepLogs);
        const today = new Date().toISOString().split('T')[0];
        const todaySleep = sleepLogs.filter(s => s.date && s.date.startsWith(today));
        const totalMinutes = todaySleep.reduce((sum, s) => sum + (s.duration || 0), 0);
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;

        document.getElementById('sleep-today-total').textContent = `${hours}h ${mins}m`;

        const lastSleep = sleepLogs.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        document.getElementById('last-sleep-time').textContent = lastSleep ? this.formatTime(lastSleep.date) : '--';

        const sortedSleep = sleepLogs.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (sortedSleep.length === 0) {
            document.getElementById('sleep-list').innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">😴</div>
                    <div class="empty-state-text">No sleep logged yet</div>
                </div>
            `;
            return;
        }

        document.getElementById('sleep-list').innerHTML = sortedSleep.slice(0, 20).map(s => `
            <div class="log-item">
                <span class="log-icon">😴</span>
                <div class="log-details">
                    <div class="log-title">${s.type === 'nap' ? 'Nap' : 'Night Sleep'}</div>
                    <div class="log-subtitle">${s.duration} minutes${s.notes ? ` - ${s.notes}` : ''}</div>
                </div>
                <div class="log-time">${this.formatTime(s.date)}</div>
                <button class="task-action-btn" onclick="App.deleteSleep(${s.id})">🗑️</button>
            </div>
        `).join('');
    },

    /**
     * Show sleep modal
     */
    showSleepModal() {
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 16);

        const html = `
            <div class="form-group">
                <label>Sleep Type</label>
                <div class="radio-group">
                    <label class="radio-label">
                        <input type="radio" name="sleep-type" value="nap" checked>
                        <span>Nap</span>
                    </label>
                    <label class="radio-label">
                        <input type="radio" name="sleep-type" value="night">
                        <span>Night Sleep</span>
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label for="sleep-start">Start Time</label>
                <input type="datetime-local" id="sleep-start" class="form-input" value="${dateStr}">
            </div>
            <div class="form-group">
                <label for="sleep-duration">Duration (minutes)</label>
                <input type="number" id="sleep-duration" class="form-input" placeholder="e.g., 45">
            </div>
            <div class="form-group">
                <label for="sleep-notes">Notes</label>
                <input type="text" id="sleep-notes" class="form-input" placeholder="Sleep quality, location, etc.">
            </div>
        `;

        this.showModal('Log Sleep', html, async () => {
            const duration = parseInt(document.getElementById('sleep-duration').value);
            if (!duration) {
                this.showToast('Please enter sleep duration', 'error');
                return;
            }

            await Storage.add(Storage.stores.sleepLogs, {
                type: document.querySelector('input[name="sleep-type"]:checked').value,
                date: document.getElementById('sleep-start').value,
                duration,
                notes: document.getElementById('sleep-notes').value
            });

            this.closeModal();
            this.updateBabyView();
            this.showToast('Sleep logged!', 'success');
        });
    },

    /**
     * Delete sleep entry
     */
    async deleteSleep(id) {
        if (confirm('Delete this sleep entry?')) {
            await Storage.delete(Storage.stores.sleepLogs, id);
            this.updateBabyView();
            this.showToast('Entry deleted', 'success');
        }
    },

    /**
     * Update diaper tab
     */
    async updateDiaperTab() {
        const diapers = await Storage.getAll(Storage.stores.diaperLogs);
        const today = new Date().toISOString().split('T')[0];
        const todayDiapers = diapers.filter(d => d.date && d.date.startsWith(today));

        const wet = todayDiapers.filter(d => d.diaperType === 'wet' || d.diaperType === 'both').length;
        const dirty = todayDiapers.filter(d => d.diaperType === 'dirty' || d.diaperType === 'both').length;

        document.getElementById('wet-today').textContent = wet;
        document.getElementById('dirty-today').textContent = dirty;

        const sortedDiapers = diapers.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (sortedDiapers.length === 0) {
            document.getElementById('diaper-list').innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">👶</div>
                    <div class="empty-state-text">No diapers logged yet</div>
                </div>
            `;
            return;
        }

        document.getElementById('diaper-list').innerHTML = sortedDiapers.slice(0, 20).map(d => {
            const type = AppData.diaperTypes.find(t => t.id === d.diaperType);
            return `
                <div class="log-item">
                    <span class="log-icon">${type?.icon || '👶'}</span>
                    <div class="log-details">
                        <div class="log-title">${type?.label || 'Diaper'}</div>
                        <div class="log-subtitle">${d.notes || ''}</div>
                    </div>
                    <div class="log-time">${this.formatTime(d.date)}</div>
                    <button class="task-action-btn" onclick="App.deleteDiaper(${d.id})">🗑️</button>
                </div>
            `;
        }).join('');
    },

    /**
     * Show diaper modal
     */
    showDiaperModal() {
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 16);

        const html = `
            <div class="form-group">
                <label>Diaper Type</label>
                <div class="radio-group">
                    ${AppData.diaperTypes.map(type => `
                        <label class="radio-label">
                            <input type="radio" name="diaper-type" value="${type.id}">
                            <span>${type.icon} ${type.label}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
            <div class="form-group">
                <label for="diaper-time">Time</label>
                <input type="datetime-local" id="diaper-time" class="form-input" value="${dateStr}">
            </div>
            <div class="form-group">
                <label for="diaper-notes">Notes</label>
                <input type="text" id="diaper-notes" class="form-input" placeholder="Any notes (color, consistency, etc.)">
            </div>
        `;

        this.showModal('Log Diaper', html, async () => {
            const diaperType = document.querySelector('input[name="diaper-type"]:checked')?.value;
            if (!diaperType) {
                this.showToast('Please select a diaper type', 'error');
                return;
            }

            await Storage.add(Storage.stores.diaperLogs, {
                diaperType,
                date: document.getElementById('diaper-time').value,
                notes: document.getElementById('diaper-notes').value
            });

            this.closeModal();
            this.updateBabyView();
            this.showToast('Diaper logged!', 'success');
        });
    },

    /**
     * Delete diaper entry
     */
    async deleteDiaper(id) {
        if (confirm('Delete this diaper entry?')) {
            await Storage.delete(Storage.stores.diaperLogs, id);
            this.updateBabyView();
            this.showToast('Entry deleted', 'success');
        }
    },

    /**
     * Update growth tab
     */
    async updateGrowthTab() {
        const measurements = await Storage.getAll(Storage.stores.growthMeasurements);
        const sorted = measurements.sort((a, b) => new Date(b.date) - new Date(a.date));

        const latest = sorted[0];
        if (latest) {
            document.getElementById('current-weight').textContent = this.formatWeight(latest.weightLbs, latest.weightOz);
            document.getElementById('current-length').textContent = latest.length ? `${latest.length}"` : '--';
            document.getElementById('current-head').textContent = latest.headCirc ? `${latest.headCirc}"` : '--';
        } else {
            document.getElementById('current-weight').textContent = '--';
            document.getElementById('current-length').textContent = '--';
            document.getElementById('current-head').textContent = '--';
        }

        if (sorted.length === 0) {
            document.getElementById('growth-list').innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📏</div>
                    <div class="empty-state-text">No measurements yet</div>
                </div>
            `;
            return;
        }

        document.getElementById('growth-list').innerHTML = sorted.map(m => `
            <div class="log-item">
                <span class="log-icon">📏</span>
                <div class="log-details">
                    <div class="log-title">${this.formatDate(m.date)}</div>
                    <div class="log-subtitle">
                        ${this.formatWeight(m.weightLbs, m.weightOz)}
                        ${m.length ? ` | ${m.length}"` : ''}
                        ${m.headCirc ? ` | Head: ${m.headCirc}"` : ''}
                    </div>
                </div>
                <button class="task-action-btn" onclick="App.deleteGrowth(${m.id})">🗑️</button>
            </div>
        `).join('');
    },

    /**
     * Format weight
     */
    formatWeight(lbs, oz) {
        if (!lbs && !oz) return '--';
        let str = '';
        if (lbs) str += `${lbs} lbs`;
        if (oz) str += ` ${oz} oz`;
        return str.trim() || '--';
    },

    /**
     * Show growth modal
     */
    showGrowthModal() {
        const today = new Date().toISOString().split('T')[0];

        const html = `
            <div class="form-group">
                <label for="growth-date">Date</label>
                <input type="date" id="growth-date" class="form-input" value="${today}">
            </div>
            <div class="form-group">
                <label>Weight</label>
                <div class="weight-input">
                    <input type="number" id="growth-weight-lbs" class="form-input" placeholder="lbs" min="0" max="50">
                    <span>lbs</span>
                    <input type="number" id="growth-weight-oz" class="form-input" placeholder="oz" min="0" max="15">
                    <span>oz</span>
                </div>
            </div>
            <div class="form-group">
                <label for="growth-length">Length (inches)</label>
                <input type="number" id="growth-length" class="form-input" step="0.25" placeholder="e.g., 21.5">
            </div>
            <div class="form-group">
                <label for="growth-head">Head Circumference (inches)</label>
                <input type="number" id="growth-head" class="form-input" step="0.25" placeholder="e.g., 14.5">
            </div>
            <div class="form-group">
                <label for="growth-notes">Notes</label>
                <input type="text" id="growth-notes" class="form-input" placeholder="From doctor visit, at home, etc.">
            </div>
        `;

        this.showModal('Add Growth Measurement', html, async () => {
            const weightLbs = parseInt(document.getElementById('growth-weight-lbs').value) || null;
            const weightOz = parseInt(document.getElementById('growth-weight-oz').value) || null;
            const length = parseFloat(document.getElementById('growth-length').value) || null;
            const headCirc = parseFloat(document.getElementById('growth-head').value) || null;

            if (!weightLbs && !length && !headCirc) {
                this.showToast('Please enter at least one measurement', 'error');
                return;
            }

            await Storage.add(Storage.stores.growthMeasurements, {
                date: document.getElementById('growth-date').value,
                weightLbs,
                weightOz,
                length,
                headCirc,
                notes: document.getElementById('growth-notes').value
            });

            this.closeModal();
            this.updateBabyView();
            this.showToast('Measurement saved!', 'success');
        });
    },

    /**
     * Delete growth entry
     */
    async deleteGrowth(id) {
        if (confirm('Delete this measurement?')) {
            await Storage.delete(Storage.stores.growthMeasurements, id);
            this.updateGrowthTab();
            this.showToast('Entry deleted', 'success');
        }
    },

    /**
     * Update milestones tab
     */
    async updateMilestonesTab() {
        const savedMilestones = await Storage.getAll(Storage.stores.milestones);
        const savedMap = new Map(savedMilestones.map(m => [m.id, m]));

        let html = '';

        for (const [ageRange, milestones] of Object.entries(AppData.milestones)) {
            html += `<h4 style="margin: 16px 0 8px;">${ageRange}</h4>`;

            for (const milestone of milestones) {
                const saved = savedMap.get(milestone.id);
                const achieved = saved?.achieved;

                html += `
                    <div class="milestone-item" data-id="${milestone.id}">
                        <div class="milestone-checkbox ${achieved ? 'achieved' : ''}"
                             onclick="App.toggleMilestone('${milestone.id}')">
                            ${achieved ? '✓' : ''}
                        </div>
                        <div class="milestone-content">
                            <div class="milestone-title">${milestone.text}</div>
                            <div class="milestone-description">
                                <span class="milestone-category">${milestone.category}</span>
                                ${achieved && saved.achievedDate ? `<span class="milestone-date">Achieved: ${this.formatDate(saved.achievedDate)}</span>` : ''}
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        document.getElementById('milestones-list').innerHTML = html;
    },

    /**
     * Toggle milestone achievement
     */
    async toggleMilestone(id) {
        const existing = await Storage.get(Storage.stores.milestones, id);

        if (existing) {
            existing.achieved = !existing.achieved;
            existing.achievedDate = existing.achieved ? new Date().toISOString() : null;
            await Storage.update(Storage.stores.milestones, existing);
        } else {
            await Storage.add(Storage.stores.milestones, {
                id,
                achieved: true,
                achievedDate: new Date().toISOString()
            });
        }

        this.updateMilestonesTab();
    },

    /**
     * Show milestone modal for custom milestone
     */
    showMilestoneModal() {
        const today = new Date().toISOString().split('T')[0];

        const html = `
            <div class="form-group">
                <label for="milestone-text">Milestone</label>
                <input type="text" id="milestone-text" class="form-input" placeholder="First smile, first word, etc.">
            </div>
            <div class="form-group">
                <label for="milestone-date">Date Achieved</label>
                <input type="date" id="milestone-date" class="form-input" value="${today}">
            </div>
            <div class="form-group">
                <label for="milestone-notes">Notes</label>
                <textarea id="milestone-notes" class="form-textarea" placeholder="Any details to remember..."></textarea>
            </div>
        `;

        this.showModal('Add Custom Milestone', html, async () => {
            const text = document.getElementById('milestone-text').value.trim();
            if (!text) {
                this.showToast('Please enter a milestone', 'error');
                return;
            }

            await Storage.add(Storage.stores.milestones, {
                id: `custom_${Date.now()}`,
                text,
                category: 'Custom',
                achieved: true,
                achievedDate: document.getElementById('milestone-date').value,
                notes: document.getElementById('milestone-notes').value,
                custom: true
            });

            this.closeModal();
            this.updateMilestonesTab();
            this.showToast('Milestone saved!', 'success');
        });
    },

    /**
     * Show moment modal (photos/memories)
     */
    showMomentModal() {
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 16);

        const html = `
            <div class="form-group">
                <label for="moment-title">Title</label>
                <input type="text" id="moment-title" class="form-input" placeholder="First bath, Meeting grandma, etc.">
            </div>
            <div class="form-group">
                <label for="moment-date">Date & Time</label>
                <input type="datetime-local" id="moment-date" class="form-input" value="${dateStr}">
            </div>
            <div class="form-group">
                <label for="moment-notes">Description</label>
                <textarea id="moment-notes" class="form-textarea" placeholder="Describe this special moment..."></textarea>
            </div>
        `;

        this.showModal('Log Special Moment', html, async () => {
            const title = document.getElementById('moment-title').value.trim();
            if (!title) {
                this.showToast('Please enter a title', 'error');
                return;
            }

            await Storage.add(Storage.stores.moments, {
                title,
                date: document.getElementById('moment-date').value,
                notes: document.getElementById('moment-notes').value
            });

            this.closeModal();
            this.showToast('Moment saved!', 'success');
        });
    },

    /**
     * Update pediatric visits
     */
    async updatePediatricVisits() {
        const visits = AppData.pediatricVisits;
        const visitData = await Storage.getAll(Storage.stores.visitData);

        let html = '';

        for (const visit of visits) {
            const savedData = visitData.find(v => v.week === visit.age && v.type === 'pediatric');
            const status = savedData?.completed ? 'completed' : 'upcoming';

            html += `
                <div class="visit-card ${status}" onclick="App.showVisitModal('${visit.age}', 'pediatric')">
                    <div class="visit-header">
                        <span class="visit-week">${visit.title}</span>
                        <span class="visit-status ${status}">${status === 'completed' ? 'Completed' : 'Upcoming'}</span>
                    </div>
                    <div class="visit-date">${visit.age}</div>
                    <div class="visit-checklist-preview">
                        ${visit.questions.length} questions, ${visit.tasks.length} tasks
                        ${visit.vaccinations?.length ? `, ${visit.vaccinations.length} vaccinations` : ''}
                    </div>
                </div>
            `;
        }

        document.getElementById('pediatric-visits-list').innerHTML = html;
    },

    // ==================== Modal & UI Helpers ====================

    /**
     * Show modal
     */
    showModal(title, content, onSave) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-content').innerHTML = content;
        document.getElementById('modal-container').classList.remove('hidden');

        // Remove old save listener and add new one
        const saveBtn = document.getElementById('modal-save');
        const newSaveBtn = saveBtn.cloneNode(true);
        saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
        newSaveBtn.addEventListener('click', onSave);
    },

    /**
     * Close modal
     */
    closeModal() {
        document.getElementById('modal-container').classList.add('hidden');
    },

    /**
     * Show toast notification
     */
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    /**
     * Format date
     */
    formatDate(dateStr) {
        if (!dateStr) return '--';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },

    /**
     * Format time
     */
    formatTime(dateStr) {
        if (!dateStr) return '--';
        const date = new Date(dateStr);
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();

        if (isToday) {
            return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        }

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' +
               date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    },

    // ==================== Data Export/Import ====================

    /**
     * Export data as JSON
     */
    async exportJSON() {
        try {
            const data = await Storage.exportData();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            this.downloadBlob(blob, `lizzytracker-backup-${new Date().toISOString().split('T')[0]}.json`);
            this.showToast('Data exported!', 'success');
        } catch (error) {
            console.error('Export failed:', error);
            this.showToast('Export failed', 'error');
        }
    },

    /**
     * Export data as CSV
     */
    async exportCSV() {
        try {
            const csv = await Storage.exportCSV();
            const blob = new Blob([csv], { type: 'text/csv' });
            this.downloadBlob(blob, `lizzytracker-backup-${new Date().toISOString().split('T')[0]}.csv`);
            this.showToast('Data exported!', 'success');
        } catch (error) {
            console.error('Export failed:', error);
            this.showToast('Export failed', 'error');
        }
    },

    /**
     * Download blob as file
     */
    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    /**
     * Import data from file
     */
    async importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const text = await file.text();
            await Storage.importData(text);
            await this.loadSettings();
            this.initializeViews();
            this.showToast('Data imported successfully!', 'success');
            this.toggleMenu(false);
        } catch (error) {
            console.error('Import failed:', error);
            this.showToast('Import failed. Please check the file format.', 'error');
        }

        // Reset file input
        event.target.value = '';
    },

    /**
     * Confirm and clear all data
     */
    async confirmClearData() {
        if (confirm('Are you sure you want to delete ALL data? This cannot be undone!')) {
            if (confirm('This will permanently delete all your pregnancy and baby tracking data. Are you absolutely sure?')) {
                await Storage.clearAll();
                this.settings = {};
                this.applySettingsToForm();
                this.initializeViews();
                this.showToast('All data cleared', 'success');
            }
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Make App available globally
window.App = App;
