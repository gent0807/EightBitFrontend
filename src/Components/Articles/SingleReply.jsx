import axios from "axios";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useRecoilState, useRecoilValue } from "recoil";
import { freeReply } from "./Reply";
import { freeReComment } from "./ReComment";
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
import SingleReComment from "./SingleReComment";
import { BsPencilSquare } from "react-icons/bs";
import { BiLogoDevTo } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { point } from "../Redux/User";


Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

const SingleReply = ({ Comment }) => {

    const [likecount, setLikecount] = useState(0);
    const [profileImagePath, setProfileImagePath] = useState("");
    const [writerRole, setWriterRole] = useState("");
    const [reportMode, setReportMode] = useState(false);
    const [reCommentChangeValue, setReCommentChangeValue] = useState("");
    const [reCommentHide, setReCommentHide] = useState(false);
    const [replyStatusDivHide, setReplyStatusDivHide] = useState(true);
    const [updateMode, setUpdateMode] = useState(false);
    const [updateReplyText, setUpdateReplyText] = useState("");


    const navigate = useNavigate();

    const ip = localStorage.getItem("ip");
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const loginMaintain = localStorage.getItem("loginMaintain");
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    let likeMode = useRef(false);

    const [replyText, setReplyText] = useRecoilState(freeReply);
    const [reCommentText, setReCommentText] = useRecoilState(freeReComment);

    const [onReplyBtn, setOnReplyBtn] = useState(false);
    const [reCommentCnt, setReCommentCnt] = useState(0);

    const quillRef = useRef(null);

    const [ReComment, setReComment] = useState([
        {
            id: 1,
            writer: "eight",
            content: "ㅋㅋㅋㅋㅋ 개웃기네"
        },
        {
            id: 2,
            writer: "seopseop",
            content: "뭐라는 거임?"
        },
        {
            id: 3,
            writer: "란토",
            content: "누구세요??"
        }
    ]);


    useEffect(() => {
        const getUserProfileImagePath = (writer) => {
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



        getUserProfileImagePath(Comment.writer);
        getUserRole(Comment.writer);
        setReCommentCnt(ReComment.length);
        setUpdateReplyText(Comment.content);
    }, [replyText, reCommentText]);

    const getNewLikeCount = async () => {
        axios.get(`${ip}/Board/article/like?writer=${Comment.writer}&regdate=${Comment.regdate}`, {

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


        await axios.patch(`${ip}/Board/article/like/up?writer=${Comment.writer}&regdate=${Comment.regdate}`, {

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
            await axios.patch(`${ip}/Board/article/like/down?writer=${Comment.writer}&regdate=${Comment.regdate}`, {
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

    const registerReComment = async (e) => {
        e.preventDefault();

        if (reCommentChangeValue.length > 11) {
            /*  axios.patch(`${ip}/Users/point/up?writer=${loginMaintain == "true" ? userInfo.nickName : user.nickname}&point=5`,
               {

               },
               {
                   headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` }
               })
               .then((res) => {
                   return res.data;
               }
               )
               .then((data) => {
                   dispatch(point(data));
               });  */
        }
        else if (reCommentChangeValue.length <= 11) {
            alert("댓글 내용을 입력해주세요.");
            return;
        }

    }

    const updateReply = async (e) => {
        e.preventDefault();
        if (updateReplyText.length > 11) {
            setUpdateMode(false);
        }

        else if (updateReplyText.length <= 11) {
            alert("댓글을 입력해주세요.");
            return;
        }
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
        <UserCommentBox key={Comment.id}>
            <div style={{ display: updateMode === true ? "none" : "block" }}>
                <CommentUserProfileBox>
                    <CommentUserBox>
                        <CommentUserProfile src={localStorage.getItem("profileImageDir") + profileImagePath} />
                        <CommentInformationAllBox>
                            <div style={{ display: "flex" }}>
                                <UserNicknameText>{Comment.writer}</UserNicknameText>
                                <BiLogoDevTo size={22} style={{ margin: "0px 0px 0px 2px", display: writerRole === "DEVELOPER" ? "block" : "none" }}></BiLogoDevTo>
                                {Comment.regdate == Comment.updatedate ? "" :
                                    <div style={{ display: "flex", margin: "5px 0px 0px 2px" }}>
                                        <AiFillCheckCircle style={{ margin: "1px 3px 0px 3px" }} />
                                        수정됨
                                    </div>}

                            </div>
                            <div style={{ display: "flex" }}>
                                <CommentreplyIcon><AiOutlineComment /></CommentreplyIcon>
                                <CommentreplyCount>{reCommentCnt}</CommentreplyCount>
                            </div>

                        </CommentInformationAllBox>
                    </CommentUserBox>
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
                        <Regdate>{dayjs(Comment.regdate).format("YYYY-MM-DD HH:mm")}</Regdate>
                    </div>
                </CommentUserProfileBox>
                <CommentInformationBox>
                    <CommentText>{Comment.content}</CommentText>
                </CommentInformationBox>
                <CommentreplyBox>
                    <CommentreplyAllBox>
                        <div onClick={() => { setReCommentHide(!reCommentHide) }} style={{ display: reCommentCnt > 0 ? "flex" : "none", fontWeight: "bold", margin: "2.9px 0px 0px 2px", fontSize: "15.5px", cursor: "pointer" }}>
                            {reCommentHide === true ?
                                <IoIosArrowDown size={18} style={{ margin: "0px 7px 0px 0px " }} />
                                : <IoIosArrowUp size={18} style={{ margin: "0px 7px 0px 0px " }} />}
                            {reCommentHide === true ? `댓글 ${reCommentCnt}개 보기` : "댓글 모두 숨기기"}
                        </div>
                        <CommentreplyBtn
                            ReCommentCnt={reCommentCnt}
                            LoginMaintain={loginMaintain}
                            UserInfo={userInfo} User={userInfo == null ?
                                null : userInfo.loginState}
                            UserCheck={user.login_state}
                            UserNicknameCheck={user.nickname}
                            UserNickname={userInfo == null ?
                                null : userInfo.nickName}
                            Writer={Comment.writer}
                            onClick={() => setOnReplyBtn(!onReplyBtn)}>
                            {onReplyBtn == false ? "댓글 쓰기" : "댓글 취소"}
                        </CommentreplyBtn>
                    </CommentreplyAllBox>
                    <div>
                        <CommentreplyLikeAllBox>
                            <CommentreplyLikeBtn
                                onClick={() => { likeMode.current === false ? countUpLike() : countDownLike() }}>
                                {likeMode.current === false ? <BsHandThumbsUp /> : <BsHandThumbsUpFill />}
                            </CommentreplyLikeBtn>
                            <CommentreplyLikeCount>{likecount}</CommentreplyLikeCount>
                            <OptionBox
                                LoginMaintain={loginMaintain}
                                User={user.login_state}
                                UserInfo={userInfo}
                                UserInfoState={userInfo == null ?
                                    null : userInfo.loginState}
                                UserInfoNickname={userInfo == null ?
                                    (user.login_state === "allok" ?
                                        user.nickname : null) : userInfo.nickName}
                                UserInfoRole={userInfo == null ?
                                    (user.login_state === "allok" ?
                                        user.role : null) : userInfo.role}
                                Writer={Comment.writer}
                                onClick={() => { setReplyStatusDivHide(!replyStatusDivHide) }}><SlOptions />
                            </OptionBox>
                        </CommentreplyLikeAllBox>
                        <SettingReplyStatusDiv ReplyStatusDivHide={replyStatusDivHide}>
                            <SettingReplyStatusBox>
                                <UpdateReply
                                    LoginMaintain={loginMaintain}
                                    User={user.login_state}
                                    UserInfo={userInfo}
                                    UserInfoState={userInfo == null ?
                                        null : userInfo.loginState}
                                    UserInfoNickname={userInfo == null ?
                                        (user.login_state === "allok" ?
                                            user.nickname : null) : userInfo.nickName}
                                    UserInfoRole={userInfo == null ?
                                        (user.login_state === "allok" ?
                                            user.role : null) : userInfo.role}
                                    Writer={Comment.writer}
                                    onClick={() => {
                                        setReplyStatusDivHide(true);
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
                </CommentreplyBox>
                <ReCommentSector>
                    {onReplyBtn && (<ReCommentForm
                        LoginMaintain={loginMaintain}

                        UserInfo={userInfo} User={userInfo == null ?
                            null : userInfo.loginState}

                        UserCheck={user.login_state}

                        UserNicknameCheck={user.nickname}

                        UserNickname={userInfo == null ?
                            null : userInfo.nickName}

                        Writer={Comment.writer}

                        onSubmit={registerReComment}>
                        <ReCommentArea>
                            <ReCommentProfile>
                                <CommentUserProfile2 src={localStorage.getItem("profileImageDir") + profileImagePath} />
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
                    <ReCommentBox reCommentHide={reCommentHide}>
                        {ReComment.length > 0 &&
                            ReComment.map(ReComment => {
                                return (
                                    <SingleReComment
                                        ReComment={ReComment}
                                    />
                                );
                            })
                        }
                    </ReCommentBox>
                </ReCommentSector>
            </div>
            <div style={{ display: updateMode === false ? "none" : "block" }}>
                <ReCommentForm
                    LoginMaintain={loginMaintain}

                    UserInfo={userInfo} User={userInfo == null ?
                        null : userInfo.loginState}

                    UserCheck={user.login_state}

                    UserNicknameCheck={user.nickname}

                    UserNickname={userInfo == null ?
                        null : userInfo.nickName}

                    Writer={Comment.writer}

                    onSubmit={updateReply}>
                    <ReCommentArea>
                        <ReCommentProfile>
                            <CommentUserProfile2 src={localStorage.getItem("profileImageDir") + profileImagePath} />
                        </ReCommentProfile>
                        <ReCommentInputBox>
                            <Editer2
                                placeholder="여러분의 참신한 생각이 궁금해요. 댓글을 입력해 주세요!"
                                value={updateReplyText}
                                onChange={(content, delta, source, editor) => setUpdateReplyText(editor.getHTML())}
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
            <CommentLine />

        </UserCommentBox>
    );
}

export default SingleReply;

const Editer2 = styled(ReactQuill)
    `
    display: flex;
    flex-direction: column;

    .ql-editor.ql-blank::before{
        color: ${props => props.theme.textColor};;
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

const CommentreplyBox = styled.div
    `
    display: flex;
    justify-content: space-between;
    margin: 22px 10px 10px 0px;
`

const CommentreplyAllBox = styled.div
    `
    display: flex;
`

const CommentreplyLikeAllBox = styled.div
    `
    display: flex;
    margin: 0px 0px 0px 60px;
`

const CommentreplyCount = styled.span
    `
    margin: 2.5px 0px 0px 0px;
    font-size: 17px;
    font-weight: bold;
`

const CommentreplyLikeCount = styled.span
    `
    margin: 3px 0px 0px 0px;
    font-size: 17px;
    font-weight: bold;
`
const OptionBox = styled.div
    `
    margin: 3px 0px 0px 15px;
    display: ${props => props.LoginMaintain == null ? "none" : props.LoginMaintain == "true" ? (props.UserInfo == null ? "none" : (props.UserInfoState === "allok" ? (props.UserInfoNickname == props.Writer || props.UserInfoRole == "ADMIN" ? "block" : "none") : "none")) :
        (props.User === "allok" ? (props.UserInfoNickname == props.Writer || props.UserInfoRole == "ADMIN" ? "block" : "none") : "none")};
    cursor : pointer;
`

const CommentreplyIcon = styled.i
    `
    margin: 0px 6px 0px 0px;
    font-size: 23px;   
`

const CommentreplyLikeBtn = styled.div
    `
    cursor: pointer;
    font-size: 22px;
    margin: 0px 5px 0px 0px;
`

const CommentreplyBtn = styled.div
    `
    margin: ${props => props.ReCommentCnt > 0 ? "3px 0px 0px 18px" : "3px 0px 0px 1px"};
    font-weight: bold;
    font-size: 14.5px;
    cursor: pointer;
    display: ${props => props.LoginMaintain == null ? "none" : props.LoginMaintain == "true" ? (props.UserInfo == null ? "none" : (props.User === "allok" ? "block" : "none")) :
        (props.UserCheck === "allok" ? "block" : "none")};
`

const CommentText = styled.span
    `

`

const CommentInformationBox = styled.div
    `
    padding: 0px 0px 0px 0px;
    font-size: 20px;
    font-weight: bold;
`

const CommentLine = styled.div
    `
    width: 100%;
    border: 1px dashed ${props => props.theme.textColor};
`

const CommentUserBox = styled.div
    `
    display: flex;
`

const SirenImg = styled.img
    `
    width: 20px;
    height: 20px;
    margin: 0px 0px 1px 7px;    
`

const TitleLine = styled.div
    `
    height: 1px;
    background: black;
    margin: 15px 0px 15px 0px;
`

const UserNicknameText = styled.span
    `
    font-size: 21px;
    margin: 0px 0px 6px 2px;
    cursor: pointer;
`

const Regdate = styled.span
    `
    font-size: 17px;
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

const CommentInformationAllBox = styled.div
    `
    display: flex;
    flex-direction: column;
    padding: 21px 0px 0px 15px;
`

const CommentUserProfileBox = styled.div
    `
    display: flex;
    justify-content: space-between;
    margin: 0px 0px 17px 0px;
`

const CommentUserProfile = styled.img
    `
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 30px;
    margin: 23px 0px 0px 0px;
    cursor: pointer;
`

const CommentUserProfile2 = styled(CommentUserProfile)
    `
    width: 38px;
    height: 38px;
`

const UserCommentBox = styled.div
    `
    

`

const ReCommentForm = styled.form
    `
    display: ${props => props.LoginMaintain == null ? "none" : props.LoginMaintain == "true" ? (props.UserInfo == null ? "none" : (props.User === "allok" ? "block" : "none")) :
        (props.UserCheck === "allok" ? "block" : "none")};
    padding: 30px 0px 0px 0px;

`

const ReCommentBox = styled.div
    `
    display: ${props => props.reCommentHide === true ? "none" : "block"};
    margin: 18px 0px 0px 0px;
    padding: 0px 0px 25px 0px;
`

const SettingReplyStatusDiv = styled.div
    `
    display: ${props => props.ReplyStatusDivHide === true ? "none" : "flex"};
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
    display: ${props => props.LoginMaintain == null ? "none" : props.LoginMaintain == "true" ? (props.UserInfo == null ? "none" : (props.UserInfoState === "allok" ? (props.UserInfoNickname == props.Writer ? "flex" : "none") : "none")) :
        (props.User === "allok" ? (props.UserInfoNickname == props.Writer ? "flex" : "none") : "none")};
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


const ReCommentSector = styled.div
    `
    margin: 0px 12px 40px 12px;
    padding: 0px 6px 0px 30px;
    border-left: solid 3px ${props => props.theme.textColor};
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

const ReCommentBtnBox = styled.div
    `
    display: flex;
    justify-content: end;
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

const CommentInputBox = styled.div
    `
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 2fr;
    border: solid 3px ${props => props.theme.borderColor};
    border-radius: 10px;
    overflow: hidden;
`


