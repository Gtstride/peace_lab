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
  console.log('Chatbox opened', chatbox);
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
