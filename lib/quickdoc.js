
/**
 * Module dependencies.
 */

var Base = require('mocha').reporters.Base;

function escapeHtml(unsafe) {
    return unsafe .replace(/&/g, "&amp;") .replace(/</g, "&lt;") .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

/**
 * Expose `QuickDoc`.
 */

exports = module.exports = QuickDoc;

/**
 * Initialize a new `QuickDoc` reporter.
 *
 * @param {Runner} runner
 * @api public
 */

function QuickDoc(runner) {
  Base.call(this, runner);

  var self = this
    , stats = this.stats
    , total = runner.total
    , indents = 2
    , specDepth = 1;

  function indent() {
    return Array(indents).join('  ');
  }

  runner.on('suite', function(suite){
    if (suite.root) { return; }
    ++indents;
    console.log('%s<section class="suite">', indent());
    ++indents;

    if (specDepth == 1) {
        console.log('%s<h1><a href="file://%s">%s</a></h1>', indent(), escapeHtml(suite.file), escapeHtml(suite.title));
    } else {
        console.log('%s<h'+specDepth+'>%s</h'+specDepth+'>', indent(), escapeHtml(suite.title));
    }
    
    console.log('%s<ul class="%s">', indent(), specDepth);
    specDepth++;
  });

  runner.on('suite end', function(suite){
    if (suite.root) return;
    specDepth--;
    console.log('%s</ul>', indent());
    --indents;
    console.log('%s</section>', indent());
    --indents;
  });

  runner.on('pass', function(test){
    console.log('%s  <li type="disc">%s</li>', indent(), escapeHtml(test.title));
  });

  runner.on('fail', function(test, err){
    console.log('%s  <li class="error" type="circle">(failed) %s</li>', indent(), escapeHtml(test.title));
  });
}
