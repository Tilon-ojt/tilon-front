import TheButton from "../../../components/element/TheButton";
import TheNewsLayout from "../../../components/element/TheNewsLayout";

function NewsCreate(){

    const isAlert =()=> {
        alert("작성을 취소하고 기존 페이지로 돌아갑니다.");
    }
    
    return(
        <TheNewsLayout
            title="뉴스 작성"
            cildrenBtn={
                <>
                    <TheButton
                        label={"저장 완료"}
                        role={"submit"}
                        color={"white"}
                        bgColor={"#5060fb"}
                        width={"150px"}
                        height={"35px"}
                    />
                    <TheButton
                        label={"취소"}
                        role={"navigate"}
                        color={"black"}
                        bgColor={"#e3e3e3"}
                        width={"150px"}
                        height={"35px"}
                        href={"/admin"}
                        onClick={isAlert}
                    />
                </>
            }
        />
    );
}

export default NewsCreate;