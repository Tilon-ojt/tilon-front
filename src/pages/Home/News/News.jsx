import { useEffect, useRef, useState } from "react";
import "./News.css";
import api from "../../../api/axios";

function News() {
  const cardRefs = useRef([]); // 카드 참조 배열
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // API 호출
    api
      .get("/user/homepage?category=NEWS")
      .then((response) => {
        const latestNews = response.data.slice(0, 4); // 최신 4개 뉴스 선택
        console.log("api 응답 성공:", latestNews);
        setNewsData(latestNews); // newsData 업데이트
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []); // 초기 1회만 실행

  useEffect(() => {
    // IntersectionObserver 생성
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    // 렌더링 이후 카드 요소 감시
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    // cleanup 함수로 observer 해제
    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [newsData]); // newsData 변경 시 실행

  return (
    <div className="news">
      <div className="news-title">
        <strong>News</strong>
        <span>틸론의 새로운 소식을 접해보세요.</span>
      </div>
      <div className="news-cards">
        {newsData.length > 0 ? (
          newsData.map((news, index) => (
            <div
              key={index}
              className="card"
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <a href={news.link} target="_blank" rel="noopener noreferrer">
                <img alt={`news-img${index + 1}`} src={news.thumbnail} />
                <span>{news.title}</span>
              </a>
            </div>
          ))
        ) : (
          <p>뉴스 데이터가 없습니다</p>
        )}
      </div>
    </div>
  );
}

export default News;
