export function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height, stars = [], shootingStars = [];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initStars();
  }

  function initStars() {
    stars = [];
    const numStars = window.innerWidth < 768 ? 90 : 180;
    const colors = ["rgba(255,255,255,", "rgba(240,220,165,", "rgba(195,160,90,"];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.3,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        opacity: Math.random() * 0.8 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    shootingStars = [];
  }

  function createShootingStar() {
    shootingStars.push({
      x: Math.random() * width * 0.5 + width * 0.25,
      y: Math.random() * height * 0.4 + 20,
      length: Math.random() * 120 + 90,
      vx: Math.random() * 8 + 10,
      vy: Math.random() * 1.2 - 0.4,
      opacity: 0.85,
      life: 1
    });
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    for (let star of stars) {
      star.x += star.vx / 100;
      star.y += star.vy / 100;
      if (star.x < 0 || star.x > width) star.vx = -star.vx;
      if (star.y < 0 || star.y > height) star.vy = -star.vy;
      star.opacity += (Math.random() - 0.5) * 0.06;
      star.opacity = Math.max(0.15, Math.min(1, star.opacity));
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `${star.color}${star.opacity})`;
      ctx.shadowColor = `${star.color}${star.opacity * 0.8})`;
      ctx.shadowBlur = star.radius * 1.8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    if (Math.random() < 0.008 && shootingStars.length < 3) createShootingStar();

    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const sh = shootingStars[i];
      sh.x += sh.vx;
      sh.y += sh.vy;
      sh.life -= 0.01;
      if (sh.x > width + 80 || sh.y < -50 || sh.life <= 0) {
        shootingStars.splice(i, 1);
        continue;
      }
      const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.length, sh.y - sh.length * 0.2);
      grad.addColorStop(0, `rgba(255,255,255,${sh.opacity})`);
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sh.x, sh.y);
      ctx.lineTo(sh.x - sh.length, sh.y - sh.length * 0.2);
      ctx.stroke();
      ctx.fillStyle = `rgba(255,255,255,${sh.opacity})`;
      ctx.beginPath();
      ctx.arc(sh.x, sh.y, 2.2, 0, 2 * Math.PI);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}
