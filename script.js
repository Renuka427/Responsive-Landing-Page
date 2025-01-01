document.addEventListener('DOMContentLoaded', function () {
    const emojis = document.querySelectorAll('.emoji');
    const emojiResponse = document.getElementById('emoji-response');
    const emojiResponseText = document.getElementById('emoji-response-text');
    const thankYouMessage = document.getElementById('thank-you-message');
    const navbar = document.getElementById('navbar');
    const backToTopButton = document.getElementById('back-to-top');
    const hero = document.querySelector('.hero'); // Reference to the hero section
    
    // Emoji response texts for each rating
    const responses = {
        1: "We're truly sorry to hear that! Your feedback is crucial, and we’ll make every effort to improve.",
        2: "Thank you for sharing your experience! We’re committed to making things better based on your input.",
        3: "We appreciate your honesty! Your feedback helps us strive for a higher standard.",
        4: "That’s great to hear! Thank you for your support; we aim to keep it up!",
        5: "Fantastic! We’re thrilled you’re happy with our services. We’ll continue to work hard for you!",
        6: "Thank you for the love! Your encouragement motivates us to provide the best service possible."
    };

    // Handle emoji click event
    emojis.forEach(emoji => {
        emoji.addEventListener('click', function () {
            const rating = emoji.getAttribute('data-rating');
            emojiResponseText.textContent = responses[rating];
            
            // Show emoji response and thank you message
            emojiResponse.style.display = 'block';
            thankYouMessage.style.display = 'block';
            // Add card layout for response
            emojiResponse.classList.add('card');
        });
    });

    // Scroll event handler for various UI changes
    window.addEventListener('scroll', function () {
        requestAnimationFrame(handleScroll);
    });

    // Handle scroll-based UI changes
    function handleScroll() {
        const scrollY = window.scrollY;
        const heroHeight = hero ? hero.offsetHeight : 0; // Get hero height safely

        // Debugging: Log the scroll position and hero height
        console.log("Scroll Y:", scrollY);
        console.log("Hero Height:", heroHeight);

        // Change background color based on scroll position
        document.body.style.background = (scrollY > heroHeight)
            ? 'linear-gradient(to right, #4B0082, #121212)' : '#121212';

        // Show navbar after scrolling past hero section
        if (navbar) {
            navbar.style.opacity = (scrollY > heroHeight) ? 1 : 0;
            navbar.style.transition = "opacity 0.5s ease";
        }

        // Show or hide "Back to Top" button
        if (backToTopButton) {
            backToTopButton.style.display = (scrollY > 300) ? 'block' : 'none';
        }

        // Update section background color based on viewport position
        changeSectionBackgroundColor();

        // Trigger fade-in effect for sections
        fadeInOnScroll();
    }

    // Change background color of sections when in viewport
    function changeSectionBackgroundColor() {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // If the section is in the viewport, apply the gradient background
            section.style.background = (rect.top >= 0 && rect.top <= window.innerHeight)
                ? 'linear-gradient(to right, #4B0082, #121212)' : '#121212';
        });
    }

    // Fade-in effect for sections as they come into view
    const fadeInSections = document.querySelectorAll('.fade-in');
    function fadeInOnScroll() {
        fadeInSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // If section is in view, add the 'visible' class to trigger fade-in
            if (sectionTop < windowHeight * 0.8) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    }

    // Smooth scroll to About Us section when 'Get Started' button is clicked
    const getStartedButton = document.getElementById('get-started');
    const aboutSection = document.getElementById('about');
    if (getStartedButton && aboutSection) {
        getStartedButton.addEventListener('click', function () {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Scroll to the top when the "Back to Top" button is clicked
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scroll when navbar link is clicked
    const navbarLinks = document.querySelectorAll('#navbar a');
    navbarLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1); // Remove '#' from href
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Call the fade-in function on initial load to trigger any section already in view
    fadeInOnScroll();
});
