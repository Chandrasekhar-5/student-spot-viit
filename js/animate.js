const elements = document.querySelectorAll(".animate");

window.addEventListener("scroll", () => {
elements.forEach(el=>{
const position = el.getBoundingClientRect().top;
if(position < window.innerHeight - 100){
el.classList.add("show");
}
});
});