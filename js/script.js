const mobileMenuButton = document.querySelector(".mobile-menu-button");
const mainNavigation = document.querySelector(".main-navigation");

if (mobileMenuButton && mainNavigation) {
    mobileMenuButton.addEventListener("click", () => {
        const isOpen = mainNavigation.classList.toggle("open");
        mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
    });

    mainNavigation.querySelectorAll("a").forEach((link) => {
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
// Global CTA and asset compatibility fixes
// --------------------------------------------------

const allLinks = document.querySelectorAll("a");

allLinks.forEach((link) => {
    const linkText = link.textContent.trim().replace(/\s+/g, " ").toLowerCase();

    if (linkText === "request a quote") {
        link.setAttribute("href", "contact.html");
        link.removeAttribute("download");
    }

    if (linkText === "download profile" || linkText === "download corporate profile") {
        link.setAttribute("href", "documents/Eloquent%20Global%20Portfolio.pdf.pdf");
        link.setAttribute("download", "Eloquent Global Portfolio.pdf");
    }
});

const imagePathFixes = {
    "images/portfolio/feedback-management.jpg": "images/portfolio/feedback-management.png",
    "images/portfolio/transiti.jpg": "images/portfolio/transiti.png",
    "images/portfolio/community-platform.jpg": "images/portfolio/community-platform.png",
    "images/marketing/digital-marketing.jpg": "images/marketing/digital-marketing.png",
    "images/marketing/video-production.jpg": "images/marketing/video-production.png",
    "images/marketing/commercial-photography.jpg": "images/marketing/commercial-photography.png"
};

document.querySelectorAll("img").forEach((image, index) => {
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
// Page context
// --------------------------------------------------

const siteUrl = "https://eloquentglobal.com";
const defaultSocialImage = `${siteUrl}/images/logo/logo.png`;
const currentFile = window.location.pathname.split("/").pop() || "index.html";
const commercialPages = [
    "custom-software-development.html",
    "mvp-development.html",
    "saas-development.html",
    "ai-development.html"
];

// --------------------------------------------------
// Shared proof and internal-link styling
// --------------------------------------------------

const seoSupportStyle = document.createElement("style");
seoSupportStyle.textContent = `
    .eg-proof-strip {
        background: #0b1628;
        color: #fff;
        border-top: 1px solid rgba(255,255,255,.08);
        border-bottom: 1px solid rgba(255,255,255,.08);
    }
    .eg-proof-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        background: rgba(255,255,255,.1);
    }
    .eg-proof-item {
        background: #0b1628;
        padding: 26px 24px;
        text-align: center;
    }
    .eg-proof-item strong {
        display: block;
        font-size: clamp(1.7rem, 3vw, 2.4rem);
        line-height: 1;
        margin-bottom: 8px;
    }
    .eg-proof-item span {
        font-size: .84rem;
        letter-spacing: .05em;
        text-transform: uppercase;
        opacity: .78;
    }
    .eg-related-links,
    .eg-work-proof {
        padding: 72px 0;
    }
    .eg-related-links {
        background: #f6f8fa;
        border-top: 1px solid #e5e9ee;
        border-bottom: 1px solid #e5e9ee;
    }
    .eg-related-grid,
    .eg-work-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0,1fr));
        gap: 18px;
        margin-top: 28px;
    }
    .eg-related-grid.eg-related-grid-three {
        grid-template-columns: repeat(3, minmax(0,1fr));
    }
    .eg-related-card,
    .eg-work-card {
        display: block;
        padding: 26px;
        border: 1px solid #dfe5ea;
        background: #fff;
        color: inherit;
        text-decoration: none;
        transition: transform .2s ease, border-color .2s ease;
    }
    .eg-related-card:hover,
    .eg-work-card:hover {
        transform: translateY(-3px);
        border-color: #2f8f67;
    }
    .eg-related-card h3,
    .eg-work-card h3 {
        margin: 0 0 10px;
    }
    .eg-related-card p,
    .eg-work-card p {
        margin: 0;
    }
    .eg-work-proof {
        background: #fff;
    }
    .eg-work-grid {
        grid-template-columns: repeat(3, minmax(0,1fr));
    }
    .eg-work-card span {
        display: inline-block;
        margin-bottom: 12px;
        font-size: .75rem;
        letter-spacing: .08em;
        text-transform: uppercase;
        color: #2f8f67;
        font-weight: 700;
    }
    .eg-section-head {
        max-width: 760px;
    }
    .eg-section-head h2 {
        margin-top: 8px;
        margin-bottom: 12px;
    }
    .eg-section-cta {
        margin-top: 26px;
    }
    @media (max-width: 900px) {
        .eg-related-grid.eg-related-grid-three {
            grid-template-columns: 1fr;
        }
    }
    @media (max-width: 820px) {
        .eg-proof-grid,
        .eg-work-grid,
        .eg-related-grid {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(seoSupportStyle);

function insertAfter(referenceNode, newNode) {
    if (!referenceNode || !referenceNode.parentNode) return;
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function projectProofMarkup(homeStyle = false) {
    if (homeStyle) {
        return `
            <div class="container eg-proof-grid">
                <div class="eg-proof-item"><strong>30+</strong><span>Software Development Projects</span></div>
                <div class="eg-proof-item"><strong>50+</strong><span>Marketing Projects</span></div>
                <div class="eg-proof-item"><strong>2019</strong><span>Established</span></div>
            </div>
        `;
    }

    return `
        <div class="container eg-proof-grid">
            <div class="eg-proof-item"><strong>30+</strong><span>Software Development Projects</span></div>
            <div class="eg-proof-item"><strong>USA · UK · Europe</strong><span>Remote International Delivery</span></div>
            <div class="eg-proof-item"><strong>2019</strong><span>Established</span></div>
        </div>
    `;
}

// --------------------------------------------------
// Homepage project proof + commercial CTA
// --------------------------------------------------

if (currentFile === "index.html") {
    const heroActions = document.querySelector(".hero-actions");

    if (heroActions && !heroActions.querySelector('a[href="custom-software-development.html"]')) {
        const customSoftwareButton = document.createElement("a");
        customSoftwareButton.href = "custom-software-development.html";
        customSoftwareButton.className = "button button-secondary";
        customSoftwareButton.textContent = "Custom Software Development";
        heroActions.appendChild(customSoftwareButton);
    }

    const heroSection = document.querySelector(".hero-section");
    if (heroSection && !document.querySelector(".eg-proof-strip")) {
        const proof = document.createElement("section");
        proof.className = "eg-proof-strip";
        proof.setAttribute("aria-label", "Eloquent Global project experience");
        proof.innerHTML = projectProofMarkup(true);
        insertAfter(heroSection, proof);
    }
}

// --------------------------------------------------
// Services page integration
// --------------------------------------------------

if (currentFile === "services.html") {
    const heroActions = document.querySelector(".services-hero-actions");

    if (heroActions && !heroActions.querySelector('a[href="custom-software-development.html"]')) {
        const customSoftwareButton = document.createElement("a");
        customSoftwareButton.href = "custom-software-development.html";
        customSoftwareButton.className = "button button-secondary";
        customSoftwareButton.textContent = "Custom Software Development";
        heroActions.appendChild(customSoftwareButton);
    }

    const heroSection = document.querySelector(".services-hero-section");
    if (heroSection && !document.querySelector(".eg-proof-strip")) {
        const proof = document.createElement("section");
        proof.className = "eg-proof-strip";
        proof.innerHTML = projectProofMarkup(true);
        insertAfter(heroSection, proof);
    }

    const softwareHeading = [...document.querySelectorAll(".service-capability h3")]
        .find((heading) => heading.textContent.trim() === "Custom Software Development");

    if (softwareHeading) {
        const capability = softwareHeading.closest(".service-capability");
        if (capability && !capability.querySelector('a[href="custom-software-development.html"]')) {
            const link = document.createElement("a");
            link.href = "custom-software-development.html";
            link.className = "text-link";
            link.innerHTML = "Explore custom software development <span>→</span>";
            capability.appendChild(link);
        }
    }

    const aiHeading = [...document.querySelectorAll(".service-detail-section h2, .service-capability h3")]
        .find((heading) => heading.textContent.toLowerCase().includes("intelligent") || heading.textContent.trim() === "AI & Automation");

    if (aiHeading) {
        const aiSection = aiHeading.closest(".service-detail-section") || aiHeading.closest(".service-capability");
        if (aiSection && !aiSection.querySelector('a[href="ai-development.html"]')) {
            const link = document.createElement("a");
            link.href = "ai-development.html";
            link.className = "text-link";
            link.innerHTML = "Explore AI development services <span>→</span>";
            aiSection.appendChild(link);
        }
    }

    const overviewGrid = document.querySelector(".service-overview-grid");
    const serviceCards = [
        ["07", "MVP", "MVP Development", "Focused startup products built from idea to launch-ready first release.", "mvp-development.html"],
        ["08", "SaaS", "SaaS Development", "Custom subscription products, platforms and SaaS applications built for continued growth.", "saas-development.html"],
        ["09", "AI", "AI Development", "Custom AI applications, AI agents and AI-enabled product features built around practical use cases.", "ai-development.html"]
    ];

    serviceCards.forEach(([number, icon, title, copy, href]) => {
        if (overviewGrid && !overviewGrid.querySelector(`a[href="${href}"]`)) {
            const card = document.createElement("a");
            card.href = href;
            card.className = "overview-card";
            card.innerHTML = `
                <span class="overview-number">${number}</span>
                <div class="overview-icon">${icon}</div>
                <h3>${title}</h3>
                <p>${copy}</p>
                <span class="overview-arrow">→</span>
            `;
            overviewGrid.appendChild(card);
        }
    });
}

// --------------------------------------------------
// Commercial service cluster: proof, work and cross-links
// --------------------------------------------------

if (commercialPages.includes(currentFile)) {
    const main = document.querySelector("main");
    const hero = main ? main.querySelector("section") : null;

    if (hero && !document.querySelector(".eg-proof-strip")) {
        const proof = document.createElement("section");
        proof.className = "eg-proof-strip";
        proof.innerHTML = projectProofMarkup(false);
        insertAfter(hero, proof);
    }

    if (main && !document.querySelector(".eg-work-proof")) {
        const workSection = document.createElement("section");
        workSection.className = "eg-work-proof";
        workSection.innerHTML = `
            <div class="container">
                <div class="eg-section-head">
                    <p class="section-eyebrow">Selected Software Work</p>
                    <h2>Experience across 30+ software development projects.</h2>
                    <p>Our wider software portfolio includes web platforms, mobile applications, enterprise systems and connected digital products. Here are selected examples from our work.</p>
                </div>
                <div class="eg-work-grid">
                    <a class="eg-work-card" href="portfolio.html">
                        <span>Enterprise Software</span>
                        <h3>Feedback Management System</h3>
                        <p>A web and mobile platform supporting customer feedback management and real-time reporting.</p>
                    </a>
                    <a class="eg-work-card" href="portfolio.html">
                        <span>Mobile Application</span>
                        <h3>Transiti Rideshare</h3>
                        <p>A mobile carpooling platform featuring vehicle matching, location services and digital payments.</p>
                    </a>
                    <a class="eg-work-card" href="portfolio.html">
                        <span>Web &amp; Mobile Platform</span>
                        <h3>Community Platform</h3>
                        <p>A connected community platform supporting news, events, member interaction and digital services.</p>
                    </a>
                </div>
                <div class="eg-section-cta"><a href="portfolio.html" class="button button-secondary">View Our Software Work</a></div>
            </div>
        `;

        const faq = main.querySelector('section[id="faq"], .mvp-faq-section, .csd-faq-section, .saas-faq-section, .ai-faq-section');
        if (faq) main.insertBefore(workSection, faq);
        else main.appendChild(workSection);
    }

    if (main && !document.querySelector(".eg-related-links")) {
        const relatedMap = {
            "custom-software-development.html": [
                ["MVP Development", "Validate a new product with focused version-one scope and a structured path to launch.", "mvp-development.html"],
                ["SaaS Development", "Build subscription software, multi-user platforms and SaaS products for continued development.", "saas-development.html"],
                ["AI Development", "Add useful AI capabilities to applications, products and business workflows.", "ai-development.html"]
            ],
            "mvp-development.html": [
                ["Custom Software Development", "Build systems and applications around specific operational requirements.", "custom-software-development.html"],
                ["SaaS Development", "Move from a SaaS MVP into a fuller subscription product and long-term roadmap.", "saas-development.html"],
                ["AI Development", "Build and validate AI-enabled product features around a defined user problem.", "ai-development.html"]
            ],
            "saas-development.html": [
                ["MVP Development", "Start a new SaaS concept with a focused MVP designed around validation.", "mvp-development.html"],
                ["Custom Software Development", "Explore custom business platforms, integrations and applications.", "custom-software-development.html"],
                ["AI Development", "Integrate AI agents, intelligent workflows and AI features into digital products.", "ai-development.html"]
            ],
            "ai-development.html": [
                ["Custom Software Development", "Build the wider business platform or application around specific workflows and requirements.", "custom-software-development.html"],
                ["MVP Development", "Validate an AI product concept with a focused version-one release.", "mvp-development.html"],
                ["SaaS Development", "Build AI-enabled SaaS products with user accounts, workflows, integrations and subscriptions.", "saas-development.html"]
            ]
        };

        const links = relatedMap[currentFile];
        const relatedSection = document.createElement("section");
        relatedSection.className = "eg-related-links";
        relatedSection.innerHTML = `
            <div class="container">
                <div class="eg-section-head">
                    <p class="section-eyebrow">Related Development Services</p>
                    <h2>Choose the development path that fits the product and business objective.</h2>
                </div>
                <div class="eg-related-grid eg-related-grid-three">
                    ${links.map(([title, copy, href]) => `
                        <a class="eg-related-card" href="${href}">
                            <h3>${title}</h3>
                            <p>${copy}</p>
                        </a>
                    `).join("")}
                </div>
            </div>
        `;

        const faq = main.querySelector('section[id="faq"], .mvp-faq-section, .csd-faq-section, .saas-faq-section, .ai-faq-section');
        if (faq) main.insertBefore(relatedSection, faq);
        else main.appendChild(relatedSection);
    }
}

// --------------------------------------------------
// Portfolio proof
// --------------------------------------------------

if (currentFile === "portfolio.html") {
    const main = document.querySelector("main");
    const firstSection = main ? main.querySelector("section") : null;

    if (firstSection && !document.querySelector(".eg-proof-strip")) {
        const proof = document.createElement("section");
        proof.className = "eg-proof-strip";
        proof.innerHTML = projectProofMarkup(true);
        insertAfter(firstSection, proof);
    }
}

// --------------------------------------------------
// SEO metadata
// --------------------------------------------------

const seoPages = {
    "index.html": {
        title: "Software Development & Digital Marketing Company | Eloquent Global",
        description: "Eloquent Global delivers custom software, web, mobile, AI, cloud and digital marketing solutions, backed by 30+ software development projects and 50+ marketing projects.",
        canonical: `${siteUrl}/`, type: "website", robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    },
    "about.html": {
        title: "About Eloquent Global | Software & Digital Solutions Company",
        description: "Learn about Eloquent Global Pvt Ltd, a Sri Lankan software engineering and digital marketing company established in 2019 and serving international clients through remote delivery.",
        canonical: `${siteUrl}/about.html`, type: "website", robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    },
    "services.html": {
        title: "Software, MVP, SaaS & AI Development Services | Eloquent Global",
        description: "Explore Eloquent Global services including custom software, MVP development, SaaS development, AI development, web and mobile applications, cloud and digital marketing.",
        canonical: `${siteUrl}/services.html`, type: "website", robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    },
    "custom-software-development.html": {
        title: "Custom Software Development Company | Eloquent Global",
        description: "Custom software development for businesses in the USA, UK and Europe, backed by experience across 30+ software development projects.",
        canonical: `${siteUrl}/custom-software-development.html`, type: "website", robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    },
    "mvp-development.html": {
        title: "MVP Development Services for Startups | Eloquent Global",
        description: "MVP development services for startups in the USA, UK and Europe, from product planning and UX/UI through engineering, testing, launch and iteration.",
        canonical: `${siteUrl}/mvp-development.html`, type: "website", robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    },
    "saas-development.html": {
        title: "SaaS Development Company | Eloquent Global",
        description: "SaaS development services for startups and businesses in the USA, UK and Europe, covering product planning, UX/UI, engineering, integrations and post-launch development.",
        canonical: `${siteUrl}/saas-development.html`, type: "website", robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    },
    "ai-development.html": {
        title: "AI Development Company | Eloquent Global",
        description: "AI development services for businesses and startups in the USA, UK and Europe, including custom AI applications, AI agents and AI-enabled software products.",
        canonical: `${siteUrl}/ai-development.html`, type: "website", robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    },
    "portfolio.html": {
        title: "Software & Digital Marketing Portfolio | Eloquent Global",
        description: "Explore selected Eloquent Global work from experience across 30+ software development projects and 50+ marketing projects.",
        canonical: `${siteUrl}/portfolio.html`, type: "website", robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    },
    "leadership.html": {
        title: "Leadership Team | Eloquent Global Pvt Ltd",
        description: "Meet the leadership team guiding Eloquent Global across software engineering, operations, business strategy, creative services and digital marketing.",
        canonical: `${siteUrl}/leadership.html`, type: "website", robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    },
    "contact.html": {
        title: "Contact Eloquent Global | Software & Digital Services",
        description: "Contact Eloquent Global to discuss custom software, MVP development, SaaS products, AI development, web or mobile products, digital marketing or an international partnership.",
        canonical: `${siteUrl}/contact.html`, type: "website", robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    },
    "requestquote.html": {
        title: "Request a Quote | Eloquent Global Pvt Ltd",
        description: "Contact Eloquent Global to discuss a software development or digital marketing requirement.",
        canonical: `${siteUrl}/contact.html`, type: "website", robots: "noindex,follow"
    }
};

const seo = seoPages[currentFile] || seoPages["index.html"];
document.title = seo.title;

function setMeta(selector, attribute, value) {
    let element = document.head.querySelector(selector);
    if (!element) {
        element = document.createElement("meta");
        const match = selector.match(/meta\[(name|property)="([^"]+)"\]/);
        if (match) element.setAttribute(match[1], match[2]);
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

// --------------------------------------------------
// Structured data for pages without static JSON-LD
// --------------------------------------------------

const hasStaticJsonLd = Boolean(document.head.querySelector('script[type="application/ld+json"]'));

if (!hasStaticJsonLd) {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "Eloquent Global Pvt Ltd",
        "url": `${siteUrl}/`,
        "logo": `${siteUrl}/images/logo/logo.png`,
        "foundingDate": "2019",
        "description": "Software engineering and digital marketing company serving businesses and startups through international remote delivery.",
        "email": "mailto:jayamaha007@gmail.com",
        "telephone": "+94 76 370 1223",
        "address": {"@type": "PostalAddress", "addressLocality": "Moratuwa", "addressCountry": "LK"},
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
        "publisher": {"@id": `${siteUrl}/#organization`}
    };

    const pageSchema = {
        "@context": "https://schema.org",
        "@type": currentFile === "contact.html" ? "ContactPage" : currentFile === "portfolio.html" ? "CollectionPage" : currentFile === "about.html" || currentFile === "leadership.html" ? "AboutPage" : "WebPage",
        "@id": `${seo.canonical}#webpage`,
        "url": seo.canonical,
        "name": seo.title,
        "description": seo.description,
        "isPartOf": {"@id": `${siteUrl}/#website`},
        "about": {"@id": `${siteUrl}/#organization`}
    };

    const structuredData = [organizationSchema, webSiteSchema, pageSchema];

    if (currentFile === "services.html") {
        structuredData.push({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Eloquent Global Services",
            "itemListElement": [
                ["Custom Software Development", `${siteUrl}/custom-software-development.html`],
                ["MVP Development for Startups", `${siteUrl}/mvp-development.html`],
                ["SaaS Development", `${siteUrl}/saas-development.html`],
                ["AI Development", `${siteUrl}/ai-development.html`],
                ["Software Engineering", `${siteUrl}/services.html#software-engineering`],
                ["Web Development", `${siteUrl}/services.html#web-solutions`],
                ["Mobile Application Development", `${siteUrl}/services.html#mobile-applications`],
                ["AI and Automation", `${siteUrl}/services.html#ai-automation`],
                ["Cloud and Infrastructure", `${siteUrl}/services.html#cloud-infrastructure`],
                ["Digital Marketing", `${siteUrl}/services.html#digital-marketing`]
            ].map((service, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Service",
                    "name": service[0],
                    "url": service[1],
                    "provider": {"@id": `${siteUrl}/#organization`},
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
                {"@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/`},
                {"@type": "ListItem", "position": 2, "name": breadcrumbName, "item": seo.canonical}
            ]
        });
    }

    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.textContent = JSON.stringify(structuredData);
    document.head.appendChild(schemaScript);
}
