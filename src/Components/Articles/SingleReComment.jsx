import axios from "axios";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { BsHandThumbsUp } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import dayjs from "dayjs";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import { ImageDrop } from "quill-image-drop-module";
import Siren from "../../img/Siren/Siren.png";
import { BsPencilSquare } from "react-icons/bs";
import { BiLogoDevTo } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";


Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

const SingleReComment = ({ ReComment }) => {
    const [likecount, setLikecount] = useState(0);
    const [profileImagePath, setProfileImagePath] = useState("");
    const [writerRole, setWriterRole] = useState("");
    const [reportMode, setReportMode] = useState(false);
    const [reCommentChangeValue, setReCommentChangeValue] = useState("");
    const [timecount, setTimecount] = useState("1시간");
    const [reCommentStatusDivHide, setReCommentStatusDivHide] = useState(true);
    const [updateMode, setUpdateMode] = useState(false);
    const [updateReCommentText, setUpdateReCommentText] = useState("");

    const navigate = useNavigate();

    const ip = localStorage.getItem("ip");
    const user = useSelector(state => state.user);
    const loginMaintain = localStorage.getItem("loginMaintain");
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    let likeMode = useRef(false);

    const [onReplyBtn, setOnReplyBtn] = useState(false);

    const quillRef = useRef(null);


    const toolbarOptions = [
        ["link", "image", "video"],
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
    ];

    const modules = useMemo(
        () => ({
            toolbar: {
                container: toolbarOptions,
            },
            imageResize: {
                parchment: Quill.import("parchment"),
                modules: ["Resize", "DisplaySize", "Toolbar"],
            },
            imageDrop: true,
        }), []);

    /* useEffect(() => {
       const quill = quillRef.current;
       // console.log(quill);
 
       const handleImage = () => {
           // 이미지 핸들 로직
           const input = document.createElement("input");
           input.setAttribute("type", "file");
           input.setAttribute("accept", "image/*");
           input.click();
 
           input.onchange = async () => {
               const file = input.files[0];
 
               // 현재 커서 위치 저장
               // const range = getEditor().getSelection(true);
               const range = quill.selection
 
               // 서버에 올려질때까지 표시할 로딩 placeholder 삽입
               quill.getEditor().insertEmbed(range.index, "image", `/img/loading.gif`);
               
               
               try {
                   // S3에 업로드 한뒤 이미지 태그에 삽입할 url을 반환받도록 구현
                   const formData = new FormData();
                   formData.append('file' , file)
                   const result = await actionUploadEditorImage(formData); 
                   const url = result.data
                   console.log(url);
                   // 정상적으로 업로드 됐다면 로딩 placeholder 삭제
                   quill.getEditor().deleteText(range.index, 1);
                   // 받아온 url을 이미지 태그에 삽입
                   quill.getEditor().insertEmbed(range.index, "image", url);
                   
                   // 사용자 편의를 위해 커서 이미지 오른쪽으로 이동
                   quill.getEditor().setSelection(range.index + 1);
               } catch (e) {
                   quill.getEditor().deleteText(range.index, 1);
               }
           };
       }
       
       if (quillRef.current) {
           // const { getEditor } = quillRef.current;
           const toolbar = quill.getEditor().getModule("toolbar");
           toolbar.addHandler("image", handleImage);
       }
   }, []); */

    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "align",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "background",
        "color",
        "link",
        "image",
        "video",
        "width",
    ];

    useEffect(() => {
        const getUsreProfileImagePath = (writer) => {
            axios.get(`${ip}/Users/profileImgPath?nickname=${writer}`, {

            },
                {

                })
                .then((res) => {
                    return res.data;
                })
                .then(data => {
                    console.log(data);
                    setProfileImagePath(data);
                })

        }

        const getUserRole = (writer) => {
            axios.get(`${ip}/Users/role?nickname=${writer}`, {

            },
                {

                })
                .then((res) => {
                    return res.data;
                })
                .then(data => {
                    console.log(data);
                    setWriterRole(data);
                })

        }

        getUsreProfileImagePath(ReComment.writer);
        getUserRole(ReComment.writer);
        setReCommentChangeValue("@" + ReComment.writer + "\n");
        setUpdateReCommentText(ReComment.content);
    }, []);

    const registerReComment = async (e) => {
        e.preventDefault();

        if(reCommentChangeValue.length>11){

        }
        else if(reCommentChangeValue.length <= 11){
            alert("댓글을 입력해주세요.");
            return;
        }
    };

    const updateReComment = async (e) => {
        e.preventDefault();
        if(updateReCommentText.length > 11){
            setUpdateMode(false);
        }

        else if(updateReCommentText.length <= 11){
            alert("댓글을 입력해주세요.");
            return;
        }

    };


    const getNewLikeCount = async () => {
        axios.get(`${ip}/Board/article/like?writer=${ReComment.writer}&regdate=${ReComment.regdate}`, {

        }, {

        })
            .then(res => {
                return res.data;
            })
            .then(data => {
                setLikecount(data.likecount);
            })
    }

    const countUpLike = async (e) => {
        if (loginMaintain != "true") {
            if (user.login_state != "allok") {
                alert("로그인이 필요합니다.");
                navigate("/Login");
                return;
            }
        }


        await axios.patch(`${ip}/Board/article/like/up?writer=${ReComment.writer}&regdate=${ReComment.regdate}`, {

        },
            {
                headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` }
            })
            .then(res => {
                return res.data;
            })
            .then(data => {
                likeMode.current = true;
                getNewLikeCount();
            })
    }

    const countDownLike = async () => {
        if (likecount > 0) {
            await axios.patch(`${ip}/Board/article/like/down?writer=${ReComment.writer}&regdate=${ReComment.regdate}`, {
            },
                {
                    headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` }
                })
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    likeMode.current = false;
                    getNewLikeCount();
                })

        }
        else return;
    }

    const report1 = async () => {
        setReportMode(false);
    }

    const report2 = async () => {
        setReportMode(false);
    }
    const report3 = async () => {
        setReportMode(false);
    }




    return (
        <UserReCommentBox key={ReComment.id}>
            <div style={{ display: updateMode === true ? "none" : "block" }}>
                <ReCommentUserProfileBox>
                    <ReCommentUserBox>
                        <ReCommentUserProfile src={localStorage.getItem("profileImageDir") + profileImagePath} />
                        <ReCommentInformationAllBox>
                            <div style={{ display: "flex" }}>
                                <UserNicknameText>{ReComment.writer}</UserNicknameText>
                                <BiLogoDevTo size={21} style={{ margin: "0px 0px 0px 2px", display: writerRole === "DEVELOPER" ? "block" : "none" }}></BiLogoDevTo>
                                {ReComment.regdate == ReComment.updatedate ? "" :
                                    <div style={{ display: "flex", margin: "5px 0px 0px 2px" }}>
                                        <AiFillCheckCircle style={{ margin: "1px 3px 0px 3px" }} />
                                        수정됨
                                    </div>}

                            </div>
                            <div style={{ display: "flex" }}>
                                <ReCommentreplyIcon>약 {timecount} 전</ReCommentreplyIcon>
                            </div>

                        </ReCommentInformationAllBox>
                    </ReCommentUserBox>
                    <div style={{ margin: "15px 0px 0px 0px" }}>
                        <RedateBox>
                            신고
                            <SirenImg src={Siren} onClick={() => { setReportMode(!reportMode) }} />
                        </RedateBox>
                        <ReportBox ReportMode={reportMode}>
                            <div style={{ margin: "10px 10px 10px 10px", cursor: "pointer" }} onClick={report1}>
                                욕설/비방 신고
                            </div>
                            <div style={{ margin: "10px 10px 10px 10px", cursor: "pointer" }} onClick={report2}>
                                음란물 신고
                            </div>
                            <div style={{ margin: "10px 10px 10px 10px", cursor: "pointer" }} onClick={report3}>
                                게시판 부적합 신고
                            </div>
                        </ReportBox>
                        <Regdate>{dayjs(ReComment.regdate).format("YYYY-MM-DD HH:mm")}</Regdate>
                    </div>
                </ReCommentUserProfileBox>
                <ReCommentInformationBox>
                    <ReCommentText>{ReComment.content}</ReCommentText>
                </ReCommentInformationBox>
                <ReCommentreplyBox>
                    <ReCommentreplyAllBox>
                        <ReCommentreplyBtn
                            LoginMaintain={loginMaintain}
                            UserInfo={userInfo} User={userInfo == null ?
                                null : userInfo.loginState}
                            UserCheck={user.login_state}
                            UserNicknameCheck={user.nickname}
                            UserNickname={userInfo == null ?
                                null : userInfo.nickName}
                            Writer={ReComment.writer}
                            onClick={() => setOnReplyBtn(!onReplyBtn)}>
                            {onReplyBtn == false ? "댓글 쓰기" : "댓글 취소"}
                        </ReCommentreplyBtn>
                    </ReCommentreplyAllBox>
                    <div>
                        <ReCommentreplyLikeAllBox>
                            <ReCommentreplyLikeBtn
                                onClick={() => { likeMode.current === false ? countUpLike() : countDownLike() }}>
                                {likeMode.current === false ? <BsHandThumbsUp /> : <BsHandThumbsUpFill />}
                            </ReCommentreplyLikeBtn>
                            <ReCommentreplyLikeCount>{likecount}</ReCommentreplyLikeCount>
                            <OptionBox
                                LoginMaintain={loginMaintain}
                                User={user.login_state}
                                UserInfo={userInfo}
                                UserInfoState={userInfo == null ?
                                    null : userInfo.loginState}
                                UserInfoNickname={userInfo == null ?
                                    (user.login_state === "allok" ?
                                        user.nickname : null) : userInfo.nickName}
                                Writer={ReComment.writer}
                                onClick={() => { setReCommentStatusDivHide(!reCommentStatusDivHide) }}><SlOptions />
                            </OptionBox>
                        </ReCommentreplyLikeAllBox>
                        <SettingReplyStatusDiv ReCommentStatusDivHide={reCommentStatusDivHide}>
                            <SettingReplyStatusBox>
                                <UpdateReply onClick={() => {
                                    setReCommentStatusDivHide(true);
                                    setUpdateMode(true);
                                }}>
                                    <span>
                                        <BsPencilSquare size={20} style={{ margin: "0px 10px -5px 0px" }} />
                                        수정하기
                                    </span>
                                </UpdateReply>
                                <DeleteReply>
                                    <span>
                                        <RiDeleteBin5Line size={20} style={{ margin: "0px 10px -5px 0px" }} />
                                        삭제하기
                                    </span>
                                </DeleteReply>
                            </SettingReplyStatusBox>
                        </SettingReplyStatusDiv>
                    </div>
                </ReCommentreplyBox>

                {onReplyBtn && (<ReCommentForm
                    LoginMaintain={loginMaintain}

                    UserInfo={userInfo} User={userInfo == null ?
                        null : userInfo.loginState}

                    UserCheck={user.login_state}

                    UserNicknameCheck={user.nickname}

                    UserNickname={userInfo == null ?
                        null : userInfo.nickName}

                    Writer={ReComment.writer}

                    onSubmit={registerReComment}>
                    <ReCommentArea>
                        <ReCommentProfile>
                            <ReCommentUserProfile2 src={localStorage.getItem("profileImageDir") + profileImagePath} />
                        </ReCommentProfile>
                        <ReCommentInputBox>
                            <Editer2
                                placeholder="여러분의 참신한 생각이 궁금해요. 댓글을 입력해 주세요!"
                                value={reCommentChangeValue}
                                onChange={(content, delta, source, editor) => setReCommentChangeValue(editor.getHTML())}
                                modules={modules}
                                formats={formats}>
                            </Editer2>
                        </ReCommentInputBox>
                    </ReCommentArea>
                    <ReCommentBtnBox>
                        <CancelBtn type="button" onClick={() => { setOnReplyBtn(!onReplyBtn) }}>취소</CancelBtn>
                        <ReCommentBtn>댓글 쓰기</ReCommentBtn>
                    </ReCommentBtnBox>
                </ReCommentForm>
                )}
            </div>
            <div style={{ display: updateMode === false ? "none" : "block", margin: "40px 0px 0px 0px" }}>
                <ReCommentForm
                    LoginMaintain={loginMaintain}

                    UserInfo={userInfo} User={userInfo == null ?
                        null : userInfo.loginState}

                    UserCheck={user.login_state}

                    UserNicknameCheck={user.nickname}

                    UserNickname={userInfo == null ?
                        null : userInfo.nickName}

                    Writer={ReComment.writer}

                    onSubmit={updateReComment}>
                    <ReCommentArea>
                        <ReCommentProfile>
                            <ReCommentUserProfile2 src={localStorage.getItem("profileImageDir") + profileImagePath} />
                        </ReCommentProfile>
                        <ReCommentInputBox>
                            <Editer2
                                placeholder="여러분의 참신한 생각이 궁금해요. 댓글을 입력해 주세요!"
                                value={updateReCommentText}
                                onChange={(content, delta, source, editor) => setUpdateReCommentText(editor.getHTML())}
                                modules={modules}
                                formats={formats}>
                            </Editer2>
                        </ReCommentInputBox>
                    </ReCommentArea>
                    <ReCommentBtnBox>
                        <CancelBtn type="button" onClick={() => { setUpdateMode(false) }}>취소</CancelBtn>
                        <ReCommentBtn>댓글 수정</ReCommentBtn>
                    </ReCommentBtnBox>
                </ReCommentForm>
            </div>
            <ReCommentLine />
        </UserReCommentBox>
    );
}

export default SingleReComment;

const UserReCommentBox = styled.div
    `
`

const ReCommentUserProfileBox = styled.div
    `
    display: flex;
    justify-content: space-between;
    margin: 0px 0px 17px 0px;
`

const ReCommentUserBox = styled.div
    `
    display: flex;
`

const ReCommentUserProfile = styled.img
    `
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 30px;
    margin: 23px 0px 0px 0px;
    cursor: pointer;
`

const ReCommentInformationAllBox = styled.div
    `
    display: flex;
    flex-direction: column;
    padding: 21px 0px 0px 15px;
`

const UserNicknameText = styled.span
    `
    font-size: 21px;
    margin: 0px 0px 6px 2px;
    cursor: pointer;
`

const ReCommentreplyIcon = styled.div
    `
    margin: 4px 0px 0px 2px;
    font-size: 14px;   
`

const ReCommentreplyCount = styled.span
    `
    margin: 2.5px 0px 0px 0px;
    font-size: 17px;
    font-weight: bold;
`

const RedateBox = styled.div
    `
    display: flex;
    align-items: end;
    justify-content: end;
    cursor: pointer;
    margin: 0px -3px 10px 0px;
`

const ReportBox = styled.div
    `
    border: 1px solid ${props => props.theme.textColor};
    border-radius: 10px;
    position: absolute;
    z-index: 2;
    background: ${props => props.theme.backgroundColor};
    margin: 0px 0px 0px 10px;
    display: ${props => props.ReportMode == false ? "none" : "block"};
`

const Regdate = styled.span
    `
    font-size: 17px;
`

const ReCommentInformationBox = styled.div
    `
    padding: 0px 0px 0px 0px;
    font-size: 20px;
    font-weight: bold;
`

const ReCommentText = styled.span
    `

`

const ReCommentreplyBox = styled.div
    `
    display: flex;
    justify-content: space-between;
    margin: 22px 10px 10px 0px;
`

const SettingReplyStatusDiv = styled.div
    `
    display: ${props => props.ReCommentStatusDivHide === true ? "none" : "flex"};
    justify-content: end;
    position: absolute;
    z-index: 2;
    background: ${props => props.theme.backgroundColor};
`

const SettingReplyStatusBox = styled.div
    `
    border-radius: 6px;
    border: solid 1px ${props => props.theme.textColor};
`

const UpdateReply = styled.div
    `
    margin: 9px 20px 12px 18px;
    disply: flex;
    cursor: pointer;
    align-items: center;
    font-size: 18px;
`

const DeleteReply = styled.div
    `
    margin: 9px 20px 10px 18px;
    disply: flex;
    cursor: pointer;
    align-items: center;
    font-size: 18px;
`

const ReCommentreplyAllBox = styled.div
    `
    display: flex;
`

const ReCommentreplyBtn = styled.div
    `
    margin: 3px 0px 0px 1px;
    font-weight: bold;
    font-size: 14.5px;
    cursor: pointer;
    display: ${props => props.LoginMaintain == null ? "none" : props.LoginMaintain == "true" ? (props.UserInfo == null ? "none" : (props.User === "allok" ? "block" : "none")) :
        (props.UserCheck === "allok" ? "block" : "none")};
`

const ReCommentreplyLikeAllBox = styled.div
    `
    display: flex;
    margin: 0px 0px 0px 60px;
`

const ReCommentreplyLikeBtn = styled.div
    `
    cursor: pointer;
    font-size: 22px;
    margin: 0px 5px 0px 0px;
`


const ReCommentreplyLikeCount = styled.span
    `
    margin: 3px 0px 0px 0px;
    font-size: 17px;
    font-weight: bold;
`

const OptionBox = styled.div
    `
    margin: 3px 0px 0px 15px;
    display: ${props => props.LoginMaintain == null ? "none" : props.LoginMaintain == "true" ? (props.UserInfo == null ? "none" : (props.UserInfoState === "allok" ? (props.UserInfoNickname == props.Writer ? "block" : "none") : "none")) :
        (props.User === "allok" ? (props.UserInfoNickname == props.Writer ? "block" : "none") : "none")};
    cursor : pointer;
`

const ReCommentForm = styled.form
    `
display: ${props => props.LoginMaintain == null ? "none" : props.LoginMaintain == "true" ? (props.UserInfo == null ? "none" : (props.User === "allok" ? "block" : "none")) :
        (props.UserCheck === "allok" ? "block" : "none")};
padding: 0px 0px 0px 11px;
`

const ReCommentArea = styled.div
    `
    display: grid;
    grid-template-columns: 0fr 3fr ;
`

const ReCommentProfile = styled.div
    `
    margin: -20px 22px 0px 0px;
`

const ReCommentUserProfile2 = styled(ReCommentUserProfile)
    `
    width: 38px;
    height: 38px;
`

const ReCommentInputBox = styled.div
    `
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 2fr;
    border: solid 2px ${props => props.theme.textColor};
    border-radius: 10px;
    overflow: hidden;
`

const Editer2 = styled(ReactQuill)
    `
    display: flex;
    flex-direction: column;

    .ql-editor.ql-blank::before{
        color: ${props => props.theme.textColor};
    }

    .ql-editor
    {
        margin: 0px -2px -2px 0px;
        min-height: 80px;
        font-size: 20px;
    }

    .ql-editor::-webkit-scrollbar 
    {
        display: none;
    }

    .ql-container::-webkit-scrollbar{
        background: gray;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .ql-container::-webkit-scrollbar-thumb
    {
        background: #55AAFF;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        background-clip: padding-box;
        border: 5px solid transparent;
    }

    .ql-container::-webkit-scrollbar-track
    {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .ql-video
    {
        width: 1280px;
        height: 700px;
    }

    .ql-toolbar.ql-toolbar.ql-snow
    {
        order: 2;
    }

`

const ReCommentBtnBox = styled.div
    `
    display: flex;
    justify-content: end;
`


const ReCommentBtn = styled.button
    `
    width: 9%;
    background: #55AAFF;
    outline: none;
    border-radius: 10px;
    margin: 10px 0px 10px 0px;
    border: solid 3px black;
    font-size: 19px;
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
`

const CancelBtn = styled(ReCommentBtn)
    `
    width: 6%;
    background: white;
    margin : 10px 10px 10px 0px;
`

const SirenImg = styled.img
    `
    width: 20px;
    height: 19px;
    margin: 0px 0px 1.4px 7px;    
`

const ReCommentLine = styled.div
    `
    width: 100%;
    border: 1px solid ${props => props.theme.textColor};
`
