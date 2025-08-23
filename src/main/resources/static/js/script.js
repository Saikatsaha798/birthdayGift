// Sample gallery data - replace with your actual photos
const galleryItems = [
    {
        image: "/images/img1.jpg",
        caption: "Our first date - unforgettable! 💕"
    },
    {
        image: "/images/img2.jpg",
        caption: "Our first College Fest 🌚"
    },
    {
        image: "/images/img3.jpg",
        caption: "Our first time 🥵"
    },
    {
        image: "/images/img4.jpg",
        caption: "Fried Chicken and you 🍗"
    },
    {
        image: "/images/img5.jpg",
        caption: "You with a bindi 💣"
    },
    {
        image: "/images/img6.jpg",
        caption: "You and a saree ❤️‍🔥"
    },
    {
        image: "/images/img7.jpg",
        caption: "End of College days 🎇"
    }
];

// Birthday wishes array
const wishes = [
    "May this year bring you endless joy and amazing adventures! 🎉",
    "You deserve all the happiness in the world today and always! 💖",
    "Here's to another year of being absolutely incredible! ✨",
    "May your birthday be as beautiful and special as you are! 🌸",
    "Wishing you love, laughter, and all your heart desires! 💕",
    "Another year of being the most amazing person I know! 🥰",
    "May this birthday be the start of your best year yet! 🎂",
    "You make every day brighter just by being you! ☀️"
];

// Virtual gifts array
const gifts = [
    "🌹 A bouquet of virtual roses just for you!",
    "💎 A sparkly diamond of love and appreciation!",
    "🦄 A magical unicorn to grant all your wishes!",
    "🍰 The sweetest virtual cake made with love!",
    "⭐ A shooting star to make all your dreams come true!",
    "🎁 A box full of hugs and kisses from me!"
];

// Initialize the page
function init() {
    createFloatingHearts();
    populateGallery();
    startCountdown();
    addSparkleEffect();
}

// Create floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.getElementById('floatingHearts');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '💖';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 3 + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 1000);
}

// Populate the Pinterest-style gallery
function populateGallery() {
    const gallery = document.getElementById('gallery');
    galleryItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="Memory" loading="lazy">
            <div class="caption">${item.caption}</div>
        `;
        gallery.appendChild(galleryItem);
    });
}

// Countdown to end of birthday
function startCountdown() {
    function updateCountdown() {
        const now = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const timeDiff = endOfDay - now;
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML =
            `${hours}h ${minutes}m ${seconds}s`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Show random birthday wish
function showRandomWish() {
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    document.getElementById('wishDisplay').innerHTML = randomWish;
    throwConfetti();
}

// Open virtual gift
function openGift() {
    const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
    document.getElementById('giftMessage').innerHTML = randomGift;
    throwConfetti();
}

// Confetti effect
function throwConfetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 50);
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = ['#ff69b4', '#ffd700', '#ff6347', '#98fb98', '#87ceeb'][Math.floor(Math.random() * 5)];
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1000';
    confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;

    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

// Add sparkle effect to magic click card
function addSparkleEffect() {
    const magicCard = document.querySelector('.feature-card:last-child');
    magicCard.addEventListener('click', (e) => {
        const rect = magicCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkles';
            sparkle.style.left = (rect.left + x) + 'px';
            sparkle.style.top = (rect.top + y) + 'px';
            sparkle.style.animationDelay = i * 0.1 + 's';
            document.body.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1000);
        }
    });
}

// Add CSS animation for confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Start everything when page loads
window.addEventListener('load', init);