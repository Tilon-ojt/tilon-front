import styled from "styled-components";

function TheInput(){
    return(
        <Container>
            <Input></Input>
            <Btn>검색</Btn>
        </Container>
    );
}

const Container = styled.div`
    width: 250px;
    border-radius: 5px;
    border: 1px solid #f5f5f5;

    display: flex;
    flex-row;
`

const Input = styled.input`
    width: 250px;
    font-size:16px;
    padding:0 10px;
    border: none;
`

const Btn = styled.button`
    width: 250px;
    font-size:16px;
    padding:0 10px;
    border: none;

    
`

export default TheInput;