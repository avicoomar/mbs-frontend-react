import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Seats from "./Seats";

function Booking({ sidd, setTidd }) {
    const url = "http://localhost:8000/booking/insert?showId=" + sidd;
    const [pclicked, setPclicked] = useState(false);   //used to render 2nd haalf(seats) of UI
    const [tid,setTid] = useState(-1);                 //transaction-id (recieved as response of POST request)
    const [data, setData] = useState({
        transactionMode: "",
        transactionStatus: "",
        bookingDate: ""
    });
    function handle(e) {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(newData);
    }
    function submit(e) {
        e.preventDefault();
        Axios.post(url, {
            transactionMode: data.transactionMode,
            transactionStatus: "Completed",
            bookingDate: data.bookingDate
        }).then(res => {
            setTid(res.data.transactionId);
        })
        setPclicked(true);
    }
    return (
        <>
            <br /><br />
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Form onSubmit={(e) => submit(e)}>
                            <Form.Group className="mb-3" controlId="bookingDate">
                                <Form.Label><b>Date:</b></Form.Label>
                                <Form.Control required type="date" onChange={(e) => handle(e)} value={data.bookingDate} />
                                <Form.Text className="text-muted">
                                    Enter the Date
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Select Transaction Mode:</b></Form.Label>
                                <Form.Check
                                    type="radio"
                                    id="transactionMode"
                                    label="Online"
                                    onChange={(e) => handle(e)}
                                    value="Online"
                                    name="xyz"
                                    required
                                />
                                <Form.Check
                                    type="radio"
                                    id="transactionMode"
                                    label="Offline"
                                    onChange={(e) => handle(e)}
                                    value="Offline"
                                    name="xyz"
                                    required
                                />
                            </Form.Group>
                            <br />
                            <Button variant="primary" type="submit">Proceed</Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
            <br/><br/><br/>
            {pclicked && <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Seats tid={tid} />
                        {setTidd(tid)}
                    </Col>
                    <Col></Col>
                </Row>
            </Container>}
        </>
    );
}

export default Booking;
