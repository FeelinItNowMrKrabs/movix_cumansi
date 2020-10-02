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

async function requestLinkMovies(movieId) {
    const res = await fetch(`http://localhost:5000/get_movie/171699`)
    const data = res.json()
    console.log("movie id: ", data)
}

export default function Showcase(props) {

    const [movieContainersArr, setMovieContainersArr] = useState([]);
    const [title, setTitle] = useState('');
    const [mainObj, setMainObj] = useState([])

    useEffect(() => {
        setTitle(props.title)
        let movieContainerArr = []
        for (let i = 0; i < 5; i++) {
            movieContainerArr.push(<MovieContainer key={i} callNewMovies={callNewMovies} requestLinkMovies={requestLinkMovies} />);
        }
        let tempArr = movieContainersArr;
        tempArr.push(movieContainerArr)
        setMovieContainersArr(tempArr)
        /*console.log(movieContainersArr)*/

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

    }, [])

    const callNewMovies = (movieId) => {
        
        console.log("click")
        //request new movies with id
        let movieContainerArr = []
        for (let i = 0; i < 5; i++) {
            movieContainerArr.push(<MovieContainer key={i+'a'} callNewMovies={callNewMovies} requestLinkMovies={requestLinkMovies} />);
        }
        console.log('arr:', movieContainersArr)
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