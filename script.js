// Limpar localStorage corrompido
try {
    localStorage.clear();
    console.log('✅ LocalStorage limpo');
} catch (e) {
    console.warn('Aviso ao limpar localStorage:', e);
}

// Estado Global
const state = {
    theme: 'light',
    flashcards: [],
    images: [],
    events: [],
    chatHistory: [],
    notes: [],
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    studyTime: 0,
    pomodoroSessions: { today: 0, total: 0, lastDate: new Date().toDateString() },
    studyHistory: [],
    currentNoteId: null
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando aplicação...');
    
    try {
        initTheme();
        initNavigation();
        initFlashcards();
        initGallery();
        initCalendar();
        initChat();
        initTimer();
        initNotes();
        updateStats();
        updateUpcomingEvents();
        startStudyTimer();
        
        console.log('✅ Aplicação iniciada com sucesso!');
    } catch (error) {
        console.error('❌ Erro:', error);
    }
});

// Tema
function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeButtons();
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', state.theme);
            updateThemeButtons();
        });
    }
}

function updateThemeButtons() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleSidebar = document.getElementById('themeToggleSidebar');
    
    if (state.theme === 'dark') {
        if (themeToggle) themeToggle.innerHTML = '<span class="icon">☀️</span>';
        if (themeToggleSidebar) {
            themeToggleSidebar.innerHTML = '<span class="icon">☀️</span><span>Modo Claro</span>';
        }
    } else {
        if (themeToggle) themeToggle.innerHTML = '<span class="icon">🌙</span>';
        if (themeToggleSidebar) {
            themeToggleSidebar.innerHTML = '<span class="icon">🌙</span><span>Modo Escuro</span>';
        }
    }
}

// Navegação
function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn, .sidebar-btn');
    const sections = document.querySelectorAll('.section');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const themeToggleSidebar = document.getElementById('themeToggleSidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (sidebar) sidebar.classList.add('active');
            if (sidebarOverlay) sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    function closeSidebarFunc() {
        if (sidebar) sidebar.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (closeSidebar) closeSidebar.addEventListener('click', closeSidebarFunc);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebarFunc);
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = btn.dataset.section;
            
            navBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll(`[data-section="${targetSection}"]`).forEach(b => {
                b.classList.add('active');
            });
            
            sections.forEach(s => s.classList.remove('active'));
            const target = document.getElementById(targetSection);
            if (target) target.classList.add('active');
            
            if (window.innerWidth <= 1024) closeSidebarFunc();
        });
    });
    
    if (themeToggleSidebar) {
        themeToggleSidebar.addEventListener('click', () => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', state.theme);
            updateThemeButtons();
        });
    }
}

function navigateTo(section) {
    const btn = document.querySelector(`[data-section="${section}"]`);
    if (btn) btn.click();
}

// Estatísticas
function updateStats() {
    const totalFlashcards = document.getElementById('totalFlashcards');
    const totalImages = document.getElementById('totalImages');
    const totalEvents = document.getElementById('totalEvents');
    const studyTimeEl = document.getElementById('studyTime');
    
    if (totalFlashcards) totalFlashcards.textContent = state.flashcards.length;
    if (totalImages) totalImages.textContent = state.images.length;
    if (totalEvents) totalEvents.textContent = state.events.length;
    if (studyTimeEl) studyTimeEl.textContent = Math.floor(state.studyTime / 60) + 'h';
}

function startStudyTimer() {
    setInterval(() => {
        state.studyTime++;
        if (state.studyTime % 60 === 0) updateStats();
    }, 1000);
}

function updateUpcomingEvents() {
    const container = document.getElementById('upcomingEventsList');
    if (!container) return;
    
    if (state.events.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary);">Nenhum evento próximo</p>';
    }
}

// Flashcards
function initFlashcards() {
    const addBtn = document.getElementById('addFlashcardBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            alert('Funcionalidade de flashcards em desenvolvimento!');
        });
    }
    renderFlashcards();
}

function renderFlashcards() {
    const container = document.getElementById('flashcardGrid');
    if (!container) return;
    
    if (state.flashcards.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); grid-column: 1/-1;">Nenhum flashcard ainda. Clique em "Criar Flashcard" para começar!</p>';
    }
}

// Galeria
function initGallery() {
    const addBtn = document.getElementById('addImageBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const input = document.getElementById('imageInput');
            if (input) input.click();
        });
    }
    renderGallery();
}

function renderGallery() {
    const container = document.getElementById('galleryGrid');
    if (!container) return;
    
    if (state.images.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); grid-column: 1/-1;">Nenhuma imagem ainda. Clique em "Adicionar Imagem" para começar!</p>';
    }
}

// Calendário
function initCalendar() {
    renderCalendar();
}

function renderCalendar() {
    const calendar = document.getElementById('calendar');
    if (!calendar) return;
    
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    const currentMonthEl = document.getElementById('currentMonth');
    if (currentMonthEl) {
        currentMonthEl.textContent = `${monthNames[state.currentMonth]} ${state.currentYear}`;
    }
    
    calendar.innerHTML = '<p style="color: var(--text-secondary); padding: 20px;">Calendário em desenvolvimento!</p>';
}

// Chat IA
function initChat() {
    const sendBtn = document.getElementById('sendMessage');
    const input = document.getElementById('chatInput');
    
    if (sendBtn && input) {
        sendBtn.addEventListener('click', () => sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    addMessageToChat(message, true);
    input.value = '';
    
    setTimeout(() => {
        addMessageToChat('Olá! Sou sua assistente de enfermagem. Como posso ajudar?', false);
    }, 500);
}

function addMessageToChat(text, isUser) {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <span class="icon">${isUser ? '👤' : '🤖'}</span>
        </div>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

// Timer
function initTimer() {
    console.log('Timer inicializado');
}

// Anotações
function initNotes() {
    const addBtn = document.getElementById('addNoteBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            alert('Funcionalidade de anotações em desenvolvimento!');
        });
    }
    renderNotes();
}

function renderNotes() {
    const container = document.getElementById('notesGrid');
    if (!container) return;
    
    if (state.notes.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); grid-column: 1/-1;">Nenhuma anotação ainda. Clique em "Nova Anotação" para começar!</p>';
    }
}

// Utilitários
function openModal(modal) {
    if (modal) modal.classList.add('active');
}

function closeModal(modal) {
    if (modal) modal.classList.remove('active');
}

// Fechar modais ao clicar fora
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

console.log('✅ Script carregado com sucesso!');
