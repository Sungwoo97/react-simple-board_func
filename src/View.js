import React, { Component, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const View = ()=>{
  const [ board, setBoard ] = useState(null);
  const navigate = useNavigate();
  let { id } = useParams();
  console.log(id);

  useEffect(()=>{
    Axios.get(`http://localhost:8000/detail?id=${id}`)
    .then((res) => {
      const {data} = res;  
      setBoard({
        title : data[0].BOARD_TITLE,
        content : data[0].BOARD_CONTENT,
        image : data[0].IMAGE_PATH 
      });
    })
    .catch((err)=> {
      // 에러 핸들링
      console.log(err);
    });     
  },[id]) 

  if(!board) return <div>Loading...</div>

  return(
    <div>
      <h2>{board.title}</h2>
      <h3>본문</h3>
      {board.content}
      <hr />
      <img src={`http://localhost:8000/${board.image}`} alt="" style={{maxWidth: '300px'}} />
      <hr />
      <Button variant='secondary' onClick={()=>{navigate("/")}}>목록</Button>
    </div>
  )
}
export default View;

