import React, { useState, useEffect } from 'react';
import { Button } from 'bootstrap-4-react';
import styled from 'styled-components'

const StyledButton = styled(Button)
    `
    width: 150px;
    height: 150px;
    background-image: url("https://vk.vkfaces.com/858228/v858228285/ca238/YvsZhIEkU_8.jpg");
`

export default function MovieFrame() {

    return (
        <StyledButton danger outline />
    );
}