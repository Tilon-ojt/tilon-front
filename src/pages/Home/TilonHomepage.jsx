import React, { useEffect, useRef, useState } from 'react';
import Header from './Header/Header';
import Banner from './Banner/Banner';
import './TilonHomepage.css';
import Footer from './Footer/Footer';
import News from './News/News';
import PrInsight from './PrInsight/PrInsight';

const TilonHomepage = () => {
  const isScrolling = useRef(false);
  const [showChevron, setShowChevron] = useState(false); // 버튼 보이기 상태
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 770);

  // 각 섹션의 ref 생성 (Banner 포함)
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // 화면이 770이하면 스크롤 이벤트가 발생되지않도록함.
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 770);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = (e) => {
      if (!isWideScreen) return;

      // 스크롤을 내리면 버튼 보이기, 최상단에서만 숨기기
      if (window.scrollY > 50) {
        setShowChevron(true);
      } else {
        setShowChevron(false);
      }

      e.preventDefault();
      if (isScrolling.current) return;

      const scrollDirection = e.deltaY > 0 ? 1 : -1;

      const footerRef = sectionRefs[sectionRefs.length - 1];
      const footerRect = footerRef.current.getBoundingClientRect();

      if (footerRect.top < window.innerHeight && scrollDirection === -1) {
        isScrolling.current = true;

        sectionRefs[sectionRefs.length - 2].current.scrollIntoView({
          behavior: 'smooth',
        });

        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
        return;
      }

      const currentSectionIndex = sectionRefs.findIndex((ref) => {
        if (!ref.current) return false;

        const rect = ref.current.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight;
      });

      const nextSectionIndex = currentSectionIndex + scrollDirection;

      if (nextSectionIndex >= 0 && nextSectionIndex < sectionRefs.length) {
        isScrolling.current = true;

        sectionRefs[nextSectionIndex].current.scrollIntoView({
          behavior: 'smooth',
        });

        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true }); // 스크롤 이벤트 추가

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('scroll', handleScroll); // 스크롤 이벤트 제거
    };
  }, [isWideScreen, sectionRefs]);

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
      <Header />

      <div className="section" ref={sectionRefs[0]}>
        <Banner />
      </div>
      <div className="section" ref={sectionRefs[1]}>
        <News />
      </div>
      <div className="section" ref={sectionRefs[2]}>
        <PrInsight />
      </div>
      <footer className="footer-section" ref={sectionRefs[3]} style={{ width: '100%', height: '250px' }}>
        <Footer />
      </footer>
    </div>
  );
};

export default TilonHomepage;
