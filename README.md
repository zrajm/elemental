# Elemental

* [Elemental source]

This is my little home-brewed attempt at making a jQuery-replacement. It's
mostly intended for my own edification, and for use with my own projects (that
do not require the full functionality of jQuery, and thus can benefit from
something smaller).

It is written using modern Javascript (ES6) and does not strive to be overly
backwards compatible.

Elemental will only ever support a subset of the jQuery features (exactly which
subset will probably change over time).

Most Elemental methods returns a list of DOM element with a couple of extra
methods for DOM manipulation (paralleling the way jQuery does things). However,
Elemental differ from jQuery in that standard Javascript list methods
(`.forEach()`, `.map()`, `.filter()`, `.reduce()` etc) are directly available
and works like you expect them too. The awkward jQuery `.each()` method (which
invokes its callback with the arguments in the opposite order of the native
`.forEach()` method) will never be supported. (Cf. [Javascript ForEach] and
[jQuery each]).

Elemental is mostly chainable and implicitly iterative, so that (just like in
jQuery) invoking `$('*').css({ background: 'red' })` will change the background
color of all elements in the DOM to red).


# Methods

Most methods are directly analogous to the jQuery function with the same name.


## Constructor

`$(SELECTOR|ELEMENT|HTML|FUNC)`—Returns an Elemental array (with DOM Elements).
The Elemental object inherits from Javascript Array, so all array methods are
supported (`.splice()`, `.concat()`, `.forEach()` etc). Callback functions
invoked by these are passed methods are passed their arguments in the native
Javascript order (not the order used by jQuery).


### Allowed Arguments

* `SELECTOR`—Returns the DOM elements matched by the given CSS selector.
* `ELEMENT`—Returns an Element object
* `HTML`—Creates and returns the elements described by the HTML string. The
  string must begin with `<` (or else it will be considered a `SELECTOR`).
  Elements are not automatically inserted into the DOM, you'll have to do that
  yourself (using `.append()` or similar). **NOTE: Inline event handlers, and
  similar Javascript content found in `HTML` will be executed, always escape
  untrusted code.**
* `FUNC`—Just like in jQuery `$(FUNC)` is an alias for `$(document).on('load',
  FUNC)`.


## DOM Traversal

* `.forEach()`—Just like Array `.forEach()` except that it returns an Elemental
  array, and is chainable.
* `.parent()`—Return list of containing parent DOM elements, one for each
  element in the input array. (The returned result may contain duplicates and
  `null` elements).
* `.children()`—Return list of all directly descendant DOM elements.


## Query-esque

These methods all accept a CSS-style `SELECTOR` as an argument, and traverse
the DOM to match any matching elements, however, the way they traverse is
differs.

* `.closest(SELECTOR)`—Return list of closest element or ancestor element that
  matches the given CSS selector. For each element in the input matching is
  first attempted with the element itself, then their parent element, then
  grandparent element etc and so on up to the root element. (The returned
  result may contain duplicates and `null` elements).
* `.find(SELECTOR)`—Return list of all matching child elements.
* `.is(SELECTOR)`—Return `true` if any element in the input matches the given
  CSS selector, `false` otherwise.


## Events

* `.on(EVENTS, FUNC)`—Attach given event handler to each input elements.
  `EVENTS` may contain multiple (space separated) event names. Has some special
  logic to for `browser.tabs` and `browser.storage` events (useful in Firefox
  addons). Elemental does not support the delegated events of jQuery (with the
  added `SELECTOR` argument (as in `.on(EVENTS, SELECTOR, FUNC)` arguments)
  syntax, the easiest way to emulate the same result is to add the following to
  the beginning of your callback `FUNC`
```
  if (!$(evt.target).is(SELECTOR)) { return }
```
* `.off(EVENTS, FUNC)`—Remove given handler to from input elements. `EVENTS`
  may contain multiple (space separated) event names.


## DOM Modification

* `.html()`—Get inner HTML content of first element in input set.
* `.html(HTML)`—Replace the inner HTML content of each element in the input set
  with the specified HTML.
* `.prepend(CONTENT…)`—Insert `CONTENT` (HTML, element, or Elemental array) at
  the beginning of each in the input elements.
* `.append(CONTENT…)`—Insert `CONTENT` (HTML, element, or Elemental array) at
  the end of each in the input elements.
* `.addClass(CLASS)`—Add the given class name to the input elements.
* `.removeClass(CLASS)`—Remove the given class name from the input elements.
* `.css({ KEY: VALUE, …})`—Replace the CSS properties for the input elements
  with those specified in a plain object. If a `VALUE` is a Javascript number,
  `px` will be appended to it.
* `.attr({ KEY: VALUE, …})`—Set or remove attributes. If a `VALUE` is nullish
  (`null` or `undefined`) then the corresponding attribute is removed,
  otherwise it is set to `VALUE`.


# Credits

Written by zrajm. Released under [GNU Public License version 2][GPLv2].

[GPLv2]: ./LICENSE.txt
[Javascript ForEach]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach "Javascript .forEach() Documentation"
[jQuery each]: https://api.jquery.com/each/ "jQuery .each() Documentation"
[Elemental source]: https://raw.githubusercontent.com/zrajm/elemental/refs/heads/main/elemental.mjs "Elemental Source Code"

<!--EOF-->
