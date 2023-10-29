import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styled, { ThemeProvider } from "styled-components";

const GameUploadModal = ({
    setWriteBoardModalOnOff,
    WriteBoardModalOnOff,
    ExplanationValue,
    TitleChangeValue,
    URLChangeValue,
    pcfiles,
    mobilefiles,
    mainimgfiles,
    backgroundimgfiles
}) => {

    return (
        <DeleteModalBackground OnOff={WriteBoardModalOnOff}>
            <ReportModalAllBox>
                <ModalDeleteBtn
                    onClick={() => setWriteBoardModalOnOff(!WriteBoardModalOnOff)}>
                    x
                </ModalDeleteBtn>

                <DeleteTextBox>
                    <DeleteText>
                        {TitleChangeValue.length < 5 && ExplanationValue.length > 20 ?
                            "제목을 5자 이상 입력해주세요!" :
                            TitleChangeValue.length > 5 && ExplanationValue.length < 20 ?
                                "내용을 20자 이상 입력해주세요!" :
                                TitleChangeValue.length < 5 && ExplanationValue.length < 20 ?
                                    "제목 5자 이상, 내용 20자 이상 입력해주세요!" :
                                    pcfiles.length === 0 &&
                                     mobilefiles.length === 0 &&
                                      mainimgfiles.length === 0 &&
                                       backgroundimgfiles.length === 0 &&
                                        URLChangeValue === "" ?
                                    "파일을 업로드 해주세요!" :
                                    pcfiles.length > 0 &&
                                        mainimgfiles.length === 0 &&
                                        backgroundimgfiles.length === 0 &&
                                        mobilefiles.length === 0 &&
                                        URLChangeValue === "" ?
                                        "메인이미지, 커버이미지, 모바일 파일을 업로드 해주세요!" :
                                        pcfiles.length === 0 &&
                                            mainimgfiles.length > 0 &&
                                            backgroundimgfiles.length === 0 &&
                                            mobilefiles.length === 0 &&
                                            URLChangeValue === "" ?
                                            "커버이미지, PC 파일,모바일 파일을 업로드 해주세요!" :
                                            pcfiles.length === 0 &&
                                                mainimgfiles.length === 0 &&
                                                backgroundimgfiles.length > 0 &&
                                                mobilefiles.length === 0 &&
                                                URLChangeValue === "" ?
                                                "메인이미지, PC 파일, 모바일 파일을 업로드 해주세요!" :
                                                pcfiles.length > 0 &&
                                                    mainimgfiles.length > 0 &&
                                                    backgroundimgfiles.length > 0 &&
                                                    mobilefiles.length === 0 &&
                                                    URLChangeValue === "" ?
                                                    "모바일 파일, URL중 하나를 업로드 해주세요!" :
                                                    ""
                        }
                    </DeleteText>
                </DeleteTextBox>

                <DeleleFormBtnBox

                >
                    <DeleleFormBtn
                        onClick={() => setWriteBoardModalOnOff(!WriteBoardModalOnOff)}
                    >
                        <DeleleFormText>확인</DeleleFormText>
                    </DeleleFormBtn>
                </DeleleFormBtnBox>
            </ReportModalAllBox>
        </DeleteModalBackground>
    );
};

export default GameUploadModal;

const ModalDeleteBtn = styled.div
    `
    font-size: 32px;
    cursor: pointer;
    display: flex;
    justify-content: end;
    padding: 9px 15px 0px 0px;
`

const DeleleFormText = styled.span
    `
    font-weight: bold;
    font-size: 16px;
    color: white;
`

const DeleleFormBtn = styled.button
    `
    display: flex;
    align-items: center;
    justify-content: center;
    background: #007aff;
    width: 100px;
    height: 50px;
    border-radius: 10px;
    cursor: pointer;
    border: none;
`

const DeleleFormBtnBox = styled.div
    `
    display: flex;
    justify-content: center;
`

const CompleteTextBox = styled.div
    `
    display: flex;
    justify-content: center;
    padding: 57px;
`

const CompleteText = styled.span
    `
    font-size: 37px;
    font-weight: bold;
    text-align: center;
`

const DeleteTextBox = styled(CompleteTextBox)
    `
    padding: 30px 57px 49px 57px;
`

const DeleteText = styled(CompleteText)
    `

`

const ReportModalAllBox = styled.div
    `
    display: block;
    min-width: 579px;
    min-height: 260px;
    background: white;
    border-radius: 10px;
`

const DeleteModalBackground = styled.div
    `
    display: ${props => props.OnOff ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(25,25,25,0.3);
    z-index: 99999;
`