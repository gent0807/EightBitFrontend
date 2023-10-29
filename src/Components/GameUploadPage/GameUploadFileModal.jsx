import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styled, { ThemeProvider } from "styled-components";

const GameUploadFileModal = ({
    setWriteFileModalOnOff,
    WriteFileModalOnOff,

    PcExtensionCheck,
    PcExtensionList,
    MobileExtensionCheck,
    MobileExtensionList,
    MainImgExtensionCheck,
    MainImgExtensionList,
    BackgroundImgExtensionCheck,
    BackgroundImgExtensionList,

    pcfileSize,
    mobilefileSize,
    mainimgSize,
    backgroundimgSize,

    MaxSize,

    pcfiles,
    mobilefiles,
    mainimgfiles,
    backgroundimgfiles,

}) => {

    return (
        <FileCheckModalBackground OnOff={WriteFileModalOnOff}>
            <FileCheckModalAllBox>
                <FileCheckBox>
                    <FileCheckText>
                        {PcExtensionList.indexOf(PcExtensionCheck) === -1 ||
                            PcExtensionCheck === "" ||
                            MobileExtensionList.indexOf(MobileExtensionCheck) === -1 ||
                            MobileExtensionCheck === "" ||
                            MainImgExtensionList.indexOf(MainImgExtensionCheck) === -1 ||
                            MainImgExtensionCheck === "" ||
                            BackgroundImgExtensionList.indexOf(BackgroundImgExtensionCheck) === -1 ||
                            BackgroundImgExtensionCheck === "" ?
                            "파일 업로드가 불가한 파일입니다!" :
                            pcfileSize > MaxSize ||
                                mobilefileSize > MaxSize ||
                                mainimgSize > MaxSize ||
                                backgroundimgSize > MaxSize ?
                                "파일은 2GB 이내로 업로드 가능합니다!" :
                                pcfiles.length >= 1 ||
                                    mobilefiles.length >= 1 ||
                                    mainimgfiles.length >= 1 ||
                                    backgroundimgfiles >= 1 ?
                                    "하나의 파일만 업로드 하세요!" :
                                    ""
                        }
                    </FileCheckText>
                </FileCheckBox>

                <FileChechBtnBox>
                    <FileCheckBtn onClick={() => setWriteFileModalOnOff(!WriteFileModalOnOff)}>
                        <FileBtnText>확인</FileBtnText>
                    </FileCheckBtn>
                </FileChechBtnBox>

            </FileCheckModalAllBox>
        </FileCheckModalBackground>
    );
}

export default GameUploadFileModal;

const FileChechBtnBox = styled.div
    `
    display: flex;
    justify-content: center;
`

const FileCheckText = styled.span
    `
    font-weight: bold;
    font-size: 37px;
`

const FileCheckBox = styled.div
    `
    display: flex;
    padding: 57px;
`

const FileBtnText = styled.span
    `
    font-weight: bold;
    color: white;
`

const FileCheckBtn = styled.div
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

const FileCheckModalAllBox = styled.div
    `
    display: block;
    min-width: 560px;
    height: 240px;
    background: white;
    border-radius: 10px;
`

const FileCheckModalBackground = styled.div
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
