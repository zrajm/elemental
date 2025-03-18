//-*- mode: js; js-indent-level: 2 -*-
// Copyright 2024-2025 by zrajm. License: CC BY-SA (text), GPLv2 (code).

// Elemental. Mini jQuery replacement.
export const $ = x => new Elemental(x)
export class Elemental extends Array {
  #wordsplit(x) { return x.trim().split(/\s+/) }
  #classes(cmd, x) {
    return this.forEach(t => t.classList[cmd](...this.#wordsplit(x)))
  }
  // Invoked with `$(CSS-selector|html|element|onloadCallback)`.
  // Return array of DOM Elements, with some added methods (similar to jQuery).
  constructor(x) {
    super()
    // Array methods like (.filter(), .map()` etc.) will call our constructor
    // with the argument '0' because we extend Array. This is for them.
    if (x === 0 || x === undefined) { return this } // COMPAT for Array methods
    if (typeof x === 'function') { return $(document).on('load', x) }
    Object.assign(
      this, typeof x === 'string'
        ? (x[0] === '<'
           ? new DOMParser().parseFromString(x, 'text/html')  // HTML
             .querySelectorAll('html>*>*') // (head + body)
           : document.querySelectorAll(x))                    // CSS selector
        : x.length === undefined ? [x] : x)
  }
  clone() { return this.map(t => t.cloneNode(1)) }
  /* traversal */
  forEach(x) { super.forEach(x); return this }
  parent() { return this.map(t => t.parentElement) } /* not uniqued! (jQuery does) */
  children() { return this.flatMap(t => [...t.children]) }
  /* query-esque */
  closest(x) { return this.flatMap(t => t.closest(x) ?? []) } /* not uniqued! (jQuery does) */
  filter(x) {
    return super.filter(typeof x === 'string' ? t => t.matches(x) : x)
  }
  find(x) { return this.flatMap(t => [...t.querySelectorAll(x)]) }
  is(a) { return this.some(t => t.matches(a)) }
  /* events */
  on(e, ...a) {
    e = this.#wordsplit(e)
    return this.forEach($e => e.forEach(e => {
      if (typeof browser !== 'undefined' &&  // for Firefox plugins
          ($e === browser.tabs || $e === browser.storage)) {
        return $e[`on${e[0].toUpperCase()}${e.slice(1)}`].addListener(...a)
      }
      return $e.addEventListener(e, ...a)
    }))
  }
  off(e, ...a) {
    e = this.#wordsplit(e)
    return this.forEach($e => e.forEach(e => $e.removeEventListener(e, ...a)))
  }
  /* modification of DOM */
  html(a) { return a ? this.forEach(t => t.innerHTML = a) : this[0].innerHTML }
  append(...a) {
    a = a.map(x => /^</.test(x) ? $(x) : x)
      .flatMap(x => x instanceof Elemental ? x : [x])
    return this.forEach(t => t.append(...a))
  }
  prepend(...a) {
    a = a.map(x => /^</.test(x) ? $(x) : x)
      .flatMap(x => x instanceof Elemental ? x : [x])
    return this.forEach(t => t.prepend(...a))
  }
  remove(x) {
    return (x ? this.filter(x) : this).forEach(t => t.remove())
  }
  addClass   (x) { return this.#classes('add',    x) }
  removeClass(x) { return this.#classes('remove', x) }
  toggleClass(x) { return this.#classes('toggle', x) }
  css(css = {}) {
    css = Object.entries(css)
    return this.forEach(t => css.forEach(([k, v]) =>
      t.style[k] = `${v}${typeof v === 'number' ? 'px' : ''}`
    ))
  }
  attr(a) {
    if (Array.isArray(a)) { throw TypeError('.attr() arg cannot be array') }
    if (typeof a === 'string') { return this[0].getAttribute(a) }
    a = Object.entries(a)
    return this.forEach(t => a.forEach(([k, v]) =>
      t[`${v == null ? 'remove' : 'set'}Attribute`](k, v)))
  }
}

//[eof]
