import React, { useEffect, useState } from "react"
import { Col } from "react-bootstrap"
import { Link } from "react-scroll"

const OnThisPage = (props) => {
  let headings = props.headings

  const [visibleHeader, setVisibleHeader] = useState(
    headings[0] ? headings[0].value.split(" ").join("-").replace(/\./g, "") : null
  )
  const handleObserverEvent = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVisibleHeader(entry.target.id.split("-").join(" "))
      }
    })
  }

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: "0% 0% -80% 0%",
      threshold: 1,
    }
    let observer = new IntersectionObserver(handleObserverEvent, options)
    const h2s = document.getElementsByTagName("h2")
    var elms = Array.prototype.slice.call(h2s)
    console.log(elms)
    elms.map((elm) => {
      observer.observe(elm)
      return null
    })
    return () => {
      if (observer) observer.disconnect()
      observer = null
    }
  }, [])

  return (
    <div id="otp">
      <div className="heading pt3 pb3">On This Page</div>
      <Col>
        {" "}
        {headings.map((heading) => (
          <div
            key={heading.value.split(" ").join("-").replace(/\./g, "")}
            className={
              visibleHeader === heading.value
                ? "pt2 pb2 visible-header"
                : "pt2 pb2 nonvisible-header"
            }
          >
            <Link
              to={heading.value.split(" ").join("-").replace(/\./g, "")}
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              {" "}
              {heading.value}{" "}
            </Link>
          </div>
        ))}{" "}
      </Col>
    </div>
  )
}

export default OnThisPage
