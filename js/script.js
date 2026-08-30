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


// --------------------------------------------------
// Global CTA link fixes
// --------------------------------------------------

const allLinks = document.querySelectorAll("a");

allLinks.forEach((link) => {

    const linkText = link.textContent
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();

    // Send every Request a Quote button to the Contact page.
    if (linkText === "request a quote") {
        link.setAttribute("href", "contact.html");
        link.removeAttribute("download");
    }

    // Make profile buttons download the actual company portfolio file.
    if (
        linkText === "download profile" ||
        linkText === "download corporate profile"
    ) {
        link.setAttribute(
            "href",
            "documents/Eloquent%20Global%20Portfolio.pdf.pdf"
        );

        link.setAttribute(
            "download",
            "Eloquent Global Portfolio.pdf"
        );
    }

});


// --------------------------------------------------
// Image path compatibility fixes
// --------------------------------------------------

const imagePathFixes = {
    "images/portfolio/feedback-management.jpg": "images/portfolio/feedback-management.png",
    "images/portfolio/transiti.jpg": "images/portfolio/transiti.png",
    "images/portfolio/community-platform.jpg": "images/portfolio/community-platform.png",
    "images/marketing/digital-marketing.jpg": "images/marketing/digital-marketing.png",
    "images/marketing/video-production.jpg": "images/marketing/video-production.png",
    "images/marketing/commercial-photography.jpg": "images/marketing/commercial-photography.png"
};

const allImages = document.querySelectorAll("img");

allImages.forEach((image) => {

    const currentPath = image.getAttribute("src");

    if (currentPath && imagePathFixes[currentPath]) {
        image.setAttribute("src", imagePathFixes[currentPath]);
    }

});