import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import api from '../../../api/axios';

function NewsHome() {
    const cardRefs = useRef([]);
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        api.get('/user/homepage?category=NEWS')
            .then(response => {
                const latestNews = response.data.slice(0, 4);
                console.log('api 응답 성공:', latestNews);
                setNewsData(latestNews);
            })
            .catch(error => console.error('Error fetching news:', error));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.dataset.visible = "true";
                    } else {
                        entry.target.dataset.visible = "false";
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
        <NewsContainer>
            <NewsTitle>
                <strong>News</strong>
                <span>틸론의 새로운 소식을 접해보세요.</span>
            </NewsTitle>

            <NewsCards>
                {newsData.length > 0 ? (
                    newsData.map((news, index) => (
                        <Card key={index} ref={el => cardRefs.current[index] = el}>
                            <a href={news.link} target="_blank" rel="noopener noreferrer">
                                <CardImg alt={`news-img${index + 1}`} src={news.thumbnail}/>
                                <CardSpan>{news.title}</CardSpan>
                            </a>
                        </Card>
                    ))
                ) : (
                    <p>뉴스 데이터가 없습니다.</p>
                )}
            </NewsCards>
        </NewsContainer>
    );
}

// Styled Components
const NewsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const NewsTitle = styled.div`
    > strong {
        font-size: 50px;
        color: #fff;
    }
`;

const NewsCards = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const Card = styled.div`
    display: inline-block;
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    transition: opacity .6s ease;
`;

const CardImg = styled.img`
    max-width: 90px;
    height: auto;
`;

const CardSpan = styled.span``;

export default NewsHome;