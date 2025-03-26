import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'tabs-image';
      else div.className = 'tabs-body';
    });
    ul.append(li);
  });
  ul.style.backgroundImage = "url('"+ul.querySelectorAll('picture > img')[0].src+"')";
  

  /*
  ul.querySelectorAll('picture > img').forEach((img) => { 
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  });
  */

  block.textContent = '';
  block.append(ul);
}

// Set first tab as active
document.querySelectorAll('.tabs-container .tabs-wrapper .tabs table tr td')[0].classList.add('active');

// Add event listener to all tabs
document.querySelectorAll('.tabs-container .tabs-wrapper .tabs table tr td h4').forEach((tab) => {
  tab.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('clicked on tab', tab);

    // Remove active class from all tabs
    const allTabs = tab.closest('tr').querySelectorAll('td');
    allTabs.forEach(td => td.classList.remove('active'));
    
    // Add active class to clicked tab's parent td
    tab.parentElement.classList.add('active');

    showTab();
  });
});


async function showTab() {
    // Get selected tab text
    const activeTab = document.querySelectorAll('.tabs-container .tabs-wrapper .tabs table tr td.active h4')[0];
    const selectedTabText = activeTab.textContent.trim();
    console.log('selected tab text:', selectedTabText);

    // Find all li elements after the table
    const allLiElements = activeTab.closest('.tabs').querySelectorAll('ul li');
    // Remove active display from all li elements first
    allLiElements.forEach(li => {
      li.classList.remove('active');
    });

    // Find li with matching heading text and show it
    allLiElements.forEach(li => {
      const liHeading = li.querySelector('h4');
      if (liHeading && liHeading.textContent.trim() === selectedTabText) {
        li.classList.add('active');
      }
    });
}

setTimeout(() => {
  document.querySelectorAll('.tabs-container .tabs-wrapper .tabs table tr td')[0].getElementsByTagName('h4')[0].click();
}, 1000);