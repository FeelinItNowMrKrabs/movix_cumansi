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

const genres = ['Боевики', 'Вестерны', "Детективы", "Для детей", 'Комедии', "Мелодрамы", "Мультфильмы", "Приключения", "Спорт", "Триллеры", "Ужасы", "Фантастика"]

const Spinner = () => {
    return (
        <div style={{ position: 'fixed', height: '200px', width: '200px', top: "45%", left: "45%" }} class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    )
}

async function userChoise(arr, userId){
    const res = await fetch(`http://localhost:5000/send_likes/${arr}`)
    const data = await res.json()
    console.log(data)
    return "da, vse ok"
}

export default function Main(props) {

    const [boeviks, setBoeviks] = useState([])
    const [info, setInfo] = useState([])
    const [allMovies, setallMovies] = useState([])
    const [showcaseArr, setshowcaseArr] = useState([])
    const [recomendations, setRecomendations] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/boevik')
            .then(res => res.json())
            .then(data => { setallMovies(data.fuckinAll) })
    }, [])

    useEffect(() => {
        let tmp = genres.map((elem) => {
            const data = allMovies[elem]
            return (<Showcase key={elem}  userId={props.match.params.id} allMovies={data} giveInfo={(movieId)=>{
                let arr = sessionStorage.getItem('arr') || ''
                arr.length==0 ? arr = arr + movieId.toString() : arr = arr +','+ movieId.toString()
                sessionStorage.setItem('arr', arr)
            }} 
                data={boeviks} title={elem} />)
        })
        setshowcaseArr(tmp)
    }, [allMovies])
    
    return (
        <Conteiner >
            <Header />
            {allMovies.length == 0 ?
                <Spinner /> :
                <React.Fragment>
                    <StyledButtonSuc success onClick={()=>{
                        let arr = sessionStorage.getItem('arr') || []
                        if(arr!=[]) setRecomendations(userChoise(arr,props.match.params.id))
                        sessionStorage.removeItem('arr')
                        }}>Access</StyledButtonSuc>
                    <StyledButtonWar warning onClick={() => { window.location.assign('http://localhost:3000/general'); }}>Skip questionnaire</StyledButtonWar>
                    <Form>
                        {showcaseArr}
                    </Form>
                </React.Fragment>}
        </Conteiner>
    )
}