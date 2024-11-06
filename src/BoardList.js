import React, { Component, useCallback, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Axios from "axios";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

function Board({id, title, registerId, date, onCheckboxChange}){
  return(
    <tr>
      <td>
        <Form.Check // prettier-ignore
          type="checkbox"
          id={`default-checkbox`}
          value={id}
          onChange={(e)=>{
            onCheckboxChange(e.target.checked, e.target.value)
          }}
        />
      </td>
      <td>{id}</td>
      <td><Link to={`/view/${id}`}>{title}</Link> </td>
      <td>{registerId}</td>
      <td>{date}</td>
    </tr>
  )
}

const BoardList = ({isComplete, handleModify})=>{
  const [ boardList, setBoardList ] = useState([]);
  const [ checkList, setCheckList ] = useState([]);

  // 체크박스가 체크되어있는지 확인하고 체크되어 있다면 list에 id값을 넣어준다?
  const onCheckboxChange = (checked, id) =>{
    setCheckList((prevList)=>{    //prevList는 chechList의 기존 값, return 값이 있어야한다.
      if(checked){
        return [...prevList,id];    //id값을 추가한다 만약 중복된 값이라면 교체한다 그래서 굳이 if문으로 중복된 값인지 확인할 필요가 없어졌다
      }else{
        return prevList.filter(item=> item !== id);   //id와 일치하지 않는 것만 골라서 새로운 배열을 만들어준다
      }
    })
  }
  const getList = useCallback(()=>{   //getList의 값이 이전값과 비교하여 변경되었는지 확인하고 변경되었다면 실행
    Axios.get('http://localhost:8000/list')
    .then((res) => {
      //const data = res.data;  
      const {data} = res;  //destructuring 비구조할당
      setBoardList(data);
    })
    .catch((err)=> {
      // 에러 핸들링
      console.log(err);
    });  
  },[])

  const handleDelete = ()=>{
    if(this.state.checkList.length === 0){
      alert('삭제할 게시글을 선택하세요');
      return;      
    }    
    
    let boardIDList = checkList.join(); //1,2,3
      Axios.post('http://localhost:8000/delete',{
        boardIDList
      })
      .then((res) => {
        this.getList();
      })
      .catch((e)=> {
        // 에러 핸들링
        console.log(e);
      });    
  }

  useEffect(()=>{
    getList();
  }, [getList])    //최초 한번 getList 실행, getList객체가 변경되면 다시 실행

  useEffect(()=>{
    if(isComplete){
      getList();
    }
  }, [isComplete]) 


  return(
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>선택</th>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {
            boardList.map(
              item=><Board 
                key={item.BOARD_ID} 
                id={item.BOARD_ID} 
                title={item.BOARD_TITLE} 
                registerId={item.REGISTER_ID} 
                date={item.REGISTER_DATE}
                onCheckboxChange={onCheckboxChange}
              /> )
          }          
        </tbody>
      </Table>
      <div className="d-flex gap-1">
        <Link to="/write" className="btn btn-primary">
          글쓰기
        </Link>
        
        <Button variant="secondary" onClick={()=>{
          handleModify(checkList);
        }}>수정하기</Button>
        <Button variant="danger" onClick={handleDelete}>삭제하기</Button>
      </div>      
    </>
  )
}
export default BoardList;
