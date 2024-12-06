import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
/* 추가된 코드 */
import ImageResize from 'quill-image-resize';
Quill.register('modules/ImageResize', ImageResize);

const modules = {
	toolbar: [
		//[{ 'font': [] }],
		[{ header: [1, 2, false] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
		['link', 'image'],
		[{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
		['clean']
	],

  	/* 추가된 코드 */
	ImageResize: {
		parchment: Quill.import('parchment')
	}
};

const PostEditor = () => {
	return (
		//
		<div>
			<ReactQuill style={{ height: '600px' }} theme="snow" modules={modules} />
		</div>
	);
};

export default PostEditor;