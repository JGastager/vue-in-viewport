# Vue In-Viewport

Vue 3 directive that bindes classes to an element if it is visible in viewport.

## How to setup:

```JavaScript
import Vue from 'vue';
import VueInViewport from 'vue-in-viewport';

// Custom configuration
const Options = {
    className: 'in-viewport',
    offsetTop: 20,
    offsetBottom: 20
};

Vue.use(VueInViewport, Options);
```

## Options

WIP
