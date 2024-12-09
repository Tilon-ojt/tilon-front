import React from "react";
import styled, { css } from "styled-components";
import { darken } from "polished"; // polished의 darken 함수 가져오기

// 예시
{
  /* <TheButton $primary>Primary 버튼</TheButton>
      <TheButton $danger>Danger 버튼</TheButton>
      <TheButton>Default 버튼</TheButton>
      <TheButton $secondary>secondary 버튼</TheButton>
      <TheButton $dark>dark 버튼</TheButton>
      <TheButton $background="pink">Custom 버튼</TheButton>
      <TheButton $warning> Warngin 버튼</TheButton> */
}

const TheButton2 = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default TheButton2;

const StyledButton = styled.button`
  color: black; /* 기본 텍스트 색상 */
  background-color: ${(p) => p.$background || "#fff"}; /* 기본 배경 색상 */
  padding: 10px 20px;
  border: 1px solid #ced4da; /* 기본 테두리 */
  border-radius: 5px;
  cursor: pointer;
  width: ${(p) => (p.width ? p.width : "auto")};

  &:hover {
    background-color: ${(p) =>
      darken(0.1, p.$background || "#fff")}; /* 기본 호버 배경 색상 */
  }

  ${(p) =>
    p.$primary &&
    css`
      background-color: #0d6efd;
      color: white;

      &:hover {
        background-color: ${darken(0.1, "#0d6efd")};
      }
    `}

  ${(p) =>
    p.$danger &&
    css`
      background-color: #dc3545;
      color: white;

      &:hover {
        background-color: ${darken(0.1, "#dc3545")};
      }
    `}

  ${(p) =>
    p.$secondary &&
    css`
      background-color: #adb5bd;
      color: white;

      &:hover {
        background-color: ${darken(0.1, "#adb5bd")};
      }
    `}

  ${(p) =>
    p.$dark &&
    css`
      background-color: #212529;
      color: white;

      &:hover {
        background-color: ${darken(
          0.1,
          "#212529"
        )}; /* 호버 시 밝아지는 어두운 회색 */
      }
    `}

  ${(p) =>
    p.$warning &&
    css`
      background-color: #ffc107;
      color: black;

      &:hover {
        background-color: ${darken(0.1, "#ffc107")};
      }
    `}
`;
