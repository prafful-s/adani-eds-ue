  // Initialize the carousel
  const videoCarousel = {
    // DOM Elements
    container: document.querySelector('.videocarousel'),
    slides: [],
    currentSlide: 0,
    totalSlides: 0,
    
    // Initialize the carousel
    init: function() {
      if (!this.container) return;
      
      // Get all direct div children of the carousel as slides
      const slideDivs = this.container.querySelectorAll(':scope > div');
      this.totalSlides = slideDivs.length;
      
      if (this.totalSlides === 0) return;
      
      // Set up slides with proper classes and inject iframes
      slideDivs.forEach((slideDiv, index) => {
        // Save reference to the slide
        this.slides.push(slideDiv);
        
        // Add slide class
        slideDiv.classList.add('carousel-slide');
        
        // Make first slide active
        if (index === 0) {
          slideDiv.classList.add('active');
        }
        
        // Find video link and inject iframe
        const videoLinkElement = slideDiv.querySelector('div[data-valign="middle"] a');
        const videoLink = videoLinkElement.href;
        const videoId = this.getYouTubeId(videoLink);
        
        // Create video container div
        const videoContainer = document.createElement('div');
        videoContainer.className = 'carousel-video-container';
        
        // Add iframe to container
        videoContainer.innerHTML = `
          <iframe 
            src="https://www.youtube.com/embed/${videoId}" 
            title="${videoLinkElement.textContent}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        `;
        
        // Get the first div (video link container)
        const videoLinkDiv = slideDiv.querySelector('div[data-valign="middle"]:first-child');
        
        // Insert video container before the existing content
        videoLinkDiv.innerHTML = '';
        videoLinkDiv.appendChild(videoContainer);
        
        // Add classes to content div
        const contentDiv = slideDiv.querySelector('div[data-valign="middle"]:last-child');
        contentDiv.classList.add('carousel-content');
      });
      
      // Add navigation
      this.createNavigation();
    },
    
    // Create navigation controls
    createNavigation: function() {
      // Create navigation container
      const navContainer = document.createElement('div');
      navContainer.className = 'carousel-navigation';
      
      // Previous button
      const prevBtn = document.createElement('button');
      prevBtn.className = 'carousel-nav-btn prev';
      prevBtn.innerHTML = '&#10094;';
      prevBtn.setAttribute('aria-label', 'Previous slide');
      prevBtn.addEventListener('click', () => this.navigate(-1));
      
      // Next button
      const nextBtn = document.createElement('button');
      nextBtn.className = 'carousel-nav-btn next';
      nextBtn.innerHTML = '&#10095;';
      nextBtn.setAttribute('aria-label', 'Next slide');
      nextBtn.addEventListener('click', () => this.navigate(1));
      
      // Append buttons
      navContainer.appendChild(prevBtn);
      navContainer.appendChild(nextBtn);
      
      // Create indicators
      const indicatorsContainer = document.createElement('div');
      indicatorsContainer.className = 'carousel-indicators';
      
      for (let i = 0; i < this.totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => this.goToSlide(i));
        indicatorsContainer.appendChild(indicator);
      }
      
      // Append navigation and indicators after the carousel
      this.container.parentNode.insertBefore(navContainer, this.container.nextSibling);
      this.container.parentNode.insertBefore(indicatorsContainer, navContainer.nextSibling);
    },
    
    // Navigate between slides
    navigate: function(direction) {
      // Hide current slide
      this.slides[this.currentSlide].classList.remove('active');
      document.querySelectorAll('.carousel-indicator')[this.currentSlide].classList.remove('active');
      
      // Calculate new slide index
      this.currentSlide = (this.currentSlide + direction + this.totalSlides) % this.totalSlides;
      
      // Show new slide
      this.slides[this.currentSlide].classList.add('active');
      document.querySelectorAll('.carousel-indicator')[this.currentSlide].classList.add('active');
    },
    
    // Go to specific slide
    goToSlide: function(index) {
      if (index === this.currentSlide) return;
      
      // Hide current slide
      this.slides[this.currentSlide].classList.remove('active');
      document.querySelectorAll('.carousel-indicator')[this.currentSlide].classList.remove('active');
      
      // Show selected slide
      this.currentSlide = index;
      this.slides[this.currentSlide].classList.add('active');
      document.querySelectorAll('.carousel-indicator')[this.currentSlide].classList.add('active');
    },
    
    // Extract YouTube video ID from URL
    getYouTubeId: function(url) {
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[7].length === 11) ? match[7] : null;
    }
  };


export default function decorate(block){
   videoCarousel.init();
}
