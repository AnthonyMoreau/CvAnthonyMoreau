let style = document.createElement("style");
let insert = document.querySelector("head");
insert.appendChild(style);
let Font_body = undefined;
let color = undefined;
let FontWeight = undefined;
let Weight = undefined;

if(window.innerWidth > 1600){
    
    Font_body = 16 + 'px';
    color = 'rgb(255, 70, 32)';
    Weight = 'bold';
    FontWeight = "font-weight";

} else {

    Font_body = 12 + 'px';
    color = 'rgb(255, 70, 32)';
    weight = 12 + 'px'
    FontWeight = 'font-size'
}

style.innerHTML = 
`
body
    { ` +
        FontWeight +`: ` + Weight + `; 
    }

.footer 
    {
        color : ` + color + `;
    }
`;