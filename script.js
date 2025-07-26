// Initialize EmailJS with your User ID
(function() {
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
})();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling with EmailJS
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    const messageDiv = document.getElementById('form-message');
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    messageDiv.style.display = 'none';
    
    // Prepare email parameters
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    // Send email using EmailJS
    emailjs.send('default_service', 'template_12345', templateParams)
        .then(function(response) {
            // Success message
            messageDiv.className = 'success';
            messageDiv.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
            messageDiv.style.display = 'block';
            
            // Reset form
            document.getElementById('contactForm').reset();
            
            // Scroll to message
            messageDiv.scrollIntoView({behavior: 'smooth', block: 'center'});
        }, function(error) {
            // Error message
            messageDiv.className = 'error';
            messageDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error: Failed to send message. Please try again.';
            messageDiv.style.display = 'block';
            
            // Scroll to message
            messageDiv.scrollIntoView({behavior: 'smooth', block: 'center'});
        })
        .finally(function() {
            // Restore button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        header.style.backgroundColor = 'white';
    }
});

// Animation on scroll
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.service-card, .product-card, .about-image');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if(elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
window.addEventListener('load', function() {
    const elements = document.querySelectorAll('.service-card, .product-card, .about-image');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
    });
    
    // Trigger first check
    animateOnScroll();
    
    // Set current year in footer
    document.querySelector('.copyright p').innerHTML = 
        document.querySelector('.copyright p').innerHTML.replace('2023', new Date().getFullYear());
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);