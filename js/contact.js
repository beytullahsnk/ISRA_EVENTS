// ========================================
// Contact Page JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            //e.preventDefault();
            
            
            // Validate form
            if (!validateContactForm(this)) {
                showContactNotification('Veuillez remplir tous les champs obligatoires correctement.', 'error');
                return;
            }
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10"/></svg> Envoi en cours...';
            
            // Simulate API call (replace with actual endpoint)
            setTimeout(() => {
                console.log('Contact form submitted:', data);
                
                // Show success message
                showContactNotification('Votre message a été envoyé avec succès ! Notre équipe vous répondra sous 24h.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                
            }, 2000);
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(239, 68, 68)') {
                    validateField(this);
                }
            });
        });
    }
});

// Validate contact form
function validateContactForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate individual field
function validateField(field) {
    let isValid = true;
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#EF4444';
    }
    // Email validation
    else if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            field.style.borderColor = '#EF4444';
        } else {
            field.style.borderColor = '';
        }
    }
    // Phone validation (French format)
    else if (field.type === 'tel' && field.value) {
        const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
        const cleanPhone = field.value.replace(/\s/g, '');
        if (cleanPhone && !phoneRegex.test(cleanPhone)) {
            isValid = false;
            field.style.borderColor = '#EF4444';
        } else {
            field.style.borderColor = '';
        }
    }
    // Checkbox validation
    else if (field.type === 'checkbox' && field.hasAttribute('required')) {
        if (!field.checked) {
            isValid = false;
        }
    }
    else {
        field.style.borderColor = '';
    }
    
    return isValid;
}

// Show notification
function showContactNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.contact-notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `contact-notification contact-notification-${type}`;
    notification.textContent = message;
    
    // Styles
    const bgColor = type === 'success' ? '#14B8A6' : type === 'error' ? '#EF4444' : '#64748B';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${bgColor};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        font-size: 15px;
        line-height: 1.5;
        font-family: var(--font-body);
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Add click to dismiss
    notification.addEventListener('click', function() {
        this.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => this.remove(), 300);
    });
}

// Character counter for textarea
document.addEventListener('DOMContentLoaded', function() {
    const messageField = document.getElementById('message');
    
    if (messageField) {
        const maxLength = 1000;
        
        // Create counter element
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 13px;
            color: var(--gray-500);
            margin-top: 4px;
        `;
        
        messageField.parentElement.appendChild(counter);
        
        // Update counter
        function updateCounter() {
            const remaining = maxLength - messageField.value.length;
            counter.textContent = `${messageField.value.length} / ${maxLength} caractères`;
            
            if (remaining < 0) {
                counter.style.color = '#EF4444';
                messageField.value = messageField.value.substring(0, maxLength);
            } else if (remaining < 100) {
                counter.style.color = '#F59E0B';
            } else {
                counter.style.color = 'var(--gray-500)';
            }
        }
        
        messageField.addEventListener('input', updateCounter);
        updateCounter();
    }
});

// Auto-format phone number
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('telephone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format French phone number
            if (value.startsWith('33')) {
                value = '+33 ' + value.substring(2);
            } else if (value.startsWith('0')) {
                // Format as 01 23 45 67 89
                if (value.length > 2) value = value.substring(0, 2) + ' ' + value.substring(2);
                if (value.length > 5) value = value.substring(0, 5) + ' ' + value.substring(5);
                if (value.length > 8) value = value.substring(0, 8) + ' ' + value.substring(8);
                if (value.length > 11) value = value.substring(0, 11) + ' ' + value.substring(11);
                if (value.length > 14) value = value.substring(0, 14);
            }
            
            e.target.value = value;
        });
    }
});

// Copy email/phone to clipboard on click
document.addEventListener('DOMContentLoaded', function() {
    const contactItems = document.querySelectorAll('.contact-item-text');
    
    contactItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.title = 'Cliquer pour copier';
        
        item.addEventListener('click', function() {
            const text = this.textContent.trim();
            
            navigator.clipboard.writeText(text).then(() => {
                // Show tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Copié !';
                tooltip.style.cssText = `
                    position: absolute;
                    background: var(--primary);
                    color: white;
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-size: 13px;
                    pointer-events: none;
                    z-index: 10001;
                    animation: fadeInOut 2s ease;
                `;
                
                this.parentElement.style.position = 'relative';
                this.parentElement.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.top = '-35px';
                tooltip.style.left = '0';
                
                setTimeout(() => tooltip.remove(), 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        });
    });
    
    // Add fadeInOut animation
    if (!document.getElementById('copy-animation')) {
        const style = document.createElement('style');
        style.id = 'copy-animation';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateY(10px); }
                20% { opacity: 1; transform: translateY(0); }
                80% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
});

// Form autosave (localStorage)
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const AUTOSAVE_KEY = 'contact_form_autosave';
        
        // Load saved data
        const savedData = localStorage.getItem(AUTOSAVE_KEY);
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                Object.keys(data).forEach(key => {
                    const field = contactForm.elements[key];
                    if (field && data[key]) {
                        field.value = data[key];
                    }
                });
            } catch (e) {
                console.error('Failed to load autosaved data:', e);
            }
        }
        
        // Save on input
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', debounce(function() {
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData.entries());
                localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(data));
            }, 1000));
        });
        
        // Clear on submit
        contactForm.addEventListener('submit', function() {
            localStorage.removeItem(AUTOSAVE_KEY);
        });
    }
});

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading animation style
if (!document.getElementById('spin-animation')) {
    const style = document.createElement('style');
    style.id = 'spin-animation';
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}
