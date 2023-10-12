# Vue in Viewport

Vue 3 directive that bindes classes to an element if it is visible in viewport.

## Installation

```Bash
npm install vue-in-viewport
```

## Usage

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
    <div v-in-viewport="{className: 'in-viewport', offsetTop: 0, offsetBottom: 0}" class="my-in-viewport-element">
        <!-- some content -->
    </div>
</template>
```

## Options

| Option Key     | Value Type | Default Value     | Description                                                                         |
| -------------- | ---------- | ----------------- | ----------------------------------------------------------------------------------- |
| `className`    | String     | `in-viewport`     | General identificator class.                                                        |
| `classActive`  | String     | `is-in-viewport`  | Class that's been added when visible in viewport.                                   |
| `classViewed`  | String     | `was-in-viewport` | Class that's been added when visible in viewport once.                              |
| `offsetBottom` | Number     | `0`               | Offset from bottom of the viewport in pixels.                                       |
| `offsetBottom` | Number     | `0`               | Offset from bottom of the viewport in pixels.                                       |
| `triggerOnce`  | Boolean    | `false`           | If `true` there won't be a viewport-check after once viewed to safe on performance. |
| `delay`        | Number     | `0`               | Sets a delay for the class binding in milliseconds.                                 |

## Add Styling

Now you can add your custom CSS according to your needs.

In this case we create a fade-in effect for elements that apear in the viewport:

```CSS
/* define your initail state with .in-viewport */
.in-viewport {
    transition: opacity 0.2s ease, transform 0.3s ease;
    transform: scale(0.8);
    opacity: 0;
}

/* add your visible state with .is-in-viewport for transitioning in and out
or use .was-in-viewport to transition in only once */
.is-in-viewport {
    transform: scale(1);
    opacity: 1;
}
```
