import styled from "styled-components";
import CenterPage from "./CenterPage"

let Containerbox = styled.div
    `
    width: 100%;
    padding: 0px 0px 320px 0px;
    @media (min-width:250px) and (max-width:666px)
    {
        padding: 0px 0px 54px 0px;
    }
    @media (min-width:666px) and (max-width:1344px)
    {
        padding: 0px 0px 54px 0px;
    }
`

const CenterContainer = () => {
    return (
        <Containerbox>
            <CenterPage />
        </Containerbox>
    );
}

export default CenterContainer;