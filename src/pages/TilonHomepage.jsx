import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import Header from './Header';
import './TilonHomepage.css';

const TilonHomepage = () => {
  const isScrolling = useRef(false); // 스크롤이 진행 중인지 여부를 추적하는 변수

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault(); // 기본 스크롤 동작 방지

      // 이미 스크롤 중이면 처리하지 않음
      if (isScrolling.current) return;

      isScrolling.current = true; // 스크롤이 진행 중이라고 설정

      const scrollDirection = e.deltaY > 0 ? 1 : -1; // 아래로 스크롤하면 1, 위로 스크롤하면 -1
      const viewportHeight = window.innerHeight; // 현재 뷰포트 높이
      const scrollPosition = window.scrollY; // 현재 스크롤 위치

      // 현재 스크롤 위치에 따라 100vh 또는 220px씩 스크롤
      if (scrollPosition + viewportHeight >= document.body.scrollHeight - 220) {
        // 페이지 맨 아래 근처에서 220px씩 스크롤
        window.scrollTo({
          top: window.scrollY + scrollDirection * 220,
          behavior: 'smooth',
        });
      } else {
        // 일반적으로 100vh씩 스크롤
        window.scrollTo({
          top: window.scrollY + scrollDirection * viewportHeight,
          behavior: 'smooth',
        });
      }

      // 1초 후에 isScrolling을 false로 설정하여 다시 스크롤을 가능하게 함
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000); // 1초 후
    };

    // 휠 스크롤 이벤트 등록
    window.addEventListener('wheel', handleScroll, { passive: false });

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  return (
    <div className="homepage">
      <div className='video-container'>
        {/* 배경 비디오 */}
        <video
          className="home-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://www.tilon.com/downloads/main_video.mp4" loop='loop' muted='muted' autoPlay='autoplay' type="video/mp4" />
        </video>
        <div className='arrow-icons-container'>
          <ChevronDown size={40} color='white' />
          <ChevronDown size={40} color='white' />
          <ChevronDown size={40} color='white' />
        </div>
      </div>
      <Header />

      <div className="section" style={{ height: '100vh', background: 'lightblue' }}>첫 번째 섹션</div>
      <div className="section" style={{ height: '100vh', background: 'lightcoral' }}>두 번째 섹션</div>
      <div className="section" style={{ height: '100vh', background: 'lightgreen' }}>세 번째 섹션</div>

      <footer style={{ width: '100%', height: '220px' }}>
        footercontent
      </footer>
    </div>
  );
};

export default TilonHomepage;
