import '../news/NewsList.css';

function NewsList({onNavigate}){

    return(
        <div className='news-list'>
            <nav>
                <span> News </span>
                <div className='news-search'>
                    <input placeholder='제목 검색...'/>
                    <button>search</button>
                </div>
            </nav>

            <div>
                <button onClick={()=>onNavigate('CreateNews')}>추가</button>
            </div>

            <div className='news'>
                <div onClick={()=>onNavigate('EditNews')}>news</div>
            </div>
        </div>
    );
}

export default NewsList;