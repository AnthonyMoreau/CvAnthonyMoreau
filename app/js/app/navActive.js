function selectAll(element){
    return document.querySelectorAll(element)
}
function select(element){
    return document.querySelector(element)
}
function pourcentage(element, pourcentage){
    const pourcent = 100;
    return element * (pourcentage / pourcent);
}

let divMenu = window.innerHeight;
let information = pourcentage(divMenu, 10);
let scrollMax = document.documentElement.scrollHeight - document.documentElement.clientHeight;
let links = selectAll('.nav li a');
let li = selectAll(".nav li");

document.addEventListener('scroll', (e) => {
    for (let i = 1; i < links.length ; i++) {
        if (e.pageY < divMenu){
            for (let k = 0; k < li.length ; k++) {
                li[k].classList.remove("active-menu")
            }
            li[0].classList.add("active-menu");
        }
        if (e.pageY >= divMenu * i){
            let section = select(li[i].firstChild.attributes.href.value).offsetTop;
            if(e.pageY >= section){
                for (let l = 0; l < li.length ; l++) {
                    li[l].classList.remove("active-menu")
                }
                li[i].classList.add("active-menu");
            }
        }
        if (e.pageY >= scrollMax - (information / 3)){
            for (let j = 0; j < li.length ; j++) {
                li[j].classList.remove("active-menu")
            }
            li[li.length - 1].classList.add("active-menu");
        }
    }
});