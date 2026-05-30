/* -------------------------------------------------------------
   PREMIUM MINIMAL TECH PORTFOLIO - CORE APPLICATION LOGIC
------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialise Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Custom Cursor Physics (Lerp)
    initCustomCursor();

    // 3. Header Scroll Behavior
    initHeaderScroll();

    // 4. Typing Text Effect
    initTypingEffect();

    // 5. GSAP SplitText Character Animation
    initSplitText();

    // 6. Scroll Reveal Observer
    initScrollReveal();
});

// Initialize LogoLoop marquee ticker on page full load
window.addEventListener('load', () => {
    initLogoLoop();
});

/* -------------------------------------------------------------
   CUSTOM CURSOR LOGIC
------------------------------------------------------------- */
function initCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const spotlight = document.getElementById('spotlight');
    
    let mouseX = 0, mouseY = 0;       // Actual mouse coordinates
    let dotX = 0, dotY = 0;           // Rendered dot coordinates (fast tracking)
    let ringX = 0, ringY = 0;         // Rendered ring coordinates (physics trailing)
    
    let isMoving = false;
    let isActive = false;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isActive) {
            isActive = true;
            document.body.classList.add('cursor-active');
            spotlight.style.opacity = '1';
        }
        isMoving = true;
    });

    window.addEventListener('mouseout', (e) => {
        // If cursor leaves window boundaries
        if (e.relatedTarget === null) {
            isActive = false;
            document.body.classList.remove('cursor-active');
            spotlight.style.opacity = '0';
        }
    });

    // Animation Loop for Smooth Trailing (lerp)
    function renderCursor() {
        // Dot tracks mouse quickly
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        
        // Ring tracks with a physics delay
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        
        dot.style.left = `${dotX}px`;
        dot.style.top = `${dotY}px`;
        
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
        
        // Spotlight tracking
        spotlight.style.left = `${mouseX}px`;
        spotlight.style.top = `${mouseY}px`;
        
        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Interactive Hover Classes
    const hoverElements = document.querySelectorAll('a, button, select, input, textarea, .sidebar-tab, .cursor-hover-expand');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hovering');
        });
    });
}

/* -------------------------------------------------------------
   HEADER SCROLL BEHAVIOR
------------------------------------------------------------- */
function initHeaderScroll() {
    const header = document.querySelector('.header-container');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* -------------------------------------------------------------
   DYNAMIC HERO SUBTITLE TYPING LOGIC
------------------------------------------------------------- */
function initTypingEffect() {
    const textSpan = document.getElementById('dynamic-text');
    const roles = [
        "Python Developer",
        "AI & ML Student",
        "Wipro CIO Org Intern",
        "Robotics ML Developer",
        "Data Analyst"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Delete characters
            textSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deletes faster
        } else {
            // Type characters
            textSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Wait at peak before deleting
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}



/* -------------------------------------------------------------
   SCROLL REVEAL LOGIC
------------------------------------------------------------- */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(el => observer.observe(el));
}



/* -------------------------------------------------------------
   FORM SUBMISSION (JSON POST API REQUEST SIMULATION)
------------------------------------------------------------- */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('form-submit-btn');
    const statusDiv = document.getElementById('form-status');
    
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const subject = document.getElementById('form-subject').value;
    const message = document.getElementById('form-message').value;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending Request... <i data-lucide="loader" class="btn-icon animate-spin"></i>';
    if (window.lucide) window.lucide.createIcons();
    
    // Simulate API Network latency
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Execute Request <i data-lucide="send" class="btn-icon"></i>';
        if (window.lucide) window.lucide.createIcons();
        
        statusDiv.style.display = 'block';
        statusDiv.className = 'form-status success';
        statusDiv.innerHTML = `
            <strong>HTTP/1.1 201 Created</strong><br>
            Content-Type: application/json<br><br>
            {<br>
            &nbsp;&nbsp;"status": "success",<br>
            &nbsp;&nbsp;"inserted_id": "msg_${Math.random().toString(36).substring(2, 9)}",<br>
            &nbsp;&nbsp;"message": "Thank you, ${name}. Your message regarding '${subject}' has been delivered to Tharanika."<br>
            }
        `;
        
        // Reset form inputs
        document.getElementById('contact-form').reset();
    }, 1500);
}

/* -------------------------------------------------------------
   GSAP SPLITTEXT CHARACTER ANIMATION
------------------------------------------------------------- */
function initSplitText() {
    if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);
    } else {
        console.warn("GSAP or ScrollTrigger CDN failed to load.");
        return;
    }

    const splitTargets = document.querySelectorAll('.split-text');
    splitTargets.forEach(el => {
        const rawText = el.textContent.trim();
        el.innerHTML = '';
        el.classList.add('split-parent');

        const words = rawText.split(' ');
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'split-word';
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';

            for (let char of word) {
                const charSpan = document.createElement('span');
                charSpan.className = 'split-char';
                charSpan.textContent = char;
                wordSpan.appendChild(charSpan);
            }

            el.appendChild(wordSpan);

            if (wordIndex < words.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.innerHTML = '&nbsp;';
                spaceSpan.style.display = 'inline-block';
                el.appendChild(spaceSpan);
            }
        });

        const chars = el.querySelectorAll('.split-char');
        window.gsap.fromTo(chars, 
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
                stagger: 0.1, // delay between character animations (100ms)
                scrollTrigger: {
                    trigger: el,
                    start: 'top 95%',
                    once: true,
                    fastScrollEnd: true
                }
            }
        );
    });
}



/* -------------------------------------------------------------
   VANILLA LOGOLOOP RUNTIME CONTROLLER
------------------------------------------------------------- */
function initLogoLoop() {
    const container = document.getElementById('tech-logo-loop');
    if (!container) return;

    const track = container.querySelector('.logoloop__track');
    const originalList = container.querySelector('.logoloop__list');
    if (!track || !originalList) return;

    // Double-check list dimensions
    const listRect = originalList.getBoundingClientRect();
    const listWidth = listRect.width || 400; // Fallback width if loaded width is small
    const containerWidth = container.clientWidth || 1000;

    // Calculate copy dimensions matching React component logic
    const copiesNeeded = Math.ceil(containerWidth / listWidth) + 3;

    for (let i = 1; i < copiesNeeded; i++) {
        const clone = originalList.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    }

    let speed = 60; // Scrolling velocity pixels per second
    let offset = 0;
    let lastTime = performance.now();
    let isHovered = false;

    // Pause on hover
    track.addEventListener('mouseenter', () => { isHovered = true; });
    track.addEventListener('mouseleave', () => { isHovered = false; });

    function animateLoop(timestamp) {
        const deltaTime = (timestamp - lastTime) / 1000;
        lastTime = timestamp;

        const targetSpeed = isHovered ? 0 : speed;
        offset += targetSpeed * deltaTime;

        if (offset >= listWidth) {
            offset = offset % listWidth;
        }

        track.style.transform = `translate3d(${-offset}px, 0, 0)`;

        requestAnimationFrame(animateLoop);
    }

    requestAnimationFrame(animateLoop);
}


