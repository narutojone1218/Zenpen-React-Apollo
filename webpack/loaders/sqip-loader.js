const loaderUtils = require('loader-utils');
const SVGO = require('svgo');
const sqip = require('sqip');
const fs = require('fs');
const md5File = require('md5-file');
const path = require('path');

const CACHE_PATH = path.resolve('.sqip-loader')

if (!fs.existsSync(CACHE_PATH)) {
  fs.mkdirSync(CACHE_PATH)
}

// https://codepen.io/tigt/post/optimizing-svgs-in-data-uris
function encodeSvgDataUri(svg) {
  const uriPayload = encodeURIComponent(svg)
    .replace(/%0A/g, '')
    .replace(/%20/g, ' ')
    .replace(/%3D/g, '=')
    .replace(/%3A/g, ':')
    .replace(/%2F/g, '/')
    .replace(/%22/g, "'");
  return `data:image/svg+xml,${uriPayload}`;
}


function traceSvg(filename) {
  return new Promise(((resolve, reject) => {
    try {
      const svgInfo = sqip({
        filename,
        numberOfPrimitives: 10,
      })
      resolve(svgInfo.final_svg)
    } catch (e) {
      reject(e)
    }
  }));
}

module.exports = function (contentBuffer) {
  if (this.cacheable) {
    this.cacheable();
  }
  let content = contentBuffer.toString('utf8');
  const filePath = this.resourcePath;
  const contentIsUrlExport = /^module.exports = "data:(.*)base64,(.*)/.test(content);
  const contentIsFileExport = /^module.exports = (.*)/.test(content);
  let src = '';
  if (contentIsUrlExport) {
    src = content.match(/^module.exports = (.*)/)[1];
  } else {
    if (!contentIsFileExport) {
      const fileLoader = require('file-loader');
      content = fileLoader.call(this, contentBuffer);
    }
    src = content.match(/^module.exports = (.*);/)[1];
  }
  const stats = fs.statSync(filePath)
  const callback = this.async();
  if (stats.size < 10000) {
    return callback(null, contentBuffer)
  }
  const hash = md5File.sync(filePath)
  const cachedContentJSPath = path.resolve(CACHE_PATH, `${hash}.js`);
  const cachedContentSVGPath = path.resolve(CACHE_PATH, `${hash}.svg`);
  if (fs.existsSync(cachedContentJSPath)) {
    return callback(null, fs.readFileSync(cachedContentJSPath));
  }
  traceSvg(filePath)
    .then((svg) => {
      fs.writeFileSync(cachedContentSVGPath, svg);
      return svg
    })
    .then(encodeSvgDataUri)
    .then((encodedSvgDataUri) => {
      const jsOutput = `module.exports = { "src": ${src} , "placeholder": "${encodedSvgDataUri}" };`;
      fs.writeFileSync(cachedContentJSPath, jsOutput);
      callback(null, jsOutput);
    })
    .catch((error) => {
      console.error(error);
      callback(error);
    });
};

module.exports.raw = true;
