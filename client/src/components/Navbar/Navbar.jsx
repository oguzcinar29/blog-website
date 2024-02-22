import React from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useData } from "../Context/DataContext";
function Navbar1() {
  const {
    loggedIn,
    whichLinkClicked,
    setIsLoggIn,
    setWhichLinkClicked,
    username,
  } = useData();

  return (
    <nav className="nav-container">
      {["lg"].map((expand) => (
        <Navbar
          style={{ backgroundColor: "white", margin: "10px 0" }}
          key={expand}
          expand={expand}
          className="custom-navbar bg-body-tertiary mb-3 navbar" // Add custom class and background color class
        >
          <Container style={{ backgroundColor: "white" }} fluid>
            <Link
              className={whichLinkClicked === "logo" ? "make-green" : null}
              onClick={() => setWhichLinkClicked("logo")}
              id="logo"
              to="/"
            >
              <h1>Oguz BLog</h1>
              <p>Api & Technology</p>
            </Link>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Oguz Blog
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <div className="nav-links">
                    <Link
                      className={
                        whichLinkClicked === "art" ? "make-green" : null
                      }
                      onClick={() => setWhichLinkClicked("art")}
                      to="/art"
                    >
                      ART
                    </Link>
                    <Link
                      className={
                        whichLinkClicked === "science" ? "make-green" : null
                      }
                      onClick={() => setWhichLinkClicked("science")}
                      to="/science"
                    >
                      SCIENCE
                    </Link>
                    <Link
                      className={
                        whichLinkClicked === "technology" ? "make-green" : null
                      }
                      onClick={() => setWhichLinkClicked("technology")}
                      to="/technology"
                    >
                      TECHNOLOGY
                    </Link>
                    <Link
                      className={
                        whichLinkClicked === "cinema" ? "make-green" : null
                      }
                      onClick={() => setWhichLinkClicked("cinema")}
                      to="/cinema"
                    >
                      CINEMA
                    </Link>
                    <Link
                      className={
                        whichLinkClicked === "design" ? "make-green" : null
                      }
                      onClick={() => setWhichLinkClicked("design")}
                      to="/design"
                    >
                      DESIGN
                    </Link>
                    <Link
                      className={
                        whichLinkClicked === "food" ? "make-green" : null
                      }
                      onClick={() => setWhichLinkClicked("food")}
                      to="/food"
                    >
                      FOOD
                    </Link>
                    {!loggedIn && (
                      <Link
                        style={{ color: "#FFA447" }}
                        onClick={() => setIsLoggIn(true)}
                        to="/login"
                      >
                        Login
                      </Link>
                    )}
                    {loggedIn && <p id="username">{username}</p>}
                    {loggedIn && (
                      <form
                        action="https://blog-website-38s4.onrender.com/api/logged-out"
                        method="post"
                      >
                        <button
                          style={{ color: "#FFA447" }}
                          id="nav-btn"
                          type="submit"
                        >
                          Logged out
                        </button>
                      </form>
                    )}
                    {loggedIn && (
                      <Link
                        className={
                          whichLinkClicked === "write" ? "make-green" : null
                        }
                        id="write"
                        onClick={() => setWhichLinkClicked("write")}
                        to="/write"
                      >
                        Write
                      </Link>
                    )}
                  </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </nav>
  );
}

export default Navbar1;
