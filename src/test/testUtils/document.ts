let document: Document;
if (global.document) {
  document = global.document;
} else {
  const { JSDOM } = require('jsdom');
  const { window } = new JSDOM();

  document = window.document;
}

export default document;
