// Create floating hearts and photo thumbnails in the background
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💙', '🖤'];

    // Add hearts
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 8 + 's';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'em';
        container.appendChild(heart);
    }

    // Add floating photo thumbnails
    const photos = [
        'photos/Close-Together-Cute.jpeg',
        'photos/Photo-Together-3.jpeg',
        'photos/Sitting-Closer.jpg',
        'photos/Close-Together-With-Love.jpeg',
        'photos/Sitting-Close.jpg',
        'photos/Photo-Together-1.jpeg'
    ];

    for (let i = 0; i < 8; i++) {
        const photo = document.createElement('img');
        photo.className = 'floating-photo';
        photo.src = photos[Math.floor(Math.random() * photos.length)];
        photo.alt = 'Us';
        photo.style.left = Math.random() * 100 + '%';
        photo.style.animationDelay = Math.random() * 10 + 's';
        photo.style.animationDuration = (Math.random() * 5 + 8) + 's';
        container.appendChild(photo);
    }
}

createFloatingHearts();
