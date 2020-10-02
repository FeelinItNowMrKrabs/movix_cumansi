import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import MovieContainer from "../movie/movieContainer";


const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-content: space-between;
`
const MainContainer = styled.div`
    width: auto;
    height: auto;
    display: flex;
    align-content: space-between;
    flex-direction: column;
    border-bottom: solid;
    margin: 0 15px;
`
const Title = styled.h2`
        text-align: center;
`

export default function Showcase(props) {

    const [movieContainersArr, setMovieContainersArr] = useState([]);
    const [title, setTitle] = useState('');
    const [mainObj, setMainObj] = useState([])
    const [boeviks, setBoeviks] = useState([])

    useEffect(() => {
        console.log(props.allMovies)
        const newData = props.allMovies || []
        setTitle(props.title)
        let movieContainerArr = []
        for (let i = 0; i < newData.length; i++) {
            movieContainerArr.push(<MovieContainer movieId={newData[i][0]} text={newData[i][1]} key={newData[i][0]} callNewMovies={callNewMovies} />);
        }
        let tempArr = movieContainersArr;
        tempArr.push(movieContainerArr)
        setMovieContainersArr(tempArr)
        let mainArr = []
        tempArr.map(containers => {
            let tmpArr = []
            containers.map(elem => {
                tmpArr.push(elem)
            })
            mainArr.push(
                <Container >
                    {tmpArr}
                </Container >
            )
        })
        setMainObj(mainArr)
    }, [props.data, props.allMovies])

    const callNewMovies = async () => {
        const res = await fetch(`http://localhost:5000/similar/${props.movieId}`)
        const data = res.json()
        let movieContainerArr = []
        for (let i = 0; i < 5; i++) {
            movieContainerArr.push(<MovieContainer key={i + 'movie'} callNewMovies={callNewMovies} />);
        }
        let tempArr = movieContainersArr;
        tempArr.push(movieContainerArr)
        setMovieContainersArr(tempArr)
        let mainArr = []
        tempArr.map(containers => {
            let tmpArr = []
            containers.map(elem => {
                tmpArr.push(elem)
            })
            mainArr.push(
                <Container >
                    {tmpArr}
                </Container >
            )
        })
        if(mainArr.length < 6) setMainObj(mainArr)
    }

    return (
        <React.Fragment>
            <Title > {title} </Title>
            <MainContainer >
                {mainObj}
            </MainContainer >
        </React.Fragment>
    );
}