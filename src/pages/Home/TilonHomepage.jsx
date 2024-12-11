import Footer from "../../components/common/Footer/Footer.jsx";
import Header from "../../components/common/Header/Header.jsx";
import React, { useEffect, useRef, useState } from "react";
import PrInsight from "./PrInsight/PrInsight";
import Banner from "./Banner/Banner";
import News from "./News/News";
import "./TilonHomepage.css";

const TilonHomepage = () => {
  const isScrolling = useRef(false);
  const [showChevron, setShowChevron] = useState(false); // top버튼 보이기 상태
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 770); // 화면이 770일때는 스크롤이벤트없애고 사진으로 변경되게함
  const [isScrollingFromButton, setIsScrollingFromButton] = useState(false); // top버튼 클릭 상태 추적
  const [headerBackground, setHeaderBackground] = useState(false); // 헤더의 백그라운드 상태

  // 각 섹션의 ref 생성 (Banner 포함)
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // 화면이 770이하면 스크롤 이벤트가 발생되지않도록함.
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 770);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!isWideScreen || isScrollingFromButton) return; // 버튼 클릭 중이면 스크롤 처리하지 않음

      e.preventDefault(); // 기본스크롤을 막아줌.
      if (isScrolling.current) return; // 스크롤하며 이벤트 처리중일때는 이중 스크롤이벤트 방지

      const scrollDirection = e.deltaY > 0 ? 1 : -1;

      const footerRef = sectionRefs[sectionRefs.length - 1];
      const footerRect = footerRef.current.getBoundingClientRect(); // footer DOM요소의 위치(top) 정보를 가져온다.

      if (footerRect.top < window.innerHeight && scrollDirection === -1) {
        isScrolling.current = true;

        sectionRefs[sectionRefs.length - 2].current.scrollIntoView({
          behavior: "smooth",
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
          behavior: "smooth",
        });

        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      }
    };

    const handleScroll = (e) => {
      // 스크롤을 내리면 버튼 보이기, 최상단에서만 숨기기
      // 스크롤 내려가면 헤더에 희미한 백그라운드 적용
      if (window.scrollY > 50) {
        setShowChevron(true);
        setHeaderBackground(true);
      } else {
        setShowChevron(false);
        setHeaderBackground(false);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("scroll", handleWheel);
    };
  }, [isWideScreen, isScrollingFromButton, sectionRefs]);

  const handleIconClick = () => {
    setIsScrollingFromButton(true); // 버튼 클릭 시 상태 변경
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setShowChevron(false);

    setTimeout(() => {
      setIsScrollingFromButton(false); // 스크롤 처리 완료 후 상태 초기화
    }, 1000); // 스크롤 효과가 완료될 때까지 기다림
  };

  return (
    <div className="homepage">
      <button
        size={45}
        className={`top-icon ${showChevron ? "visible" : "hidden"}`}
        onClick={handleIconClick}
      />
      <Header headerBackground={headerBackground} />

      <div className="section" ref={sectionRefs[0]}>
        <Banner />
      </div>
      <div className="section" ref={sectionRefs[1]}>
        <News />
        {/* <NewsHome/> */}
      </div>
      <div className="section" ref={sectionRefs[2]}>
        <PrInsight />
      </div>
      <footer
        className="footer-section"
        ref={sectionRefs[3]}
        style={{ width: "100%", height: "250px" }}
      >
        <Footer />
      </footer>
    </div>
  );
};

export default TilonHomepage;
