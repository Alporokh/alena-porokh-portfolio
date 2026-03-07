// Portfolio JavaScript for enhanced user experience
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.borderBottom = '1px solid #e2e8f0';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(226, 232, 240, 0.5)';
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Portfolio item hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        const image = item.querySelector('.portfolio-image img');
        
        item.addEventListener('mouseenter', function() {
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });

    // Achievement counter animation
    const animateCounters = () => {
        const counters = document.querySelectorAll('.achievement-card h3');
        
        counters.forEach(counter => {
            const target = counter.textContent.trim();
            
            // Only animate if it contains numbers
            if (target.match(/\d/)) {
                const numMatch = target.match(/[\d.]+/);
                if (numMatch) {
                    const numericValue = parseFloat(numMatch[0]);
                    const suffix = target.replace(numMatch[0], '');
                    let current = 0;
                    const increment = numericValue / 30;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < numericValue) {
                            if (numericValue % 1 !== 0) {
                                // Handle decimals
                                counter.textContent = current.toFixed(1) + suffix;
                            } else {
                                counter.textContent = Math.floor(current) + suffix;
                            }
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                }
            }
        });
    };

    // Trigger counter animation when achievements section is visible
    const achievementsSection = document.querySelector('.achievements');
    if (achievementsSection) {
        const achievementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    achievementObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        achievementObserver.observe(achievementsSection);
    }

    // Hero statistics animation
    const animateHeroStats = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.opacity = '0';
                stat.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    stat.style.transition = 'all 0.6s ease';
                    stat.style.opacity = '1';
                    stat.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    };

    // Start hero animation after page load
    setTimeout(animateHeroStats, 500);

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add loading animation to external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });

    // Contact form enhancement (if form exists)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add submission feedback
            const submitBtn = this.querySelector('[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handler)
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#48bb78';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Press 'H' to go to top
        if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.metaKey) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Press 'C' to scroll to contact
        if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey) {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Add hover sound effect (optional - commented out by default)
    /*
    const hoverElements = document.querySelectorAll('.portfolio-item, .skill-card, .achievement-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Uncomment to add subtle audio feedback
            // const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAAB...');
            // audio.volume = 0.1;
            // audio.play().catch(() => {});
        });
    });
    */

    // Performance monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Portfolio loaded in ${Math.round(loadTime)}ms`);
        
        // Add loaded class to body for CSS animations
        document.body.classList.add('loaded');
    });

    console.log('Alena Porokh Portfolio - Interactive features loaded! ✨');
});

// Utility function for smooth reveals
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add custom cursor effect (optional)
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});
