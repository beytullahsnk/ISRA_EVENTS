// ========================================
// Events Page JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    const eventsCount = document.getElementById('eventsCount');
    
    // Filter functionality
    if (filterBtns.length > 0 && eventCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter cards
                let visibleCount = 0;
                
                eventCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'tous' || category === filter) {
                        card.style.display = 'block';
                        // Animate in
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                        visibleCount++;
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
                
                // Update count
                if (eventsCount) {
                    eventsCount.textContent = visibleCount;
                }
            });
        });
    }
    
    // Initialize animation styles for cards
    eventCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
});

// Search functionality (optional enhancement)
function initEventSearch() {
    const searchInput = document.getElementById('eventSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const eventCards = document.querySelectorAll('.event-card');
            let visibleCount = 0;
            
            eventCards.forEach(card => {
                const title = card.querySelector('.event-title').textContent.toLowerCase();
                const description = card.querySelector('.event-description').textContent.toLowerCase();
                const location = card.querySelector('.event-location').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || location.includes(searchTerm)) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update count
            const eventsCount = document.getElementById('eventsCount');
            if (eventsCount) {
                eventsCount.textContent = visibleCount;
            }
        });
    }
}

// Sort functionality (optional enhancement)
function initEventSort() {
    const sortSelect = document.getElementById('eventSort');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            const eventsGrid = document.getElementById('eventsGrid');
            const eventCards = Array.from(document.querySelectorAll('.event-card'));
            
            eventCards.sort((a, b) => {
                if (sortBy === 'date') {
                    // Sort by date (would need data-date attribute on cards)
                    const dateA = new Date(a.getAttribute('data-date') || '2024-01-01');
                    const dateB = new Date(b.getAttribute('data-date') || '2024-01-01');
                    return dateA - dateB;
                } else if (sortBy === 'title') {
                    const titleA = a.querySelector('.event-title').textContent;
                    const titleB = b.querySelector('.event-title').textContent;
                    return titleA.localeCompare(titleB);
                }
                return 0;
            });
            
            // Re-append sorted cards
            eventCards.forEach(card => eventsGrid.appendChild(card));
        });
    }
}

// Initialize optional features
document.addEventListener('DOMContentLoaded', function() {
    initEventSearch();
    initEventSort();
});

// Event card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

// Handle ticket booking buttons
document.addEventListener('DOMContentLoaded', function() {
    const bookingButtons = document.querySelectorAll('.event-actions .btn-primary');
    
    bookingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Check if button has href="#"
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                
                // Get event title
                const eventCard = this.closest('.event-card');
                const eventTitle = eventCard.querySelector('.event-title').textContent;
                
                // Show confirmation (replace with actual booking system)
                alert(`Réservation pour "${eventTitle}"\n\nCette fonctionnalité sera bientôt disponible.`);
            }
        });
    });
});

// Add loading state for filter buttons
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add loading state
            this.style.pointerEvents = 'none';
            const originalText = this.textContent;
            this.textContent = '...';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.pointerEvents = 'auto';
            }, 300);
        });
    });
});
