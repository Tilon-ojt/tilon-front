import React, { useState, useEffect } from 'react';
import '../news/EditNews.css';

function EditNews({onNavigate}) {
    const [title, setTitle] = useState("");  // 제목 상태 관리
    const [link, setLink] = useState("");  // 링크 상태 관리
    const [thumbnail, setThumbnail] = useState(null);  // 썸네일 상태 관리
    const [thumbnailPreview, setThumbnailPreview] = useState(""); // 썸네일 미리보기 상태 관리

    const [newsInfo, setNewsInfo] = useState({
        title: "",   // 제목
        link: "",  // 링크
        thumbnail: "" // 썸네일
    });

    // 유저 정보를 받아오는 함수 (예시로 가정)
    useEffect(() => {
        // 실제 데이터는 API나 props로 받아오게 될 것
        const fetchedNewsInfo = {
            title: "틸론 뉴스", // 예시 제목
            link: "https://www.tilon.com/home", // 예시 링크
            thumbnail: "", // 예시 썸네일 - 첨부파일
        };
        setNewsInfo(fetchedNewsInfo);
        setTitle(fetchedNewsInfo.title || "");  //제목이 있을 경우
        setLink(fetchedNewsInfo.link || ""); // 링크가 있을 경우
        setThumbnail(fetchedNewsInfo.thumbnail || ""); // 썸네일이 있을 경우
    }, []);

    // 제목 변경 핸들러
    const titleHandler = (e) => {
        setTitle(e.target.value);  // 입력 값으로 제목 상태 업데이트
    };

    // 링크 변경 핸들러
    const linkHandler = (e) => {
        setLink(e.target.value);  // 입력 값으로 링크 상태 업데이트
    };

    // 썸네일 변경 핸들러
    const thumbnailHandler =(e)=> {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file); // Save file to state
            setThumbnailPreview(URL.createObjectURL(file)); // Generate preview URL
        }
    } 
    

    // 수정 완료 핸들러
    const submitHandler = (e) => {
        console.log("Saving Edited News:", { title, link, thumbnail });
        alert("수정 완료 되었습니다!");
        // Reset form after saving
        setTitle(title);
        setLink(link);
        setThumbnail();
        setThumbnailPreview("");

        onNavigate('News');

    }

    // 취소 핸들러
    const cancelHandler = (e) => {
        alert("수정 취소되었습니다.");
        onNavigate('News');
    }

    // 삭제 핸들러
    const deleteHandler = (e) => {
        alert("해당 뉴스를 삭제하시겠습니까?");
    }

    return (
        <div className='edit-news'>
            <h2>뉴스 수정</h2>
            <hr style={{ width: '100%' }} />
            <div className='news-info'>
                <div className='info-item'>
                    <label> 제목 </label>
                    <label className='tally' />
                    <input
                        type="text"
                        value={title}
                        onChange={titleHandler}
                        placeholder="제목 수정...."
                    />
                </div>
                <div className='info-item'>
                    <label> 연결 링크 </label>
                    <label className='tally' />
                    <input
                        type="url"
                        value={link}
                        onChange={linkHandler}
                        placeholder="링크 수정...."
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
                <button className='u' onClick={submitHandler}>수정완료</button>
                <button className='r' onClick={cancelHandler}>취소</button>
                <button className='d' onClick={deleteHandler}>삭제</button> 
            </div>
        </div>
    );
}

export default EditNews;
