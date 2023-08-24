//your code here

// List of image class names
const imageClassNames = ['img1', 'img2', 'img3', 'img4', 'img5'];

// State variables
let selectedImages = [];
let state = 1; // Initial state

// Function to shuffle array elements randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to render images
function renderImages() {
  const main = document.querySelector('main');
  main.innerHTML = '';

  shuffleArray(imageClassNames);

  for (const className of imageClassNames) {
    const img = document.createElement('img');
    img.classList.add(className);
    main.appendChild(img);
  }

  const h3 = document.createElement('h3');
  h3.id = 'h';
  h3.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
  main.appendChild(h3);
}

// Function to reset state
function resetState() {
  selectedImages = [];
  state = 1;
  renderImages();
}

// Function to handle image click event
function handleImageClick(event) {
  const clickedImg = event.target;

  if (state === 1) {
    state = 2;
  }

  if (state === 2) {
    if (!selectedImages.includes(clickedImg)) {
      selectedImages.push(clickedImg);
      clickedImg.classList.add('selected');
    }
  }

  if (selectedImages.length === 2) {
    const verifyButton = document.createElement('button');
    verifyButton.id = 'verify';
    verifyButton.innerHTML = 'Verify';
    verifyButton.addEventListener('click', handleVerifyClick);
    document.body.appendChild(verifyButton);

    state = 3;
  }
}

// Function to handle verify button click event
function handleVerifyClick() {
  const verifyButton = document.getElementById('verify');
  verifyButton.remove();

  if (selectedImages.length === 2) {
    if (selectedImages[0].classList[0] === selectedImages[1].classList[0]) {
      const para = document.createElement('p');
      para.id = 'para';
      para.textContent = 'You are a human. Congratulations!';
      document.body.appendChild(para);
    } else {
      const para = document.createElement('p');
      para.id = 'para';
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
      document.body.appendChild(para);
    }
  }
}

// Initial setup
renderImages();

// Event listener for image click
document.addEventListener('click', function (event) {
  if (event.target && event.target.classList.contains('selected')) {
    return;
  }
  if (event.target && event.target.tagName === 'IMG') {
    handleImageClick(event);
  }
});

// Event listener for reset button
document.addEventListener('click', function (event) {
  if (event.target && event.target.id === 'reset') {
    resetState();
  }
});

