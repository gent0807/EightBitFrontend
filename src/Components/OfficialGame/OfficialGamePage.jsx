import { useState, useEffect, useRef, useCallback, FC } from 'react';
import styled from "styled-components";
import test1 from "../../img/MainSlide/test1.png"
import test2 from "../../img/MainSlide/test2.png"
import test3 from "../../img/MainSlide/test3.png"
import { RiInformationLine } from "react-icons/ri";
import { AiOutlineDownload } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const OfficialGamePage = () => {

    const [hoverImg1, setHoverImg1] = useState(false);
    const [hoverImg2for3, sethoverImg2for3] = useState(false);
    const [hoverImg2for1, setHoverImg2for1] = useState(false);
    const [hoverImg3, setHoverImg3] = useState(false);

    const [Slide, setSlide] = useState([
        {
            id: 1,
            img: test2,
            informaion: "방치하면서 성장하는 8비트 공식 게임!",
            title: "방치모험가"
        },
        {
            id: 2,
            img: test1,
            informaion: "뱀파이어소녀에 관한 8비트 공식 게임!",
            title: "로드 오브 토파즈"
        },
        {
            id: 3,
            img: test3,
            informaion: "끝 없이 터치하라! 8비트 공식 게임!",
            title: "럭키웨폰"
        },
    ]);

    const hoverImg1Inhandler = () => {
        setHoverImg2for1(true);
        setHoverImg3(true);
    }

    const hoverImg1Outhandler = () => {
        setHoverImg2for1(false);
        setHoverImg3(false);
    }

    const hoverImg3Inhandler = () => {
        setHoverImg1(true);
        sethoverImg2for3(true);
    }

    const hoverImg3Outhandler = () => {
        setHoverImg1(false);
        sethoverImg2for3(false);
    }

    return (
        <OfficialGameAllBox>
            <OfficialGameBox>

                <OfficialGame1>
                    <OfficialGame1imgBox>
                        <OfficialGame1img src={Slide[0].img} />

                        <OfficialGame1InformaitonBox>

                            <InformaionAllBox>
                                <OfficialInforImgBox>
                                    <OfficialGame1Inforimg src={Slide[0].img} />
                                </OfficialInforImgBox>

                                <OfficialIntroduceBox>
                                    <OfficialIntroduceText>
                                        {Slide[0].title}
                                    </OfficialIntroduceText>
                                </OfficialIntroduceBox>

                                <OfficialInforTextBox>
                                    <OfficialInforText>{Slide[0].informaion}</OfficialInforText>
                                </OfficialInforTextBox>

                                <OfficialBtnBox>
                                    <VideoDownloadBtn>
                                        <VideoDownloadBtnIcon>
                                            <AiOutlineDownload />
                                        </VideoDownloadBtnIcon>
                                        <VideoDownloadBtnText>
                                            다운로드
                                        </VideoDownloadBtnText>
                                    </VideoDownloadBtn>

                                    <Link to="/">
                                        <VideoInformationBtn>
                                            <VideoInformationBtnIcon>
                                                <RiInformationLine />
                                            </VideoInformationBtnIcon>
                                            <VideoInformationBtnText>
                                                상세정보
                                            </VideoInformationBtnText>
                                        </VideoInformationBtn>
                                    </Link>
                                </OfficialBtnBox>
                            </InformaionAllBox>

                        </OfficialGame1InformaitonBox>

                    </OfficialGame1imgBox>
                </OfficialGame1>

                <OfficialGame2>
                    <OfficialGame2imgBox>
                        <OfficialGame2img src={Slide[1].img} />

                        <OfficialGame2InformaitonBox>

                            <InformaionAllBox>
                                <OfficialInforImgBox>
                                    <OfficialGame2Inforimg src={Slide[1].img} />
                                </OfficialInforImgBox>

                                <OfficialIntroduceBox>
                                    <OfficialIntroduceText>
                                        {Slide[0].title}
                                    </OfficialIntroduceText>
                                </OfficialIntroduceBox>

                                <OfficialInforTextBox>
                                    <OfficialInforText>{Slide[1].informaion}</OfficialInforText>
                                </OfficialInforTextBox>

                                <OfficialBtnBox>
                                    <VideoDownloadBtn>
                                        <VideoDownloadBtnIcon>
                                            <AiOutlineDownload />
                                        </VideoDownloadBtnIcon>
                                        <VideoDownloadBtnText>
                                            다운로드
                                </VideoDownloadBtnText>
                                    </VideoDownloadBtn>

                                    <Link to="/">
                                        <VideoInformationBtn>
                                            <VideoInformationBtnIcon>
                                                <RiInformationLine />
                                            </VideoInformationBtnIcon>
                                            <VideoInformationBtnText>
                                                상세정보
                                </VideoInformationBtnText>
                                        </VideoInformationBtn>
                                    </Link>
                                </OfficialBtnBox>
                            </InformaionAllBox>

                        </OfficialGame2InformaitonBox>

                    </OfficialGame2imgBox>
                </OfficialGame2>

                <OfficialGame3>
                    <OfficialGame3imgBox>
                        <OfficialGame3img src={Slide[2].img} />

                        <OfficialGame3InformaitonBox>

                            <InformaionAllBox>
                                <OfficialInforImgBox>
                                    <OfficialGame3Inforimg src={Slide[2].img} />
                                </OfficialInforImgBox>

                                <OfficialIntroduceBox>
                                    <OfficialIntroduceText>
                                        {Slide[0].title}
                                    </OfficialIntroduceText>
                                </OfficialIntroduceBox>

                                <OfficialInforTextBox>
                                    <OfficialInforText>{Slide[2].informaion}</OfficialInforText>
                                </OfficialInforTextBox>

                                <OfficialBtnBox>
                                    <VideoDownloadBtn>
                                        <VideoDownloadBtnIcon>
                                            <AiOutlineDownload />
                                        </VideoDownloadBtnIcon>
                                        <VideoDownloadBtnText>
                                            다운로드
                                </VideoDownloadBtnText>
                                    </VideoDownloadBtn>

                                    <Link to="/">
                                        <VideoInformationBtn>
                                            <VideoInformationBtnIcon>
                                                <RiInformationLine />
                                            </VideoInformationBtnIcon>
                                            <VideoInformationBtnText>
                                                상세정보
                                </VideoInformationBtnText>
                                        </VideoInformationBtn>
                                    </Link>
                                </OfficialBtnBox>

                            </InformaionAllBox>

                        </OfficialGame3InformaitonBox>

                    </OfficialGame3imgBox>
                </OfficialGame3>

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
    position: absolute;
    width: 33.4vw;
    height:100%;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    transition: opacity 0.5s ease;
    opacity: 0;
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
    position: absolute;
    width: 33.4vw;
    height:100%;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    transition: opacity 0.5s ease;
    opacity: 0;
`

const OfficialGame3InformaitonBox = styled.div
    `
    position: absolute;
    width: 33.4vw;
    height:100%;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,0.8);
    transition: opacity 0.5s ease;
    opacity: 0;
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
    &:hover{
        ${OfficialGame1InformaitonBox}{
            transition: opacity 0.5s ease;
            opacity: 1;
        }
        ${OfficialGame1img}{
            transform: scale(1.2);
            transition: transform 0.5s;
        }
    }
    `

const OfficialGame2 = styled.div
    `
    width: 100%;
    height: 100vh;
    overflow: hidden;
    &:hover{
        ${OfficialGame2InformaitonBox}{
            transition: opacity 0.5s ease;
            opacity: 1;
        }
        ${OfficialGame2img}{
            transform: scale(1.2);
            transition: transform 0.5s;
    }
    `

const OfficialGame3 = styled.div
    `
    width: 100%;
    height: 100vh;
    overflow: hidden;
    &:hover{
        ${OfficialGame3InformaitonBox}{
            transition: opacity 0.5s ease;
            opacity: 1;
        }
        ${OfficialGame3img}{
            transform: scale(1.2);
            transition: transform 0.5s;
    }
    `

const OfficialGameAllBox = styled.div
    `
    
    `

const OfficialGameBox = styled.div
    `
        display: flex;
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



