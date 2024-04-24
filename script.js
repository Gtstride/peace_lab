// Navbar
// const navbarToggler = document.querySelector(".navbar-toggler");
// const navbarNav = document.querySelector(".navbar-nav");

// navbarToggler.addEventListener("click", () => {
//   navbarNav.classList.toggle("open");
//   navbarToggler.classList.toggle("open");
// });

// function highlightWord() {
//   var wordToHighlight = document.getElementById("searchInput").value;

//   var textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

//   while (textNodes.nextNode()) {
//     var node = textNodes.currentNode;
//     var text = node.nodeValue;
//     var searchText = wordToHighlight.trim();

//     var re = new RegExp(searchText, "gi");
//     var replacedText = text.replace(re, '<span class="highlighted">$&</span>');

//     if (replacedText !== text) {
//       var newNode = document.createElement("span");
//       newNode.innerHTML = replacedText;
//       node.parentNode.replaceChild(newNode, node);
//     }
//   }
// }

// Used Before
// function highlightWord() {
//   var selectElement = document.getElementById("searchSelect");
//   var wordToHighlight = selectElement.options[selectElement.selectedIndex].value;

//   var textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

//   while (textNodes.nextNode()) {
//     var node = textNodes.currentNode;
//     var text = node.nodeValue;
//     var searchText = wordToHighlight.trim();

//     var re = new RegExp(searchText, "gi");

//     var replacedText = text.replace(re, '<span class="highlighted">$&</span>');

//     if (replacedText !== text) {
//       var newNode = document.createElement("span");
//       newNode.innerHTML = replacedText;
//       node.parentNode.replaceChild(newNode, node);
//     }
//   }
// }

let highlightedWord = null;

function highlightWord() {
  // Get the selected word to highlight from the select element
  let selectElement = document.getElementById("searchSelect");
  let wordToHighlight = selectElement.options[selectElement.selectedIndex].value;

  // Get all the text nodes on the page
  const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

  // Loop through each text node
  while (textNodes.nextNode()) {
    let node = textNodes.currentNode;
    let text = node.nodeValue;
    let searchText = wordToHighlight.trim();

    // Create a regular expression to match the word (case insensitive)
    let re = new RegExp(searchText, "gi");

    // Replace all occurrences of the word with a span element to highlight it
    let replacedText = text.replace(re, '<span class="highlighted">$&</span>');

    // Update the node with the highlighted text
    if (replacedText !== text) {
      let newNode = document.createElement("span");
      newNode.innerHTML = replacedText;
      node.parentNode.replaceChild(newNode, node);
    }
  }

  // Toggle highlighting on and off for the selected word
  if (highlightedWord === wordToHighlight) {
    document.querySelectorAll(".highlighted").forEach((element) => {
      element.outerHTML = element.innerHTML;
    });
    highlightedWord = null;
  } else {
    highlightedWord = wordToHighlight;
  }
}

function highlightCustomWord() {
  var customWord = document.getElementById("customWord").value;

  if (customWord.trim() === "") {
    return; // Do nothing if the custom word is empty
  }

  var textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

  while (textNodes.nextNode()) {
    var node = textNodes.currentNode;
    var text = node.nodeValue;
    var searchText = customWord.trim();

    var re = new RegExp(searchText, "gi");

    var replacedText = text.replace(re, '<span class="highlighted">$&</span>');

    if (replacedText !== text) {
      var newNode = document.createElement("span");
      newNode.innerHTML = replacedText;
      node.parentNode.replaceChild(newNode, node);
    }
  }
}

const saveBtn = document.getElementById("savePreferencesBtn");
const checkBoxSelected = document.querySelectorAll("input[type=checkbox]");
const keywordsSelect = document.getElementById("keywords");

// const onLoad = alert("Welcome to Peace Lab. to proceed, please click okay and select your preferences to start fact-checking");

checkBoxSelected.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    saveBtn.disabled = !Array.from(checkBoxSelected).some((cb) => cb.checked);
    updateHighlight();

    if (checkbox.checked) {
      triggerChatbot(checkbox.value);
    }
  });
});

const updateHighlight = () => {
  checkBoxSelected.forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.parentElement.classList.add("highlight");
    } else {
      checkbox.parentElement.classList.remove("highlight");
    }
  });
};

keywordsSelect.addEventListener("change", () => {
  saveBtn.disabled = keywordsSelect.selectedOptions.length === 0;
  keywordsSelect.selectedOptions[0].classList.toggle("highlight");
});

// function triggerChatbot(keyword) {
//   const chatbox = document.querySelector("df-messenger");
//   if (chatbox.openChat) {
//     chatbox.openChat();
//     chatbox.sendText(`Monitor keyword: ${keyword}`);
//   } else {
//     console.error("Chatbox is not initialized.");
//   }
// }

document.addEventListener("DOMContentLoaded", function () {
  const chatbox = document.querySelector("df-messenger");
  chatbox.open();
  console.log("Chatbox opened", chatbox);
});

document.getElementById("monitoringForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedOption = keywordsSelect.selectedOptions[0];
  if (!selectedOption) {
    alert("Please select a keyword");
    return;
  }

  const selectedCheckBox = Array.from(checkBoxSelected)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);

  if (selectedCheckBox.length === 0) {
    alert("Please select at least one or more keyword in the checkbox");
    return;
  }

  const keywords = selectedOption.value;
  console.log("Selected Keywords:", keywords);
  console.log("Selected Checkbox:", selectedCheckBox);

  console.log("Extremism Keywords:", extremKeywords);
  console.log("Hate Speech Keywords:", hateSpeechKeywords);
  console.log("Human Rights Keywords:", humanRights);
  console.log("Child Labour Keyword:", childLabour);

  document.getElementById("statusMessage").innerText = "Preferences saved successfully!";
  alert(`Preferences saved successfully!. The Selected Keyword are: ${keywords} and ${selectedCheckBox}, enjoy your preferences`);

  setTimeout(() => {
    location.reload();
  }, 5000);
});

updateHighlight();

// // Image Slider
// // Get the image slider element
// const imageSlider = document.getElementById("imageSlider");

// // Function to slide images to the left
// function slideLeft() {
//     const firstImage = imageSlider.children[0];
//     imageSlider.removeChild(firstImage);
//     imageSlider.appendChild(firstImage);
// }

// // Function to slide images to the right
// function slideRight() {
//     const lastImage = imageSlider.children[imageSlider.children.length - 1];
//     imageSlider.removeChild(lastImage);
//     imageSlider.insertBefore(lastImage, imageSlider.children[0]);
// }

// // Set interval to auto slide
// setInterval(() => {
//     slideLeft();
// }, 2000);
