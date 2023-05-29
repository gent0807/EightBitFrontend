import styled from "styled-components";

const NotFound = () =>
{
    return(
        <NotFoundContainer>
            <NotFoundText>페이지를 찾을수 없습니다.</NotFoundText>
        </NotFoundContainer>
    );
}

export default NotFound;

const NotFoundContainer = styled.div
`
    display: flex;
    margin: 0 auto;
    width: 460px;
    justify-content: center;
    align-items: center;
    height: 720px;
    padding: 169px 0px 54px 0px;
    @media (min-width:250px) and (max-width:480px)
    {
      padding: 328px 0px 54px 0px;
    }
`

const NotFoundText = styled.span
`
    font-size: 25px;
`