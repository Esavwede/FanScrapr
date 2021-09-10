
// Dependencies 
const puppeteer = require('puppeteer')
const fs = require('fs.promises')
const inquirer = require('inquirer')


// Get Details 
var password 
var email 
var username 
var targetUsername






// Main
async function start()
{



  const res = await inquirer.prompt([
    {
      'name':'email',
      'message':'enter your email if you log in with email',
    },
    {
      'name':'username',
      'message':'enter your username if you use username to login',
    },
    {
      'name':'password',
      'message':'enter your password ',
    },
    {
      'name':'targetUsername',
      'message':'enter username of the person\s page your want to scrape ',
    }
  ])

  var { email, username, password, targetUsername,  } = res 
    // Launch 
    const Browser = await puppeteer.launch() 
    const page = await Browser.newPage() 

    // Set Defaults 
    const url = 'https://www.instagram.com'
    const login = 'https://www.instagram.com'


    await page.setDefaultTimeout(500000)

    // goto instagram 
    await page.goto(url,{waitUntil : 'load' }).catch(e => void 0);

  

    // take a screen shot 
    await page.screenshot({ path:'loginPage.png'})
    await page.waitForSelector('input[name="username"]')
    await page.waitForSelector('input[name="password"]')
    await page.type('input[name="username"]', email.trim() || username.trim() )
    await page.type('input[name="password"]',password)
    await Promise.all([await page.click('[type=submit]'),await page.waitForNavigation().catch(e => console.log(err) )])
    

    // take screen shot 
    await page.screenshot({ path:'saveDetailsPage.png'})

    // Click do not remember 
    await page.click('#react-root > section > main > div > div > div > div > button')

    // wait for navigation
    await page.waitForNavigation()

    // screenshot 
    await page.screenshot({ path: 'homePage.png'})


    // Got to Celebrity page 
    await page.goto(`https://www.instagram.com/${targetUsername.trim()}/`,{waitUntil : 'load' }).catch(e => void 0);




    // Celebrity page 
     // screenshot 
     await page.screenshot({ path: 'celebritypage.png'})


    // Evaluate page for images 
    var images = await page.$$eval('img',(images)=>{
      return images.map( x => x.src )
    })


    // loop through all and save 
    var count = 0
    for( image of images)
    {
      count++ 
      // go to image page 
      var imagePage = await page.goto(image,{waitUntil : 'load' })

      if( image.includes('jpg') )
      {
          // write image file 
          await fs.writeFile(`image${count}.jpg`,await imagePage.buffer()) 
      }
      else if( image.includes('png'))
      {
           // write image file 
           await fs.writeFile(`image${count}.png`,await imagePage.buffer()) 
      }
    }


    // Close 
    Browser.close() 
}

start() 