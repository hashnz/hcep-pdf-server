const hcBrowser = async () => {
  const puppeteer = require('puppeteer')
  const chromeBinary = process.env.HCEP_CHROME_BINARY || '/usr/bin/google-chrome'
  const launchOptions = (() => {
    let options = {
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    }
    if (process.env.HCEP_USE_CHROMIUM === 'true') {
      console.log("use Chromium:")
    }else{
      options['executablePath'] = chromeBinary
      console.log("use chromeBinary:", chromeBinary)
    }
    return options
  })()
  console.log('launchOptions:', launchOptions)
  const browser = await puppeteer.launch(launchOptions)
  const chromeVersion = await browser.version()
  console.log("chromeVersion:", chromeVersion)
  /**
   * Close browser with exit signal.
   */
  const exitHandler = async () => {
    console.log('process exit with SIGINT')
    await browser.close()
    console.log('complete browser.close()')
    await process.exit()
  }
  process.on('SIGINT', exitHandler)
  process.on('SIGTERM', exitHandler)
  return browser
}

const hcPage = async () => {
  console.log('getting a page')
  const browser = await hcBrowser()
  return browser.newPage()
}

module.exports.hcBrowser = hcBrowser
module.exports.hcPage = hcPage
