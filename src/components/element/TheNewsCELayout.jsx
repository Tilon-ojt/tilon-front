import styled from "styled-components";

const TheNewsCELayout = ({ 
    title, 
    setTitle, 
    url, 
    setUrl, 
    thumbnailSrc, 
    setThumbnailSrc,
    onClick,
    onChange,
    ref,
}) => {

  return (
    <>
      <ThumbnailImg>
        <img alt="썸네일 이미지" 
        src={thumbnailSrc} 
        />
      </ThumbnailImg>

      <Input>
        <span>썸네일 이미지</span>
        <input
          type="file"
          accept="image/*"
          ref={ref}
          onChange={onChange}
        />
        <button onClick={onClick}>✖</button>
      </Input>

      <Input>
        <span>뉴스 제목</span>
        <input
          type="text"
          placeholder="제목 입력..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Input>

      <Input>
        <span>연결 링크</span>
        <input
          type="url"
          placeholder="URL 입력..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </Input>
    </>
  );
};

const ThumbnailImg = styled.div`
  height: auto ;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  img {
    border: 2px solid lightgray;
    width: 400px;
    height: auto;
    border-radius: 10px;
    margin-bottom: 10px;
  }
`;

const Input = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;

  span {
    border-right: 2px solid lightgray;
    width: 130px;
  }

  input[type="file"] {
    width: 65%;
  }

  input[type="text"],
  input[type="url"] {
    border: 1.5px solid lightgray;

    width: 70%;
    height: 25px;
    padding: 2px 10px;
    border: 1px solid lightgray;
    border-radius: 5px;

    &:focus {
      outline: none;
      border: 1.5px solid lightgray;
    }
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-weight: bold;

    &:hover {
      background: #f5f5f5;
      border-radius: 50%;
    }
  }
`;

export default TheNewsCELayout;
