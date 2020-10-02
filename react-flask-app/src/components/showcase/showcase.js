import React, { useState, useEffect } from 'react';
import styled from 'styled-components'


const Container = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    align-content: space-between;
`
const Title = styled.p`

`

export default function Showcase(props) {
    const { title } = props
    return (<Container >
        <Title > {title} </Title>
    </Container >
    );
}