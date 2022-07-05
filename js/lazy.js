function loadImage(picture) {
  let sources = picture.children;
  for(var s=0; s<sources.length; s++) {
    if (sources[s].hasAttribute("data-src")) {
      sources[s].setAttribute('src', sources[s].getAttribute('data-src'));
      sources[s].removeAttribute('data-src');
      sources[s].onload = () => picture.classList.remove("lazy")
    }
    if (sources[s].hasAttribute("data-srcset")) {
      sources[s].setAttribute('srcset', sources[s].getAttribute('data-srcset'));
      sources[s].removeAttribute('data-srcset');
    }
  }
}

function lazyLoad(pictures) {
  pictures.forEach(item => {
    if (item.intersectionRatio > 0) {
      observer.unobserve(item.target);
      loadImage(item.target);
    };
  });
};

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
