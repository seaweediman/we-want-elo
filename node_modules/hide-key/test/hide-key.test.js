var hide = require('../');
var test = require('tape');

test('hidden key', function (t) {
    var person = { name: 'tom' };
    hide(person, 'phone', 0123456789);

    // Value
    t.equal(
        person.phone,
        0123456789,
        'value set'
    );

    // Enumerable
    t.equal(
        Object.keys(person).indexOf('person'),
        -1,
        'not enumerable by Object.keys'
    );
    t.equal(
        Object.getOwnPropertyNames(person).indexOf('person'),
        -1,
        'not enumerable by Object.getOwnPropertyNames'
    );

    // Writable
    person.phone = null;
    t.equal(
        person.phone,
        null,
        'writable'
    );

    t.end();
});