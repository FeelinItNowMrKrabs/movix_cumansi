import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

const Conteiner = styled.div`
    display: block;
    width: 100%;
    height: 100%;
`
const Header = styled.header`
    display: block;
    width: 100%;
    height: 60px;
    background: #282e34;
`
const Text = styled.h2`
    text-align: center;
`

export default function StartPage(props) {

    const [elem, setElement] = useState([])

    const func = async () =>{
        var text = document.getElementsByTagName("input")[0];
        var val = text.value;
        const res = await fetch(`http://localhost:5000/request/${val}`)
        const data = await res.json()
        if(data.res == 0){
            window.location.assign(`http://localhost:3000/${val}`)
        }
        if(data.res == 0)
    }

    return (
        <Conteiner>
            <Header />
            <Text>Добро пожаловать, укажите id пользователя</Text>
            <form id="form" onSubmit={(e)=>{ 
                e.preventDefault()
                func()}}>
                <input style={{ width: '300px', margin: 'auto' }} type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping"></input>
            </form>
        </Conteiner >
    );
}