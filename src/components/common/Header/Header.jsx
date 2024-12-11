import { CLOSE_MENU, OPEN_MENU } from "../../../reducer/HeaderBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Header.css";

function Header({ headerBackground }) {
  const isShow = useSelector((state) => state.headerbar.isShow);
  const dispatch = useDispatch();

  const closeShow = () => {
    dispatch({ type: CLOSE_MENU });
  };

  const openShow = () => {
    dispatch({ type: OPEN_MENU });
  };

  const navigate = useNavigate();

  return (
    <div>
      <header
        className={`header ${headerBackground ? "headerbackgorund" : ""}`}
      >
        <div className="logo-container">
          <img
            src="https://www.tilon.com/dist/pc_logo.png?a30e64d3cafa9a2c5cbf7b217ccc9aba"
            alt="Tilon Logo"
            className="tilon-logo"
          />
        </div>
        <button onClick={openShow} className="menu-icon-button">
          <Menu className="menu-icon" />
        </button>
      </header>

      {/* 사이드 네비게이션 메뉴 */}
      <div className={`sidebar ${isShow ? "open" : ""}`}>
        <button onClick={closeShow} className="close-btn">
          <X className="close-icon" />
        </button>
        <nav className="nav">
          <div>
            <p className="nav-title">Company</p>
            <ul>
              <li>
                <a href="">
                  <p onClick={() => navigate("/admin")}>회사소개</p>
                </a>
              </li>
              <li>
                <a href="https://www.tilon.com/ethic/ecode">
                  <p>윤리경영</p>
                </a>
              </li>
              <li>
                <a href="https://www.tilon.com/contact">
                  <p>오시는길</p>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="nav-title">Solution & Service</p>
            <ul>
              <li>
                <a href="https://www.tilon.com/virtual/ds">
                  <p style={{ width: "54px" }}>가상화</p>
                </a>
              </li>
              <li>
                <a href="https://www.tilon.com/metaverse/cv">
                  <p>메타버스</p>
                </a>
              </li>
              <li>
                <a href="https://www.tilon.com/cloud/dc">
                  <p>클라우드</p>
                </a>
              </li>
              <li>
                <a href="https://www.tilon.com/bchain/ms">
                  <p>블록체인</p>
                </a>
              </li>
              <li>
                <a href="https://www.tilon.com/zero/obb">
                  <p>제로디바이스</p>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="nav-title">Business</p>
            <ul>
              <li>
                <a href="https://www.tilon.com/exp/public">
                  <p>구축사례</p>
                </a>
              </li>
              <li>
                <a href="https://www.tilon.com/tba/program">
                  <p>파트너사</p>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="nav-title">News</p>
            <ul>
              <li>
                <a href="https://www.tilon.com/inside/notice">
                  <p>공지사항</p>
                </a>
              </li>
              <li>
                <a href="https://www.tilon.com/inside/article">
                  <p>보도자료</p>
                </a>
              </li>
              <li>
                <a href="https://www.tilon.com/inside/news">
                  <p>관련뉴스</p>
                </a>
              </li>
              <li>
                <a href="https://www.tilon.com/inside/insight">
                  <p>인사이트</p>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="nav-title">IR</p>
            <ul>
              <li>
                <a href="https://www.tilon.com/finance/report">
                  <p>재무정보</p>
                </a>
              </li>
              <li>
                <a href="https://www.tilon.com/investments/info">
                  <p>공시정보</p>
                </a>
              </li>
              <li>
                <a href="https://www.tilon.com/irboard/results">
                  <p>IR 게시판</p>
                </a>
              </li>
              <li>
                <a href="https://www.tilon.com/investments/ircontact">
                  <p>IR contact</p>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
