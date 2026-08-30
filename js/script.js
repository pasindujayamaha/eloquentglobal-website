const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mainNavigation = document.querySelector('.main-navigation');

if (mobileMenuButton && mainNavigation) {
    mobileMenuButton.addEventListener('click', () => {
        const isOpen = mainNavigation.classList.toggle('open');
        mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
    });
    mainNavigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        mainNavigation.classList.remove('open');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
    }));
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            mainNavigation.classList.remove('open');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    });
}

document.querySelectorAll('a').forEach(link => {
    const text = link.textContent.trim().replace(/\s+/g, ' ').toLowerCase();
    if (text === 'request a quote') {
        link.href = 'contact.html';
        link.removeAttribute('download');
    }
    if (text === 'download profile' || text === 'download corporate profile') {
        link.href = 'documents/Eloquent%20Global%20Portfolio.pdf.pdf';
        link.setAttribute('download', 'Eloquent Global Portfolio.pdf');
    }
});

const imagePathFixes = {
    'images/portfolio/feedback-management.jpg': 'images/portfolio/feedback-management.png',
    'images/portfolio/transiti.jpg': 'images/portfolio/transiti.png',
    'images/portfolio/community-platform.jpg': 'images/portfolio/community-platform.png',
    'images/marketing/digital-marketing.jpg': 'images/marketing/digital-marketing.png',
    'images/marketing/video-production.jpg': 'images/marketing/video-production.png',
    'images/marketing/commercial-photography.jpg': 'images/marketing/commercial-photography.png'
};

document.querySelectorAll('img').forEach((image, index) => {
    const src = image.getAttribute('src');
    if (src && imagePathFixes[src]) image.src = imagePathFixes[src];
    if (index > 0 && !image.hasAttribute('loading')) image.loading = 'lazy';
    if (!image.hasAttribute('decoding')) image.decoding = 'async';
});

const siteUrl = 'https://eloquentglobal.com';
const defaultSocialImage = `${siteUrl}/images/logo/logo.png`;
const currentFile = window.location.pathname.split('/').pop() || 'index.html';

function addCustomSoftwareButton(container) {
    if (!container || container.querySelector('a[href="custom-software-development.html"]')) return;
    const button = document.createElement('a');
    button.href = 'custom-software-development.html';
    button.className = 'button button-secondary';
    button.textContent = 'Custom Software Development';
    container.appendChild(button);
}

if (currentFile === 'index.html') {
    addCustomSoftwareButton(document.querySelector('.hero-actions'));
}

if (currentFile === 'services.html') {
    addCustomSoftwareButton(document.querySelector('.services-hero-actions'));

    const softwareHeading = [...document.querySelectorAll('.service-capability h3')]
        .find(h => h.textContent.trim() === 'Custom Software Development');
    if (softwareHeading) {
        const capability = softwareHeading.closest('.service-capability');
        if (capability && !capability.querySelector('.text-link')) {
            const link = document.createElement('a');
            link.href = 'custom-software-development.html';
            link.className = 'text-link';
            link.innerHTML = 'Explore custom software development <span>→</span>';
            capability.appendChild(link);
        }
    }

    const overviewGrid = document.querySelector('.service-overview-grid');
    if (overviewGrid && !overviewGrid.querySelector('a[href="mvp-development.html"]')) {
        const mvpCard = document.createElement('a');
        mvpCard.href = 'mvp-development.html';
        mvpCard.className = 'overview-card';
        mvpCard.innerHTML = '<span class="overview-number">07</span><div class="overview-icon">MVP</div><h3>MVP Development</h3><p>Focused startup products built from idea to launch-ready first release.</p><span class="overview-arrow">→</span>';
        overviewGrid.appendChild(mvpCard);
    }
}

const seoPages = {
    'index.html': {title:'Software Development & Digital Marketing Company | Eloquent Global',description:'Eloquent Global provides custom software, web, mobile, AI, cloud and digital marketing solutions for businesses and startups, including clients in the USA, UK and Europe.',canonical:`${siteUrl}/`,robots:'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'},
    'about.html': {title:'About Eloquent Global | Software & Digital Solutions Company',description:'Learn about Eloquent Global Pvt Ltd, a Sri Lankan software engineering and digital marketing company established in 2019 and serving international clients through remote delivery.',canonical:`${siteUrl}/about.html`,robots:'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'},
    'services.html': {title:'Software, MVP, Web, Mobile, AI & Digital Marketing Services | Eloquent Global',description:'Explore Eloquent Global services including custom software, MVP development, web and mobile applications, AI automation, cloud infrastructure and digital marketing.',canonical:`${siteUrl}/services.html`,robots:'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'},
    'custom-software-development.html': {title:'Custom Software Development Company | Eloquent Global',description:'Custom software development services for businesses in the USA, UK and Europe. Eloquent Global designs and builds scalable web platforms, internal systems, integrations and business applications.',canonical:`${siteUrl}/custom-software-development.html`,robots:'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'},
    'mvp-development.html': {title:'MVP Development Services for Startups | Eloquent Global',description:'MVP development services for startups in the USA, UK and Europe. Eloquent Global helps founders plan, design, build, test and launch scalable web, mobile, SaaS and AI MVPs.',canonical:`${siteUrl}/mvp-development.html`,robots:'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'},
    'portfolio.html': {title:'Software & Digital Marketing Portfolio | Eloquent Global',description:'Explore selected Eloquent Global work across enterprise software, mobile applications, digital platforms, social media marketing, video production and commercial photography.',canonical:`${siteUrl}/portfolio.html`,robots:'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'},
    'leadership.html': {title:'Leadership Team | Eloquent Global Pvt Ltd',description:'Meet the leadership team guiding Eloquent Global across software engineering, operations, business strategy, creative services and digital marketing.',canonical:`${siteUrl}/leadership.html`,robots:'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'},
    'contact.html': {title:'Contact Eloquent Global | Software & Digital Services',description:'Contact Eloquent Global to discuss custom software, MVP development, web or mobile products, AI solutions, digital marketing or an international business partnership.',canonical:`${siteUrl}/contact.html`,robots:'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'},
    'requestquote.html': {title:'Request a Quote | Eloquent Global Pvt Ltd',description:'Contact Eloquent Global to discuss a software development or digital marketing requirement.',canonical:`${siteUrl}/contact.html`,robots:'noindex,follow'}
};

const seo = seoPages[currentFile] || seoPages['index.html'];
document.title = seo.title;

function setMeta(selector, attribute, value) {
    let element = document.head.querySelector(selector);
    if (!element) {
        element = document.createElement('meta');
        const match = selector.match(/meta\[(name|property)="([^"]+)"\]/);
        if (match) element.setAttribute(match[1], match[2]);
        document.head.appendChild(element);
    }
    element.setAttribute(attribute, value);
}
function setLink(rel, href) {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
    }
    link.href = href;
}

setMeta('meta[name="description"]','content',seo.description);
setMeta('meta[name="robots"]','content',seo.robots);
setMeta('meta[name="googlebot"]','content',seo.robots);
setMeta('meta[property="og:title"]','content',seo.title);
setMeta('meta[property="og:description"]','content',seo.description);
setMeta('meta[property="og:type"]','content','website');
setMeta('meta[property="og:url"]','content',seo.canonical);
setMeta('meta[property="og:site_name"]','content','Eloquent Global Pvt Ltd');
setMeta('meta[property="og:image"]','content',defaultSocialImage);
setMeta('meta[property="og:image:alt"]','content','Eloquent Global Pvt Ltd');
setMeta('meta[name="twitter:card"]','content','summary_large_image');
setMeta('meta[name="twitter:title"]','content',seo.title);
setMeta('meta[name="twitter:description"]','content',seo.description);
setMeta('meta[name="twitter:image"]','content',defaultSocialImage);
setMeta('meta[name="theme-color"]','content','#0b1628');
setLink('canonical',seo.canonical);
setLink('icon',defaultSocialImage);
setLink('apple-touch-icon',defaultSocialImage);

const organizationSchema = {'@context':'https://schema.org','@type':'Organization','@id':`${siteUrl}/#organization`,'name':'Eloquent Global Pvt Ltd','url':`${siteUrl}/`,'logo':defaultSocialImage,'foundingDate':'2019','description':'Software engineering and digital marketing company serving businesses and startups through international remote delivery.','email':'mailto:jayamaha007@gmail.com','telephone':'+94 76 370 1223','address':{'@type':'PostalAddress','addressLocality':'Moratuwa','addressCountry':'LK'},'contactPoint':{'@type':'ContactPoint','telephone':'+94 76 370 1223','contactType':'sales and customer enquiries','areaServed':'Worldwide','availableLanguage':['English','Sinhala']}};
const webSiteSchema = {'@context':'https://schema.org','@type':'WebSite','@id':`${siteUrl}/#website`,'url':`${siteUrl}/`,'name':'Eloquent Global','publisher':{'@id':`${siteUrl}/#organization`}};
const pageSchema = {'@context':'https://schema.org','@type':currentFile==='contact.html'?'ContactPage':currentFile==='portfolio.html'?'CollectionPage':(currentFile==='about.html'||currentFile==='leadership.html')?'AboutPage':'WebPage','@id':`${seo.canonical}#webpage`,'url':seo.canonical,'name':seo.title,'description':seo.description,'isPartOf':{'@id':`${siteUrl}/#website`},'about':{'@id':`${siteUrl}/#organization`}};
const structuredData = [organizationSchema,webSiteSchema,pageSchema];

if (currentFile === 'services.html') {
    const services = [
        ['Custom Software Development',`${siteUrl}/custom-software-development.html`],
        ['Software Engineering',`${siteUrl}/services.html#software-engineering`],
        ['Web Development',`${siteUrl}/services.html#web-solutions`],
        ['Mobile Application Development',`${siteUrl}/services.html#mobile-applications`],
        ['AI and Automation',`${siteUrl}/services.html#ai-automation`],
        ['Cloud and Infrastructure',`${siteUrl}/services.html#cloud-infrastructure`],
        ['Digital Marketing',`${siteUrl}/services.html#digital-marketing`],
        ['MVP Development for Startups',`${siteUrl}/mvp-development.html`]
    ];
    structuredData.push({'@context':'https://schema.org','@type':'ItemList','name':'Eloquent Global Services','itemListElement':services.map((s,i)=>({'@type':'ListItem','position':i+1,'item':{'@type':'Service','name':s[0],'url':s[1],'provider':{'@id':`${siteUrl}/#organization`},'areaServed':'Worldwide'}}))});
}

if (currentFile === 'mvp-development.html' || currentFile === 'custom-software-development.html') {
    const isMvp = currentFile === 'mvp-development.html';
    structuredData.push({'@context':'https://schema.org','@type':'Service','@id':`${seo.canonical}#service`,'name':isMvp?'MVP Development Services for Startups':'Custom Software Development Services','serviceType':isMvp?'Minimum Viable Product development':'Custom software development','provider':{'@id':`${siteUrl}/#organization`},'areaServed':['United States','United Kingdom','Europe'],'description':seo.description});
}

if (currentFile !== 'index.html' && currentFile !== 'requestquote.html') {
    const names = {'about.html':'About','services.html':'Services','custom-software-development.html':'Custom Software Development','mvp-development.html':'MVP Development','portfolio.html':'Our Work','leadership.html':'Team','contact.html':'Contact'};
    const name = names[currentFile] || 'Page';
    const items = [{'@type':'ListItem','position':1,'name':'Home','item':`${siteUrl}/`}];
    if (currentFile === 'mvp-development.html' || currentFile === 'custom-software-development.html') {
        items.push({'@type':'ListItem','position':2,'name':'Services','item':`${siteUrl}/services.html`});
        items.push({'@type':'ListItem','position':3,'name':name,'item':seo.canonical});
    } else {
        items.push({'@type':'ListItem','position':2,'name':name,'item':seo.canonical});
    }
    structuredData.push({'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':items});
}

const schemaScript = document.createElement('script');
schemaScript.type = 'application/ld+json';
schemaScript.textContent = JSON.stringify(structuredData);
document.head.appendChild(schemaScript);
