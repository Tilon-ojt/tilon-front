import '../news/NewsPage.css';

function NewsPage(){
    return(
        <div className="news-page">
            <div className='news-page-container'>
                <nav>
                    <span>News</span>
                    <div className='news-search'>
                        <input placeholder='제목으로 검색...'/>
                        <button>Search</button>
                    </div>
                </nav>

                <div className='news-lists'>

                    <div> news1</div>
                    <div> news1</div>
                    <div> news1</div>
                    <div> news1</div>
                    <div> news1</div>

                </div>
            </div>
        </div>
    );
}

export default NewsPage;