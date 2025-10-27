let currentLang = 'th';

const langToggleButtons = document.querySelectorAll('.lang-toggle-btn');
const heroName = document.getElementById('hero-name');
const aboutDescription = document.getElementById('about-description');
const langToggleButtonProject = document.getElementById('lang-toggle-btn');
const allToggleElements = [...langToggleButtons, ...(langToggleButtonProject ? [langToggleButtonProject] : [])];

function updateText(lang) {
    const dictionary = translations[lang];

    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (!dictionary[key]) return;

        if (key === 'works-dropdown' || key === 'projects-button' || key === 'cert-link' || key === 'back-to-home' || key === 'github-link') {
            const icon = el.querySelector('.fa-chevron-down') || el.querySelector('.fa-rocket') || el.querySelector('.fa-external-link-alt') || el.querySelector('.fa-arrow-left') || el.querySelector('.fa-github');
            
            el.innerHTML = '';
            el.appendChild(document.createTextNode(dictionary[key] + ' '));
            if (icon) {
                el.appendChild(icon);
            }
        } 
        else if (el.tagName === 'LI' || (el.tagName === 'P' && (key === 'feature-p' || key === 'tech-p' || key.includes('condition')))) {
            const strongTag = el.querySelector('strong');
            if (strongTag) {
                const parts = dictionary[key].split(':');
                if (parts.length > 1) {
                    const newBoldText = parts[0].trim() + ':';
                    const newTextContent = parts.slice(1).join(':').trim(); 
                    el.innerHTML = `<strong>${newBoldText}</strong> ${newTextContent}`;
                } else {
                    el.textContent = dictionary[key];
                }
            } else {
                el.textContent = dictionary[key];
            }
        } 
        else {
            el.textContent = dictionary[key];
        }
    });

    if (heroName) heroName.textContent = dictionary['hero-name'];

    if (aboutDescription && dictionary['about-desc']) {
        const paragraphs = aboutDescription.querySelectorAll('p');
        dictionary['about-desc'].forEach((text, index) => {
            if (paragraphs[index]) {
                paragraphs[index].textContent = text;
            }
        });
    }

    allToggleElements.forEach(btn => {
        btn.textContent = lang === 'th' ? '日本語' : 'ภาษาไทย';
    });
}


document.addEventListener('DOMContentLoaded', function() {
    updateText(currentLang);
    document.documentElement.lang = currentLang === 'th' ? 'th' : 'ja';

    allToggleElements.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentLang === 'th') {
                currentLang = 'jp';
                updateText('jp');
                document.documentElement.lang = 'ja'; 
            } else {
                currentLang = 'th';
                updateText('th');
                document.documentElement.lang = 'th'; 
            }
        });
    });
});