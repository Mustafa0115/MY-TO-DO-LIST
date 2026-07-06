let yesButton = document.getElementById("yesButton");
let noButton = document.getElementById("noButton");
let message = document.getElementById("message");
let textbox = document.getElementById("textbox");
let btn = document.getElementById("btn");
let mas = document.getElementById("mas")

// keep a copy of hero2 HTML so we can recreate it if needed
let hero2HTML = null;
let hero2Parent = null;
const initHero2Cache = () => {
    const h = document.getElementById('hero2');
    if (h) {
        hero2HTML = h.outerHTML;
        hero2Parent = h.parentNode;
    } else {
        hero2Parent = document.body;
    }
};
initHero2Cache();

// ensure hero2 starts hidden (no visible class)
const existingHero2 = document.getElementById('hero2');
if (existingHero2) existingHero2.classList.remove('visible');

function getHero2() {
    let el = document.getElementById('hero2');
    if (!el && hero2HTML && hero2Parent) {
        hero2Parent.insertAdjacentHTML('beforeend', hero2HTML);
        el = document.getElementById('hero2');
    }
    return el;
}

yesButton.addEventListener("click", function() {
    message.textContent = "OK, Thank you for your respect! Go down and learn about me.";
    const h = getHero2();
    if (h) {
        // add visible class to animate in
        // ensure class change happens in next frame to trigger transition
        requestAnimationFrame(() => h.classList.add('visible'));
    }
});

noButton.addEventListener("click", function() {
    message.textContent = "ok, I will not ask you again.";
    const h = getHero2();
    if (h) {
        // remove visible class to animate out
        h.classList.remove('visible');
    }
});


btn.addEventListener("click", function(){
    let text = textbox.value;
    if (text === ""){
        mas.textContent = "Please enter your rate!";
        return;
    }
    mas.textContent = "Thanks for your rate."
})