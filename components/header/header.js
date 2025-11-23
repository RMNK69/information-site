// ПРИМУСОВЕ ПРОКРУЧУВАННЯ ВГОРУ (для чистого старту анімацій)
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', function() {
    var langBtn = document.querySelector('.lang-switch');
    if (langBtn) {
        langBtn.addEventListener('click', function() {
            // Перемикає текст кнопки між 'UA' та 'EN'
            langBtn.textContent = langBtn.textContent === 'UA' ? 'EN' : 'UA';
        });
    }
});

// -------------------------------------------------------------
// --- Header hide/show on scroll (ОНОВЛЕНО: завжди видно на верху) ---
// -------------------------------------------------------------
let scrollPrev = 0;
const header = document.querySelector('.header');

if (header) { // Додана перевірка для уникнення помилок
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        
        // НОВЕ: Хедер завжди висовується, коли позиція прокрутки 0
        if (scrolled === 0) {
            header.classList.remove('header-out');
            scrollPrev = scrolled;
            return; // Виходимо, щоб не застосовувати інші правила
        }

        // Скролимо вниз і прокрутили більше 100px від верху: ховаємо хедер
        if (scrolled > 100 && scrolled > scrollPrev) {
            header.classList.add('header-out');
        } 
        // Скролимо вгору: показуємо хедер
        else if (scrolled < scrollPrev - 5) {
            header.classList.remove('header-out');
        }
        
        scrollPrev = scrolled;
    });
} else {
    console.error("Елемент .header не знайдено.");
}
// -------------------------------------------------------------