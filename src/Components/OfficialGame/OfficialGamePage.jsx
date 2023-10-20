import { useState, useEffect, useRef, useCallback, FC } from 'react';
import styled from "styled-components";
import test1 from "../../img/MainSlide/test1.png"
import test2 from "../../img/MainSlide/test2.png"
import test3 from "../../img/MainSlide/test3.png"

const OfficialGamePage = () =>
{
    return(
        <OfficialGameAllBox>
            <OfficialGameBox>
                <OfficialGame1>
                    <OfficialGame1imgBox>
                        <OfficialGame1img src={test2} />
                    </OfficialGame1imgBox>
                </OfficialGame1>

                <OfficialGame2>
                    <OfficialGame2imgBox>
                        <OfficialGame2img src={test1} />
                    </OfficialGame2imgBox>
                </OfficialGame2>

                <OfficialGame3>
                    <OfficialGame3imgBox>
                        <OfficialGame3img src={test3} />
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
    width: 100%;
    display: flex;
`

const OfficialGame1 = styled.div
`
    width: 100%;
    height: 100vh;
    background: red;
    overflow: hidden;
    &:hover
    {
        width: 120%;
        transition: width 0.5s;
    }
`

const OfficialGame1imgBox = styled.div
`
    width: 100%;
`

const OfficialGame1img = styled.img
`
    width: 100%;
`

const OfficialGame2 = styled.div
`
    width: 100%;
    height: 100vh;
    background: yellow;
    overflow: hidden;
    &:hover
    {
        width: 120%;
        transition: width 0.5s;
    }
`

const OfficialGame2imgBox = styled.div
`
    width: 100%;
`

const OfficialGame2img = styled.img
`
    width: 100%;
`

const OfficialGame3 = styled.div
`
    width: 100%;
    height: 100vh;
    background: blue;
    overflow: hidden;
    &:hover
    {
        width: 120%;
        transition: width 0.5s;
    }
`

const OfficialGame3imgBox = styled.div
`
    width: 100%;
`

const OfficialGame3img = styled.img
`
    width: 100%;
`