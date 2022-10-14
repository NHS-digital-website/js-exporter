const path = require('path');
const merge = require('lodash.merge');
const cloneDeep = require('lodash.clonedeep')
const playwright = require('playwright-aws-lambda');
const libraries = require('./libraries');

let browser;

async function exportViz(options = {}, library = 'nhsd-dataviz') {
  if (!options) throw new Error("Visualisation options not set");
  if (!options.format) {
    options.format = "jpg";
  }

  const libraryConfig = libraries[library];
  if (!libraryConfig || !libraryConfig.library || !libraryConfig.initScript) {
    throw new Error("Library not configured");
  }

  const page = await browser.newPage();
  page.setViewportSize({
    width: 1280,
    height: 720,
  });

  await page.goto(`file://${path.join(__dirname, 'template.html')}`);

  if (libraryConfig.library) {
    await page.addScriptTag({ url: libraryConfig.library });
  }

  if (libraryConfig.customScript) {
    await page.evaluate(libraryConfig.customScript);
  }

  if (libraryConfig.stylesheet) {
    await page.addStyleTag({ url: libraryConfig.stylesheet });
  }

  let chartOptions = options;
  if (libraryConfig.baseOptions) {
    chartOptions = cloneDeep(libraryConfig.baseOptions);
    merge(chartOptions, options);
  }

  await page.evaluate(libraryConfig.initScript, [chartOptions]);

  let output = {};
  let buffer;
  let element;
  switch(options.format) {
    case 'png':
      element = await page.$('#viz');
      buffer = await element.screenshot();
      output = {
        contentType: 'image/png',
        buffer,
      };
      break;
    case 'jpg':
      element = await page.$('#viz');
      buffer = await element.screenshot();
      output = {
        contentType: 'image/jpeg',
        buffer,
      };
      break;
    default:
      element = await page.$('#viz');
      const outerHtmlProp = await element.getProperty('innerHTML');
      buffer = await outerHtmlProp.jsonValue();
      output = {
        contentType: 'text/html',
        buffer,
      };
  }

  return output;
}

module.exports = async function(options = {}, library = 'nhsd-dataviz') {
  browser = await playwright.launchChromium({
    headless: true,
  });

  try {
    const output = await exportViz(options, library);
    await browser.close();
    return output;
  } catch (e) {
    await browser.close();
    throw e;
  }
}
