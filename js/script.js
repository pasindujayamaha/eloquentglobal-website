const mobileMenuButton =
    document.querySelector(".mobile-menu-button");

const mainNavigation =
    document.querySelector(".main-navigation");


if (mobileMenuButton && mainNavigation) {

    mobileMenuButton.addEventListener("click", () => {

        const isOpen =
            mainNavigation.classList.toggle("open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    const navigationLinks =
        mainNavigation.querySelectorAll("a");


    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mainNavigation.classList.remove("open");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            mainNavigation.classList.remove("open");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}