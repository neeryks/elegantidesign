document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.sqs-gallery-block-slider .sqs-gallery');

    sliders.forEach(slider => {
        console.log('Initializing slider', slider);
        // Find all images that are meant to be slides
        // We look for img.thumb-image. 
        // Note: The HTML might contain noscript tags which we should ignore.
        const images = Array.from(slider.querySelectorAll('img.thumb-image'));
        
        if (images.length === 0) return;

        // Create a track container
        const track = document.createElement('div');
        track.className = 'custom-slider-track';
        
        // Move images into the track, wrapped in slide divs
        images.forEach(img => {
            const slide = document.createElement('div');
            slide.className = 'custom-slide';
            
            // Clone the image to avoid issues with existing event listeners or weird state, 
            // though moving the element is usually fine. 
            // Let's just move the element.
            // We also need to ensure the image is visible.
            img.style.display = 'block';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.removeAttribute('data-load');
            img.removeAttribute('data-src');
            
            slide.appendChild(img);
            track.appendChild(slide);
        });

        // Clear the slider container (removes noscripts and old text nodes)
        slider.innerHTML = '';
        slider.appendChild(track);

        // State
        let currentIndex = 0;
        const totalSlides = images.length;
        const intervalTime = 5000; // 5 seconds

        // Function to move to next slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }

        function updateSlider() {
            const translateX = -(currentIndex * 100);
            track.style.transform = `translateX(${translateX}%)`;
        }

        // Start auto-play
        setInterval(nextSlide, intervalTime);
    });
});
