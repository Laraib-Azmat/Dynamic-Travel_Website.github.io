const mouse = document.querySelector(".cursor");
const burger = document.querySelector(".burger");

let controller
let scene;
let scene2;
let fash_scene;
let fash_controller;

function scrollAnimation() {

    // Controller

    controller = new ScrollMagic.Controller();

    const slides = document.querySelectorAll(".sec");
    const header = document.querySelector(".main-header");

    slides.forEach((slide, index) => {
        const revealImg = slide.querySelector(".reveal-img");
        const Img = slide.querySelector(".img-sec img");
        const revealText = slide.querySelector(".reveal-text");
        // const nextSlide = index == 2 ? "end" : slide[index + 1]; 

        // GSAP
        const t1 = gsap.timeline({ default: { duration: 1, ease: "Power.inOut" } });
        t1.fromTo(revealImg, { x: "0%" }, { x: "100%" });
        t1.fromTo(Img, { scale: 2 }, { scale: 1 }, '-=0.5');
        t1.fromTo(revealText, { x: "0%" }, { x: "100%" });
        t1.fromTo(header, { y: "-100%" }, { y: "0%" }, '-=0.5');

        //Scene
        scene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false
        })
            .setTween(t1)
            // .addIndicators({ colorStart: "white", colorTrigger: "white", name: "Slide" })
            .addTo(controller);

        //page animation

        const t2 = gsap.timeline();
        // t2.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
        t2.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0 });
        // t2.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, '-=0.5');

        //page scene
        scene2 = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0,
            duration: "100%",
            indent: 200
        })
            .setPin(slide, { pushFollowers: false })
            .setTween(t2)
            // .addIndicators()
            .addTo(controller);

    });

}


function cursor(e) {
    mouse.style.top = e.pageY + "px";
    mouse.style.left = e.pageX + "px";
}

function cursorActive(e) {
    const cursorText = document.querySelector(".cursor-text");
    const item = e.target;

    if (item.id === "logo" || item.classList.contains("burger")) {
        mouse.classList.add("nav_active");

    }
    else if (item.classList.contains("explore-button")) {
        mouse.classList.add("btn_active");
        cursorText.innerText = "Tap";
        gsap.to(".swipe", 1, { y: "0%" });
    } else {
        mouse.classList.remove("nav_active");
        mouse.classList.remove("btn_active");
        cursorText.innerText = "";
        gsap.to(".swipe", 1, { y: "100%" });
    }

}

function openBurger() {
    burger.classList.toggle("active");
    if (burger.classList.contains("active")) {
        document.body.classList.add("hide");
        gsap.to(".line-1", 1, { rotate: "45", y: "5", backgroundColor: "black" });
        gsap.to(".line-2", 1, { rotate: "-45", width: "3rem", y: "-5", backgroundColor: "black" });
        gsap.to(".line-3", -1, { display: "none" });
        gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
        gsap.to("#logo", 1, { color: "black" });
    } else {
        document.body.classList.remove("hide");
        gsap.to(".line-1", 1, { rotate: "0", y: "0", backgroundColor: "white" });
        gsap.to(".line-2", 1, { rotate: "0", width: "2.3rem", y: "0", backgroundColor: "white" });
        gsap.to(".line-3", -1, { display: "block" });
        gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
        gsap.to("#logo", 1, { color: "white" });
    }
}

//Barba animation
document.addEventListener("DOMContentLoaded", function () {
    barba.init({

        views: [
            {
                namespace: "home",
                beforeEnter() {
                    scrollAnimation();
                },
                beforeLeave() {
                    scene.destroy();
                    controller.destroy();
                    scene2.destroy();
                }
            },
            {
                namespace: "fashion",
                beforeEnter() {
                    secondAnimation();
                },
                beforeLeave() {
                    fash_scene.destroy();
                    fash_controller.destroy();

                }
            }
        ],

        transitions: [
            {
                leave({ current, next }) {
                    let done = this.async;
                    const t1 = gsap.timeline({ defaults: { ease: "power2.inOut" } });
                    t1.fromTo(".slide", 1, { x: "-100%" }, { x: "0%", onComplete: done });
                    t1.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
                },

                enter({ current, next }) {
                    window.scrollTo(0, 0);
                    let done = this.async;
                    const t2 = gsap.timeline({ defaults: { ease: "power2.inOut" } });
                    t2.fromTo(".slide", 1, { x: "0%" }, { x: "100%", stagger: 0.3, onComplete: done });
                    t2.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });

                }
            }
        ]

    })
});

//animation on second page

function secondAnimation() {
    const fashion = document.querySelectorAll(".section");
    fash_controller = new ScrollMagic.Controller();

    fashion.forEach((fash, index, fashion) => {

        let nextSlide = fashion.length - 1 === index ? "end" : fashion[index + 1];
        const nextImg = nextSlide.querySelector("img");

        const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.inOut" } });
        tl.fromTo(fash, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, '-=1');
        tl.fromTo(nextImg, { x: "50%" }, { x: "0%" });

        fash_scene = new ScrollMagic.Scene({
            triggerElement: fash,
            triggerHook: 0,
            duration: "100%"
        })
            .setPin(fash, { pushFollowers: false })
            .setTween(tl)
            // .addIndicators()
            .addTo(fash_controller);

    });


}



//Event Listners

window.addEventListener("mousemove", cursor)
window.addEventListener("mouseover", cursorActive);
burger.addEventListener("click", openBurger);
