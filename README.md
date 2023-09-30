# Vue in Viewport

Vue 3 directive that bindes classes to an element if it is visible in viewport.

## How to setup:

Import the Package as Vue plugin

```JavaScript
import Vue from "vue";
import VueInViewport from "vue-in-viewport";

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

Add `v-in-viewport` to your desired element in your Vue template.

```HTML
<template>
    <div v-in-viewport class="my-in-viewport-element">
        <!-- some content -->
    </div>
</template>
```

## Options

WIP
