
function scrollAnimation() {
    
    // let controller = new scrollMagic.Controller();

    const sliders = document.querySelectorAll(".sec");
    
    sliders.forEach(slider => {
        const revealImg = document.querySelector(".reveal-img");
        const Img = document.querySelector(".img-sec img");
        const revealText = document.querySelector(".reveal-img");

        gsap.to(revealImg,1,  {x:'100%'});
    });

}

scrollAnimation();