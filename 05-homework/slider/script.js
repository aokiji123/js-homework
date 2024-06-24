document.addEventListener('DOMContentLoaded', function() {
    const images = [
        'images/cats.png',
        'images/cat.png',
        'images/cat2.png',
    ];

    let currentIndex = 0;

    const galleryImage = document.getElementById('galleryImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function updateGallery() {
        galleryImage.src = images[currentIndex];
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === images.length - 1;
    }

    window.prevImage = function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateGallery();
        }
    };

    window.nextImage = function() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateGallery();
        }
    };

    updateGallery();
});
