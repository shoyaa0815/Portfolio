document.addEventListener('DOMContentLoaded', function () {
    
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800, 
            once: true,
        });
    }

    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileProjectsBtn = document.getElementById('mobile-projects-btn');
    const mobileProjectsDropdown = document.getElementById('mobile-projects-dropdown');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (menuBtn && mobileMenu) { 
        const menuIcon = menuBtn.querySelector('i');

        const toggleMobileMenu = () => {
            mobileMenu.classList.toggle('hidden');
            const isHidden = mobileMenu.classList.contains('hidden');

            menuIcon.classList.toggle('fa-bars', isHidden);
            menuIcon.classList.toggle('fa-times', !isHidden);
            menuBtn.setAttribute('aria-expanded', !isHidden);
            
            if (isHidden && mobileProjectsDropdown && !mobileProjectsDropdown.classList.contains('hidden')) {
                mobileProjectsDropdown.classList.add('hidden');
                if (mobileProjectsBtn) {
                    mobileProjectsBtn.querySelector('i').classList.remove('rotate-180');
                }
            }
        };

        menuBtn.addEventListener('click', toggleMobileMenu);

        if (mobileProjectsBtn && mobileProjectsDropdown) {
            mobileProjectsBtn.addEventListener('click', (e) => {
                e.preventDefault(); 
                mobileProjectsDropdown.classList.toggle('hidden');
                
                const icon = mobileProjectsBtn.querySelector('i');
                icon.classList.toggle('rotate-180');
            });
        }

        mobileLinks.forEach(link => {
            if (link.id !== 'mobile-projects-btn') {
                link.addEventListener('click', () => {
                    setTimeout(toggleMobileMenu, 100); 
                });
            }
        });
    }

    
    const typingTextElement = document.getElementById('typing-text');
    
    if (typingTextElement) { 
        const words = ["shoya", "student"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150;
        let delay = 1500;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 75; 
            } else {
                typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = delay;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 300; 
            }
            
            setTimeout(type, typingSpeed);
        }
        
        setTimeout(type, 500);
    }
});