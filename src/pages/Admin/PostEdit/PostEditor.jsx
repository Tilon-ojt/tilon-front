import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from 'react-quill';
import Button from 'react-bootstrap/Button';
import 'react-quill/dist/quill.snow.css';

import ImageResize from 'quill-image-resize';
import { useSelector } from "react-redux";
import axios from "axios";

Quill.register('modules/ImageResize', ImageResize);

function Write() {
    // ------------------------State------------------------
    let redux = useSelector((state) => { return state });

    const category = 'notice';
    let date = '';

    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    // ------------------------get Content------------------------
    const onChagecontent = (e) => {
        console.log(e);
        setContent(e);
    };

    // ------------------------정규식으로 src 추출------------------------

    const srcArray = [];
    const blopArray = [];
    const urlArray = [];

    const gainSource = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;

    async function SaveBoard() {
        while (gainSource.test(content)) {
            console.log('이미지가 있을때만 진행함.');
            let result = RegExp.$2;
            srcArray.push(result);
            console.log('srcArray 추가: ', srcArray);

            const byteString = atob(result.split(",")[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ia], {
                type: "image/jpeg"
            });
            const file = new File([blob], "image.jpg");

            const formData = new FormData();
            formData.append("file", file);

            const config = {
                header: { 'content-type': 'multipart/form-data' }
            };

            await axios.post('api/board/uploadImgFolder', formData, config)
                .then(response => {
                    if (response.data.success) {
                        console.log('이미지 서버에 업로드 성공', response);
                        urlArray.push(response.data.url);
                        console.log('urlArray에 추가', urlArray);
                    } else {
                        alert('이미지를 서버에 업로드하는데 실패했습니다.');
                    }
                });
        }

        let endContent = content;
        if (srcArray.length > 0) {
            console.log('실행은 됐음..');
            for (let i = 0; i < srcArray.length; i++) {
                let replace = endContent.replace(srcArray[i], urlArray[i]);
                endContent = replace;
            }
        }

        console.log('endContent:', endContent);

        let writeInform = {
            category: category,
            subject: subject,
            content: endContent,
            writer: redux.setUser.u_id,
            imgList: urlArray,
            view: 0,
            good: 0
        };

        axios.post('/api/board/write', writeInform)
            .then(response => {
                if (response.data.success) {
                    console.log('업로드 성공');
                    console.log('저장한 데이터 : ', response);
                } else {
                    alert('업로드에 실패하였습니다.');
                }
            });

        console.log('최종 urlArray', urlArray);
        console.log('최종 srcArray: ', srcArray);
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
        <div>
            <div style={{ width: '100%', height: '70vh' }}>
                <div style={{ width: '1000px', margin: 'auto', borderRadius: '19px' }}>

                 

                    <input
                        className="Subject"
                        placeholder="제목을 입력해 주세요"
                        style={{
                            padding: '7px',
                            marginBottom: '10px',
                            width: '100%',  // 제목 박스 width 100%로 설정
                            border: '1px solid lightGray',
                            fontSize: '15px',
                            boxSizing: 'border-box', // box-sizing 설정으로 padding 포함한 width 계산
							marginTop : '60px',
                        }}
                        onChange={(e) => { setSubject(e.target.value) }}
                    />

                    <div style={{ height: '400px', width: '100%' }}>
                        <ReactQuill
                            modules={modules}
                            placeholder='내용을 입력해 주세요'
                            onChange={onChagecontent}
                            style={{
                                height: "330px",
                                width: '100%',  // 내용 박스 width 100%로 설정
                                boxSizing: 'border-box'  // box-sizing 설정으로 padding 포함한 width 계산
                            }}
                        />
                    </div>

                    {/* <div style={{ float: 'right' }}>
                        <Button variant="danger" style={{ marginRight: '10px' }} >취소</Button>
                        <Button variant="dark"
                            onClick={() => {
                                SaveBoard()
                            }}
                        >저장하기</Button>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Write;
