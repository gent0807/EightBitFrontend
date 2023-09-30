import { useState, useEffect, useRef, useCallback } from 'react';
import styled from "styled-components";
import VideoSample from "../../Video/video.mp4"
import VideoSample2 from "../../Video/video2.mkv"
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import videoLogo from "../../Video/videoLogo.png"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
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
    const [mainImageIndex, setMainImageIndex] = useState(0);

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
        autoplay: {
            delay: 20000,
            disableOnInteraction: false,
        },

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

    const [Slide, setSlide] = useState([
        {
            id: 1,
            img: test,
            informaion: "질리지 않는 8비트 공식게임!",
            video: VideoSample,
            title: "모험가키우기"
        },
        {
            id: 2,
            img: test1,
            informaion: "질리지 않는 8비트 공식게임!",
            video: VideoSample2,
            title: "모험가키우기"
        },
        {
            id: 3,
            img: test2,
            informaion: "질리지 않는 8비트 공식게임!",
            video: VideoSample,
            title: "모험가키우기"
        },
        {
            id: 4,
            img: test3,
            informaion: "질리지 않는 8비트 공식게임!",
            video: VideoSample,
            title: "모험가키우기"
        },
        {
            id: 5,
            img: test4,
            informaion: "질리지 않는 8비트 공식게임!",
            video: VideoSample2,
            title: "모험가키우기"
        },
    ]);

    return (
        <VideoAllBox>
            <VideoBackground>
            </VideoBackground>
            <VideoPlay
                url={Slide[mainImageIndex].video}
                loop={true}
                muted={true}
                playing={true}
                width={"100%"}
                height={"48.5vw"}
            />
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
    margin: -12vw auto 0px auto;
    padding: 0px 20px 0px 20px;
    z-index: 999;
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
    position: absolute;
    background: linear-gradient(to top, rgba(25, 25, 25, 1) 2%, rgba(25, 25, 25, 0.9) 11%, rgba(25, 25, 25, 0) 54%);
    height: 48.5vw;
    top: 0%;
    left: 0%;
    bottom: 0%;
    right: 0%;
    z-index: 999;
    pointer-events: none;
`

const VideoAllBox = styled.div
    `
`

const ButtonBox = styled.div
    `
    display: flex;
    justify-content: center;
    margin: -71px 0px 0px 0px;
}
`

