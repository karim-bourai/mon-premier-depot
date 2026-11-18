const bouton = document.getElementById('btnMessage');

bouton.addEventListener('click', () => {
    document.getElementById('message').textContent =
        'Bienvenue dans notre application web !';
});