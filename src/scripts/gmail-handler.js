const EMAIL_TEMPLATE_URL = chrome.runtime.getURL('/assets/html/email-body.html')

//

setTimeout(() => setupGmailComposer(), 1000)

//

const setupGmailComposer = () => {
  const composeButton = document.querySelector(
    'body > div > div.nH.a4O > div > div.nH.aqk.aql.bkL > div.aeN.WR.baA.nH.oy8Mbf > div.aic > div > div'
  )

  if (!composeButton) return

  composeButton.textContent += '!'
  composeButton.addEventListener('click', handleComposeButtonClick)
}

//

const handleComposeButtonClick = () => {
  setTimeout(() => {
    const allComposers = document.querySelectorAll(
      'div.aO7 > div.Am.aiL.Al.editable.LW-avf.tS-tW'
    )
    const currentComposer = allComposers[allComposers.length - 1]

    updateComposerContentPeriodically(currentComposer)
  }, 1000)
}

//

let intervalId

const updateComposerContentPeriodically = (composer, millis = 1000) => {
  const updateComposerContent = async () => {
    if (composer.checkVisibility()) {
      composer.innerHTML = await fetchEmailContent()
    } else {
      clearInterval(intervalId)
      console.log('Interval Cleared!')
    }
  }

  intervalId = setInterval(updateComposerContent, millis)
}

//

const fetchEmailContent = async () => {
  const response = await fetch(EMAIL_TEMPLATE_URL)
  return await response.text()
}
