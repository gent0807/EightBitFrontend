import FreeArticle from "./FreeArticle";
import { styled } from "styled-components";

const ContainerBox = styled.div
`
    margin: 0 auto;
    max-width: 1280px;
    padding: 267px 0px 54px 0px;
    @media (min-width:250px) and (max-width:666px)
    {
        padding: 358px 0px 54px 0px;
    }
`

const FreeArticleContainer = () => {
    return(
       <ContainerBox>
            <FreeArticle/>
       </ContainerBox>
    );
}    

export default FreeArticleContainer;