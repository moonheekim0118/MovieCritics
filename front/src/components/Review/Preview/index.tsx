import React , { useEffect, useState, useCallback } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import Router from 'next/router';
import styled from 'styled-components';
import Badge from '../Badge';
import Icon from '../../../atoms/Icons';
import ConfirmAlert from '../../ConfirmAlert';
import useAlert from '../../../hooks/useAlert';
import { OPEN_ALERT } from '../../../actions/alert';
import { REMOVE_MY_REVIEW_REQUEST } from '../../../actions/review';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ReviewList } from '../../../model/ReviewList';
import { Container,MoviePoster,MovieDescription } from '../../Movie/MovieCard';

interface Props {
    Review?:ReviewList;
}

const Preview=({Review}:Props)=>{
    const dispatch = useDispatch();
    const [ showConfirmAlert, openConfirmAlert, closeConfirmAlert ] = useAlert();
    const { removeMyReviewDone, removeMyReviewError } = useSelector((state)=>state.review);
    
    const onMove = useCallback(()=>{
        Router.push(`/singleReview/${Review.id}`);
    },[]);

    
    const openRemoveAlert = useCallback((e)=>{ // alert 띄워주기 
        e.stopPropagation();
        openConfirmAlert();
    },[]);

    const closeRemoveAlert = useCallback((e)=>{ // alert 닫아주기 
        e.stopPropagation();
        closeConfirmAlert();
    },[]);

    const onClickRemove = useCallback((e)=>{ // 리뷰 삭제 
        e.stopPropagation(); 
        dispatch({type:REMOVE_MY_REVIEW_REQUEST, data:Review.id});
        closeConfirmAlert();
    },[]);

    return(
        <Container onClick={onMove}>
            {showConfirmAlert && <ConfirmAlert text={"정말 삭제하시겠습니까?"} clickYes={onClickRemove} clickNo={closeRemoveAlert}/>}
            <MoviePoster src={Review.Movie.image}/>
            <MovieDescription>
                <Comment>{Review.shortComment}</Comment>
                <Badge badgeName={Review.rating} selected={true}/>
            </MovieDescription>
            <Icon icon={faTrash} className={"faTrash"} onClick={openRemoveAlert}/>
        </Container>
    );
}

const Comment = styled.div`
    font-size:1.5rem;
    font-weight:bold;
`;

export default Preview;