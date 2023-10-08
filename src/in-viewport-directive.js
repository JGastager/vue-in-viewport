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

        // Throttle function utility
        function throttle(func, delay) {
            let lastCall = 0;
            return function (...args) {
                const now = new Date().getTime();
                if (now - lastCall >= delay) {
                    lastCall = now;
                    func(...args);
                }
            };
        }

        // Debounce function utility
        function debounce(func, delay) {
            let timeoutId;
            return function (...args) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func(...args), delay);
            };
        }

        function addClass(el, className, delay) {
            setTimeout(() => {
                requestAnimationFrame(() => {
                    el.classList.add(className);
                });
            }, delay);
        }

        function removeClass(el, className, delay) {
            setTimeout(() => {
                requestAnimationFrame(() => {
                    el.classList.remove(className);
                });
            }, delay);
        }

        function checkViewport() {
            console.log("trigger");
            const rect = el.getBoundingClientRect();
            const isInViewport =
                rect.top + options.offsetBottom <= window.innerHeight && rect.bottom - options.offsetTop >= 0;
            if (isInViewport) {
                addClass(el, options.classViewed, options.delay);
                if (!options.triggerOnce) {
                    addClass(el, options.classActive, options.delay);
                } else {
                    // if there should's be an active state remove event listener after triggering once
                    window.removeEventListener("scroll", checkViewport);
                }
            } else if (!options.triggerOnce) {
                removeClass(el, options.classActive, options.delay);
            }
        }

        // Throttle the checkViewport function with a reasonable delay
        const throttledCheckViewport = throttle(checkViewport, 100);

        // Debounce the checkViewport function for resize events
        const debouncedCheckViewport = debounce(checkViewport, 100);

        // Add the throttled function to the scroll event listener
        window.addEventListener("scroll", throttledCheckViewport);

        // Add the debounced function to the resize event listener
        window.addEventListener("resize", debouncedCheckViewport);

        // Initial check
        checkViewport();

        // Attach the function to the element for later cleanup
        el._throttledCheckViewport = throttledCheckViewport;
        el._debouncedCheckViewport = debouncedCheckViewport;
    },

    beforeUnmount(el) {
        // Cleanup
        window.removeEventListener("scroll", el._throttledCheckViewport);
        window.removeEventListener("resize", el._debouncedCheckViewport);
    },
};

export default InViewportDirective;
