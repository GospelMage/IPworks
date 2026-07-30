document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Mobile Menu Toggle (Adds a hamburger functionality) ---
    // Note: You will need to add a <button> with class "menu-toggle" in your nav to use this.
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // --- 2. Active Link Highlighting ---
    // Automatically adds the 'active' class to the nav link that matches the current page URL.
    const currentLocation = window.location.pathname.split('/').pop(); // Gets the current file name (e.g., 'about.html')
    const navLinksAll = document.querySelectorAll('.nav-links a');

    navLinksAll.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentLocation) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- 3. Smooth Scroll for internal anchor links (e.g., #section1) ---
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Stops the page from jumping instantly
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- 4. Console Log to confirm JS is loaded ---
    console.log("Vanguard JS loaded successfully!");
});