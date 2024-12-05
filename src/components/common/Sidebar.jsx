import React, { useState } from 'react';
import styled from 'styled-components';

// Sidebar 컴포넌트
function Sidebar() {

  return (
    <Container>
      <Logo> 
        <img alt='logo'src='https://www.tilon.com/dist/pc_logo.png?a30e64d3cafa9a2c5cbf7b217ccc9aba'/>
      </Logo>              
      <hr />
      <ul>
        <li><a href="/admin">Main Page</a></li>

        <li><a href="/admin/myInfo">개인정보 수정</a></li>

        <li><a href="/admin/news">News</a></li>
        <li><a href="/admin/pr">PR</a></li>
        <li><a href="/admin/insight">Insight</a></li>

        <li><a href="/admin/userList">관리자 계정</a></li>   {/* super만 보이게 수정 */}
      </ul>
    </Container>
  );
}

// styled-components로 스타일 정의
const Container = styled.div`
  position: fixed; /* 왼쪽에 고정 */
  top: 0;
  left: 0;
  width: 300px;  /* 사이드바 너비 */
  height: 100vh; /* 전체 화면 높이 */
  background: #171036 ;
  padding-top: 20px;

  hr {
    opacity : 50%;
  }

  ul {
    list-style-type: none;
    padding : 0;
  }

  li {
    margin-bottom: 20px;
    margin-right: 20px;
    padding: 5px 20px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #333;
      border-left: 5px solid white;
    }
  }

  a {
    text-decoration: none;
    color: lightgray;
    font-size: 22px;
    
    &:hover {
      color: white;
    }
  }
`;


// 로고 이미지
const Logo = styled.image`
  img{
    height: 30px;
    width: auto;
    margin-left: 20px;
  }
`

export default Sidebar;