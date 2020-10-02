import React from 'react'
import styled from 'styled-components'
import Showcase from '../components/showcase/showcase'

const Conteiner = styled.div`

`
const genres = ['Боевики', 'Комедии', 'Драмы', 'Мультфильмы']

export default function Main() {

    let showcaseArr = genres.map((elem)=>{
        return(<Showcase title={elem} />)
    })

    return (
        <Conteiner >
            {showcaseArr}
        </Conteiner>
    )
}