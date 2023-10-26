import { useState, useEffect, useRef, useCallback, FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from "styled-components";
import { Slide } from "../Game";

const OfficialGamePage = () => {


    const [GameInformaion, setGameInformation] = useState(Slide)
    const { id } = useParams();

    useEffect(() => {
        setGameInformation(Slide.filter((Game) => Game.game === "공식게임"))
    }, [GameInformaion]);

    const ScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <OfficialGameAllBox>
            <OfficialGameBox>

            <Link to={`/GameInformationView/${GameInformaion[0].id}`} onClick={() => ScrollTop()}>
                <OfficialGame1>
                    <OfficialGame1imgBox>
                        <OfficialGame1img src={GameInformaion[0].img} />

                        <OfficialGame1InformaitonBox />

                    </OfficialGame1imgBox>
                </OfficialGame1>
            </Link>

            <Link to={`/GameInformationView/${GameInformaion[1].id}`} onClick={() => ScrollTop()}>
                <OfficialGame2>
                    <OfficialGame2imgBox>
                        <OfficialGame2img src={GameInformaion[1].img} />

                        <OfficialGame2InformaitonBox />

                    </OfficialGame2imgBox>
                </OfficialGame2>
            </Link>

            <Link to={`/GameInformationView/${GameInformaion[2].id}`} onClick={() => ScrollTop()}>
                <OfficialGame3>
                    <OfficialGame3imgBox>
                        <OfficialGame3img src={GameInformaion[2].img} />

                        <OfficialGame3InformaitonBox />

                    </OfficialGame3imgBox>
                </OfficialGame3>
            </Link>

            </OfficialGameBox>
        </OfficialGameAllBox>
    );
}

export default OfficialGamePage;

const InformaionAllBox = styled.div
    `
    padding: 23vh 0px 0px 0px;
    a{
        text-decoration: none;
    }
`

const OfficialBtnBox = styled.div
    `
    display: flex;
    justify-content: center;
    margin: 4vw 0px 4vw 0px;
`

const VideoInformationBtn = styled.div
    `
    display: flex;
    background: #007aff;
    padding: 0.6vw;
    white-space: nowrap;
    border-radius: 5px;
    margin: 0px 0px 0px 20px;
`

const VideoInformationBtnIcon = styled.i
    `
    display: flex;
    align-items: center;
    font-size: 2.4vw;
    svg
    {
        color: white;
    }
`

const VideoInformationBtnText = styled.div
    `
    color: white;
    font-size: 2vw;
    font-weight: bold;
    cursor: pointer;
    margin: 9px 0px 6px 10px;
`

const VideoDownloadBtn = styled.div
    `
    display: flex;
    background: #007aff;
    padding: 0.6vw;
    white-space: nowrap;
    border-radius: 5px;
`

const VideoDownloadBtnIcon = styled.i
    `
    display: flex;
    align-items: center;
    font-size: 2.4vw;
    svg
    {
        color: white;
    }
`

const VideoDownloadBtnText = styled.span
    `
    color: white;
    font-size: 2vw;
    font-weight: bold;
    cursor: pointer;
    margin: 9px 0px 6px 10px;
`

const OfficialGame1InformaitonBox = styled.div
    `
    position: fixed;
    width: 33.4vw;
    height: 100%;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    transition: opacity 0.5s ease;
    opacity: 1;
`

const OfficialInforTextBox = styled.div
    `
    display: flex;
    justify-content: center;
`

const OfficialIntroduceBox = styled.div
    `
    display: flex;
    justify-content: center;
    margin: 2vw 0px 2vw 0px;
`

const OfficialIntroduceText = styled.span
    `
    font-size: 3vw;
    font-weight: bold;
    color: white;
`

const OfficialInforText = styled.span
    `
     color: white;
     font-size: 1.5vw;
     font-weight: bold;
`

const OfficialInforImgBox = styled.div
    `
    display: flex;
    justify-content: center;
`

const OfficialGame1Inforimg = styled.img
    `
    width: 20vw;
    height: 30vh;
    border-radius: 17px;
`

const OfficialGame2Inforimg = styled.img
    `
    width: 20vw;
    height: 30vh;
    border-radius: 17px;
`

const OfficialGame3Inforimg = styled.img
    `
    width: 20vw;
    height: 30vh;
    border-radius: 17px;
`

const OfficialGame2InformaitonBox = styled.div
    `
    position: fixed;
    width: 33.4vw;
    height:100%;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    transition: opacity 0.5s ease;
    opacity: 1;
`

const OfficialGame3InformaitonBox = styled.div
    `
    position: fixed;
    width: 33.4vw;
    height:100%;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    transition: opacity 0.5s ease;
    opacity: 1;
`
const OfficialGame1img = styled.img
    `
    position: relative;
    width: 100%;
    height: 100vh;
    transform: scale(1);
    transition: transform 0.5s;
`

const OfficialGame2img = styled.img
    `
    position: relative;
    width: 100%;
    height: 100vh;
    transform: scale(1);
    transition: transform 0.5s;
`

const OfficialGame3img = styled.img
    `
    position: relative;
    width: 100%;
    height: 100vh;
    transform: scale(1);
    transition: transform 0.5s;
`

const OfficialGame1 = styled.div
    `
    width: 100%;
    height: 100vh;
    overflow: hidden;
    cursor: pointer;
    &:hover{
        ${OfficialGame1InformaitonBox}{
            transition: opacity 0.5s ease;
            opacity: 0;
        }
        ${OfficialGame1img}{
            transform: scale(1.1);
            transition: transform 0.5s;
        }
    }
    `

const OfficialGame2 = styled.div
    `
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    &:hover{
        ${OfficialGame2InformaitonBox}{
            transition: opacity 0.5s ease;
            opacity: 0;
        }
        ${OfficialGame2img}{
            transform: scale(1.1);
            transition: transform 0.5s;
    }
    `

const OfficialGame3 = styled.div
    `
    width: 100%;
    height: 100vh;
    overflow: hidden;
    cursor: pointer;
    &:hover{
        ${OfficialGame3InformaitonBox}{
            transition: opacity 0.5s ease;
            opacity: 0;
        }
        ${OfficialGame3img}{
            transform: scale(1.1);
            transition: transform 0.5s;
    }
    `

const OfficialGameAllBox = styled.div
    `
    
    `

const OfficialGameBox = styled.div
    `
        display: flex;
        a{
            text-decoration: none;
        }
    `


const OfficialGame1imgBox = styled.div
    `
    `

const OfficialGame2imgBox = styled.div
    `
    
    `

const OfficialGame3imgBox = styled.div
    `
    
    `



