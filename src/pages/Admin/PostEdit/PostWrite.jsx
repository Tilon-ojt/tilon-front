import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import ImageResize from 'quill-image-resize';
import api from "../../../api/axios";
import { jwtDecode } from "jwt-decode";

Quill.register('modules/ImageResize', ImageResize);

function PostWrite({ isEdit, editPostId }) {
    const navigate = useNavigate();
    const userState = useSelector((state) => state.auth.token);
    const decodedToken = jwtDecode(userState);
    const [tempPostId, setTempPostId] = useState(null);

    const [postData, setPostData] = useState({
        title: '',
        content: '',
        category: 'PR',
        status: 'PUBLISHED',
        fix: false,
    });

    useEffect(() => {
        if (!userState) {
            alert("로그인이 필요합니다.");
            navigate('/login');
            return;
        }
        setTempPostId(Date.now().toString());
    }, [navigate, userState]);

    const handleCreate = async () => {
        console.log(`문제0`);
        if (!postData.title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!postData.content.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }
        console.log(`문제0.5`);
        try {
            // Quill 인스턴스의 내용을 파싱
            const quillContent = document.querySelector('.ql-editor');
            const images = quillContent.getElementsByTagName('img');
            let contentCopy = postData.content;
            let match;
            console.log(`문제1`);

            // HTML Collection을 배열로 변환하여 처리
            for (let i = 0; i < images.length; i++) {
                const img = images[i];
                const base64Image = img.src;

                if (base64Image.startsWith('data:image')) {
                    console.log(`문제2`);
                    try {
                        const formData = new FormData();
                        
                        // base64 데이터에서 실제 바이너리 데이터 추출
                        const base64Data = base64Image.split(',')[1];
                        const byteCharacters = atob(base64Data);
                        const byteArrays = [];
                        
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteArrays.push(byteCharacters.charCodeAt(i));
                        }
                        
                        // 바이너리 데이터로 Blob 생성
                        const blob = new Blob([new Uint8Array(byteArrays)], {
                            type: 'image/jpeg'
                        });
                        
                        // sessionStorage에서 토큰 가져오기
                        const token = sessionStorage.getItem("jwt");
                        console.log("전송할 토큰:", token);

                        if (!token) {
                            throw new Error("인증 토큰이 없습니다.");
                        }
                        
                        // FormData에 추가
                        formData.append('ImgFile', blob, `image_${Date.now()}.jpg`);

                        try {
                            // 임시 게시글 ID 생성
                            const tempPostId = Date.now().toString();
                            const params = isEdit ? { postId: editPostId } : { tempPostId };
                            
                            const imageResponse = await api.post(
                                `/admin/posts/image/upload`, 
                                formData,
                                {
                                    params: params,
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    }
                                }
                            );

                            console.log('이미지 업로드 응답:', imageResponse.data.imageUrl);
                            console.log('이미지 업로드 응답:', imageResponse.data);

                            if (!imageResponse.data || !imageResponse.data.imageUrl) {
                                throw new Error('이미지 URL을 받지 못했습니다.');
                            }

                            // 이미지 URL 추출
                            const imageUrl = imageResponse.data.imageUrl;

                            // 이미지 URL로 content 업데이트
                            const updatedContent = contentCopy.replace(base64Image, imageUrl);

                            // link 필드에 이미지 URL 설정
                            const requestData = {
                                title: postData.title,
                                adminId: decodedToken.adminId,
                                content: updatedContent,
                                category: 'PR',
                                status: 'PUBLISHED',
                                // fix: false,
                                // tempPostId: tempPostId
                            };

                            console.log('서버로 전송되는 데이터:', requestData);

                            const response = await api.post(`/admin/posts`, requestData ,{
                                params: {tempPostId},
                                
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                        'Content-Type': 'application/json'
                                    }
                                
                        });

                            if (response.status === 201 || response.status === 200) {
                                console.log('게시글 생성 성공:', response.data);
                                alert('게시글이 성공적으로 생성되었습니다.');
                                navigate('/admin/pr');
                            }
                        } catch (error) {
                            console.error('이미지 업로드 실패:', error);
                            throw error;
                        }
                    } catch (error) {
                        console.error('이미지 업로드 중 에러 발생:', error);
                        if (error.response) {
                            console.error('에러 응답:', error.response.data);
                            console.error('에러 상태:', error.response.status);
                            console.error('에러 헤더:', error.response.headers);
                        }
                        throw error;
                    }
                }
            }
        } catch (error) {
            console.error('게시글 생성 실패:', error);
            // 에러 응답 데이터 출력
            if (error.response) {
                console.error('에러 응답 데이터:', error.response.data);
                console.error('에러 상태:', error.response.status);
            }
            alert(`게시글 생성 실패: ${error.response?.data?.message || error.message}`);
        }
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
        <div style={{
            height: 'calc(100vh - 62px)',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '16vw',
        }}>
            <div style={{
                height: '75%',
                width: '68vw',
                margin: '0 auto',
                borderRadius: '19px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                padding: '20px',
                backgroundColor: '#fff',
                border: '0.1px solid lightgray',
                marginTop: '7vh',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '10px',
                }}>
                    <select
                        value={postData.category}
                        onChange={(e) => setPostData({...postData, category: e.target.value})}
                        style={{ width: '150px' }}
                    >
                        <option value="PR">PR</option>
                        <option value="INSIGHT">INSIGHT</option>
                    </select>


                    <select
                        value={postData.status}
                        onChange={(e) => setPostData({...postData, status: e.target.value})}
                        style={{ width: '150px' }}
                    >
                        <option value="PUBLISHED">PUBLISHED</option>
                        <option value="DRAFT">DRAFT</option>
                    </select>

                    <label style={{ marginLeft: '10px' }}>
                        고정:
                        <input
                            type="checkbox"
                            checked={postData.fix}
                            onChange={(e) => setPostData({...postData, fix: e.target.checked})}
                        />
                    </label>
                </div>

                <input
                    className="Title"
                    placeholder="제목을 입력해 주세요"
                    value={postData.title}
                    onChange={(e) => setPostData({...postData, title: e.target.value})}
                    style={{
                        padding: '7px',
                        marginBottom: '10px',
                        width: '100%',
                        border: '1px solid lightGray',
                        fontSize: '15px',
                        boxSizing: 'border-box',
                        marginTop: '20px',
                    }}
                />

                <div style={{ height: '60vh', width: '100%' }}>
                    <ReactQuill
                        value={postData.content}
                        onChange={(content) => setPostData({...postData, content})}
                        modules={modules}
                        placeholder='내용을 입력해 주세요'
                        style={{
                            height: "55vh",
                            width: '100%',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ 
                    marginTop: '20px', 
                    display: 'flex', 
                    justifyContent: 'flex-end' 
                }}>
                    <div style={{ display: 'flex', gap: '30px', marginTop:'30px'}}>
                        <button 
                            onClick={handleCreate}
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
                            onClick={() => navigate('/admin/pr')}
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