const navigateVariants = {
    hidden: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const textVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: { ease: "anticipate", duration: 0.6 },
    },
};

export { navigateVariants, textVariants };
