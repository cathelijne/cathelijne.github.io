function loadImage(picture) {
  let regex = /w=(20) *([0-9]*)w/g;
  let replaceText = "w=$2 $2w"
  let sources = picture.children;
  for(var s=0; s<sources.length; s++) {
    if (sources[s].hasAttribute("srcset")) {
      sources[s].setAttribute("srcset", sources[s].getAttribute("srcset").replace(regex, replaceText));
    }

    // remove the lazy-initial class when the full image is loaded to unblur
    sources[s].addEventListener('load', image => {
      console.log("yes");
      image.target.closest("picture").classList.remove("lazy")
    }, false);
  }
}

// Stop observing this image and load its source
function lazyLoad(pictures) {
  pictures.forEach(item => {
    if (item.intersectionRatio > 0) {
      observer.unobserve(item.target);
      loadImage(item.target);
    };
  });
};

// Set up the intersection observer to detect when to define
// and load the real image source
var options = {
  rootMargin: "100px",
  threshold: 1.0
};
var observer = new IntersectionObserver(lazyLoad, options);

// Watch for all pictures with a "lazy" class
var pictures = document.querySelectorAll("picture.lazy");
pictures.forEach(pic => {
  observer.observe(pic);
});
