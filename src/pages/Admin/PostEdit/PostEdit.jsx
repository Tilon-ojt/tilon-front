import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import ImageResize from 'quill-image-resize';

Quill.register('modules/ImageResize', ImageResize);

function PostEdit() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const userState = useSelector((state) => state.user);
    
    // 상태 관리
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        category: '',
        status: 'PUBLISHED',
        fix: false,
        link: '',
    });

    // 게시글 데이터 불러오기
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`/api/admin/posts/${postId}`, {
                    headers: {
                        'Authorization': `Bearer ${userState.token}`
                    }
                });

                if (response.data.success) {
                    const { title, content, category, status, fix, link } = response.data.post;
                    setPostData({
                        title,
                        content,
                        category,
                        status,
                        fix,
                        link
                    });
                } else {
                    alert('게시글을 불러오는데 실패했습니다.');
                }
            } catch (error) {
                console.error('게시글 로딩 실패:', error);
                alert('게시글을 불러오는데 실패했습니다.');
            }
        };

        if (postId && userState.token) {
            fetchPostData();
        }
    }, [postId, userState.token]);

    // 게시글 수정 처리
    const handleSubmit = async () => {
        try {
            const response = await axios.put(`/api/admin/posts/${postId}`, postData, {
                headers: {
                    'Authorization': `Bearer ${userState.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                alert('게시글이 성공적으로 수정되었습니다.');
                navigate('/admin/posts');
            } else {
                alert('게시글 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('게시글 수정 실패:', error);
            alert('게시글 수정에 실패했습니다.');
        }
    };

    // 입력값 변경 처리
    const handleChange = (name, value) => {
        setPostData(prev => ({
            ...prev,
            [name]: value
        }));
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
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: '5vh',
        }}>
            <div style={{
                width: '1000px',
                height: '700px',
                margin: 'auto',
                borderRadius: '19px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                padding: '20px',
                backgroundColor: '#fff'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '10px',
                }}>
                    <select
                        value={postData.category}
                        disabled
                        style={{ width: '150px' }}
                    >
                        <option value="pr">PR</option>
                        <option value="insight">INSIGHT</option>
                        <option value="news">NEWS</option>
                    </select>

                    <input
                        type="text"
                        placeholder="링크를 입력하세요"
                        value={postData.link}
                        onChange={(e) => handleChange('link', e.target.value)}
                        style={{ flex: 1 }}
                    />

                    <select
                        value={postData.status}
                        onChange={(e) => handleChange('status', e.target.value)}
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
                            onChange={(e) => handleChange('fix', e.target.checked)}
                        />
                    </label>
                </div>

                <input
                    className="Title"
                    placeholder="제목을 입력해 주세요"
                    value={postData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
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

                <div style={{ height: '380px', width: '100%' }}>
                    <ReactQuill
                        modules={modules}
                        placeholder='내용을 입력해 주세요'
                        value={postData.content}
                        onChange={(content) => handleChange('content', content)}
                        style={{
                            height: "550px",
                            width: '100%',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <button 
                    onClick={handleSubmit}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    수정하기
                </button>
            </div>
        </div>
    );
}

export default PostEdit;