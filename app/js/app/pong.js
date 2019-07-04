// PING--PONG
function getRandom(mn, mx) {
    return (Math.random() * (mx - mn)) - mx
}
function fractionNumber(number, diviser, diviseur){
    let result = number / diviseur;
    return result * diviser

}

let navWidth = pourcentage(window.innerHeight, 20);
let pong = document.querySelector('.PONG h2');
let limiteHeightBonnus = document.querySelector('.pong').offsetTop;
let screen = fractionNumber(window.innerWidth, 1, 5);

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

let positionBalleY = balle.offsetTop;
let positionBalleX = balle.offsetLeft;
let postionRaquetteY = pourcentage(window.innerHeight, 80) - pourcentage(window.innerHeight, 1.5);
let postionRaquetteX = raquette.offsetLeft;
let positionTopAdjust = pourcentage(window.innerHeight, 8);
let largeurRaquette = undefined;
//TAILLE RAQUETTE RESPONSIVE
if(window.innerWidth > 1600){

    largeurRaquette = pourcentage(window.innerWidth, 10);
    raquette.style.left = 45 + '%';

} else if(window.innerWidth > 700 && window.innerWidth < 1600) {

    largeurRaquette = pourcentage(window.innerWidth, 12);
    raquette.style.left = 44 + '%';

} else {

    largeurRaquette = pourcentage(window.innerWidth, 23);
    raquette.style.left = 33.5 + '%';

}

let PointScore = document.getElementsByClassName('score')[0];
let Score = 0;
let NbChance = 3;
let PointChance = document.getElementsByClassName('chance')[0];;

let limiteHeight = 0;

fenetre.addEventListener('click', () => {

    let body = document.querySelector('body');
    body.style.overflowY = 'hidden';

    postionRaquetteY = pourcentage(window.innerHeight, 80) - pourcentage(window.innerHeight, 1.5);
    
    document.querySelector('.PONG .play p').textContent = 'Le jeu commmence';
    setTimeout(function(){
        document.querySelector('.PONG .play p').textContent = '';
    }, 1500);

    setInterval(function(){

        if(Score >=10){
            limiteHeight = -(limiteHeightBonnus)
        }


        //CONTROLE DE LA POSITION X et Y DES ELEMENTS
        positionBalleY = balle.offsetTop;
        positionBalleX = balle.offsetLeft;
        postionRaquetteX = raquette.offsetLeft;
        PointChance.innerHTML = "vies : " + NbChance;
        raquette.style.width = largeurRaquette + "px";
        

        // La BALLE TAPE LA RAQUETTE OU LE TOP => LA VITESSE-Y S'INVERSE et la VITESSE-X se regenère
        if((limitePositionBalleY <= limiteHeight) || (limitePositionBalleY >= (postionRaquetteY) && positionBalleX > postionRaquetteX && positionBalleX < (postionRaquetteX + largeurRaquette))) {
            if(vitesseY < 10) {
                if(vitesseY > 0) {
                    vitesseY += 0.5;
                    vitesseY = (vitesseY * (-1));
                    if(largeurRaquette <= 5) {
                        largeurRaquette = 5
                    } else {
                        largeurRaquette -= 5
                    }
                    raquette.style.width = largeurRaquette + "px";
                }
                else {
                    vitesseY -= 0.5;
                    vitesseY = (vitesseY * (-1))
                }
                vitesseX = getRandom(-5, 5);
            } else {
                vitesseY = 10;
                vitesseY = (vitesseY * (-1))
            }
        }

        if((limitePositionBalleY >= (postionRaquetteY) && positionBalleX > postionRaquetteX && positionBalleX < (postionRaquetteX + largeurRaquette))){
            Score++;
            PointScore.innerText = "Score : " + Score;
        }

        // La BALLE TAPE LES BORDS => LA VITESSE-X S'INVERSE
        if(positionBalleX <= 0 || positionBalleX >= fractionNumber(window.innerWidth, 4, 5)){
            vitesseX = (vitesseX * (-1))
        }
        // LA BALLE TOMBE => ON PERD UN COUP
        if(limitePositionBalleY > postionRaquetteY + 50) {
            if(NbChance <= 1 ){
                NbChance = 3;
                Score = 0;
                PointScore.innerText = "Score : " + Score;
                PointChance.innerHTML = "vie : " + NbChance;
                vitesseY  = 3;

                alert('vous avez perdu !');
                
            }
            NbChance--;
            limitePositionBalleY = pourcentage(window.innerHeight, 30) ;
            balleX = pourcentage(window.innerWidth, 50);
            balle.style.top = limitePositionBalleY + "px";
            balle.style.left = balleX + "%";
        }
        limitePositionBalleY += vitesseY;
        balleX += vitesseX;
        balle.style.top = limitePositionBalleY + "px";
        balle.style.left = balleX + "px";

    }, 1000/40);
    
    mousePosition = fenetre.addEventListener('mousemove', function(e){
        let screen = fractionNumber(window.innerWidth, 1, 5);
        console.log(screen)
        console.log(e.clientX)
        if(e.clientX  <= screen + (largeurRaquette / 2)) {
            raquette.style.left = 0;
        }
        else if(e.clientX - screen >= (fractionNumber(window.innerWidth, 4, 5) - largeurRaquette / 2)) {
            raquette.style.left = (fractionNumber(window.innerWidth, 4, 5) - largeurRaquette) + "px";
        } else {
            raquette.style.left = ((e.clientX - fractionNumber(window.innerWidth, 1, 5)) - largeurRaquette / 2) + "px";
        }
        
    })

}, {once: true});
