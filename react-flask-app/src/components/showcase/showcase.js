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
    width: 100%;
    height: auto;
    display: flex;
    align-content: space-between;
    flex-direction: column;
`
const Title = styled.p`

`

export default function Showcase(props) {

    const [movieContainersArr, setMovieContainersArr] = useState([]);
    const [title, setTitle] = useState('');
    const [mainObj, setMainObj] = useState([])
    const [boeviks, setBoeviks] = useState([])

    useEffect(() => {
        const newData = props.data
        setTitle(props.title)
        let movieContainerArr = []
        for (let i = 0; i < newData.length; i++) {
            movieContainerArr.push(<MovieContainer text={newData[i][2]} key={i} callNewMovies={callNewMovies} />);
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
    }, [props.data])

    const callNewMovies = (movieId) => {
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