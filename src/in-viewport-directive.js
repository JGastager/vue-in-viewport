const InViewportDirective = {
    inserted(el, binding, vnode) {
        // Access options globally
        const globalOptions = vnode.context.$inViewport.options;

        // Merge local options (provided in the directive's binding value) with global config
        const options = { ...globalOptions, ...binding.value };

        function checkViewport() {
            const rect = el.getBoundingClientRect();
            const isInViewport =
                rect.top + options.offsetTop <= window.innerHeight && rect.bottom - options.offsetBottom >= 0;
            if (isInViewport) {
                el.classList.add(options.className);
                window.removeEventListener("scroll", checkViewport);
            }
        }

        window.addEventListener("scroll", checkViewport);
        checkViewport(); // initial check

        // Attach the function to the element for later cleanup
        el._checkViewport = checkViewport;
    },
    unbind(el) {
        // Cleanup
        window.removeEventListener("scroll", el._checkViewport);
    },
};

export default InViewportDirective;
