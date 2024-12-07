import TheButton from "../../../components/element/TheButton";
import TheNewsLayout from "../../../components/element/TheNewsLayout";

function NewsCreate(){

    return(
        <TheNewsLayout
            title="XX번째 뉴스"
            cildrenBtn={
                <>
                    <TheButton
                        label={"수정하기"}
                        role={"navigate"}
                        color={"white"}
                        bgColor={"#5060fb"}
                        width={"300px"}
                        height={"40px"}
                        href={"/admin/news/edit"}
                    />
                </>
            }
        />
    );
}

export default NewsCreate;