import { Navbar, Nav, Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
function App() {


  const [name, setName] = useState('');
  const [interestInFantasy, setInterestInFantasy] = useState(0);
  const [preferenceForShortStories, setPreferenceForShortStories] = useState(0);
  const [likingForColorfulNarratives, setLikingForColorfulNarratives] = useState(0);
  const [books, setBooks] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your API endpoint
      const response = await axios.post('http://localhost:5004/matching-book', {
        name,
        interestInFantasy,
        preferenceForShortStories,
        likingForColorfulNarratives,
      });

      // Handle the response (you can log it for now)

      setBooks(response.data.bookMatches);
    } catch (error) {
      // Handle errors (log or display an error message)
      console.error('Error making API request:', error);
    }
  };

  console.log('books', books);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Book Matching App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="d-flex align-items-center justify-content-center">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="interestInFantasy">
            <Form.Label>Interest in Fantasy (0-10)</Form.Label>
            <Form.Control
              as="select"
              value={interestInFantasy}
              onChange={(e) => setInterestInFantasy(parseInt(e.target.value, 10))}
            >
              {[...Array(11).keys()].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="preferenceForShortStories">
            <Form.Label>Preference for Short Stories (0-10)</Form.Label>
            <Form.Control
              as="select"
              value={preferenceForShortStories}
              onChange={(e) => setPreferenceForShortStories(parseInt(e.target.value, 10))}
            >
              {[...Array(11).keys()].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="likingForColorfulNarratives">
            <Form.Label>Liking for Colorful Narratives (0-10)</Form.Label>
            <Form.Control
              as="select"
              value={likingForColorfulNarratives}
              onChange={(e) => setLikingForColorfulNarratives(parseInt(e.target.value, 10))}
            >
              {[...Array(11).keys()].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>

      <Container className="d-flex align-items-center justify-content-center">
        <div>
          {books.length > 0 && (
            <Row className="mt-4">
              {books.map((book, index) => (
                <Col key={index} lg={4} md={6} sm={12} className='col-md-auto'>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>{book.book.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{book.book.author}</Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Container>
    </>
  );
}

export default App;
