import { useState, useEffect, useRef, useCallback  } from 'react';
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "./Custom.css";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";

const CenterPage = () =>
{
    const navPrevRef = useRef(null);
    const navNextRef = useRef(null);
    const navPrevRef2 = useRef(null);
    const navNextRef2 = useRef(null);
    const [swiper, setSwiper] = useState(null);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [Slide, setSlide] = useState([
        {
            id : 1,
            lank : 1,
            img : "img/test.jpg",
            informaion : "질리지 않는 8비트 공식게임!",
            title : "모험가키우기"
        },
        {
            id : 2,
            img : "img/test1.jpg",
            informaion : "질리지 않는 8비트 공식게임!",
            title : "모험가키우기"
        },
        {
            id : 3,
            img : "img/test2.png",
            informaion : "질리지 않는 8비트 공식게임!",
            title : "모험가키우기"
        },
        {
            id : 4,
            img : "img/test3.jpg",
            informaion : "질리지 않는 8비트 공식게임!",
            title : "모험가키우기"
        },
        {
            id : 5,
            img : "img/test4.jpg",
            informaion : "질리지 않는 8비트 공식게임!",
            title : "모험가키우기"
        },
    ]);
    const [AdSlide, setAdSlide] = useState([
        {
            id : 1,
            lank : 1,
            img : "img/test.jpg",
            informaion : "질리지 않는 8비트 공식게임!",
            title : "모험가키우기"
        },
        {
            id : 2,
            img : "img/test1.jpg",
            informaion : "질리지 않는 8비트 공식게임!",
            title : "모험가키우기"
        },
        {
            id : 3,
            img : "img/test2.png",
            informaion : "질리지 않는 8비트 공식게임!",
            title : "모험가키우기"
        },
        {
            id : 4,
            img : "img/test3.jpg",
            informaion : "질리지 않는 8비트 공식게임!",
            title : "모험가키우기"
        },
        {
            id : 5,
            img : "img/test5.png",
            informaion : "질리지 않는 8비트 공식게임!",
            title : "모험가키우기"
        },
    ]);
    const [AdSlide2, setAdSlide2] = useState([
        {
            id : 1,
            lank : 1,
            img : "img/test.jpg",
            informaion : "질리지 않는 8비트 공식게임!",
            title : "모험가키우기"
        },
        {
            id : 2,
            img : "img/test1.jpg",
            informaion : "질리지 않는 8비트 공식게임!",
            title : "모험가키우기"
        },
        {
            id : 3,
            img : "img/test2.png",
            informaion : "질리지 않는 8비트 공식게임!",
            title : "모험가키우기"
        },
        {
            id : 4,
            img : "img/test3.jpg",
            informaion : "질리지 않는 8비트 공식게임!",
            title : "모험가키우기"
        },
        {
            id : 5,
            img : "img/test5.png",
            informaion : "질리지 않는 8비트 공식게임!",
            title : "모험가키우기"
        },
    ]);

    SwiperCore.use([Navigation, Pagination]);

    const swiperParams = 
    {
        spaceBetween : 30,
        slidesPerView : 5,
        loop: true,
        loopAdditionalSlides: 1,
        breakpoints : {
            300: {
                spaceBetween : 30,
                slidesPerView : 1,
            },
            965: {
                spaceBetween : 30,
                slidesPerView : 4,
            },
            1342: {
                spaceBetween : 30,
                slidesPerView : 5,
            }
        },
        navigation : true,
        pagination : { clickable: true },
        onSwiper : setSwiper,
        allowSlidePrev : { Slidelength: false},
    }

    const swiperParams2 = 
    {
        spaceBetween : 30,
        slidesPerView : 5,
        loop: true,
        loopAdditionalSlides: 1,
        breakpoints : {
            300: {
                spaceBetween : 30,
                slidesPerView : 1,
            },
            965: {
                spaceBetween : 30,
                slidesPerView : 4,
            },
            1342: {
                spaceBetween : 30,
                slidesPerView : 5,
            }
        },
        navigation : true,
        pagination : { clickable: true },
        onSwiper : setSwiper,
        allowSlidePrev : { Slidelength: false},
    }

    const swiperParams3 = 
    {
        spaceBetween : 30,
        slidesPerView : 5,
        loop: true,
        loopAdditionalSlides: 1,
        breakpoints : {
            300: {
                spaceBetween : 30,
                slidesPerView : 1,
            },
            965: {
                spaceBetween : 30,
                slidesPerView : 4,
            },
            1342: {
                spaceBetween : 30,
                slidesPerView : 5,
            }
        },
        navigation : true,
        pagination : { clickable: true },
        onSwiper : setSwiper,
        allowSlidePrev : { Slidelength: false},
    }

    const swiperParams4 = 
    {
        spaceBetween : 30,
        slidesPerView : 5,
        loop: true,
        loopAdditionalSlides: 1,
        breakpoints : {
            300: {
                spaceBetween : 30,
                slidesPerView : 1,
            },
            965: {
                spaceBetween : 30,
                slidesPerView : 4,
            },
            1342: {
                spaceBetween : 30,
                slidesPerView : 5,
            }
        },
        navigation : true,
        pagination : { clickable: true },
        onSwiper : setSwiper,
        allowSlidePrev : { Slidelength: false},
    }

    const swiperParams5 = 
    {
        spaceBetween : 30,
        slidesPerView : 5,
        loop: true,
        loopAdditionalSlides: 1,
        breakpoints : {
            300: {
                spaceBetween : 30,
                slidesPerView : 1,
            },
            965: {
                spaceBetween : 30,
                slidesPerView : 4,
            },
            1342: {
                spaceBetween : 30,
                slidesPerView : 5,
            }
        },
        navigation : true,
        pagination : { clickable: true },
        onSwiper : setSwiper,
        allowSlidePrev : { Slidelength: false},
    }

    const swiperParams6 = 
    {
        spaceBetween : 30,
        slidesPerView : 5,
        loop: true,
        loopAdditionalSlides: 1,
        breakpoints : {
            300: {
                spaceBetween : 30,
                slidesPerView : 1,
            },
            965: {
                spaceBetween : 30,
                slidesPerView : 4,
            },
            1342: {
                spaceBetween : 30,
                slidesPerView : 5,
            }
        },
        navigation : true,
        pagination : { clickable: true },
        onSwiper : setSwiper,
        allowSlidePrev : { Slidelength: false},
    }

    const AdSwiper = 
    {
        navigation : { prevEl: navPrevRef.current, nextEl: navNextRef.current },
        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = navPrevRef.current;
            swiper.params.navigation.nextEl = navNextRef.current;
            swiper.activeIndex = mainImageIndex
            swiper.navigation.update();
        },
        onSwiper : setSwiper,
        onSlideChange : (e) => setMainImageIndex(e.activeIndex),
        allowSlidePrev : { Slidelength: false},
        slidesPerView : 1,
        loop: true,
        loopAdditionalSlides: 1,
    }

    const AdSwiper2 = 
    {
        navigation : { prevEl: navPrevRef2.current, nextEl: navNextRef2.current },
        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = navPrevRef2.current;
            swiper.params.navigation.nextEl = navNextRef2.current;
            swiper.activeIndex = mainImageIndex
            swiper.navigation.update();
        },
        onSwiper : setSwiper,
        onSlideChange : (e) => setMainImageIndex(e.activeIndex),
        allowSlidePrev : { Slidelength: false},
        slidesPerView : 1,
        loop: true,
        loopAdditionalSlides: 1,
    }

    return(
        <SwiperBox>
        <GameSlideBox>
        <PopTitleBox>인기 게임 차트</PopTitleBox>
        <Swiper {...swiperParams} ref={setSwiper}>
            {Slide.length !== 0 && Slide.map(({ id, img, informaion, title} ) => (
            <SwiperSlide key={id}>
                <SlideBox>
                <Lanking>{id}</Lanking>
                <ImgBox src={img}/>
                <AllBox>
                <TitleBox>{title}</TitleBox>
                <InformaionBox>{informaion}</InformaionBox>
                </AllBox>
                </SlideBox>
            </SwiperSlide>
            ))}
        </Swiper>
        <PopTitleBox>인기 게임 차트</PopTitleBox>
        <Swiper {...swiperParams2} ref={setSwiper}>
            {Slide.length !== 0 && Slide.map(({ id, img, informaion, title} ) => (
            <SwiperSlide key={id}>
                <SlideBox>
                <Lanking>{id}</Lanking>
                <ImgBox src={img}/>
                <AllBox>
                <TitleBox>{title}</TitleBox>
                <InformaionBox>{informaion}</InformaionBox>
                </AllBox>
                </SlideBox>
            </SwiperSlide>
            ))}
        </Swiper>
        <PopTitleBox>인기 게임 차트</PopTitleBox>
        <Swiper {...swiperParams3} ref={setSwiper}>
            {Slide.length !== 0 && Slide.map(({ id, img, informaion, title} ) => (
            <SwiperSlide key={id}>
                <SlideBox>
                <Lanking>{id}</Lanking>
                <ImgBox src={img}/>
                <AllBox>
                <TitleBox>{title}</TitleBox>
                <InformaionBox>{informaion}</InformaionBox>
                </AllBox>
                </SlideBox>
            </SwiperSlide>
            ))}
        </Swiper>
        </GameSlideBox>
        <AdSlideBox>
        <Swiper {...AdSwiper} ref={setSwiper}>
        {AdSlide.length !== 0 && AdSlide.map(({ id, img, informaion, title} ) => (
        <SwiperSlide key={id}>
            <ImgAdBox src={img}/>
            <AdAllBox>
            <AdTitleBox>{title}</AdTitleBox>
            <AdInformaionBox>{informaion}</AdInformaionBox>
            </AdAllBox>
        </SwiperSlide>
        ))}
        <ButtonBox>
        <PrevBtn ref={navPrevRef}><FiArrowLeft/></PrevBtn>
        <NextBtn ref={navNextRef}><FiArrowRight/></NextBtn>
        </ButtonBox>
        </Swiper>
        </AdSlideBox>
        <GameSlideBox>
        <PopTitleBox>인기 게임 차트</PopTitleBox>
        <Swiper {...swiperParams4} ref={setSwiper}>
            {Slide.length !== 0 && Slide.map(({ id, img, informaion, title} ) => (
            <SwiperSlide key={id}>
                <SlideBox>
                <Lanking>{id}</Lanking>
                <ImgBox src={img}/>
                <AllBox>
                <TitleBox>{title}</TitleBox>
                <InformaionBox>{informaion}</InformaionBox>
                </AllBox>
                </SlideBox>
            </SwiperSlide>
            ))}
        </Swiper>
        <PopTitleBox>인기 게임 차트</PopTitleBox>
        <Swiper {...swiperParams5} ref={setSwiper}>
            {Slide.length !== 0 && Slide.map(({ id, img, informaion, title} ) => (
            <SwiperSlide key={id}>
                <SlideBox>
                <Lanking>{id}</Lanking>
                <ImgBox src={img}/>
                <AllBox>
                <TitleBox>{title}</TitleBox>
                <InformaionBox>{informaion}</InformaionBox>
                </AllBox>
                </SlideBox>
            </SwiperSlide>
            ))}
        </Swiper>
        <PopTitleBox>인기 게임 차트</PopTitleBox>
        <Swiper {...swiperParams6} ref={setSwiper}>
            {Slide.length !== 0 && Slide.map(({ id, img, informaion, title} ) => (
            <SwiperSlide key={id}>
                <SlideBox>
                <Lanking>{id}</Lanking>
                <ImgBox src={img}/>
                <AllBox>
                <TitleBox>{title}</TitleBox>
                <InformaionBox>{informaion}</InformaionBox>
                </AllBox>
                </SlideBox>
            </SwiperSlide>
            ))}
        </Swiper>
        </GameSlideBox>
        <AdSlideBox>
        <Swiper {...AdSwiper2} ref={setSwiper}>
        {AdSlide2.length !== 0 && AdSlide.map(({ id, img, informaion, title} ) => (
        <SwiperSlide key={id}>
            <ImgAdBox src={img}/>
            <AdAllBox>
            <AdTitleBox>{title}</AdTitleBox>
            <AdInformaionBox>{informaion}</AdInformaionBox>
            </AdAllBox>
        </SwiperSlide>
        ))}
        <ButtonBox>
        <PrevBtn ref={navPrevRef2}><FiArrowLeft/></PrevBtn>
        <NextBtn ref={navNextRef2}><FiArrowRight/></NextBtn>
        </ButtonBox>
        </Swiper>
        </AdSlideBox>
        </SwiperBox>
    );
}

const AdContainerBox = styled.div
`
`
const ButtonBox = styled.div
`
    width: 1600px;
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
const AdSlideBox = styled.div
`
`

const GameSlideBox = styled.div
`
    max-width: 1600px;
    margin: 0 auto;
    padding: 0px 20px 0px 20px;
`

const Lanking = styled.span
`
    position: absolute;
    left: 7%;
    top: 6%;
    background: white;
    padding: 11px;
    border-radius: 34px;
    width: 30px;
    height: 30px;
    font-size: 27px;
    text-align: center;
    border: solid 7px orange;
    border-style: double;
`

const PopTitleBox = styled.h1
`
    color: ${props => props.theme.textColor};
`

const SwiperBox = styled.div
`
`

const ImgBox = styled.img
`
    width: 100%;
    height: 100%;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
`

const ImgAdBox = styled.img
`
    width: 100%;
    height: 533px;
`

const TitleBox = styled.span
`
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size: 30px;
    color: white;
    margin: 0px 0px 10px 0px;
`

const AdTitleBox = styled.span
`
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size: 55px;
    color: white;
    margin: 0px 0px 30px 0px;
`

const AdInformaionBox = styled.span
`
    color : white;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size: 22px;
`

const InformaionBox = styled.span
`
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
`

const AdAllBox = styled.div
`
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 20px;
    padding: 20px;
    top: 16%;
    left: 12%;
`

const AllBox = styled.div
`
    display: flex;
    flex-direction: column;
    background: gray;
    margin: -5px 0px 0px 0px;
    padding: 20px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
`

const SlideBox = styled.div
`
    height: 384px;
`

export default CenterPage;
