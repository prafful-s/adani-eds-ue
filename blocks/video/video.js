export default function decorateBlock(block) {
  const url = 'https://www.adanienterprises.com/-/media/Project/Enterprises/Home/AEL_vid';
  const wrapper = document.createElement('div');
  wrapper.className = 'video-placeholder';
  wrapper.innerHTML = '<video preload="auto" loop="true" autoplay="true" muted=""><source src="' +
    url + '"type="video/mp4"></video>';
  block.append(wrapper);
}