// const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// function embedYoutube(url, autoplay, background) {
//   const usp = new URLSearchParams(url.search);
//   let suffix = '';
//   if (background || autoplay) {
//     const suffixParams = {
//       autoplay: autoplay ? '1' : '0',
//       mute: background ? '1' : '0',
//       controls: background ? '0' : '1',
//       disablekb: background ? '1' : '0',
//       loop: background ? '1' : '0',
//       playsinline: background ? '1' : '0',
//     };
//     suffix = `&${Object.entries(suffixParams).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')}`;
//   }
//   let vid = usp.get('v') ? encodeURIComponent(usp.get('v')) : '';
//   const embed = url.pathname;
//   if (url.origin.includes('youtu.be')) {
//     [, vid] = url.pathname.split('/');
//   }

//   const temp = document.createElement('div');
//   temp.innerHTML = `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
//       <iframe src="https://www.youtube.com${vid ? `/embed/${vid}?rel=0&v=${vid}${suffix}` : embed}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" 
//       allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture" allowfullscreen="" scrolling="no" title="Content from Youtube" loading="lazy"></iframe>
//     </div>`;
//   return temp.children.item(0);
// }

// function getVideoElement(source, autoplay, background) {
//   const video = document.createElement('video');
//   video.setAttribute('controls', '');
//   if (autoplay) video.setAttribute('autoplay', '');
//   if (background) {
//     video.setAttribute('loop', '');
//     video.setAttribute('playsinline', '');
//     video.removeAttribute('controls');
//     video.addEventListener('canplay', () => {
//       video.muted = true;
//       if (autoplay) video.play();
//     });
//   }

//   const sourceEl = document.createElement('source');
//   sourceEl.setAttribute('src', source);
//   sourceEl.setAttribute('type', `video/mp4`);
//   video.append(sourceEl);

//   return video;
// }

// const loadVideoEmbed = (block, link, autoplay, background) => {
//   if (block.dataset.embedLoaded === 'true') {
//     return;
//   }
//   const url = new URL(link);

//   const isYoutube = link.includes('youtube') || link.includes('youtu.be');

//   if (isYoutube) {
//     const embedWrapper = embedYoutube(url, autoplay, background);
//     block.append(embedWrapper);
//     embedWrapper.querySelector('iframe').addEventListener('load', () => {
//       block.dataset.embedLoaded = true;
//     });
//   } else {
//     const videoEl = getVideoElement(link, autoplay, background);
//     block.append(videoEl);
//     videoEl.addEventListener('canplay', () => {
//       block.dataset.embedLoaded = true;
//     });
//   }
// };

// export default function decorate(block) {
//   console.log("video component called successfully");
//   const placeholder = block.querySelector('picture');
//   const link = block.querySelector('a').href;
//   block.textContent = '';
//   block.dataset.embedLoaded = false;

//   const autoplay = block.classList.contains('autoplay');
//   if (placeholder) {
//     block.classList.add('placeholder');
//     const wrapper = document.createElement('div');
//     wrapper.className = 'video-placeholder';
//     wrapper.append(placeholder);

//     if (!autoplay) {
//       wrapper.insertAdjacentHTML(
//         'beforeend',
//         '<div class="video-placeholder-play"><button type="button" title="Play"></button></div>',
//       );
//       wrapper.addEventListener('click', () => {
//         wrapper.remove();
//         loadVideoEmbed(block, link, true, false);
//       });
//     }
//     block.append(wrapper);
//   }

//   if (!placeholder || autoplay) {
//     const observer = new IntersectionObserver((entries) => {
//       if (entries.some((e) => e.isIntersecting)) {
//         observer.disconnect();
//         const playOnLoad = autoplay && !prefersReducedMotion.matches;
//         loadVideoEmbed(block, link, playOnLoad, autoplay);
//       }
//     });
//     observer.observe(block);
//   }
// }

// export function decorateBlock(block){
//   console.log("video component called successfully");
//   decorate(block);
// }

export default function decorateBlock(block) {
  const url = 'https://www.adanienterprises.com/-/media/Project/Enterprises/Home/AEL_vid';
  const wrapper = document.createElement('div');
  wrapper.className = 'video-placeholder';
  wrapper.innerHTML = '<video preload="auto" loop="true" autoplay="true" muted=""><source src="' +
    url + '"type="video/mp4"></video>';
  block.append(wrapper);
}