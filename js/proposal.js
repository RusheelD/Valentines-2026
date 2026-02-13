// ===== PROPOSAL PAGE LOGIC =====

// Instagram quiz flip function
function flipQuiz(element) {
    element.classList.toggle('flipped');
}

// Mouse tracking for No button with glide mechanic
let noClickCount = 0;
let buttonFleeing = false;
const noBtn = document.getElementById('noBtn');
let buttonX = 0;
let buttonY = 0;
let targetX = 0;
let targetY = 0;
let buttonMoveInterval = null;
let hoverTimeout = null;
let mobileAutoMoveInterval = null;
let isTimerActive = false;
let wasHovering = false;

// More robust mobile detection
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints > 0 && window.innerWidth < 768);
}

const isMobile = isMobileDevice();

function findSafeSpot(mouseX, mouseY, minDistance) {
    const margin = 150;
    let attempts = 0;
    let newX, newY, distance;

    do {
        newX = margin + Math.random() * (window.innerWidth - 2 * margin);
        newY = margin + Math.random() * (window.innerHeight - 2 * margin);
        distance = Math.sqrt(Math.pow(newX - mouseX, 2) + Math.pow(newY - mouseY, 2));
        attempts++;
    } while (distance < minDistance && attempts < 20);

    return { x: newX, y: newY };
}

function trackMouse(e) {
    if (!buttonFleeing || !noBtn) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const btnRect = noBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const distance = Math.sqrt(
        Math.pow(mouseX - btnCenterX, 2) +
        Math.pow(mouseY - btnCenterY, 2)
    );

    let fleeDistance = 250;
    if (noClickCount >= 2) fleeDistance = 300;
    if (noClickCount >= 3) fleeDistance = 350;
    if (noClickCount >= 4) fleeDistance = 400;

    // Check if mouse is actually hovering over the button
    const isHovering = mouseX >= btnRect.left && mouseX <= btnRect.right &&
        mouseY >= btnRect.top && mouseY <= btnRect.bottom;

    // If mouse gets too close, start or update timer
    if (distance < fleeDistance) {
        let waitTime = 600;
        if (noClickCount >= 2) waitTime = 450;
        if (noClickCount >= 3) waitTime = 300;
        if (noClickCount >= 4) waitTime = 250;

        if (isHovering) {
            waitTime += 250;
        }

        if (!isTimerActive || (isHovering !== wasHovering)) {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }

            isTimerActive = true;
            wasHovering = isHovering;

            hoverTimeout = setTimeout(() => {
                const safeSpot = findSafeSpot(mouseX, mouseY, fleeDistance + 100);
                targetX = safeSpot.x;
                targetY = safeSpot.y;

                let speed = 0.5;
                if (noClickCount >= 2) speed = 0.4;
                if (noClickCount >= 3) speed = 0.3;
                if (noClickCount >= 4) speed = 0.25;

                noBtn.style.transition = `all ${speed}s cubic-bezier(0.34, 1.56, 0.64, 1)`;
                noBtn.style.left = targetX + 'px';
                noBtn.style.top = targetY + 'px';
                noBtn.style.transform = 'translate(-50%, -50%) rotate(' + (Math.random() * 360) + 'deg)';

                isTimerActive = false;
                wasHovering = false;
            }, waitTime);
        }
    } else {
        if (isTimerActive) {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;
            isTimerActive = false;
            wasHovering = false;
        }
    }
}

// Mobile auto-move function
function startMobileAutoMove() {
    if (!isMobile || !buttonFleeing) return;

    if (mobileAutoMoveInterval) {
        clearInterval(mobileAutoMoveInterval);
    }

    let moveInterval = 2000;
    if (noClickCount >= 2) moveInterval = 1500;
    if (noClickCount >= 3) moveInterval = 1000;
    if (noClickCount >= 4) moveInterval = 700;

    mobileAutoMoveInterval = setInterval(() => {
        if (!buttonFleeing) {
            clearInterval(mobileAutoMoveInterval);
            return;
        }

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const safeSpot = findSafeSpot(centerX, centerY, 200);

        let speed = 0.5;
        if (noClickCount >= 2) speed = 0.4;
        if (noClickCount >= 3) speed = 0.3;
        if (noClickCount >= 4) speed = 0.25;

        noBtn.style.transition = `all ${speed}s cubic-bezier(0.34, 1.56, 0.64, 1)`;
        noBtn.style.left = safeSpot.x + 'px';
        noBtn.style.top = safeSpot.y + 'px';
        noBtn.style.transform = 'translate(-50%, -50%) rotate(' + (Math.random() * 360) + 'deg)';
    }, moveInterval);
}

// Confetti effect
function createConfetti() {
    const confetti = document.createElement('div');
    const symbols = ['❤️', '💕', '💖', '🎉', '✨', '💗', '🍫', '🎂', '💙', '🖤'];
    confetti.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-50px';
    confetti.style.fontSize = (Math.random() * 2 + 1) + 'em';
    confetti.style.zIndex = '1000';
    confetti.style.pointerEvents = 'none';
    document.body.appendChild(confetti);

    let pos = -50;
    let rotation = 0;
    const interval = setInterval(() => {
        pos += 5;
        rotation += 10;
        confetti.style.top = pos + 'px';
        confetti.style.transform = `rotate(${rotation}deg)`;
        if (pos > window.innerHeight) {
            clearInterval(interval);
            confetti.remove();
        }
    }, 20);
}

// Handle Yes response
function handleYes() {
    const celebration = document.getElementById('celebration');
    const message = document.getElementById('responseMessage');
    const noBtnEl = document.getElementById('noBtn');
    const questionPhoto = document.getElementById('questionPhoto');
    const kissPhoto = document.getElementById('kissPhoto');

    celebration.classList.add('show');
    message.innerHTML = '<h2 style="color: rgb(255, 0, 0); margin-top: 30px;">You just made me the happiest person! 💕</h2><p>I love you so much, Bujji! Happy Valentine\'s Day! 💖🍫</p>';
    noBtnEl.style.display = 'none';

    // Switch to kissing photo
    questionPhoto.style.display = 'none';
    kissPhoto.style.display = 'block';

    // Remove mouse tracking
    isTimerActive = false;
    wasHovering = false;
    document.removeEventListener('mousemove', trackMouse);
    clearInterval(buttonMoveInterval);
    if (mobileAutoMoveInterval) clearInterval(mobileAutoMoveInterval);
    if (hoverTimeout) clearTimeout(hoverTimeout);

    // Scroll down to show the message
    setTimeout(() => {
        message.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);

    // Create confetti effect
    for (let i = 0; i < 100; i++) {
        setTimeout(() => createConfetti(), i * 30);
    }
}

// Handle No response
function handleNo() {
    noClickCount++;

    if (noClickCount === 1) {
        noBtn.innerHTML = 'Are you sure? 🥺';
        noBtn.classList.add('fleeing');
        buttonFleeing = true;
        const rect = noBtn.getBoundingClientRect();
        buttonX = rect.left + rect.width / 2;
        buttonY = rect.top + rect.height / 2;
        noBtn.style.left = buttonX + 'px';
        noBtn.style.top = buttonY + 'px';
        noBtn.style.transform = 'translate(-50%, -50%)';

        if (isMobile) {
            startMobileAutoMove();
        } else {
            document.addEventListener('mousemove', trackMouse);
        }
    } else if (noClickCount === 2) {
        noBtn.innerHTML = 'Really?? 🥺💔';
        if (isMobile) startMobileAutoMove();
    } else if (noClickCount === 3) {
        noBtn.innerHTML = 'Please, Nana? 💔';
        document.getElementById('yesBtn').style.transform = 'scale(1.2)';
        if (isMobile) startMobileAutoMove();
    } else if (noClickCount === 4) {
        noBtn.innerHTML = 'Bujji... 🥹';
        if (isMobile) startMobileAutoMove();
    } else {
        noBtn.style.display = 'none';
        isTimerActive = false;
        wasHovering = false;
        document.removeEventListener('mousemove', trackMouse);
        clearInterval(buttonMoveInterval);
        if (mobileAutoMoveInterval) clearInterval(mobileAutoMoveInterval);
        if (hoverTimeout) clearTimeout(hoverTimeout);
        document.getElementById('responseMessage').innerHTML = '<p style="color: rgb(255, 0, 0); font-size: 1.2em;">The "No" button has given up trying to escape... There\'s only one choice left, Kanna! 😊💕</p>';
        document.getElementById('yesBtn').style.transform = 'scale(1.3)';
    }
}

// Reset page function
function resetPage() {
    // Reset all sections
    document.querySelectorAll('.section').forEach((section, index) => {
        section.classList.remove('visible');
        if (index === 0) {
            section.classList.add('visible');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Reset button states
    noClickCount = 0;
    buttonFleeing = false;
    isTimerActive = false;
    wasHovering = false;
    document.removeEventListener('mousemove', trackMouse);
    clearInterval(buttonMoveInterval);
    if (mobileAutoMoveInterval) clearInterval(mobileAutoMoveInterval);
    if (hoverTimeout) clearTimeout(hoverTimeout);

    const noBtnEl = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const celebration = document.getElementById('celebration');
    const message = document.getElementById('responseMessage');
    const resetBtn = document.getElementById('resetBtn');

    noBtnEl.innerHTML = 'No';
    noBtnEl.style = '';
    noBtnEl.classList.remove('fleeing');
    noBtnEl.style.display = '';

    yesBtn.style.transform = '';

    celebration.classList.remove('show');
    message.innerHTML = '';

    resetBtn.classList.remove('visible');

    // Reset photos
    const questionPhoto = document.getElementById('questionPhoto');
    const kissPhoto = document.getElementById('kissPhoto');
    if (questionPhoto) questionPhoto.style.display = 'block';
    if (kissPhoto) kissPhoto.style.display = 'none';

    // Reset quiz flips
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('flipped');
    });

    // Show scroll hint
    document.getElementById('scrollHint').style.display = 'block';
}

// Keyboard shortcut for reset (press 'R')
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        resetPage();
    }
});
