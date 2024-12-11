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
            console.log('요청 URL:', `/admin/posts/${postId}`);
            console.log('토큰:', userState);

            const response = await api.get(`/admin/posts/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${userState}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('PR 상세 조회 API 응답:', response.data);
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
                });

                setEditedData({
                    title: response.data.title,
                    content: response.data.content,
                    category: response.data.category,
                    postStatus: response.data.status,
                    fix: response.data.fix,
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

export default PostEdit;
