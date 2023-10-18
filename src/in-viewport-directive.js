export default function InViewportDirective(globalOptions) {
    return {
        mounted(el, binding, vnode) {
            // Merge local options (provided in the directive's binding value) with global options
            const options = { ...globalOptions, ...binding.value };

            // Add generell in-viewport class
            el.classList.add(options.classDefault);

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
            
            // Add class function
            function addClass(el, classDefault, delay) {
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        el.classList.add(classDefault);
                    });
                }, delay);
            }

            // Remove class function
            function removeClass(el, classDefault, delay) {
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        el.classList.remove(classDefault);
                    });
                }, delay);
            }

            function checkViewport() {
                const rect = el.getBoundingClientRect();
                const isInViewport =
                    rect.top + options.offsetBottom <= window.innerHeight && rect.bottom - options.offsetTop >= 0;
                if (isInViewport) {
                    addClass(el, options.classViewed, options.delay);
                    if (!options.triggerOnce) {
                        addClass(el, options.classActive, options.delay);
                    } else {
                        // if there shouldn't be an active state, remove event listener after triggering once
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
}
