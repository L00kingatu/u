function bukaKejutan() {
    const cover = document.getElementById('cover');
    
    cover.style.opacity = '0';
    cover.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        cover.classList.add('hidden');
        
        const mainContent = document.getElementById('main-content');
        mainContent.classList.remove('hidden');
        
        setTimeout(() => {
            mainContent.classList.add('show');
        }, 100);
        
        const audio = document.getElementById('birthday-track');
        audio.play().catch(error => console.log("Menunggu interaksi suara."));

        nyalakanSihir();
    }, 1000);
}

function nyalakanSihir() {
    const simbolMagis = ['✨', '💖', '🌸', '🎈', '🤍', '💫'];
    
    setInterval(() => {
        const partikel = document.createElement('div');
        partikel.innerText = simbolMagis[Math.floor(Math.random() * simbolMagis.length)];
        
        partikel.style.position = 'fixed';
        partikel.style.left = Math.random() * 100 + 'vw';
        partikel.style.bottom = '-5vh';
        partikel.style.fontSize = Math.random() * 20 + 15 + 'px';
        partikel.style.opacity = Math.random() * 0.7 + 0.3;
        partikel.style.pointerEvents = 'none';
        partikel.style.transition = 'transform 4s linear, opacity 4s linear';
        partikel.style.zIndex = '1';
        
        document.body.appendChild(partikel);
        
        setTimeout(() => {
            const rotasiAcak = Math.random() * 360;
            const geserX = (Math.random() - 0.5) * 150;
            partikel.style.transform = `translateY(-110vh) translateX(${geserX}px) rotate(${rotasiAcak}deg)`;
            partikel.style.opacity = '0';
        }, 50);
        
        setTimeout(() => {
            partikel.remove();
        }, 4000);
    }, 350); 
}