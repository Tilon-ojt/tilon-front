import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import api from "../../../api/axios";

function PostEdit() {
    
    const navigate = useNavigate();
    const { postId, category } = useParams();
    const userState = useSelector((state) => state.auth.token);

    const [isLoading, setIsLoading] = useState(false);  // Loading state declaration

    const [postData, setPostData] = useState({
        post_id: 'post_id',
        title: 'title',
        content: 'content',
        category: 'category',
        admin_id: 'admin_id',
        created_at: 'createdAt',
        updated_at: 'updatedAt',
        status: 'status',
        fix: 'fix',
        image: '',  // 이미지 데이터 추가
    });

    const [editedData, setEditedData] = useState({
        title: '',
        content: '',
        category: category || '',
        postStatus: '',  // Renamed to avoid conflict with global 'status'
        fix: false,
    });

    useEffect(() => {
        fetchPostDetail();

        if (postId && userState) {
            fetchPostDetail();
        }
    }, [postId, userState]);

    const fetchPostDetail = async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`/admin/posts/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${userState}`,
                    'Content-Type': 'application/json'
                }
            });

            // 응답 데이터 로깅 추가
            console.log('게시글 상세 응답:', response.data);
            console.log('content 내용:', response.data.content);
            
            if (response.status === 200) {
                setPostData(response.data);
            }
        } catch (error) {
            console.error('서버 응답 에러:', error.response?.data);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            const requestData = {
                title: postData.title,
                content: postData.content,
                category: postData.category,
                status: postData.status,
                fix: postData.fix,
            };

            console.log('PostEdit - 요청 데이터:', requestData);
            console.log('PostEdit - content 길이:', postData.content.length);
            console.log('PostEdit - content 내용:', postData.content);

            const response = await api.put(`/admin/posts/${postId}`, requestData, {
                headers: {
                    'Authorization': `Bearer ${userState}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('PostEdit - 서버 응답:', response);

            if (response.status === 204) {
                alert('게시글이 성공적으로 수정되었습니다.');
                navigate(`/admin/pr`);
            } else {
                alert('게시글 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('PostEdit - 에러:', error);
            alert(`게시글 수정에 실패했습니다: ${error.response?.data?.message || error.message}`);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ]
    };

    function imageHandler() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            // 여기서 이미지 업로드 로직 구현
        };
    }

    const handleEdit = async () => {
        try {
            const quillContent = document.querySelector('.ql-editor');
            const images = quillContent.getElementsByTagName('img');
            let contentCopy = postData.content;
           
            if (images.length > 0) {
                for (let i = 0; i < images.length; i++) {
                    const img = images[i];
                    const base64Image = img.src;

                    if (base64Image.startsWith('data:image')) {
                        try {
                            const formData = new FormData();
                            // ... formData 처리 코드 ...
                           
                            const imageResponse = await api.post(
                                `/admin/posts/image/upload?postId=${postId}`,
                                formData,
                                {
                                    headers: {
                                        'Authorization': `Bearer ${userState}`,
                                        'Content-Type': 'multipart/form-data'
                                    }
                                }
                            );

                            console.log('이미지 업로드 응답:', imageResponse.data);
                            console.log('이미지 URL 응답:', imageResponse.data.imageUrl);

                            const imageUrl = imageResponse.data.imageUrl;
                            contentCopy = contentCopy.replace(base64Image, imageUrl);
                        } catch (error) {
                            console.error('이미지 업로드 실패:', error);
                            throw error;
                        }
                    }
                }
            }

            // ... 나머지 코드 ...
        } catch (error) {
            console.error('게시글 수정 실패:', error);
            alert('게시글 수정에 실패했습니다.');
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

                {/* 이미지 렌더링 추가 */}
                {postData.image && (
                    <img 
                        src={postData.image} 
                        alt="Post Image" 
                        style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                    />
                )}

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
                            onClick={handleUpdate}
                            style={{
                                backgroundColor: 'orange',
                                color: 'white',
                                border: 'none',
                                padding: '10px 30px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '16px',
                            }}
                        >
                            수정
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

export default PostEdit;
