const dice = document.querySelector('.container__dice');
const title = document.querySelector('.container__title');
const adviceTxt = document.querySelector('.container__advice');


dice.addEventListener('click', rollDice);

function rollDice(){
    dice.classList.add('spin');
    dice.disabled = true;
    getAdvice().then(data => {
        const {id, advice} = data.slip;
        title.textContent = `ADVICE # ${id}`;
        adviceTxt.textContent = `"${advice}"`;
    })
    .catch(_ => {
        console.log('Shometing went wrong :(')
    })
    .finally(() => {
        setTimeout(() => {
            dice.classList.remove('spin');
            dice.disabled = false;
        },(2000));
    })
}

async function getAdvice(){
    const response = await fetch('https://api.adviceslip.com/advice')
    if(!response.ok) throw response;
    const data = await response.json();
    return data;
}
