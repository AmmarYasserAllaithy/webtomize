;(async () => {
  const scssStyleURL = chrome.runtime.getURL("/assets/style/styler.scss")

  const response = await fetch(scssStyleURL)
  const styleText = await response.text()
  const styleMap = parseScssToStyles(styleText)

  let host = document.location.host

  if (host == "192.168.1.1") host = "_router"

  const hostStyle = styleMap[host]

  if (!hostStyle) return

  const styleEl = document.createElement("style")

  const addRules = (rules) =>
    rules
      .map((rule) => rule.trim())
      .filter((rule) => rule)
      .forEach((rule) => styleEl.sheet.insertRule(rule))

  document.head.appendChild(styleEl)

  addRules(hostStyle)

  if (host == "mostaql.com") showMostaqlStats()
    
})()

function parseScssToStyles(scssText) {
  const styles = {}

  // Match domain blocks: domain.com { ... }
  const domainBlockRegex = /([a-z0-9]+([-.]?[a-z0-9]+)*\.[a-z]{2,})\s*\{([\s\S]*?)\n\}/gi

  let match

  while ((match = domainBlockRegex.exec(scssText)) !== null) {
    const domain = match[1]
    const innerContent = match[3]

    styles[domain] = parseInnerRules(innerContent)
  }

  return styles
}

function parseInnerRules(content) {
  const rules = []

  // Match individual rules: selector { properties }
  const ruleRegex = /([^{}]+)\{([^{}]+)\}/g

  let match
  while ((match = ruleRegex.exec(content)) !== null) {
    const selector = match[1].trim()
    const properties = match[2].trim()

    // Minify: remove extra whitespace and newlines
    const minifiedProps = properties
      .split("")
      .map((prop) => prop.trim())
      .filter((prop) => prop.length > 0)
      .join("")

    if (minifiedProps) {
      rules.push(`${selector}{${minifiedProps}}`)
    }
  }

  return rules
}

// Mostaql stats

function showMostaqlStats() {
  if (location.pathname.startsWith("/project"))
    window.onload = () => {
      let bidsHeader = document.querySelector(
        ".heada.brd--an-imp > .heada__title.pull-right.vcenter"
      )
      let bidsNo = document.querySelectorAll(".bid").length

      bidsHeader.innerHTML += `<span class='bids-total'> &nbsp;${bidsNo}&nbsp; </span>`
    }
}
