/* eslint-disable no-undef */
import "../ContentScriptStyles.css"

// This code runs in the context of the web page
console.log("Content script running")

function getValue(classes) {
  console.log(">>> DOM", document.querySelector(classes))
}

window.addEventListener("mouseover", (ev) => {
  if (
    (ev.target && ev.target.tagName === "DIV") ||
    ev.target.tagName === "SPAN"
  ) {
    ev.target.classList.add("box-shadow")
  }
})

window.addEventListener("mouseout", (ev) => {
  if (
    (ev.target && ev.target.tagName === "DIV") ||
    ev.target.tagName === "SPAN"
  ) {
    ev.target.classList.remove("box-shadow")
  }
})

window.addEventListener("click", async (ev) => {
  if (ev.target && ev.target.innerText) {
    const classes = ev.target.className
      .split(" ")
      .filter(Boolean)
      .map((cls) => `.${CSS.escape(cls)}`)
      .join("")

    try {
      await chrome.storage.local.set({ key: classes })
      console.log(">>> window.loc", window.location.href)
      console.log("Value is set")
    } catch (error) {
      console.log(">>> Error chrome.storage.local", error)
    }

    try {
      const result = await chrome.storage.local.get(["key"])
      console.log("Value is " + result.key)
      getValue(result.key)
    } catch (error) {
      console.log(">>> Error getting value from chrome.storage.local", error)
    }
  } else {
    console.log(">>> Clicked element does not contain text.")
  }
})
