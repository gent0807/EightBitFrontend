import { useRecoilState } from "recoil";
import { isDark } from "../Darkmode/Darkmode";
import { styled } from "styled-components";
import { icons } from "react-icons/lib";

const Darkmode = () =>
{

const [Darkmode, setDarkmode] = useRecoilState(isDark);

const ToggleBtn = () =>
{
    setDarkmode((prev) => !prev);
    localStorage.setItem("mode", String(!Darkmode));
};

return (
    <IconsBox onClick={ToggleBtn}><Icons src={ Darkmode ? "img/light.png" : "img/dark.png" }/></IconsBox>
);

}

export default Darkmode;

const IconsBox = styled.div
`
    cursor: pointer;
    float: right;
    margin: 10px;
    background: white;
    border: solid 2px black;
    border-radius: 42px;
    padding: 5px;
    width: 40px;
    height: 40px;
    position: absolute;
    right: 0px;
    -webkit-tap-highlight-color:transparent;
`

const Icons = styled.img
`
    width: 40px;
    height: 40px;
    -webkit-user-select: none;
`

