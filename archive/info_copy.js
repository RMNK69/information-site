// --- Language switch button ---
document.addEventListener('DOMContentLoaded', function() {
	var langBtn = document.querySelector('.lang-switch');
	if (langBtn) {
		langBtn.addEventListener('click', function() {
			langBtn.textContent = langBtn.textContent === 'UA' ? 'EN' : 'UA';
		});
	}
});
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


// --- Metaball system (commented out) ---
/*
// Metaball rectangles demo with drag
const canvas = document.getElementById('metaballs');
const ctx = canvas.getContext('2d');
// ...rest of metaball code...
*/

// --- Animated info-section system ---
const elements = [
	...Array.from(document.querySelectorAll('.element1')),
	...Array.from(document.querySelectorAll('.element2')),
	...Array.from(document.querySelectorAll('.element3')),
	...Array.from(document.querySelectorAll('.element4')),
	...Array.from(document.querySelectorAll('.element5'))
];
const info = document.querySelector('.info');
const infoContent = info.querySelector('.info-content');

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

// --- Header hide/show on scroll (jQuery-like logic, pure JS) ---
let scrollPrev = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
	const scrolled = window.pageYOffset || document.documentElement.scrollTop;
	if (scrolled > 100 && scrolled > scrollPrev) {
		header.classList.add('header-out');
	} else if (scrolled < scrollPrev - 5) {
		// Повертаємо хедер лише якщо прокручено вгору на 40px або більше
		header.classList.remove('header-out');
	}
	scrollPrev = scrolled;
});


// Анімація першої секції при завантаженні
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.text-field h1').classList.add('animated-visible');
        document.querySelector('.section-one .photos-left img').classList.add('in');
        document.querySelector('.section-one .text-header').classList.add('animated-visible');
        document.querySelector('.section-one .text-paragraph').classList.add('animated-visible');
    }, 1500);
});

// Анімація для секцій при скролі
function animateSection(section, imgClass) {
    const img = section.querySelector('img');
    const header = section.querySelector('.text-header');
    const paragraph = section.querySelector('.text-paragraph');
    if (img && !img.classList.contains('in')) img.classList.add('in');
    if (header && !header.classList.contains('animated-visible')) header.classList.add('animated-visible');
    if (paragraph && !paragraph.classList.contains('animated-visible')) paragraph.classList.add('animated-visible');
}

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight - 100;
}

window.addEventListener('scroll', () => {
    const sectionTwo = document.querySelector('.section-two');
    const sectionThree = document.querySelector('.section-three');
    if (isInViewport(sectionTwo)) animateSection(sectionTwo, 'img-fly-right');
    if (isInViewport(sectionThree)) animateSection(sectionThree, 'img-fly-left');
});

function animateSection(section, imgClass) {
    const img = section.querySelector('img');
    const header = section.querySelector('.text-header');
    const paragraph = section.querySelector('.text-paragraph');
    const line = section.querySelector('.line');
    if (img && !img.classList.contains('in')) img.classList.add('in');
    if (header && !header.classList.contains('animated-visible')) header.classList.add('animated-visible');
    if (paragraph && !paragraph.classList.contains('animated-visible')) paragraph.classList.add('animated-visible');
    if (line && !line.classList.contains('in')) line.classList.add('in'); // Додаємо анімацію для лінії
}

window.addEventListener('DOMContentLoaded', () => {
	document.querySelector('.text-field h1').classList.add('animated-visible');
	document.querySelector('.section-one .photos-left img').classList.add('in');
	document.querySelector('.section-one .text-header').classList.add('animated-visible');
	document.querySelector('.section-one .text-paragraph').classList.add('animated-visible');
	document.querySelector('.section-one .line').classList.add('in'); // Додаємо анімацію для лінії першої секції
});
