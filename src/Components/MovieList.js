import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
function MovieList({ setMid }) {
    const [data, setData] = useState([]);
    const fetchData = () => {
        fetch("http://localhost:8000/movies/findall")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setData(data)
            })
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        // <ListGroup defaultActiveKey="#link1">
        //     <ListGroup.Item action href="#link1">
        //         {/* {data[0].movieName} */}
        //     </ListGroup.Item>
        //     <ListGroup.Item action href="#link2" disabled>
        //         {JSON.stringify(data)}
        //     </ListGroup.Item>
        <>
            <br></br><h1>Latest Movies:</h1><br></br>
            <ListGroup>
                {
                    data.map(m => (
                        <div key={m.movieId}>
                            <ListGroup.Item>
                               <h5 style={{display: 'flex', justifyContent: 'center', marginDown : "90px"}}>{m.movieName}</h5>
                                <Link to="/movieView" style={{display: 'flex', justifyContent: 'center'}}>
                                    <Button variant="primary" size="sm" onClick={() => { setMid(m.movieId) }} style={{ marginTop : "20px"}}>Book</Button>
                                </Link>
                            </ListGroup.Item>
                        </div>
                    ))
                }
            </ListGroup>
        </>
    );
}

export default MovieList;

