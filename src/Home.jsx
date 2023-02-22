import React, { useEffect, useState } from 'react'
import Header from "../components/common/Header"
import Banner from "../components/Banner"
import Nextright from "../components/Nextright"
import Downslides from "../components/Downslides"
import { Box,styled } from "@mui/material"

import { categoriesMovies } from '../api';
import { NOW_PLAYING } from "../components/APiurl/Constant";

const Container = styled(Box)`
    padding: 0 115px !important;
    padding: 20px;
`;

const Wrapper = styled(Box)`
    display: flex;
    padding: 20px 0;
`;

const Home = () => {

  const [movies, setmovies] = useState([]);

  useEffect(() => {

    const getMovies = async () => {
      let moviesdata = await categoriesMovies(NOW_PLAYING);
      setmovies(moviesdata.results);
    }
    getMovies();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Wrapper>
          <Banner movies={movies} />
          <Nextright movies={movies} />
        </Wrapper>
        <Downslides movies={movies}/>
        <Downslides movies={movies}/>
        <Downslides movies={movies}/>
        <Downslides movies={movies}/>
        <Downslides movies={movies}/>
        <Downslides movies={movies}/>
      </Container>
    </>
  )
}

export default Home;
