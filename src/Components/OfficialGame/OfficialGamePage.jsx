import { useState, useEffect, useRef, useCallback, FC } from 'react';
import styled from "styled-components";
import test1 from "../../img/MainSlide/test1.png"
import test2 from "../../img/MainSlide/test2.png"
import test3 from "../../img/MainSlide/test3.png"

const OfficialGamePage = () =>
{

    const [hoverImg1,setHoverImg1] = useState(false);
    const [hoverImg2for3,sethoverImg2for3] = useState(false);
    const [hoverImg2for1,setHoverImg2for1] = useState(false);
    const [hoverImg3,setHoverImg3] = useState(false);

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

    return(
        <OfficialGameAllBox>
            <OfficialGameBox>
                <OfficialGame1>
                    <OfficialGame1imgBox>
                        <OfficialGame1img 
                            src={test2} 
                            left={hoverImg1} 
                            onMouseOver={() => hoverImg1Inhandler()}
                            onMouseOut={() => hoverImg1Outhandler()} 
                        />
                    </OfficialGame1imgBox>
                </OfficialGame1>

                <OfficialGame2>
                    <OfficialGame2imgBox>
                        <OfficialGame2img src={test1} left={hoverImg2for3} left2={hoverImg2for1} />
                    </OfficialGame2imgBox>
                </OfficialGame2>

                <OfficialGame3>
                    <OfficialGame3imgBox>
                        <OfficialGame3img 
                            src={test3} 
                            left={hoverImg3}
                            onMouseOver={() => hoverImg3Inhandler()}
                            onMouseOut={() => hoverImg3Outhandler()}
                        />
                    </OfficialGame3imgBox>
                </OfficialGame3>
            </OfficialGameBox>
        </OfficialGameAllBox>
    );
}

export default OfficialGamePage;

const OfficialGameAllBox = styled.div
`
    
`

const OfficialGameBox = styled.div
`
    display: flex;
` 

const OfficialGame1 = styled.div
`
    width: 100%;
    height: 100vh;
    overflow: hidden;
`

const OfficialGame2 = styled.div
`
    width: 100%;
    height: 100vh;
    overflow: hidden;
`

const OfficialGame3 = styled.div
`
    width: 100%;
    height: 100vh;
    overflow: hidden;
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

const OfficialGame1img = styled.img
`
    width: 100%;
    height: 100vh;
    transform: scale(1);
    transition: transform 0.5s;
    &:hover
    {
        transform: scale(1.2);
        transition: transform 0.5s;
    }
`

const OfficialGame2img = styled.img
`
    width: 100%;
    height: 100vh;
    transform: scale(1);
    transition: transform 0.5s;
    &:hover
    {
        transform: scale(1.2);
        transition: transform 0.5s;
    }
`

const OfficialGame3img = styled.img
`
    width: 100%;
    height: 100vh;
    transform: scale(1);
    transition: transform 0.5s;
    &:hover
    {
        transform: scale(1.2);
        transition: transform 0.5s;
    }
`


