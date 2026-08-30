const mobileMenuButton =
    document.querySelector(".mobile-menu-button");

const mainNavigation =
    document.querySelector(".main-navigation");

if (mobileMenuButton && mainNavigation) {
    mobileMenuButton.addEventListener("click", () => {
        const isOpen = mainNavigation.classList.toggle("open");
        mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
    });

    const navigationLinks = mainNavigation.querySelectorAll("a");

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mainNavigation.classList.remove("open");
            mobileMenuButton.setAttribute("aria-expanded", "false");
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            mainNavigation.classList.remove("open");
            mobileMenuButton.setAttribute("aria-expanded", "false");
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

    if (linkText === "request a quote") {
        link.setAttribute("href", "contact.html");
        link.removeAttribute("download");
    }

    if (
        linkText === "download profile" ||
        linkText === "download corporate profile"
    ) {
        link.setAttribute(
            "href",
            "documents/Eloquent%20Global%20Portfolio.pdf.pdf"
        );
        link.setAttribute("download", "Eloquent Global Portfolio.pdf");
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

allImages.forEach((image, index) => {
    const currentPath = image.getAttribute("src");

    if (currentPath && imagePathFixes[currentPath]) {
        image.setAttribute("src", imagePathFixes[currentPath]);
    }

    if (index > 0 && !image.hasAttribute("loading")) {
        image.setAttribute("loading", "lazy");
    }

    if (!image.hasAttribute("decoding")) {
        image.setAttribute("decoding", "async");
    }
});

// --------------------------------------------------
// SEO metadata and structured data
// --------------------------------------------------

const siteUrl = "https://eloquentglobal.com";
const defaultSocialImage = `${siteUrl}/images/logo/logo.png`;
const currentFile = window.location.pathname.split("/").pop() || "index.html";

const seoPages = {
    "index.html": {
        title: "Software Development & Digital Marketing Company in Sri Lanka | Eloquent Global",
        description: "Eloquent Global is a Sri Lankan software development and digital marketing company providing custom software, web, mobile, AI, cloud and creative marketing solutions.",
        canonical: `${siteUrl}/`,
        type: "website",
        robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    },
    "about.html": {
        title: "About Eloquent Global | Software & Digital Solutions Company Sri Lanka",
        description: "Learn about Eloquent Global Pvt Ltd, a Sri Lankan software engineering and digital marketing company established in 2019 and operating from Moratuwa.",
        canonical: `${siteUrl}/about.html`,
        type: "website",
        robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    },
    "services.html": {
        title: "Software, Web, Mobile, AI & Digital Marketing Services | Eloquent Global",
        description: "Explore Eloquent Global services including custom software development, web development, mobile apps, AI automation, cloud infrastructure and digital marketing.",
        canonical: `${siteUrl}/services.html`,
        type: "website",
        robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    },
    "portfolio.html": {
        title: "Software & Digital Marketing Portfolio | Eloquent Global",
        description: "Explore selected Eloquent Global work across enterprise software, mobile applications, digital platforms, social media marketing, video production and commercial photography.",
        canonical: `${siteUrl}/portfolio.html`,
        type: "website",
        robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    },
    "leadership.html": {
        title: "Leadership Team | Eloquent Global Pvt Ltd",
        description: "Meet the leadership team guiding Eloquent Global across software engineering, operations, business strategy, creative services and digital marketing.",
        canonical: `${siteUrl}/leadership.html`,
        type: "website",
        robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    },
    "contact.html": {
        title: "Contact Eloquent Global | Software & Marketing Company Sri Lanka",
        description: "Contact Eloquent Global in Moratuwa, Sri Lanka to discuss software development, web and mobile projects, AI solutions, digital marketing or business partnerships.",
        canonical: `${siteUrl}/contact.html`,
        type: "website",
        robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    },
    "requestquote.html": {
        title: "Request a Quote | Eloquent Global Pvt Ltd",
        description: "Contact Eloquent Global to discuss a software development or digital marketing requirement.",
        canonical: `${siteUrl}/contact.html`,
        type: "website",
        robots: "noindex,follow"
    }
};

const seo = seoPages[currentFile] || seoPages["index.html"];

document.title = seo.title;

function setMeta(selector, attribute, value) {
    let element = document.head.querySelector(selector);

    if (!element) {
        element = document.createElement("meta");
        const match = selector.match(/meta\[(name|property)="([^"]+)"\]/);
        if (match) {
            element.setAttribute(match[1], match[2]);
        }
        document.head.appendChild(element);
    }

    element.setAttribute(attribute, value);
}

function setLink(rel, href) {
    let link = document.head.querySelector(`link[rel="${rel}"]`);

    if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
    }

    link.setAttribute("href", href);
}

setMeta('meta[name="description"]', "content", seo.description);
setMeta('meta[name="robots"]', "content", seo.robots);
setMeta('meta[name="googlebot"]', "content", seo.robots);
setMeta('meta[property="og:title"]', "content", seo.title);
setMeta('meta[property="og:description"]', "content", seo.description);
setMeta('meta[property="og:type"]', "content", seo.type);
setMeta('meta[property="og:url"]', "content", seo.canonical);
setMeta('meta[property="og:site_name"]', "content", "Eloquent Global Pvt Ltd");
setMeta('meta[property="og:image"]', "content", defaultSocialImage);
setMeta('meta[property="og:image:alt"]', "content", "Eloquent Global Pvt Ltd");
setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
setMeta('meta[name="twitter:title"]', "content", seo.title);
setMeta('meta[name="twitter:description"]', "content", seo.description);
setMeta('meta[name="twitter:image"]', "content", defaultSocialImage);
setMeta('meta[name="theme-color"]', "content", "#0b1628");

setLink("canonical", seo.canonical);
setLink("icon", `${siteUrl}/images/logo/logo.png`);
setLink("apple-touch-icon", `${siteUrl}/images/logo/logo.png`);

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    "name": "Eloquent Global Pvt Ltd",
    "url": `${siteUrl}/`,
    "logo": `${siteUrl}/images/logo/logo.png`,
    "foundingDate": "2019",
    "description": "Sri Lankan software engineering and digital marketing company providing software, web, mobile, AI, cloud and creative marketing solutions.",
    "email": "mailto:jayamaha007@gmail.com",
    "telephone": "+94 76 370 1223",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Moratuwa",
        "addressCountry": "LK"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+94 76 370 1223",
        "contactType": "sales and customer enquiries",
        "areaServed": "Worldwide",
        "availableLanguage": ["English", "Sinhala"]
    }
};

const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "url": `${siteUrl}/`,
    "name": "Eloquent Global",
    "publisher": {
        "@id": `${siteUrl}/#organization`
    }
};

const pageSchema = {
    "@context": "https://schema.org",
    "@type": currentFile === "contact.html" ? "ContactPage" : currentFile === "portfolio.html" ? "CollectionPage" : currentFile === "about.html" || currentFile === "leadership.html" ? "AboutPage" : "WebPage",
    "@id": `${seo.canonical}#webpage`,
    "url": seo.canonical,
    "name": seo.title,
    "description": seo.description,
    "isPartOf": {
        "@id": `${siteUrl}/#website`
    },
    "about": {
        "@id": `${siteUrl}/#organization`
    }
};

const structuredData = [organizationSchema, webSiteSchema, pageSchema];

if (currentFile === "services.html") {
    structuredData.push({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Eloquent Global Services",
        "itemListElement": [
            "Software Engineering",
            "Web Development",
            "Mobile Application Development",
            "AI and Automation",
            "Cloud and Infrastructure",
            "Digital Marketing"
        ].map((service, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Service",
                "name": service,
                "provider": {
                    "@id": `${siteUrl}/#organization`
                },
                "areaServed": "Worldwide"
            }
        }))
    });
}

if (currentFile !== "index.html" && currentFile !== "requestquote.html") {
    const breadcrumbName = {
        "about.html": "About",
        "services.html": "Services",
        "portfolio.html": "Our Work",
        "leadership.html": "Team",
        "contact.html": "Contact"
    }[currentFile] || "Page";

    structuredData.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${siteUrl}/`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": breadcrumbName,
                "item": seo.canonical
            }
        ]
    });
}

const schemaScript = document.createElement("script");
schemaScript.type = "application/ld+json";
schemaScript.textContent = JSON.stringify(structuredData);
document.head.appendChild(schemaScript);
