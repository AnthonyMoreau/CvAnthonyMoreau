let head = document.querySelector('head')
let style = document.createElement("link");
let style_width = window.innerWidth;

style.setAttribute("rel", "stylesheet");

let My_body = document.querySelector('html');
My_body.style.opacity = 0;


document.addEventListener("DOMContentLoaded", () => {
    //large-screen
    if(style_width >= 1600){
        style.setAttribute("href", 'style.css');
    }
    //medium-screen
    if(style_width >= 1140 && style_width < 1600){
        style.setAttribute("href", 'style-screen-medium.css');
    }
    // tablette
    if(style_width >= 540 && style_width < 1140){
        style.setAttribute("href", 'style-screen-tablette.css');
    }
    //mobile
    if(style_width <= 540){
        style.setAttribute("href", 'style-screen-mobile.css');
    }

    head.appendChild(style);

    My_body.style.transition = "opacity 2s ease-in-out";
    My_body.style.opacity = 1;

}) 


