import { styled, keyframes } from "styled-components";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Slide } from "../Game";

const GameInformationView = () =>{
    const [ GameInformaion, setGameInformation ] = useState(Slide) 
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setGameInformation(Slide.filter((Game) => Game.id == id))
    }, [id]);

    return(
        <GameViewBackground>
            <BackgroundEffect />
            <GameViewBackgroundImg src={GameInformaion[0].BackgroundImg} />

            <GameViewAllBox>
                <GameTitleAllBox>
                    <GameTitleTextBox>
                        <GameText>{GameInformaion[0].game}</GameText>
                        <GameTitleText>{GameInformaion[0].title}</GameTitleText>
                    </GameTitleTextBox>
                    <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
                </GameTitleAllBox>
            </GameViewAllBox>
        </GameViewBackground>
    );
}

export default GameInformationView;

const GameTitleAllBox = styled.div
`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const BackButton = styled.div
`
    cursor: pointer;
    display: flex;
    width: 100px;
    height: 50px;
    border-radius: 8px;
    background: white;
    align-items: center;
    justify-content: center;
    font-weight: bold;
`

const GameTitleTextBox = styled.div
`
    display: flex;
    flex-direction: column;
`

const GameTitleText = styled.span
`
    color: white;
    font-size: 30px;
    font-weight: bold;
`

const GameText = styled(GameTitleText)
`
    color: white;
    font-size: 15px;
    font-weight: bold;
    margin: 0px 0px 10px 0px;
`

const GameViewAllBox = styled.div
`
    max-width: 1280px;
    margin: -17vw auto 0 auto;
    position: relative;
    z-index: 2;
    padding: 20px;
`

const GameViewBackground = styled.div
`
    background: rgba(25,25,25,1);
    height: 100vh;
`

const GameViewBackgroundImg = styled.img
`
    width: 100vw;
    height: 40vw;
`

const BackgroundEffect = styled.div
`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40vw;
    background-image: linear-gradient(to top, rgba(25,25,25,1), transparent);
}
`