window.addEventListener('load', function() {
    // Run after a short delay to ensure Squarespace scripts have finished
    setTimeout(initCustomSlider, 500);
});

function initCustomSlider() {
    console.log('Initializing Custom Slider...');
    const sliders = document.querySelectorAll('.sqs-gallery-block-slider .sqs-gallery');

    if (sliders.length === 0) {
        console.warn('No sliders found matching .sqs-gallery-block-slider .sqs-gallery');
        return;
    }

    sliders.forEach((slider, index) => {
        console.log(`Processing slider ${index + 1}`);
        
        // Find all images. We look for img tags that are NOT inside noscript.
        // We also filter out any that might be hidden or 0x0 if possible, but mostly we just want the source images.
        // Squarespace might have duplicated them or wrapped them.
        // Let's look for the original images we modified.
        let images = Array.from(slider.querySelectorAll('img'));
        
        // Filter out noscript images just in case querySelectorAll picked them up (it shouldn't, but good to be safe)
        images = images.filter(img => !img.closest('noscript'));

        if (images.length === 0) {
            console.warn('No images found in slider');
            return;
        }

        console.log(`Found ${images.length} images`);

        // Create a track container
        const track = document.createElement('div');
        track.className = 'custom-slider-track';
        
        // Move images into the track
        images.forEach(img => {
            const slide = document.createElement('div');
            slide.className = 'custom-slide';
            
            // Clean up image attributes
            img.removeAttribute('data-load');
            img.removeAttribute('data-src');
            img.removeAttribute('srcset'); // Remove srcset to force src usage
            img.removeAttribute('style'); // Remove inline styles from Squarespace
            
            // Force styles
            img.style.display = 'block';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.opacity = '1';
            img.style.visibility = 'visible';
            
            slide.appendChild(img);
            track.appendChild(slide);
        });

        // Clear the slider container completely
        slider.innerHTML = '';
        slider.appendChild(track);
        
        // Force slider styles
        slider.style.opacity = '1';
        slider.style.visibility = 'visible';
        slider.style.height = '100%'; // Ensure it fills the container

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
        if (totalSlides > 1) {
            setInterval(nextSlide, intervalTime);
        }
    });
}
