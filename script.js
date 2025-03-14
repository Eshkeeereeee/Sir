(function() {
    const bc = document.getElementById('bubbles');
    const mb = document.getElementById('menu-button');
    const m = document.getElementById('menu');
    const a = document.getElementById('arrow');
    const c = document.getElementById('counter');
    const rs = document.getElementById('reset-score');
    const us = document.getElementById('upgrade-score');
    const uc = document.getElementById('upgrade-cost');
    
    const k = btoa('score');
    let s = parseInt(localStorage.getItem(k)) || 0;
    c.textContent = s;

    let diamonds = [];
    const maxDiamonds = 18;
    let upgradeMultiplier = 1; // Множитель для ромбов
    let upgradeCost = 24; // Начальная стоимость улучшения
    uc.textContent = upgradeCost;

    // Фиолетовые шарики
    function cp() {
        if (!bc) return;
        const b = document.createElement('div');
        b.classList.add('bubble-purple');
        const sz = Math.random() * 60 + 10;
        b.style.width = `${sz}px`;
        b.style.height = `${sz}px`;
        b.style.left = `${Math.random() * (window.innerWidth - sz)}px`;
        const d = Math.random() * 2 + 5;
        b.style.animationDuration = `${d}s, ${d / 2}s`;
        bc.appendChild(b);
        setTimeout(() => b.remove(), d * 1000);
    }

    // Оранжевые шарики
    function co() {
        if (!bc) return;
        const b = document.createElement('div');
        b.classList.add('bubble-orange');
        const sz = Math.random() * 30 + 5;
        b.style.width = `${sz}px`;
        b.style.height = `${sz}px`;
        b.style.left = `${Math.random() * (window.innerWidth - sz)}px`;
        const d = Math.random() * 2 + 5;
        b.style.animationDuration = `${d}s, ${d / 2}s`;
        bc.appendChild(b);

        let clicked = false;
        const handleInteraction = (e) => {
            e.preventDefault();
            if (clicked) return;
            clicked = true;
            b.style.animation = 'vanish 0.3s ease forwards';
            setTimeout(() => {
                s++;
                c.textContent = s;
                localStorage.setItem(k, s);
                b.remove();
            }, 300);
        };

        b.addEventListener('click', handleInteraction);
        b.addEventListener('touchstart', handleInteraction);
        setTimeout(() => b.remove(), d * 1000);
    }

    // Золотые ромбы
    function cd() {
        if (!bc || diamonds.length >= maxDiamonds) return;

        const d = document.createElement('div');
        d.classList.add('diamond-gold');
        const radius = Math.min(window.innerWidth, window.innerHeight) * 0.4;
        const angle = Math.random() * 2 * Math.PI;
        const centerX = window.innerWidth / 2 - 25;
        const centerY = window.innerHeight / 2 - 25;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        d.style.left = `${x}px`;
        d.style.top = `${y}px`;
        bc.appendChild(d);
        diamonds.push(d);

        let clicked = false;
        const handleDiamondInteraction = (e) => {
            e.preventDefault();
            if (clicked) return;
            clicked = true;
            d.style.animation = 'dissolve 0.5s ease forwards';
            setTimeout(() => {
                s += Math.round(1 * upgradeMultiplier); // Умножение с округлением
                c.textContent = s;
                localStorage.setItem(k, s);
                d.remove();
                const index = diamonds.indexOf(d);
                if (index > -1) diamonds.splice(index, 1);
            }, 500);
        };

        d.addEventListener('click', handleDiamondInteraction);
        d.addEventListener('touchstart', handleDiamondInteraction);

        setTimeout(() => {
            if (!clicked) {
                d.remove();
                const index = diamonds.indexOf(d);
                if (index > -1) diamonds.splice(index, 1);
                cd();
            }
        }, 4000);
    }

    // Сброс очков
    if (rs) {
        rs.addEventListener('click', () => {
            s = 0;
            c.textContent = s;
            localStorage.setItem(k, s);
        });
        rs.addEventListener('touchstart', (e) => {
            e.preventDefault();
            s = 0;
            c.textContent = s;
            localStorage.setItem(k, s);
        });
    }

    // Улучшение баллов
    if (us) {
        us.addEventListener('click', () => {
            if (s >= upgradeCost) {
                s -= upgradeCost;
                upgradeMultiplier *= 1.6;
                upgradeCost = Math.round(upgradeCost * 1.5); // Увеличиваем стоимость
                c.textContent = s;
                uc.textContent = upgradeCost;
                localStorage.setItem(k, s);
            }
        });
        us.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (s >= upgradeCost) {
                s -= upgradeCost;
                upgradeMultiplier *= 1.6;
                upgradeCost = Math.round(upgradeCost * 1.5);
                c.textContent = s;
                uc.textContent = upgradeCost;
                localStorage.setItem(k, s);
            }
        });
    }

    if (bc) {
        setInterval(cp, 500);
        setInterval(co, 1000);
        setInterval(cd, 2000);
    }

    function tm() {
        if (m) m.classList.toggle('show');
    }

    if (mb) mb.addEventListener('click', tm);
    if (a) a.addEventListener('click', tm);
})();