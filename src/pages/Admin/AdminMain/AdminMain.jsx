import styled from "styled-components";

import NewsList from '../news/NewsList.jsx';
import EditNews from '../news/EditNews.jsx';
import EditProfile from '../MyInfo/EditProfile.jsx';
import CreateNews from '../news/CreateNews.jsx';
import EditPr from '../Pr/EditPr.jsx';
import Insight from '../Insight/Insight.jsx';


import Sidebar from "../../../components/common/Sidebar";
import Navbar from "../../../components/common/Navbar";

// AdminLogin 컴포넌트
function AdminMain() {
  return (
    <Container>
      <Sidebar/>
      <Navbar/>
      <Title>AdminXXXX</Title>
    </Container>
  );
}


// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;  /* 화면을 꽉 채우도록 설정 */

  margin-left:20%;
  margin-top:62px;

  background-color: #f4f4f4;

`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin: 0;  /* 기본 margin을 없애기 위한 설정 */
`;
export default AdminMain;
