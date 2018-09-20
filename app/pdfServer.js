const { hcBrowser } = require('./hcPage')
const { expressApp } = require('./expressApp')

const main = async () => {
  const browser = await hcBrowser()
  expressApp(browser)
}
main()
