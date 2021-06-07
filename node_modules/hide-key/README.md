# hide-key

Shortcut for `defineProperty` with `enumerable: false`. Of course, they aren't actually hidden.

```javascript
var hide = require('hide-key');

var person = { name: 'Tom' };
hide(person, 'phone', 0123456789);
Object.keys(person); // [ 'name' ]
```