import React, { useEffect } from "react"

const Footer = () => {
  useEffect(() => {
    if (document.getElementById("solace-footer-script")) return

    const script = document.createElement("script")
    script.id = "solace-footer-script"
    script.src = "https://devrelassets.z9.web.core.windows.net/footer.js"
    script.async = true

    document.body.appendChild(script)
  }, [])

  return null
}

export default Footer