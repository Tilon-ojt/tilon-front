import "../Footer/Footer.css";

function Footer(){

    const optionHandler=(event)=>{
        const selectedValue=event.target.value;
        if(selectedValue){
            window.open(selectedValue,'_blank');
        }
    }

    return(
        <div className="footer">
            <div className="left">
                <div className="list">
                    <ul>
                        <li>
                            <a href="https://www.tilon.com/company/info">
                                <span>Company</span>
                            </a>
                        </li>
                        <hr/>
                        <li>
                            <a href="https://www.tilon.com/virtual/ds">
                                <span>Solution&Service</span>
                            </a>
                        </li>
                        <hr/>
                        <li>
                            <a href="https://www.tilon.com/exp/public">
                                <span>Business</span>
                            </a>
                        </li>
                        <hr/>
                        <li>
                            <a href="https://www.tilon.com/exp/public">
                                <span>News</span>
                            </a>
                        </li>
                        <hr/>
                        <li>
                            <a href="https://www.tilon.com/investments/stock">
                                <span>IR</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="txt">
                    <strong>주식회사 틸론</strong>
                    {/* 전화번호와 팩스번호를 tel: 프로토콜로 감싸 클릭 시 전화걸기/팩스 보내기 */}
                    <span>
                        대표 최백준 | 
                        대표전화 <a href="tel:02-2627-9000">02-2627-9000</a> | 
                        FAX     <a href="tel:02-2627-9099">02-2627-9099</a> | 
                        사업자번호 119-81-49757
                    </span>
                    <span>서울 법인 (07789) 서울시 강서구 마곡중앙14로 22</span>
                    <span>제주 법인 (63309) 제주특별자치도 제주시 첨단로 213-3, 311호-312호</span>
                </div>
                <div className="list-copy">
                    <div className="end">
                        <ul>
                            <li>
                                <a href="https://www.tilon.com/usage">
                                    <span>이용약관</span>
                                </a>
                            </li>
                            <hr/>
                            <li>
                                <a href="https://www.tilon.com/privacy">
                                    <strong>개인정보취급방침</strong>
                                </a>
                            </li>
                            <hr/>
                            <li>
                                <a href="https://www.tilon.com/tba/partner">
                                    <span>사업 제휴</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="copyright">
                        <span>ⓒTILON Co., Ltd. All Rights Reserved.</span>
                    </div>
                </div>
            </div>

            <div className="right">
                <div className="select-box">
                    <select name="select" onChange={optionHandler}>
                        <option value="">패밀리 사이트</option>
                        <option value="http://tilonsoft.com/" >TilonSoft</option>
                        <option value="https://www.elcloud.com/">elCloud</option>
                        <option value="https://www.centerface.co.kr/main">CenterFace</option>
                        <option value="https://www.kdaas.com/">KDaas</option>
                        <option value="https://meeting.town/main">meeting.town</option>
                    </select>
                </div>

                <div className="icon">
                    <div className="blog">
                        <a href="https://blog.naver.com/hitilon">
                            <img src="https://www.tilon.com/dist/pc_blog.png?15db7583f8fc239ce4c24e8ce744d5c4" alt="blog"/>
                        </a>
                    </div>

                    <div className="youtube">
                        <a href="https://www.youtube.com/user/TilonCompany">
                            <img src="https://www.tilon.com/dist/pc_youtube.png?6555cf4c4948a9031cd1bd5cb667427b" alt="youtube"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;