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
const Text = styled.h4`
        text-align: center;
`


export default function Showcase(props) {

    const [movieContainersArr, setMovieContainersArr] = useState([]);
    const [title, setTitle] = useState('');
    const [mainObj, setMainObj] = useState([])
    const [movieArr, setMovieArr] = useState([])

    useEffect(() => {
        const newData = props.allMovies || []
        setTitle(props.title)
        let movieContainerArr = []
        for (let i = 0; i < newData.length; i++) {
            movieContainerArr.push(<MovieContainer addMovie={addMovie} movieId={newData[i][0]} text={newData[i][1]} key={newData[i][0]} callNewMovies={callNewMovies} />);
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

    const addMovie = (movieId)=>{
        let tmp = movieArr
        tmp.push(movieId)
        setMovieArr(tmp)
        props.giveInfo(movieId)
        console.log("movieArr: ", props)
    }

    const callNewMovies = async (id) => {
        const res = await fetch(`http://localhost:5000/similar/${id}`)
        const data = await res.json()
        const all = data.Fuckinall
        let movieContainerArr = []
        for (let i = 0; i < all.length; i++) {
            movieContainerArr.push(<MovieContainer addMovie={addMovie} movieId={all[i][0]} text={all[i][1]} key={i + 'movie'} callNewMovies={callNewMovies} />);
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
            if (mainArr.length == 2) {
                mainArr.push(
                    <React.Fragment>
                        <Text>Вам может понравиться</Text>
                        <Container >
                            {tmpArr}
                        </Container >
                    </React.Fragment>
                )
            }
            else {
                mainArr.push(
                    <Container >
                        {tmpArr}
                    </Container >
                )
            }
        })
        if (mainArr.length < 6) setMainObj(mainArr)
    }
    console.log(props)
    return (
        <React.Fragment>
            <Title > {title} </Title>
            <MainContainer >
                {mainObj}
            </MainContainer >
        </React.Fragment>
    );
}