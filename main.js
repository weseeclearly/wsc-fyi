// Add subtle parallax effect to links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.link-item');
    if (!links) return;
    
    links.forEach(link => {
        if (!link) return;
        
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
