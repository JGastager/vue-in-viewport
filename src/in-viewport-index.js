// Import directive logic
import directive from "./in-viewport-directive.js";

// Default options
const defaultOptions = {
    className: "in-viewport",
    offsetTop: 0,
    offsetBottom: 0,
};

// Define the Vue plugin
const InViewport = {
    install(app, customOptions = {}) {
        // Merge default options with user-provided options
        const mergedOptions = { ...defaultOptions, ...customOptions };

        // Provide options globally
        app.config.globalProperties.$inViewport = {
            options: mergedOptions,
        };

        // Register the directive globally
        app.directive("in-viewport", directive);
    },
};

// Export the plugin for use in Vue projects
export default InViewport;
