var env = require('../');
var expect = require('chai').expect;

// Test module
var replace = require('gulp-replace');

describe('gulp-if-env', function() {
  afterEach(function () {
    env.reset();
  });

  describe('main function', function() {
    it('defaults to development', function() {
      expect(env()).to.equal('development');
    });

    it('updates to production when production is set', function() {
      env.set('production');
      expect(env()).to.equal('production');
    });

    it('reverts to development when reset', function() {
      env.set('production');
      env.reset();
      expect(env()).to.equal('development');
    });

    it('confirms current environment', function() {
      expect(env('development')).to.be.true;
      expect(env('production')).to.be.false;
    });

    it('confirms updated environment', function() {
      env.set('production');
      expect(env('development')).to.be.false;
      expect(env('production')).to.be.true;
    });

    it('returns the provided gulp task for current environment', function() {
      var task = replace();
      var retVal = env('development', task);
      expect(retVal).to.be.equal(task);
      expect(retVal).to.have.property('_transform');
    });

    it('does not return same gulp task for different environment (noop)', function() {
      var task = replace();
      var retVal = env('production', task);
      expect(retVal).to.not.equal(task);
      expect(retVal).to.have.property('_transform');
    });
  });

  describe('not()', function() {
    it('confirms current environment', function() {
      expect(env.not('development')).to.be.false;
      expect(env.not('production')).to.be.true;
    });

    it('confirms updated environment', function() {
      env.set('production');
      expect(env.not('development')).to.be.true;
      expect(env.not('production')).to.be.false;
    });

    it('does not return the provided gulp task for mismatched environment (noop)', function() {
      var task = replace();
      var retVal = env.not('development', task);
      expect(retVal).to.be.not.equal(task);
      expect(retVal).to.have.property('_transform');
    });

    it('returns same gulp for mismatched environment', function() {
      var task = replace();
      var retVal = env.not('production', task);
      expect(retVal).to.equal(task);
      expect(retVal).to.have.property('_transform');
    });
  });

  describe('includes()', function() {
    it('returns true if arguments contain current environment', function() {
      expect(env.includes('development', 'production')).to.be.true;
    });

    it('returns false if arguments does not contain current environment', function() {
      expect(env.includes('staging')).to.be.false;
    });

    it('returns true if arguments contain custom environment', function() {
      env.set('staging');
      expect(env.includes('staging')).to.be.true;
    });

    it('returns the provided gulp task if contains current environment', function() {
      var task = replace();
      var retVal = env.includes('development', 'production', task);
      expect(retVal).to.be.equal(task);
      expect(retVal).to.have.property('_transform');
    });

    it('does not return same gulp task if doesn\'t contain current environment (noop)', function() {
      var task = replace();
      var retVal = env.includes('production', 'staging', task);
      expect(retVal).to.not.equal(task);
      expect(retVal).to.have.property('_transform');
    });
  });

  describe('excludes()', function() {
    it('returns true if arguments exclude current environment', function() {
      expect(env.excludes('production', 'staging')).to.be.true;
    });

    it('returns false if arguments does not contain current environment', function() {
      expect(env.excludes('development', 'staging')).to.be.false;
    });

    it('returns true if arguments do not contain custom environment', function() {
      env.set('staging');
      expect(env.excludes('development', 'production')).to.be.true;
    });

    it('returns the provided gulp task if excludes current environment', function() {
      var task = replace();
      var retVal = env.excludes('staging', 'production', task);
      expect(retVal).to.be.equal(task);
      expect(retVal).to.have.property('_transform');
    });

    it('returns different gulp task if doesn\'t exclude current environment (noop)', function() {
      var task = replace();
      var retVal = env.excludes('development', 'staging', task);
      expect(retVal).to.not.equal(task);
      expect(retVal).to.have.property('_transform');
    });
  });
});
