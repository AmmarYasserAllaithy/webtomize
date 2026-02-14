document.getElementById('ytpyzer').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'open-ytpyzer' })
})

document.getElementById('google').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'search-google' })
})

document.getElementById('brave').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'search-brave' })
})
