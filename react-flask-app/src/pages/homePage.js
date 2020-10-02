import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Showcase from '../components/showcase/showcase'

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
`
const Header = styled.header`
    display: block;
    width: 100%;
    height: 60px;
    background: #282e34;
`

const genres = ['Боевики', 'Вестерны', "Детекстивы", "Для детей", 'Комедии', "Мелодрамы", "Мультфильмы", "Приключения", "Спорт", "Триллер", "Ужасы", "Фантастика"]

export default function Main() {

    const [boeviks, setBoeviks] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/get_boeviks')
            .then(res => res.json())
            .then(data => { setBoeviks(data.boeviks) })
    }, [])

    let showcaseArr = genres.map((elem) => {
        return (<Showcase data={boeviks} title={elem} />)
    }, [])

    return (
        <Conteiner >
            <Header/>
            <Form>
                {showcaseArr}
            </Form>
        </Conteiner>
    )
}