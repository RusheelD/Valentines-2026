// ===== TEDDY DAY LOGIC =====
let teddyCount = 0;
let teddyPopupShown = false;

function clickTeddy() {
    teddyCount++;
    document.getElementById('teddyCount').textContent = teddyCount;

    if (teddyCount === 10 && !teddyPopupShown) {
        teddyPopupShown = true;
        const bubble = document.getElementById('teddySpeech');
        bubble.classList.add('show');
        // Fade out after 1 minute
        setTimeout(() => {
            bubble.classList.add('fade-out');
            bubble.classList.remove('show');
        }, 60000);
    }
}
