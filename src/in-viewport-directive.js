const InViewportDirective = {
    mounted(el, binding, vnode) {
        // Access options globally

        // FIXME const globalOptions = vnode.appContext.config.globalProperties.inViewport.options;
        const globalOptions = {
            className: "in-viewport",
            classActive: "is-in-viewport",
            classViewed: "was-in-viewport",
            offsetTop: 0,
            offsetBottom: 0,
            triggerOnce: false,
            delay: 0,
        };

        // Merge local options (provided in the directive's binding value) with global config
        const options = { ...globalOptions, ...binding.value };

        // Add generell in-viewport class
        el.classList.add(options.className);

        function checkViewport() {
            const rect = el.getBoundingClientRect();
            const isInViewport =
                rect.top + options.offsetBottom <= window.innerHeight && rect.bottom - options.offsetTop >= 0;
            if (isInViewport) {
                setTimeout(() => {
                    el.classList.add(options.classViewed);
                }, options.delay);
                if (!options.triggerOnce) {
                    setTimeout(() => {
                        el.classList.add(options.classActive);
                    }, options.delay);
                } else {
                    // if there should's be an active state remove event listener after triggering once
                    window.removeEventListener("scroll", checkViewport);
                }
            } else if (!options.triggerOnce) {
                setTimeout(() => {
                    el.classList.remove(options.classActive);
                }, options.delay);
            }
        }

        window.addEventListener("scroll", checkViewport);
        checkViewport(); // initial check

        // Attach the function to the element for later cleanup
        el._checkViewport = checkViewport;
    },
    beforeUnmount(el) {
        // Cleanup
        window.removeEventListener("scroll", el._checkViewport);
    },
};

export default InViewportDirective;
