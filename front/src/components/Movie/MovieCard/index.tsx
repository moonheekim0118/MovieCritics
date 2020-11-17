import React from 'react';
import styled from 'styled-components';
import { MovieList } from '../../../model/MovieList';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../../atoms/Icons';

interface Props {
    Movie?:MovieList
}

// 검색창 검색시 해당 영화 리스트 가져오기
const MovieCard=({Movie}:Props)=>{

    return(
        <Container>
            <MoviePoster src={Movie.image}/>
            <MovieDescription>
                <MovieTitle>{Movie.title}</MovieTitle>
                <p>{Movie.director} 감독</p>
                <p> 2019.08 제작</p>
            </MovieDescription>
            <Selector>
                <Icon
                size={45}
                icon={faPlusCircle}
                />
            </Selector>
        </Container>
    );
}

const Container = styled.div`
    display:flex;
    align-items:center;
    width:100%;
    height:200px;
    position:relative;
    
    border-bottom:1px solid #f4f4f4; 

    padding: 10px 20px;
    margin-top:20px;
    cursor:pointer;
`;

const MoviePoster = styled.img`
    width: 150px;
    height: 100%;
    object-fit: scale-down;
    margin-right:20px;
`;

const MovieDescription = styled.div`
    width:100%;
    height:50%;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
`;

const MovieTitle = styled.p`
    font-size:1.5rem;
    font-weight:bold;
`;

const Selector = styled.div`
    z-index:1000;
    position:absolute;
    bottom:60px;
    right:30px;
`;

export default MovieCard;