import { jwtDecode } from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function Sidebar() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 정보를 가져옴
  // token이 유효한지 확인하고 jwtDecode 사용
  let decodedToken = null;
  if (token) {
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      console.error("JWT 디코딩 오류:", error);
    }
  }

  const menuItems = [
    {
      label: "News",
      link: "/admin/news",
      roles: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
    },
    {
      label: "PR",
      link: "/admin/pr",
      roles: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
    },
    {
      label: "Insight",
      link: "/admin/insight",
      roles: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
    },
    { label: "유저 관리", link: "/admin/user", roles: ["ROLE_SUPER_ADMIN"] },
    { label: "회원 정보 수정", link: "/admin/myinfo", roles: ["ROLE_ADMIN"] },
  ];

  return (
    <Container>
      <Logo onClick={() => navigate("/")}>
        <img
          alt="logo"
          src="https://www.tilon.com/dist/pc_logo.png?a30e64d3cafa9a2c5cbf7b217ccc9aba"
        />
      </Logo>
      <Divider />
      <Menu>
        {menuItems
          .filter((item) => item.roles.includes(decodedToken?.role))
          .map((item, index) => (
            <MenuItem
              key={index}
              isActive={location.pathname === item.link} // 현재 경로와 메뉴 링크가 일치하는지 확인
            >
              <MenuLink to={item.link}>{item.label}</MenuLink>
            </MenuItem>
          ))}
      </Menu>
    </Container>
  );
}

export default Sidebar;

// styled-components 정의
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background: #1d253a;
  padding-top: 20px;
`;

const Logo = styled.div`
  cursor: pointer;
  img {
    height: 30px;
    width: auto;
    margin-left: 20px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
`;

const Menu = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const MenuItem = styled.li`
  padding: 10px 20px;
  transition: background-color 0.3s ease, border-left 0.2s ease;
  background-color: ${(props) => (props.isActive ? "#555c68" : "transparent")};
  border-left: ${(props) => (props.isActive ? "5px solid #4a90e2" : "none")};
  margin-bottom: 20px;

  &:hover {
    background-color: #2e3b4e;
    border-left: 5px solid #4a90e2;
  }
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => (props.isActive ? "white" : "lightgray")};
  font-size: 22px;
  display: block; // 클릭 영역을 넓히기 위해 추가

  &:hover {
    color: white;
  }
`;
