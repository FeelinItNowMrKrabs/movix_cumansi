import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Showcase from '../components/showcase/showcase'

const Conteiner = styled.div`

`
const genres = ['Боевики', 'Комедии', 'Драмы', 'Мультфильмы']

export default function Main() {

    const [boeviks, setBoeviks] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/get_boeviks')
            .then(res => res.json())
            .then(data => {setBoeviks(data.boeviks) })
    }, [])

    let showcaseArr = genres.map((elem) => {
        return (<Showcase data={boeviks} title={elem} />)
    },[])

    return (
        <Conteiner >
            {showcaseArr}
        </Conteiner>
    )
}