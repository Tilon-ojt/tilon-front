import { jwtDecode } from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Sidebar() {
  const token = useSelector((state) => state.auth.token);
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
      <Logo>
        <img
          alt="logo"
          src="https://www.tilon.com/dist/pc_logo.png?a30e64d3cafa9a2c5cbf7b217ccc9aba"
        />
      </Logo>
      <Divider />
      <Menu>
        {menuItems
          .filter((item) => item.roles.includes(decodedToken?.role)) // 역할에 맞는 메뉴만 필터링
          .map((item, index) => (
            <MenuItem key={index}>
              <MenuLink to={item.link}>{item.label}</MenuLink>{" "}
              {/* Link로 변경 */}
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
  transition: background-color 0.3s ease;
  background-color: ${(props) => (props.isActive ? "#27324e" : "transparent")};
  border-left: ${(props) => (props.isActive ? "5px solid #5060fd" : "none")};
  margin-bottom: 20px;
  &:hover {
    background-color: #27324e;
    border-left: 5px solid #5060fd;
  }
`;

const MenuLink = styled(Link)`
  // a 태그 대신 Link 컴포넌트 사용
  text-decoration: none;
  color: lightgray;
  font-size: 22px;

  &:hover {
    color: white;
  }
`;

// import React from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom";

// // Sidebar 컴포넌트
// function Sidebar() {
//   const menuItems = [
//     {
//       label: "Main Page",
//       link: "/admin",
//       roles: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
//     },
//     { label: "회원 정보 수정", link: "/admin/myinfo", roles: ["ROLE_ADMIN"] },
//     {
//       label: "News",
//       link: "/admin/news",
//       roles: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
//     },
//     {
//       label: "PR",
//       link: "/admin/pr",
//       roles: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
//     },
//     {
//       label: "Insight",
//       link: "/admin/insight",
//       roles: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
//     },
//     { label: "유저 관리", link: "/admin/user", roles: ["ROLE_SUPER_ADMIN"] },
//   ];

//   return (
//     <Container>
//       <Logo>
//         <img
//           alt="logo"
//           src="https://www.tilon.com/dist/pc_logo.png?a30e64d3cafa9a2c5cbf7b217ccc9aba"
//         />
//       </Logo>
//       <Divider />
//       <Menu>
//         {menuItems.map((item, index) => (
//           <MenuItem key={index}>
//             <MenuLink to={item.link}>{item.label}</MenuLink>
//           </MenuItem>
//         ))}
//       </Menu>
//     </Container>
//   );
// }

// export default Sidebar;

// // styled-components로 스타일 정의
// const Container = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 300px;
//   height: 100vh;
//   background: #1d253a;
//   padding-top: 20px;
// `;

// const Logo = styled.div`
//   img {
//     height: 30px;
//     width: auto;
//     margin-left: 20px;
//   }
// `;

// const Divider = styled.hr`
//   border: none;
//   border-top: 1px solid rgba(255, 255, 255, 0.5);
// `;

// const Menu = styled.ul`
//   list-style-type: none;
//   padding: 0;
// `;

// const MenuItem = styled.li`
//   margin-bottom: 20px;
//   margin-right: 20px;
//   padding: 10px 20px;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #27324e;
//     border-left: 5px solid #5060fd;
//   }
// `;

// const MenuLink = styled(Link)`
//   text-decoration: none;
//   color: lightgray;
//   font-size: 22px;

//   &:hover {
//     color: white;
//   }
// `;
