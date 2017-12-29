var Vinyl = require('vinyl')
  , through = require('through2');

/**
 * Create vinyl file from string or buffer and add to gulp stream.
 *
 * @param {String} name
 * @param {String|Buffer} source
 * @param {Object=} options
 * @param {Boolean=false} options.src
 * @return {stream.Transform}
 * @api public
 */
module.exports = function(fileArray, source, options) {
  if (fileArray instanceof Array) {
    options = source;
  } else {
    fileArray = [{
      name: fileArray,
      source: source
    }];
  }

  var stream = through.obj(function(file, enc, callback) {
    this.push(file);

    return callback();
  });

  fileArray.forEach(function(file) {
    stream.write(new Vinyl({
      path: file.name,
      contents: file.source instanceof Buffer ? file.source : new Buffer(file.source)
    }));
  });

  if (options && options.src) {
    stream.end();
  }

  return stream;
};
