const ghpages = require('gh-pages');

ghpages.publish(`${__dirname}/../dist`, (err) => console.error(err || ''));
