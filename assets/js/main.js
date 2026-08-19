/**
 * IP BOTSWANA VANGUARD — INTERACTIVE CONTROLLER
 * Canvas Network Simulation, Live Simulated Mining, FAQ Accordions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // 2. Header Scroll Shadow
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close others
        faqItems.forEach(other => {
          other.classList.remove('active');
          const otherAns = other.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // Open first FAQ item by default if exists
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstAns = firstItem.querySelector('.faq-answer');
    firstItem.classList.add('active');
    if (firstAns) firstAns.style.maxHeight = firstAns.scrollHeight + 'px';
  }

  // 4. Live Simulated Mining Increment Counter
  const balanceEl = document.getElementById('phoneLiveBalance');
  if (balanceEl) {
    let baseVal = 142.8540;
    setInterval(() => {
      baseVal += 0.0002;
      balanceEl.innerHTML = baseVal.toFixed(4) + ' <span>IPB</span>';
    }, 1500);
  }

  // 5. Interactive Network Topology Canvas (Botswana Map Cluster Simulation)
  initNetworkCanvas();
});

function initNetworkCanvas() {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.parentElement.clientWidth;
    height = canvas.parentElement.clientHeight || 400;
    canvas.width = width;
    canvas.height = height;
  }

  resize();
  window.addEventListener('resize', resize);

  // Nodes positioned across abstract Botswana geography
  const hubs = [
    { name: "Gaborone Central", xRatio: 0.72, yRatio: 0.78, active: true, radius: 8, color: "#D4AF37", pulses: [] },
    { name: "Francistown East", xRatio: 0.76, yRatio: 0.38, active: true, radius: 7, color: "#D4AF37", pulses: [] },
    { name: "Maun Delta Node", xRatio: 0.38, yRatio: 0.28, active: true, radius: 7, color: "#E5C358", pulses: [] },
    { name: "Palapye Grid", xRatio: 0.74, yRatio: 0.58, active: true, radius: 6, color: "#8E6EB3", pulses: [] },
    { name: "Kasane Border Hub", xRatio: 0.46, yRatio: 0.12, active: true, radius: 6, color: "#5BA8DE", pulses: [] },
    { name: "Lobatse Gateway", xRatio: 0.70, yRatio: 0.88, active: true, radius: 5, color: "#E5C358", pulses: [] },
    { name: "Jwaneng Solar Node", xRatio: 0.52, yRatio: 0.72, active: true, radius: 6, color: "#D4AF37", pulses: [] },
    { name: "Ghanzi Western Relay", xRatio: 0.26, yRatio: 0.50, active: true, radius: 5, color: "#8E6EB3", pulses: [] }
  ];

  // Ambient floating particle background
  const particles = [];
  for (let i = 0; i < 35; i++) {
    particles.push({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  // Active consensus packets traveling along connections
  const packets = [];
  function createPacket() {
    if (hubs.length < 2) return;
    const sourceIdx = Math.floor(Math.random() * hubs.length);
    let targetIdx = Math.floor(Math.random() * hubs.length);
    while (targetIdx === sourceIdx) {
      targetIdx = Math.floor(Math.random() * hubs.length);
    }

    packets.push({
      from: hubs[sourceIdx],
      to: hubs[targetIdx],
      progress: 0,
      speed: 0.008 + Math.random() * 0.012,
      color: Math.random() > 0.4 ? "#D4AF37" : "#A87B18"
    });
  }

  setInterval(createPacket, 700);

  let frame = 0;

  function animate() {
    frame++;
    ctx.clearRect(0, 0, width, height);

    // Draw Subtle Grid
    ctx.strokeStyle = "rgba(74, 44, 109, 0.12)";
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Ambient Particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = 1;
      if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1;
      if (p.y > 1) p.y = 0;

      ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x * width, p.y * height, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Network Interconnections
    ctx.lineWidth = 1.2;
    for (let i = 0; i < hubs.length; i++) {
      for (let j = i + 1; j < hubs.length; j++) {
        const x1 = hubs[i].xRatio * width;
        const y1 = hubs[i].yRatio * height;
        const x2 = hubs[j].xRatio * width;
        const y2 = hubs[j].yRatio * height;

        const dist = Math.hypot(x2 - x1, y2 - y1);
        if (dist < width * 0.55) {
          const grad = ctx.createLinearGradient(x1, y1, x2, y2);
          grad.addColorStop(0, "rgba(212, 175, 55, 0.25)");
          grad.addColorStop(0.5, "rgba(107, 76, 138, 0.2)");
          grad.addColorStop(1, "rgba(212, 175, 55, 0.25)");

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
    }

    // Draw Packets (Cryptographic verification consensus pulses)
    for (let k = packets.length - 1; k >= 0; k--) {
      const pkt = packets[k];
      pkt.progress += pkt.speed;

      if (pkt.progress >= 1) {
        packets.splice(k, 1);
        continue;
      }

      const x1 = pkt.from.xRatio * width;
      const y1 = pkt.from.yRatio * height;
      const x2 = pkt.to.xRatio * width;
      const y2 = pkt.to.yRatio * height;

      const px = x1 + (x2 - x1) * pkt.progress;
      const py = y1 + (y2 - y1) * pkt.progress;

      ctx.fillStyle = pkt.color;
      ctx.shadowColor = pkt.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }

    // Draw Major Hub Nodes
    hubs.forEach((hub, idx) => {
      const hx = hub.xRatio * width;
      const hy = hub.yRatio * height;

      // Pulse ring animation
      const pulseSize = (Math.sin(frame * 0.04 + idx) + 1) * 6 + hub.radius;
      ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(hx, hy, pulseSize, 0, Math.PI * 2);
      ctx.stroke();

      // Core Node Glow
      ctx.shadowColor = hub.color;
      ctx.shadowBlur = 14;
      ctx.fillStyle = hub.color;
      ctx.beginPath();
      ctx.arc(hx, hy, hub.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Inner white eye
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(hx, hy, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Node Label
      ctx.font = "600 11px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = "#EAE5F5";
      ctx.fillText(hub.name, hx + 12, hy + 4);
    });

    requestAnimationFrame(animate);
  }

  animate();
}
