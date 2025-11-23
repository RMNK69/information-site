// прокручування в гору (і в скрипті сторінки, і в скрипті хедера)
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// Анімація появи блоку .courses при скролі
function animateCoursesOnScroll() {
    const courses = document.querySelector('.courses-animate');
    if (!courses) return;
    const rect = courses.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        courses.classList.add('in');
    }
}

window.addEventListener('scroll', animateCoursesOnScroll);
window.addEventListener('DOMContentLoaded', animateCoursesOnScroll);

// -------------------------------------------------------------------
// --- Animated info-section system ---
// -------------------------------------------------------------------
const elements = [
    ...Array.from(document.querySelectorAll('.element1')),
    ...Array.from(document.querySelectorAll('.element2')),
    ...Array.from(document.querySelectorAll('.element3')),
    ...Array.from(document.querySelectorAll('.element4')),
    ...Array.from(document.querySelectorAll('.element5'))
];
const info = document.querySelector('.info');
const infoContent = info ? info.querySelector('.info-content') : null;

if (info && infoContent) { // Забезпечуємо, що елементи існують
    function setActive(idx) {
        // За замовчуванням shape має border-radius 12px
        info.style.borderTopLeftRadius = '12px';
        info.style.borderTopRightRadius = '12px';

        // Якщо перший елемент активний
        if (idx === 0) {
            info.style.borderTopLeftRadius = '0px';
        }
        // Якщо п'ятий елемент активний
        if (idx === 4) {
            info.style.borderTopRightRadius = '0px';
        }
        elements.forEach((el, i) => {
            el.classList.toggle('active', i === idx);
            el.style.borderBottomLeftRadius = '12px';
            el.style.borderBottomRightRadius = '12px';
        });

        elements[idx].style.borderBottomLeftRadius = '0px';
        elements[idx].style.borderBottomRightRadius = '0px';
        // Get h1 and p
        const h1 = elements[idx].querySelector('h1')?.textContent || '';
        let p = '';
        const pTag = elements[idx].querySelector('p');
        if (pTag) {
            p = pTag.textContent;
        } else {
            const spanInfo = elements[idx].querySelector('[data-info]');
            if (spanInfo) p = spanInfo.getAttribute('data-info');
        }
        // Set info color and content
        info.style.background = window.getComputedStyle(elements[idx]).background;
        infoContent.innerHTML = `<h1>${h1}</h1>${p ? `<p>${p}</p>` : ''}`;
    }


    let activeIdx = 0;
    let autoInterval = null;
    let autoActive = true;

    function startAutoChange() {
        if (autoInterval) return;
        autoInterval = setInterval(() => {
            if (autoActive) {
                activeIdx = (activeIdx + 1) % elements.length;
                setActive(activeIdx);
            }
        }, 3300);
    }

    function stopAutoChange() {
        if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
        }
    }

    setActive(activeIdx);
    startAutoChange();

    elements.forEach((el, idx) => {
        el.addEventListener('mouseenter', () => {
            autoActive = false;
            stopAutoChange();
            activeIdx = idx;
            setActive(activeIdx);
        });
        el.addEventListener('mouseleave', () => {
            autoActive = true;
            startAutoChange();
        });
    });

    info.addEventListener('mouseenter', () => {
        autoActive = false;
        stopAutoChange();
    });
    info.addEventListener('mouseleave', () => {
        autoActive = true;
        startAutoChange();
    });


    window.addEventListener('resize', () => {
        setActive(activeIdx);
    });
} else {
    // console.error("Елемент .info або .info-content не знайдено.");
}

// -------------------------------------------------------------------
// --- Анімація секцій при завантаженні та скролі ---
// -------------------------------------------------------------------

// Анімація першої секції при завантаженні
window.addEventListener('DOMContentLoaded', () => {
    // Встановлюємо таймаут 1500мс для анімації першої секції
    setTimeout(() => {
        const h1 = document.querySelector('.text-field h1');
        const img = document.querySelector('.section-one .photos-left img');
        const textHeader = document.querySelector('.section-one .text-header');
        const textParagraph = document.querySelector('.section-one .text-paragraph');
        const line = document.querySelector('.section-one .line');

        if (h1) h1.classList.add('animated-visible');
        if (img) img.classList.add('in');
        if (textHeader) textHeader.classList.add('animated-visible');
        if (textParagraph) textParagraph.classList.add('animated-visible');
        if (line) line.classList.add('in'); // Додаємо анімацію для лінії першої секції
    }, 1500);
});

// Функція для анімації секцій при скролі
function animateSection(section) {
    const img = section.querySelector('img');
    const header = section.querySelector('.text-header');
    const paragraph = section.querySelector('.text-paragraph');
    const line = section.querySelector('.line');
    
    // Додаємо класи анімації, якщо їх ще немає
    if (img && !img.classList.contains('in')) img.classList.add('in');
    if (header && !header.classList.contains('animated-visible')) header.classList.add('animated-visible');
    if (paragraph && !paragraph.classList.contains('animated-visible')) paragraph.classList.add('animated-visible');
    if (line && !line.classList.contains('in')) line.classList.add('in'); 
}

// Перевірка, чи елемент у вікні перегляду
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    // Анімація запускається, коли верхня частина елемента досягає 100px від низу вікна
    return rect.top < window.innerHeight - 100; 
}

// Обробник скролу для анімації секцій
window.addEventListener('scroll', () => {
    const sectionTwo = document.querySelector('.section-two');
    const sectionThree = document.querySelector('.section-three');

    if (sectionTwo && isInViewport(sectionTwo)) animateSection(sectionTwo);
    if (sectionThree && isInViewport(sectionThree)) animateSection(sectionThree);
});