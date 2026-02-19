// ========================================
// Main JavaScript File
// ========================================

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 1024) {
                    navMenu.classList.remove('active');
                    const spans = mobileMenuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and major elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.event-card, .domain-card, .benefit-card, .package-card, .expertise-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form Validation Helper
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#EF4444';
        } else {
            input.style.borderColor = '';
        }
    });
    
    // Email validation
    const emailInputs = form.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (input.value && !emailRegex.test(input.value)) {
            isValid = false;
            input.style.borderColor = '#EF4444';
        }
    });
    
    return isValid;
}

// Gallery lightbox (simple implementation)
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Simple alert for demo - you can implement a full lightbox
            console.log('Gallery item clicked');
        });
    });
});

// Video autoplay handling
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.hero-video-bg');
    
    if (video) {
        // Ensure video plays
        video.play().catch(err => {
            console.log('Video autoplay prevented:', err);
        });
        
        // Pause video when out of viewport to save resources
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });
        
        videoObserver.observe(video);
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Utility: Format phone numbers
function formatPhoneNumber(input) {
    const cleaned = input.value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})$/);
    
    if (match) {
        input.value = `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]} ${match[6]}`;
    }
}

// Initialize tooltips if needed
document.addEventListener('DOMContentLoaded', function() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'var(--dark)';
            tooltip.style.color = 'var(--white)';
            tooltip.style.padding = '8px 12px';
            tooltip.style.borderRadius = '6px';
            tooltip.style.fontSize = '14px';
            tooltip.style.zIndex = '10000';
            tooltip.style.whiteSpace = 'nowrap';
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });
});

// Back to top button (optional)
function createBackToTop() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: var(--white);
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
        box-shadow: var(--shadow-lg);
        z-index: 999;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTop);

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    });
}
// ========================================
// Modern Gallery JavaScript
// Gestion automatique des vidéos en boucle
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initGallery();
});

function initGallery() {
    initAutoplayVideos();
    initLazyLoadVideos();
    initGalleryHoverEffects();
    initLightbox();
}

// ========================================
// Auto-play Videos (loop sans son)
// ========================================

function initAutoplayVideos() {
    const videoItems = document.querySelectorAll('.gallery-video');
    
    videoItems.forEach(item => {
        const video = item.querySelector('.gallery-video-element');
        
        if (!video) return;
        
        // S'assurer que les attributs sont corrects
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        
        // Tenter de lancer la vidéo
        video.play().catch(err => {
            console.log('Autoplay prevented, will play on intersection:', err);
        });
        
        // Observer pour auto-play quand visible
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play().catch(err => console.log('Video play prevented:', err));
                    } else {
                        // Optionnel: pause quand hors vue pour économiser ressources
                        // Commentez cette ligne si vous voulez que ça continue en arrière-plan
                        video.pause();
                    }
                });
            }, { threshold: 0.25 });
            
            observer.observe(item);
        }
    });
}

// ========================================
// Lazy Load Videos
// ========================================

function initLazyLoadVideos() {
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    const item = video.closest('.gallery-video');
                    
                    // Load video source if needed
                    if (video.dataset.src) {
                        item.classList.add('loading');
                        video.src = video.dataset.src;
                        
                        video.addEventListener('loadeddata', function() {
                            item.classList.remove('loading');
                            video.play().catch(err => console.log('Video play prevented:', err));
                        }, { once: true });
                    }
                    
                    videoObserver.unobserve(video);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        document.querySelectorAll('.gallery-video-element').forEach(video => {
            // Si la vidéo a un data-src, on l'observe
            if (video.dataset.src) {
                videoObserver.observe(video);
            }
        });
    }
}

// ========================================
// Gallery Hover Effects
// ========================================

function initGalleryHoverEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item-modern');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Ajouter effet visuel si nécessaire
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
}

// ========================================
// Lightbox (Optional)
// ========================================

function initLightbox() {
    // Create lightbox element if it doesn't exist
    if (!document.querySelector('.gallery-lightbox')) {
        const lightbox = document.createElement('div');
        lightbox.className = 'gallery-lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Fermer">✕</button>
            <div class="lightbox-content"></div>
        `;
        document.body.appendChild(lightbox);
    }
    
    const lightbox = document.querySelector('.gallery-lightbox');
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    
    // Open lightbox on click
    document.querySelectorAll('.gallery-item-modern:not(.gallery-video)').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                const clone = img.cloneNode(true);
                lightboxContent.innerHTML = '';
                lightboxContent.appendChild(clone);
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxContent.innerHTML = '';
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// ========================================
// Performance: Reduce motion for accessibility
// ========================================

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.gallery-item-modern').forEach(item => {
        item.style.animation = 'none';
    });
}

// ========================================
// Gallery Stats (Optional)
// ========================================

function logGalleryStats() {
    const images = document.querySelectorAll('.gallery-item-modern:not(.gallery-video)').length;
    const videos = document.querySelectorAll('.gallery-video').length;
    
    console.log(`📸 Galerie: ${images} images, ${videos} vidéos`);
}

document.addEventListener('DOMContentLoaded', logGalleryStats);

// ========================================
// Preload Videos on Better Connection
// ========================================

if ('connection' in navigator) {
    const connection = navigator.connection;
    
    // Only preload on fast connections
    if (connection.effectiveType === '4g') {
        document.querySelectorAll('.gallery-video-element').forEach(video => {
            video.preload = 'metadata';
        });
    }
}
