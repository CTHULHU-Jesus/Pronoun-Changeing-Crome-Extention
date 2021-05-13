// FUNCTIONS

// stolen from https://developer.chrome.com/docs/extensions/reference/tabs/#get-the-current-tab
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

// SCRIPT SET UP
// Set up and run functions on the click of the associated button

async function main(){
  var tab = await getCurrentTab();
  try{
    chrome.scripting.executeScript
        ( { target: { tabId: tab.id }
          , files: ['changePronouns.js']});
  } catch (e) {
    console.log("can't send the same file twice. That would be silly.");
  }

  heHim = function() {
    chrome.tabs.sendMessage(tab.id,{
      nominative: "he",
      accusative: "him",
      genitive:   "his",
      reflexive:  "himself"});
  }
  document.getElementById("he/him").addEventListener('click', heHim);

  function sheHer() {
   chrome.tabs.sendMessage(tab.id,{
      nominative: "she",
      accusative: "her",
      genitive:   "her",
      reflexive:  "herself"});
  }
  document.getElementById("she/her").addEventListener('click', sheHer);

  function theyThem() {
   chrome.tabs.sendMessage(tab.id,{
      nominative: "they",
      accusative: "them",
      genitive:   "their",
      reflexive:  "themself"});
  }
  document.getElementById("they/them").addEventListener('click', theyThem);
}

try{
  window.onload=main;
} catch (e) {
  console.log("error:", e);
}
