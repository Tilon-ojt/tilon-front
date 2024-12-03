import '../news/EditNews.css';

function EditNews(){
    return(
        <div className="edit-news">
            <nav>
                <span>뉴스 수정</span>
            </nav>

            <div>
                <div className='edit-news-title'></div>
                <div className='edit-news-img'></div>
                <div className='edit-news-txtarea'>
                    <div>내용:</div>
                </div>
                <div className='edit-news-btn'>
                    <button>수정하기</button>
                    <button>삭제하기</button>
                </div>
            </div>
        </div>

    );
}

export default EditNews;