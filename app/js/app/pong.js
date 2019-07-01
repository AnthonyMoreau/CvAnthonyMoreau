// PING--PONG
function getRandom(mn, mx) {
    return (Math.random() * (mx - mn)) - mx
}
let pong = document.querySelector('.PONG h2');

pong.addEventListener('click', function(){
    pong = document.querySelector('.PONG h2');
    if(this.textContent === "Pong"){
        this.textContent = "Ping"
    } else {
        if(this.textContent === "Ping"){
            this.textContent = "Pong"
        }
    }
});
// MOUVEMENT--RAQUETTE--SOURIS
let fenetre = document.querySelector('.PONG');
let raquette = document.querySelector('.raquette');
let mousePosition = undefined;


// MOUVEMENT BALLES
let balle = document.querySelector('.balle');
let balleX = parseInt(balle.style.left);

// INITIALISATION VITESSE Y et X
let vitesseY = 3;
let vitesseX = getRandom(-5, 5);

let limitePositionBalleY = pourcentage(window.innerHeight, 30);

let bodyHeight = document.querySelector('body');

console.log(bodyHeight);

let positionBalleY = balle.offsetTop;
let positionBalleX = balle.offsetLeft;
let postionRaquetteY = pourcentage(window.innerHeight, 80) - pourcentage(window.innerHeight, 8);
let postionRaquetteX = raquette.offsetLeft;
let positionTopAdjust = pourcentage(window.innerHeight, 8);
let largeurRaquette = pourcentage(window.innerWidth, 30);

let PointScore = document.getElementsByClassName('score')[0];
let NbChance = 3;
let Score = 0;

let limiteHeight = 0;

let o = fenetre.addEventListener('click', () => {

    postionRaquetteY = pourcentage(window.innerHeight, 80) - pourcentage(window.innerHeight, 8)
    
    document.querySelector('.PONG .play p').textContent = 'Le jeu commmence';
    setTimeout(function(){
        document.querySelector('.PONG .play p').textContent = '';
    }, 1500)

    setInterval(function(){

        if(Score >=2){
            limiteHeight = -500
        }


        //CONTROLE DE LA POSITION X et Y DES ELEMENTS
        positionBalleY = balle.offsetTop;
        positionBalleX = balle.offsetLeft;
        postionRaquetteX = raquette.offsetLeft;
        

        // La BALLE TAPE LA RAQUETTE OU LE TOP => LA VITESSE-Y S'INVERSE et la VITESSE-X se regenère
        if((limitePositionBalleY <= limiteHeight + positionTopAdjust) || (limitePositionBalleY >= (postionRaquetteY) && positionBalleX > postionRaquetteX && positionBalleX < (postionRaquetteX + largeurRaquette))) {
            if(vitesseY < 10) {
                if(vitesseY > 0) {
                    vitesseY += 0.5
                    vitesseY = (vitesseY * (-1));
                    if(largeurRaquette < 80) {
                        largeurRaquette = largeurRaquette
                    } else {
                        largeurRaquette += -5
                    }
                    raquette.style.width = largeurRaquette + "px";
                    console.log(largeurRaquette)
                }
                else {
                    vitesseY -= 0.5;
                    vitesseY = (vitesseY * (-1))
                }
                vitesseX = getRandom(-5, 5);
                console.log(vitesseY)
            } else {
                vitesseY = 10;
                vitesseY = (vitesseY * (-1))
            }
        }

        if((limitePositionBalleY >= (postionRaquetteY) && positionBalleX > postionRaquetteX && positionBalleX < (postionRaquetteX + largeurRaquette))){
            Score++;
            PointScore.innerText = "Score : " + Score
        }

        // La BALLE TAPE LES BORDS => LA VITESSE-X S'INVERSE
        if(positionBalleX <= 0 || positionBalleX >= window.innerWidth){
            vitesseX = (vitesseX * (-1))
        }
        // LA BALLE TOMBE => ON PERD UN COUP
        if(limitePositionBalleY > postionRaquetteY + 30) {
            limitePositionBalleY = pourcentage(window.innerHeight, 30) ;
            balleX = pourcentage(window.innerWidth, 50);
            balle.style.top = limitePositionBalleY + "px";
            balle.style.left = balleX + "px";
            vitesseY  = 2;
            NbChance--
        }
        limitePositionBalleY += vitesseY;
        balleX += vitesseX;
        balle.style.top = limitePositionBalleY + "px";
        balle.style.left = balleX + "px";

    }, 1000/40);
    
    mousePosition = fenetre.addEventListener('mousemove', function(e){
        
        if(e.clientX <= (largeurRaquette / 2)) {
            raquette.style.left = 0;
        }
        else if(e.clientX >= (window.innerWidth - largeurRaquette / 2)) {
            raquette.style.left = (window.innerWidth - largeurRaquette / 2) + "px";
        } else {
            raquette.style.left = (e.clientX - largeurRaquette / 2) + "px";
        }
        
    })

}, {once: true});
