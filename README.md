Elemental
=========
This is my little home-brewed attempt at making a jQuery-replacement. It's
mostly intended for my own edification, and for use with my own projects (that
do not require the full functionality of jQuery, and thus can benefit from
something smaller).

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

[Javascript ForEach]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach "Javascript .forEach() Documentation"
[jQuery each]: https://api.jquery.com/each/ "jQuery .each() Documentation"

<!--EOF-->
