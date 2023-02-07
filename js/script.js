// Check if there is Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null){
    document.documentElement.style.setProperty('--main-color',localStorage.getItem("color_option"));

    // Remove Active Class From All Colors List Item
    document.querySelectorAll(".colors-list li").forEach(element =>{
        element.classList.remove("active");
   
   // Add Active Class On Element With Data Color === Local Storage Item
   if (element.dataset.color === mainColors){
    element.classList.add("active");
   }
   
    });

}
// Random Background Option
let backgroundOption = true;

// Variable To Control The Interval
let backgroundInterval;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null){
    
     // Remove Active Class From All Spans
     document.querySelectorAll(".random-backgrounds span").forEach(element =>{
        element.classList.remove("active");
    });

    if(backgroundLocalItem === 'true'){
        backgroundOption = true;
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        backgroundOption = false;
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }

}


// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function(){
    
    // Toggle Class Fa-spin For Rotation Self
    this.classList.toggle("fa-spin");

    // Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");

};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(li =>{

    li.addEventListener("click", (e) => {
    
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        
        // Set Color On Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);

       handleActive(e);
    });
});


// Switch Backgrounds Option Colors
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

randomBackEl.forEach(span =>{

    span.addEventListener("click", (e) => {

        handleActive(e);

        if (e.target.dataset.bg === 'yes'){

            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);

        } else {

            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});


// Select Landing Page Element 
let landingPage = document.querySelector(".landing-page");

// Get Array Of Images
let imgsArray = ["one.jpg","two.jpg","three.jpg","four.jpg","five.jpg"];



// Function To Randomize Imgs
function randomizeImgs(){
    if(backgroundOption === true){
        backgroundInterval = setInterval(()=> {
            // Get Random Number 
            let randomNumber = Math.floor(Math.random()* imgsArray.length);
            
            // Change Background Image Url
            landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")';
        
        }, 3000);
        
    }
}
randomizeImgs();


// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function(){
    
    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;
    
    // Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    // Window ScrollTop
    let windowScrollTop = this.pageYOffset;  // pageYOffset has a problem

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill =>{
            skill.style.width = skill.dataset.progress;
        });
    }

};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {
        // Create overlay element
        let overlay = document.createElement("div");

        // Add class to overlay
        overlay.className = 'popup-overlay';

        // Append overlay to body
        document.body.appendChild(overlay);

        // Create popup box
        let popupBox = document.createElement("div");

        // Add class to the popup box
        popupBox.className = 'popup-box';

        // Create heading
        let imgHeading = document.createElement("h3");

        // Create text for heading
        let imgText = document.createTextNode(img.alt);

        // Append text to the heading
        imgHeading.appendChild(imgText);

        // Append the heading to the popup box
        popupBox.appendChild(imgHeading);

        // Create the image
        let popupImage = document.createElement("img");

        // Set image source
        popupImage.src = img.src ;

        // Add image to popup box
        popupBox.appendChild(popupImage);

        // Append the popup box to body
        document.body.appendChild(popupBox);

        // Create close span
        let closeButton = document.createElement("span");

        // Create close button text
        let closeButtonText = document.createTextNode("X");

        // Append text to close button
        closeButton.appendChild(closeButtonText);

        // Add class to close button
        closeButton.className = 'close-button';

        // Add close button to the popup box
        popupBox.appendChild(closeButton);

    });
})

// Close Popup
document.addEventListener("click", function(e){
    if(e.target.className == 'close-button'){
        // Remove the current popup
        e.target.parentNode.remove();

        // Remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});

// Select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select all links
const allLinks = document.querySelectorAll(".links a");

function scrollToSections(elements){
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

scrollToSections(allLinks);
scrollToSections(allBullets);


// Handle active state
function handleActive(e){
    // Remove Active Class From All Children's
    e.target.parentElement.querySelectorAll(".active").forEach(element =>{
        element.classList.remove("active");
    });

    // Add Active Class On Self
    e.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null){

    bulletsSpan.forEach(span => {
    
        span.classList.remove("active");
    
    });

    if (bulletLocalItem === 'block'){

        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add("active");
    
    } else {

        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }

}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if(span.dataset.display === 'show'){

            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets_option", 'block');

        } else {

            bulletsContainer.style.display = 'none';

            localStorage.setItem("bullets_option", 'none');

        }

        handleActive(e);
    
    });

});

// Reset Button
document.querySelector(".reset-options").onclick = function(){

    // localStorage.clear();
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");

    window.location.reload();
};

// Toggle menu
let toggleButton = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleButton.onclick = function(e){

    e.stopPropagation();

    this.classList.toggle("menu-active"); 

    tLinks.classList.toggle("open"); 

};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {

    if(e.target !== toggleButton && e.target !== tLinks){

        // Check if menu is open
        if(tLinks.classList.contains("open")){

            toggleButton.classList.toggle("menu-active"); 

            tLinks.classList.toggle("open");
        }
    }
});

tLinks.onclick = function(e){
    e.stopPropagation();
}
