import axios from "axios";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useParams } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

const ReplyReportModal = ({ setReportMode, ReportMode, replyer, regdate, id }) => {
    const ip = localStorage.getItem("ip");
    const [RadioAbuseBtnOnOff, setRadioAbuseBtnOnOff] = useState(true);
    const [Radio19BtnOnOff, setRadio19BtnOnOff] = useState(false);
    const [RadioIncoporateBtnOnOff, setRadioIncoporateBtnOnOff] = useState(false);
    const [RadioCommentBtnOnOff, setRadioCommentBtnOnOff] = useState(false);
    const [ismodalchange, setIsmodalchange] = useState(true);
    const [CompleteModal, setCompleteModal] = useState("");
    const [checkList, setCheckList] = useState("욕설/비방 신고");

    const RadioAbusehandle = (e) => {

        const isValue = e.target.value;

        setCheckList(isValue);

        setRadioAbuseBtnOnOff(true);
        setRadio19BtnOnOff(false);
        setRadioIncoporateBtnOnOff(false);
        setRadioCommentBtnOnOff(false);

    }

    const Radio19handle = (e) => {

        const isValue = e.target.value;

        setCheckList(isValue);

        setRadioAbuseBtnOnOff(false);
        setRadio19BtnOnOff(true);
        setRadioIncoporateBtnOnOff(false);
        setRadioCommentBtnOnOff(false);

    }

    const RadioIncoporatehandle = (e) => {

        const isValue = e.target.value;

        setCheckList(isValue);

        setRadioAbuseBtnOnOff(false);
        setRadio19BtnOnOff(false);
        setRadioIncoporateBtnOnOff(true);
        setRadioCommentBtnOnOff(false);

    }

    const Completehandle = () => {
        setReportMode(!ReportMode);
        setIsmodalchange(true);
        setCheckList("욕설/비방 신고");
        setRadioAbuseBtnOnOff(true);
        setRadio19BtnOnOff(false);
        setRadioIncoporateBtnOnOff(false);
    }

    const Sumbit = (e) => {

        e.preventDefault();

        if (checkList === "욕설/비방 신고") {
            axios.patch(`${ip}/Board/report/reply/abuse?replyer=${replyer}&regdate=${regdate}`, {

            }, {

            })
                .then((res) => {
                    return res.data;
                })
                .then((data) => {
                    setIsmodalchange(false);
                    setCompleteModal(
                        <CompleteModalBox>
                            <CompleteTextBox>
                                <CompleteText>신고가 완료 되었습니다!</CompleteText>
                            </CompleteTextBox>
                            <CompleteBtnBox>
                                <CompleteBtn onClick={() => Completehandle()}>
                                    <CompleteBtnText>확인</CompleteBtnText>
                                </CompleteBtn>
                            </CompleteBtnBox>
                        </CompleteModalBox>
                    );
                })
        } else if (checkList === "음란물 신고") {
            axios.patch(`${ip}/Board/report/reply/19?replyer=${replyer}&regdate=${regdate}`, {

            }, {

            })
                .then((res) => {
                    return res.data;
                })
                .then((data) => {
                    setIsmodalchange(false);
                    setCompleteModal(
                        <CompleteModalBox>
                            <CompleteTextBox>
                                <CompleteText>신고가 완료 되었습니다!</CompleteText>
                            </CompleteTextBox>
                            <CompleteBtnBox>
                                <CompleteBtn onClick={() => Completehandle()}>
                                    <CompleteBtnText>확인</CompleteBtnText>
                                </CompleteBtn>
                            </CompleteBtnBox>
                        </CompleteModalBox>
                    );
                })
        } else if (checkList === "게시판 부적합 신고") {

            axios.patch(`${ip}/Board/report/reply/incoporate?replyer=${replyer}&regdate=${regdate}`, {

            }, {

            })
                .then((res) => {
                    return res.data;
                })
                .then((data) => {
                    setIsmodalchange(false);
                    setCompleteModal(
                        <CompleteModalBox>
                            <CompleteTextBox>
                                <CompleteText>신고가 완료 되었습니다!</CompleteText>
                            </CompleteTextBox>
                            <CompleteBtnBox>
                                <CompleteBtn onClick={() => Completehandle()}>
                                    <CompleteBtnText>확인</CompleteBtnText>
                                </CompleteBtn>
                            </CompleteBtnBox>
                        </CompleteModalBox>
                    );
                })
        }
    }

    console.log(checkList);

    return (
        <ReportModalBackground OnOff={ReportMode}>
            <ReportModalAllBox ModalChange={ismodalchange}>
                <SubmitBox onSubmit={Sumbit}>
                    <ModalInformation>
                        <ModalInformationText>
                            신고하기
                    </ModalInformationText>
                        <ModalDeleteBtn
                            onClick={() => [setReportMode(!ReportMode),
                            setCheckList("욕설/비방 신고"),
                            setRadioAbuseBtnOnOff(true),
                            setRadio19BtnOnOff(false),
                            setRadioIncoporateBtnOnOff(false)
                            ]}>
                            x
                        </ModalDeleteBtn>
                    </ModalInformation>

                    <ReportRadioBox>
                        <RadioBtnBox>
                            <RadioBtn
                                id={replyer + regdate}
                                type="radio"
                                value="욕설/비방 신고"
                                onChange={(e) => RadioAbusehandle(e)}
                                checked={RadioAbuseBtnOnOff}
                            />
                            <RadioBtnlabel check={RadioAbuseBtnOnOff} htmlFor={replyer + regdate}>욕설/비방 신고</RadioBtnlabel>
                        </RadioBtnBox>

                        <RadioBtnBox>
                            <RadioBtn
                                id={replyer + regdate + 1}
                                type="radio"
                                value="음란물 신고"
                                onChange={(e) => Radio19handle(e)}
                                checked={Radio19BtnOnOff}
                            />
                            <Radio19Btnlabel check={Radio19BtnOnOff} htmlFor={replyer + regdate + 1}>음란물 신고</Radio19Btnlabel>
                        </RadioBtnBox>

                        <RadioBtnBox>
                            <RadioBtn
                                id={replyer + regdate + 2}
                                type="radio"
                                value="게시판 부적합 신고"
                                onChange={(e) => RadioIncoporatehandle(e)}
                                checked={RadioIncoporateBtnOnOff}
                            />
                            <RadioBtnIncoporatehandlelabel check={RadioIncoporateBtnOnOff} htmlFor={replyer + regdate + 2}>게시판 부적합 신고</RadioBtnIncoporatehandlelabel>
                        </RadioBtnBox>

                    </ReportRadioBox>

                    <ReportFormBtnBox type="button">
                        <ReportFormBtn>
                            <ReportFormText>신고하기</ReportFormText>
                        </ReportFormBtn>
                    </ReportFormBtnBox>
                </SubmitBox>

            </ReportModalAllBox>
            <>
                {ismodalchange ? "" : CompleteModal}
            </>
        </ReportModalBackground>
    );
};

export default ReplyReportModal;

const CompleteBtnText = styled.span
    `
    font-weight: bold;
    font-size: 16px;
    color: white;
`

const CompleteBtn = styled.div
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

const CompleteBtnBox = styled.div
    `
    display: flex;
    justify-content: center;
`

const CompleteModalBox = styled.div
    `
    display: block;
    width: 560px;
    height: 240px;
    background: ${props => props.theme.backgroundColor};
    border-radius: 10px;
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
`

const ReportFormBtnBox = styled.div
    `
    display: flex;
    justify-content: center;
`

const ReportFormBtn = styled.button
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

const ReportFormText = styled.span
    `
    font-weight: bold;
    font-size: 16px;
    color: white;
`

const SubmitBox = styled.form
    `

`

const RadioBtn = styled.input
    `
`

const RadioBtnBox = styled.div
    `
    margin: 0px 0px 12px 0px;
`

const RadioBtnlabel = styled.label
    `
    font-size: 22px;
    margin: 0px 0px 0px 20px;
    cursor: pointer;

    &::before
    {
        content: "";
        position: absolute;
        width: 30px;
        height: 30px;
        background: ${props => props.check ? "#007aff" : "#fff"};
        border-radius: 50%;
        border: solid 1px #d9d9d9;
        cursor: pointer;
        box-sizing: border-box;
        margin: -2px 0px 0px -45px;
    }

    &::after
    {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        background: #fff;
        border-radius: 50%;
        margin: 8px 0px 0px -169px;
    }
`

const Radio19Btnlabel = styled(RadioBtnlabel)
    `
    &::after
    {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        background: #fff;
        border-radius: 50%;
        margin: 8px 0px 0px -141px;
    }
`

const RadioBtnIncoporatehandlelabel = styled(RadioBtnlabel)
    `
    &::after
    {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        background: #fff;
        border-radius: 50%;
        margin: 8px 0px 0px -206px;
    }
`

const ReportRadioBox = styled.div
    `
    display: flex;
    flex-direction: column;
    padding: 13px 30px 21px 31px;
`

const ModalInformation = styled.div
    `
    display: flex;
    justify-content: space-between;
    padding: 23px;
    font-size: 24px;
`

const ModalInformationText = styled.span
    `

`

const ModalDeleteBtn = styled.div
    `
    font-size: 32px;
    margin: -7px 4px 0px 0px;
    cursor: pointer;
`

const ReportModalAllBox = styled.div
    `
    display: ${props => props.ModalChange ? "block" : "none"};
    width: 560px;
    height: 300px;
    background: ${props => props.theme.backgroundColor};
    border-radius: 10px;
`

const ReportModalBackground = styled.div
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