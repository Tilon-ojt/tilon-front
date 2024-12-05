import React from 'react';
import styled from 'styled-components';

// Sidebar 컴포넌트
function Sidebar() {
  const menuItems = [
    { label: 'Main Page', link: '/admin' },
    { label: '회원 정보 수정', link: '/admin/myinfo' },
    { label: 'News', link: '/admin/news' },
    { label: 'PR', link: '/admin/pr' },
    { label: 'Insight', link: '/admin/insight' },
    { label: '유저 관리', link: '/admin/user' }, // super만 보이게 수정 필요
  ];

  return (
    <Container>
      <Logo>
        <img
          alt="logo"
          src="https://www.tilon.com/dist/pc_logo.png?a30e64d3cafa9a2c5cbf7b217ccc9aba"
        />
      </Logo>
      <Divider/>
      <Menu>
        {menuItems.map((item, index) => (
          <MenuItem key={index}>
            <MenuLink href={item.link}>{item.label}</MenuLink>
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
}

export default Sidebar;

// styled-components로 스타일 정의
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background: #1D253A;
  padding-top: 20px;
`;

const Logo = styled.div`
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
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 10px 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #27324E;
    border-left: 5px solid #5060FD;
  }
`;

const MenuLink = styled.a`
  text-decoration: none;
  color: lightgray;
  font-size: 22px;

  &:hover {
    color: white;
  }
`;
