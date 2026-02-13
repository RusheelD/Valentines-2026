// Tab switching
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    if (tab === 'bigday') {
        document.getElementById('tabBigday').classList.add('active');
        document.getElementById('bigdayTab').classList.add('active');
    } else if (tab === 'proposal') {
        document.getElementById('tabProposal').classList.add('active');
        document.getElementById('proposalTab').classList.add('active');
    } else {
        document.getElementById('tabTeddy').classList.add('active');
        document.getElementById('teddyTab').classList.add('active');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
}

// Show section function
function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.add('visible');
    setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    updateScrollHint(sectionId);
}

// Update scroll hint visibility
function updateScrollHint(currentSection) {
    const scrollHint = document.getElementById('scrollHint');
    const resetBtn = document.getElementById('resetBtn');
    if (currentSection === 'section9') {
        scrollHint.style.display = 'none';
        resetBtn.classList.add('visible');
    }
}
