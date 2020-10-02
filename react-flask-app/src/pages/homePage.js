import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Showcase from '../components/showcase/showcase'
import { Button } from 'bootstrap-4-react';

const Conteiner = styled.div`
    display: block;
    width: 100%;
    height: 100%;
`
const Form = styled.div`
    display: flex;
    width: 70%;
    height: 100%;
    flex-direction: column;
    margin: auto;
    margin-top: 50px;
    border: solid 5px;
    border-radius: 20px;
    border-color: crimson;
`
const Header = styled.header`
    display: block;
    width: 100%;
    height: 60px;
    background: #282e34;
`

const StyledButtonSuc = styled(Button)`
    position: fixed;
    right: 30vh;
    bottom: 0;
    width: 150px;
    height: 50px;
`
const StyledButtonWar = styled(Button)`
    position: fixed;
    left: 30vh;
    bottom: 0;
    width: 150px;
    height: 50px;
`

const genres = ['Боевики', 'Вестерны', "Детекстивы", "Для детей", 'Комедии', "Мелодрамы", "Мультфильмы", "Приключения", "Спорт", "Триллер", "Ужасы", "Фантастика"]

export default function Main(props) {

    const [boeviks, setBoeviks] = useState([])
    const [topMovies, setTopMovies] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/get_boeviks')
            .then(res => res.json())
            .then(data => { setBoeviks(data.boeviks) })

        fetch('http://localhost:5000/top25')
            .then(res => res.json())
            .then(data => { setTopMovies(data.top25) })
    }, [])

    let showcaseArr = genres.map((elem) => {
        return (<Showcase topMovies={topMovies} data={boeviks} title={elem} />)
    }, [])
    console.log(props)
    return (
        <Conteiner >
            <Header />
            <StyledButtonSuc success>Access</StyledButtonSuc>
            <StyledButtonWar warning onClick={()=>{window.location.assign('http://localhost:3000/general');}}>Skip questionnaire</StyledButtonWar>
            <Form>
                {showcaseArr}
            </Form>
        </Conteiner>
    )
}