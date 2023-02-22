import { useState, useEffect } from 'react';
import { categoriesMovies } from '../api';

import "react-multi-carousel/lib/styles.css";
import Carousel from 'react-multi-carousel';
import MoviesList from '../components/MovieList';

import {UPCOMING,TOP_RATED,POPULAR_API}  from "../components/APiurl/Constant";

import { useLocation } from 'react-router-dom';
import { Box, Typography, Divider, styled } from '@mui/material'

// components
import Header from '../components/common/Header';


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const Component = styled(Box)`
    width: 83%;
    margin: auto;
`;

const Container = styled(Box)`
    background: #F5F5F5;
    text-align: left;
    padding: 10px;
`

const Banner = styled('img')({
    height: 450,
    width: '100%'
})

const type = {
  popular: 'Most Popular',
  upcoming: 'Upcoming',
  toprated: 'Top Rated'
}

const CategoryMovie = () => {
    
    const [movies, setMovies] = useState([]);

    const { search } = useLocation();
    
    useEffect(() => {
        const getData = async (API_URL) => {
            let response = await categoriesMovies(API_URL);
            setMovies(response.results);
        }

        let API_URL="";
        if(search.includes("popular")){
          API_URL=POPULAR_API;
        }
        else if(search.includes("toprated")){
          API_URL=TOP_RATED;
        }
        else{
          API_URL=UPCOMING;
        }

        getData(API_URL);
    }, [search]) //We want to call this function again and again as the result in search bar changes

    return (
        <>
            <Header />
            <Component>
                <Carousel
                    swipeable={false}
                    draggable={false}
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    showDots={false}
                    slidesToSlide={1}
                    containerClass="carousel-container"
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {
                        movies.map(movie => (
                            <Banner key={movie.id} src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} />
                        ))
                    }
                </Carousel>
                <Container>
                    <Typography variant="h6">IMDb Charts</Typography>
                    <Typography variant="h4">{type[search.split('=')[1]]} Movies</Typography>
                    <Typography style={{ fontSize: 12, margin: 5 }}>As determined by IMDb Users</Typography>
                    <Divider />
                    <MoviesList movies={movies} />
                </Container>
            </Component>
        </>
    )
}

export default CategoryMovie;