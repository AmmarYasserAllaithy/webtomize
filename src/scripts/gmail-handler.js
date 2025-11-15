
const url = chrome.runtime.getURL('/assets/html/email-body.html')

setTimeout(() => setupGmailComposer(url), 1000)


async function fetchContent(url) {
  const response = await fetch(url)

  return await response.text()
}


const setupGmailComposer = (url) => {

  const composeButton = document.querySelector("body > div > div.nH.a4O > div > div.nH.aqk.aql.bkL > div.aeN.WR.baA.nH.oy8Mbf > div.aic > div > div")

  if (!composeButton) return

  composeButton.textContent += '!'

  composeButton.addEventListener('click', e => {

    setTimeout(() => {

      const allComposers = document.querySelectorAll("div.aO7 > div.Am.aiL.Al.editable.LW-avf.tS-tW")
      const currentComposer = allComposers[allComposers.length - 1]

      liveUpdateContent(currentComposer, url)

    }, 1000)

  })

}


let intervalId

const liveUpdateContent = (composer, url, millis = 1000) => {

  intervalId = setInterval(
    async () => {

      if (composer.checkVisibility())

        composer.innerHTML = await fetchContent(url)

      else {
        clearInterval(intervalId)

        console.log("Interval Cleared!")
      }

    },
    millis
  )

}