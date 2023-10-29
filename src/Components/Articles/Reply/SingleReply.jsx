import axios from "axios";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useRecoilState } from "recoil";
import { toggle } from "../Toggle";
import { toggle2 } from "../Toggle";
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
import { BsDot } from "react-icons/bs";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import { ImageDrop } from "quill-image-drop-module";
import Siren from "../../../img/Siren/Siren.png";
import SingleReComment from "../ReComment/SingleReComment";
import { BsPencilSquare } from "react-icons/bs";
import { BiLogoDevTo } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { clearLoginState, accessToken, point } from "../../Redux/User";
import ReplyReportModal from "./ReplyReportModal"
import ReCommentDeleteModal from "../ReComment/ReCommentDeleteModal";
import ReplyUpdateCommentModal from "./ReplyUpdateCommentModal";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

const SingleReply = ({
    Comment,
    reCommentCount,
    setReCommentCount,
    setSelectedCommentIndex,
    isEditing,
    addComment,
    editComment,
    deleteComment,
    key,
    setModalReplyDeleteRegdate,
    setModalReplyDeleteReplyer,
    setModalReplyDeleteToggleState,
    setModalReplyDeleteSetToggleState,
    setModalReplyDeleteId,
    setReplyDeleteMode,
    ReplyDeleteMode,
}) => {
    const [ModalReplyUpdateCommentOnOff, setModalReplyUpdateCommentOnOff] = useState(false);
    const [id, setId] = useState(Comment.id);
    const [replyer, setReplyer] = useState(Comment.author);
    const [content, setContent] = useState(Comment.content);
    const [regdate, setRegdate] = useState(Comment.regdate);
    const [updatedate, setUpdatedate] = useState(Comment.updatedate);
    const [likecount, setLikecount] = useState(0);
    const [replyerRole, setReplyerRole] = useState("");
    const [reportMode, setReportMode] = useState(false);
    const [reCommentChangeValue, setReCommentChangeValue] = useState("<p><br></p>");
    const [reCommentHide, setReCommentHide] = useState(true);
    const [replyStatusDivHide, setReplyStatusDivHide] = useState(false);
    const [updateReplyText, setUpdateReplyText] = useState("");
    const [selectedReCommentIndex, setSelectedReCommentIndex] = useState(0);
    const [ModalReCommenterdeleteMode, setModalReCommenterdeleteMode] = useState(false);
    const [ModalreCommenter, setModalreCommenter] = useState("");
    const [ModalreCommentId, setModalreCommentId] = useState("");
    const [ModalreRegdate, setModalreRegdate] = useState("");
    const [ModalToggleState2, setModalToggleState2] = useState("");
    const [ModalToggleState, setModalToggleState] = useState("");
    const SettingRef = useRef(null);


    const navigate = useNavigate();

    const ip = localStorage.getItem("ip");
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const loginMaintain = localStorage.getItem("loginMaintain");
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);

    let likeMode = useRef(false);

    const [toggleState, setToggleState] = useRecoilState(toggle);
    const [toggleState2, setToggleState2] = useRecoilState(toggle2);


    const [onReplyBtn, setOnReplyBtn] = useState(false);

    const quillRef = useRef(null);

    const [ReComments, setReComments] = useState([]);

    useEffect(() => {

        console.log("------------------댓글 정보--------------------");
        console.log(Comment);
        

        const getReplyerRole = (replyer) => {
            axios.get(`${ip}/Users/role?nickname=${replyer}`, {

            },
                {

                })
                .then((res) => {
                    return res.data;
                })
                .then(data => {
                    setReplyerRole(data);
                })
        }

        const getLikes = (replyer, regdate) => {
        
                axios.get(`${ip}/Likes/comment/free/likes?replyer=${replyer}&regdate=${regdate}`, {

                },
                    {       
    
                    })
                    .then((res) => {
                        return res.data;
                    })
                    .then((data) => {
                        setLikecount(data.length);
                        if (loginMaintain == "true") {
                            if (userInfo != null) {
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i] == userInfo.nickName) {
                                        likeMode.current = true;
                                        break;
                                    }
                                    else {
                                        likeMode.current = false;
                                    }
                                }
                            }
                        }
                        else if (loginMaintain == "false") {
                            if (user.nickname != null) {
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i] == user.nickname) {
                                        likeMode.current = true;
                                        break;
                                    }
                                    else {
                                        likeMode.current = false;
                                    }
                                }
                            }
                        }
                        else if (loginMaintain == null) {
                            likeMode.current = false;
                        }
                    })
            
            
        }

        const getReComments = (replyer, regdate) => {
            axios.get(`${ip}/ReComments/free/reComments?original_replyer=${replyer}&original_regdate=${regdate}`, {

            },
                {

                })
                .then((res) => {
                    return res.data;
                })
                .then((data) => {
                    
                    //console.log("----------------------------------");
                    //console.log("ReComment"+data.id);
                    //console.log("----------------------------------");
                    setReComments(data);
                    setReCommentCount(data.length);
                })
        }

        setId(Comment.id);
        setModalReplyDeleteToggleState(toggleState);
        setReplyer(Comment.author); 
        setContent(Comment.content);
        setRegdate(Comment.regdate);
        setUpdatedate(Comment.updatedate);
        setUpdateReplyText(Comment.content);
        getReplyerRole(Comment.author);
        getLikes(Comment.author, Comment.regdate);
        getReComments(Comment.author, Comment.regdate);

        setReplyStatusDivHide(false);

    }, [editComment, addComment, deleteComment, toggleState2]);


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

    const addLike = async (e) => {

        await axios.post(`${ip}/Likes/comment/free/like`, {
            liker: loginMaintain == "true" ? userInfo.nickName : user.nickname,
            author: replyer,
            regdate: regdate,
        },
            {
                headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` }
            })
            .then(res => {
                /* regenerateAccessTokenOrLogout(res, addLike, e); */
                return res.data;
            })
            .then(data => {
                setLikecount(data.length);
                likeMode.current = true;
            })
    }




    const reduceLike = async (e) => {
        if (likecount > 0) {
            await axios.delete(`${ip}/Likes/comment/free/like/${loginMaintain == "true" ? userInfo.nickName : user.nickname}/${replyer}/${regdate}`,
                {
                    headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` }
                })
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    /* regenerateAccessTokenOrLogout(res, reduceLike, e); */
                    setLikecount(data.length);
                    likeMode.current = false;
                })

        }
        else return;
    }

    const addReComment = (data, ReComments) => {
        if (ReComments.length > 0) {
            const lastCmtIndex = ReComments.length - 1;
            const addedCmtId = ReComments[lastCmtIndex].id + 1;
            const newReComment = {
                id: addedCmtId,
                original_author: replyer,
                original_regdate: regdate,
                author: loginMaintain == "true" ? userInfo.nickName : user.nickname,
                content: reCommentChangeValue,
                regdate: data.regdate,
                updatedate: data.updatedate,
            };
            setReComments([...ReComments, newReComment]);
            setReCommentChangeValue('<p><br></p>');
        }
        else if (ReComments.length === 0) {
            const addedCmtId = 1;
            const newReComment = {
                id: addedCmtId,
                original_author: replyer,
                original_regdate: regdate,
                author: loginMaintain == "true" ? userInfo.nickName : user.nickname,
                content: reCommentChangeValue,
                regdate: data.regdate,
                updatedate: data.updatedate,
            };
            setReComments([...ReComments, newReComment]);
            setReCommentChangeValue('<p><br></p>');
        }
    };

    const editReComment = (ReCommentId, editValue) => {
        let newReComments = ReComments.map((item) => {
            if (item.id === ReCommentId) {
                item.content = editValue;
            }
            return item;
        });

        setReComments(newReComments);
    };

    const deleteReComment = (ReCommentId) => {
        let newReComments = ReComments.filter(item => item.id !== ReCommentId);
        setReComments(newReComments);
        setReCommentHide(true);
        setOnReplyBtn(false);
        setToggleState(!toggleState);
        setToggleState2(!toggleState2);
    }




    const updateReply = async (e) => {
        e.preventDefault();

        if (updateReplyText !== '<p><br></p>') {
            await axios.patch(`${ip}/Comments/free/comment?replyer=${replyer}&regdate=${regdate}`,
                {
                    content: updateReplyText,
                },
                {
                    headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` }
                })
                .then((res) => {
                    /* regenerateAccessTokenOrLogout(res, updateReply, e); */
                    return res.data;
                })
                .then((data) => {
                    setToggleState(!toggleState);
                    editComment(id, updateReplyText);
                    setSelectedCommentIndex(0);
                })
        }

        else if (updateReplyText === '<p><br></p>' && updateReplyText.length === 11) {
            setModalReplyUpdateCommentOnOff(true);
            return;
        }
    }

    const registerReComment = async (e) => {
        e.preventDefault();

        if (reCommentChangeValue !== '<p><br></p>') {
            await axios.post(`${ip}/ReComments/free/reComment`, {
                original_author: replyer,
                original_regdate: regdate,
                author: loginMaintain == "true" ? userInfo.nickName : user.nickname,
                content: reCommentChangeValue,
            },
                {
                    headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` },
                })
                .then((res) => {
                    /* regenerateAccessTokenOrLogout(res, registerReComment, e); */
                    return res.data;
                })
                .then((data) => {
                    addReComment(data, ReComments);
                    setToggleState(!toggleState);
                    setOnReplyBtn(false);
                    setReCommentCount(reCommentCount + 1);
                    dispatch(point(user.point + 5));
                    return;
                })

        }
        else if (reCommentChangeValue === '<p><br></p>' && reCommentChangeValue.length === 11) {
            setModalReplyUpdateCommentOnOff(true);
            return;
        }

    }

    console.log(reCommentChangeValue, reCommentChangeValue.length, ModalReplyUpdateCommentOnOff)

    const regenerateAccessTokenOrLogout = (res, f, e) => {
        if (res.status == 403) {
            axios.patch(`${ip}/Users/token/${loginMaintain == "true" ? userInfo.nickName : user.nickname}`, {

            },
                {
                    headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` },
                })
                .then((res) => {
                    return res.data
                }
                )
                .then((data) => {
                    if (data == "invalid") {
                        localStorage.removeItem("userInfo");
                        localStorage.removeItem("loginMaintain");
                        dispatch(clearLoginState());
                        deleteRefreshToken("refreshToken");
                        window.alert("인증되지 않은 접근입니다.");
                        navigate('/Login');
                    }
                    else if (data == "accesstoken valid") {
                        localStorage.removeItem("userInfo");
                        localStorage.removeItem("loginMaintain");
                        dispatch(clearLoginState());
                        deleteRefreshToken("refreshToken");
                        window.alert("인증되지 않은 접근입니다.");
                        navigate('/Login');
                    }
                    else if (data == "accesstoken not matched user") {
                        localStorage.removeItem("userInfo");
                        localStorage.removeItem("loginMaintain");
                        dispatch(clearLoginState());
                        deleteRefreshToken("refreshToken");
                        window.alert("인증되지 않은 접근입니다.");
                        navigate('/Login');
                    }
                    else if (data == "refreshtoken invalid") {
                        localStorage.removeItem("userInfo");
                        localStorage.removeItem("loginMaintain");
                        dispatch(clearLoginState());
                        deleteRefreshToken("refreshToken");
                        window.alert("인증되지 않은 접근입니다.");
                        navigate('/Login');
                    }
                    else if (data == "refreshtoken expired") {
                        localStorage.removeItem("userInfo");
                        localStorage.removeItem("loginMaintain");
                        dispatch(clearLoginState());
                        deleteRefreshToken("refreshToken");
                        window.alert("로그인이 만료되었습니다.");
                        navigate('/Login');
                    }
                    else if (data == "refreshtoken not matched user") {
                        localStorage.removeItem("userInfo");
                        localStorage.removeItem("loginMaintain");
                        dispatch(clearLoginState());
                        deleteRefreshToken("refreshToken");
                        window.alert("인증되지 않은 접근입니다.");
                        navigate('/Login');
                    }
                    else {
                        const object = {
                            accessToken: data,
                        };
                        if (loginMaintain == "true") {
                            userInfo.accessToken = data;
                        }
                        dispatch(accessToken(object));
                        f(e);
                    }
                })
            return;
        }
        else if (res.status == 200) {
            return res.data
        }
    }

    const deleteRefreshToken = (name) => {
        document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
    }

    useEffect(() => {
        function handleOuside(e) {
            if (SettingRef.current && !SettingRef.current.contains(e.target)) {
                setReplyStatusDivHide(false);
            }
        };

        if (!replyStatusDivHide) {
            document.addEventListener("click", handleOuside);
        }
        return () => {
            document.removeEventListener("click", handleOuside);
        };
    }, [SettingRef]);

    return (
        <UserCommentBox id={id}>

            <ReplyReportModal
                replyer={replyer}
                regdate={regdate}
                ReportMode={reportMode}
                setReportMode={setReportMode}
                id={key}
            />

            <div style={{ display: isEditing === true ? "none" : "block" }}>
                <CommentUserProfileBox>
                    <CommentUserBox>
                        <CommentUserProfile src={`${ip}/Users/profileImg/${replyer}`} />
                        <CommentInformationAllBox>
                            <div style={{ display: "flex" }}>
                                <UserNicknameText>{replyer}</UserNicknameText>
                                <BiLogoDevTo size={23} style={{ margin: "1px 0px 2px 0px", display: replyerRole === "DEVELOPER" ? "block" : "none" }}></BiLogoDevTo>
                                {regdate == updatedate ? "" :
                                    <div style={{ display: "flex", margin: "5px 0px 0px -1px" }}>
                                        <AiFillCheckCircle style={{ margin: "1px 3px 0px 3px" }} />
                                        수정됨
                                    </div>}

                            </div>
                            <div style={{ display: "flex" }}>
                                <BsHandThumbsUp size={20} style={{ margin: "1px 0px 0px 0px" }} />
                                <CommentreplyLikeCount>{likecount}</CommentreplyLikeCount>
                                <BsDot style={{ margin: "3px -1px 0px -6px" }}></BsDot>
                                <CommentreplyIcon><AiOutlineComment /></CommentreplyIcon>
                                <CommentreplyCount>{ReComments.length}</CommentreplyCount>
                            </div>

                        </CommentInformationAllBox>
                    </CommentUserBox>

                    <div style={{ margin: "15px 0px 0px 0px" }}>
                        <RedateBox style={{display: loginMaintain == null? "none": loginMaintain =="true" ? 
                                        (userInfo.loginState=="allok" ? "flex": user.login_state=="allok"? "flex":"none")
                                         : user.login_state=="allok" ? "flex":"none"}}>
                            신고
                            <SirenImg src={Siren} onClick={() => { setReportMode(!reportMode) }} />
                        </RedateBox>
                        <Regdate>{dayjs(regdate).format("YYYY-MM-DD HH:mm")}</Regdate>
                    </div>

                </CommentUserProfileBox>
                <CommentInformationBox>
                    <CommentText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
                </CommentInformationBox>
                <CommentreplyBox>
                    <CommentreplyAllBox>
                        <div onClick={() => { setReCommentHide(!reCommentHide) }} style={{ display: ReComments.length > 0 ? "flex" : "none", fontWeight: "bold", margin: "2.9px 0px 0px 2px", fontSize: "15.5px", cursor: "pointer" }}>
                            {reCommentHide === true ?
                                <IoIosArrowDown size={18} style={{ margin: "0px 7px 0px 0px " }} />
                                : <IoIosArrowUp size={18} style={{ margin: "0px 7px 0px 0px " }} />}
                            {reCommentHide === true ? `댓글 ${ReComments.length}개 보기` : "댓글 모두 숨기기"}
                        </div>
                        <CommentreplyBtn
                            ReCommentCnt={ReComments.length}
                            LoginMaintain={loginMaintain}
                            UserInfo={userInfo} User={userInfo == null ?
                                null : userInfo.loginState}
                            UserCheck={user.login_state}
                            UserNicknameCheck={user.nickname}
                            UserNickname={userInfo == null ?
                                null : userInfo.nickName}
                            onClick={() => {setOnReplyBtn(!onReplyBtn)}}>
                            {onReplyBtn == false ? "댓글 쓰기" : "댓글 취소"}
                        </CommentreplyBtn>
                    </CommentreplyAllBox>

                    <CommentreplyLikeAllBox>
                        <CommentreplyLikeBtn
                            LoginMaintain={loginMaintain}
                            UserInfo={userInfo} User={userInfo == null ?
                                null : userInfo.loginState}
                            UserCheck={user.login_state}
                            UserNicknameCheck={user.nickname}
                            UserNickname={userInfo == null ?
                                null : userInfo.nickName}
                            onClick={() => { likeMode.current === false ? addLike() : reduceLike() }}>
                            {likeMode.current === false ? <BsHandThumbsUp /> : <BsHandThumbsUpFill />}
                        </CommentreplyLikeBtn>

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
                            Replyer={replyer}
                            onClick={() => { setReplyStatusDivHide(!replyStatusDivHide) }}
                            ref={SettingRef}
                        >
                            <SlOptions />

                            <SettingReplyStatusDiv ReplyStatusDivHide={replyStatusDivHide}>
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
                                    Replyer={replyer}
                                    onClick={() => {
                                        setReplyStatusDivHide(false);
                                        setSelectedCommentIndex(id);
                                    }}>
                                    <span>
                                        <BsPencilSquare size={20} style={{ margin: "0px 10px -5px 0px" }} />
                                        수정하기
                                    </span>
                                </UpdateReply>

                                <DeleteReply
                                    onClick={() => {
                                        setReplyDeleteMode(!ReplyDeleteMode);
                                        setModalReplyDeleteReplyer(replyer);
                                        setModalReplyDeleteRegdate(regdate);
                                        setModalReplyDeleteId(id);
                                    }}>
                                    <span>
                                        <RiDeleteBin5Line
                                            size={20}
                                            style={{ margin: "0px 10px -5px 0px" }} 
                                        />
                                        삭제하기
                                    </span>
                                </DeleteReply>

                            </SettingReplyStatusDiv>
                        </OptionBox>

                    </CommentreplyLikeAllBox>

                </CommentreplyBox>

                { ModalReplyUpdateCommentOnOff ? <ReplyUpdateCommentModal
                    setModalReplyUpdateCommentOnOff={setModalReplyUpdateCommentOnOff}
                    ModalReplyUpdateCommentOnOff={ModalReplyUpdateCommentOnOff}
                 /> : <></> }

                

                <ReCommentDeleteModal
                    setDeleteMode={setModalReCommenterdeleteMode}
                    deleteMode={ModalReCommenterdeleteMode}
                    userInfo={userInfo}
                    user={user}
                    loginMaintain={loginMaintain}
                    deleteReComment={deleteReComment}
                    Commentid={ModalreCommentId}
                    reCommenter={ModalreCommenter}

                    regdate={ModalreRegdate}
                    setToggleState2={setModalToggleState2}
                    toggleState2={ModalToggleState2}
                    setToggleState={setModalToggleState}
                    toggleState={ModalToggleState}
                />

                <ReCommentSector>
                    {onReplyBtn && (<ReCommentForm
                        LoginMaintain={loginMaintain}

                        UserInfo={userInfo} User={userInfo == null ?
                            null : userInfo.loginState}

                        UserCheck={user.login_state}

                        UserNicknameCheck={user.nickname}

                        UserNickname={userInfo == null ?
                            null : userInfo.nickName}

                        onSubmit={registerReComment}>

                        <ReCommentArea>
                            <ReCommentProfile>
                                <CommentUserProfile2 src={loginMaintain=="true" ? `${ip}/Users/profileImg/${userInfo.nickName}`:`${ip}/Users/profileImg/${user.nickname}`} />
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
                        {ReComments.length > 0 &&
                            ReComments.map(ReComment => {
                                const reCommentId = ReComment.id;
                                return (
                                    <SingleReComment
                                        key={reCommentId}
                                        ReComment={ReComment}
                                        reCommentCount={reCommentCount}
                                        setReCommentCount={setReCommentCount}
                                        setSelectedReCommentIndex={setSelectedReCommentIndex}
                                        isEditing={reCommentId === selectedReCommentIndex ? true : false}
                                        addReComment={addReComment}
                                        editReComment={editReComment}
                                        deleteReComment={deleteReComment}
                                        setReCommentHide={setReCommentHide}

                                        setReDeleteMode={setModalReCommenterdeleteMode}
                                        RedeleteMode={ModalReCommenterdeleteMode}
                                        setModalreCommenter={setModalreCommenter}
                                        setModalreCommentId={setModalreCommentId}
                                        setModalreRegdate={setModalreRegdate}
                                        setModalToggleState2={setModalToggleState2}
                                        setModalToggleState={setModalToggleState}
                                    />
                                );
                            })
                        }
                    </ReCommentBox>
                </ReCommentSector>

            </div>
            <div style={{ display: isEditing === false ? "none" : "block" }}>

                { ModalReplyUpdateCommentOnOff ? <ReplyUpdateCommentModal
                    setModalReplyUpdateCommentOnOff={setModalReplyUpdateCommentOnOff}
                    ModalReplyUpdateCommentOnOff={ModalReplyUpdateCommentOnOff}
                 /> : <></> }

                <ReCommentForm
                    LoginMaintain={loginMaintain}

                    UserInfo={userInfo} User={userInfo == null ?
                        null : userInfo.loginState}

                    UserCheck={user.login_state}

                    UserNicknameCheck={user.nickname}

                    UserNickname={userInfo == null ?
                        null : userInfo.nickName}

                    onSubmit={updateReply}
                >
                    <ReCommentArea>
                        <ReCommentProfile>
                            <CommentUserProfile2 src={`${ip}/Users/profileImg/${replyer}`} />
                        </ReCommentProfile>
                        <ReCommentInputBox>
                            <Editer2
                                placeholder="여러분의 참신한 생각이 궁금해요. 댓글을 입력해주세요!"
                                value={updateReplyText}
                                onChange={(content, delta, source, editor) => setUpdateReplyText(editor.getHTML())}
                                modules={modules}
                                formats={formats}>
                            </Editer2>
                        </ReCommentInputBox>
                    </ReCommentArea>
                    <ReCommentBtnBox>
                        <CancelBtn type="button" onClick={() => setSelectedCommentIndex(0)}>취소</CancelBtn>
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

    .ql-editor ol, .ql-editor ul
    {
        color:${props => props.theme.textColor};
    }
    
    .ql-editor
    {
        margin: 0px -2px -2px 0px;
        min-height: 120px;
        font-size: 20px;
    }

    .ql-tooltip.ql-editing.ql-flip
    {
        left: 0% !important;
        top: 65% !important;
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

    .ql-snow .ql-picker.ql-expanded .ql-picker-options
    {
        display: block;
        margin-top: -133px;
        top: 100%;
        z-index: 1;
        margin: -108px 0px 0px 30px;
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

    .ql-snow .ql-picker.ql-expanded .ql-picker-options {
        display: block;
        margin-top: -135px;
        top: 100%;
        z-index: 1;
    }

    .ql-snow .ql-tooltip {
        background-color: #fff;
        border: 1px solid #ccc;
        box-shadow: 0px 0px 5px #ddd;
        color: #444;
        padding: 5px 12px;
        white-space: nowrap;
        margin: 110px 0px 0px 150px;
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
    margin: 0px 0px 0px 77px;
`

const CommentreplyCount = styled.span
    `
    margin: 2.5px 0px 0px 0px;
    font-size: 17px;
    font-weight: bold;
`

const CommentreplyLikeCount = styled.span
    `
    margin: 3px 5px 0px 2px;
    font-size: 17px;
    font-weight: bold;
`
const OptionBox = styled.div
    `
    margin: 3px 0px 0px 12px;
    display: ${props => props.LoginMaintain == null ? "none" : props.LoginMaintain == "true" ? (props.UserInfo == null ? "none" : (props.UserInfoState === "allok" ? (props.UserInfoNickname == props.Replyer || props.UserInfoRole == "ADMIN" ? "block" : "none") : "none")) :
        (props.User === "allok" ? (props.UserInfoNickname == props.Replyer || props.UserInfoRole == "ADMIN" ? "block" : "none") : "none")};
    cursor : pointer;
`

const CommentreplyIcon = styled.i
    `
    margin: 0px 6px 0px 0px;
    font-size: 23px;   
`

const CommentreplyLikeBtn = styled.div
    `
    display: ${props => props.LoginMaintain == null ? "none" : props.LoginMaintain == "true" ? (props.UserInfo == null ? "none" : (props.User === "allok" ? "block" : "none")) :
        (props.UserCheck === "allok" ? "block" : "none")};
    cursor: pointer;
    color: orange;
    font-size: 22px;
    margin: 0px 2px 0px 0px;
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

const CommentText = styled.div
    `
    font-size: 25px;
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
    display: ${props => props.ReplyStatusDivHide ? "flex" : "none"};
    position: absolute;
    flex-direction: column;
    border-radius: 6px;
    padding: 10px;
    border: solid 1px ${props => props.theme.textColor};
    z-index: 2;
    background: ${props => props.theme.backgroundColor};
    margin: 5px 0px 0px -97px;
`

const UpdateReply = styled.div
    `
    display: ${props => props.LoginMaintain == null ? "none" : props.LoginMaintain == "true" ? (props.UserInfo == null ? "none" : (props.UserInfoState === "allok" ? (props.UserInfoNickname == props.Replyer ? "flex" : "none") : "none")) :
        (props.User === "allok" ? (props.UserInfoNickname == props.Replyer ? "flex" : "none") : "none")};
    cursor: pointer;
    align-items: center;
    font-size: 18px;
    margin: 0px 0px 10px 0px;
`

const DeleteReply = styled.div
    `
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


