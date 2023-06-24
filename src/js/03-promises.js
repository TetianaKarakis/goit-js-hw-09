import { Notify } from 'notiflix/build/notiflix-notify-aio';

const notifyOptions = {position: 'center-center', timeout: 10000};
const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);
function onFormSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;

  // console.log(`delay: ${delay.value}, step: ${step.value}, amount: ${amount.value}`);
  let inputDelay = Number(delay.value);
  const inputAmount = Number(amount.value);
  const inputStep = Number(step.value);

  for (let i = 1; i <= inputAmount; i+=1) {
    inputDelay += inputStep;
    createPromise(i, inputDelay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, notifyOptions);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, notifyOptions);
    });
  }
  e.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay);
  }
)};