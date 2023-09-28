import styled from "styled-components";
import CenterPage from "./CenterPage"

let Containerbox = styled.div
    `
    width: 100%;
    padding: 0px 0px 1000px 0px;
`

const CenterContainer = () => {
    return (
        <Containerbox>
            <CenterPage />
        </Containerbox>
    );
}

export default CenterContainer;