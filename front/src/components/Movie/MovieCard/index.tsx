import React , { useCallback } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { SAVE_MOVIE } from '../../../actions/movie';
import { ADD_FAVORITE_MOVIE_REQUEST } from '../../../actions/user';
import { MovieList } from '../../../model/MovieList';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import useToggle from '../../../hooks/useToggle';
import styled from 'styled-components';
import Icon from '../../../atoms/Icons';
import Tooltip from '../../Tooltip';

interface Props {
    Movie:MovieList;
    Search:boolean; // 현재 SearchResult인지 아닌지 구분 
}

// 영화 정보 띄워주는 MovieCard
const MovieCard=({Movie, Search}:Props)=>{
    const dispatch = useDispatch();
    
    const [ showTooltip, setShowTooltip ]= useToggle(); // 툴팁 토글 
    const loginDone = useSelector((state)=>state.user.loginDone);

    const onWriteReview=useCallback(()=>{  // 리뷰 작성할 영화 선택-> 리뷰 작성페이지로 리당렉트 
        dispatch({ // 리뷰 작성할 영화 저장해주기 
            type:SAVE_MOVIE,
            data:Movie,
        });
        Router.push(`/writeReview`); // redirect
    },[]);

    const onAddFavorite=useCallback(()=>{ // 인생영화로 등록
        dispatch({
            type:ADD_FAVORITE_MOVIE_REQUEST,
            data:Movie,
        });
        setShowTooltip(); // 툴팁 닫기 
    },[showTooltip]);

    // 툴팁에 들어갈 Buttonlist 
    const ButtonList =
    [ 
        { title:'인생영화 등록', onClick:onAddFavorite}, 
        {title:'리뷰 작성', onClick:onWriteReview} 
    ];
    
    return(
        <Container>
            <MoviePoster src={Movie.image}/>
            <MovieDescription>
                <MovieTitle>{Movie.title}</MovieTitle>
                <p>{Movie.director} 감독</p>
                <p>{Movie.pubDate} 제작</p>
            </MovieDescription>
            {Search && loginDone &&
            <Selector>
                <Icon
                size={45}
                icon={faPlusCircle}
                className="faPlusCircle"
                onClick={setShowTooltip}
                />
            </Selector>}
            {Search && loginDone && showTooltip && <Tooltip onClose={setShowTooltip} buttonList={ButtonList}/> } 
        </Container>
    );
}

MovieCard.defaultProps={
    Search:false
}


export const Container = styled.div`
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

export const MoviePoster = styled.img`
    width: 150px;
    height: 100%;
    object-fit: scale-down;
    margin-right:20px;
`;

export const MovieDescription = styled.div`
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
    position:absolute;
    bottom:60px;
    right:30px;
`;

export default MovieCard;