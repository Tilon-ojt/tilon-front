import styled from "styled-components";

const TheNewsCELayout = ({
  title,
  setTitle,
  link,
  setLink,
  imageUrl,
  onClick,
  onChange,
  ref,
}) => {
  return (
    <>
      <ThumbnailImg>
        {imageUrl 
          && <img alt="썸네일 이미지" 
                  src={imageUrl} />
        }
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
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </Input>
    </>
  );
};

const ThumbnailImg = styled.div`
  height: auto;
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
    /* width: 130px; */
    width: 65%;
  }

  input[type="text"],
  input[type="url"] {
    border: 1.5px solid lightgray;
    width: 70%;
    height: 25px;
    padding: 2px 10px;
    border-radius: 5px;
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      background: #f5f5f5;
      border-radius: 50%;
    }
  }
`;

export default TheNewsCELayout;
