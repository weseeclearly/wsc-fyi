document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submissions
    const contactForm = document.getElementById('contact');
    const newsletterForm = document.getElementById('newsletter');

    [contactForm, newsletterForm].forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Add your form submission logic here
            const formData = new FormData(form);
            console.log('Form submitted:', Object.fromEntries(formData));
            // Reset form
            form.reset();
        });
    });

    // Add subtle parallax effect to links
    const links = document.querySelectorAll('.link-item');
    links.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            const dx = (x - xc) / 20;
            const dy = (y - yc) / 20;
            
            link.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translate3d(0, 0, 0)';
        });
    });
});
