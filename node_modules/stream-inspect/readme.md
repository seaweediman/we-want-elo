# stream-inspect

Inspect what's coming through your stream.

```javascript
var si = require('stream-inspect');

process.stdin
  .pipe(si('in'))
  .pipe(process.stdout);
```

## License

MIT