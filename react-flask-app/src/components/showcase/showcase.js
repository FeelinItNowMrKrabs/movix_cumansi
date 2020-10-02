import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import MovieContainer from "../movie/movieContainer";


const Container = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    align-content: space-between;
`
const Title = styled.p`

`

async function requestLinkMovies(movieId){
    const res = await fetch(`http://localhost:5000/get_movie/171699`)
    const data = res.json()
    console.log("movie id: ", data)
}

export default function Showcase(props) {
    const { title } = props
    let movieContainerArr = []
    for (let i = 0; i < 5; i++) {
        movieContainerArr.push(<MovieContainer requestLinkMovies={requestLinkMovies}/>);
    }
    
    return (
        <React.Fragment>
            <Title > {title} </Title>
            <Container >
                {movieContainerArr}
            </Container >
        </React.Fragment>
    );
}