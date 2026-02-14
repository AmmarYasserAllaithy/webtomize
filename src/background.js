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

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  const { action } = request

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  const url = tab?.url || ''

  switch (action) {
    case 'open-ytpyzer':
      handleYTPyzer(url)
      break

    case 'search-google':
      handleSearchGoogle(url, tab.id)
      break

    case 'search-brave':
      handleSearchBrave(url, tab.id)
      break
  }
})

function handleYTPyzer(url) {
  const playlistId = getQueryParam(url, 'list')

  if (playlistId)
    chrome.tabs.create({
      url: `https://ytpyzer.netlify.app?list=${playlistId}`,
    })
}

function handleSearchGoogle(url, tabId) {
  const query = getQueryParam(url, 'q')

  if (query)
    chrome.tabs.update(tabId, {
      url: `https://www.google.com/search?q=${query}`,
    })
}

function handleSearchBrave(url, tabId) {
  const query = getQueryParam(url, 'q')

  if (query)
    chrome.tabs.update(tabId, {
      url: `https://search.brave.com/search?q=${query}`,
    })
}

function getQueryParam(urlString, param) {
  try {
    const url = new URL(urlString)
    return url.searchParams.get(param)
  } catch (e) {
    return null
  }
}

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
