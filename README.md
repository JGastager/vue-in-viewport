# Vue In-Viewport

Vue 3 directive that bindes classes to an element if it is visible in viewport.

## How to setup:

```JavaScript
import Vue from 'vue';
import MyVuePackage from 'my-vue-package';

// Use default options configuration
Vue.use(MyVuePackage);

// Or provide custom options
Vue.use(MyVuePackage, {
    className: "in-viewport",
    offsetTop: 0,
    offsetBottom: 0,
    // ... more options
});
```

## Options

WIP
