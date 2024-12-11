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
        link: 'link'
    });

    const [editedData, setEditedData] = useState({
        title: '',
        content: '',
        category: category || '',
        postStatus: '',  // Renamed to avoid conflict with global 'status'
        fix: false,
        link: ''
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
            console.log('요청 URL:', `/admin/posts/${postId}`);
            console.log('토큰:', userState);

            const response = await api.get(`/admin/posts/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${userState}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('API 응답:', response);
            console.log('응답 상태 코드:', response.status); 

            if (response.status === 200 ) {
                setPostData({
                    post_id: response.data.post_id,
                    title: response.data.title,
                    content: response.data.content,
                    category: response.data.category,
                    admin_id: response.data.admin_id,
                    created_at: response.data.createdAt,
                    updated_at: response.data.updatedAt,
                    status: response.data.status,
                    fix: response.data.fix,
                    link: response.data.link
                });

                setEditedData({
                    title: response.data.title,
                    content: response.data.content,
                    category: response.data.category,
                    postStatus: response.data.status,
                    fix: response.data.fix,
                    link: response.data.link
                });
            } else {
                alert('게시글을 불러오는데 실패했습니다.');
            }
        } catch (error) {
            console.error('에러 상세 정보:', {
                message: error.message,
                response: error.response,
                request: error.request
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            // 서버에 맞는 형식으로 데이터 변환
            const requestData = {
                title: editedData.title,
                content: editedData.content,
                category: editedData.category,
                status: editedData.postStatus,  // postStatus를 status로 변환
                fix: editedData.fix,
                link: editedData.link
            };

            console.log('전송할 데이터:', requestData); // 디버깅용

            const response = await api.put(`/admin/posts/${postId}`, requestData, {
                headers: {
                    'Authorization': `Bearer ${userState}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('서버 응답:', response); // 디버깅용

            if (response.status === 204) {  // response.data.success 대신 status 확인
                alert('게시글이 성공적으로 수정되었습니다.');
                navigate(`/admin/pr`);
            } else {
                alert('게시글 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('게시글 수정 실패:', error);
            alert('게시글 수정에 실패했습니다.');
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginLeft: '8vw',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '1200px',
                margin: 'auto',
                borderRadius: '19px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                padding: '2rem',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                }}>
                    <div style={{ width: '150px', minWidth: '120px' }}>
                        <select 
                            value={editedData.category}
                            onChange={(e) => setEditedData({...editedData, category: e.target.value})}
                            style={{ width: '100%', padding: '0.5rem' }}
                        >
                            <option value="Pr">Pr</option>
                            <option value="Insight">Insight</option>
                        </select>
                    </div>

                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <input
                            type="text"
                            value={editedData.link}
                            onChange={(e) => setEditedData({...editedData, link: e.target.value})}
                            placeholder="링크"
                            style={{ width: '100%', padding: '0.5rem' }}
                        />
                    </div>

                    <div style={{ width: '150px', minWidth: '120px' }}>
                        <select 
                            value={editedData.postStatus}  // Renamed to 'postStatus'
                            onChange={(e) => setEditedData({...editedData, postStatus: e.target.value})}
                            style={{ width: '100%', padding: '0.5rem' }}
                        >
                            <option value="활성">활성</option>
                            <option value="비활성">비활성</option>
                        </select>
                    </div>

                    <div style={{ minWidth: '80px' }}>
                        <input
                            type="checkbox"
                            checked={editedData.fix}
                            onChange={(e) => setEditedData({...editedData, fix: e.target.checked})}
                        /> 고정
                    </div>
                </div>

                <div style={{
                    marginTop: '1.5rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    gap: '2rem',
                    flexWrap: 'wrap',
                }}>
                    <div>작성자: {postData.admin_id}</div>
                    <div>작성일: {new Date(postData.created_at).toLocaleDateString()}</div>
                    <div>수정일: {new Date(postData.updated_at).toLocaleDateString()}</div>
                </div>

                <div style={{ width: '100%', margin: '1rem 0' }}>
                    <input
                        type="text"
                        value={editedData.title}
                        onChange={(e) => setEditedData({...editedData, title: e.target.value})}
                        style={{
                            width: '100%',
                            padding: '0.7rem',
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ 
                    width: '100%',
                    height: '380px',
                    marginBottom: '1rem'
                }}>
                    <ReactQuill
                        value={editedData.content}
                        onChange={(content) => setEditedData({...editedData, content})}
                        modules={modules}
                        style={{
                            height: '100%',
                            width: '100%',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ 
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'flex-start',
                    marginTop: '1rem',
                    marginLeft: '50vw',
                    marginTop: '6vh',
                }}>
                    <button 
                        onClick={handleUpdate}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: 'orange',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        수정
                    </button>
                    <button 
                        onClick={() => navigate('/admin/posts')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PostEdit;
