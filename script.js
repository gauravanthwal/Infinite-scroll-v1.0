const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = "xwY3JP1kE9ypiZZE_X2_ILLbPOAPJmIeZzvPu2GmoaM";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready = ", ready);
  }
}

// Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links and Photos
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images= ", totalImages);

  photosArray.forEach((photo) => {
    // Create <a>
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create <img/>
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, Check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // Put the img inside the anchor tag
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (err) {
    console.error(err);
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    ready = false;
    console.log("load More");
  }
});

getPhotos();
