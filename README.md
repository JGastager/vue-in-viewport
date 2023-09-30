# Vue in Viewport

Vue 3 directive that bindes classes to an element if it is visible in viewport.

## How to setup:

Import the Package as Vue plugin

```JavaScript
import { createApp } from "vue";
import VueInViewport from "vue-in-viewport";

const app = createApp(/* Your main app component */);

// Use default options configuration
app.use(VueInViewport);

// Or provide custom options
app.use(VueInViewport, {
    className: "in-viewport",
    offsetTop: 0,
    offsetBottom: 0,
    // ... more options
});

// Mount your app to the DOM
app.mount("#app");
```

Add `v-in-viewport` to your desired element in your Vue template.

```HTML
<template>
    <div v-in-viewport class="my-in-viewport-element">
        <!-- some content -->
    </div>
</template>
```

You can also set the options for every element individualy by parsing the options directly.

```HTML
<template>
    <div v-in-viewport="{className: "in-viewport", offsetTop: 0, offsetBottom: 0,}" class="my-in-viewport-element">
        <!-- some content -->
    </div>
</template>
```

## Options

WIP

| Option Key   | Value Type | Default Value | Description                                   |
| ------------ | ---------- | ------------- | --------------------------------------------- |
| className    | String     | in-viewport   |                                               |
| offsetTop    | Number     | 0             | Offset from top of the viewport in pixels.    |
| offsetBottom | Number     | 0             | Offset from bottom of the viewport in pixels. |
