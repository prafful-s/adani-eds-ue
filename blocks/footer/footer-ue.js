function transformToAdaniFooter() {
  // Get the original footer or container element
  const originalFooter = document.querySelector('#original-footer') || document.querySelector('footer');
  
  if (!originalFooter) {
    console.error('No footer or target element found');
    return;
  }
  
  // Create a wrapper to hold our new footer temporarily
  const tempWrapper = document.createElement('div');
  tempWrapper.style.display = 'none';
  document.body.appendChild(tempWrapper);
  
  // Clone the original footer to preserve the original content
  const clonedContent = originalFooter.cloneNode(true);
  tempWrapper.appendChild(clonedContent);
  
  // Extract content from the original structure
  
  // 1. Find business links
  const businessLinks = Array.from(tempWrapper.querySelectorAll('a, li'))
    .filter(element => {
      const text = element.textContent.toLowerCase().trim();
      return text.includes('enterprise') || 
             text.includes('logistics') || 
             text.includes('energy') ||
             text.includes('utilities') ||
             text.includes('transportation');
    })
    .map(element => {
      const link = element.tagName === 'A' ? element : element.querySelector('a');
      return {
        text: (link || element).textContent.trim(),
        href: link ? link.getAttribute('href') || '#' : '#'
      };
    });
  
  // 2. Find sustainability links
  const sustainabilityLinks = Array.from(tempWrapper.querySelectorAll('a, li'))
    .filter(element => {
      const text = element.textContent.toLowerCase().trim();
      return text.includes('environment') || 
             text.includes('community') || 
             text.includes('sustainability') ||
             text.includes('management') ||
             text.includes('safety');
    })
    .map(element => {
      const link = element.tagName === 'A' ? element : element.querySelector('a');
      return {
        text: (link || element).textContent.trim(),
        href: link ? link.getAttribute('href') || '#' : '#'
      };
    });
  
  // 3. Find quick links (about, contact, etc.)
  const quickLinks = Array.from(tempWrapper.querySelectorAll('a, li'))
    .filter(element => {
      const text = element.textContent.toLowerCase().trim();
      return text.includes('about') || 
             text.includes('contact') || 
             text.includes('careers') ||
             text.includes('blog') ||
             text.includes('sports') ||
             text.includes('download');
    })
    .map(element => {
      const link = element.tagName === 'A' ? element : element.querySelector('a');
      return {
        text: (link || element).textContent.trim(),
        href: link ? link.getAttribute('href') || '#' : '#'
      };
    });
  
  // 4. Find social media links
  const socialLinks = Array.from(tempWrapper.querySelectorAll('a'))
    .filter(link => {
      const href = link.getAttribute('href') || '';
      const hasIcon = link.querySelector('i, svg, img');
      return hasIcon || 
             href.includes('facebook') || 
             href.includes('twitter') ||
             href.includes('linkedin') ||
             href.includes('instagram') ||
             href.includes('youtube');
    })
    .map(link => {
      let networkName = 'default';
      const href = link.getAttribute('href') || '#';
      
      if (href.includes('facebook') || link.className.includes('facebook')) networkName = 'facebook';
      else if (href.includes('twitter') || link.className.includes('twitter')) networkName = 'twitter';
      else if (href.includes('linkedin') || link.className.includes('linkedin')) networkName = 'linkedin';
      else if (href.includes('instagram') || link.className.includes('instagram')) networkName = 'instagram';
      else if (href.includes('youtube') || link.className.includes('youtube')) networkName = 'youtube';
      
      return {
        network: networkName,
        href: href
      };
    });
  
  // 5. Extract legal links and copyright
  const legalLinks = Array.from(tempWrapper.querySelectorAll('a, li'))
    .filter(element => {
      const text = element.textContent.toLowerCase().trim();
      return text.includes('privacy') || 
             text.includes('terms') || 
             text.includes('legal') ||
             text.includes('disclaimer') ||
             text.includes('sitemap');
    })
    .map(element => {
      const link = element.tagName === 'A' ? element : element.querySelector('a');
      return {
        text: (link || element).textContent.trim(),
        href: link ? link.getAttribute('href') || '#' : '#'
      };
    });
  
  // Find copyright text
  let copyrightText = '';
  const potentialCopyrightElements = tempWrapper.querySelectorAll('p, div, span');
  for (const element of potentialCopyrightElements) {
    if (element.textContent.includes('©') || 
        element.textContent.toLowerCase().includes('copyright')) {
      copyrightText = element.textContent.trim();
      break;
    }
  }
  
  // If no copyright was found, create a default one
  if (!copyrightText) {
    copyrightText = `© ${new Date().getFullYear()} Adani Group`;
  }
  
  // Try to find a logo in the original footer
  let logoSrc = '';
  const potentialLogos = tempWrapper.querySelectorAll('img');
  for (const img of potentialLogos) {
    const src = img.getAttribute('src') || '';
    const alt = img.getAttribute('alt') || '';
    if (src && (
        src.toLowerCase().includes('logo') || 
        alt.toLowerCase().includes('logo') || 
        src.toLowerCase().includes('brand') ||
        img.closest('[class*="logo"]') ||
        img.closest('[id*="logo"]')
    )) {
      logoSrc = src;
      break;
    }
  }
  
  // Clean up the temporary element
  tempWrapper.remove();
  
  // Now create the new Adani-style footer using the extracted content
  const footer = document.createElement('footer');
  footer.className = 'footer';
  
  // Create the main footer container
  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer-container';
  
  // 1. BUSINESSES COLUMN
  const businessesColumn = document.createElement('div');
  businessesColumn.className = 'footer-column';
  
  const businessesTitle = document.createElement('h3');
  businessesTitle.className = 'footer-title';
  businessesTitle.textContent = 'Businesses';
  
  const businessesList = document.createElement('ul');
  businessesList.className = 'footer-links';
  
  // Use extracted business links or defaults
  if (businessLinks.length < 3) {
    const defaultBusinesses = [
      {text: 'Energy and Utilities', href: '#'},
      {text: 'Transportation and Logistics', href: '#'},
      {text: 'Incubation', href: '#'},
      {text: 'Others', href: '#'},
      {text: 'Adani Enterprises Ltd', href: '#'},
      {text: 'Adani Ports and SEZ Ltd', href: '#'}
    ];
    
    const combinedLinks = [...businessLinks];
    for (const defaultBusiness of defaultBusinesses) {
      if (!combinedLinks.some(link => link.text === defaultBusiness.text)) {
        combinedLinks.push(defaultBusiness);
      }
    }
    
    for (const business of combinedLinks.slice(0, 7)) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = business.href;
      a.textContent = business.text;
      li.appendChild(a);
      businessesList.appendChild(li);
    }
  } else {
    for (const business of businessLinks.slice(0, 7)) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = business.href;
      a.textContent = business.text;
      li.appendChild(a);
      businessesList.appendChild(li);
    }
  }
  
  businessesColumn.appendChild(businessesTitle);
  businessesColumn.appendChild(businessesList);
  
  // 2. SUSTAINABILITY COLUMN
  const sustainabilityColumn = document.createElement('div');
  sustainabilityColumn.className = 'footer-column';
  
  const sustainabilityTitle = document.createElement('h3');
  sustainabilityTitle.className = 'footer-title';
  sustainabilityTitle.textContent = 'Sustainability';
  
  const sustainabilityList = document.createElement('ul');
  sustainabilityList.className = 'footer-links';
  
  // Use extracted sustainability links or defaults
  if (sustainabilityLinks.length < 3) {
    const defaultSustainability = [
      {text: 'Communities', href: '#'},
      {text: 'Environment', href: '#'},
      {text: 'Safety First', href: '#'},
      {text: 'Waste Management', href: '#'},
      {text: 'Water Management', href: '#'},
      {text: 'Operational Efficiency', href: '#'}
    ];
    
    const combinedLinks = [...sustainabilityLinks];
    for (const defaultItem of defaultSustainability) {
      if (!combinedLinks.some(link => link.text === defaultItem.text)) {
        combinedLinks.push(defaultItem);
      }
    }
    
    for (const item of combinedLinks.slice(0, 6)) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.text;
      li.appendChild(a);
      sustainabilityList.appendChild(li);
    }
  } else {
    for (const item of sustainabilityLinks.slice(0, 6)) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.text;
      li.appendChild(a);
      sustainabilityList.appendChild(li);
    }
  }
  
  sustainabilityColumn.appendChild(sustainabilityTitle);
  sustainabilityColumn.appendChild(sustainabilityList);
  
  // 3. QUICK LINKS COLUMN
  const quickLinksColumn = document.createElement('div');
  quickLinksColumn.className = 'footer-column';
  
  const quickLinksTitle = document.createElement('h3');
  quickLinksTitle.className = 'footer-title';
  quickLinksTitle.textContent = 'Quick Links';
  
  const quickLinksList = document.createElement('ul');
  quickLinksList.className = 'footer-links';
  
  // Use extracted quick links or defaults
  if (quickLinks.length < 3) {
    const defaultQuickLinks = [
      {text: 'About us', href: '#'},
      {text: 'Sports', href: '#'},
      {text: 'Blogs', href: '#'},
      {text: 'Contact us', href: '#'},
      {text: 'Downloads', href: '#'},
      {text: 'Careers', href: '#'}
    ];
    
    const combinedLinks = [...quickLinks];
    for (const defaultLink of defaultQuickLinks) {
      if (!combinedLinks.some(link => link.text === defaultLink.text)) {
        combinedLinks.push(defaultLink);
      }
    }
    
    for (const link of combinedLinks.slice(0, 7)) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.text;
      li.appendChild(a);
      quickLinksList.appendChild(li);
    }
  } else {
    for (const link of quickLinks.slice(0, 7)) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.text;
      li.appendChild(a);
      quickLinksList.appendChild(li);
    }
  }
  
  quickLinksColumn.appendChild(quickLinksTitle);
  quickLinksColumn.appendChild(quickLinksList);
  
  // 4. LOGO COLUMN
  const logoColumn = document.createElement('div');
  logoColumn.className = 'footer-column logo-column';
  
  // Create logo container
  const logoContainer = document.createElement('div');
  logoContainer.className = 'footer-logo';
  
  // Create logo image or fallback to a text logo
  if (logoSrc) {
    const logoImg = document.createElement('img');
    logoImg.src = logoSrc;
    logoImg.alt = 'Adani Group Logo';
    logoImg.className = 'footer-logo-img';
    logoContainer.appendChild(logoImg);
  } else {
    // If no logo is found, create a text-based logo
    const textLogo = document.createElement('div');
    textLogo.className = 'footer-text-logo';
    textLogo.textContent = 'ADANI';
    
    const tagline = document.createElement('div');
    tagline.className = 'footer-tagline';
    tagline.textContent = 'Growth with Goodness';
    
    logoContainer.appendChild(textLogo);
    logoContainer.appendChild(tagline);
  }
  
  // Add a brief about text below the logo
  const aboutText = document.createElement('p');
  aboutText.className = 'footer-about-text';
  aboutText.textContent = 'From building assets of national relevance to transforming lives through self-reliance and sustainability, our vision is balancing growth with goodness.';
  
  logoColumn.appendChild(logoContainer);
  logoColumn.appendChild(aboutText);
  
  // Add all columns to the container
  footerContainer.appendChild(businessesColumn);
  footerContainer.appendChild(sustainabilityColumn);
  footerContainer.appendChild(quickLinksColumn);
  footerContainer.appendChild(logoColumn);
 
  
  // Copyright section
  const copyright = document.createElement('div');
  copyright.className = 'copyright';
  copyright.textContent = copyrightText;
  
  // Assemble the complete footer
  footer.appendChild(footerContainer);
  
  // Replace the original footer with our new one
  originalFooter.parentNode.replaceChild(footer, originalFooter);
 
  
  return footer;
}


// Run the transformation when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add Font Awesome if not already present
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    document.head.appendChild(fontAwesome);
  }
  
  // Transform the footer
  transformToAdaniFooter();
});

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  const parentPath = pathSegments.length > 1 ? `/${pathSegments.slice(0, -1).join('/')}/` : '/';
  //const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const footerPath = parentPath=='/' ? footerMeta ? new URL(footerMeta, window.location).pathname : '/footer' : footerMeta ? new URL(footerMeta, window.location).pathname : parentPath+'/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
