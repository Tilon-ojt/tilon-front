import { Menu, X } from 'lucide-react';
import "./Header.css"
import { useState } from 'react';

function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            {/* 헤더 */}
            <header className="header">
                <div className="logo-container">
                    <img src="https://www.tilon.com/dist/pc_logo.png?a30e64d3cafa9a2c5cbf7b217ccc9aba" alt="Tilon Logo" className="tilon-logo" />
                </div>
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="menu-icon-button"
                >
                    <Menu className='menu-icon' />
                </button>
            </header>

            {/* 사이드 네비게이션 메뉴 */}
            <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="close-btn"
                >
                    <X className='close-icon' />
                </button>
                <nav className="nav">
                    <div>
                        <p className='nav-title'>Company</p>
                        <ul>
                            <li>
                                <a href="#">
                                    <p>회사소개</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <p>윤리경영</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <p>오시는길</p>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className='nav-title'>Solution & Service</p>
                        <ul>
                            <li>
                                <a href="#">
                                    <p style={{width: '54px'}}>가상화</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <p>메타버스</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <p>클라우드</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <p>블록체인</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <p>제로디바이스</p>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className='nav-title'>Business</p>
                        <ul>
                            <li>
                                <a href="#">
                                    <p>구축사례</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <p>파트너사</p>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className='nav-title'>News</p>
                        <ul>
                            <li>
                                <a href="#">
                                    <p>공지사항</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <p>보도자료</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <p>관련뉴스</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <p>인사이트</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className='nav-title'>IR</p>
                        <ul>
                            <li>
                                <a href="#">
                                    <p>재무정보</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <p>공시정보</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <p>IR 게시판</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <p>IR contact</p>
                                </a>
                            </li>
                        </ul>
                    </div>

                </nav>
            </div>
        </div>
    )
}

export default Header;