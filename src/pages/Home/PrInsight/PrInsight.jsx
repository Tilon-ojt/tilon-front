import React from 'react';
import './Prsection.css';

// 데이터 배열로 관리
const sections = [
  {
    title: 'PR',
    subtitle: '언론 속 틸론의 소식을 접해보세요.',
    link: 'https://tilon.com/inside/article',
    items: [
      {
        href: 'https://tilon.com/inside/board?seq=1773&type=article',
        imgSrc: 'https://tilon.com/downloads/2008876d-17a2-46fb-adaa-324e929767f7.jpg',
        alt: '틸론, ‘디스테이션X’로 소버린 클라우드 시대 연다',
        text: '틸론, ‘디스테이션X’로 소버린 클라우드 시대 연다…고도화된 보안과 유연성 강화',
        tags: ['#틸론', '#Sovereign'],
      },
      {
        href: 'https://tilon.com/inside/board?seq=1772&type=article',
        imgSrc: 'https://tilon.com/downloads/03afc518-bd75-41fd-9ed4-c66504c01df8.jpg',
        alt: "틸론, 소버린 클라우드 환경을 위한 차세대 VDI 솔루션 '디스테이션X' 공개",
        text: "틸론, 소버린 클라우드 환경을 위한 차세대 VDI 솔루션 '디스테이션X' 공개",
        tags: ['#DstationX', '#Estation'],
      },
      {
        href: 'https://tilon.com/inside/board?seq=1771&type=article',
        imgSrc: 'https://tilon.com/downloads/92a61f32-1d52-4747-b1c7-d7bb88013cc4.jpg',
        alt: '틸론, 2024 이브릿지학회 (사)추계학술대회서 행정안전부 장관상 수상',
        text: '틸론, 2024 이브릿지학회 (사)추계학술대회서 행정안전부 장관상 수상',
        tags: ['#DstationX', '#Estation'],
      },
    ],
  },
  {
    title: 'INSIGHT',
    subtitle: '틸론의 인사이트를 확인해보세요.',
    link: 'https://tilon.com/inside/insight',
    items: [
      {
        href: 'https://tilon.com/inside/board?seq=273&type=insight',
        imgSrc: 'https://tilon.com/downloads/6134f14e-9a13-420c-8ac5-9a1b3dc2a4bd.jpg',
        alt: '제주의 디지털 혁신 이끌고 지속 가능한 미래 만드는 데 일조할 것',
        text: '"제주의 디지털 혁신 이끌고 지속 가능한 미래 만드는 데 일조할 것"',
        tags: ['#넷제로IDC', '#틸론'],
      },
      {
        href: 'https://tilon.com/inside/board?seq=272&type=insight',
        imgSrc: 'https://tilon.com/downloads/8d339863-bcbe-44fb-a530-3b75387d6c90.jpg',
        alt: '탈VM웨어로 VDI·DaaS 시장 격변',
        text: '탈VM웨어로 VDI·DaaS 시장 격변',
        tags: ['#VDI', '#Daas'],
      },
      {
        href: 'https://tilon.com/inside/board?seq=271&type=insight',
        imgSrc: 'https://tilon.com/downloads/af29deae-116c-4b0e-8087-9d4260c987d2.jpg',
        alt: '최백준 틸론 대표 “VDI는 디지털 역량 강화의 핵심” [K-SaaS 리더스]',
        text: '최백준 틸론 대표 “VDI는 디지털 역량 강화의 핵심” [K-SaaS 리더스]',
        tags: ['#DaaS', '#DstationX'],
      },
    ],
  },
];

// CardItem 컴포넌트 생성
const CardItem = ({ href, imgSrc, alt, text, tags }) => (
  <li className="cardItem">
    <a href={href} className="card_link">
      <img src={imgSrc} alt={alt} />
      <p className="card_text">{text}</p>
      <span className="card_tag">
        {tags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </span>
    </a>
  </li>
);

// Section 컴포넌트 생성
const Section = ({ title, subtitle, link, items }) => (
  <article className="section">
    <div className="titlesection">
      <h2 className="headtitle">{title}</h2>
      <small className="subtitle">{subtitle}</small>
      <br />
      <a href={link} className="Prlink">
        about more
        <img
          alt="틸론 소식 바로가기"
          src="https://tilon.com/dist/pc_rightarrow.png?3bf280490a64ada3efb31ded788805b9"
          className="arrow"
        />
      </a>
    </div>
    <div className="cardsContainer">
      <ul className="cardList">
        {items.map((item, index) => (
          <CardItem key={index} {...item} />
        ))}
      </ul>
    </div>
  </article>
);

function PrInsight() {
  return (
    <div className="totalSection">
      {sections.map((section, index) => (
        <Section key={index} {...section} />
      ))}
    </div>
  );
}

export default PrInsight;
