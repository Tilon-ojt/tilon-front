import React from 'react';
import './Prsection.css';

function PrInsight() {
  return (
    <div className="totalSection">
      <article className="firstSection">
        <div className="titlesection">
          <h2 className="headtitle">PR</h2>
          <small className="subtitle">언론 속 틸론의 소식을 접해보세요.</small>
          <br />
          <a href="https://tilon.com/inside/article" className="Prlink">
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
            <li className="cardItem">
              <img
                src="pr_1.jpg"
                alt="틸론, ‘디스테이션X’로 소버린 클라우드 시대 연다"
              />
              <p className="card_text">틸론, ‘디스테이션X’로 소버린 클라우드 시대 연다…고도화된 보안과 유연성 강화</p>
              <span className="card_tag">
                <span>#틸론</span>
                <span>#Sovereign</span>
              </span>
            </li>
            <li className="cardItem">
              <img
                src="pr_2.jpg"
                alt="틸론, 소버린 클라우드 환경을 위한 차세대 VDI 솔루션 '디스테이션X' 공개"
              />
              <p className="card_text">틸론, 소버린 클라우드 환경을 위한 차세대 VDI 솔루션 '디스테이션X' 공개</p>
              <span className="card_tag">
                <span>#DstationX</span>
                <span>#Estation</span>
              </span>
            </li>
            <li className="cardItem">
              <img
                src="pr_3.jpg"
                alt="틸론, 2024 이브릿지학회 (사)추계학술대회서 행정안전부 장관상 수상"
              />
              <p className="card_text">틸론, 2024 이브릿지학회 (사)추계학술대회서 행정안전부 장관상 수상</p>
              <span className="card_tag">
                <span>#DstationX</span>
                <span>#Estation</span>
              </span>
            </li>
          </ul>
        </div>
      </article>

      <article className="secondSection">
        <div className="titlesection">
          <h2 className="headtitle">INSIGHT</h2>
          <small className="subtitle">틸론의 인사이트를 확인해보세요.</small>
          <br />
          <a href="https://tilon.com/inside/insight" className="Prlink">
            about more
            <img
              alt="틸론 소식 바로가기"
              src="https://tilon.com/dist/pc_rightarrow.png?3bf280490a64ada3efb31ded788805b9"
              className="arrow"
            />
          </a>
        </div>
        <div className="cardContainer">
          <ul className="cardList">
            <li className="cardItem">
              <img
                src="https://tilon.com/downloads/6134f14e-9a13-420c-8ac5-9a1b3dc2a4bd.jpg"
                alt="제주의 디지털 혁신 이끌고 지속 가능한 미래 만드는 데 일조할 것"
              />
              <p className="card_text">"제주의 디지털 혁신 이끌고 지속 가능한 미래 만드는 데 일조할 것"</p>
              <span className="card_tag">
                <span>#넷제로IDC</span>
                <span>#틸론</span>
              </span>
            </li>
            <li className="cardItem">
              <img
                src="https://tilon.com/downloads/8d339863-bcbe-44fb-a530-3b75387d6c90.jpg"
                alt="탈VM웨어로 VDI·DaaS 시장 격변"
              />
              <p className="card_text">탈VM웨어로 VDI·DaaS 시장 격변</p>
              <span className="card_tag">
                <span>#VDI</span>
                <span>#Daas</span>
              </span>
            </li>
            <li className="cardItem">
              <img
                src="https://tilon.com/downloads/af29deae-116c-4b0e-8087-9d4260c987d2.jpg"
                alt="최백준 틸론 대표 “VDI는 디지털 역량 강화의 핵심” [K-SaaS 리더스]"
              />
              <p className="card_text">최백준 틸론 대표 “VDI는 디지털 역량 강화의 핵심” [K-SaaS 리더스]</p>
              <span className="card_tag">
                <span>#DaaS</span>
                <span>#DstationX</span>
              </span>
            </li>
          </ul>
        </div>
      </article>

      
    </div>
  );
}

export default PrInsight;
