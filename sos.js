

// puppeteer 
const puppeteer  = require('puppeteer')
const fs = require('fs.promises')



async function start()
{
    // launch chromium
    const browser = await puppeteer.launch()

    // new page 
    const page  = await browser.newPage()

    // change timeout 
    await page.setDefaultTimeout(45000)


    // // Screen Shot
    // await page.screenshot({ path: 'C:\Users\GAGA_D_DEVELOPER\Desktop\dreamWeaversFull.png', fullPage: true})

    // // Text Scrape
    // const texts = await page.evaluate(()=>{
    //     return Array.from( document.querySelectorAll('#content > div > div.block.pb-0 > div > div > ul > li > div > div > div.footer.style2 > div.box-left > div > div.by > strong > a')).map( x => x.textContent )
    // })

    // // write resulting array to file 
    // await fs.writeFile('authors.txt', texts.join('\r\n'))


    // // Scraping Images 
    // const images = await  page.$$eval("img",imgs=>{ 
    //     return imgs.map( x => x.src )
    // })

    // // images is an array of image source codes 
    // for( const image of images )
    // {
    //     const imagePage = await page.goto(image)
    //     if( !imagePage )
    //     {
    //         fs.writeFile('error.text','url invalid')
    //     }
    //     fs.writeFile( image.split('/').pop(), await imagePage.buffer() ) 
    // }


    // input data into a form 
    await page.goto('https://www.instagram.com/',{ waitUntil: 'load', timeout: 0})
    await page.waitForSelector('input[name="username"]');
    await page.waitForSelector('input[name="password"]');
    await page.type('input[name="username"]','esavwede84@gmail.com')
    await page.type('input[name="password"]','Norton123#')
    await Promise.all([  await page.click('[type=submit]'),await page.waitForNavigation({ waitUntil: 'load', timeout: 0})])

  
    await page.screenshot({path:'instagram.png', fullPage: true})

    // navigate to page
    await page.goto('https://www.instagram.com/kasimma_xx/',{ waitUntil:'load', timeout: 0})

    await page.screenshot({path:'kasima.png', fullPage: true})
    // results Image Selector
    const imageResults = await page.$$eval("video",(imgs)=>{
        return imgs.map( x => x.src )
    })

    console.log(imageResults)
 
    let count = 0
    // copy download the images 
    for( image of imageResults)
    {
        count++

        const imagePage = await page.goto(image,{ waitUntil: 'load', timeout: 0})
        if( image.includes('.jpg'))
        {
            await fs.writeFile(`img${count}.png`, await imagePage.buffer() )
        }else
        {
            await fs.writeFile(`vid${count}.mp4`, await imagePage.buffer() )
        }
        
        
    }

    browser.close() 
}

// call program 
start() 