import { useEffect, useRef, useState } from 'react';
import './News.css';
import api from '../../../api/axios';

import styled from 'styled-components';

function News() {
    const cardRefs = useRef([]);
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        // API 요청
        api.get('/user/post?category=NEWS')
            .then(response => {
                console.log('API 응답:', response.data);
                setNewsData(response.data);
            })
            .catch(error => {
                console.error('Error fetching news:', error);
            });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.classList.remove('visible');
                    }
                });
            },
            { threshold: 0.2 }
        );

        const currentCards = cardRefs.current;

        currentCards.forEach((card) => {
            if (card) observer.observe(card);
        });

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
                {newsData.map((news, index) => (
                    <div
                        key={index}
                        className="card"
                        ref={(el) => (cardRefs.current[index] = el)}
                    >
                        <a href={news.link}>
                            <img
                                alt={`news-img${index + 1}`} 
                                src={news.thumbnail}
                            />
                            <span>{news.title}</span>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default News;
