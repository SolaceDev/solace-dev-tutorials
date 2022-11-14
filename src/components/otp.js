import React, { useEffect, useState } from "react"
import { Col, Button } from "react-bootstrap"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faComments } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, animateScroll as scroll } from "react-scroll"

const OnThisPage = (props) => {
  let headings = props.headings
  let feedback_link = props.feedback_link

  const [visibleHeader, setVisibleHeader] = useState(
    headings[0] ? headings[0].value.split(" ").join("-") : null
  )
  console.log(headings)
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
    elms.map((elm) => {
      observer.observe(elm)
    })
    return () => {
      if (observer) observer.disconnect()
      observer = null
    }
  }, [])

  return (
    <div id="toc">
      <div className="heading">On This Page</div>
      <Col>
        {" "}
        {headings.map((heading) => (
          <div
            key={heading.value.split(" ").join("-")}
            className={
              visibleHeader === heading.value
                ? "pt2 pb2 visible-header"
                : "pt2 pb2 nonvisible-header"
            }
          >
            <Link
              to={heading.value.split(" ").join("-").replace(/:/g, "")}
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
