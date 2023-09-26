import axios from "axios";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { BsHandThumbsUp } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import dayjs from "dayjs";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import { ImageDrop } from "quill-image-drop-module";
import Siren from "../../img/Siren/Siren.png";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

const SingleComment = ({ Comment, profileImagePath }) => {

    const { writer } = useParams();
    const { regdate } = useParams();
    const [likecount, setLikecount] = useState(0);
    const [reCommentChangeValue, setReCommentChangeValue] = useState("");
    const navigate = useNavigate();
    const ip = localStorage.getItem("ip");
    const user = useSelector(state => state.user);
    const loginMaintain = localStorage.getItem("loginMaintain");
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    let likeMode = useRef(false);
    const [onReplyBtn, setOnReplyBtn] = useState(false);
    const [reCommentCnt, setReCommentCnt] = useState(0);

    const quillRef = useRef(null);

    const getNewLikeCount = async () => {
        axios.get(`${ip}/Board/article/like?writer=${writer}&regdate=${regdate}`, {

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


        await axios.patch(`${ip}/Board/article/like/up?writer=${writer}&regdate=${regdate}`, {

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
            await axios.patch(`${ip}/Board/article/like/down?writer=${writer}&regdate=${regdate}`, {
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

const registerRecomment= async (e)=>{
    e.preventDefault();

    if(reCommentChangeValue.length>0){

    }
    else if(reCommentChangeValue.length==0){
        alert("댓글 내용을 입력해주세요.");
        return; 
    }

    }

    return (
        <UserCommentBox key={Comment.id}>
            <CommentUserProfileBox>
                <CommentUserBox>
                    <CommentUserProfile src={localStorage.getItem("profileImageDir") + profileImagePath} />
                    <CommentInformationAllBox>
                        <UserNicknameText>{Comment.writer}</UserNicknameText>
                        <Regdate>{dayjs(regdate).format("YY.MM.DD HH:mm")}</Regdate>
                    </CommentInformationAllBox>
                </CommentUserBox>
                <RedateBox>
                    신고
                    <SirenImg src={Siren} />
                </RedateBox>
            </CommentUserProfileBox>
            <CommentInformationBox>
                <CommentText>{Comment.content}</CommentText>
            </CommentInformationBox>
            <CommentreplyBox>
                <CommentreplyAllBox>
                    <CommentreplyIcon onClick={() => {}}><AiOutlineComment /></CommentreplyIcon>
                    <CommentreplyCount>{reCommentCnt}</CommentreplyCount>
                    <CommentreplyBtn
                        LoginMaintain={loginMaintain}
                        UserInfo={userInfo} User={userInfo == null ?
                            null : userInfo.loginState}
                        UserCheck={user.login_state}
                        UserNicknameCheck={user.nickname}
                        UserNickname={userInfo == null ?
                            null : userInfo.nickName}
                        Writer={writer}
                        onClick={() => setOnReplyBtn(!onReplyBtn)}>
                        {onReplyBtn == false ? "댓글 쓰기" : "댓글 취소"}
                    </CommentreplyBtn>
                </CommentreplyAllBox>
                <CommentreplyLikeAllBox>
                    <CommentreplyLikeBtn
                        onClick={() => { likeMode.current === false ? countUpLike() : countDownLike() }}>
                        {likeMode.current === false ? <BsHandThumbsUp /> : <BsHandThumbsUpFill />}
                    </CommentreplyLikeBtn>
                    <CommentreplyLikeCount>{likecount}</CommentreplyLikeCount>
                </CommentreplyLikeAllBox>
            </CommentreplyBox>

            {onReplyBtn && (<ReCommentForm
                LoginMaintain={loginMaintain}

                UserInfo={userInfo} User={userInfo == null ?
                    null : userInfo.loginState}

                UserCheck={user.login_state}

                UserNicknameCheck={user.nickname}

                UserNickname={userInfo == null ?
                    null : userInfo.nickName}

                Writer={writer}

                onSubmit={registerReComment}>
                <ReCommentArea>
                    <ReCommentProfile>
                        <CommentUserProfile2 src={localStorage.getItem("profileImageDir") + profileImagePath} />
                    </ReCommentProfile>
                    <ReCommentInputBox>
                        <Editer2
                            placeholder="댓글을 입력해 주세요!"
                            value={reCommentChangeValue}
                            onChange={(content, delta, source, editor) => setReCommentChangeValue(editor.getHTML())}
                            theme="snow"
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

            <CommentLine />
        </UserCommentBox>
    );
}

export default SingleComment;

const Editer2 = styled(ReactQuill)
    `
    display: flex;
    flex-direction: column;

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
`

const CommentreplyCount = styled.span
    `
    margin: 3px 0px 0px 0px;
    font-size: 17px;
    font-weight: bold;
`

const CommentreplyLikeCount = styled.span
    `
    margin: 3px 0px 0px 0px;
    font-size: 17px;
    font-weight: bold;
`

const CommentreplyIcon = styled.i
    `
    margin: 0px 6px 0px 0px;
    font-size: 23px;
    cursor: pointer;    
`

const CommentreplyLikeBtn = styled.div
    `
    cursor: pointer;
    font-size: 22px;
    margin: 0px 10px 0px 0px;
`

const CommentreplyBtn = styled.div
    `
    margin: 4px 0px 0px 18px;
    font-weight: bold;
    cursor: pointer;
    display: ${props => props.LoginMaintain == null ? "none" : props.LoginMaintain == "true" ? (props.UserInfo == null ? "none" : (props.User === "allok" ? "block" : "none")) :
        (props.UserCheck === "allok" ? "block" : "none")};
`

const CommentText = styled.span
    `

`

const CommentInformationBox = styled.div
`
    padding: 0px 0px 0px 67px;
    font-size: 20px;
    font-weight: bold;
`

const CommentLine = styled.div
`
    width: 100%;
    border: 1px dashed black;
`

const CommentUserBox = styled.div
    `
    display: flex;
`

const SirenImg = styled.img
`
    width: 40px;
    height: 40px;
`

const TitleLine = styled.div
    `
    height: 1px;
    background: black;
    margin: 15px 0px 15px 0px;
`

const UserNicknameText = styled.span
    `
    font-size: 25px;
    margin: 0px 0px 5px 0px;
`

const Regdate = styled.span
    `
    font-size: 17px;
`

const RedateBox = styled.div
    `
    display: flex;
    align-items: end;
    cursor: pointer;
    margin: 0px 0px 36px 0px;
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
}
`

const CommentUserProfile = styled.img
`
    width: 43px;
    height: 43px;
    border: solid 2px black;
    border-radius: 30px;
    margin: 21px 0px 0px 0px;
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
`

const ReCommentInputBox = styled.div
    `
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 2fr;
    border: solid 2px ${props => props.theme.borderColor};
    border-radius: 10px;
    overflow: hidden;
`

const ReCommentBtn = styled.button
`
    width: 8%;
    background: #55AAFF;
    outline: none;
    border-radius: 10px;
    margin: 10px 0px 0px 0px;
    border: solid 3px black;
    font-size: 19px;
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
`

const CancelBtn = styled(ReCommentBtn)
    `
    width: 7%;
    background: white;
    margin : 10px 10px 0px 0px;
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
    margin: -20px 11px 0px 0px;
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


