import React, { useEffect, useRef, useState } from 'react';
// import Header from './Header/Header';
import Header from '../../components/elemnet/Header/Header.jsx';
import Banner from './Banner/Banner';
import './TilonHomepage.css';

import Footer from '../../components/elemnet/Footer/Footer.jsx';

import News from './News/News';
import PrInsight from './PrInsight/PrInsight';

const TilonHomepage = () => {
  const isScrolling = useRef(false); // 스크롤이 진행 중인지 여부를 추적하는 변수
  const [showChevron, setShowChevron] = useState(false); // top-icon 보이기 상태
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 770); // 화면 크기 상태

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 770); // 화면 크기 변화에 따라 상태 업데이트
    };

    window.addEventListener('resize', handleResize);

    // 화면 크기 변경시 상태 업데이트 처리
    if (window.innerWidth <= 770) {
      console.log("화면 크기가 770보다 작을때 : " + window.innerWidth);

      setIsWideScreen(false);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {

    const handleScroll = (e) => {

      // 화면 크기가 770px 이하일 때는 스크롤을 정상적으로 허용
      if (!isWideScreen) return;

      e.preventDefault(); // 기본 스크롤 동작 방지
      // 이미 스크롤 중이면 처리하지 않음
      if (isScrolling.current) return;


      // 1초 후에 isScrolling을 false로 설정하여 다시 스크롤을 가능하게 함
      setTimeout(() => {
        isScrolling.current = false;
        console.log(`1초 후 스크롤 위치 : ${window.scrollY}`);

        // 스크롤 위치에 따라 top-icon 보이기/숨기기
        if (window.scrollY === 0) {
          setShowChevron(false);
        } else {
          setShowChevron(true);
        }

      }, 1000);


      const scrollDirection = e.deltaY > 0 ? 1 : -1; // 아래로 스크롤하면 1, 위로 스크롤하면 -1
      const viewportHeight = window.innerHeight; // 현재 뷰포트 높이

      isScrolling.current = true; // 스크롤이 진행 중이라고 설정


      // window.scrollY는 현재 스크롤한 위치를 보여줌(기준이 화며 상단임)
      // 현재 스크롤 위치에 따라 100vh 또는 220px씩 스크롤
      if (window.scrollY + viewportHeight >= document.body.scrollHeight) {
        window.scrollTo({
          top: window.scrollY + scrollDirection * 250,
          behavior: 'smooth',
        });
      } else {
        window.scrollTo({
          top: window.scrollY + scrollDirection * viewportHeight,
          behavior: 'smooth',
        });
      }
    };

    // 휠 스크롤 이벤트 등록
    window.addEventListener('wheel', handleScroll, { passive: false });

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => window.removeEventListener('wheel', handleScroll);
  }, [isWideScreen]);

  // top-icon 클릭 시 맨 위로 스크롤
  const handleIconClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setShowChevron(false);
  };

  return (
    <div className="homepage">
      <button
        size={45}
        className={`top-icon ${showChevron ? 'visible' : 'hidden'}`}
        onClick={handleIconClick}
      />
      <Banner />
      <Header />

      <div className="section">
        <News />
      </div>
      <div className="section">
        <PrInsight/>
      </div>
      <div className="section" style={{ height: '100vh', background: 'lightgreen' }}>세 번째 섹션</div>

      <footer className="footer-section" style={{ width: '100%', height: '250px' }}>
        <Footer />
      </footer>
    </div>
  );
};

export default TilonHomepage;
