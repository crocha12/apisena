const puppeteer = require('puppeteer');

let found = async (jogo, sorteio) => {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage();
  await page.goto(`https://www.loterianacional.com.br/resultado-${jogo}`)

  await page.type('#main div form div.col-md-3 input.form-control', `${sorteio}`);
  await page.keyboard.press('Enter')
  await page.waitFor(1000);

  const result = await page.evaluate(() => {
    const numbers = [];
    document.querySelectorAll('.resultado-numeros div div div div')
            .forEach((number) => {
              console.log(number)
              return numbers.push(number.innerText)
            })
    
    return numbers;
    });

    await browser.close()
    return result;
  }
  
found('mega-sena','2285').then(value => {
  console.log(value)
})