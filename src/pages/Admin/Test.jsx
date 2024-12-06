import styled from "styled-components";
import TestLayout from "../../components/test/TestLayout";

function Test (){
    return(
        <TestLayout
            title={"Test"}
        />
    );
}


// const Container = styled.div`
//   display: flex;
//   flex-direction: column;

//   /* justify-content: center; */
//   align-items: center;

//   height: calc(100vh - 62px);
//   padding: 20px;
//   box-sizing: border-box;

//   margin-left: 300px;
//   margin-top: 62px;
// `
// const Headers = styled.div`
//     border: 1px solid powderblue;
// `
// const Title = styled.h1`
//     border: 1px solid powderblue;
// `

export default Test;