import React, { useEffect } from "react"

const NavBar = () => {
    useEffect(() => {
        if (document.getElementById("solace-header-script")) return
        
        const script = document.createElement("script")
        script.id = "solace-header-script"
        script.src = "https://devrelassets.z9.web.core.windows.net/header.js"
        script.async = true

        document.body.appendChild(script)
    }, [])

    return null
}

export default NavBar