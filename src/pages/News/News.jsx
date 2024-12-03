import { useRef } from 'react';
import '../News/News.css';

function News() {

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
                    >
                        <a href='https://www.naver.com'>  {/* 연결 링크 - 관리자 수정*/}
                            <img
                                alt={`news-img${index+1}`}
                                src="https://tilon.com/downloads/news_1.jpg" /* 썸네일 - 관리자 수정 */
                            />
                            <span>Title {index + 1}</span> {/* 제목 - 관리자 수정*/}
                        </a>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default News;
