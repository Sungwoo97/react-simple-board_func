import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BoardList from './BoardList';
import Write from './Write';
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import View from './View';

function App(){
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [boardId, setBoardId] = useState(0);
  const [redirectToWrite, setRedirectToWrite] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);

  // 수정할 id 1개가 입력되면 
  const handleModify = (checkList) => {
    if (checkList.length === 0) {
      alert('수정할 게시글을 선택하세요');
    } else if (checkList.length > 1) {
      alert('하나의 게시글만 선택하세요');
    } else{
      setIsModifyMode(true);
      setBoardId(checkList[0]);
      setRedirectToWrite(true);
    }
  }

  const handleCancel = () => {
    setIsModifyMode(false);
    setIsComplete(false);
    setBoardId(0);
    setRedirectToHome(true);
    console.log('app.js handleCancel 실행')
  }

  useEffect(()=>{
    if (redirectToWrite) {
      setRedirectToWrite(false)
    }
    if (redirectToHome) {
      setRedirectToHome(false);
    }
  },[redirectToWrite, redirectToHome])

  return(
    <BrowserRouter>
      <div className="container">
        <h1>React Board</h1>
        {redirectToWrite && <Navigate to="/write"  />}
        {redirectToHome && <Navigate to="/"  />}  {/* Navigate로 조건부 리다이렉트 */}
        <Routes>
          <Route path="/" element={<BoardList isComplete={isComplete} handleModify={handleModify} />} />
          <Route path="/write" element={<Write 
            isModifyMode={isModifyMode}
            boardId={boardId}
            handleCancel={handleCancel}
          />}
          />
          <Route path="/view/:id" element={<View/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}export default App;

