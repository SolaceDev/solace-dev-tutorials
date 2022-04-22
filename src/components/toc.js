import React from "react"
import {Col, Button} from "react-bootstrap"
import {faGithub} from "@fortawesome/free-brands-svg-icons"
import {faComments} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon
} from "react-share"

const TableOfContent = (props) => {
  let headings = props.headings
  let feedback_link = props.feedback_link
  let link = `https://tutorials.solace.dev${
    props.slug
  }`
  let social_string = `I am learning ${
    props.page_title
  } for ${
    props.slugRoot
  } on the Solace API Tutorials page! Check it out here 👇 🤓 \n`
  let hashtags = ["solace", "pubsub", "tutorial", "DEVCommunity"]
  return (
    <div id="sidebar">
      <div className="heading">Table of content</div>
      <Col> {
        headings.map((heading) => (
          <div key={
              heading.id
            }
            className="pt2 pb2 border-bottom">
            <a href={
              "#" + heading.value.split(" ").join("-")
            }>
              {
              heading.value
            } </a>
          </div>
        ))
      } </Col>
      <Col>
        <Button className="mt3 mb2 w-100"
          href={feedback_link}
          target="_blank"
          rel="noreferrer"
          variant="primary"
          size="sm">
          <FontAwesomeIcon icon={faGithub}
            size="1x"/>
          Improve this page{" "} </Button>
        {" "}
        <Button className="mt1 mb3 w-100" href="https://solace.community/" target="_blank" rel="noreferrer" variant="primary" size="sm">
          <FontAwesomeIcon icon={faComments}
            size="1x"/>
          Discuss in Community{" "} </Button>
        {" "} </Col>
      <Col className="social">
        <TwitterShareButton className="pr-1 pl-1"
          url={link}
          title={social_string}
          hashtags={hashtags}
          via="SolaceDevs">
          <TwitterIcon size={32}
            round={true}/>
        </TwitterShareButton>
        <LinkedinShareButton className="pr-1 pl-1"
          url={link}
          summary={social_string}>
          <LinkedinIcon size={32}
            round={true}/>
        </LinkedinShareButton>
        <FacebookShareButton className="pr-1 pl-1"
          url={link}
          quote={social_string}
          hashtags={hashtags}>
          <FacebookIcon size={32}
            round={true}/>
        </FacebookShareButton>
      </Col>
    </div>
  )
}

export default TableOfContent