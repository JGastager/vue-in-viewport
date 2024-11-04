export default function InViewportDirective(globalOptions) {
    return {
        beforeMount(el, binding) {
            // Merge local options (provided in the directive's binding value) with global options
            const options = { ...globalOptions, ...binding.value };

            // Add generell in-viewport class
            el.classList.add(options.classDefault);
        },
        mounted(el, binding) {
            // Merge local options (provided in the directive's binding value) with global options
            const options = { ...globalOptions, ...binding.value };

            // Add class function
            function addClass(el, className, delay) {
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        el.classList.add(className);
                    });
                }, delay);
            }

            // Remove class function
            function removeClass(el, className, delay) {
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        el.classList.remove(className);
                    });
                }, delay);
            }

            //Checks if an element is in the viewport and adds or removes classes accordingly
            function checkViewport(entries) {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        addClass(el, options.classViewed, options.delay);
                        if (!options.triggerOnce) {
                            addClass(el, options.classActive, options.delay);
                        } else {
                            // if there shouldn't be an active state, remove intersection observer after triggering once
                            observer.unobserve(el);
                        }
                    } else if (!options.triggerOnce) {
                        removeClass(el, options.classActive, options.delay);
                    }
                });
            }

            // Create a new intersection observer instance with the given options
            const observer = new IntersectionObserver(checkViewport, {
                rootMargin: `${options.offsetTop * -1}px 0px ${options.offsetBottom * -1}px 0px`,
                threshold: options.threshold / 100,
            });

            // Initial check
            observer.observe(el);

            // Attach the function to the element for later cleanup
            el._observer = observer;
        },
        beforeUnmount(el) {
            // Cleanup
            el._observer.unobserve(el);
        },
    };
}
