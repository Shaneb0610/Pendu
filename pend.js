const motE1 = document.getElementById('mot');
const mauvaiseslettres = document.getElementById('mauvaises-lettres');
const rejouerBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-contenant');
const notification = document.getElementById('notification-contenant');
const finalMessage = document.getElementById('final-message');

const figureParts= document.querySelectorAll(".figure-part");

const mots = ['football', 'penalty', 'ballon', 'goals'];

let motSelectionne = mots[Math.floor(Math.random() * mots.length)];

const bonnesLettres = [];
const mauvaisesLettres = [];


function afficherMot(){
    motE1.innerHTML = `
    ${motSelectionne
    .split('')
    .map(
        lettre =>`
        <span class="lettre">
        ${bonnesLettres.includes(lettre) ? lettre : ''}
        </span>
        `
    )
    .join('')}
    `;

    const motInterne = motE1.innerText.replace(/\n/g, '');

    console.log(motE1.innerText, motInterne);

    if(motInterne === motSelectionne){
        finalMessage.innerText = 'Bravo! Tu as réussi !';
        popup.style.display= 'flex';
    }
}


function updateMauvaisesLettresE1(){
    
    mauvaisesLettres.innerHTML = `
    ${mauvaisesLettres.length > 0 ? '<p>Wrong</p>' : ''}
    ${mauvaisesLettres.map(lettre => `<span>${lettre}</span>`)}
    `;

    
    figureParts.forEach((part,index) => {
        const erreurs = mauvaisesLettres.length;

        if(index < erreurs) {
            part.style.display = 'block'
        }
        else{
            part.style.display = 'none';
        }
    });

    
    if(mauvaisesLettres.length === figureParts.length){
        finalMessage.innerText = 'Malheuresement, tu as perdu !';
        popup.style.display = 'flex';
    }
}


function afficherNotification(){
    notification.classList.add('afficher');

    setTimeout(() => {
        notification.classList.remove('afficher');
    }, 2000);
}

//Clavier
window.addEventListener('keydown', e =>{
    if(e.keyCode >= 65 && e.keyCode <=90){
        const lettre = e.key;

        if(motSelectionne.includes(lettre)){
            if(!bonnesLettres.includes(lettre)){
                bonnesLettres.push(lettre);

                afficherMot();
            } else{
                afficherNotification();
            }
        } else{
            if(!mauvaisesLettres.includes(lettre)){
                mauvaisesLettres.push(lettre);

                updateMauvaisesLettresE1();
            } else{
                afficherNotification();
            }
        }
    }
});

//Rejouer
rejouerBtn.addEventListener('click', () => {
    //vider
    bonnesLettres.splice(0);
    mauvaisesLettres.splice(0);

    motSelectionne = mots[Math.floor(Math.random() * mots.length)];

    afficherMot();

    updateMauvaisesLettresE1();

    popup.style.display = 'none';
});


afficherMot();
