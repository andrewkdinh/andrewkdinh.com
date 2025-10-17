"use strict";

// document is loaded and DOM is ready
document.addEventListener('DOMContentLoaded', function(){
    $("body").scrollspy({ target: "#akd-navbar" });
    /*
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#akd-navbar'
    })
    */

    document.querySelectorAll('a.email-replace').forEach(elem => {
        elem.href = "mailto:me" + "@" + "andrewkdinh.com";
        elem.target = "_blank";
    });

    document.getElementById('entrance-scroll').addEventListener("click", function(event) {
        event = event || window.event;
        event.preventDefault();
        document.getElementById("work").scrollIntoView();
    });

    let dinoLoaded = false;
    document.getElementById('dino').addEventListener("click", function(event) {
        event = event || window.event;
        event.preventDefault();

        if (!dinoLoaded) {
            const images = document.querySelectorAll('.dino-lazy');
            images.forEach(img => {
                img.src = img.dataset.src;
            });

            document.body.id = "t";

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '../css/game.css';
            link.media = 'screen';
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.defer = true;
            script.src = 'js/game.js';
            script.onload = function() {
                dinoLoaded = true;
                if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
                    document.getElementById('dino-text').textContent = "Tap the dino to begin";
                } else {
                    document.getElementById('dino-text').textContent = "Press space to begin";
                }
                window.scrollTo(0, document.body.scrollHeight);
            };
            document.head.appendChild(script);

            // Prevent space and up/down arrow keys from scrolling
            window.addEventListener("keydown", function(e) {
                if ((e.key !== undefined && ["ArrowUp", "ArrowDown", "Space"].indexOf(e.code) > -1)
                    || (e.keyCode !== undefined && [32, 38, 40].indexOf(e.keyCode || e.which) > -1)) {
                    e.preventDefault();
                }
            }, false);
        } else {
            window.scrollTo(0, document.body.scrollHeight);
        }
    });
});

// page is fully loaded, including all frames, objects and images
window.addEventListener("load", function() {
    scrollingCode();
    onekoInit();

    if (window.location.hostname.includes("andruwu.com")) {
        document.querySelector('#footer-copyright').textContent = `© ${new Date().getFullYear()} Andruwu Dinh`;
    } else {
        document.querySelector('#footer-copyright').textContent = `© ${new Date().getFullYear()} Andrew Dinh`;
    }

    const ignore_locations = ["127.0.0.1", "localhost", "file:///", ".onion"];
    if (!ignore_locations.some(el => window.location.href.includes(el))) {
        // Internet Defense League
        // window._idl={};_idl.variant="modal";(function(){var idl=document.createElement('script');idl.async=true;idl.src='https://members.internetdefenseleague.org/include/?url='+(_idl.url||'')+'&campaign='+(_idl.campaign||'')+'&variant='+(_idl.variant||'modal');document.getElementsByTagName('body')[0].appendChild(idl);})();

        // Plausible
        const script = document.createElement('script');
        script.defer = true;
        if (window.location.hostname.includes("andruwu.com")) {
            script.setAttribute('data-domain', 'andruwu.com');
        } else {
            script.setAttribute('data-domain', 'andrewkdinh.com');
        }
        // script.src = 'https://plausible.andrewkdinh.com/js/plausible.js';
        script.src = 'https://plausible.andrewkdinh.com/js/script.outbound-links.js';
        document.head.appendChild(script);
    }
});

async function onekoInit() {
    if (window.matchMedia('(prefers-reduced-motion: no-preference)')) {
        // Automatically enable Oneko
        var img=new Image();
        img.src="img/oneko.gif";
        img.onload=oneko;
    }

    const onekoToggle = document.getElementById("oneko-toggle");
    onekoToggle.onclick = function(event) {
        event.preventDefault();
        let onekoEl = document.getElementById("oneko")
        if (onekoEl) {
            onekoEl.style.opacity = 0;
            // onekoToggle.style.fill = "rgb(128, 128, 128)";
            setTimeout(function() {
                if (onekoEl) {
                    onekoEl.remove();
                }
            }, 700)
        } else {
            oneko();
            // onekoToggle.style.fill = "rgba(255, 255, 255, 0.75)";
        }
    };

}

async function scrollingCode() {
    const entranceBackground = document.getElementById("entrance-background");
    let codeScroll = 0;
    function ScrollCode() {
        entranceBackground.style.top = codeScroll.toString() + "px";
        if (codeScroll < -10450) {
            codeScroll = window.innerHeight;
        }
        codeScroll -= 1;
    }

    fetch('/editor.html')
    .then(r => r.text())
    .then(textContent => {
        if (window.matchMedia('(prefers-reduced-motion: no-preference)')) {
            let scrollInterval;
            let observer = new IntersectionObserver((entries, _observer) => {
                if (entries[0].isIntersecting) {
                    scrollInterval = window.setInterval(ScrollCode, 25);
                } else {
                    window.clearInterval(scrollInterval);
                }
            }, {threshold: 0.1});

            observer.observe(document.getElementById("entrance"));
        }

        document.querySelector("#entrance-background code").innerHTML = textContent;
    });
}

// General functions
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

// https://github.com/adryd325/oneko.js
function oneko() {
    const nekoEl = document.createElement("div");
    // nekoEl.style.opacity = 0;
    nekoEl.id = "oneko";
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.backgroundImage = "url('img/oneko.gif')";
    nekoEl.style.imageRendering = "pixelated";
    // nekoEl.style.left = window.innerWidth - 48 + "px";
    nekoEl.style.left = window.innerWidth + 48 + "px";
    nekoEl.style.top = "76px";

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
        const nekoElInner = document.createElement("div");
        nekoElInner.style.position = "relative";
        nekoEl.appendChild(nekoElInner);

        const nekoElTooltip = document.createElement("span");
        nekoElTooltip.classList.add("akd-tooltip-text");
        nekoElTooltip.innerText = "Tap anywhere...";
        nekoElTooltip.style.visibility = "visible";
        nekoElInner.appendChild(nekoElTooltip);

        setTimeout(function() {
            nekoElTooltip.style.opacity = 0;
        }, 30000)
    } else {
        // document.getElementById('dino-text').textContent = "Press space to begin";
    }
    document.body.appendChild(nekoEl);

    /*
    let nekoPosX = 32;
    let nekoPosY = 32;
    let mousePosX = 0;
    let mousePosY = 0;
    */
    // let nekoPosX = 32;
    // let nekoPosX = window.innerWidth - 32;
    let nekoPosX = window.innerWidth + 180;
    let nekoPosY = 110;
    // let mousePosX = 0;
    let mousePosX = nekoPosX;
    let mousePosY = nekoPosY;

    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation = null;
    let idleAnimationFrame = 0;
    const nekoSpeed = 13;
    const spriteSets = {
        idle: [[-3, -3]],
        alert: [[-7, -3]],
        scratch: [
            [-5, 0],
            [-6, 0],
            [-7, 0],
        ],
        tired: [[-3, -2]],
        sleeping: [
            [-2, 0],
            [-2, -1],
        ],
        N: [
            [-1, -2],
            [-1, -3],
        ],
        NE: [
            [0, -2],
            [0, -3],
        ],
        E: [
            [-3, 0],
            [-3, -1],
        ],
        SE: [
            [-5, -1],
            [-5, -2],
        ],
        S: [
            [-6, -3],
            [-7, -2],
        ],
        SW: [
            [-5, -3],
            [-6, -1],
        ],
        W: [
            [-4, -2],
            [-4, -3],
        ],
        NW: [
            [-1, 0],
            [-1, -1],
        ],
    };
    function create() {
        document.onmousemove = (event) => {
            mousePosX = event.clientX;
            mousePosY = event.clientY;
            const tooltip = document.querySelector("#oneko .akd-tooltip-text");
            if (tooltip) {
                tooltip.style.opacity = 0;
            }
        };

        window.onekoInterval = setInterval(frame, 100);

        // Oneko runs into screen
        mousePosX = window.innerWidth - 90;
    }

    function setSprite(name, frame) {
        const sprite = spriteSets[name][frame % spriteSets[name].length];
        nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${
            sprite[1] * 32
        }px`;
    }

    function resetIdleAnimation() {
        idleAnimation = null;
        idleAnimationFrame = 0;
    }

    function idle() {
        idleTime += 1;

        // every ~ 20 seconds
        if (
            idleTime > 10 &&
            Math.floor(Math.random() * 200) == 0 &&
            idleAnimation == null
        ) {
            idleAnimation = ["sleeping", "scratch"][
                Math.floor(Math.random() * 2)
            ];
        }

        switch (idleAnimation) {
            case "sleeping":
                if (idleAnimationFrame < 8) {
                    setSprite("tired", 0);
                    break;
                }
                setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
                if (idleAnimationFrame > 192) {
                    resetIdleAnimation();
                }
                break;
            case "scratch":
                setSprite("scratch", idleAnimationFrame);
                if (idleAnimationFrame > 9) {
                    resetIdleAnimation();
                }
                break;
            default:
                setSprite("idle", 0);
                return;
        }
        idleAnimationFrame += 1;
    }

    function frame() {
        frameCount += 1;
        const diffX = nekoPosX - mousePosX;
        const diffY = nekoPosY - mousePosY;
        const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

        if (distance < nekoSpeed || distance < 48) {
            idle();
            return;
        }

        idleAnimation = null;
        idleAnimationFrame = 0;

        if (idleTime > 1) {
            setSprite("alert", 0);
            // count down after being alerted before moving
            idleTime = Math.min(idleTime, 3);
            idleTime -= 1;
            return;
        }

        let direction = diffY / distance > 0.5 ? "N" : "";
        direction += diffY / distance < -0.5 ? "S" : "";
        direction += diffX / distance > 0.5 ? "W" : "";
        direction += diffX / distance < -0.5 ? "E" : "";
        setSprite(direction, frameCount);

        nekoPosX -= (diffX / distance) * nekoSpeed;
        nekoPosY -= (diffY / distance) * nekoSpeed;

        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
    }

    create();
}
