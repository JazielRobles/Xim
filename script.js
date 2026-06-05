document.addEventListener('DOMContentLoaded', () => {
    document.oncontextmenu = function(){return false;}
    const password = "0606"; 
    const recipientName = "Jesi"; 
    const signatureName = "Jazi"; 
    const backgroundMusicSrc = 'https://jtas.s3.us-east-2.amazonaws.com/ytmp3free.cc_new-west-those-eyes-home-session-youtubemp3free.org.mp3';
    
    const passwordScreen = document.getElementById('password-screen');
    const mainContent = document.querySelector('.main-content');
    const lockIcon = document.getElementById('lockIcon');
    const digitBoxes = [document.getElementById('digit1'), document.getElementById('digit2'), document.getElementById('digit3'), document.getElementById('digit4')];
    const errorMessage = document.getElementById('errorMessage');
    const clearButton = document.getElementById('clear-btn-js');
    const backgroundAudioPlayer = document.getElementById('background-audio-player'); 
    
    const interactiveModal = document.getElementById('interactive-modal');
    const interactiveModalContent = document.getElementById('interactive-modal-content');
    const closeInteractiveModalBtn = document.getElementById('close-interactive-modal-btn');
    const interactiveModalOverlay = document.getElementById('interactive-modal-overlay');

    const clickSound = new Audio('sounds/click.mp3');
    const successSound = new Audio('sounds/success.mp3');
    const errorSound = new Audio('sounds/error.mp3');

    let currentCode = "";

    function setupKeypad() {
        const keypadContainer = document.getElementById('keypad-js');
        const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', ''];
        keys.forEach((key, index) => {
            if (key) {
                const keyBtn = document.createElement('button');
                keyBtn.className = 'key';
                keyBtn.textContent = key;
                keyBtn.style.animation = `keyEntrance 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.05}s both`;
                keyBtn.onclick = () => addDigit(key);
                keypadContainer.appendChild(keyBtn);
            } else {
                keypadContainer.appendChild(document.createElement('div'));
            }
        });
        clearButton.onclick = clearCode;
    }

    function addDigit(digit) {
        clickSound.play().catch(e => {}); 
        if (currentCode.length < 4) {
            currentCode += digit;
            updateDisplay();
            if (currentCode.length === 4) setTimeout(checkCode, 300);
        }
    }
    
    function updateDisplay() {
        digitBoxes.forEach((box, i) => {
            box.textContent = i < currentCode.length ? currentCode[i] : '-';
            box.classList.toggle('filled', i < currentCode.length);
            box.classList.remove('error');
        });
    }
    
    function clearCode() {
        currentCode = "";
        updateDisplay();
        errorMessage.textContent = "";
    }

    function checkCode() {
        if (currentCode === password) {
            successSound.play().catch(e => {});
            lockIcon.textContent = '🔓';
            lockIcon.classList.add('unlocked');
            
            backgroundAudioPlayer.src = backgroundMusicSrc;
            backgroundAudioPlayer.volume = 0.2;
            backgroundAudioPlayer.play().catch(e => {});
            document.body.classList.add('night-mode');
            createStars(80);
            createMagicDust(40);
            createFireflies(20);
            createFloatingHearts(15);

            setTimeout(() => {
                passwordScreen.classList.add('hidden');
                mainContent.classList.remove('hidden');
                initializeBirthdayPage();
            }, 1000);
        } else {
            errorSound.play().catch(e => {});
            digitBoxes.forEach(box => box.classList.add('error'));
            errorMessage.textContent = "Código incorrecto. ¡Intenta de nuevo!";
            setTimeout(clearCode, 1500);
        }
    }

    function initializeBirthdayPage() {
        mainContent.innerHTML = `
            <div id="candle-container-special">
                <h2 id="candle-title"></h2>
                <div id="candle-wrapper">
                    <div class="candle">
                        <div class="wick"></div>
                        <div class="flame"></div>
                    </div>
                </div>
                <p id="candle-countdown">21</p>
            </div>
            <div class="hidden" id="gift-container-special">
                 <h2 class="section-title">¡Una sorpresa para ti!</h2>
                 <div id="gift-box-special" title="Haz clic para abrir">
                    <div class="gift-lid-special">
                        <div class="gift-bow-left"></div>
                        <div class="gift-bow-right"></div>
                        <div class="gift-bow-center"></div>
                    </div>
                    <div class="gift-body-special"></div>
                 </div>
                 <p class="gift-hint">Haz clic en el regalo para abrirlo.</p>
            </div>
        `;
    
        const candleContainer = document.getElementById('candle-container-special');
        const candleTitle = document.getElementById('candle-title');
        const candle = candleContainer.querySelector('.candle');
        const countdownElement = document.getElementById('candle-countdown');
        const giftContainer = document.getElementById('gift-container-special');
        const giftBox = document.getElementById('gift-box-special');
    
        const yearMessages = {
            21: "21 años iluminando el mundo, pero sobre todo iluminando mi vida desde que llegaste a ella.",
            20: "20 años de una sonrisa que me enamora un poco más cada día.",
            19: "19 años siendo una persona increíble, con un corazón que me hace sentir el hombre más afortunado.",
            18: "18 años convirtiéndote en la maravillosa mujer de la que me enamoré.",
            17: "17 años llenando de ternura, alegría y amor cada lugar donde estás.",
            16: "16 años de una belleza que va mucho más allá de lo que pueden ver mis ojos.",
            15: "15 años de magia en tu mirada y dulzura en cada uno de tus detalles.",
            14: "14 años de un corazón tan noble que es imposible no amarte.",
            13: "13 años creando sonrisas y momentos que hacen más bonito el mundo.",
            12: "12 años de alegría, inocencia y una luz que siempre destaca entre todos.",
            11: "11 años de ternura infinita y de hacer felices a quienes te rodean.",
            10: "10 años de sueños, aventuras y una sonrisa capaz de alegrar cualquier día.",
            9: "9 años llenando de felicidad a quienes tienen la suerte de conocerte.",
            8: "8 años de abrazos que transmiten cariño y hacen sentir todo mejor.",
            7: "7 años de una dulzura que conquista corazones sin esfuerzo.",
            6: "6 años regalando sonrisas que iluminan cada rincón.",
            5: "5 años de inocencia, alegría y una ternura imposible de olvidar.",
            4: "4 años llenando cada día de imaginación, magia y felicidad.",
            3: "3 años convirtiendo los momentos simples en recuerdos hermosos.",
            2: "2 años de amor puro capaz de derretir cualquier corazón.",
            1: "1 año desde que llegaste para hacer el mundo un lugar más hermoso.",
            0: "Y toda una vida por delante para seguir enamorando corazones, incluido el mío."
        };


        candleTitle.textContent = "Pide un deseo...";
        setTimeout(() => {
            candle.classList.add('on');
    
            let seconds = 21;
            countdownElement.innerHTML = `<span class="countdown-number">${seconds}</span><p class="countdown-message">${yearMessages[seconds]}</p>`;
    
            const countdownInterval = setInterval(() => {
                seconds--;
    
                if (seconds >= 0) {
                    countdownElement.classList.add('changing');
                    setTimeout(() => {
                        countdownElement.innerHTML = `<span class="countdown-number">${seconds}</span><p class="countdown-message">${yearMessages[seconds]}</p>`;
                        countdownElement.classList.remove('changing');
                    }, 800);
                } else {
                    clearInterval(countdownInterval);
    
                    candle.classList.remove('on');
                    candleTitle.textContent = "¡Felicidades!";
                    candleContainer.classList.add('fading-out');

                    setTimeout(() => {
                        candleContainer.classList.add('hidden');
                        giftContainer.classList.remove('hidden');
                        giftContainer.style.animation = 'fadeIn 1s ease-out';
                    }, 800);
                }
            }, 4000);
        }, 1000);
    
        giftBox.addEventListener('click', () => {
            startConfetti();
            giftBox.classList.add('open');
            
            setTimeout(() => {
                const photoUrl = 'https://mochilasjr.s3.us-east-2.amazonaws.com/WhatsApp+Image+2026-06-01+at+23.56.57.jpeg';
                const message = '💖 Un pequeño detalle como ingeniero para la mujer que ocupa todos mis pensamientos 💖\n\nXimenita, hoy quería aprovechar este momento para recordarte lo increíblemente especial que eres para mí. Quizá como ingeniero podría intentar medir muchas cosas, calcular distancias, resolver problemas o encontrar explicaciones para casi todo, pero hay algo que jamás he logrado calcular con exactitud: lo feliz que me haces desde que llegaste a mi vida.\n\nHoy celebras 21 años de existencia, 21 años llenando el mundo de luz, sonrisas y momentos hermosos. Y aunque yo solo he tenido la fortuna de compartir contigo una pequeña parte de ese camino durante estos últimos meses, ha sido tiempo suficiente para descubrir a una mujer maravillosa, dulce, inteligente, fuerte y con un corazón tan hermoso que cada día me enamora más.\n\nMe encanta tu forma de ser, tu manera de ver la vida, la paz que siento cuando hablo contigo y la felicidad que aparece cada vez que veo un mensaje tuyo. Me encantan esos pequeños detalles que te hacen única, porque son precisamente ellos los que poco a poco se fueron convirtiendo en algunas de mis cosas favoritas.\n\nGracias por cada conversación, por cada risa, por cada momento compartido y por permitirme conocerte un poco más cada día. Gracias por tu cariño, por tu confianza y por todos esos instantes que han hecho que estos meses sean tan especiales para mí.\n\nSi tuviera que describirte, diría que eres como esa pieza perfecta que llega para darle un significado aún más bonito a todo. No porque completes algo que faltaba, sino porque desde que llegaste, muchos días se volvieron más alegres, muchas sonrisas más sinceras y muchos momentos más especiales.\n\nDeseo de todo corazón que este nuevo año de vida te regale experiencias inolvidables, metas cumplidas, sueños alcanzados y muchísima felicidad. Deseo que nunca pierdas esa esencia tan hermosa que te caracteriza, esa forma tan tuya de iluminar la vida de quienes te rodean y de hacer sentir especial a las personas que te quieren.\n\nY también deseo seguir acompañándote en cada paso, celebrar tus logros, apoyarte cuando lo necesites y seguir construyendo recuerdos hermosos contigo. Porque si algo he aprendido desde que llegaste a mi vida, es que cada momento a tu lado vale muchísimo más de lo que las palabras pueden expresar.\n\nHoy quiero que recuerdes algo muy importante: eres una persona maravillosa, valiosa y profundamente especial. Mereces todo lo bonito que la vida pueda ofrecerte, porque tienes un corazón enorme y una forma única de hacer felices a quienes te rodean.\n\nFelices 21 años, mi amor. Gracias por existir, gracias por llegar a mi vida y gracias por regalarme la oportunidad de quererte cada día un poco más.\n\nTe amo muchísimo ❤️';
                interactiveModalContent.innerHTML = `<img src="${photoUrl}" alt="Foto Especial" class="modal-image"><h3>¡Sorpresa!</h3><p class="gift-final-message">${message}</p>`;
                interactiveModalOverlay.style.display = 'block';
                interactiveModal.classList.add('show');
    
            }, 1200);
        }, { once: true });
    
        if (closeInteractiveModalBtn) closeInteractiveModalBtn.onclick = () => hideInteractiveModal();
        if (interactiveModalOverlay) interactiveModalOverlay.onclick = () => hideInteractiveModal();
    }

    function hideInteractiveModal() {
        interactiveModal.classList.remove('show');
        interactiveModalOverlay.style.display = 'none';
    }

    function createStars(count) {
        const container = document.getElementById('floating-hearts-container');
        container.innerHTML = '';
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;
            const size = Math.random() * 3 + 2; 
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            star.style.animationDuration = `${Math.random() * 2 + 1}s`;
            fragment.appendChild(star);
        }
        for (let i = 0; i < 6; i++) {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            shootingStar.style.left = `${Math.random() * 100}vw`;
            shootingStar.style.top = `${Math.random() * 50}vh`; 
            shootingStar.style.animationDelay = `${Math.random() * 25}s`;
            shootingStar.style.animationDuration = `${Math.random() * 3 + 4}s`;
            fragment.appendChild(shootingStar);
        }
        container.appendChild(fragment);
    }
    
    function createMagicDust(count) {
        const container = document.getElementById('background-effects-container');
        if (!container) return;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const dust = document.createElement('div');
            dust.className = 'magic-dust';
            dust.style.left = `${Math.random() * 100}vw`;
            const size = Math.random() * 6 + 2; 
            dust.style.width = `${size}px`;
            dust.style.height = `${size}px`;
            dust.style.animationDelay = `${Math.random() * 5}s, ${Math.random() * 3}s`;
            dust.style.animationDuration = `${Math.random() * 15 + 10}s, ${Math.random() * 2 + 1}s`;
            fragment.appendChild(dust);
        }
        container.appendChild(fragment);
    }

    function createFireflies(count) {
        const container = document.getElementById('background-effects-container');
        if (!container) return;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const firefly = document.createElement('div');
            firefly.className = 'firefly';
            firefly.style.left = `${Math.random() * 100}vw`;
            firefly.style.top = `${Math.random() * 100}vh`;
            const size = Math.random() * 3 + 2; 
            firefly.style.width = `${size}px`;
            firefly.style.height = `${size}px`;
            firefly.style.animationDelay = `${Math.random() * 5}s`;
            firefly.style.animationDuration = `${Math.random() * 8 + 5}s`;
            fragment.appendChild(firefly);
        }
        container.appendChild(fragment);
    }

    function createBackgroundParticles(count) {
        const container = document.getElementById('background-effects-container');
        if (!container) return;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 10 + 5;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.left = `${Math.random() * 100}vw`;
            p.style.animationDuration = `${Math.random() * 15 + 10}s`;
            p.style.animationDelay = `${Math.random() * 10}s`;
            fragment.appendChild(p);
        }
        container.appendChild(fragment);
    }

    function createFloatingHearts(count) {
        const container = document.getElementById('floating-hearts-container');
        if (!container) return;
        const fragment = document.createDocumentFragment();
        const symbols = ['❤️', '💖', '💕', '✨'];
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.fontSize = `${Math.random() * 15 + 10}px`;
            heart.style.animationDelay = `${Math.random() * 10}s`;
            heart.style.animationDuration = `${Math.random() * 15 + 15}s`;
            fragment.appendChild(heart);
        }
        container.appendChild(fragment);
    }

    document.addEventListener('click', (e) => {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 4; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'click-sparkle';
            sparkle.style.left = `${e.pageX}px`; sparkle.style.top = `${e.pageY}px`;
            const angle = Math.random() * Math.PI * 2; const dist = Math.random() * 30 + 10;
            sparkle.style.setProperty('--dx', `${Math.cos(angle) * dist}px`); sparkle.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
            fragment.appendChild(sparkle); setTimeout(() => sparkle.remove(), 600);
        }
        document.body.appendChild(fragment);
    });

    function startConfetti() {
        const DURATION = 15000, END = Date.now() + DURATION;
        const colors = ['#ff9a8b', '#f78fb3', '#f8c8dc', '#ffffff'];
        (function frame() {
            confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
            confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
            if (Date.now() < END) requestAnimationFrame(frame);
        }());
    }
    
    mainContent.classList.add('hidden');
    passwordScreen.classList.remove('hidden');
    setupKeypad();
    createBackgroundParticles(25);
});