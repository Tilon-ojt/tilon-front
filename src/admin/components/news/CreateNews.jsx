import React, { useState } from 'react';
import '../news/CreateNews.css';

function CreateNews({onNavigate}) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState("");

     // 제목 변경 핸들러
     const titleHandler = (e) => {
        setTitle(e.target.value);  // 입력 값으로 제목 상태 업데이트
    };

    // 링크 변경 핸들러
    const linkHandler = (e) => {
        setLink(e.target.value);  // 입력 값으로 링크 상태 업데이트
    };

    const thumbnailHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file); // Save file to state
            setThumbnailPreview(URL.createObjectURL(file)); // Generate preview URL
        }
    };

    const saveHandler = () => {
        if (!title || !link || !thumbnail) {
            alert("모든 필드를 채워주세요!");
            return;
        }

        console.log("Saving News:", { title, link, thumbnail });
        alert("뉴스가 저장되었습니다!");
        // Reset form after saving
        setTitle("");
        setLink("");
        setThumbnail(null);
        setThumbnailPreview("");
        //
        onNavigate('News');
    };

    const cancelHandler = () => {
        setTitle("");
        setLink("");
        setThumbnail(null);
        setThumbnailPreview("");
        alert("작성 취소되었습니다.");
        onNavigate('News');
    };

    return (
        <div className='create-news'>
            <h2>뉴스 추가</h2>
            <hr style={{ width: '100%' }} />
            <div className='news-info'>
                <div className='info-item'>
                    <label>제목</label>
                    <label className='tally' />
                    <input
                        type="text"
                        value={title}
                        onChange={titleHandler}
                        placeholder="제목 추가..."
                    />
                </div>
                <div className='info-item'>
                    <label>연결 링크</label>
                    <label className='tally' />
                    <input
                        type="url"
                        value={link}
                        onChange={linkHandler}
                        placeholder="링크 추가..."
                    />
                </div>
                <div className='info-item'>
                    <label>썸네일</label>
                    <label className='tally' />
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={thumbnailHandler}
                        />
                        {thumbnailPreview && (
                            <div className='thumbnail-preview'>
                                <span>미리보기:</span>
                                <img
                                    src={thumbnailPreview}
                                    alt="썸네일 미리보기"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='btn'>
                <button className='u' onClick={saveHandler}>저장</button>
                <button className='r' onClick={cancelHandler}>취소</button>
            </div>
        </div>
    );
}

export default CreateNews;
