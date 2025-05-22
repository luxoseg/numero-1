let stepUserForm = 0,
  userValue,
  dateValue,
  dateEua,
  errorForm,
  currentAnimation = 'destiny',
  modalActive,
  dayValue,
  listDays,
  listYears = [],
  yearValue,
  yearArray,
  monthValue,
  monthObject,
  decadeValue,
  lastDecade,
  yearList,
  yearsLi,
  numberDestiny,
  currentTime = 0,
  interval,
  genderSelected,
  genderValue,
  allNameValue = '',
  expreNameArray,
  expreValue,
  expreNumersArray,
  stateValue,
  userEmail,
  numberSoul,
  soulNameArray,
  soulNumArray,
  track,
  animaIsEnabled = false,
  signValue,
  phoneValue,
  pathProduct,
  widthCalcBlock,
  heightCalcBlock,
  yearNumberDestiny,
  dayNumberDestiny,
  monthNumberDestiny,
  lastContainerCalc,
  numberPersonality,
  paramsUrl = {},
  numberBirth,
  fullNameIsValid = false;
  ;
let buttonPlay, buttonSound, audioVideoJs;
const buttonUser = document.querySelector('#form-name-and-date #buttonFormUser');
const formUserBlocks = document.querySelectorAll('#form-name-and-date .form-content .form-group');
const audioOneForm = document.querySelector('#audio-one');
const sectionNameDate = document.querySelector('#form-name-and-date');
const sectionAnimation = document.querySelector('#animation-audio');
const boxAnimation = document.querySelector('#animation-audio .animation-modal');
const audioModal = document.querySelector('#audio-modal');
const audioSource = document.querySelector('#my-player source');
const audioTrack = document.querySelector('#my-player track');
const buttonPlayAudio = document.querySelector("#audio-modal .control-play")
const buttonVolumeAudio = document.querySelector("#audio-modal .control-sound")
const sectionExpression = document.querySelector('.expressionForm');
const sectionSoul = document.querySelector('.state-civil-section');
const sectionCta = document.querySelector('.cta-section');
const audio = document.querySelector('#my-player');
const audioLoop = document.querySelector('.audio-loop');
const audioVidoJs = document.querySelector('.vjs-tech');
const genderModal = document.querySelector('.gender-modal');
const stateCivilModal = document.querySelector('.state-civil-modal');
const inputFullName = document.querySelector('.field-full-name');
const buttonWarning = document.querySelector('.play-animation .btn-play');
const playContainer = document.querySelector('.play-animation.modal-warning');
const sectionContainer = document.querySelector('.content-wrapper .section-container');
const stopModal = document.querySelector('.stop-container');
const stopModalButton = document.querySelector('.stop-container .button-stop-continue');
const ctaFinishModal = document.querySelector('.modal-finish-cta');
const ctaFinishBtn = document.querySelector('.modal-finish-cta .btn-finish-cta');
const ctaFinishClose = document.querySelector('.modal-finish-cta .close-modal-finish');
const ctaEmailField = document.querySelector('.modal-finish-cta .finish-field .emailFinish');
const ctaBtn = document.querySelector('.cta-button .cta-btn');
const inputEmail = document.querySelector('.field-email');
const buttonExpression = document.querySelector('#number-expression');
const buttomNumSoul = document.querySelector('#buttom-number-soul');
const loading = document.querySelector('.loading-container.calc');
const sectionPitch = document.querySelector('.section-modal-pitch');
const animationCalcSection = document.querySelector('.animation-destiny');
const animationCalcContainer = document.querySelector('.animation-destiny .animation-calc-container');
const boxHeader = document.querySelector('.modal-form .box-header');
const modalFormDate = document.querySelector('.modal-form #dateMonth');
const loadingInitial = document.getElementById("loading-initial");

const allNameContainer = document.querySelector('.form-group.all-name-field');
const allNameErrorMessage = document.getElementById(".all-name-field.form-group .error-message");

var noSleep = new NoSleep();
gsap.registerPlugin(CSSPlugin);
gsap.ticker.lagSmoothing(false);
let animationCalc;

const formsSectionsArray = [
  {
    name: '[form2]',
    section: sectionExpression,
  },
  {
    name: '[form3]',
    section: sectionSoul,
  },
  {
    name: '[form4]',
    section: sectionPitch,
  },
  {
    name: '[cta]',
    section: sectionCta,
  },
];

codeExtendObject = [
  {
    name: 'name&birthDate',
    function: (time, endTime) => animationUserDestiny(time, endTime),
  },
  {
    name: 'destinyCalcAnimation',
    function: (time, endTime) => destinyAnimation(time, endTime),
  },
  {
    name: 'expressionCalcAnimation',
    function: (time, endTime) => expressAnimation(time, endTime),
  },
  {
    name: 'firstnameAnimation',
    function: (time, endTime) => firstNameAnimation(time, endTime),
  },
];

window.onload = ()=> {
  setTimeout(() =>{
    monitoringCallback(callbackThread)
  }, 2000)
}

function callbackThread(){
  console.log("Script Iniciado");
  audioLoop.loop = true;
  getMonthValue();
  pathProductRedirect();
  noSleep.enable();
  init();
  loadingInitial.classList.add('hide');
}

function pathProductRedirect() {
  console.log("lang: ", currentLang);
  console.log("Teste cache: ", 1);
  
  const path = window.location.search;
  const urlParams = new URLSearchParams(path);
  urlParams.forEach((value, key) => {
      const keyValue = key.replace('amp;', '')
      paramsUrl[keyValue] = value
  })
  const url = new URL(window.location.href);
  const getParamters = url.searchParams;
  urlParamsCheckout = getParamters.toString()

  switch (paramsUrl.origem) {
    case 'mb':
        pathProduct = langContent.pathCheckoutmb;
        break;
    default:
        pathProduct = langContent.pathCheckout;
        break;
  }
}

function translationCall(){
  const firstNameField = document.getElementById("user-details-name")
  const allNameField = document.getElementById("allName")
  const emailField = document.getElementById("email")
  const emailFinishField = document.getElementById("emailFinish")
  const tellField = document.getElementById("tell")
  
  
  firstNameField.placeholder = langContent?.translations?.placeholders[0]
  allNameField.placeholder = langContent?.translations?.placeholders[1]
  emailField.placeholder = langContent?.translations?.placeholders[2]
  emailFinishField.placeholder = langContent?.translations?.placeholders[3]
  tellField.placeholder = langContent?.translations?.placeholders[4]
}

buttonUser.onclick = () => {
  nextMultiStepUserForm();
};

async function nextMultiStepUserForm() {
  switch (stepUserForm) {
    case 0:
      await stepMonthDate();
      await backStepFormUser();
      await nextStepUser();
      break;
    case 1:
      await stepDayDate();
      await nextStepUser();
      break;
    case 2:
      await stepDecadeDate();
      await nextStepUser();
      break;
    case 3:
      await nextStepUser();
      translationCall()
      break;
    default:
      await stepNameField();
      break;
  }
}

function stepNameField() {
  try {
    const regex = /[0-9]/;
    const checkPrimary = /[a-z]+[ ]+[a-z]/g;
    let alertModal = document.querySelector('.alert-modal');
    const userName = document.querySelector('#user-details-name');
    if (!userName.value > 0) {
      alertText(langContent.translations.alerts[2]);
      return;
    }
    if (checkPrimary.test(userName.value)) {
      alertText(langContent.translations.alerts[3]);
      return;
    }
    if (regex.test(userName.value)) {
      alertText(langContent.translations.alerts[4]);
      return;
    }
    const valueFormated = userName.value.replace(/ /g, '');
    userValue = valueFormated;
    fbq('track', userValue);
    handleFormUser();
  } catch (error) {

    console.error("An error occurred while executing stepNameField:", error);
  }
  
}

function stepMonthDate() {
  boxHeader.classList.add('hide');
  getDayDateValue();
}

function stepDayDate() {
  getDecadeValue();
}
function stepDecadeDate() {
  getYearsValues();
}
function stepYearDate() {
  dateValue = `${dayValue}/${monthValue}/${yearValue}`;
  dateEua = `${yearValue}-${monthValue}-${dayValue}`;
}
function nextStepUser() {
  formUserBlocks[stepUserForm].classList.add('hide');
  formUserBlocks[stepUserForm + 1].classList.remove('hide');
  stepUserForm = stepUserForm + 1;
}

function backStepFormUser() {
  const buttonBack = document.querySelector('#form-name-and-date .back-form');
  //buttonBack.classList.remove("hide")
  initialAnimationCalc();
  buttonBack.onclick = () => {
    if (stepUserForm === 1) {
      buttonBack.classList.add('hide');
      animationCalcSection.classList.add('hide');
      animationCalc.kill();
      animationCalcContainer.innerHTML = '';
    }
    prevStepUser();
  };
}

function initialAnimationCalc() {
  animationCalcContainer.innerHTML = '';
  animationCalc = gsap.timeline();
  animationCalcSection.classList.remove('hide');
  animationMonthCalc();
}

function prevStepUser() {
  formUserBlocks[stepUserForm].classList.add('hide');
  formUserBlocks[stepUserForm - 1].classList.remove('hide');
  stepUserForm = stepUserForm - 1;
}

function getMonthValue() {
  const monthItens = document.querySelectorAll('#dateMonth .date-item');
  for (let i = 0; i < monthItens.length; i++) {
    monthItens[i].onclick = (e) => {
      if (monthItens[i].classList.contains('active')) {
        monthItens[i].classList.remove('active');
        monthValue = undefined;
        return;
      }
      monthItens[i].classList.add('active');
      const value = Number(monthItens[i].getAttribute('data-value'));
      const valueMonth = value + 1;
      monthObject = getMountName(value);
      monthValue = String(valueMonth < 10 ? '0' + valueMonth : valueMonth);
      monthNumberDestiny = handleMonthResult(monthValue);
      nextMultiStepUserForm();
      for (let i = 0; i < monthItens.length; i++) {
        const values = Number(monthItens[i].getAttribute('data-value')) + 1;
        const formated = String(values < 10 ? '0' + values : values);
        if (formated !== monthValue) {
          monthItens[i].classList.remove('active');
        }
      }
    };
  }
}

function getDayDateValue() {
  const dayList = document.querySelector('.day-itens .birth-date-list');
  dayList.innerHTML = '';
  const list = [];
  for (let day = 1; day <= monthObject.monthDays; day += 1) {
    const value = day < 10 ? '0' + day : day;
    const li = document.createElement('li');
    li.setAttribute('data-value', value);
    li.classList.add('date-item');
    li.classList.add('date-day');
    li.classList.add(`mdv${currentLang}-form1-day`);
    li.innerHTML = value;
    list.push(li);
    dayList.appendChild(li);
  }
  list.forEach((item) => {
    item.onclick = (e) => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        dayValue = undefined;
        return;
      }
      item.classList.add('active');
      const value = item.getAttribute('data-value');
      dayValue = value;
      dayNumberDestiny = handleDayResult(dayValue);
      nextMultiStepUserForm();
      animationDayCalc();
      for (let i = 0; i < list.length; i++) {
        if (list[i].getAttribute('data-value') !== dayValue) {
          list[i].classList.remove('active');
        }
      }
    };
  });
}

function getDecadeValue() {
  const decadeList = document.querySelector('.decade-itens .birth-date-list');
  decadeList.innerHTML = '';
  const list = [];
  const currentYear = new Date().getFullYear() - 10;
  for (let year = 1910; year <= currentYear; year += 10) {
    const li = document.createElement('li');
    li.setAttribute('data-value', year);
    li.classList.add('date-item');
    li.classList.add('date-day');
    li.classList.add(`mdv${currentLang}-form1-decade`);
    li.innerHTML = year;
    list.push(li);
    decadeList.appendChild(li);
    lastDecade = year;
  }
  list.forEach((item) => {
    item.onclick = (e) => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        decadeValue = undefined;
        return;
      }
      item.classList.add('active');
      const value = Number(item.getAttribute('data-value'));
      decadeValue = Number(value);
      nextMultiStepUserForm();
      for (let i = 0; i < list.length; i++) {
        if (Number(list[i].getAttribute('data-value')) !== decadeValue) {
          list[i].classList.remove('active');
        }
      }
    };
  });
}

async function getYearsValues() {
  const yearMax = new Date().getFullYear() - 10;
  const yearMaxDecade = Number(String(yearMax).substring(2));
  const yearMaxResult = yearMaxDecade > 10 ? yearMaxDecade - 9 : yearMaxDecade === 10 ? 0 : yearMaxDecade;
  const listYears = document.querySelector('.years-itens ul.birth-date-list');
  listYears.innerHTML = '';
  const lastYear = decadeValue === lastDecade ? decadeValue + yearMaxResult : decadeValue + 10;
  for (let year = decadeValue; year < lastYear; year++) {
    const li = document.createElement('li');
    li.setAttribute('data-value', year);
    li.classList.add('date-item');
    li.classList.add('date-year');
    li.classList.add(`mdv${currentLang}-form1-year`);
    li.innerHTML = year;
    listYears.appendChild(li);
  }
  listYears.childNodes.forEach((item) => {
    item.onclick = (e) => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        yearValue = undefined;
        return;
      }
      item.classList.add('active');
      const value = Number(item.getAttribute('data-value'));
      yearValue = Number(value);
      yearNumberDestiny = handleYearResult(yearValue);
      animationYearsCalc();
      nextMultiStepUserForm();
      for (let i = 0; i < listYears.childNodes.length; i++) {
        if (Number(listYears.childNodes[i].getAttribute('data-value')) !== yearValue) {
          listYears.childNodes[i].classList.remove('active');
        }
      }
    };
  });
}

function alertText(text) {
  const div = document.createElement('div');
  div.className = 'alert-modal error';
  const alert = `
        <div class="alert-mensage">${text}</div>
        <div class="alert-scroll"></div>
    `;
  div.innerHTML = alert;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 5000);
}

function animationMonthCalc() {
  try{
    const monthAnimationBlock = document.createElement('div');
    monthAnimationBlock.classList.add('row-animation');
    monthAnimationBlock.style.width = '50%';
    animationCalcContainer.appendChild(monthAnimationBlock);
    const nameMonth = cardTextElement(monthAnimationBlock, monthObject.name);
    const arrow = iconElement(monthAnimationBlock, 'fa-arrow-right');
    const calcCard = cardCalc(monthAnimationBlock, monthValue);
    const arrowTwo = iconElement(monthAnimationBlock, 'fa-arrow-right');
    const valueEnd = cardTextElement(monthAnimationBlock, monthNumberDestiny);

    widthCalcBlock = animationCalcContainer.clientWidth;
    heightCalcBlock = animationCalcContainer.clientHeight;
    let positionX = 5;
    let positionY = 5;
    if (window.innerWidth > 768) {
      positionX = 50;
      positionY = 10;
    }
    animationCalc.fromTo(monthAnimationBlock, { x: 0, y: 0 }, { x: positionX, y: positionY, duration: 0.5 });
    animationCalc.fromTo(nameMonth, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    animationCalc.fromTo(arrow, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    animationCalc.fromTo(calcCard, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    for (let i = 0; i < calcCard.childNodes.length; i++) {
      animationCalc.fromTo(calcCard.childNodes[i], { opacity: 0 }, { opacity: 1, duration: 0.15 });
    }
    animationCalc.fromTo(arrowTwo, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    animationCalc.fromTo(valueEnd, { opacity: 0 }, { opacity: 1, duration: 0.25 });
  } catch(error) {

    console.error("An error occurred while executing animationMonthCalc:", error);
  }  
}

function animationDayCalc() {
  try {
    const dayAnimationBlock = document.createElement('div');
    dayAnimationBlock.classList.add('row-animation');
    dayAnimationBlock.style.width = '50%';
    animationCalcContainer.appendChild(dayAnimationBlock);

    const dayValueCard = cardTextElement(dayAnimationBlock, dayValue);
    const arrow = iconElement(dayAnimationBlock, 'fa-arrow-right');
    const calcCard = cardCalc(dayAnimationBlock, dayValue);
    const arrowTwo = iconElement(dayAnimationBlock, 'fa-arrow-right');
    const valueEnd = cardTextElement(dayAnimationBlock, dayNumberDestiny);

    let positionX = 5;
    let positionY = heightCalcBlock / 2 - dayAnimationBlock.clientHeight / 2;
    if (window.innerWidth > 768) {
      positionX = 50;
    }
    animationCalc.play();
    animationCalc.fromTo(dayAnimationBlock, { x: 0, y: positionY }, { x: positionX, y: positionY, duration: 0.5 });
    animationCalc.fromTo(dayValueCard, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    animationCalc.fromTo(arrow, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    animationCalc.fromTo(calcCard, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    for (let i = 0; i < calcCard.childNodes.length; i++) {
      animationCalc.fromTo(calcCard.childNodes[i], { opacity: 0 }, { opacity: 1, duration: 0.15 });
    }
    animationCalc.fromTo(arrowTwo, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    animationCalc.fromTo(valueEnd, { opacity: 0 }, { opacity: 1, duration: 0.25 });
  } catch (error) {
   
    console.error("An error occurred while executing animationDayCalc:", error);
  }
}

function animationYearsCalc() {
  try {
    const yearAnimationContainer = document.createElement('div');
    yearAnimationContainer.classList.add('row-animation');
    yearAnimationContainer.style.width = '50%';
    animationCalcContainer.appendChild(yearAnimationContainer);

    const yearValueCard = cardTextElement(yearAnimationContainer, yearValue);
    const arrow = iconElement(yearAnimationContainer, 'fa-arrow-right');
    const calcCard = cardCalc(yearAnimationContainer, yearValue);
    const arrowTwo = iconElement(yearAnimationContainer, 'fa-arrow-right');
    const valueEnd = cardTextElement(yearAnimationContainer, yearNumberDestiny);

    let positionY = heightCalcBlock - (yearAnimationContainer.clientHeight + 5);
    let positionX = 5;
    if (window.innerWidth > 768) {
      positionX = 50;
      positionY = heightCalcBlock - (yearAnimationContainer.clientHeight + 10);
    }
    animationCalc.fromTo(yearAnimationContainer, { x: 0, y: heightCalcBlock }, { x: positionX, y: positionY, duration: 0.5 });
    animationCalc.fromTo(yearValueCard, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    animationCalc.fromTo(arrow, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    animationCalc.fromTo(calcCard, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    for (let i = 0; i < calcCard.childNodes.length; i++) {
      animationCalc.fromTo(calcCard.childNodes[i], { opacity: 0 }, { opacity: 1, duration: 0.15 });
    }
    animationCalc.fromTo(arrowTwo, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    animationCalc.fromTo(valueEnd, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    animationLastCalc();
  } catch (error) {

    console.error("An error occurred while executing animationYearsCalc:", error);
  }
}

async function animationLastCalc() {
  try {
    dateValue = `${dayValue}/${monthValue}/${yearValue}`;
    dateEua = `${yearValue}-${monthValue}-${dayValue}`;
    numberDestiny = await handleNumberDestiny();
    lastContainerCalc = document.createElement('div');
    lastContainerCalc.classList.add('row-animation');
    lastContainerCalc.style.width = '50%';
    animationCalcContainer.appendChild(lastContainerCalc);
    const calc = monthNumberDestiny + dayNumberDestiny + yearNumberDestiny;
    let cardCalcTwo = false;
    const calcCard = document.createElement('div');
    calcCard.classList.add('card-animation');
    calcCard.innerHTML = `<span>${monthNumberDestiny}</span><span>+</span><span>${dayNumberDestiny}</span><span>+</span><span>${yearNumberDestiny}</span>`;

    const equals = iconElement(lastContainerCalc, 'fa-equals');
    lastContainerCalc.appendChild(calcCard);

    if (numberDestiny <= 9) {
      cardCalcTwo = cardCalc(lastContainerCalc, calc);
      cardCalcTwo.style.fontSize = '1.25rem';
      cardCalcTwo.style.marginLeft = '10px';
    }

    const valueEnd = cardTextElement(lastContainerCalc, numberDestiny);
    let positionX = widthCalcBlock / 2 + lastContainerCalc.clientWidth / 4;
    equals.style.fontSize = '1.25rem';
    calcCard.style.fontSize = '1.25rem';
    valueEnd.style.fontSize = '2rem';
    valueEnd.style.marginLeft = '20px';
    if (window.innerWidth > 768) {
      equals.style.fontSize = '2.5rem';
      calcCard.style.fontSize = '2rem';
      calcCard.style.marginLeft = '20px';
      valueEnd.style.fontSize = '3rem';
      valueEnd.style.marginLeft = '40px';
      positionX = widthCalcBlock / 2 + lastContainerCalc.clientWidth / 5;
      if (cardCalcTwo) {
        cardCalcTwo.style.fontSize = '2rem';
        cardCalcTwo.style.marginLeft = '30px';
      }
    }

    const positionY = heightCalcBlock / 2 - lastContainerCalc.clientHeight / 2;

    animationCalc.fromTo(lastContainerCalc, { x: 0, y: heightCalcBlock }, { x: positionX, y: positionY, duration: 0.5 });
    animationCalc.fromTo(equals, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    animationCalc.fromTo(calcCard, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    for (let i = 0; i < calcCard.childNodes.length; i++) {
      animationCalc.fromTo(calcCard.childNodes[i], { opacity: 0 }, { opacity: 1, duration: 0.2 });
    }
    for (let i = 0; i < calcCard.childNodes.length; i++) {
      animationCalc.to(calcCard.childNodes[i], { opacity: 0, duration: 0.2 });
    }
    animationCalc.to(calcCard, { opacity: 0, display: 'none', duration: 0.25 });
    if (cardCalcTwo) {
      animationCalc.fromTo(cardCalcTwo, { opacity: 0 }, { opacity: 1, delay: 1, duration: 0.25 });
      for (let i = 0; i < cardCalcTwo.childNodes.length; i++) {
        animationCalc.fromTo(cardCalcTwo.childNodes[i], { opacity: 0 }, { opacity: 1, duration: 0.2 });
      }
      animationCalc.to(cardCalcTwo, { opacity: 0, display: 'none', duration: 0.25 });
    }
    animationCalc.fromTo(valueEnd, { opacity: 0 }, { opacity: 1, delay: 1, duration: 0.25 });
  } catch (error) {

    console.error("An error occurred while executing animationLastCalc:", error);
  }
}

function cardTextElement(pattern, value) {
  const elementText = document.createElement('div');
  elementText.classList.add('card-animation');
  elementText.innerHTML = value;
  pattern.appendChild(elementText);
  return elementText;
}

function cardCalc(pattern, value) {
  const elementCalc = document.createElement('div');
  elementCalc.classList.add('card-animation');
  const values = String(value).split('');
  for (let i = 0; i < values.length; i++) {
    const span = document.createElement('span');
    span.innerHTML = values[i];
    elementCalc.appendChild(span);
    if (values.length - 1 !== i) {
      const icon = document.createElement('span');
      icon.innerHTML = '+';
      elementCalc.appendChild(icon);
    }
  }
  pattern.appendChild(elementCalc);
  return elementCalc;
}
function iconElement(pattern, className) {
  const icon = document.createElement('i');
  icon.classList.add('fas');
  icon.classList.add(className);
  icon.classList.add('icon-animation');
  pattern.appendChild(icon);
  return icon;
}

function getMountName(value) {
  const months = {
    0: { name: langContent.translations.months.January, monthDays: 31 },
    1: { name: langContent.translations.months.February, monthDays: 29 },
    2: { name: langContent.translations.months.March, monthDays: 31 },
    3: { name: langContent.translations.months.April, monthDays: 30 },
    4: { name: langContent.translations.months.May, monthDays: 31 },
    5: { name: langContent.translations.months.June, monthDays: 30 },
    6: { name: langContent.translations.months.July, monthDays: 31 },
    7: { name: langContent.translations.months.August, monthDays: 31 },
    8: { name: langContent.translations.months.September, monthDays: 30 },
    9: { name: langContent.translations.months.October, monthDays: 31 },
    10: { name: langContent.translations.months.November, monthDays: 30 },
    11: { name: langContent.translations.months.December, monthDays: 31 },
  };
  return months[value];
}

function handleYearResult(value) {
  const yearArray = String(value).split('');
  const yearNumber = yearArray.map(Number);
  const yearResult = yearNumber.reduce((acumulador, valorAtual) => {
    return acumulador + valorAtual;
  });
  return yearResult;
}
function handleDayResult(value) {
  let dayArray = String(value).split('');
  const dayNumber = dayArray.map(Number);
  let day = 0;
  for (let i = 0; i < dayNumber.length; i++) {
    day += dayNumber[i];
  }
  return day;
}
function handleMonthResult(value) {
  let monthArray = String(value).split('');
  const monthNumber = monthArray.map(Number);
  let month = 0;
  for (let i = 0; i < monthNumber.length; i++) {
    month += monthNumber[i];
  }
  return month;
}
async function handleNumberDestiny() {
    const numbersValid = [1, 2, 3, 4, 5, 6, 7,8, 9, 11, 22]
    const url = 'https://app.astranumerica.com.br/api/mapadavida/destination-number';
    const data = {
      dob: dateValue
    }
  try {
    const number = await getNumberCalc(url, data, "destinationNumber")
    if (!numbersValid.includes(number)) {
      throw "Error in calc from the api"
    }
    return number
  } catch (error) {

    console.log("Error in api: " + error);
    let result = dayNumberDestiny + yearNumberDestiny + monthNumberDestiny;
    let contador = 1;
    while (contador) {
      if (numbersValid.includes(result)) {
        break;
      }
      if (contador === 10) {
        break;
      }
      contador++
      let resultArray = String(result).split('');
      const resultNumber = resultArray.map(Number);
      result = resultNumber.reduce((acc, curr) => acc + curr, 0);
    }
    return result
  }
}

async function handleFormUser() {
  try {
    if (userValue && numberDestiny) {
      numberPersonality = await getNumberPersonality(userValue);
      loading.classList.remove('hide');
      let number = numberDestiny === 11 || numberDestiny === 22 ? numberDestiny : 0 + '' + numberDestiny;
      const audioTrack = `${langContent.pathLegends}p1/${number}.vtt`;
      const audioPath = `${langContent.pathAudios}p1/${number}.mp3`;
      const path = `${langContent.pathAnimations}p1/${number}.json`;
      
      signValue = getSign(Number(dayValue), Number(monthValue));
      let data = await getJsonData(path);
      handleFormsSections(formsSectionsArray);
      modalElement = document.querySelector('.animations-container');
      numberBirth = getNumberBirth(dayValue);
      if (data) {
        sectionNameDate.classList.add('hide');
        sectionAnimation.classList.remove('hide');
        formsSectionsArray[0].isActive = true
        GeneratorAnimation(data);
        handleVideo(audioPath, audioTrack, audio);
        handleStartVidio('p1');
      }
      addNameInWarning();
      addNameInModalStop();
      getSexValue();
    } else {
      alertText(langContent.translations.alerts[5]);
    }
  } catch (error) {

  }
  
}

function destinyAnimation(time, endTime) {
  try {
    let containerAnimationUser = document.createElement('div');
  let containerWrapper = document.createElement('div');
  let containerLeft = document.createElement('div');
  let containerRight = document.createElement('div');
  containerLeft.style += `
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 15px;
    `;
  containerRight.style.width = '240px';
  containerWrapper.style += `
    gap: 20px;
    justify-content: center;
    align-items: center;
    `;
  if (window.innerWidth < 768) {
    containerWrapper.style.gap = '10px';
    containerLeft.style.gap = `10px`;
    containerRight.style.width = '80px';
  }

  containerAnimationUser.classList.add('frame');
  containerAnimationUser.style.position = 'absolute';
  containerWrapper.appendChild(containerLeft);
  containerWrapper.appendChild(containerRight);
  containerAnimationUser.appendChild(containerWrapper);
  containerWrapper.style.display = 'flex';
  containerRight.style.display = 'flex';

  dayUserCalc(containerLeft, time);
  monthUserCalc(containerLeft, time);
  yearUserCalc(containerLeft, time);
  animationUserCalc(containerRight, time);
  modalElement.appendChild(containerAnimationUser);
  let positionX = modelVW / 2 - containerAnimationUser.clientWidth / 2;
  let positionY = modelVH / 2 - containerAnimationUser.clientHeight / 2 + 60;
  if (window.innerWidth > 768) {
    positionX = modelVW / 2 - containerAnimationUser.clientWidth / 2;
    positionY = modelVH / 2 - containerAnimationUser.clientHeight / 2 + 60;
  }
  animation.fromTo(containerAnimationUser, { x: modelVW / 2, y: modelVH }, { x: positionX, y: positionY }, time);
  animation.to(containerAnimationUser, { opacity: 0 }, endTime);
  } catch(error) {

  }
}

function animationUserDestiny(time, endTime) {
  try {
    const name = document.createElement('div');
  name.classList.add('frame');
  name.style.display = 'flex';
  name.style += `
        display: flex;
        gap: 6px;
        opacity: 0;
        position: absolute;
        width: 100%;
        left: 0;
    `;
  const date = document.createElement('div');
  date.classList.add('frame');
  date.style.display = 'flex';
  date.style += `
        display: flex;
        gap: 6px;
        opacity: 0;
        position: absolute;
        width: 100%;
        left: 0;
    `;
  const caracterName = document.createElement('div');
  caracterName.style.letterSpacing = '4px';
  const userArray = userValue.split('');
  userArray.forEach((item, index) => {
    const span = document.createElement('span');
    span.innerHTML = item;
    span.style += `
            font-size: 2rem;
            font-weight: 500;
            color: var(--color-yellow)
        `;
    caracterName.appendChild(span);
  });
  const caracterdate = document.createElement('div');
  caracterdate.style.letterSpacing = '4px';
  const dateArray = dateValue.split('');
  dateArray.forEach((item, index) => {
    const span = document.createElement('span');
    span.innerHTML = item;
    span.style += `
            font-size: 2rem;
            font-weight: 500;
            color: var(--color-yellow)
        `;
    caracterdate.appendChild(span);
  });
  console.log(langContent.translations.animations);
  
  const nameSpan = document.createElement('span');
  nameSpan.innerHTML = langContent.translations.animations[0];
  const dateSpan = document.createElement('span');
  dateSpan.innerHTML = langContent.translations.animations[1];
  name.appendChild(nameSpan);
  name.appendChild(caracterName);
  date.appendChild(dateSpan);
  date.appendChild(caracterdate);
  modalElement.appendChild(name);
  modalElement.appendChild(date);

  if (window.innerWidth <= 500) {
    animation.fromTo(name, { opacity: 0, duration: 1, y: modelVH / 5 - name.clientHeight / 5 - 40, x: modelVW / 2 - name.clientWidth / 2 }, { opacity: 1 }, time);
    animation.fromTo(date, { opacity: 0, duration: 1, y: modelVH / 5 - date.clientHeight / 5 + 40, x: modelVW / 2 - date.clientWidth / 2 }, { opacity: 1 }, time);
  } else {
    animation.fromTo(name, { opacity: 0, duration: 1, y: modelVH / 5 - name.clientHeight / 5 - 40, x: modelVW / 2 - name.clientWidth / 2 }, { opacity: 1 }, time);
    animation.fromTo(date, { opacity: 0, duration: 1, y: modelVH / 5 - date.clientHeight / 5 + 40, x: modelVW / 2 - date.clientWidth / 2 }, { opacity: 1 }, time);
  }
  animation.to(name, { opacity: 0 }, endTime);
  animation.to(date, { opacity: 0 }, endTime);

  caracterName.childNodes.forEach((item, index) => {
    let value = String(index + 15).split('');
    value.forEach(Number);
    const delay = index < 10 ? 0 + '.' + index : value[0] + '.' + value[1];
    animation.fromTo(item, { scale: 0.5, duration: 1, opacity: 0 }, { scale: 1, opacity: 1, delay: delay }, time + 1);
  });
  caracterdate.childNodes.forEach((item, index) => {
    let value = String(index + 8).split('');
    value.forEach(Number);
    const delay = index < 10 ? 0 + '.' + index : value[0] + '.' + value[1];
    animation.fromTo(item, { scale: 0.5, duration: 1, opacity: 0 }, { scale: 1, opacity: 1, delay: delay }, time + 1);
  });
  } catch(erro) {

  }
}

function monthUserCalc(container, initialTime) {
  try {
    const animaMonth = document.createElement('div');
  animaMonth.style.position = 'relative';
  animaMonth.classList.add('row-animation');
  container.appendChild(animaMonth);

  const nameMonth = cardTextElement(animaMonth, monthObject.name);
  const arrow = iconElement(animaMonth, 'fa-arrow-right');
  const calcCard = cardCalc(animaMonth, monthValue);
  const arrowTwo = iconElement(animaMonth, 'fa-arrow-right');
  const valueEnd = cardTextElement(animaMonth, monthNumberDestiny);

  animation.fromTo(nameMonth, { opacity: 0 }, { opacity: 1, duration: 0.5 }, initialTime + 1);
  animation.fromTo(arrow, { opacity: 0 }, { opacity: 1, duration: 0.5 }, initialTime + 1.5);
  animation.fromTo(calcCard, { opacity: 0 }, { opacity: 1, duration: 0.5 }, initialTime + 2);
  for (let i = 0; i < calcCard.childNodes.length; i++) {
    animation.fromTo(calcCard.childNodes[i], { opacity: 0 }, { opacity: 1, duration: 0.5 }, initialTime + 2.5 + i / 2);
  }
  animation.fromTo(arrowTwo, { opacity: 0 }, { opacity: 1, duration: 0.5 }, initialTime + 6);
  animation.fromTo(valueEnd, { opacity: 0 }, { opacity: 1, duration: 0.5 }, initialTime + 6.6);
  } catch(error) {

  }
}

function dayUserCalc(container, initialTime) {
  try {
    const animaDay = document.createElement('div');
  animaDay.classList.add('row-animation');
  animaDay.style.position = 'relative';
  container.appendChild(animaDay);

  const dayValueCard = cardTextElement(animaDay, dayValue);
  const arrow = iconElement(animaDay, 'fa-arrow-right');
  const calcCard = cardCalc(animaDay, dayValue);
  const arrowTwo = iconElement(animaDay, 'fa-arrow-right');
  const valueEnd = cardTextElement(animaDay, dayNumberDestiny);

  //animation.fromTo(animaDay, {x: modelVW / 2, y: modelVH}, {x: positionX, y: positionY}, initialTime + 1)
  animation.fromTo(dayValueCard, { opacity: 0 }, { opacity: 1, duration: 0.5 }, initialTime + 1);
  animation.fromTo(arrow, { opacity: 0 }, { opacity: 1, duration: 0.5 }, initialTime + 1.5);
  animation.fromTo(calcCard, { opacity: 0 }, { opacity: 1, duration: 0.5 }, initialTime + 2);
  for (let i = 0; i < calcCard.childNodes.length; i++) {
    animation.fromTo(calcCard.childNodes[i], { opacity: 0 }, { opacity: 1, duration: 0.5 }, initialTime + 2.5 + i / 2);
  }
  animation.fromTo(arrowTwo, { opacity: 0 }, { opacity: 1, duration: 0.5 }, initialTime + 6);
  animation.fromTo(valueEnd, { opacity: 0 }, { opacity: 1, duration: 0.5 }, initialTime + 6.6);
  } catch(error) {

  }
}

function yearUserCalc(container, initialTime) {
  try{
    const animaYear = document.createElement('div');
  animaYear.classList.add('row-animation');
  animaYear.style.position = 'relative';

  container.appendChild(animaYear);

  const yearValueCard = cardTextElement(animaYear, yearValue);
  const arrow = iconElement(animaYear, 'fa-arrow-right');
  const calcCard = cardCalc(animaYear, yearValue);
  const arrowTwo = iconElement(animaYear, 'fa-arrow-right');
  const valueEnd = cardTextElement(animaYear, yearNumberDestiny);

  animation.fromTo(yearValueCard, { opacity: 0 }, { opacity: 1, duration: 0.5 }, initialTime + 1);
  animation.fromTo(arrow, { opacity: 0 }, { opacity: 1, duration: 0.5 }, initialTime + 1.5);
  animation.fromTo(calcCard, { opacity: 0 }, { opacity: 1, duration: 0.5 }, initialTime + 2);
  for (let i = 0; i < calcCard.childNodes.length; i++) {
    animation.fromTo(calcCard.childNodes[i], { opacity: 0 }, { opacity: 1, duration: 0.5 }, initialTime + 2.5 + i / 2);
  }
  animation.fromTo(arrowTwo, { opacity: 0 }, { opacity: 1, duration: 0.5 }, initialTime + 6);
  animation.fromTo(valueEnd, { opacity: 0 }, { opacity: 1, duration: 0.5 }, initialTime + 6.6);
  } catch(error) {

  }
}

function animationUserCalc(container, initialTime) {
  const animaUserCalc = document.createElement('div');
  animaUserCalc.style.position = 'relative';
  animaUserCalc.classList.add('row-animation');
  container.appendChild(animaUserCalc);

  const calc = monthNumberDestiny + dayNumberDestiny + yearNumberDestiny;
  let cardCalcTwo;

  const calcCard = document.createElement('div');
  calcCard.classList.add('card-animation');
  calcCard.innerHTML = `<span>${monthNumberDestiny}</span><span>+</span><span>${dayNumberDestiny}</span><span>+</span><span>${yearNumberDestiny}</span>`;

  const equals = iconElement(animaUserCalc, 'fa-equals');
  animaUserCalc.appendChild(calcCard);

  if (!calc <= 9 || calc !== 11 || calc !== 22) {
    cardCalcTwo = cardCalc(animaUserCalc, calc);
    cardCalcTwo.style.fontSize = '1rem';
    cardCalcTwo.style.marginLeft = '10px';
    cardCalcTwo.style.display = 'none';
  }

  const valueEnd = cardTextElement(animaUserCalc, numberDestiny);

  equals.style.fontSize = '1.125rem';
  calcCard.style.fontSize = '1rem';
  valueEnd.style.fontSize = '2rem';
  valueEnd.style.marginLeft = '20px';
  calcCard.style.display = 'none';
  valueEnd.style.display = 'none';

  if (window.innerWidth > 768) {
    equals.style.fontSize = '2.5rem';
    calcCard.style.fontSize = '2.5rem';
    calcCard.style.marginLeft = '20px';
    valueEnd.style.fontSize = '3rem';
    valueEnd.style.marginLeft = '40px';
    if (cardCalcTwo) {
      cardCalcTwo.style.fontSize = '2.5rem';
      cardCalcTwo.style.marginLeft = '30px';
    }
  }

  animation.fromTo(equals, { opacity: 0 }, { opacity: 1 }, initialTime + 7);
  animation.fromTo(calcCard, { opacity: 0 }, { opacity: 1, display: 'block', duration: 0.5 }, initialTime + 7.5);
  for (let i = 0; i < calcCard.childNodes.length; i++) {
    animation.fromTo(calcCard.childNodes[i], { opacity: 0 }, { opacity: 1, duration: 0.3 }, initialTime + 8 + i / 3);
  }
  for (let i = 0; i < calcCard.childNodes.length; i++) {
    animation.to(calcCard.childNodes[i], { opacity: 0, duration: 0.3 }, initialTime + 10 + i / 3);
  }
  animation.to(calcCard, { opacity: 0, display: 'none', duration: 0.5 }, initialTime + 12);
  if (cardCalcTwo) {
    animation.fromTo(cardCalcTwo, { opacity: 0 }, { opacity: 1, display: 'block', duration: 0.5 }, initialTime + 12.5);
    for (let i = 0; i < cardCalcTwo.childNodes.length; i++) {
      animation.fromTo(cardCalcTwo.childNodes[i], { opacity: 0 }, { opacity: 1, duration: 0.3 }, initialTime + 13 + i / 3);
    }
    animation.to(cardCalcTwo, { opacity: 0, display: 'none', duration: 0.5 }, initialTime + 15);
  }
  animation.fromTo(valueEnd, { opacity: 0 }, { opacity: 1, display: 'block', duration: 0.5 }, initialTime + 15.5);
}

function handlePlay() {
  if (buttonPlayAudio.classList.contains('play-on')) {
    playerVideo.pause();
    animation.pause();
    buttonPlayAudio.classList.add('play-off');
    buttonPlayAudio.classList.remove('play-on');
    stopModal.classList.remove('hide');
  } else {
    playerVideo.play();
    animation.play();
    buttonPlayAudio.classList.add('play-on');
    buttonPlayAudio.classList.remove('play-off');
    stopModal.classList.add('hide');
     if (!animaIsEnabled) {
      audioLoop.loop = true;
      audioLoop.volume = 0.1;
      audioLoop.play();
      playContainer.classList.add('play-on');
      playContainer.classList.remove('play-off');
      animaIsEnabled = true;
      playContainer.style.display = 'none';
    }
  }
}

function handleSoundMobile() {
  if (buttonVolumeAudio.classList.contains('sound-on')) {
    buttonVolumeAudio.classList.add('sound-off');
    buttonVolumeAudio.classList.remove('sound-on');
    audioLoop.volume = 0;
    audioVideoJs.volume = 0;
  } else {
    buttonVolumeAudio.classList.add('sound-on');
    buttonVolumeAudio.classList.remove('sound-off');
    audioLoop.volume = 0.1;
    audioVideoJs.volume = 1;
  }
}+

function handlePlay() {
  if (buttonPlay.classList.contains('vjs-playing')) {
    animation.pause();
    stopModal.classList.remove('hide'); 
  } else {
    animation.play();
    stopModal.classList.add('hide');
  }
}

function handleSound() {
  const isMuted = buttonSound.getAttribute('title')
  console.log(isMuted);
  if (isMuted === "Mute") {
    audioLoop.volume = 0;
  } else {
    audioLoop.volume = 0.1;
  }
}

function handleStartVidio(dataLayerKey) {
  if ($('#audio-modal .video-js').length) {
    buttonPlay = document.querySelector('#audio-modal .video-js .vjs-play-control');
    buttonSound = document.querySelector('#audio-modal .video-js .vjs-volume-panel button'); 

    audioVideoJs = document.querySelector('#audio-modal .video-js audio.vjs-tech'); 
    buttonPlayAudio.classList.add('play-off');
    buttonPlayAudio.classList.remove('play-on');
    buttonVolumeAudio.classList.add('sound-on');
    buttonVolumeAudio.classList.remove('sound-off');
    

    switch (dataLayerKey) {
      case "p1":
        dataLayer.push({event: `mdv${currentLang}-p1-loaded`});
      break;
      
      case "p2":
        dataLayer.push({event: `mdv${currentLang}-p2-loaded`});
      break;
      default:
        dataLayer.push({event: `mdv${currentLang}-p3-loaded`});
        break;
    }

/*     buttonPlay.onclick = (e) => {
      e.preventDefault();
      handlePlay();
    };   */
    buttonSound.onclick = (e) => {
      e.preventDefault();
      handleSound();
    };

    buttonPlayAudio.onclick = (e) => {
      e.preventDefault();
      handlePlay();
    }
 /*    buttonVolumeAudio.onclick = (e) => {
      e.preventDefault();
      handleSoundMobile();
    } */
    setTimeout(() => {
      loading.classList.add('hide');
      
    }, 1500);

    sectionAnimation.classList.remove('trackIsActive');
    sectionContainer.classList.remove('trackModal');
    setTimeout(() => {
      if (animaIsEnabled) {
        audioLoop.loop = true;
        audioLoop.volume = 0.1;
        audioLoop.play();
        
        handlePlay()
      }
    }, 2500);
  }
}

function getCivilState() {
  const buttons = document.querySelectorAll('.civil-state-block .civil-state-btn');
  buttons.forEach((button) => {
    button.onclick = () => {
      if (button.classList.contains('active')) {
        button.classList.remove('active');
        stateValue = undefined;
        return;
      }
      button.classList.add('active');
      const value = button.getAttribute('data-value');
      stateValue = value;
      nextFormSoul();
      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].getAttribute('data-value') !== stateValue) {
          buttons[i].classList.remove('active');
        }
      }
    };
  });
}

function nextFormSoul() {
  const emailBlock = document.querySelector('.form-group.email-field-block');
  const civilState = document.querySelector('.form-group.civil-state-block');
  const backButton = document.querySelector('.soulForm .back-form');
  emailBlock.classList.remove('hide');
  civilState.classList.add('hide');
  backButton.classList.remove('hide');
  backButton.onclick = () => {
    backButton.classList.add('hide');
    emailBlock.classList.add('hide');
    civilState.classList.remove('hide');
  };
}

function getSexValue() {
  const buttons = document.querySelectorAll('.sex-block .sex-button');
  buttons.forEach((button) => {
    button.onclick = () => {
      if (button.classList.contains('active')) {
        button.classList.remove('active');
        genderValue = undefined;
        return;
      }
      button.classList.add('active');
      const value = button.getAttribute('data-value');
      genderValue = value;
      nextFormExpression();
      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].getAttribute('data-value') !== genderValue) {
          buttons[i].classList.remove('active');
        }
      }
    };
  });
}

function nextFormExpression() {
  const sexContainer = document.querySelector('.form-group.sex-block');
  const backButton = document.querySelector('.expressionForm .back-form');
  allNameContainer.classList.remove('hide');
  sexContainer.classList.add('hide');
  backButton.classList.remove('hide');
  backButton.onclick = () => {
    backButton.classList.add('hide');
    allNameContainer.classList.add('hide');
    sexContainer.classList.remove('hide');
  };
}

inputFullName.addEventListener('input', async (e) => {  
    try {
        e.preventDefault();
        let value = e.target.value;

        // Remover espaços extras no início e no fim

        // Substituir aspas curvas por aspas simples ASCII
        value = value.replace(/[""]['']/g, "'");
  
        if (/\d/.test(value)) {
            alertText("O nome não pode conter números!");
        }

        // Remover qualquer número (incluindo datas como 17.11.1961, 30/03/1974, etc.)
        value = value.replace(/\b\d{1,4}([./-]\d{1,2}){0,2}\b/g, '');

        //Removendo numero 
        value = value.replace(/\d+/g, "");

        // Substituir múltiplos espaços por apenas um
        value = value.replace(/\s{2,}/g, ' ');


        // Atualizar o valor no campo input
        e.target.value = value;

        // Expressões regulares para cada idioma
        const valid = currentLang === "ja" 
            ? /^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー\s]+$/u 
            : currentLang === "pt" 
            ?  /^ ?[A-Za-zÀ-ÖØ-öø-ÿ'’.,-]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ'’.,-]+)+ ?$/u
            :/^ ?[\p{L}.'’,-]+(?:\s+[\p{L}.'’,-]+)* ?$/u;

        if (value.length === 0) {
            console.log("Nome vazio");
            
            fullNameIsValid = false;
            allNameValue = '';
        }
        if (!valid.test(value)) {
            fullNameIsValid = false;
            console.log("Nome completo erro: " + value);
            
        } else {
            console.log("Passa");
            value = value.trim();
            allNameValue = value;
            fullNameIsValid = true;
        }
    } catch (error) {
      console.log(error);
    }
});


  inputEmail.addEventListener('change', (e) => {
    try {
      e.preventDefault();
      userEmail = e.target.value;
    } catch (error) {

    }
  
});

const numberAlph = [
  { 1: ['A', 'J', 'S'] },
  { 2: ['B', 'K', 'T'] },
  { 3: ['C', 'L', 'U'] },
  { 4: ['D', 'M', 'V'] },
  { 5: ['E', 'N', 'W'] },
  { 6: ['F', 'O', 'X'] },
  { 7: ['G', 'P', 'Y'] },
  { 8: ['H', 'Q', 'Z'] },
  { 9: ['I', 'R'] },
];
const vowel = ['A', 'E', 'I', 'O', 'U'];
const consonant = ['J', 'S', 'B', 'K', 'T', 'C', 'L', 'D', 'M', 'V', 'N', 'W', 'X', 'G', 'P', 'Y', 'H', 'Q', 'Z', 'R'];
const valideNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22];

async function getNumberPersonality(name) {
  try {
    const url = "https://app.astranumerica.com.br/api/mapadavida/personality-number"
    const data = {
      name: name,
      is_vowel: false,
      is_consonant: true,
      lang: currentLang === "ja" ? "jp": currentLang 
    }
    const number = await getNumberCalc(url, data, "getNumberByName")
    return number
  } catch (error) {

    const formatName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
    const removeVowel = formatName.replace(/A|E|I|O|U/g, '');
    const nameArray = removeVowel.split('');
    let number = 0;
    nameArray.forEach((char) => {
      numberAlph.forEach((item, index) => {
        if (item[index + 1].find((arr) => arr.toUpperCase() === char)) {
          number += index + 1;
        }
      });
    });
    if (number.length === 1) {
      return number;
    }
    let numberPersonal = 0;
    const numberArray = String(number).split('');
    const formatNumber = numberArray.map(Number);
    formatNumber.forEach((number) => {
      numberPersonal += number;
    });
    return numberPersonal;
  }
}
function getNumberBirth(value) {
  let numberBirth = 0;
  const numberArray = String(value).split('');
  const numbers = numberArray.map(Number);
  numbers.forEach((number) => {
    numberBirth += number;
  });
  return numberBirth;
}
async function getNumberByName(type ,name, isVoewl = false) {

  const nameArray = name.split('');

  let sum = 0;
  let NE = [];
  nameArray.forEach((charName) => {
    numberAlph.forEach((item, index) => {
      let charNameNormalize = charName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase();

      if (item[index + 1].find((arr) => arr.toUpperCase() === charNameNormalize)) {
        if (isVoewl) {
          if (vowel.includes(charNameNormalize)) {
            NE.push(index + 1);
            sum += index + 1;
          } else {
            NE.push(' ');
          }
        } else {
          NE.push(index + 1);
          sum += index + 1;
        }
      }
    });
    if (charName === ' ') NE.push(' ');
  });

  //let number = validateNumber(sum);

  if (type === "expression") {
    const url = 'https://app.astranumerica.com.br/api/mapadavida/expression-number';
    const data = {
      name: name,
      lang: currentLang === "ja" ? "jp": currentLang 
    }
    const number = await getNumberCalc(url, data, "getNumberByName")

    const urlGetList = 'https://app.astranumerica.com.br/api/mapadavida/expression-number-list';
    const dataList = {
      name: name,
      lang: currentLang === "ja" ? "jp": currentLang 
    }
    const result = await getNumberCalc(urlGetList, dataList)
    return { nameArray: result.words, NE: result.numbers, numberValide: number };
  }

    const url = 'https://app.astranumerica.com.br/api/mapadavida/soul-number';
    const data = {
      name: name,
      is_vowel: isVoewl,
      lang: currentLang === "ja" ? "jp": currentLang 
    }
    const number = await getNumberCalc(url, data, "getNumberByName")

    const urlGetList = 'https://app.astranumerica.com.br/api/mapadavida/soul-number-list';
    const dataList = {
      name: name,
      lang: currentLang === "ja" ? "jp": currentLang 
    }
    const result = await getNumberCalc(urlGetList, dataList)
    
    return { nameArray: result.words, NE: result.numbers, numberValide: number };
}
function validateNumber(sum) {
  let arrayNumb = Array.from(String(sum), Number);
  const arraySum = arrayNumb.reduce((accumulator, currentValue) => accumulator + currentValue);
  let number = valideNumber.includes(sum) ? sum : validateNumber(arraySum);
  return number;
}
async function savelog(error, name) {
    console.log("Chama save log");
    // Simulação: Salva os dados localmente
    const data = { error, name, timestamp: new Date().toISOString() };
    localStorage.setItem('leadData', JSON.stringify(data));
    console.log("Dados salvos localmente:", data);
}

buttonExpression.addEventListener('click', async (e) => {
    let number ;
    console.log("Botão clicado");
    
    console.log(!fullNameIsValid && allNameValue.length === 0);
    
  try {
    if ((fullNameIsValid && allNameValue.length > 1) && genderValue) {
        console.log("CACHE : ", 1);
        
      loading.classList.remove('hide');
  
      currentAnimation = 'expression';
  
      const value = await getNumberByName("expression",allNameValue);
      expreValue = value.numberValide;
      expreNameArray = value.nameArray;
      expreNumersArray = value.NE;
  
      const numberResult = await getNumberByName("soul",allNameValue, true);
      numberSoul = numberResult.numberValide;
      soulNameArray = numberResult.nameArray;
      soulNumArray = numberResult.NE;
  
      number = expreValue === 11 || expreValue === 22 ? expreValue : 0 + '' + expreValue;
      const audioTrack = `${langContent.pathLegends}p2/${number}.vtt`;
      const audioPath = `${langContent.pathAudios}p2/${number}.mp3`;
      const path = `${langContent.pathAnimations}p2/${number}.json`;
      audioModal.classList.remove('modalAudioActive');
      boxAnimation.classList.remove('hide');
      let data = await getJsonData(path);
      fbq('track', expreValue);
      if (data) {
        sectionExpression.classList.add('hide');
        sectionAnimation.classList.remove('hide');
        formsSectionsArray[1].isActive = true
        GeneratorAnimation(data);
        //expressAnimation()
        handleVideo(audioPath, audioTrack, audio);
        handleStartVidio('p2');
      }
      getCivilState();
    }
    else if (!fullNameIsValid && allNameValue.length === 0) {
        alertText(langContent.translations.alerts[0]);
    } 
    else if (!fullNameIsValid && allNameValue.length === 0) {
      alertText(langContent.translations.alerts[0]);
    } 
    else if (!fullNameIsValid) {
      alertText(langContent.translations.alerts[1]);
    } 
    } catch(error) {
      console.log("Erro in expression: ", error);
      //await savelog("Erro in expression, value: 00", allNameValue)
    }
  
});

function expressAnimation(time, endTime) {
  try {
    const allNameExpression = miniCards(expreNameArray, expreNumersArray);
  modalElement.appendChild(allNameExpression);
  if (window.innerWidth <= 500) {
    animation.fromTo(
      allNameExpression,
      { opacity: 0, duration: 1, y: modelVH / 3 - allNameExpression.clientHeight / 3, x: modelVW / 2 - allNameExpression.clientWidth / 2 },
      { opacity: 1 },
      time
    );
  } else {
    animation.fromTo(
      allNameExpression,
      { opacity: 0, duration: 1, y: modelVH / 2 - allNameExpression.clientHeight - 10, x: modelVW / 2 - allNameExpression.clientWidth / 2 },
      { opacity: 1 },
      time
    );
  }

  allNameExpression.childNodes.forEach((item, index) => {
    let value = String(index).split('');
    value.forEach(Number);
    const delay = index < 10 ? 0 + '.' + index : value[0] + '.' + value[1];
    animation.fromTo(item, { scale: 0.5, duration: 1, opacity: 0 }, { scale: 1, opacity: 1, delay: delay }, time + 1);
    animation.to(item, { scale: 0, opacity: 0, delay: delay }, endTime);
  });
  } catch(error) {

  }
  
}

function firstNameAnimation(time, endTime) {
  try {
    const firstNameWrapper = document.createElement('div');
    const firstNameContainer = document.createElement('div');
    firstNameWrapper.classList.add('frame');
    firstNameWrapper.style.position = 'absolute';
    firstNameContainer.style.display = 'flex';
    firstNameContainer.style.gap = '10px';
    firstNameContainer.style.width = '100%';
    firstNameContainer.style.flexWrap = 'wrap';
    firstNameContainer.style.justifyContent = 'center';
    const nameCaracter = userValue.split('');
    nameCaracter.forEach((item) => {
      const span = document.createElement('span');
      span.innerHTML = item;
      span.classList.add('card-animation');
      span.classList.add('card-animation-name');
      firstNameContainer.appendChild(span);
    });
    firstNameWrapper.appendChild(firstNameContainer);
    modalElement.appendChild(firstNameWrapper);

    if (window.innerWidth <= 500) {
      firstNameContainer.style.gap = '5px';
      animation.fromTo(
        firstNameWrapper,
        { opacity: 0, duration: 1, y: modelVH / 3 - firstNameWrapper.clientHeight / 3, x: modelVW / 2 - firstNameWrapper.clientWidth / 2 },
        { opacity: 1 },
        time
      );
    } else {
      animation.fromTo(
        firstNameWrapper,
        { opacity: 0, duration: 1, y: modelVH / 2 - firstNameWrapper.clientHeight - 10, x: modelVW / 2 - firstNameWrapper.clientWidth / 2 },
        { opacity: 1 },
        time
      );
    }

    firstNameContainer.childNodes.forEach((item, index) => {
      let value = String(index).split('');
      value.forEach(Number);
      const delay = index * 0.25;
      animation.fromTo(item, { scale: 0.5, duration: 1, opacity: 0 }, { scale: 1, opacity: 1, delay: delay }, time + 1);
      animation.to(item, { scale: 0, opacity: 0, delay: delay }, endTime);
    });
  } catch (error) {
    
  }
  
}

buttomNumSoul.addEventListener('click', async (e) => {
  try {
    e.preventDefault();
  
    if (stateValue && userEmail) {
      loading.classList.remove('hide');

      boxAnimation.classList.remove('hide');
      audioModal.classList.remove('modalAudioActive');
      testEmail = /@/;
      if (testEmail.test(userEmail)) {
        currentAnimation = 'soul';
        ctaEmailField.value = userEmail;
        let state;
        const sexoI = genderValue === 'Masculino' ? 'h' : 'm';
        const sexo = genderValue === 'Masculino' ? 'male' : 'female';
        switch (stateValue) {
          case 'Casado(a)':
            state = 'c';
            break;
          case 'Noivo(a)':
            state = 'r';
            break;
          case 'Namorando(a)':
            state = 'r';
            break;
          default:
            state = 's';
            break;
        }

        /* const numberResult = getNumberByName(allNameValue, true)
          numberSoul = numberResult.numberValide
          soulNameArray = numberResult.nameArray;
          soulNumArray = numberResult.NE */

        let number = numberSoul === 11 || numberSoul === 22 ? numberSoul : 0 + '' + numberSoul;
        const userAge = handleUserAge(yearValue);
        const audioTrack = `${langContent.pathLegends}p3/${sexo}/${sexoI}-${userAge}-${state}.vtt`;
        const audioPath = `${langContent.pathAudios}p3/${sexo}/${sexoI}-${userAge}-${state}.mp3`;
        const path = `${langContent.pathAnimations}p3/${sexo}/${sexoI}-${userAge}-${state}.json`;
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: allNameValue,
            firstname: userValue,
            dob: dateEua,
            destination_number: numberDestiny,
            expression_number: expreValue,
            soul_number: numberSoul,
            marital_status: stateValue,
            email: userEmail,
            sign: signValue,
          }),
        };
        let data = await getJsonData(path);
        fbq('track', 'Lead');
        if (data) {
          sectionSoul.classList.add('hide');
          sectionAnimation.classList.remove('hide');
          GeneratorAnimation(data);
          formsSectionsArray[2].isActive = true

          //soulAnimation()
          handleVideo(audioPath, audioTrack, audio);
          handleStartVidio('p3');
          activeLead(`mdv_${currentLang}_teste_cadastrou`);
          await fetch('https://app.astranumerica.com.br/api/customer/save', options);
        }
        handleModalPitch();
      } else {
        alertText(langContent.translations.alerts[9]);
      }
    } else {
      alertText(langContent.translations.alerts[10]);
    }
  } catch(error) {

  }
  
});

/* function soulAnimation() {
    const miniCardsElement = miniCards(soulNameArray, soulNumArray, true)
    modalElement.appendChild(miniCardsElement)
    if(window.innerWidth <= 500){
      animation.fromTo(miniCardsElement, {opacity: 0, duration: 1, y: modelVH / 3 - miniCardsElement.clientHeight /3, x: modelVW / 2 - miniCardsElement.clientWidth / 2}, {opacity: 1}, 66)
    }
    else{
      animation.fromTo(miniCardsElement, {opacity: 0, duration: 1, y: modelVH / 2 - miniCardsElement.clientHeight / 2, x: modelVW / 2 - miniCardsElement.clientWidth / 2}, {opacity: 1}, 66)
    }

    miniCardsElement.childNodes.forEach((item, index) =>{
        let value = String(index).split('')
        value.forEach(Number)
        const delay = index < 10 ? 0+"."+index : value[0]+"."+value[1]
        if (item.classList.contains('consonantCard')) {
          animation.fromTo(item, {scale: 0.5, duration: 1, opacity: 0}, {scale: 1, opacity: 0.5, delay: delay}, 67)
          animation.to(item, 1,{scale: 0.3, opacity: 0}, 75)
          animation.to(item, 1, {CSS: {width: 0, fontSize: 0}}, 78)
        }else{
          animation.fromTo(item, {scale: 0.5, duration: 1, opacity: 0}, {scale: 1, opacity: 1, delay: delay}, 67)
          animation.to(item, {scale: 0, opacity: 0, delay: delay}, 86)
        }
    })
}
 */
function handleUserAge(currentAge) {
  const date = new Date();
  const currentYear = date.getFullYear();
  const age = currentYear - currentAge;
  if (age < 20) {
    return '1-19';
  } else if (age >= 20 && age < 30) {
    return '20';
  } else if (age >= 30 && age < 40) {
    return '30';
  } else if (age >= 40 && age < 50) {
    return '40';
  } else if (age >= 50 && age < 60) {
    return '50';
  } else {
    return '60';
  }
}

function handleModalPitch() {
  const pitchModal = document.querySelector('.section-modal-pitch');
  const buttonPitch = document.querySelector('.section-modal-pitch .modal-pitch-btn');
  
  buttonPitch.onclick = async () => {
    try {
      loading.classList.remove('hide');

      if (webSite === "num-destino") {
        handleCtaRedirect()
        return;
      }
      const pathVideo = `${langContent.pathAudios}p4/p4.mp3`;
      const pathJson = `${langContent.pathAnimations}p4/p4.json`;
      const pathLegend = `${langContent.pathLegends}p4/p4.vtt`;
      
      const data = await getJsonData(pathJson);
      if (data) {
        pitchModal.classList.add('hide');
        sectionAnimation.classList.remove('hide');
        GeneratorAnimation(data);
        handleVideo(pathVideo, pathLegend, audio);
        handleStartVidio();
      }
      handleCtaModalFinish();
      activeOffer();
    } catch(error) {
   
    }
  };
}

function handleCtaRedirect(){
  dataLayer.push({event: `mdv${currentLang}-form4-ok`});
  // Redireciona diretamente para a URL do CTA
  window.location.href = "SUA_URL_DE_CTA" + "?" + urlParamsCheckout;
}

function replaceContent(content, isTrack) {
  const dateArray = dateValue.split('/');
  yearArray = dateArray[2].split('');
  var replaces = [
    { '[nome]': isTrack ? `<b>${userValue}</b>` : userValue },
    { '[nome-completo]': isTrack ? `<b>${allNameValue}</b>` : allNameValue },
    { '[data-nascimento]': isTrack ? `<b>${dateValue}</b>` : dateValue },
    { '[day]': isTrack ? `<b>${dayValue}</b>` : dayValue },
    { '[month]': isTrack ? `<b>${monthValue}</b>` : monthValue },
    { '[year1]': isTrack ? `<b>${yearArray[0]}${yearArray[1]}</b>` : `${yearArray[0]}${yearArray[1]}` },
    { '[year2]': isTrack ? `<b>${yearArray[2]}${yearArray[3]}</b>` : `${yearArray[2]}${yearArray[3]}` },
    { '[numero-destino]': isTrack ? `<b>${numberDestiny}</b>` : numberDestiny },
    { '[numero-expressão]': isTrack ? `<b>${expreValue}</b>` : expreValue },
    { '[numero-alma]': isTrack ? `<b>${numberSoul}</b>` : numberSoul },
    { '[numero-nascimento]': isTrack ? `<b>${numberBirth}</b>` : numberBirth },
    { '[numero-personalidade]': isTrack ? `<b>${numberPersonality}</b>` : numberPersonality },
    { '[email]': isTrack ? `<b>${userEmail}</b>` : userEmail },
  ];

  let _content = content;
  replaces.forEach((item, index) => {
    let key = Object.keys(replaces[index])[0];
    if (typeof _content === 'string' || _content instanceof String) {
      _content = _content.replace(key, item[key]);
    }
  });
  return _content;
}

function capitalizeWords(str) {
  return str
    .toLowerCase() 
    .split(' ') 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(' '); 
}

/* function submitData() {
  const formatFullName = capitalizeWords(allNameValue)
  const fullNameArray = formatFullName.split(" ")
  const firstName = fullNameArray[0]
  const lastname = fullNameArray.slice(1).join(' ')
  console.log('https://video.astranumerica.com.br/activeCampaign/index.php?' +
  `tag=67162&firstname=${firstName}&lastname=${encodeURIComponent(lastname)}&field[5]=${genderValue}&field[88]=${dateEua}&field[132]=${dayValue}&field[131]=${monthValue}&field[130]=${yearValue}&field[83]=${numberDestiny}&field[84]=${expreValue}&field[85]=${numberSoul}&email=${userEmail}&field[87]=${signValue}&field[86]=${stateValue}`+ activeUrl);
  fetch(
    'https://video.astranumerica.com.br/activeCampaign/index.php?' +
      `tag=67162&firstname=${firstName}&lastname=${encodeURIComponent(lastname)}&field[5]=${genderValue}&field[88]=${dateEua}&field[132]=${dayValue}&field[131]=${monthValue}&field[130]=${yearValue}&field[83]=${numberDestiny}&field[84]=${expreValue}&field[85]=${numberSoul}&email=${userEmail}&field[87]=${signValue}&field[86]=${stateValue}`+ activeUrl,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  );
}
 */

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}
function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(p + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}


buttonWarning.onclick = (e) => {
  e.preventDefault();
  handlePlay();
};
stopModalButton.onclick = (e) => {
  e.preventDefault();
  handlePlay();
};

function addNameInWarning() {
  const span = document.querySelector('.modal-warning h3 span');
  span.innerHTML = userValue;
}

function addNameInModalStop() {
  const h3 = document.querySelector('.stop-user-name h3');
  h3.innerHTML = userValue;
}

function getCookie(name) {
  var cookies = document.cookie;
  var prefix = name + '=';
  var begin = cookies.indexOf('; ' + prefix);

  if (begin == -1) {
    begin = cookies.indexOf(prefix);

    if (begin != 0) {
      return null;
    }
  } else {
    begin += 2;
  }

  var end = cookies.indexOf(';', begin);

  if (end == -1) {
    end = cookies.length;
  }

  return unescape(cookies.substring(begin + prefix.length, end));
}

function deleteCookie(name) {
  if (getCookie(name)) {
    document.cookie = name + '=' + '; expires=Thu, 01-Jan-70 00:00:01 GMT';
  }
}

ctaBtn.onclick = () => {
  if (langContent.lang == "pt") {
    ctaFinishModal.classList.remove('hide');
    handleCtaModalFinish()
    return
  }
  window.open(pathProduct+"?"+urlParamsCheckout, '_blank');
};
 ctaFinishClose.onclick = () => {
  ctaFinishModal.classList.add('hide');
};

function handleCtaModalFinish() {
  try {
    const errorFieldEmail = document.querySelector('.modal-finish-cta .email-field .error-field');
    const ctaTellField = document.querySelector('.modal-finish-cta .finish-field .TellFinish');
    const errorTellField = document.querySelector('.modal-finish-cta .tell-field .error-field');
    
    ctaEmailField.addEventListener('change', (event) => {
      try{
        ctaEmailField.value = event.target.value;
        const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        value = event.target.value;
        if (!value.length > 0) {
          ctaEmailField.classList.add('error');
          errorFieldEmail.innerHTML = '*Email obrigatório!';
          userEmail = undefined;
          return;
        }
        if (!isEmailValid.test(value)) {
          ctaEmailField.classList.add('error');
          errorFieldEmail.innerHTML = '*Email inválido!';
          userEmail = undefined;
          return;
        }
        ctaEmailField.classList.remove('error');
        errorFieldEmail.innerHTML = '';
        userEmail = value;
      }  catch(error) {
   
      }
  
  });
  ctaTellField.addEventListener('change', function (e) {
    try{
      let input = e.target.value.replace(/\D/g, ''); 
      let formattedInput = '';

      if (input.length > 0) {
          formattedInput += '(' + input.substring(0, 2); // Adiciona o código de área
      }
      if (input.length >= 3) {
          formattedInput += ') ' + input.substring(2, 7); // Adiciona a parte inicial do número
      }
      if (input.length >= 7) {
          formattedInput += '-' + input.substring(7, 11); // Adiciona a parte final do número
      }
      e.target.value = formattedInput;
      if (e.target.value.length === 15) {
        validPhone = validPhoneTest(e.target.value);

        if (!validPhone) {
          errorTellField.innerHTML = 'Número inválido';
          ctaTellField.classList.add('error');
          phoneValue = undefined;
          return;
        }
        phoneValue = validPhone;
        ctaTellField.classList.remove('error');
        errorTellField.innerHTML = '';
      }
      if (e.target.value.length  !== 15) {
        ctaTellField.classList.add('error');
        errorTellField.innerHTML = 'Número inválido';
        phoneValue = undefined;
      }
    } catch(error) {
   
    }
    
  });
  ctaFinishBtn.onclick = () => {
    try{
      handleSubmitCtaFinish();
    } catch(error){
    }
  };
  } catch(error) {
  }
}

function handleSubmitCtaFinish() {
  if (!userEmail || !phoneValue) {
    alertText(langContent.translations.alerts[1]);
    return;
  }
  activeInitiate();
  window.open(pathProduct+"?"+urlParamsCheckout, '_blank');
}

function validPhoneTest(phone) {
  var regex = new RegExp('^\\([0-9]{2}\\) (9[0-9]{4}-[0-9]{4}|[0-9]{5}-[0-9]{4}|[0-9]{4}-[0-9]{4})$');
  if (regex.test(phone)) {
    return phone;
  }
  return false;
}   

const tagLang = {
  'jp': 'y',
  'en': '2',
  'ru': 'p',
  'it': 'Y',
  'de': '8',
  'fr': '7',
  'es': "I",
  'pt': 'f'
}
const funnelTypes = new Map();
funnelTypes.set(
  "numerologia",
  {
      value: 'p',
      listTags: {
          "mdv_pt_teste_cadastrou": "B",
          "mdv_ru_teste_cadastrou": "j",
          "mdv_it_teste_cadastrou": "z",
          "mdv_fr_teste_cadastrou": "t",
          "mdv_es_teste_cadastrou": "c",
          "mdv_de_teste_cadastrou": "L",
          "mdv_en_teste_cadastrou": "x"
      }
  }
)

async function activeLead(tagName) {
  const data = {
    email: userEmail,
    name: decodeURIComponent(allNameValue),
    customFieldValues: {
      GI: paramsUrl.utm_source,
      G7: paramsUrl.utm_medium,
      G8: paramsUrl.utm_campaign,
      GY: paramsUrl.utm_content,
      y: genderValue,
      GE: dateEua,
      Gw: dayValue,
      Gu: monthObject.name,
      Gn: yearValue,
      G2: numberDestiny,
      Gy: expreValue,
      Gh: numberSoul,
      GB: signValue,
      GC: stateValue,
    }
  }

  const payload = {
    campaign: {
        campaignId: currentLang ? tagLang[currentLang]:'f',
    },
    tags: [
        {tagId: funnelTypes.get('numerologia')?.value},
        {tagId: funnelTypes.get('numerologia')?.listTags[tagName]}
    ],
    ...data
}
  try {
    await fetch('https://astranumerica.net/gr/getresponse.php', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
      
  } catch (error) {
      console.log("Error in request for Active compaign: "+ error);
  }
}

async function activeOffer() {
  try {
    await fetch('https://video.astranumerica.com.br/activeCampaign/index.php?' + `email=${userEmail}&tag=${langContent.offer}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(() => {
      console.log("Active lead sucess ");
    })
  } catch (error) {

  }
}

async function activeInitiate() {
  try {
    await fetch('https://video.astranumerica.com.br/activeCampaign/index.php?' + `tag=67161&email=${userEmail}&phone=${encodeURIComponent(phoneValue)}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(() => {
      console.log("Active lead sucess ");
    })
  } catch (error) {

  }
}

function handleCta() {
  const section = this._targets[0];
  sectionAnimation.classList.add('hide');
  section.classList.remove('hide');
  modalElement.innerHTML = '';
  animation.kill();
}

function formIsTrue() {
  const section = this._targets[0];
  sectionAnimation.classList.add('hide');
  section.classList.remove('hide');
  modalElement.innerHTML = '';
  animation.kill();
  if (formsSectionsArray[0].isActive) {
    formsSectionsArray[0].isActive = false
    dataLayer.push({event: `mdv${currentLang}-form2-loaded`});
  }
  if (formsSectionsArray[1].isActive) {
    formsSectionsArray[1].isActive = false
    dataLayer.push({event: `mdv${currentLang}-form3-loaded`});
  }
  if (formsSectionsArray[2].isActive) {
    formsSectionsArray[2].isActive = false
    dataLayer.push({event: `mdv${currentLang}-form4-loaded`});
  }
}

//! ScreenLock
function isScreenLockSupported() {
  return 'wakeLock' in navigator;
}
async function getScreenLock() {
  if (isScreenLockSupported()) {
    let screenLock;   
    try {
      screenLock = await navigator.wakeLock.request('screen');
    } catch (err) {
      console.log(err.name, err.message);
    }
    return screenLock;
  }
}
function release() {
  if (typeof screenLock !== 'undefined' && screenLock != null) {
    screenLock.release().then(() => {
      console.log('Lock released 🎈');
      screenLock = null;
    });
  }
}
let screenLock;
async function init() {
  screenLock = await getScreenLock();
  screenLock.onrelease = () => {
    // console.log('Lock released 🎈');
  };
  screenLock.addEventListener('release', () => {
    // console.log('Lock released 🎈');
  });
}
