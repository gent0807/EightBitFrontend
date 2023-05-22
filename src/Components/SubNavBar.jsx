import styled from "styled-components";

const SubNavBar = () =>
{
    
    return(
        <SubNavMenu><div>샘플</div></SubNavMenu>
    );
}

const SubNavMenu = styled.div
`
    height: 55px;
    justify-content: center;
    display: flex;
    margin: auto;
    max-width: 1256px;
    align-items: center;
`

export default SubNavBar;
