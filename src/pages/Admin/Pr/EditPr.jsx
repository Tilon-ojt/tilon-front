import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from 'react-router-dom'; // react-router-dom에서 useParams import

import ImageResize from 'quill-image-resize';

Quill.register('modules/ImageResize', ImageResize);

function EditPr() {
    let redux = useSelector((state) => { return state });
    const { categoryParam } = useParams();  // URL에서 category 값을 추출
    const [title, setTitle] = useState('');  // 제목
    const [content, setContent] = useState('');  // 내용
    const [category, setCategory] = useState(categoryParam);  // category 값을 경로에서 추출
    const [status, setStatus] = useState('PUBLISHED');  // 게시상태 (예: 'active', 'inactive')
    const [fix, setFix] = useState(false);  // 고정 여부 (예: true, false)
    const [link, setLink] = useState('');  // URL 링크
    const [tempPostId, setTempPostId] = useState(null);  // 임시 게시글 ID
    const [imageUrls, setImageUrls] = useState([]);  // 서버에서 받은 이미지 URL들

    // 더미 데이터 설정
    useEffect(() => {
        const dummyData = {
            title: "더미 제목",
            content: "더미 내용입니다. <img src='data:image/jpeg;base64,...' />",
            category: categoryParam || "pr",
            status: "PUBLISHED",
            fix: true,
            link: "https://dummy.link",
        };

        setTitle(dummyData.title);
        setContent(dummyData.content);
        setCategory(dummyData.category);
        setStatus(dummyData.status);
        setFix(dummyData.fix);
        setLink(dummyData.link);
    }, [categoryParam]);

    // 이미지 업로드 및 URL로 변환하는 로직
    const srcArray = [];
    const blopArray = [];
    const urlArray = [];
    const gainSource = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;

    useEffect(() => {
        // 처음에 tempPostId 생성
        const generateTempPostId = () => {
            const tempId = Date.now().toString();  // 임시 ID 생성
            setTempPostId(tempId);
        };
        generateTempPostId();
    }, []);

    async function SaveBoard() {
        while (gainSource.test(content)) {
            let result = RegExp.$2;
            srcArray.push(result);
            const byteString = atob(result.split(",")[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ia], { type: "image/jpeg" });
            const file = new File([blob], "image.jpg");

            const formData = new FormData();
            formData.append("file", file);
            const config = { header: { 'content-type': 'multipart/form-data' } };

            // 임시 게시글 ID를 사용하여 이미지 업로드
            await axios.post(`http://localhost:8000/api/board/uploadImgFolder?tempPostId=${tempPostId}`, formData, config)
                .then(response => {
                    if (response.data.success) {
                        urlArray.push(response.data.url);  // 서버에서 받은 URL 추가
                        setImageUrls(prevUrls => [...prevUrls, response.data.url]); // imageUrls 상태에 추가
                    } else {
                        alert('이미지를 서버에 업로드하는데 실패했습니다.');
                    }
                });
        }

        let endContent = content;
        if (srcArray.length > 0) {
            for (let i = 0; i < srcArray.length; i++) {
                let replace = endContent.replace(srcArray[i], urlArray[i]);
                endContent = replace;
            }
        }

        // 요청할 데이터 객체
        let writeInform = {
            title: title,  // 제목
            content: endContent,  // 내용 (변경된 이미지 URL 포함)
            category: category,  // 카테고리
            admin_id: redux.setUser.u_id,  // 어드민 번호
            status: status,  // 게시상태 (예: 'active')
            fix: fix,  // 고정 여부
            link: link,  // URL 링크
            tempPostId: tempPostId,  // 임시 게시글 ID
            imageUrls: imageUrls,  // 업로드된 이미지 URLs
        };

        // 게시글 작성 API 호출
        axios.post('http://localhost:8000/api/admin/post', writeInform, {
            headers: { 
                'Authorization': `Bearer ${redux.setUser.token}`,
                'Content-Type': 'application/json' 
            }
        })
        .then(response => {
            if (response.data.success) {
                console.log('업로드 성공');
            } else {
                alert('업로드에 실패하였습니다.');
            }
        })
        .catch(error => {
            console.error('게시글 업로드 실패:', error);
            alert('게시글 업로드 실패');
        });
    }

    const modules = {
        toolbar: [
            [{ 'font': [] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            ['link', 'image'],
            [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
        ],
        ImageResize: {
            parchment: Quill.import('parchment')
        }
    };

    return (
        <div
            style={{
                width: '100%',
                height: '100vh', // 화면 전체 높이 기준
                display: 'flex',
                marginTop: '10vh',
                
            }}
        >
            <div
                style={{
                    width: '1000px', // 고정된 너비
                    height: '700px', // 고정된 높이
                    margin: 'auto',
                    borderRadius: '19px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)', // 약간의 그림자 추가
                    padding: '20px', // 내부 여백 추가
                    backgroundColor: '#fff', // 배경색 설정
                    border: '0.1px solid lightgray'
                }}
            >


                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        marginBottom: '10px',
                        
                    }}
                >
                    <select
                        value={category}
                        disabled
                        style={{ width: '150px' }}
                    >
                        <option value="pr">PR</option>
                        <option value="insight">INSIGHT</option>
                    </select>

                    <input
                        type="text"
                        placeholder="링크를 입력하세요"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        style={{ flex: 1 }} // input 필드가 가능한 공간을 채우도록 설정
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{ width: '150px' }}
                    >
                        <option value="PUBLISHED">PUBLISHED</option>
                        <option value="DRAFT">DRAFT</option>
                    </select>

                    <label style={{ marginLeft: '10px' }}>
                        고정:
                        <input
                            type="checkbox"
                            checked={fix}
                            onChange={(e) => setFix(e.target.checked)}
                        />
                    </label>
                </div>

                <input
                    className="Title"
                    placeholder="제목을 입력해 주세요"
                    style={{
                        padding: '7px',
                        marginBottom: '10px',
                        width: '100%',
                        border: '1px solid lightGray',
                        fontSize: '15px',
                        boxSizing: 'border-box',
                        marginTop: '20px',
                        
                    }}
                    value={title}  // 더미 데이터로 초기화된 제목
                    onChange={(e) => { setTitle(e.target.value) }}
                />
                <div style={{ height: '380px', width: '100%' }}>
                    <ReactQuill
                        modules={modules}
                        placeholder='내용을 입력해 주세요'
                        value={content}  // 더미 데이터로 초기화된 내용
                        onChange={setContent}
                        style={{
                            height: "550px",
                            width: '100%',
                            boxSizing: 'border-box'
                            
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditPr;
