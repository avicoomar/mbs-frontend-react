import Button from "react-bootstrap/esm/Button";
import { useState, useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function Summary({ tidd }) {

    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch("http://localhost:8000/booking/viewbooking/" + tidd)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setData(data)
            })
    };
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    try {
        return (
            <>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col>
                            <ListGroup>
                                <br />
                                <hr></hr>
                                <h1 style={{ color: "green" }}>Thankyou for booking!</h1>
                                <hr></hr>
                                <br />
                                <h3>Booking Summary:</h3>
                                <br />
                                <ListGroup.Item><b>Movie name:</b> <span style={{ float: "right" }}>{data.show.movie.movieName}</span></ListGroup.Item>
                                <ListGroup.Item><b>Show date:</b> <span style={{ float: "right" }}>{data.bookingDate}</span></ListGroup.Item>
                                <ListGroup.Item><b>Show start time:</b> <span style={{ float: "right" }}>{data.show.showStartTime}</span></ListGroup.Item>
                                <ListGroup.Item><b>Show end time:</b> <span style={{ float: "right" }}>{data.show.showEndTime}</span></ListGroup.Item>
                                <ListGroup.Item><b>Transaction mode:</b> <span style={{ float: "right" }}>{data.transactionMode}</span></ListGroup.Item>
                                <ListGroup.Item><b>Transaction status:</b> <span style={{ float: "right" }}>{data.transactionStatus}</span></ListGroup.Item>
                                <br /><br />
                                <Button variant="primary" href="/">Back to movies</Button>
                            </ListGroup>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </>
        );
    } catch (error) {
        return (
            <Container>
                <br/><br/>     
                <Row>
                    <Col></Col>
                    <Col md="auto">
                    <h4>Booking could not be completed at the moment!</h4><hr></hr>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col md="auto">
                    <Button variant="primary" href="/">Back to movies</Button>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }

}




export default Summary;