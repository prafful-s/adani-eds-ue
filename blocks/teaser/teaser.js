// import { createOptimizedPicture } from '../../scripts/aem.js';

// export default function decorate(block) {
//   console.log("teaser component called successfully");
//   /* change to ul, li */
//   const ul = document.createElement('ul');
//   [...block.children].forEach((row) => {
//     const li = document.createElement('li');
//     while (row.firstElementChild) li.append(row.firstElementChild);
//     [...li.children].forEach((div) => {
//       if (div.children.length === 1 && div.querySelector('picture')) div.className = 'teaser-image';
//       else div.className = 'teaser-body';
//     });
//     ul.append(li);
//   });
//   ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
//   block.textContent = '';
//   block.append(ul);
// }
