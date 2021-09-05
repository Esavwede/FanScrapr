
// puppeteer 
const puppeteer = require('puppeteer')
const fs = require('fs.promises')




// main function
async function Start()
{

    // lauch 
    const Browser = await puppeteer.launch()

    // new page 
    const page = await Browser.newPage() 

 
    // navigate 
    const baseUrl = 'https://www.instagram.com/'
    const loginPage = 'https://www.instagram.com/'
    const celebrityUsername = 'arts_yomide'
    const celebrityPage = `${baseUrl}/${celebrityUsername}`
    const myUsername = 'esavwede84@gmail.com'
    const myPassword = 'Norton123#'

    await page.goto(loginPage,{ waitUntil: 'load', timeout: 0})

    // wait for selectors to load 
    await page.waitForSelector('input[name="username"]',{timeout: 0})
    await page.waitForSelector('input[password="password"]',{timeout: 0})

    // select elements for input 
    await page.type("input[name=username]",myUsername)
    await page.type("input[name=password]",myPassword)
    await Promise.all([ await page.click("[type=submit]"), await page.waitForNavigation({ timeout:0, waitUntil:'load'}) ])
    

    // goto myCelebrity page
    await page.goto(celebrityPage,{ waitUntil: 'load', timeout: 0})


    // select img elements, get img urls 
    const celebrityImages = await page.$$eval("img",(imgs)=>{
        return imgs.map( x => x.src )
    })  



    // count variable 
    const imageCount = 0

    // download images 
    for( celebrityImage of celebrityImages)
    {
        // increment image count 
        imageCount++
        // navigate to page 
        const imageSrc = await page.goto(celebrityImage,{ waitUntil: 'load', timeout: 0})

        // png
        if( celebrityImage.includes('.png'))
        {
            // save image as png
            await fs.writeFile(`img${count}.png`, await imageSrc.buffer())
        }
        if( celebrityImage.includes('.jpeg') )
        {
            // save as .jpeg
            await fs.writeFile(`img${count}.jpeg`, await imageSrc.buffer())
        }

        if( celebrityImage.includes('.jpg'))
        {
            // save as .jpg
            await fs.writeFile(`img${count}.jpg`, await imageSrc.buffer())
        }
    }
}


Start() 