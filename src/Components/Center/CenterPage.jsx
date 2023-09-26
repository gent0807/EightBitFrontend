import { useState, useEffect, useRef, useCallback } from 'react';
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";

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
    const [AdSlide, setAdSlide] = useState([
        {
            id: 1,
            lank: 1,
            img: test5,
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
    ]);

    const swiperParams =
    {
        spaceBetween: 30,
        slidesPerView: 5,
        loop: true,
        centeredSlides: true,
        loopAdditionalSlides: 1,
        effect: "coverflow",
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
        navigation: true,
        pagination: { clickable: true },
        onSwiper: setSwiper,
        allowSlidePrev: { Slidelength: false },
        coverflow: {
            rotate: 0,
            stretch: 100,
            depth: 150,
            modifier: 1.5,
            slideShadows: false,
        }
    }

    const swiperParams2 =
    {
        spaceBetween: 30,
        slidesPerView: 5,
        loop: true,
        loopAdditionalSlides: 1,
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
        navigation: true,
        pagination: { clickable: true },
        onSwiper: setSwiper,
        allowSlidePrev: { Slidelength: false },
    }

    const swiperParams3 =
    {
        spaceBetween: 30,
        slidesPerView: 5,
        loop: true,
        loopAdditionalSlides: 1,
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
        navigation: true,
        pagination: { clickable: true },
        onSwiper: setSwiper,
        allowSlidePrev: { Slidelength: false },
    }

    const swiperParams4 =
    {
        spaceBetween: 30,
        slidesPerView: 5,
        loop: true,
        loopAdditionalSlides: 1,
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
        navigation: true,
        pagination: { clickable: true },
        onSwiper: setSwiper,
        allowSlidePrev: { Slidelength: false },
    }

    const swiperParams5 =
    {
        spaceBetween: 30,
        slidesPerView: 5,
        loop: true,
        loopAdditionalSlides: 1,
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
        navigation: true,
        pagination: { clickable: true },
        onSwiper: setSwiper,
        allowSlidePrev: { Slidelength: false },
    }

    const swiperParams6 =
    {
        spaceBetween: 30,
        slidesPerView: 5,
        loop: true,
        loopAdditionalSlides: 1,
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
        navigation: true,
        pagination: { clickable: true },
        onSwiper: setSwiper,
        allowSlidePrev: { Slidelength: false },
    }

    const AdSwiper =
    {
        navigation: { prevEl: navPrevRef.current, nextEl: navNextRef.current },
        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = navPrevRef.current;
            swiper.params.navigation.nextEl = navNextRef.current;
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
        <SwiperBox>
            <GameSlideBox>
                <PopTitleBox>인기 게임</PopTitleBox>
                <Slider {...swiperParams} ref={setSwiper}>
                    {Slide.length !== 0 && Slide.map(({ id, img, informaion, title }) => (
                        <SwiperSlide key={id}>
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
                        </SwiperSlide>
                    ))}
                </Slider>
                <PopTitleBox>신작 게임</PopTitleBox>
                <Slider {...swiperParams2} ref={setSwiper}>
                    {Slide.length !== 0 && Slide.map(({ id, img, informaion, title }) => (
                        <SwiperSlide key={id}>
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
                        </SwiperSlide>
                    ))}
                </Slider>
                <PopTitleBox>테마 게임</PopTitleBox>
                <Slider {...swiperParams3} ref={setSwiper}>
                    {Slide.length !== 0 && Slide.map(({ id, img, informaion, title }) => (
                        <SwiperSlide key={id}>
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
                        </SwiperSlide>
                    ))}
                </Slider>
            </GameSlideBox>
            <AdSlideBox>
                <Slider {...AdSwiper} ref={setSwiper}>
                    {AdSlide.length !== 0 && AdSlide.map(({ id, img, informaion, title }) => (
                        <SwiperSlide key={id}>
                            <ImgAdBox src={img} />
                            <AdAllBox>
                                <AdTitleBox>{title}</AdTitleBox>
                                <AdInformaionBox>{informaion}</AdInformaionBox>
                            </AdAllBox>
                        </SwiperSlide>
                    ))}
                    <ButtonBox>
                        <PrevBtn ref={navPrevRef}><FiArrowLeft /></PrevBtn>
                        <NextBtn ref={navNextRef}><FiArrowRight /></NextBtn>
                    </ButtonBox>
                </Slider>
            </AdSlideBox>
            <GameSlideBox>
                <PopTitleBox>인기 게임 차트</PopTitleBox>
                <Slider {...swiperParams4} ref={setSwiper}>
                    {Slide.length !== 0 && Slide.map(({ id, img, informaion, title }) => (
                        <SwiperSlide key={id}>
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
                        </SwiperSlide>
                    ))}
                </Slider>
                <PopTitleBox>인기 게임 차트</PopTitleBox>
                <Slider {...swiperParams5} ref={setSwiper}>
                    {Slide.length !== 0 && Slide.map(({ id, img, informaion, title }) => (
                        <SwiperSlide key={id}>
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
                        </SwiperSlide>
                    ))}
                </Slider>
                <PopTitleBox>인기 게임 차트</PopTitleBox>
                <Slider {...swiperParams6} ref={setSwiper}>
                    {Slide.length !== 0 && Slide.map(({ id, img, informaion, title }) => (
                        <SwiperSlide key={id}>
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
                        </SwiperSlide>
                    ))}
                </Slider>
            </GameSlideBox>
            <AdSlideBox>
                <Slider {...AdSwiper2} ref={setSwiper}>
                    {AdSlide2.length !== 0 && AdSlide.map(({ id, img, informaion, title }) => (
                        <SwiperSlide key={id}>
                            <ImgAdBox src={img} />
                            <AdAllBox>
                                <AdTitleBox>{title}</AdTitleBox>
                                <AdInformaionBox>{informaion}</AdInformaionBox>
                            </AdAllBox>
                        </SwiperSlide>
                    ))}
                    <ButtonBox>
                        <PrevBtn ref={navPrevRef2}><FiArrowLeft /></PrevBtn>
                        <NextBtn ref={navNextRef2}><FiArrowRight /></NextBtn>
                    </ButtonBox>
                </Slider>
            </AdSlideBox>
        </SwiperBox>
    );
}

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
    top: 0%;
    height: 75%;
    left: 0%;
    border-radius: 8px;
    width: 100%;
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

.swiper-pagination
{
    
}

.swiper-slide
{

}

.swiper-wrapper
{
    
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

.swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets
{
    bottom: 18px;
    left: 0;
    width: 100%;
}

.swiper-pagination-bullet
{
    cursor: pointer;
    margin: 0px 8px 0px 0px;
}
`

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
    max-width: 1280px;
    margin: 0 auto;
    padding: 0px 20px 0px 20px;
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
    border: solid 0.5px black;
    height: 285px;
`

export default CenterPage;
