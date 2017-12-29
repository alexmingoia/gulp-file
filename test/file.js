var expect = require('expect.js')
  , gulp = require('gulp')
  , through = require('through2')
  , mocha = require('mocha');

var plugin = (process.env.JSCOV ? require('../lib-cov/file') : require('../lib/file'));

describe('module', function() {
  it('exports gulp plugin', function() {
    expect(plugin).to.be.a('function');
  });
});

describe('plugin', function() {
  it('returns transform stream', function(done) {
    var stream = plugin('test.js', '/* TEST */');

    expect(stream).to.be.an('object');
    expect(stream._transform).to.be.a('function');

    stream.on('data', function(chunk) {
      expect(chunk).to.not.be.empty();
    })
    .on('end', function() {
      done();
    })
    .emit('data', 'test');

    stream.end();
  });

  it('returns array transform stream', function(done) {
    var stream = plugin([{name: 'test.js', source: '/* TEST */'}, {name: 'test2.js', source: '/* TEST2 */'}]);

    expect(stream).to.be.an('object');
    expect(stream._transform).to.be.a('function');

    stream.on('data', function(chunk) {
      expect(chunk).to.not.be.empty();
    })
    .on('end', function() {
      done();
    })
    .emit('data', 'test');

    stream.end();
  });
});
