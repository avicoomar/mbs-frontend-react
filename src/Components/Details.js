import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
function Details({ did, setSidd }) {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [mov_exist, setMov_exist] = useState(false);
    const [checked, setChecked] = useState(false);
    const [local_sidd, setLocal_sidd] = useState(-1);       //local-show-id state variable 

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }
    const xyz = (z) => {

        if (!z.movie) {
            handleShow();
        }
        else {
            setMov_exist(true);
            setSidd(z.showId);
            setChecked(true);
            setLocal_sidd(z.showId);
        }
    }

    const fetchData = () => {
        fetch("http://localhost:8000/theatre/findbyMovie/" + did)
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
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>THEATRE</th>
                            <th>SCREENS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {
                                data.map((x, i) => {
                                    return (<>
                                        <td><h5>{x.theatreName}</h5><i>{x.theatreCity}</i></td>
                                        {x.screen.map(y => {
                                            return <Table striped bordered hover>
                                                <th>Screen Name:</th>
                                                <tr><td>{y.screenName}</td></tr>
                                                <Table striped bordered hover>
                                                    <thead><th>Shows</th></thead>
                                                    <tbody>
                                                        {
                                                            y.show.map(z => {
                                                                return <>
                                                                    <td><em>{z.showName}</em><br />{z.showStartTime} <b>to</b> {z.showEndTime}</td>
                                                                    <td>
                                                                        <Link to={(mov_exist) ? "/booking" : "/movieView"}>
                                                                            <Button style={{ backgroundColor: "green" }} variant="primary" onClick={() => xyz(z)}>
                                                                                Book
                                                                            </Button>
                                                                        </Link>
                                                                        <div>
                                                                        {local_sidd===z.showId && checked && <Link to="/booking">
                                                                            <Button variant="primary">
                                                                                {String.fromCharCode(8594)}
                                                                            </Button>
                                                                        </Link>}
                                                                        </div>
                                                                    </td>

                                                                </>
                                                            })
                                                        }
                                                    </tbody>
                                                </Table>
                                            </Table>
                                        })}
                                    </>
                                    )
                                })
                            }
                        </tr>
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Movie not available</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Movie not available at the selected show!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    } catch (error) {
        console.log("state reset due to page refresh, go back to home screen")
        return (
            < Container >
                <br /><br />
                <Row>
                    <Col></Col>
                    <Col md="auto">
                        <h4>Movie could not be listed. Please return to homepage and try again!</h4><hr></hr>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col md="auto">
                        <Button variant="primary" href="/" style={{ marginBottom: "20px" }}>Back to movies</Button>
                    </Col>
                    <Col></Col>
                </Row>
            </Container >
        );
    }
}

export default Details;