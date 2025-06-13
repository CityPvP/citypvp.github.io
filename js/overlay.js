document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('overlay');
    const mainContent = document.getElementById('main-content');
    const audio = document.getElementById('background-music');

    // Stelle sicher, dass die Musik initial pausiert ist
    audio.pause();
    audio.currentTime = 0; // Zurücksetzen auf Anfang

    // Event-Listener für Klick auf das Overlay
    overlay.addEventListener('click', function () {
        // Verstecke das Overlay
        overlay.style.display = 'none';
        // Zeige den Hauptinhalt
        mainContent.classList.remove('hidden');
        // Starte die Musik
        audio.play().catch(function (error) {
            console.error('Fehler beim Abspielen der Musik:', error);
        });
    });

    // Verhindere, dass der Klick auf das Overlay die Seite scrollt
    overlay.addEventListener('click', function (e) {
        e.preventDefault();
    });
});