// ========================================
// Exhibitor Page JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const exhibitorForm = document.getElementById('exhibitorForm');
    
    if (exhibitorForm) {
        exhibitorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateExhibitorForm(this)) {
                showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10"/></svg> Envoi en cours...';
            
            // Simulate API call (replace with actual API endpoint)
            setTimeout(() => {
                console.log('Form submitted:', data);
                
                // Show success message
                showNotification('Votre demande a été envoyée avec succès ! Notre équipe vous contactera sous 48h.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 2000);
        });
    }
});

// Validate exhibitor form
function validateExhibitorForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#EF4444';
            
            // Reset border color after 3 seconds
            setTimeout(() => {
                field.style.borderColor = '';
            }, 3000);
        } else {
            field.style.borderColor = '';
        }
    });
    
    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.style.borderColor = '#EF4444';
            
            setTimeout(() => {
                emailField.style.borderColor = '';
            }, 3000);
        }
    }
    
    // RGPD checkbox validation
    const rgpdCheckbox = form.querySelector('input[name="rgpd"]');
    if (rgpdCheckbox && !rgpdCheckbox.checked) {
        isValid = false;
        showNotification('Vous devez accepter la politique de confidentialité pour continuer.', 'error');
    }
    
    return isValid;
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? 'var(--primary)' : type === 'error' ? '#EF4444' : 'var(--gray-700)'};
        color: var(--white);
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: var(--shadow-xl);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        font-size: 15px;
        line-height: 1.5;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Add animations
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Package card interactions
document.addEventListener('DOMContentLoaded', function() {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a button
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            // Highlight selected package
            packageCards.forEach(c => c.style.transform = '');
            this.style.transform = 'scale(1.02)';
            
            // Scroll to form
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                setTimeout(() => {
                    contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200);
            }
        });
    });
});

// Event selection for booking
document.addEventListener('DOMContentLoaded', function() {
    const eventBookingBtns = document.querySelectorAll('.exhibitor-events .btn-primary');
    const eventSelect = document.getElementById('evenement');
    
    if (eventBookingBtns.length > 0 && eventSelect) {
        eventBookingBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get event title
                const eventCard = this.closest('.event-card');
                const eventTitle = eventCard.querySelector('.event-title').textContent;
                
                // Set in select dropdown
                const options = eventSelect.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].textContent.includes(eventTitle)) {
                        eventSelect.selectedIndex = i;
                        break;
                    }
                }
                
                // Scroll to form
                const contactForm = document.getElementById('contact-form');
                if (contactForm) {
                    contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                
                // Highlight form
                const formWrapper = document.querySelector('.form-wrapper');
                if (formWrapper) {
                    formWrapper.style.animation = 'pulse 0.5s ease';
                    setTimeout(() => {
                        formWrapper.style.animation = '';
                    }, 500);
                }
            });
        });
        
        // Add pulse animation
        if (!document.getElementById('pulse-animation')) {
            const style = document.createElement('style');
            style.id = 'pulse-animation';
            style.textContent = `
                @keyframes pulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.4); }
                    50% { box-shadow: 0 0 0 20px rgba(20, 184, 166, 0); }
                }
            `;
            document.head.appendChild(style);
        }
    }
});

// Dynamic pricing calculator (optional feature)
function initPricingCalculator() {
    const formuleSelect = document.getElementById('formule');
    
    if (formuleSelect) {
        formuleSelect.addEventListener('change', function() {
            const formule = this.value;
            let estimatedPrice = '';
            
            switch(formule) {
                case 'starter':
                    estimatedPrice = '1 500€ - 2 500€';
                    break;
                case 'business':
                    estimatedPrice = '3 500€ - 5 000€';
                    break;
                case 'premium':
                    estimatedPrice = 'Sur mesure';
                    break;
                default:
                    estimatedPrice = '';
            }
            
            // Show estimated price (you can add a dedicated element for this)
            if (estimatedPrice) {
                console.log('Prix estimé:', estimatedPrice);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initPricingCalculator);

// Auto-fill form from URL parameters (for marketing campaigns)
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const form = document.getElementById('exhibitorForm');
    
    if (form && urlParams.toString()) {
        // Pre-fill event if specified
        const eventParam = urlParams.get('event');
        if (eventParam) {
            const eventSelect = document.getElementById('evenement');
            if (eventSelect) {
                const options = Array.from(eventSelect.options);
                const matchingOption = options.find(opt => 
                    opt.value.toLowerCase().includes(eventParam.toLowerCase())
                );
                if (matchingOption) {
                    eventSelect.value = matchingOption.value;
                }
            }
        }
        
        // Pre-fill formule if specified
        const formuleParam = urlParams.get('formule');
        if (formuleParam) {
            const formuleSelect = document.getElementById('formule');
            if (formuleSelect) {
                formuleSelect.value = formuleParam;
            }
        }
    }
});
