import { useEffect, useRef } from 'react';
import '../News/News.css';

function News() {
    const cardRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // 요소가 화면에 들어왔을 때 동작
                        entry.target.classList.add('visible');
                    } else {
                        // 요소가 화면을 벗어났을 때 동작
                        entry.target.classList.remove('visible');
                    }
                });
            },
            { threshold: 0.2 } // 요소가 20% 이상 보이면 감지
        );

        // cardRefs.current 값을 로컬 변수로 복사
        const currentCards = cardRefs.current;

        // 각 카드에 Observer 연결
        currentCards.forEach((card) => {
            if (card) observer.observe(card);
        });

        // 정리 함수 (컴포넌트가 언마운트될 때 Observer 해제)
        return () => {
            currentCards.forEach((card) => {
                if (card) observer.unobserve(card);
            });
        };
    }, []);

    return (
        <div className="news">
            <div className="news-title">
                <strong>News</strong>
                <span>틸론의 새로운 소식을 접해보세요.</span>
            </div>
            <div className="news-cards">
                {[1, 2, 3, 4].map((_, index) => (
                    <div
                        key={index}
                        className="card"
                        ref={(el) => (cardRefs.current[index] = el)} // ref 등록
                    >
                        <a href="https://www.naver.com">
                            <img
                                alt={`news-img${index + 1}`}
                                src="https://tilon.com/downloads/news_1.jpg"
                            />
                            <span>Title {index + 1}</span>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default News;
