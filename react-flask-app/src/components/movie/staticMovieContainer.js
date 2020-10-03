import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import MovieFrame from './movieFrame'
import MovieText from './movieText'

const Container = styled.div`
    width: 300px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default function MovieContainer(props) {
    const [imgUrl, setImgUrl] = useState("https://vk.vkfaces.com/858228/v858228285/ca238/YvsZhIEkU_8.jpg");
    const [text, setText] = useState("Movie text");
    const [movieId, setMovieId] = useState(0);
    const [checkClick, setCheckClick] = useState(false)
    //const { imgUrl, text } = props
    return (
        <Container >
            <MovieFrame imgUrl={imgUrl} />
            <MovieText text={props.text} />
        </Container >
    );
}