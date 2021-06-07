var es = require('event-stream');

module.exports = function (ns) {
  return es.mapSync(function (data) {
    var out = data;
    if (data instanceof Buffer) out = data.toString();
    try {
      out = JSON.parse(out);
    } catch (e) {}
    var args = [require('util').inspect(out, { depth: null, colors: true })];
    ns && args.unshift(ns + ':');
    console.log.apply(console, args);
    return data;
  });
};