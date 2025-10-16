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

The Elemental object inherits from Javascript *Array*, so all array methods are
supported (`.splice()`, `.concat()`, `.forEach()` etc). Callback functions
invoked by these are passed methods are passed their arguments in the native
Javascript order (*not* the order used by jQuery).


## Constructor & Creation

**NOTE:** Using `HTML` in the constructor `$(…)` will cause inline event
handlers, and Javascript content to be executed, always escape untrusted code.

* `$(SELECTOR|ELEMENT|HTML|FUNC)`—Returns an Elemental array (of DOM Elements).
  `SELECTOR` (a CSS selector) returns the matching DOM elements on the current
  page. `ELEMENT` (a DOM element) returns an Elemental array containing that
  element. `HTML` (must start with `<`) returns the elements described by HTML
  (elements are not inserted into the DOM, you'll have to do that yourself,
  using `.append()` or similar). `FUNC` execute function on page load (alias
  for `$(document).on('load', FUNC)`).
* `.clone()`—Return a (deep) clone of the set of elements.


## DOM Traversal

* `.forEach()`—Just like Array `.forEach()` except that it returns an Elemental
  array, and is chainable.
* `.parent()`—Return list of containing parent DOM elements, one for each
  element in the input array. (The returned result may contain duplicates and
  `null` elements).
* `.children()`—Return list of all directly descendant DOM elements.


## Query-esque

These methods all accept a CSS-style `SELECTOR` as an argument, and traverse
the DOM to find matching elements, however, the way they traverse is differs.

* `.closest(SELECTOR)`—Return list of closest element or ancestor element that
  matches the given CSS selector. For each element in the input matching is
  first attempted with the element itself, then their parent element, then
  grandparent element etc and so on up to the root element. (The returned
  result may contain duplicates and `null` elements).
* `.find(SELECTOR)`—Return list of all matching child elements.
* `.filter(SELECTOR|FUNC)`—Return matching subset of elements. `SELECTOR` (a
  CSS selector) returns the matching elements. `FUNC` (like Javascript Array
  function `.filter()`) returns the elements for which `FUNC` returned truthy.
  Function is called for each element using `FUNC(ELEMENT, INDEX, ARRAY)`.
* `.is(SELECTOR)`—Return `true` if any element in the input matches the given
  CSS selector, `false` otherwise.


## Events

* `.on(EVENTS, [SELECTOR,] FUNC)`—Attach given event handler to each input
  element. `EVENTS` may contain multiple (space separated) event names. There
  is special logic to for `browser.tabs` and `browser.storage` events (useful
  when writing Firefox addons). Elemental also supports delegated events (à la
  jQuery) by adding the `SELECTOR` argument. Returns the input elements.
* `.off(EVENTS, FUNC)`—Remove given handler to from input elements. `EVENTS`
  may contain multiple (space separated) event names. Currently, providing
  `FUNC` for a delegated events is not useful (as the delegation is handled by
  a wrapper function, not the function you provided when invoking `.on()`).
  Returns the input elements.


## DOM Modification

* `.html()`—Get inner HTML content of first element in input set.
* `.html(HTML)`—Replace the inner HTML content of each element in the input set
  with the specified HTML.
* `.prepend(CONTENT…)`—Insert `CONTENT` (HTML, element, or Elemental array) at
  the beginning of each in the input elements.
* `.append(CONTENT…)`—Insert `CONTENT` (HTML, element, or Elemental array) at
  the end of each in the input elements.
* `.remove([SELECTOR|FUNC])`—Remove all elements from DOM. Invoking with an
  argument is the same as `.filter(…).remove()`.
* `.addClass(CLASSES)`—Add the given (space-separated) class names to the input
  elements.
* `.removeClass(CLASSES)`—Remove the given (space-separated) class names from
  the input elements.
* `.toggleClass(CLASSES)`—Toggle the given (space-separated) class names in the
  input elements.
* `.css({ KEY: VALUE, …})`—Replace the CSS properties for the input elements
  with those specified in a plain object.
* `.attr({ KEY: VALUE, …})`—Set or remove attributes. If a `VALUE` is nullish
  (`null` or `undefined`) then the corresponding attribute is removed,
  otherwise it is set to `VALUE`.


# Credits

Copyright 2024–2025 by zrajm. Released under [GNU Public License version
2][GPLv2].

[GPLv2]: ./LICENSE.txt
[Javascript ForEach]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach "Javascript .forEach() Documentation"
[jQuery each]: https://api.jquery.com/each/ "jQuery .each() Documentation"
[Elemental source]: https://raw.githubusercontent.com/zrajm/elemental/refs/heads/main/elemental.mjs "Elemental Source Code"

<!--EOF-->
