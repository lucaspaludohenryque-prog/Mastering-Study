/**
 * Mastering Study - Dashboard Logic & Interactivity
 * Módulo de orquestração de UI, gerenciamento de estado BYOK (Bring Your Own Key)
 * e acessibilidade para a plataforma educacional.
 */

'use strict';

// Chave padrão utilizada para persistência local segura no navegador
const STORAGE_KEY = 'mastering_study_byok_config';

/**
 * Inicializador da aplicação
 */
document.addEventListener('DOMContentLoaded', () => {
  initMobileSidebar();
  initByokModal();
  initSearchFilter();
  initNavigation();
  initCardInteractions();
  checkStoredApiKey();
});

/**
 * Gerenciamento da gaveta de navegação lateral (Sidebar Mobile)
 */
function initMobileSidebar() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const sidebar = document.getElementById('appSidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (!toggleBtn || !sidebar || !overlay) return;

  const openSidebar = () => {
    sidebar.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeSidebar = () => {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openSidebar);
  overlay.addEventListener('click', closeSidebar);

  // Fecha a gaveta com a tecla Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
      closeSidebar();
    }
  });
}

/**
 * Gerenciador do Modal BYOK (Configurações de Chave de API)
 */
function initByokModal() {
  const modal = document.getElementById('apiKeyModal');
  const openBtn = document.getElementById('openApiKeyModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const cancelBtn = document.getElementById('cancelModalBtn');
  const navSettingsBtn = document.getElementById('navAiSettings');
  const form = document.getElementById('apiKeyForm');
  const toggleEyeBtn = document.getElementById('toggleKeyVisibilityBtn');
  const keyInput = document.getElementById('apiKeyInput');
  const providerSelect = document.getElementById('aiProviderSelect');

  if (!modal || !form) return;

  const openModal = () => {
    // Carrega dados salvos se existirem
    const savedConfig = getSavedConfig();
    if (savedConfig) {
      providerSelect.value = savedConfig.provider || 'gemini';
      keyInput.value = savedConfig.apiKey || '';
    }
    modal.classList.add('is-open');
    keyInput.focus();
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  // Listeners de abertura
  if (openBtn) openBtn.addEventListener('click', openModal);
  if (navSettingsBtn) {
    navSettingsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  // Listeners de fechamento
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Alternar visibilidade da chave
  if (toggleEyeBtn && keyInput) {
    toggleEyeBtn.addEventListener('click', () => {
      const isPassword = keyInput.type === 'password';
      keyInput.type = isPassword ? 'text' : 'password';
    });
  }

  // Submissão do formulário
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const provider = providerSelect.value;
    const apiKey = keyInput.value.trim();

    if (!apiKey) return;

    saveConfig({ provider, apiKey });
    updateBannerState(true, provider);
    closeModal();
  });
}

/**
 * Persistência e leitura do LocalStorage
 */
function getSavedConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error('Erro ao ler configuração do LocalStorage', err);
    return null;
  }
}

function saveConfig(config) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Erro ao salvar configuração no LocalStorage', err);
  }
}

/**
 * Atualiza dinamicamente o Banner de Aviso de API (BYOK)
 */
function updateBannerState(hasKey, provider = 'gemini') {
  const banner = document.getElementById('byokWarningBanner');
  if (!banner) return;

  const providerNames = {
    gemini: 'Google Gemini',
    openai: 'OpenAI (GPT-4o)',
    anthropic: 'Anthropic Claude',
    deepseek: 'DeepSeek',
    openrouter: 'OpenRouter'
  };

  const displayName = providerNames[provider] || provider;

  if (hasKey) {
    banner.style.backgroundColor = 'var(--color-success-bg)';
    banner.style.borderColor = 'var(--color-success-border)';

    const iconWrap = banner.querySelector('.api-alert-icon-wrap');
    if (iconWrap) {
      iconWrap.style.backgroundColor = 'rgba(22, 101, 52, 0.12)';
      iconWrap.style.color = 'var(--color-success-text)';
      iconWrap.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
    }

    const textWrap = banner.querySelector('.api-alert-text');
    if (textWrap) {
      textWrap.style.color = 'var(--color-success-text)';
      textWrap.innerHTML = `
        <strong>Chave de IA conectada e pronta para uso.</strong>
        <span>Provedor ativo: ${displayName}. Suas aulas interativas em texto já podem ser geradas.</span>
      `;
    }

    const ctaBtn = banner.querySelector('.api-alert-cta');
    if (ctaBtn) {
      ctaBtn.style.backgroundColor = 'var(--color-brand-600)';
      ctaBtn.innerHTML = `
        <span>Alterar Chave</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      `;
    }
  }
}

function checkStoredApiKey() {
  const config = getSavedConfig();
  if (config && config.apiKey) {
    updateBannerState(true, config.provider);
  }
}

/**
 * Barra de pesquisa e atalho de teclado global (Ctrl + K)
 */
function initSearchFilter() {
  const searchInput = document.getElementById('globalSearchInput');
  const subjectCards = document.querySelectorAll('.subjects-grid .bezel-shell');

  if (!searchInput) return;

  // Atalho de teclado Ctrl + K ou Cmd + K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // Filtragem ao digitar
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();

    subjectCards.forEach((card) => {
      const title = card.querySelector('.subject-name')?.textContent.toLowerCase() || '';
      const snippet = card.querySelector('.subject-topics-snippet')?.textContent.toLowerCase() || '';
      const matches = title.includes(term) || snippet.includes(term);

      card.style.display = matches ? 'block' : 'none';
    });
  });
}

/**
 * Ativação dos links da Sidebar
 */
function initNavigation() {
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');

  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      if (item.id === 'navAiSettings') return; // Manipulado pelo modal

      navItems.forEach((el) => el.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

/**
 * Interações dos botões principais
 */
function initCardInteractions() {
  const resumeBtn = document.getElementById('resumeLessonBtn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      const config = getSavedConfig();
      if (!config || !config.apiKey) {
        const modal = document.getElementById('apiKeyModal');
        if (modal) modal.classList.add('is-open');
      } else {
        resumeBtn.style.opacity = '0.7';
        resumeBtn.querySelector('span').textContent = 'Carregando Aula...';
        setTimeout(() => {
          resumeBtn.style.opacity = '1';
          resumeBtn.querySelector('span').textContent = 'Retomar Aula';
        }, 1200);
      }
    });
  }

  const subjectBtns = document.querySelectorAll('.subject-link-btn');
  subjectBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const subject = btn.getAttribute('data-subject') || 'Disciplina';
      btn.style.transform = 'translateX(4px)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 200);
    });
  });
}
