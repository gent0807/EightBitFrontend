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


                <OfficialGame1>
                    <Link to={`/GameInformationView/${GameInformaion[0].id}`} onClick={() => ScrollTop()}>
                        <OfficialGame1imgBox>
                            <OfficialGame1img src={GameInformaion[0].thumbnailImg} />

                            <OfficialGame1InformaitonBox />

                        </OfficialGame1imgBox>
                    </Link>
                </OfficialGame1>

                <OfficialGame2>
                    <Link to={`/GameInformationView/${GameInformaion[1].id}`} onClick={() => ScrollTop()}>
                        <OfficialGame2imgBox>
                            <OfficialGame2img src={GameInformaion[1].thumbnailImg} />

                            <OfficialGame2InformaitonBox />

                        </OfficialGame2imgBox>
                    </Link>
                </OfficialGame2>

                <OfficialGame3>
                    <Link to={`/GameInformationView/${GameInformaion[2].id}`} onClick={() => ScrollTop()}>
                        <OfficialGame3imgBox>
                            <OfficialGame3img src={GameInformaion[2].thumbnailImg} />

                            <OfficialGame3InformaitonBox />

                        </OfficialGame3imgBox>
                    </Link>
                </OfficialGame3>


            </OfficialGameBox>

            <GradientBox />

        </OfficialGameAllBox>
    );
}

export default OfficialGamePage;

const GradientBox = styled.div
`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50vw;
    z-index: 999;
    pointer-events: none; 
    background-image: linear-gradient(to top, rgba(25,25,25,1) -1%, transparent 30%);
`

const OfficialGame1InformaitonBox = styled.div
    `
    position: absolute;
    width: 33.4vw;
    height: 100%;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    transition: opacity 0.5s ease;
    opacity: 1;
`

const OfficialGame2InformaitonBox = styled.div
    `
    position: absolute;
    width: 33.4vw;
    height: 100%;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    transition: opacity 0.5s ease;
    opacity: 1;
`

const OfficialGame3InformaitonBox = styled.div
    `
    position: absolute;
    width: 33.4vw;
    height: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    transition: opacity 0.5s ease;
    opacity: 1;
`
const OfficialGame1img = styled.img
    `
    width: 100%;
    height: 100%;
    transform: scale(1);
    transition: transform 0.5s;
`

const OfficialGame2img = styled.img
    `
    width: 100%;
    height: 100%;
    transform: scale(1);
    transition: transform 0.5s;
`

const OfficialGame3img = styled.img
    `
    width: 100%;
    height: 100%;
    transform: scale(1);
    transition: transform 0.5s;
`

const OfficialGame1 = styled.div
    `
    width: 100%;
    height: 50vw;
    overflow: hidden;
    cursor: pointer;
    a{
            text-decoration: none;
        }
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
    height: 50vw;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    a{
            text-decoration: none;
        }
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
    height: 50vw;
    overflow: hidden;
    cursor: pointer;
    a{
        text-decoration: none;
    }
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
        position: relative;
        background: rgba(25,25,25,1);
    `


const OfficialGame1imgBox = styled.div
    `
        position: relative;
    `

const OfficialGame2imgBox = styled.div
    `
        position: relative;
    `

const OfficialGame3imgBox = styled.div
    `
         position: relative;
    `



