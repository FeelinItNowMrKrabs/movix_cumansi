import React, { useState, useEffect } from 'react';
import { Button } from 'bootstrap-4-react';
import styled from 'styled-components'

const StyledButton = styled(Button)
    `
    width: 150px;
    height: 150px;
    background-image: url(${props => (props.imgUrl)});
    
`

export default function MovieFrame(props) {
    return (
        <StyledButton imgUrl={props.imgUrl} danger outline />
    );
}