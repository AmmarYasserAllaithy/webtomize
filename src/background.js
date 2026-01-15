chrome.action.onClicked.addListener(async tab => {
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['scripts/gmail-handler.js'],
    })
  } catch (error) {
    console.error('Error injecting content script:', error)
  }
})

// // let intervalId = null

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

//   switch (request.action) {
//     case "start":
//       console.log("Starting...")

//       // if (!intervalId) {
//       // intervalId = setInterval(() => refreshContent(sendResponse), 3000)
//       fetchHtml(sendResponse)
//       return true
//     // } else sendResponse({ status: "success" })

//     case "stop":
//       console.log("Stoping...")

//       // if (intervalId) clearInterval(intervalId)
//       sendResponse({ status: "success" })
//       break
//   }

// })

// function fetchHtml(sendResponse) {

//   let url = chrome.runtime.getURL('gmail/body.html')

//   console.log('Fetching from:', `'${url}'`)

//   fetch(url)
//     .then(response => response.text())
//     .then(data => {

//       console.log("data: ", data)
//       // sendResponse({ status: "success", data: data })

//       chrome.runtime.sendMessage({ action: "updateContent", data: data })
//     })
//     .catch(error => {
//       console.error(error)
//       console.log('Stopping...')

//       // clearInterval(intervalId)
//       sendResponse({ status: "error", message: error.message })
//     })

// }

// // chrome.action.onClicked.addListener(tab => {
// //   console.log('url: ', tab.url)

// //   chrome.scripting.executeScript({
// //     target: { tabId: tab.id },
// //     function: refreshContent
// //   })
// // })
