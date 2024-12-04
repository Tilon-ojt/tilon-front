import '../news/EditNews.css';

function EditNews(){
    return(
        <div className="edit-news">
            <h2>뉴스 수정</h2>

            <div>
                {/* 수정 가능한 내용 */}
                <div> 
                    <div>제목:</div>
                    <div className='input'></div>
                </div>
                <div>
                    <div>썸네일:</div>
                    <div className='input'></div>
                </div>
                <div>
                    <div> 연결 링크:</div>
                    <div className='input'></div>
                </div>
                {/* 버튼 */}
                <div className='edit-news-btn'>
                    <button className='u'>수정완료</button>
                    <button className='c'>취소</button>
                    <button className='d'>삭제</button>
                </div>
            </div>
        </div>

    );
}

export default EditNews;