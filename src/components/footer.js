import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import solaceLogo from "../images/solace-logo-white.png"

const Footer = () => (
  <footer className="site-footer">
    <div className="back-to-top">
      <a href="#top">
        <span className="sr-only">Back to top</span>
        <i className="fa fa-arrow-up"></i>
      </a>
    </div>
    <div className="footer-background"></div>
    <div className="footer-top">
      <div className="container-fluid">
        <div className="row">
          <div className="footer-column footer-column-1 menu">
            <div id="footer-menu" className="menu-footer-menu-1-container">
              <ul id="menu-footer-menu-1" className="menu">
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-105">
                  <a
                    href="https://solace.com/products/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Products
                  </a>
                  <ul className="sub-menu">
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-103">
                      <a
                        href="https://solace.com/products/event-broker/software/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        PubSub+ Event Broker: Software
                      </a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-102">
                      <a
                        href="https://solace.com/products/event-broker/appliance/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        PubSub+ Event Broker: Appliance
                      </a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-101">
                      <a
                        href="https://solace.com/products/event-broker/cloud/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        PubSub+ Event Broker: Cloud
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-column footer-column-2 menu">
            <div id="footer-menu-2" className="menu-footer-menu-2-container">
              <ul id="menu-footer-menu-2" className="menu">
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-109">
                  <a
                    href="https://solace.com/company/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Company
                  </a>
                  <ul className="sub-menu">
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-106">
                      <a
                        href="https://solace.com/careers/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Careers
                      </a>
                    </li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-36247">
                      <a
                        href="https://solace.com/company/team/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Leadership
                      </a>
                    </li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-36248">
                      <a
                        href="https://solace.com/company/customers/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Customers
                      </a>
                    </li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-36249">
                      <a
                        href="https://solace.com/company/partners/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Partners
                      </a>
                    </li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-3902">
                      <a
                        href="https://solace.com/events/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Events
                      </a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-37246">
                      <a
                        href="https://solace.com/legal/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Legal
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-column footer-column-3 menu">
            <div id="footer-menu-3" className="menu-footer-menu-3-container">
              <ul id="menu-footer-menu-3" className="menu">
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-110">
                  <a href="https://solace.com/developers/">Developers</a>
                  <ul className="sub-menu">
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-37058">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://docs.solace.com/"
                      >
                        Docs
                      </a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-113">
                      <a
                        href="https://solace.com/blog/category/developers/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Blog
                      </a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-113">
                      <a
                        href="https://solace.community"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Community
                      </a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-111">
                      <a
                        href="https://solace.com/support/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Support
                      </a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3904">
                      <a
                        href="https://solace.com/contact/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Contact
                      </a>
                    </li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-36250">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://console.solace.cloud/login"
                      >
                        Log In
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-column footer-column-4 contact">
            <div className="footer-logo">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://solace.com"
              >
                <img src={solaceLogo} alt="Solace Logo" />
              </a>
            </div>
            {/*
            <div className="form-content">
              <h5>Newsletter Signup</h5>
              <p>
                Join 3,000 others receiving product updates + insights into the
                event-driven future.
              </p>
              <script src="//app-ab11.marketo.com/js/forms2/js/forms2.min.js"></script>
              <form id="mktoForm_1579"></form>
              <div className="form-thank-you-message">
                <p>Thanks for subscribing.</p>
              </div>
            </div>
            */}
            <div className="social-media">
              <ul>
                <li>
                  <a
                    href="https://github.com/solacedev"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      <i className="fab fa-github" aria-hidden="true"></i>
                    </span>
                    <span className="sr-only">GitHub</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/solacedotcom/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      <i className="fab fa-linkedin" aria-hidden="true"></i>
                    </span>
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/solacedotcom"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      <i
                        className="fab fa-twitter-square"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span className="sr-only">Twitter</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/SolaceSystems"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      <i
                        className="fab fa-youtube-square"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span className="sr-only">Youtube</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Container className="footer-bottom">
      <Row>
        <Col className="footer-bottom-content">
          &copy; {new Date().getFullYear()} Solace |
          <a
            href="https://solace.com/legal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Legal
          </a>
        </Col>
      </Row>
    </Container>
  </footer>
)

export default Footer
