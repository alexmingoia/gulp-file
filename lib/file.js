var gutil = require('gulp-util')
  , through = require('through2');

/**
 * Create vinyl file from string or buffer and add to gulp stream.
 *
 * @param {String} name
 * @param {String|Buffer} source
 * @return {stream.Transform}
 * @api public
 */
module.exports = function(name, source) {
  var file = new gutil.File({
    cwd: "",
    base: "",
    path: name,
    contents: ((source instanceof Buffer) ? source : new Buffer(source))
  });

  var stream = through.obj(function(file, enc, callback) {
    this.push(file);

    return callback();
  });

  stream.write(file);

  return stream;
};
