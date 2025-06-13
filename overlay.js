document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('overlay');
    const mainContent = document.getElementById('main-content');
    const audio = document.getElementById('background-music');

    audio.pause();
    audio.currentTime = 0;

    overlay.addEventListener('click', function () {
        overlay.style.display = 'none';
        mainContent.classList.remove('hidden');
        audio.play().catch(function (error) {
            console.error('Fehler beim Abspielen der Musik:', error);
        });
    });

    overlay.addEventListener('click', function (e) {
        e.preventDefault();
    });
});