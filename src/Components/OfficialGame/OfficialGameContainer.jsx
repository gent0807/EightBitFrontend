import styled from "styled-components";
import OfficialGamePage from "./OfficialGamePage"

let Containerbox = styled.div
    `
    width: 100%;
    height: 100%;
`

const OfficialGameContainer = () =>
{
    return(
        <Containerbox>
            <OfficialGamePage />
        </Containerbox>
    );
}

export default OfficialGameContainer;
