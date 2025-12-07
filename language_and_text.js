// Простий i18n: підвантажує all_data.json і міняє тексти за data-i18n ключами
(function(){
    const DATA_FILE = 'all_data.json';
    let data = null;
    let lang = localStorage.getItem('site_lang') || 'ua';

    async function loadData() {
        try {
            const res = await fetch(DATA_FILE);
            data = await res.json();
            applyLanguage(lang);
        } catch (e) {
            console.error('i18n load error', e);
        }
    }

    function applyLanguage(l) {
        if (!data || !data[l]) return;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = getByKeyPath(data[l], key);
            if (val !== undefined) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.value = val;
                } else if (el.getAttribute('alt') !== null && el.tagName === 'IMG') {
                    el.alt = val;
                } else {
                    el.textContent = val;
                }
            }
        });
        // якщо кнопка перемикання, показати інший лейбл
        document.querySelectorAll('.lang-switch').forEach(btn => {
            const label = data[l]?.header?.langSwitch || (l === 'ua' ? 'UA' : 'EN');
            btn.textContent = label;
        });
        localStorage.setItem('site_lang', l);
        lang = l;
    }

    function getByKeyPath(obj, path) {
        return path.split('.').reduce((o, k) => o && o[k], obj);
    }

    // click handler для перемикання мови
    document.addEventListener('click', (e) => {
        const t = e.target;
        if (t.classList && t.classList.contains('lang-switch')) {
            const newLang = (lang === 'ua') ? 'en' : 'ua';
            applyLanguage(newLang);
        }
    });

    // init
    loadData();
})();