import { useState, useEffect, useRef, useCallback } from 'react';
import styled from "styled-components";
import VideoSample from "../../Video/maple.mp4"
import VideoSample2 from "../../Video/video.mp4"
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import videoLogo from "../../Video/videoLogo.png"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { RiInformationLine } from "react-icons/ri";
import { AiOutlineDownload } from "react-icons/ai";
import { VscMute } from "react-icons/vsc";
import { VscUnmute } from "react-icons/vsc";
import ReactPlayer from 'react-player'
import { Link, useNavigate } from "react-router-dom";
import test from "../../img/MainSlide/test.png";
import test1 from "../../img/MainSlide/test1.png";
import test2 from "../../img/MainSlide/test2.png";
import test3 from "../../img/MainSlide/test3.png";
import test4 from "../../img/MainSlide/test4.png";
import test5 from "../../img/MainSlide/test5.png";

SwiperCore.use([Navigation, Pagination, EffectCoverflow, Autoplay]);

const VideoPlayler = () => {
    const navPrevRef = useRef(null);
    const navNextRef = useRef(null);
    const PaginatonRef = useRef(null);
    const [swiper, setSwiper] = useState(null);
    const [soundOnOff, setSoundOnOff] = useState(true);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [playtime, setPlaytime] = useState(0);

    const [Slide, setSlide] = useState([
        {
            id: 1,
            img: test2,
            Logo: videoLogo,
            informaion: "켜두기만 하면 캐릭터가 성장한다!",
            video: VideoSample2,
            title: "방치모험가"
        },
        {
            id: 2,
            img: test,
            Logo: videoLogo,
            informaion: "일단달려! 드릴에게 도망쳐라!",
            video: VideoSample,
            title: "도망런"
        },
        {
            id: 3,
            img: test4,
            Logo: videoLogo,
            informaion: "수학을 풀고 강해져라!",
            video: VideoSample2,
            title: "매스리볼버"
        },
        {
            id: 4,
            img: test3,
            Logo: videoLogo,
            informaion: "무기 강화로 당신의 운을 시험하라!",
            video: VideoSample,
            title: "럭키웨폰"
        },
        {
            id: 5,
            img: test1,
            Logo: videoLogo,
            informaion: "인간이 되고 싶은 뱀파이어...",
            video: VideoSample2,
            title: "로드 오브 토파즈"
        },
    ]);

    console.log(Slide[mainImageIndex].video.duration);

    const swiperParams =
    {
        navigation: { prevEl: navPrevRef.current, nextEl: navNextRef.current },

        pagination: {
            el: PaginatonRef.current,
            type: 'bullets',
            clickable: true
        },

        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = navPrevRef.current;
            swiper.params.navigation.nextEl = navNextRef.current;
            swiper.activeIndex = mainImageIndex
            swiper.navigation.update();
        },

        onSwiper: setSwiper,
        onSlideChange: (e) => setMainImageIndex(e.realIndex),
        allowSlidePrev: { Slidelength: false },

        coverflowEffect: {
            rotate: 20,
            stretch: 10,
            depth: 115,
            modifier: 1,
            scale: 1,
            slideShadows: false
        },

        breakpoints: {
            250: {
                spaceBetween: 30,
                slidesPerView: 1,
            },
            561: {
                spaceBetween: 30,
                slidesPerView: 2,
            },
            794: {
                spaceBetween: 30,
                slidesPerView: 3,
            },
            1060: {
                spaceBetween: 30,
                slidesPerView: 4,
            },
            1342: {
                spaceBetween: 30,
                slidesPerView: 5,
            }
        },

        coverflow: {
            rotate: 0,
            stretch: 100,
            depth: 150,
            modifier: 1.5,
            slideShadows: false,
        },

        spaceBetween: 30,
        slidesPerView: 5,
        centeredSlides: true,
        loopAdditionalSlides: 1,
        loop: true,
        effect: "coverflow",
    }

    console.log(playtime);

    return (
        <VideoAllBox>
            <VideoBox>
                <VideoInformation>
                    <VideoInformationLogoBox>
                        <VideoInformationLogo src={Slide[mainImageIndex].Logo} />
                    </VideoInformationLogoBox>

                    <VideoInformationTextBox>
                        <VideoInformationText>
                            {Slide[mainImageIndex].informaion}
                        </VideoInformationText>
                    </VideoInformationTextBox>

                    <VideoInformationDownLoadBtnBox>

                        <VideoDownloadBtn>
                            <VideoDownloadBtnIcon>
                                <RiInformationLine />
                            </VideoDownloadBtnIcon>
                            <VideoDownloadBtnText>
                                다운로드
                            </VideoDownloadBtnText>
                        </VideoDownloadBtn>

                        <Link to="/">
                            <VideoInformationBtn>
                                <VideoInformationBtnIcon>
                                    <AiOutlineDownload />
                                </VideoInformationBtnIcon>
                                <VideoInformationBtnText>
                                    상세정보
                                </VideoInformationBtnText>
                            </VideoInformationBtn>
                        </Link>

                        <MuteBtn>
                            <MuteBtnIcon onClick={() => setSoundOnOff(!soundOnOff)}>
                                {soundOnOff ? <VscMute /> : <VscUnmute />}
                            </MuteBtnIcon>
                        </MuteBtn>

                    </VideoInformationDownLoadBtnBox>

                </VideoInformation>
                <VideoViewBox>
                    <VideoPlay
                        url={Slide[mainImageIndex].video}
                        loop={true}
                        onProgress={
                            (progress) => { setPlaytime(progress.playedSeconds) }
                        }
                        muted={soundOnOff}
                        playing={true}
                        width={"100%"}
                        height={"100%"}
                    />
                    <VideoBackground />
                </VideoViewBox>
            </VideoBox>
            <GameSlideBox>
                <Slider {...swiperParams} ref={setSwiper}>
                    {Slide.length !== 0 && Slide.map(({ id, img, informaion, title }) => (
                        <SwiperSlide key={id}>
                            <Link to='/'>
                                <SlideAllBox>
                                    <SlideBox>
                                        <ImgBox src={img} />
                                    </SlideBox>

                                    <AllBox>
                                        <InformaionBoxTextBox>
                                            <TitleBox>{title}</TitleBox>
                                            <InformaionBox>{informaion}</InformaionBox>
                                        </InformaionBoxTextBox>
                                    </AllBox>
                                </SlideAllBox>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Slider>
                <ButtonBox>
                    <PrevBtn ref={navPrevRef}><IoIosArrowBack /></PrevBtn>
                    <PaginationBtn ref={PaginatonRef}></PaginationBtn>
                    <NextBtn ref={navNextRef}><IoIosArrowForward /></NextBtn>
                </ButtonBox>
            </GameSlideBox>
        </VideoAllBox>
    );
}

export default VideoPlayler

const VideoViewBox = styled.div
    `

`

const MuteBtn = styled.div
    `
    margin: 0px 0px 0px 1vw;
    font-size: 1.3vw;
    cursor: pointer;
    svg
    {
        color: white;
    }
`

const MuteBtnIcon = styled.i
    `
`

const VideoInformationBtnIcon = styled.i
    `
    display: flex;
    align-items: center;
    font-size: 1.3vw;
    svg
    {
        color: white;
    }
`

const VideoDownloadBtnIcon = styled.i
    `
    display: flex;
    align-items: center;
    font-size: 1.3vw;
    svg
    {
        color: white;
    }
`

const VideoInformationDownLoadBtnBox = styled.div
    `
    display: flex;
    margin: 2vw 0px 0px 0px;
    justify-content: start;

    a
    {
        text-decoration: none;
    }
`

const VideoInformationBtn = styled.div
    `
    display: flex;
    background: #007aff;
    margin: 0px 0px 0px 1vw;
    padding: 0.8vw;
    white-space: nowrap;
    border-radius: 5px;
`

const VideoInformationBtnText = styled.div
    `
    color: white;
    font-size: 1.3vw;
    font-weight: bold;
    cursor: pointer;
    margin: 1px 0px 0px 10px;
`

const VideoDownloadBtn = styled.div
    `
    display: flex;
    background: #007aff;
    padding: 0.8vw;
    white-space: nowrap;
    border-radius: 5px;
`

const VideoDownloadBtnText = styled.span
    `
    color: white;
    font-size: 1.3vw;
    font-weight: bold;
    cursor: pointer;
    margin: 1px 0px 0px 10px;
`

const VideoInformationLogoBox = styled.div
    `

`

const VideoInformationLogo = styled.img
    `
    width: 100%;
    height: 100%;
}
`

const VideoInformationTextBox = styled.div
    `
    text-align: start;
`

const VideoInformationText = styled.span
    `
    color: ${props => props.theme.CenterTextColor};
    font-size: 1.5vw;
    font-weight: bold;
    transition: color 0.5s;
`

const VideoBox = styled.div
    `

`

const VideoInformation = styled.div
    `
    position: absolute;
    top: 17vw;
    right: 3vw;
    width: 25vw;
    height: 12vw;
    border-radius: 18px;
    z-index: 999;
`

const Slider = styled(Swiper)
    `
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
    margin-bottom: 20px;
    height: 382px;

    a{
        text-decoration: none;
    }

    .swiper-button-next, .swiper-button-prev
    {
        top: 41%;
        background: white;
        background: white;
        border-radius: 30px;
        padding: 10px;
        border: solid 3px #55AAFF;
        width: 30px;
        height: 30px;
    }

    .swiper-button-prev.swiper-button-disabled,
    .swiper-button-next.swiper-button-disabled
    {
        display: none;
    }

    .swiper-button-prev:after,
    .swiper-button-next:after
    {
        font-size: 22px;
    }

`

const PaginationBtn = styled.div
    `
display: flex;
align-items: center;
z-index: 999;

.swiper-pagination-bullet
{
    margin: 0px 4px 0px 4px;
    background: white;
    cursor: pointer;
    opacity: 1;
}

.swiper-pagination-bullet.swiper-pagination-bullet-active
{
    background: #007aff;
    width: 20px;
    border-radius: 5px;
}
`

const PrevBtn = styled.div
    `
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
    cursor: pointer;
    transition: color 0.5s;
    color: ${props => props.theme.CenterTextColor};
    font-size: 34px;
`

const NextBtn = styled.div
    `   
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
    cursor: pointer;
    transition: color 0.5s;
    color: ${props => props.theme.CenterTextColor};
    font-size: 34px;
`

const GameSlideBox = styled.div
    `
    max-width: 1280px;
    position: relative;
    margin: -160px auto 0px auto;
    padding: 0px 20px 0px 20px;
    z-index: 1000;

    @media (min-width:250px) and (max-width:549px)
    {
        margin: -9px auto 0px auto;
    }

    @media (min-width:550px) and (max-width:704px)
    {
        margin: -74px auto 0px auto;
    }

    @media (min-width:705px) and (max-width:1373px)
    {
        margin: -80px auto 0px auto;
    }
`

const ImgBox = styled.img
    `
    width: 100%;
    height: 285px;
`

const AllBox = styled.div
    `
    position: absolute;
    display: none;
    flex-direction: column;
    justify-content: end;
    background: rgba(0,0,0,0.3);
    top: 0.2%;
    height: 74.7%;
    left: 0.4%;
    border-radius: 8px;
    width: 99.163%;
    overflow: hidden;
     @media (min-width:250px) and (max-width:560px)
    {
        width: 100%;
    }
`

const SlideAllBox = styled.div
    `
    &:hover
    {
        ${AllBox}
        {
            display: flex;
        }
    }
`

const TitleBox = styled.div
    `
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size: 30px;
    color: white;
    margin: 0px 0px 10px 0px;
`

const InformaionBox = styled.div
    `
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    color: white;
`

const InformaionBoxTextBox = styled.div
    `
    display: flex;
    flex-direction: column;
    padding: 20px;
    background: rgba(41,41,41,0.8);
`

const SlideBox = styled.div
    `
    border-radius: 10px;
    overflow: hidden;
    border: solid 1px ${props => props.theme.CenterBorderColor};
    transition: border 0.5s;
    height: 285px;
`

const VideoPlay = styled(ReactPlayer)
    `
    width: 100%;
    height: 100%;
`

const VideoBackground = styled.div
    `
    position: relative;
    background: rgba(25,25,25,1);
    box-shadow: 2px -8px 11px 13px rgba(25,25,25,1);
    z-index: 1000;
    pointer-events: none;
`

const VideoAllBox = styled.div
    `
    position: relative;
`

const ButtonBox = styled.div
    `
    display: flex;
    justify-content: center;
    margin: -71px 0px 0px 0px;
}
`

