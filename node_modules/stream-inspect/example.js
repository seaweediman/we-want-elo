var si = require('./');

process.stdin
  .pipe(si('in'))
  .pipe(process.stdout);