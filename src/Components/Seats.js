import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";

function Seats({ tid }) {

    //Check the response once, If seatId,price,status not there then fetch from seat table

    //------------------------------------FETCH---------------------------------------------------
    const [fdata, setFdata] = useState([]);
    const fetchData = () => {
        fetch("http://localhost:8000/seats/findall")
            .then(response => {
                return response.json()
            })
            .then(fdata => {
                setFdata(fdata)
            })
    };
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //change port to 9000 to avoid DB getting bloated, use network in inspect element for monitoring
    const url = "http://localhost:8000/tickets/add?bookingId=" + tid;
    const [seat_id, setSeat_id] = useState(-1);
    const [type, setType] = useState("");
    const [price, setPrice] = useState(-1);
    const [status, setStatus] = useState("");

    const [data, setData] = useState({
        noOfSeats: "",
        seats: [
            {
                seatId: "",
                seatNumber: "",
                type: "",
                price: "",
                status: "",
                tickett: null
            }
        ]
    });

    function handle(e) {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(newData);
    }

    function handle1(e) {
        const newData = { ...data };
        newData["seats"][0].seatNumber = e.target.value;
        setData(newData);
        console.log(newData);
    }

    function submit(e) {
        e.preventDefault();
        fdata.forEach((x) => {
            if (x.seatNumber === data["seats"][0].seatNumber) {
                setSeat_id(x.seatId);
                setType(x.type);
                setPrice(x.price);
                setStatus(x.status);
            }
        });
    }

    const post_data = {
        noOfSeats: data.noOfSeats,
        seats: [
            {
                seatId: seat_id,
                seatNumber: data["seats"][0].seatNumber,
                type: type,
                price: price,
                status: status,
                tickett: null
            }
        ]
    }
    console.log("POST_DATA:" + JSON.stringify(post_data));

    function final_submit(e) {
        Axios.post(url, post_data).then(res => {
            console.log(res.data);
        });
    }
    // fdata.forEach((x) => {
    //     console.log(data);
    //     if(x.seatNumber == data.seatNumber){
    //         setTemp(x);
    //     }
    // })

    // console.log(temp);
    const [show, setShow] = useState(false);        //For model
    const handleClose = () => setShow(false);       //For modal
    const handleShow = () => setShow(true);         //For modal
    return (
        <>
            <Form onSubmit={(e) => submit(e)}>
                <Form.Group className="mb-3" controlId="noOfSeats">
                    <Form.Label><b>Enter number of seats:</b></Form.Label>
                    <Form.Control type="number" onChange={(e) => handle(e)} value={data.noOfSeats} />
                </Form.Group>
                <Form.Group>
                    <Form.Label><b>Select Seat Number:</b></Form.Label>
                    {fdata.map((x) => {
                        return (
                            <Form.Check
                                type="radio"
                                label={x.seatNumber + ' | Type:  "' + x.type + '"'}
                                onChange={(e) => handle1(e)}
                                value={x.seatNumber}
                                name="xyz"
                            />
                        );
                    })}
                </Form.Group>
                <br />
                {/* <Button variant="primary" type="submit">Add Booking</Button> */}

                <Button variant="primary" onClick={handleShow} type="submit" style={{marginBottom : "20px"}}>
                    Add Booking
                </Button>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to confirm the booking?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Link to="/summary">
                            <Button onClick={(e) => final_submit(e)} >Yes,proceed</Button>
                        </Link>
                    </Modal.Footer>
                </Modal>
            </Form>

        </>
    );
}

export default Seats;
