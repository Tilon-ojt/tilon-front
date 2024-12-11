import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ImageResize from 'quill-image-resize';
import api from "../../../api/axios";

Quill.register('modules/ImageResize', ImageResize);

function PostWrite() {
    const navigate = useNavigate();
    const { categoryParam } = useParams();

    // 상태 관리
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState(categoryParam || 'PR');
    const [status, setStatus] = useState('PUBLISHED');
    const [fix, setFix] = useState(false);
    const [link, setLink] = useState('');
    const [tempPostId, setTempPostId] = useState(null);

    useEffect(() => {
        const cookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('cookie='));
        
        if (!cookie) {
            alert("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        const token = cookie.split('=')[1];
        // tempPostId 생성
        setTempPostId(Date.now().toString());
    }, [navigate]);

    const CreateBtn = async () => {
        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!content.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }
        
        try {
            await SaveBoard();
            alert('게시글이 성공적으로 작성되었습니다.');
            navigate('/admin/pr');
        } catch (error) {
            console.error('게시글 작성 실패:', error);
            alert('게시글 작성에 실패했습니다.');
        }
    };

    async function SaveBoard() {
        try {
            const cookie = document.cookie
                .split('; ')
                .find(row => row.startsWith('cookie='));
            
            if (!cookie) {
                throw new Error('인증 토큰이 없습니다.');
            }

            const token = cookie.split('=')[1];

            // 이미지 처리 로직
            const gainSource = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;
            const srcArray = [];
            const urlArray = [];
            let contentCopy = content;
            let match;

            while ((match = gainSource.exec(content)) !== null) {
                const imgSrc = match[2];
                if (imgSrc.startsWith('data:image')) {
                    srcArray.push(imgSrc);
                    
                    const byteString = atob(imgSrc.split(",")[1]);
                    const ab = new ArrayBuffer(byteString.length);
                    const ia = new Uint8Array(ab);
                    for (let i = 0; i < byteString.length; i++) {
                        ia[i] = byteString.charCodeAt(i);
                    }
                    const blob = new Blob([ia], { type: "image/jpeg" });
                    const file = new File([blob], "image.jpg");

                    const formData = new FormData();
                    formData.append("file", file);

                    const response = await api.post(
                        `/admin/posts/image/upload?tempPostId=${tempPostId}`,
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "multipart/form-data",
                                "Accept": "application/json",
                                "Cache-Control": "no-cache"
                            }
                        }
                    );

                    if (response.data.success) {
                        urlArray.push(response.data.url);
                    } else {
                        throw new Error('이미지 업로드 실패');
                    }
                }
            }

            // 이미지 URL 교체
            for (let i = 0; i < srcArray.length; i++) {
                contentCopy = contentCopy.replace(srcArray[i], urlArray[i]);
            }

            // 최종 게시글 작성 요청
            const writeInform = {
                title,
                content: contentCopy,
                category,
                link,
                status,
                fix
            };

            const response = await api.post(
                `/admin/post?tempPostId=${tempPostId}`,
                writeInform,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Cache-Control": "no-cache"
                    }
                }
            );

            if (!response.data.success) {
                throw new Error('게시글 작성 실패');
            }

        } catch (error) {
            console.error('SaveBoard 에러:', error);
            throw error;
        }
    }

    const CancelBtn = () => {
        console.log('취소 되었습니다.');
        navigate('/admin/pr');
    };

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
                height: 'calc(100vh - 62px)',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '16vw',
            }}
        >
            <div
                style={{
                    height: '75%',
                    width: '68vw',
                    margin: '0 auto',
                    borderRadius: '19px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    padding: '20px',
                    backgroundColor: '#fff',
                    border: '0.1px solid lightgray',
                    marginTop: '7vh',
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
                        style={{ flex: 1 }}
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
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                />
                <div style={{ height: '60vh', width: '100%' }}>
                    <ReactQuill
                        modules={modules}
                        placeholder='내용을 입력해 주세요'
                        value={content}
                        onChange={setContent}
                        style={{
                            height: "55vh",
                            width: '100%',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ display: 'flex', gap: '30px', marginTop:'30px'}}>
                        <button 
                            onClick={CreateBtn} 
                            style={{
                                backgroundColor: '#0d6efd', 
                                color: 'white', 
                                border: 'none', 
                                padding: '10px 30px', 
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '16px',
                            }}
                        >
                            생성
                        </button>
                        <button 
                            onClick={CancelBtn} 
                            style={{
                                backgroundColor: 'gray', 
                                color: 'white', 
                                border: 'none', 
                                padding: '10px 30px', 
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '16px',
                            }}
                        >
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostWrite;