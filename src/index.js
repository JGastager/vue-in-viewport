// Import directive logic
import directive from "./in-viewport.js";

// Define the Vue plugin
const InViewport = {
    install(Vue, customOptions = {}) {
        // Merge default options with user-provided options
        const mergedOptions = {
            // Default options
            className: "in-viewport",
            offsetTop: 0,
            offsetBottom: 0,
            ...customOptions,
        };

        // Provide options globally
        Vue.prototype.$inViewport = mergedOptions;

        // Register the directive globally
        Vue.directive("in-viewport", directive);
    },
};

// Export the plugin for use in Vue projects
export default InViewport;
