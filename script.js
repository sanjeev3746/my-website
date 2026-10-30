// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(item => {
        item.classList.remove('active-link');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active-link');
        }
    });
});

// ===== Dark Mode Toggle =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    
    if (document.body.classList.contains('dark')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// ===== Certificate Modal =====
const certCards = document.querySelectorAll('.cert-card');
const modal = document.getElementById('certModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');

const certImages = {
    1: 'images/DigiElectroMedia.jpg',
    2: 'images/WageIndicator.jpg',
    3: 'images/Ek_Pahel.jpg',
    4: 'images/Netzent_Technologies.jpg',
    5: 'images/AI_Literacy.jpg',
    6: 'images/Teamwork_Skills.jpg',
    7: 'images/Udemy.jpg',
    8: 'images/Unstop.jpg',
    9: 'images/Internship_Studio.jpg'
};

certCards.forEach(card => {
    card.addEventListener('click', () => {
        const certId = card.getAttribute('data-cert');
        modalImage.src = certImages[certId];
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===== Scroll Reveal Animations =====
const revealElements = document.querySelectorAll(
    '.section-header, .about-content, .timeline, .cards-grid, .certificates-grid, .skills-grid, .achievements-grid, .contact-wrapper'
);

revealElements.forEach(el => {
    el.classList.add('reveal');
    if (
        el.classList.contains('cards-grid') ||
        el.classList.contains('certificates-grid') ||
        el.classList.contains('skills-grid') ||
        el.classList.contains('achievements-grid') ||
        el.classList.contains('timeline')
    ) {
        el.classList.add('reveal-stagger');
    }
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    }
);

revealElements.forEach(el => observer.observe(el));