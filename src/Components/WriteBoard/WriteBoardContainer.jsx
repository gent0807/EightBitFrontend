import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import WriteBoard from "./WriteBoard";
import { styled } from 'styled-components';

let Containerbox = styled.div`
    margin: 0 auto;
    max-width: 1280px;
    padding: 150px 0px 54px 0px;
    @media (min-width:250px) and (max-width:666px)
    {
        padding: 317px 0px 54px 0px;
    }
    @media (min-width:667px) and (max-width:1342px)
    {
        padding: 214px 0px 54px 0px;
    }
`

const WriteBoardContainer = () =>
{
    return(
        <Containerbox>
            <WriteBoard/>
        </Containerbox>
    );
}

export default WriteBoardContainer;
