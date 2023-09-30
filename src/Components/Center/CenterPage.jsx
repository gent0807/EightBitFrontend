import { useState, useEffect, useRef, useCallback } from 'react';
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import VideoPlayler from './VideoPlayer';
import test from "../../img/MainSlide/test.png";
import test1 from "../../img/MainSlide/test1.png";
import test2 from "../../img/MainSlide/test2.png";
import test3 from "../../img/MainSlide/test3.png";
import test4 from "../../img/MainSlide/test4.png";
import test5 from "../../img/MainSlide/test5.png";

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

const CenterPage = () => {
    const navPrevRef = useRef(null);
    const navNextRef = useRef(null);
    const navPrevRef2 = useRef(null);
    const navNextRef2 = useRef(null);
    const navPrevRef3 = useRef(null);
    const navNextRef3 = useRef(null);
    const navPrevRef4 = useRef(null);
    const navNextRef4 = useRef(null);
    const navPrevRef5 = useRef(null);
    const navNextRef5 = useRef(null);
    const navPrevRef6 = useRef(null);
    const navNextRef6 = useRef(null);
    const navPrevRef7 = useRef(null);
    const navNextRef7 = useRef(null);

    const PaginatonRef = useRef(null);
    const PaginatonRef2 = useRef(null);
    const PaginatonRef3 = useRef(null);
    const PaginatonRef4 = useRef(null);
    const PaginatonRef5 = useRef(null);
    const PaginatonRef6 = useRef(null);
    const PaginatonRef7 = useRef(null);

    const [ swiper, setSwiper ] = useState(null);
    const [ mainImageIndex, setMainImageIndex ] = useState(0);

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
    const [AdSlide, setAdSlide] = useState([
        {
            id: 1,
            lank: 1,
            img: test5,
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
    const [AdSlide2, setAdSlide2] = useState([
        {
            id: 1,
            lank: 1,
            img: test5,
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
        spaceBetween: 30,
        slidesPerView: 5,
        loop: true,
        loopAdditionalSlides: 1,
        onSwiper: setSwiper,
        allowSlidePrev: { Slidelength: false },
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
    }

    const swiperParams2 =
    {
        navigation: { prevEl: navPrevRef2.current, nextEl: navNextRef2.current },
        pagination: {
            el: PaginatonRef2.current,
            type: 'bullets',
            clickable: true
        },
        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = navPrevRef2.current;
            swiper.params.navigation.nextEl = navNextRef2.current;
            swiper.activeIndex = mainImageIndex
            swiper.navigation.update();
        },
        spaceBetween: 30,
        slidesPerView: 5,
        loop: true,
        loopAdditionalSlides: 1,
        onSwiper: setSwiper,
        allowSlidePrev: { Slidelength: false },
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
    }

    const swiperParams3 =
    {
        navigation: { prevEl: navPrevRef4.current, nextEl: navNextRef4.current },
        pagination: {
            el: PaginatonRef4.current,
            type: 'bullets',
            clickable: true
        },
        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = navPrevRef4.current;
            swiper.params.navigation.nextEl = navNextRef4.current;
            swiper.activeIndex = mainImageIndex
            swiper.navigation.update();
        },
        spaceBetween: 30,
        slidesPerView: 5,
        loop: true,
        loopAdditionalSlides: 1,
        onSwiper: setSwiper,
        allowSlidePrev: { Slidelength: false },
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
    }

    const swiperParams4 =
    {
        navigation: { prevEl: navPrevRef5.current, nextEl: navNextRef5.current },
        pagination: {
            el: PaginatonRef5.current,
            type: 'bullets',
            clickable: true
        },
        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = navPrevRef5.current;
            swiper.params.navigation.nextEl = navNextRef5.current;
            swiper.activeIndex = mainImageIndex
            swiper.navigation.update();
        },
        spaceBetween: 30,
        slidesPerView: 5,
        loop: true,
        loopAdditionalSlides: 1,
        onSwiper: setSwiper,
        allowSlidePrev: { Slidelength: false },
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
    }
    
    const swiperParams5 =
    {
        spaceBetween: 30,
        slidesPerView: 5,
        loop: true,
        loopAdditionalSlides: 1,
        navigation: { prevEl: navPrevRef6.current, nextEl: navNextRef6.current },
        pagination: {
            el: PaginatonRef6.current,
            type: 'bullets',
            clickable: true
        },
        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = navPrevRef6.current;
            swiper.params.navigation.nextEl = navNextRef6.current;
            swiper.activeIndex = mainImageIndex
            swiper.navigation.update();
        },
        onSwiper: setSwiper,
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
        allowSlidePrev: { Slidelength: false },
    }

    const AdSwiper =
    {
        navigation: { prevEl: navPrevRef3.current, nextEl: navNextRef3.current },
        pagination: {
            el: PaginatonRef3.current,
            type: 'bullets',
            clickable: true
        },
        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = navPrevRef3.current;
            swiper.params.navigation.nextEl = navNextRef3.current;
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

    const AdSwiper2 =
    {
        navigation: { prevEl: navPrevRef7.current, nextEl: navNextRef7.current },
        pagination: {
            el: PaginatonRef7.current,
            type: 'bullets',
            clickable: true
        },
        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = navPrevRef7.current;
            swiper.params.navigation.nextEl = navNextRef7.current;
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
        <SwiperBox>

            <VideoPlayler />

            <AllContentBox>
                <GameSlideBox>

                    <PopTitleBox>장르별 게임</PopTitleBox>

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

                    <PopTitleBox>장르별 게임</PopTitleBox>

                    <Slider {...swiperParams2} ref={setSwiper}>
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
                        <PrevBtn ref={navPrevRef2}><IoIosArrowBack /></PrevBtn>
                        <PaginationBtn ref={PaginatonRef2}></PaginationBtn>
                        <NextBtn ref={navNextRef2}><IoIosArrowForward /></NextBtn>
                    </ButtonBox>

                </GameSlideBox>

                <AdContainerBox>
                    <AdSlider {...AdSwiper} ref={setSwiper}>
                        {AdSlide.length !== 0 && AdSlide.map(({ id, img, informaion, title }) => (
                            <SwiperSlide key={id}>
                                <ImgAdBox src={img} />
                                <AdAllBox>
                                    <AdTitleBox>{title}</AdTitleBox>
                                    <AdInformaionBox>{informaion}</AdInformaionBox>
                                </AdAllBox>
                            </SwiperSlide>
                        ))}
                    </AdSlider>

                    <ButtonBox>
                        <PrevBtn ref={navPrevRef3}><IoIosArrowBack /></PrevBtn>
                        <PaginationBtn ref={PaginatonRef3}></PaginationBtn>
                        <NextBtn ref={navNextRef3}><IoIosArrowForward /></NextBtn>
                    </ButtonBox>

                </AdContainerBox>

                <GameSlideBox>

                    <PopTitleBox>인기 게임 차트</PopTitleBox>

                    <Slider {...swiperParams3} ref={setSwiper}>
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
                        <PrevBtn ref={navPrevRef4}><IoIosArrowBack /></PrevBtn>
                        <PaginationBtn ref={PaginatonRef4}></PaginationBtn>
                        <NextBtn ref={navNextRef4}><IoIosArrowForward /></NextBtn>
                    </ButtonBox>

                    <PopTitleBox>인기 게임 차트</PopTitleBox>

                    <Slider {...swiperParams4} ref={setSwiper}>
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
                        <PrevBtn ref={navPrevRef5}><IoIosArrowBack /></PrevBtn>
                        <PaginationBtn ref={PaginatonRef5}></PaginationBtn>
                        <NextBtn ref={navNextRef5}><IoIosArrowForward /></NextBtn>
                    </ButtonBox>

                    <PopTitleBox>인기 게임 차트</PopTitleBox>

                    <Slider {...swiperParams5} ref={setSwiper}>
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
                        <PrevBtn ref={navPrevRef6}><IoIosArrowBack /></PrevBtn>
                        <PaginationBtn ref={PaginatonRef6}></PaginationBtn>
                        <NextBtn ref={navNextRef6}><IoIosArrowForward /></NextBtn>
                    </ButtonBox>

                </GameSlideBox>

                <AdContainerBox>
                    <AdSlideBox>

                        <AdSlider {...AdSwiper2} ref={setSwiper}>
                            {AdSlide2.length !== 0 && AdSlide.map(({ id, img, informaion, title }) => (
                                <SwiperSlide key={id}>
                                    <ImgAdBox src={img} />
                                    <AdAllBox>
                                        <AdTitleBox>{title}</AdTitleBox>
                                        <AdInformaionBox>{informaion}</AdInformaionBox>
                                    </AdAllBox>
                                </SwiperSlide>
                            ))}
                        </AdSlider>

                        <ButtonBox>
                            <PrevBtn ref={navPrevRef7}><IoIosArrowBack /></PrevBtn>
                            <PaginationBtn ref={PaginatonRef7}></PaginationBtn>
                            <NextBtn ref={navNextRef7}><IoIosArrowForward /></NextBtn>
                        </ButtonBox>

                    </AdSlideBox>
                </AdContainerBox>

            </AllContentBox>
        </SwiperBox>
    );
}

const AllContentBox = styled.div
    `

`

const AdContainerBox = styled.div
    `
    margin: 40px 0px 40px 0px;
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

.swiper-pagination-bullet.swiper-pagination-bullet-active
{
    background: #007aff;
}
`

const PaginationBtn = styled.div
    `
    display: flex;
    align-items: center;
    z-index: 999;

    .swiper-pagination-bullet
    {
        align-item:center;
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

const InformaionBoxTextBox = styled.div
    `
    display: flex;
    flex-direction: column;
    padding: 20px;
    background: rgba(41,41,41,0.8);
`

const AllBox = styled.div
    `
    position: absolute;
    display: none;
    flex-direction: column;
    justify-content: end;
    background: rgba(0,0,0,0.3);
    top: 0.2%;
    height: 74.6%;
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


const AdSlider = styled(Slider)
    `
    height: 600px;

`


const ButtonBox = styled.div
    `
    display: flex;
    justify-content: center;
    margin: -71px 0px 0px 0px;
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
const AdSlideBox = styled.div
    `
    position: absolute;
    width: 100%

`

const GameSlideBox = styled.div
    `
    max-width: 1280px;
    position: relative;
    margin: 0 auto;
    padding: 0px 20px 0px 20px;
    z-index: 999;
`

const PopTitleBox = styled.h2
    `
    color: ${props => props.theme.CenterTextColor};
    transition: color 0.5s;
`

const SwiperBox = styled.div
    `
   
`

const ImgBox = styled.img
    `
    width: 100%;
    height: 285px;
`

const ImgAdBox = styled.img
    `
    width: 100%;
    height: 533px;
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

const InformaionBox = styled.div
    `
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    color: white;
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

const SlideBox = styled.div
    `
    border-radius: 10px;
    overflow: hidden;
    border: solid 1px ${props => props.theme.CenterBorderColor};
    transition: border 0.5s;
    height: 285px;
`

export default CenterPage;
