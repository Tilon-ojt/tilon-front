// 틀만 만들어둔거임!!!!!! 기능 추가해야함


import styled from "styled-components";

function TheSearch(){

    const clickHandler=()=>{
        alert("click!");
    }
    return(
        <Container>
            <Input placeholder="Search...."/>
            <Btn>
                <img
                    alt="search"
                    src="https://icons.veryicon.com/png/o/education-technology/education-app/search-137.png"
                    onClick={clickHandler}
                />
            </Btn>
        </Container>
    );
}

const Container = styled.div`
    width: 350px;
    border-radius: 4px;
    border: 1px solid gray;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding: 5px;

`

const Input = styled.input`
    width: 300px;
    font-size:16px;
    padding:0 10px;
    border: none;

    &:focus{
        outline: none;
    }
`

const Btn = styled.div`
 img{
     width: 30px;
    height: 30px;

    opacity: 0.7;
    transition: all .3s;

    &:hover{
        opacity: 1;
    }
 }
`

export default TheSearch;