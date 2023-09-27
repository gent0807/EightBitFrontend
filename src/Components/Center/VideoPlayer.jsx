import { useState, useEffect, useRef, useCallback } from 'react';
import styled from "styled-components";
import VideoSample from "../../Video/video.mp4"
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import videoLogo from "../../Video/videoLogo.png"
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

const VideoPlayler = () => {
    const navPrevRef = useRef(null);
    const navNextRef = useRef(null);
    const navPrevRef2 = useRef(null);
    const navNextRef2 = useRef(null);
    const [swiper, setSwiper] = useState(null);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [Slide, setSlide] = useState([
        {
            id: 1,
            lank: 1,
            img: test,
            informaion: "질리지 않는 8비트 공식게임!",
            title: "모험가키우기"
        },
        {
            id: 2,
            img: test1,
            informaion: "질리지 않는 8비트 공식게임!",
            title: "모험가키우기"
        },
        {
            id: 3,
            img: test2,
            informaion: "질리지 않는 8비트 공식게임!",
            title: "모험가키우기"
        },
        {
            id: 4,
            img: test3,
            informaion: "질리지 않는 8비트 공식게임!",
            title: "모험가키우기"
        },
        {
            id: 5,
            img: test4,
            informaion: "질리지 않는 8비트 공식게임!",
            title: "모험가키우기"
        },
    ]);

    const VideoSwiper =
    {
        navigation: { prevEl: navPrevRef2.current, nextEl: navNextRef2.current },
        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = navPrevRef2.current;
            swiper.params.navigation.nextEl = navNextRef2.current;
            swiper.activeIndex = mainImageIndex
            swiper.navigation.update();
        },
        onSwiper: setSwiper,
        onSlideChange: (e) => setMainImageIndex(e.activeIndex),
        allowSlidePrev: { Slidelength: false },
        slidesPerView: 1,
        loop: true,
        loopAdditionalSlides: 1,
    }

    return (
        <VideoAllBox>
            <Slider {...VideoSwiper} ref={setSwiper}>
                {Slide.length !== 0 && Slide.map(({ id, img, informaion, title }) => (
                    <SwiperSlide key={id}>
                        <Video
                            autoPlay
                            loop
                            muted
                            playsInline
                            width="100%"
                            height="100%"
                            controls
                        >
                            <VideoSource src={VideoSample} type="video/mp4" />
                        </Video>
                    </SwiperSlide>
                ))}
                <ButtonBox>
                    <PrevBtn ref={navPrevRef}><FiArrowLeft /></PrevBtn>
                    <NextBtn ref={navNextRef}><FiArrowRight /></NextBtn>
                </ButtonBox>
            </Slider>
        </VideoAllBox>
    );
}

export default VideoPlayler

const VideoAllBox = styled.div
    `
    
`

const VideoSource = styled.source
    `
    
`

const Video = styled.video
    `
    
`

const PrevBtn = styled.div
    `
    position: absolute;
    top: 45%;
    display: flex;
    flex-direction: column;
    align-items: center;
    left: 5%;
    z-index: 10;
    cursor: pointer;
    background: white;
    width: 30px;
    height: 30px;
    padding: 20px;
    border-radius: 40px;
    border: solid 3px #55AAFF;
    svg{
        width: 30px;
        height: 30px;
    }
`
const NextBtn = styled.div
    `   
    position: absolute;
    top: 45%;
    display: flex;
    flex-direction: column;
    align-items: center;
    right: 5%;
    z-index: 10;
    cursor: pointer;
    background: white;
    width: 30px;
    height: 30px;
    padding: 20px;
    border-radius: 40px;
    border: solid 3px #55AAFF;
    svg{
        width: 30px;
        height: 30px;
    }
`