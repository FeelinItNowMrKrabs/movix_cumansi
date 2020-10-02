import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import MovieFrame from './movieFrame'
import MovieText from './movieText'

const Container = styled.div`
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default function MovieContainer(props) {
    const { imgUrl, text } = props
    return (
        <Container >
            <MovieFrame imgUrl={imgUrl} />
            <MovieText text={text} />
        </Container >
    );
}