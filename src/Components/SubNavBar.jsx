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
    border-bottom: solid 1px #6767ff;
    align-items: center;
`

export default SubNavBar;
