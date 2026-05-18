/**
 * Legal Documents Service
 * Fetches Terms, Privacy, and Support content from backend
 */

// Backend API URL - detect environment
const API_BASE = (() => {
  if (typeof window === 'undefined') return 'http://localhost:5001/api';
  
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (isLocal) return 'http://172.20.10.3:5001/api'; // Local network IP
  
  // Production — use same domain
  return `${window.location.protocol}//${window.location.host}/api`;
})();

/**
 * Fetch legal document (terms or privacy) from backend
 * @param {string} type - 'terms' or 'privacy'
 * @param {string} lang - 'az', 'en', or 'ru'
 * @returns {Promise<string>} - Document content
 */
export async function getLegalDocument(type, lang = 'az') {
  try {
    const url = `${API_BASE}/legal/${type}?lang=${lang}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const json = await response.json();
    if (!json.success || !json.data) {
      throw new Error('Invalid response format');
    }
    
    return json.data.content;
  } catch (error) {
    console.warn(`[Legal] Failed to fetch ${type}/${lang}:`, error.message);
    
    // Return fallback content
    return getFallbackContent(type, lang);
  }
}

/**
 * Fallback content if backend is unavailable
 */
function getFallbackContent(type, lang) {
  const fallbacks = {
    terms: {
      az: 'Qaydalar və şərtlər mətni hələ əlavə edilməyib. Admin paneldən yeniləyin.',
      en: 'Terms and conditions content is not set yet. Please update it from the admin panel.',
      ru: 'Текст условий пока не добавлен. Обновите его через админ-панель.',
    },
    privacy: {
      az: 'Gizlilik siyasəti mətni hələ əlavə edilməyib. Admin paneldən yeniləyin.',
      en: 'Privacy policy content is not set yet. Please update it from the admin panel.',
      ru: 'Текст политики конфиденциальности пока не добавлен. Обновите его через админ-панель.',
    },
  };
  
  return fallbacks[type]?.[lang] || fallbacks[type]?.az || 'Content not available';
}
