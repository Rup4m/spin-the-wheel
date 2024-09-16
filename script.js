document.getElementById('spin-btn').addEventListener('click', () => {
    const wheel = document.getElementById('wheel');
    const result = document.getElementById('result');
    const segments = document.querySelectorAll('.segment');
    const angle = Math.floor(Math.random() * 360);
    const rotation = 3600 + angle;
    wheel.style.transform = `rotate(${rotation}deg)`;

    const selectedSegment = Math.floor((angle % 360) / 36);
    const resultText = segments[selectedSegment].getAttribute('data-text');

    setTimeout(() => {
        result.innerHTML = `You got<br>${resultText}`;
        result.style.display = 'block';
        startConfetti();
    }, 4000); // Matches the spin duration
});

// Confetti Effect Function
function startConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    const confetti = [];
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    function random(max, min) {
        return Math.random() * (max - min) + min;
    }

    function createConfetti() {
        const size = random(5, 10);
        confetti.push({
            x: random(width),
            y: height,
            size: size,
            color: `hsl(${random(360, 0)}, 100%, 50%)`,
            speed: random(2, 4),
            angle: random(Math.PI * 2),
            spin: random(-0.1, 0.1)
        });
    }

    function updateConfetti() {
        ctx.clearRect(0, 0, width, height);
        confetti.forEach((c, i) => {
            c.x += c.speed * Math.cos(c.angle);
            c.y -= c.speed * Math.sin(c.angle);
            c.angle += c.spin;
            ctx.fillStyle = c.color;
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
            ctx.fill();
            if (c.y < 0 || c.x < 0 || c.x > width) {
                confetti.splice(i, 1);
            }
        });
        if (confetti.length) {
            requestAnimationFrame(updateConfetti);
        }
    }

    function animateConfetti() {
        createConfetti();
        updateConfetti();
    }

    canvas.width = width;
    canvas.height = height;
    setInterval(animateConfetti, 100);
}
