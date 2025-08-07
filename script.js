// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initParticles();
    initScrollAnimations();
    initCounters();
    initCountdown();
    initTestimonials();
    initSmoothScroll();
    initFormHandlers();
    initNetwork();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navProgress = document.getElementById('navProgress');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effects
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update progress bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        navProgress.style.width = scrolled + '%';

        // Update active nav link
        updateActiveNavLink();
        
        lastScroll = currentScroll;
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Particle animation
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(78, 205, 196, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((particle, index) => {
            for (let j = index + 1; j < particles.length; j++) {
                const dx = particle.x - particles[j].x;
                const dy = particle.y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(78, 205, 196, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use requestAnimationFrame for smoother animations
                requestAnimationFrame(() => {
                    entry.target.classList.add('animate-in');
                    
                    // Special animations for specific elements
                    if (entry.target.classList.contains('value-card')) {
                        entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}ms`;
                    }
                });
                
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with staggered delay
    document.querySelectorAll('.value-card, .initiative-card, .join-card').forEach((el, index) => {
        // Cap max delay and reduce stagger for initiative cards
        const section = el.closest('section');
        const isWhyJoin = section && section.id === 'why-join';
        el.dataset.delay = isWhyJoin ? Math.min(index * 30, 150) : Math.min(index * 50, 300);
        observer.observe(el);
    });
}

// Number counter animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;

        const updateCounter = () => {
            const current = +counter.innerText;
            
            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target + '+';
            }
        };

        updateCounter();
    };

    // Trigger animation when in view
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// Event countdown
function initCountdown() {
    const countdown = document.getElementById('countdown');
    if (!countdown) return;

    // Set event date (August 20, 2025)
    const eventDate = new Date(2025, 7, 20, 18, 0, 0); // August 20, 2025, 6:00 PM

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

// Testimonials slider
function initTestimonials() {
    const testimonials = [
        {
            text: "Joining Atlanta Women in AI transformed my career. The connections I've made and the knowledge I've gained have been invaluable in advancing my AI journey.",
            author: "Sarah Chen",
            role: "ML Engineer at Tech Corp"
        },
        {
            text: "The Think Tank sessions helped me refine my AI startup idea. The feedback and support from this community is unmatched!",
            author: "Maria Rodriguez",
            role: "AI Startup Founder"
        },
        {
            text: "As someone transitioning into AI, this community provided the guidance and network I needed. The monthly meetings are always inspiring!",
            author: "Aisha Patel",
            role: "Data Scientist"
        }
    ];

    let currentTestimonial = 0;
    const testimonialCard = document.querySelector('.testimonial-card');
    const dots = document.querySelectorAll('.dot');

    function showTestimonial(index) {
        testimonialCard.classList.remove('active');
        
        setTimeout(() => {
            const testimonial = testimonials[index];
            testimonialCard.querySelector('.testimonial-text').textContent = testimonial.text;
            testimonialCard.querySelector('.author-info h4').textContent = testimonial.author;
            testimonialCard.querySelector('.author-info span').textContent = testimonial.role;
            
            testimonialCard.classList.add('active');
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }, 300);
    }

    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Click handlers for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(index);
        });
    });
}

// Smooth scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offset = 80; // Height of fixed navbar
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


// Form handlers
function initFormHandlers() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            // Simulate form submission
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Subscribed!';
                button.style.background = 'var(--gradient-warm)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// Add CSS animation classes
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.5s ease forwards;
        will-change: transform, opacity;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px) translateZ(0);
        }
        to {
            opacity: 1;
            transform: translateY(0) translateZ(0);
        }
    }
    
    /* Optimize initiative cards animation */
    #why-join .initiative-card {
        opacity: 0;
        transform: translateY(20px) translateZ(0);
    }
    
    #why-join .initiative-card.animate-in {
        opacity: 1;
        transform: translateY(0) translateZ(0);
        animation: fadeInQuick 0.4s ease forwards;
    }
    
    @keyframes fadeInQuick {
        from {
            opacity: 0;
            transform: translateY(15px) translateZ(0);
        }
        to {
            opacity: 1;
            transform: translateY(0) translateZ(0);
        }
    }
`;
document.head.appendChild(style);

// Network Visualization
function initNetwork() {
    const container = document.querySelector('.network-container');
    if (!container) return;
    
    const svg = container.querySelector('.network-svg');
    const linesGroup = svg.querySelector('.network-lines');
    const nodes = container.querySelectorAll('.network-node');
    
    // Define connections - ensuring every node is connected
    const connections = [
        // Core AI hub to all primary skills
        ['ai', 'ml'],
        ['ai', 'nn'],
        ['ai', 'nlp'],
        ['ai', 'cv'],
        
        // Machine Learning branch
        ['ml', 'python'],
        ['ml', 'pytorch'],
        ['ml', 'scientist'],
        ['ml', 'health'],
        
        // Data Science (nn) branch
        ['nn', 'tf'],
        ['nn', 'aws'],
        ['nn', 'engineer'],
        ['nn', 'finance'],
        
        // NLP branch
        ['nlp', 'python'],
        ['nlp', 'pytorch'],
        ['nlp', 'researcher'],
        ['nlp', 'finance'],
        
        // Computer Vision branch
        ['cv', 'tf'],
        ['cv', 'aws'],
        ['cv', 'engineer'],
        ['cv', 'edu'],
        ['cv', 'pm'],
        
        // Cross-connections between tools and careers
        ['python', 'scientist'],
        ['python', 'researcher'],
        ['pytorch', 'researcher'],
        ['pytorch', 'scientist'],
        ['tf', 'engineer'],
        ['tf', 'pm'],
        ['aws', 'pm'],
        ['aws', 'engineer'],
        
        // Industries to multiple nodes
        ['health', 'scientist'],
        ['health', 'python'],
        ['finance', 'pm'],
        ['finance', 'aws'],
        ['edu', 'researcher'],
        ['edu', 'tf'],
        ['marketing', 'nlp'],
        ['marketing', 'ml'],
        ['marketing', 'pm'],
        
        // Additional connections to ensure all nodes are linked
        ['scientist', 'researcher'],
        ['engineer', 'pm'],
        ['pytorch', 'tf'],
        ['python', 'aws'],
        
        // More cross-connections for denser network
        ['health', 'nn'],
        ['health', 'cv'],
        ['finance', 'ml'],
        ['finance', 'python'],
        ['edu', 'nlp'],
        ['edu', 'python'],
        ['marketing', 'cv'],
        ['marketing', 'scientist'],
        
        // Connect careers to tools
        ['scientist', 'tf'],
        ['scientist', 'aws'],
        ['engineer', 'python'],
        ['engineer', 'pytorch'],
        ['researcher', 'tf'],
        ['researcher', 'aws'],
        ['pm', 'python'],
        
        // More industry connections
        ['health', 'engineer'],
        ['finance', 'scientist'],
        ['edu', 'pm'],
        ['marketing', 'engineer'],
        
        // Connect tools to each other
        ['python', 'tf'],
        ['pytorch', 'aws'],
        
        // Ensure top and bottom nodes are connected
        ['health', 'ai'],
        ['finance', 'ai'],
        ['edu', 'ai'],
        ['marketing', 'ai'],
        ['engineer', 'ai'],
        ['scientist', 'ai'],
        ['researcher', 'ai'],
        ['pm', 'ai']
    ];
    
    // Create gradient definition
    function createGradient() {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'gradient-teal');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '100%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('style', 'stop-color:rgb(107,70,193);stop-opacity:0.6');
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('style', 'stop-color:rgb(78,205,196);stop-opacity:0.8');
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.appendChild(defs);
    }
    
    // Draw connection lines with proper coordinate mapping
    function drawConnections() {
        linesGroup.innerHTML = '';
        
        // Create gradient if not exists
        if (!svg.querySelector('#gradient-teal')) {
            createGradient();
        }
        
        connections.forEach(([from, to], index) => {
            const fromNode = container.querySelector(`[data-node="${from}"]`);
            const toNode = container.querySelector(`[data-node="${to}"]`);
            
            if (fromNode && toNode) {
                // Get positions directly from inline styles (percentages)
                const fromLeft = parseFloat(fromNode.style.left);
                const fromTop = parseFloat(fromNode.style.top);
                const toLeft = parseFloat(toNode.style.left);
                const toTop = parseFloat(toNode.style.top);
                
                // Convert percentages to SVG coordinates
                const x1 = (fromLeft / 100) * 800;
                const y1 = (fromTop / 100) * 450;
                const x2 = (toLeft / 100) * 800;
                const y2 = (toTop / 100) * 450;
                
                // Calculate control point for curve
                const midX = (x1 + x2) / 2;
                const midY = (y1 + y2) / 2;
                const offset = 20;
                
                // Create curved path
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const d = `M ${x1} ${y1} Q ${midX + offset * Math.sin(index * 0.3)} ${midY - offset * Math.cos(index * 0.3)} ${x2} ${y2}`;
                path.setAttribute('d', d);
                path.setAttribute('stroke', '#4ECDC4');
                path.setAttribute('stroke-width', '2');
                path.setAttribute('fill', 'none');
                path.setAttribute('opacity', '0.6');
                
                linesGroup.appendChild(path);
                
                // Add connection dots
                const dot1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                dot1.setAttribute('cx', x1);
                dot1.setAttribute('cy', y1);
                dot1.setAttribute('r', '3');
                dot1.setAttribute('fill', '#4ECDC4');
                dot1.setAttribute('opacity', '0.6');
                linesGroup.appendChild(dot1);
                
                const dot2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                dot2.setAttribute('cx', x2);
                dot2.setAttribute('cy', y2);
                dot2.setAttribute('r', '3');
                dot2.setAttribute('fill', '#4ECDC4');
                dot2.setAttribute('opacity', '0.6');
                linesGroup.appendChild(dot2);
            }
        });
    }
    
    // Initial draw with longer delay to ensure DOM is ready
    setTimeout(() => {
        drawConnections();
        // Redraw after a moment to ensure proper positioning
        setTimeout(drawConnections, 500);
    }, 200);
    
    // Redraw on resize
    window.addEventListener('resize', debounce(drawConnections, 250));
    
    // Remove hover effects - keeping nodes static
}

// Debounce utility function
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