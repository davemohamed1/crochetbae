// src/pages/CounterPage.tsx
import { Container, Row, Col } from 'react-bootstrap';
import { Fragment, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const CounterPage = () => {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(prev => prev + 1);

  return (
    <Fragment>
      <Container className="text-center mt-4">
        <h1>CrochetBae</h1>

        <Row className="my-4">
          <Col>
            <h2>Welcome to CrochetBae!</h2>
            <p>Your one-stop solution for all your crochet needs.</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <h3>Counter: {count}</h3>
            <Button variant="success" onClick={handleIncrement}>
              Increment Counter
            </Button>{' '}
            <Button variant="primary" onClick={() => setShow(true)}>
              Reset
            </Button>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Counter</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={() => {
            setCount(0);
            setShow(false);
          }}>
            Confirm Reset
          </Button>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CounterPage;
