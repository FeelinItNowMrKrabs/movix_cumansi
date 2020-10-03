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
`
const Form = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
`

export default function GeneralPage(props) {

    const [elem, setElement] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/top25')
            .then(res => res.json())
            .then(data => {
                let tmp = []
                data.top25.map((elem) => {
                    tmp.push(
                        <MovieContainer text={elem[1]} callNewMovies={() => { }} />

                    )
                })
                setElement(tmp)
            })

    }, [])

    return (
        <Conteiner>
            <Header />
            <Text>Так как вы не прошли опрос, вам рекомендуется просмотреть эти фильмы</Text>
            <Form>
                {elem}
            </Form>
        </Conteiner >
    );
}