import { useRecoilState } from "recoil";
import { isDark } from "../Darkmode/Darkmode";
import { styled, keyframes } from "styled-components";
import { icons } from "react-icons/lib";
import { BsSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";
import Dark from "../../img/Darkmode/dark.png";
import light from "../../img/Darkmode/light.png";

const Darkmode = () => {

    const [Darkmode, setDarkmode] = useRecoilState(isDark);

    const ToggleBtn = () => {
        setDarkmode((prev) => !prev);
        localStorage.setItem("mode", String(!Darkmode));
    };

    return (
        <IconsBox change={Darkmode} onClick={ToggleBtn}>
            <Icons Move={Darkmode} />
            <IconsAllBox>
                <MoonIcon Opacity={Darkmode}><BsFillMoonFill /></MoonIcon>
                <SunIcon Opacity={Darkmode}><BsSunFill /></SunIcon>
            </IconsAllBox>
        </IconsBox>
    );

}

export default Darkmode;

const IconsBox = styled.div
    `
    cursor: pointer;
    background: white;
    background: ${props => props.change ? "rgba(0,144,249,1)" : "rgba(55,65,118,1)"};
    border-radius: 42px;
    margin: 16px -6px 0px 8px;
    padding: 5px;
    width: 50px;
    height: 20px;
    -webkit-tap-highlight-color:transparent;
    tratransition: background 0.5s;
`

const IconsAllBox = styled.div
    `
    display: flex;
    flex-direction: row;
    margin: 2px 0px 0px 4px;
`

const IconOpacityUp = keyframes
    `
    0%
    {
        opacity: 100%;
    100%
    {
        opacity: 0%;
    }
`

const IconOpacityDown = keyframes
    `
    0%
    {
        opacity: 0%;
    100%
    {
        opacity: 100%;
    }
`

const SunIcon = styled.i
    `
    color: yellow;
    font-size:16px;
    opacity: ${props => props.Opacity ? "100%" : "0%"};
    animation: ${props => props.Opacity ? IconOpacityDown : IconOpacityUp} 0.4s;
`

const MoonIcon = styled.i
    `
    font-size:16px;
    margin: 0px 10px 0px 0px;
    opacity: ${props => props.Opacity ? "0%" : "100%"};
    animation: ${props => props.Opacity ? IconOpacityUp : IconOpacityDown} 0.4s;
`

const IconRight = keyframes
    `
    0%
    {
        margin-left: 30px;
    100%
    {
        margin-left: 0px;
    }
`

const IconLeft = keyframes
    `
    0%
    {
        margin-left: 0px;
    100%
    {
        margin-left: 30px;
    }
`

const Icons = styled.div
    `
    position: absolute;
    animation: ${props => props.Move ? IconRight : IconLeft} 0.4s;
    margin-left: ${props => props.Move ? "0px" : "30px"};
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background: white;
    -webkit-user-select: none;
`

