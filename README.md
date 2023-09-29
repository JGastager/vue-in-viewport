# Vue in Viewport

Vue 3 directive that bindes classes to an element if it is visible in viewport.

## How to setup:

Import the Package as Vue plugin

```JavaScript
import Vue from 'vue';
import VueInViewport from 'vue-in-viewport';

// Use default options configuration
Vue.use(VueInViewport);

// Or provide custom options
Vue.use(VueInViewport, {
    className: "in-viewport",
    offsetTop: 0,
    offsetBottom: 0,
    // ... more options
});
```

## Options

WIP
