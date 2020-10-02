import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

const Text = styled.p `

`

export default function MovieText(props) {
    const { text } = props
    return ( <
        Text > { text } < /Text>
    );
}