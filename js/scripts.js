/*!
 * Modern Portfolio with GSAP Animations
 * Enhanced from Start Bootstrap - Resume v6.0.2
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

(function ($) {
    "use strict";

    // ========================================
    // INITIALIZATION & SETUP
    // ========================================
    
    // Wait for DOM content to load
    document.addEventListener('DOMContentLoaded', function() {
        initializeAnimations();
        setupScrollTriggers();
        setupParallax();
        setupHorizontalCarousel();
        setupMicroInteractions();
        setupNavigation();
        setupActiveNavDetection();
        setupModernSections(); // Add modern sections animations
    });

    // ========================================
    // HERO SECTION ANIMATIONS
    // ========================================
    
    function initializeAnimations() {
        // Set initial states for elements that will be animated
        gsap.set([".hero-title-line", ".hero-subtitle", ".hero-cta", ".hero-stats", ".hero-social", ".hero-scroll"], {
            opacity: 0,
            y: 50
        });

        gsap.set(".hero-floating-card", {
            opacity: 0,
            y: 100,
            rotation: 15
        });

        gsap.set(".hero-badge", {
            opacity: 0,
            y: 30,
            scale: 0.8
        });

        gsap.set(".bg-circle", {
            opacity: 0,
            scale: 0
        });

        // Modern Hero animation timeline
        const heroTl = gsap.timeline({ delay: 0.5 });
        
        heroTl
            // Animate background elements first
            .to(".bg-circle", {
                opacity: 1,
                scale: 1,
                duration: 2,
                stagger: 0.3,
                ease: "power2.out"
            })
            // Animate hero badge
            .to(".hero-badge", {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=1.5")
            // Animate hero title lines
            .to(".hero-title-line", {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.3,
                ease: "power4.out"
            }, "-=0.4")
            // Animate subtitle
            .to(".hero-subtitle", {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8")
            // Animate stats
            .to(".hero-stats", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.6")
            // Animate CTA buttons
            .to(".hero-cta", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.4")
            // Animate social links
            .to(".hero-social", {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out"
            }, "-=0.4")
            // Animate floating cards
            .to(".hero-floating-card", {
                opacity: 1,
                y: 0,
                rotation: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power4.out"
            }, "-=1")
            // Animate scroll indicator
            .to(".hero-scroll", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.5");
    }

    // ========================================
    // SCROLL TRIGGER ANIMATIONS
    // ========================================
    
    function setupScrollTriggers() {
        // Section fade-in animations
        gsap.utils.toArray(".section-animate").forEach((section, i) => {
            gsap.fromTo(section, 
                {
                    opacity: 0,
                    y: 100
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Experience items animation
        gsap.utils.toArray(".experience-item").forEach((item, i) => {
            gsap.fromTo(item,
                {
                    opacity: 0,
                    x: -50,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    delay: i * 0.1
                }
            );
        });

        // Skills grid animation
        gsap.utils.toArray(".skill-item").forEach((skill, i) => {
            gsap.fromTo(skill,
                {
                    opacity: 0,
                    scale: 0,
                    rotation: -180
                },
                {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: skill,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    delay: i * 0.05
                }
            );
        });
    }

    // ========================================
    // PARALLAX EFFECTS
    // ========================================
    
    function setupParallax() {
        // Background parallax layers
        gsap.utils.toArray(".parallax-layer").forEach((layer, i) => {
            const speed = layer.dataset.speed || 0.5;
            const yPercent = -50 * speed;

            gsap.to(layer, {
                yPercent: yPercent,
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Section title parallax
        gsap.utils.toArray(".section-title").forEach(title => {
            gsap.to(title, {
                yPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: title,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });
    }

    // ========================================
    // HORIZONTAL PROJECT CAROUSEL
    // ========================================
    
    function setupHorizontalCarousel() {
        const projectsSection = document.querySelector(".projects-section");
        const projectTrack = document.querySelector(".project-track");
        const projectCards = gsap.utils.toArray(".project-card");

        if (!projectsSection || !projectTrack || projectCards.length === 0) return;

        // Calculate total width for horizontal scroll
        const getScrollAmount = () => {
            let trackWidth = projectTrack.scrollWidth;
            return -(trackWidth - window.innerWidth);
        };

        // Set initial state for project cards
        gsap.set(projectCards, {
            opacity: 0,
            scale: 0.8,
            y: 50
        });

        // Horizontal scroll animation
        const horizontalTween = gsap.to(projectTrack, {
            x: getScrollAmount,
            duration: 3,
            ease: "none"
        });

        // Pin the projects section and enable horizontal scroll
        ScrollTrigger.create({
            trigger: projectsSection,
            start: "top top",
            end: () => "+=" + (projectTrack.scrollWidth - window.innerWidth),
            pin: true,
            animation: horizontalTween,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1
        });

        // Animate project cards as they come into view
        projectCards.forEach((card, i) => {
            gsap.to(card, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "left 80%",
                    end: "right 20%",
                    horizontal: true,
                    containerAnimation: horizontalTween,
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Update on window resize
        window.addEventListener("resize", () => {
            ScrollTrigger.refresh();
        });
    }

    // ========================================
    // MICRO-INTERACTIONS
    // ========================================
    
    function setupMicroInteractions() {
        // Button hover animations
        gsap.utils.toArray(".btn-hero").forEach(btn => {
            btn.addEventListener("mouseenter", () => {
                gsap.to(btn, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            btn.addEventListener("mouseleave", () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Project card hover effects
        gsap.utils.toArray(".project-card").forEach(card => {
            const image = card.querySelector(".project-image img");
            const content = card.querySelector(".project-content");

            card.addEventListener("mouseenter", () => {
                gsap.to(card, {
                    y: -10,
                    scale: 1.02,
                    duration: 0.4,
                    ease: "power2.out"
                });

                if (image) {
                    gsap.to(image, {
                        scale: 1.1,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }

                if (content) {
                    gsap.to(content, {
                        y: -5,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }
            });

            card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out"
                });

                if (image) {
                    gsap.to(image, {
                        scale: 1,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }

                if (content) {
                    gsap.to(content, {
                        y: 0,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }
            });
        });

        // Social icons ripple effect
        gsap.utils.toArray(".social-icon").forEach(icon => {
            icon.addEventListener("click", (e) => {
                const ripple = document.createElement("div");
                ripple.classList.add("ripple");
                icon.appendChild(ripple);

                const rect = icon.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + "px";
                ripple.style.left = x + "px";
                ripple.style.top = y + "px";

                gsap.fromTo(ripple, 
                    { scale: 0, opacity: 1 },
                    { 
                        scale: 2, 
                        opacity: 0, 
                        duration: 0.6,
                        ease: "power2.out",
                        onComplete: () => ripple.remove()
                    }
                );
            });
        });

        // Skill item rotation on hover
        gsap.utils.toArray(".skill-item").forEach(skill => {
            skill.addEventListener("mouseenter", () => {
                gsap.to(skill, {
                    rotation: 360,
                    scale: 1.1,
                    duration: 0.6,
                    ease: "power2.out"
                });
            });

            skill.addEventListener("mouseleave", () => {
                gsap.to(skill, {
                    rotation: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out"
                });
            });
        });
    }

    // ========================================
    // MODERN SECTION ANIMATIONS
    // ========================================
    
    function setupModernSections() {
        // About section animation
        const aboutSection = document.querySelector(".about-section");
        if (aboutSection) {
            const aboutTitle = aboutSection.querySelector(".section-title");
            const aboutContent = aboutSection.querySelector(".about-content");
            const aboutImage = aboutSection.querySelector(".about-image");

            if (aboutTitle) {
                gsap.fromTo(aboutTitle, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: aboutTitle,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

            if (aboutContent) {
                gsap.fromTo(aboutContent, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: aboutContent,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

            if (aboutImage) {
                gsap.fromTo(aboutImage, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: aboutImage,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        }

        // Projects section animation
        const projectsSection = document.querySelector(".projects-section");
        if (projectsSection) {
            const projectsTitle = projectsSection.querySelector(".section-title");
            const projectsContent = projectsSection.querySelector(".projects-content");
            const projectsGrid = projectsSection.querySelector(".project-grid");

            if (projectsTitle) {
                gsap.fromTo(projectsTitle, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: projectsTitle,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

            if (projectsContent) {
                gsap.fromTo(projectsContent, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: projectsContent,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

            if (projectsGrid) {
                gsap.fromTo(projectsGrid, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: projectsGrid,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        }

        // Skills section animation
        const skillsSection = document.querySelector(".skills-section");
        if (skillsSection) {
            const skillsTitle = skillsSection.querySelector(".section-title");
            const skillsContent = skillsSection.querySelector(".skills-content");
            const skillsGrid = skillsSection.querySelector(".skill-grid");

            if (skillsTitle) {
                gsap.fromTo(skillsTitle, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: skillsTitle,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

            if (skillsContent) {
                gsap.fromTo(skillsContent, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: skillsContent,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

            if (skillsGrid) {
                gsap.fromTo(skillsGrid, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: skillsGrid,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        }

        // Contact section animation
        const contactSection = document.querySelector(".contact-section");
        if (contactSection) {
            const contactTitle = contactSection.querySelector(".section-title");
            const contactContent = contactSection.querySelector(".contact-content");
            const contactForm = contactSection.querySelector(".contact-form");

            if (contactTitle) {
                gsap.fromTo(contactTitle, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: contactTitle,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

            if (contactContent) {
                gsap.fromTo(contactContent, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: contactContent,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

            if (contactForm) {
                gsap.fromTo(contactForm, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: contactForm,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        }
    }

    // ========================================
    // NAVIGATION ENHANCEMENTS
    // ========================================
    
    function setupNavigation() {
        // Smooth scrolling for navigation links
        gsap.utils.toArray('a.js-scroll-trigger[href*="#"]:not([href="#"])').forEach(link => {
            link.addEventListener('click', function(e) {
                if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && 
                    location.hostname === this.hostname) {
                    
                    const target = document.querySelector(this.hash);
                    if (target) {
                        e.preventDefault();
                        
                        // Calculate offset based on navbar height
                        const navbarHeight = document.querySelector('#sideNav').offsetHeight || 60;
                        const offsetY = window.innerWidth > 768 ? 80 : navbarHeight + 20;
                        
                        gsap.to(window, {
                            duration: 1.2,
                            scrollTo: {
                                y: target,
                                offsetY: offsetY
                            },
                            ease: "power2.inOut",
                            onComplete: () => {
                                // Update URL hash
                                history.pushState(null, null, this.hash);
                                
                                // Update active navigation state
                                updateActiveNavigation(this.hash);
                            }
                        });

                        // Close mobile menu if open
                        const navbarCollapse = document.querySelector('.navbar-collapse');
                        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                            $(navbarCollapse).collapse('hide');
                        }
                    }
                }
            });
        });

        // Navigation link hover effects
        gsap.utils.toArray('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Mobile menu toggle animation
        const navbarToggle = document.querySelector('.navbar-toggler');
        if (navbarToggle) {
            navbarToggle.addEventListener('click', () => {
                gsap.to(navbarToggle, {
                    rotation: 180,
                    duration: 0.3,
                    ease: "power2.out"
                });

                setTimeout(() => {
                    gsap.to(navbarToggle, {
                        rotation: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }, 300);
            });
        }
    }

    // Update active navigation state
    function updateActiveNavigation(activeHash) {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === activeHash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Setup automatic active navigation detection on scroll
    function setupActiveNavDetection() {
        const sections = ['#hero', '#about', '#experience', '#projects', '#education', '#skills', '#interests'];
        
        sections.forEach(sectionId => {
            const section = document.querySelector(sectionId);
            if (section) {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => updateActiveNavigation(sectionId),
                    onEnterBack: () => updateActiveNavigation(sectionId)
                });
            }
        });
    }

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    
    // Refresh ScrollTrigger on resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });

    // Smooth scroll for legacy browsers
    if (!window.CSS || !CSS.supports || !CSS.supports('scroll-behavior', 'smooth')) {
        $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && 
                location.hostname === this.hostname) {
                const target = $(this.hash);
                const targetElement = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                
                if (targetElement.length) {
                    $("html, body").animate({
                        scrollTop: targetElement.offset().top
                    }, 1000, "easeInOutExpo");
                    return false;
                }
            }
        });
    }

    // Update active navigation link based on scroll position
    $("body").scrollspy({
        target: "#sideNav",
        offset: 100
    });

    // ========================================
    // MOBILE OPTIMIZATIONS
    // ========================================
    
    // Disable parallax on mobile for performance
    if (window.innerWidth <= 768) {
        ScrollTrigger.batch(".parallax-layer", {
            onEnter: () => {
                // Disable parallax animations on mobile
            }
        });
    }

    // Reduce motion for accessibility
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set("*", { duration: 0.01 });
        ScrollTrigger.refresh();
    }

})(jQuery); // End of use strict

    // ========================================
    // ENHANCED MODERN SECTIONS ANIMATIONS
    // ========================================
    
    function setupModernSectionsAnimations() {
        // About Section Animations
        setupAboutSectionAnimations();
        
        // Experience Section Animations  
        setupExperienceSectionAnimations();
        
        // Education Section Animations
        setupEducationSectionAnimations();
        
        // Interests Section Animations
        setupInterestsSectionAnimations();
        
        // Skills Section Animations
        setupSkillsSectionAnimations();
    }

    function setupAboutSectionAnimations() {
        const aboutSection = document.querySelector('.about-section-modern');
        if (!aboutSection) return;

        // Animate section badge
        gsap.fromTo('.about-section-modern .section-badge', {
            opacity: 0,
            y: 30,
            scale: 0.8
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: aboutSection,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate profile avatar with ring
        gsap.fromTo('.profile-avatar', {
            opacity: 0,
            scale: 0,
            rotation: -180
        }, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.profile-avatar',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate tech badges with stagger
        gsap.fromTo('.tech-badge', {
            opacity: 0,
            y: 20,
            scale: 0.8
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.tech-highlights',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate contact cards
        gsap.fromTo('.contact-card', {
            opacity: 0,
            x: -30,
            scale: 0.9
        }, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.about-contact-grid',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate social links
        gsap.fromTo('.social-link-modern', {
            opacity: 0,
            y: 20,
            scale: 0.8
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.social-links-modern',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    }

    function setupExperienceSectionAnimations() {
        const experienceSection = document.querySelector('.experience-section-modern');
        if (!experienceSection) return;

        // Animate timeline line
        gsap.fromTo('.timeline-line', {
            height: 0
        }, {
            height: "100%",
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.experience-timeline',
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1
            }
        });

        // Animate experience items
        gsap.utils.toArray('.experience-item').forEach((item, i) => {
            // Timeline dot animation
            gsap.fromTo(item.querySelector('.timeline-dot'), {
                opacity: 0,
                scale: 0,
                rotation: -180
            }, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            // Experience card animation
            gsap.fromTo(item.querySelector('.experience-card'), {
                opacity: 0,
                x: 50,
                scale: 0.9
            }, {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2,
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            // Tech tags animation
            gsap.fromTo(item.querySelectorAll('.tech-tag'), {
                opacity: 0,
                y: 20,
                scale: 0.8
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1,
                delay: 0.5,
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    function setupEducationSectionAnimations() {
        const educationSection = document.querySelector('.education-section-modern');
        if (!educationSection) return;

        // Animate education cards
        gsap.utils.toArray('.education-card').forEach((card, i) => {
            // Card entrance animation
            gsap.fromTo(card, {
                opacity: 0,
                y: 50,
                scale: 0.9,
                rotation: 5
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: i * 0.2,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            // Icon animation
            gsap.fromTo(card.querySelector('.education-icon'), {
                opacity: 0,
                scale: 0,
                rotation: -180
            }, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
                delay: i * 0.2 + 0.3,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            // Highlight tags animation
            gsap.fromTo(card.querySelectorAll('.highlight-tag'), {
                opacity: 0,
                y: 20,
                scale: 0.8
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1,
                delay: i * 0.2 + 0.6,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Platform items animation
        gsap.fromTo('.platform-item', {
            opacity: 0,
            x: -20,
            scale: 0.9
        }, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.learning-platforms',
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    }

    function setupInterestsSectionAnimations() {
        const interestsSection = document.querySelector('.interests-section-modern');
        if (!interestsSection) return;

        // Interest cards animation
        gsap.utils.toArray('.interest-card').forEach((card, i) => {
            gsap.fromTo(card, {
                opacity: 0,
                y: 30,
                scale: 0.9,
                rotation: Math.random() * 10 - 5 // Random rotation between -5 and 5
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            // Icon bounce animation
            gsap.fromTo(card.querySelector('.interest-icon'), {
                scale: 0,
                rotation: -180
            }, {
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
                delay: i * 0.1 + 0.3,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Philosophy card special animation
        const philosophyCard = document.querySelector('.philosophy-card');
        if (philosophyCard) {
            gsap.fromTo(philosophyCard, {
                opacity: 0,
                scale: 0.8,
                y: 50
            }, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: philosophyCard,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            // Philosophy icon glow effect
            gsap.fromTo(philosophyCard.querySelector('.philosophy-icon'), {
                opacity: 0,
                scale: 0,
                boxShadow: "0 0 0px rgba(139, 92, 246, 0)"
            }, {
                opacity: 1,
                scale: 1,
                boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
                duration: 1,
                ease: "back.out(1.7)",
                delay: 0.3,
                scrollTrigger: {
                    trigger: philosophyCard,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    }

    function setupSkillsSectionAnimations() {
        const skillsSection = document.querySelector('.skills-section-modern');
        if (!skillsSection) return;

        // Skill categories animation - Updated for masonry layout
        gsap.utils.toArray('.skill-category-masonry').forEach((category, i) => {
            // Category entrance
            gsap.fromTo(category, {
                opacity: 0,
                y: 80,
                scale: 0.9
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                delay: i * 0.2,
                scrollTrigger: {
                    trigger: category,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            // Category icon animation
            gsap.fromTo(category.querySelector('.category-icon'), {
                opacity: 0,
                scale: 0,
                rotation: -180
            }, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
                delay: i * 0.2 + 0.3,
                scrollTrigger: {
                    trigger: category,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            // Skill cards within category - Updated for masonry layout
            gsap.utils.toArray(category.querySelectorAll('.skill-card-masonry')).forEach((card, j) => {
                gsap.fromTo(card, {
                    opacity: 0,
                    x: -30,
                    scale: 0.8
                }, {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    delay: i * 0.2 + 0.5 + j * 0.08,
                    scrollTrigger: {
                        trigger: category,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Skill progress bar animation - Updated for masonry layout
                const progressBar = card.querySelector('.skill-progress-masonry');
                if (progressBar) {
                    const width = progressBar.getAttribute('data-width') + '%';
                    gsap.fromTo(progressBar, {
                        width: "0%"
                    }, {
                        width: width,
                        duration: 1.5,
                        ease: "power2.out",
                        delay: i * 0.2 + 0.8 + j * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    });
                }
            });
        });
    }

    // Enhanced micro-interactions for modern sections
    function setupModernMicroInteractions() {
        // Tech badge hover effects
        gsap.utils.toArray('.tech-badge').forEach(badge => {
            badge.addEventListener('mouseenter', () => {
                gsap.to(badge, {
                    scale: 1.1,
                    y: -3,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            badge.addEventListener('mouseleave', () => {
                gsap.to(badge, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Education card hover effects
        gsap.utils.toArray('.education-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    scale: 1.02,
                    duration: 0.4,
                    ease: "power2.out"
                });

                gsap.to(card.querySelector('.education-icon'), {
                    rotation: 360,
                    duration: 0.6,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out"
                });

                gsap.to(card.querySelector('.education-icon'), {
                    rotation: 0,
                    duration: 0.6,
                    ease: "power2.out"
                });
            });
        });

        // Interest card hover effects
        gsap.utils.toArray('.interest-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -5,
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(card.querySelector('.interest-icon'), {
                    scale: 1.1,
                    rotation: 15,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(card.querySelector('.interest-icon'), {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Skill card hover effects with progress bar animation - Updated for masonry layout
        gsap.utils.toArray('.skill-card-masonry').forEach(card => {
            const icon = card.querySelector('.skill-icon-masonry');
            
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -3,
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });

                if (icon) {
                    gsap.to(icon, {
                        scale: 1.1,
                        rotation: 5,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }

                const progressBar = card.querySelector('.skill-progress-masonry');
                if (progressBar) {
                    gsap.to(progressBar, {
                        boxShadow: "0 0 10px rgba(139, 92, 246, 0.5)",
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

                if (icon) {
                    gsap.to(icon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }

                const progressBar = card.querySelector('.skill-progress-masonry');
                if (progressBar) {
                    gsap.to(progressBar, {
                        boxShadow: "0 0 0px rgba(139, 92, 246, 0)",
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        });
    }

    // Initialize all modern section animations
    document.addEventListener('DOMContentLoaded', function() {
        setupModernSectionsAnimations();
        setupModernMicroInteractions();
    });

