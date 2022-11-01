const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numberEl = document.getElementById('numbers')
const symbolEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
}

clipboardEl.addEventListener('click', async (e) => {
  const password = resultEl.innerText
  if (!password) {  return  }

  await navigator.clipboard.writeText(password)
  const copied = await navigator.clipboard.readText()
  console.log(clipboardEl.classList.value)
  if (clipboardEl.classList.value.includes('active')) { return }
  else {
    clipboardEl.classList.add('active')
    setTimeout(() => {
      clipboardEl.classList.remove('active')
    }, 2500)
  }
})

lengthEl.addEventListener('change', (e) => {
  if(e.target.value > 20) {
    e.target.value = 20
  } else if (e.target.value < 4) {
    e.target.value = 4
  }
})

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value
  const hasLower = lowercaseEl.checked
  const hasUpper = uppercaseEl.checked
  const hasNumber = numberEl.checked
  const hasSymbol = symbolEl.checked

  resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = ''
  const typesCount = lower + upper + number + symbol
  const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

  if(typesCount === 0) {
    return ''
  }

  for(let i = 0; i < length; i+=typesCount) {
    shuffleArray(typesArr)
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0]
      generatedPassword += randomFunc[funcName]()
    })
  }

  const finalPassword = generatedPassword.slice(0, length)

  return finalPassword
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.}'
  return symbols[Math.floor(Math.random() * symbols.length)]
}

