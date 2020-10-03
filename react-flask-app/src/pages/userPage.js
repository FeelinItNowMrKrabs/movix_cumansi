import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import MovieContainer from "../components/movie/staticMovieContainer";

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
    margin: 25px;
`
const Form = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
`

async function userChoise(arr, userId){
    const res = await fetch(`http://localhost:5000/send_likes/${arr}`)
    const data = await res.json()
    return data;
}

export default function UserPage(props) {

    const [elem, setElement] = useState([])

    useEffect(async () => {
        let arr = sessionStorage.getItem('arr') || []
        if(arr!=[]){ 
            let data = await userChoise(arr,props.match.params.id)
        
        sessionStorage.removeItem('arr')
        let tmp = []
        data.custoized.map((elem) => {
            tmp.push(
                <MovieContainer text={elem[1]} callNewMovies={() => { }} />
            )
        })
        setElement(tmp)
    }
    }, [])

    return (
        <Conteiner>
            <Header />
            <Text>Рекомендуем посмотреть эти фильмы))</Text>
            <Form>
                {elem}
            </Form>
        </Conteiner >
    );
}