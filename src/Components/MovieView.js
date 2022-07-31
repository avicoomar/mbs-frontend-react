import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from "react";
import Details from "./Details";
// import{ ErrorBoundary } from "./ErrorBoundary";
function MovieView({ setSidd, mid }) {
    const [data, setData] = useState([]);
    const [isShown, setIsShown] = useState(false);

    const handleClick = event => {
        setIsShown(true);
    };
    const fetchData = () => {
        fetch("http://localhost:8000/movies/viewMovie/" + mid)
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

    return (
        <>
            <Card style={{ width: '18rem', margin: "auto" }}>
                <Card.Img variant="top" src={require('./images/Sample_abc.jpg')} />
                <Card.Body>
                    <Card.Title>{data.movieName}</Card.Title>
                    <Card.Subtitle><i>--{data.movieGenre}--</i></Card.Subtitle><br />
                    <Card.Text><b>Time:</b> {data.movieHours}</Card.Text>
                    <Card.Text><b>Release:</b>{data.movieDate}</Card.Text>
                    <Card.Text><b>Rating:</b>{data.movieRating}</Card.Text>
                    <Card.Text><b>Language:</b>{data.movieLanguage}</Card.Text>
                    <Card.Text><b>Description:</b> {data.movieDescription}</Card.Text>
                    <Button variant="primary" onClick={() => handleClick()} href="#dummy2">Book Movie</Button>
                </Card.Body>
            </Card>
            {isShown && <Details did={mid} setSidd={setSidd} />}
            <div id="dummy" style={{height: "70px"}}/>
            <div id="dummy2"/>
        </>
    );
}

export default MovieView;