# Elemental

* [Elemental source]

This is my little home-brewed attempt at making a jQuery-replacement. It's
written for my own edification, as well as for use with my own projects (that
do not require the full functionality of jQuery, and thus can benefit from
something smaller). Elemental is meant to work well with modern browsers,
without relying on bleeding edge features, and should work well with all
browsers that implement what MDN describes as '[Baseline, widely
available][baseline]'.

Elemental is written using modern Javascript (ES6) and does not strive to be
overly backwards compatible, nor excessively compatible with jQuery itself. It
will only ever support a subset of jQuery's features (exactly which subset will
probably change over time).

Most Elemental methods returns a list of DOM element with a couple of extra
methods for DOM manipulation (paralleling the way jQuery does things). However,
Elemental differ from jQuery in that standard Javascript list methods
(`.forEach()`, `.map()`, `.filter()`, `.reduce()` etc) are all directly
available and works the way you'd expect. The awkward jQuery `.each()` method
(which invokes the callback with arguments in the *opposite order* of the
Javascript native `.forEach()` method) will never be supported (cf. [Javascript
`.forEach()`] and [jQuery `.each()`]).

Elemental is chainable and implicitly iterative, by design. Invoking
`$('*').css({ background: 'red' })` will thus change the background color of
all elements in the DOM to red, and then return said elements wrapped in an
Elemental collection. Most methods return an Elemental collection like this,
and so, just like jQuery, Elemental is eminently chainable.


# Methods

Most methods are directly analogous to the jQuery function with the same name.

The Elemental object inherits from Javascript *Array*, so all array methods are
natively supported (`.splice()`, `.concat()`, `.forEach()` etc). Callback
functions invoked by these are passed methods are passed their arguments in the
native Javascript order (*not* the order used by jQuery).


## Constructor & Creation

**NOTE:** Using `HTML` in the constructor `$(…)` will cause inline event
handlers and Javascript content to be executed, so always make sure to escape,
or strip out, untrusted code.

* `$(SELECTOR|ELEMENT|HTML|FUNC)`—Returns an Elemental array (of DOM Elements).
  Specifying `SELECTOR` (a CSS selector) returns all matching DOM elements on
  the current page. Specifying `ELEMENT` (a DOM element) returns an Elemental
  array containing that element. Specifying `HTML` (a string, which must start
  with the `<` character) creates and returns the elements described by the
  HTML (elements are, however, not inserted into the DOM, you'll have to do
  that yourself, using `.append()` or similar). Specifying `FUNC` execute
  function on page load (alias for `$(document).on('load', FUNC)`).
* `.clone()`—Returns a (deep) clone of the input elements.


## DOM Traversal

* `.forEach()`—Returns an Elemental array. Works just like the native Array
  method of the same name, except that it is chainable.
* `.parent()`—Returns a list containing all the parent DOM elements, one for
  each element in the input array. (The returned result may contain duplicates
  and `null` elements).
* `.children()`—Returns list of all directly descendant DOM elements.


## Query-esque

These methods all accept a CSS-style `SELECTOR` as an argument, and traverse
the DOM to find matching elements, however, the way they traverse is differs.

* `.closest(SELECTOR)`—Returns list of closest element or ancestor element
  matching the given CSS selector. For each element in the input matching is
  first attempted with the element itself, then their parent element, then
  grandparent element etc and so on up to the root element. (The returned
  result may contain duplicates and `null` elements).
* `.find(SELECTOR)`—Returns list of all matching child elements.
* `.filter(SELECTOR|FUNC)`—Returns matching subset of elements. `SELECTOR` (a
  CSS selector) returns the matching elements. `FUNC` (like Javascript Array
  function `.filter()`) returns the elements for which `FUNC` returned truthy.
  Function is called for each element using `FUNC(ELEMENT, INDEX, ARRAY)`.
* `.is(SELECTOR)`—Returns `true` if any element in the input matches the given
  CSS selector, `false` otherwise.


## Events

* `.on(EVENTS, [SELECTOR,] FUNC)`— Returns the input elements. Attaches the
  given event handler to each input element. `EVENTS` may contain multiple
  (space separated) event names. There is special logic to for `browser.tabs`
  and `browser.storage` events (useful when writing Firefox addons). Events may
  also be delegated events (à la jQuery) by providing a `SELECTOR` argument. In
  the case of delegated events, the event `.currentTarget` property (received
  by the callback) refers to the element where the event handler was attached,
  and while the `.target` property refers to the element which was actually
  affected by the event (the element specified by `SELECTOR`).
* `.off(EVENTS, FUNC)`—Returns the input elements. Remove given handler to from
  input elements. `EVENTS` may contain multiple (space separated) event names.
  Currently, providing `FUNC` for a delegated events is not useful (as the
  delegation is handled by a wrapper function, not the function you provided
  when invoking `.on()`).


## DOM Modification

* `.html()`—Returns the inner HTML content of the first element in the input
  set.
* `.html(HTML)`—Replace the inner HTML content of each element in the input set
  with specified `HTML`.
* `.prepend(CONTENT…)`—Returns the modified elements. Inserts `CONTENT` (HTML,
  element, or Elemental array) at the beginning of each of the input elements.
* `.append(CONTENT…)`—Returns the modified elements. Inserts `CONTENT` (HTML,
  element, or Elemental array) at the end of each of the input elements.
* `.remove([SELECTOR|FUNC])`—Returns all the removed elements. Removes all
  specified elements from DOM. Invoking using an argument is equivalent to
  using `.filter(…).remove()`, without argument all input elements are removed.
* `.addClass(CLASSES)`—Returns the modified elements. Add the given
  (space-separated) class names to the input elements.
* `.removeClass(CLASSES)`—Returns the modified elements. Remove the given
  (space-separated) class names from the input elements.
* `.toggleClass(CLASSES)`—Returns the modified elements. Toggle the given
  (space-separated) class names in the input elements.
* `.css({ KEY: VALUE, …})`—Returns the modified elements. Replace the CSS
  properties for the input elements with those specified in a plain object.
* `.attr({ KEY: VALUE, …})`—Returns the modified elements. Set or remove
  attributes. If a `VALUE` is nullish (`null` or `undefined`) then the
  corresponding attribute is removed, otherwise it is set to `VALUE`.


# Credits

Copyright 2024–2025 by zrajm. Released under [GNU Public License version
2][GPLv2].

[baseline]: https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility "MDN: Baseline (compatibility)"
[GPLv2]: ./LICENSE.txt "GNU Public License, version 2"
[Javascript `.forEach()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach "MDN: Javascript .forEach()"
[jQuery `.each()`]: https://api.jquery.com/each/ "jQuery Docs: .each()"
[Elemental source]: https://raw.githubusercontent.com/zrajm/elemental/refs/heads/main/elemental.mjs "Elemental Source Code"

<!--EOF-->
