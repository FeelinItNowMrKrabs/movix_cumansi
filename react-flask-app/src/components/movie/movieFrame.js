import React, { useState, useEffect } from 'react';
import { Button } from 'bootstrap-4-react';
import styled from 'styled-components'

const StyledButton = styled.button`
    width: 13vw;
    height: 13vh;
    background-image: url(${props => (props.imgUrl)});
    box-shadow: ${props=>(props.clickCheck) ? "0 0 0 0.2rem rgb(255 0 0)" : "none" };
    border: 1px solid transparent;
    border-radius: .25rem;
`


export default function MovieFrame(props) {
    const [click, setClick] = useState(false)
    return (
        <StyledButton clickCheck={click} imgUrl={props.imgUrl} danger outline onClick={()=>{setClick(!click)}}/>
    );
}