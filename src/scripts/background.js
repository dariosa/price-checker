/* eslint-disable no-undef */
async function init() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })

  if (tabs.length > 0) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["js/contentScript.js"],
    })
  }
}

init()

chrome.storage.onChanged.addListener((changes, namespace) => {
  console.log(">>> CHanged", changes, namespace)
})
