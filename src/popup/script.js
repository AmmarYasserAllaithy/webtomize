document.getElementById('ytpyzer').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'open-ytpyzer' })
})
