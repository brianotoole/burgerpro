// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"entry.scss":[function(require,module,exports) {

},{}],"assets/layout/nav.js":[function(require,module,exports) {
/*********************************************************
  Nav
*********************************************************/
(function ($) {
  'use strict'; // Nav setup
  // Append nav markup

  $('.sub-menu').prepend('<li class="sub-menu__back"><a><i class="fal fa-long-arrow-left"></i> Back</a></li></div>'); // Global variables

  var trigger = $('.nav-toggle');
  var parent = $('.nav-mobile li.menu-item-has-children');
  var child = $('.nav-mobile li.menu-item-has-children:has(ul)').find('ul > li'); // sub menus (ul)

  var lvl1_menu = $('.nav-mobile ul:first-child');
  var lvl2_menu = $('.nav-mobile ul:first-child > li > a + ul');
  var lvl3_menu = $('.nav-mobile ul:first-child > li > a + ul > li > a + ul'); // sub menu link items (li a)

  var lvl1_links = $('.nav-mobile ul:first-child > li > a');
  var lvl2_links = $('.nav-mobile ul:first-child > li > a + ul > li > a');
  var lvl3_links = $('.nav-mobile ul:first-child > li > a + ul > li > a + ul > li > a'); // Add nav classes for easier css selection 

  lvl1_menu.addClass('lvl-1-menu');
  lvl2_menu.addClass('lvl-2-menu');
  lvl3_menu.addClass('lvl-3-menu');
  lvl1_links.addClass('lvl-1');
  lvl2_links.addClass('lvl-2');
  lvl3_links.addClass('lvl-3');

  function navToggle() {
    $('body').toggleClass('nav-open');
    $('.nav-mobile').toggleClass('nav-open');
    $('.nav-toggle').toggleClass('active');
    $('.lvl-1-menu').toggleClass('active');
  }

  function navClose() {
    $('body').removeClass('nav-open');
    $('.nav-mobile').removeClass('nav-open');
    $('.nav-toggle').removeClass('active');
    $('.lvl-1-menu').removeClass('active');
  } // Detect click on nav-toggle and open


  trigger.click(function (e) {
    navToggle(); // Detect click outside of nav-mobile, when open, and close nav

    $('.nav-open-overlay').click(function () {
      navClose();
    }); // Detect click on esc key, when open, and close nav

    $(document).on('keyup', function (e) {
      if (e.keyCode == 27) {
        navClose();
      }
    });
  }); // On click of parent item (lvl 1)

  parent.append('<i class="nav-mobile__chevron fal fa-chevron-right">');
  parent.on('click', function (e) {
    e.preventDefault();
    $(this).find(' > .sub-menu').toggleClass('active'); //var parent_title = $(e.target).text();

    trigger.click(function () {
      $('.sub-menu').removeClass('active');
    }); // On click of back arrow within parent

    var back = $('.sub-menu__back a');
    back.on('click', function (e) {
      e.preventDefault();
      $(e.target).closest('.sub-menu').removeClass('active');
    });
  }); // On click of child item (lvl 2 & beyond)

  child.on('click', function (e) {
    e.stopPropagation();
  });
})(jQuery);
},{}],"entry.js":[function(require,module,exports) {
"use strict";

require("./entry.scss");

/*********************************************************
  Entry.js = main js entry point for bundling
*********************************************************/
// Grab entry styles to bundle
// Plugin specific scripts
require('./assets/layout/nav.js');
},{"./entry.scss":"entry.scss","./assets/layout/nav.js":"assets/layout/nav.js"}]},{},["entry.js"], null)