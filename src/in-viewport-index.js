// Import directive logic
import directive from "./in-viewport-directive.js";

// Default options
const defaultOptions = {
    classDefault: "in-viewport",
    classActive: "is-in-viewport",
    classViewed: "was-in-viewport",
    offsetTop: 0,
    offsetBottom: 0,
    triggerOnce: false,
    delay: 0,
};

// Define the Vue plugin
const InViewport = {
    install(app, customOptions = {}) {
        // Merge default options with user-provided options
        const mergedOptions = { ...defaultOptions, ...customOptions };

        // Register the directive globally
        app.directive("in-viewport", directive(mergedOptions));
    },
};

// Export the plugin for use in Vue projects
export default InViewport;
