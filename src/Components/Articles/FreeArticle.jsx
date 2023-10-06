import axios from "axios";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useRecoilState, useRecoilValue } from 'recoil';
import { toggle } from "./Toggle";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { BsHandThumbsUp } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import { ImageDrop } from "quill-image-drop-module";
import SingleReply from "./SingleReply";
import { FiShare } from "react-icons/fi";
import { FcOpenedFolder } from "react-icons/fc";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { BiLogoDevTo } from "react-icons/bi";
import { RiKakaoTalkFill } from "react-icons/ri";
import { RiInstagramFill } from "react-icons/ri";
import Siren from "../../img/Siren/Siren.png";
import { clearLoginState, accessToken, point } from "../Redux/User";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

const FreeArticle = () => {
    const { writer } = useParams();
    const { regdate } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [updatedate, setUpdatedate] = useState("");
    const [visitcnt, setVisitcnt] = useState(0);
    const [likecount, setLikecount] = useState(0);
    const [profileImagePath, setProfileImagePath] = useState("");
    const [writerRole, setWriterRole] = useState("");
    const [reportMode, setReportMode] = useState(false);
    const [shareMode, setShareMode] = useState(false);
    const [fileDownloadMode, setFileDownloadMode] = useState(false);
    const [replyChangeValue, setReplyChangeValue] = useState("");
    const [replyChangeValue2, setReplyChangeValue2] = useState("");
    const [onReplyBtn, setOnReplyBtn] = useState(false);
    const [reCommentCount, setReCommentCount] = useState(0);
    const [selectedCommentIndex, setSelectedCommentIndex] = useState(0);
    const inputRef = useRef();

    const navigate = useNavigate();
    const ip = localStorage.getItem("ip");
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const loginMaintain = localStorage.getItem("loginMaintain");
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);

    const [toggleState, setToggleState]=useRecoilState(toggle);

    const [Comments, setComments] = useState([]);

    const [InformationImage, setInformationImage] = useState([
        {
            id: 1,
            src: `${ip}/resources/board/article/nomalfiles/image.png`,
        }
    ]);


    let likeMode = useRef(false);
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

        const getUserProfileImagePath = (writer) => {
            axios.get(`${ip}/Users/profileImgPath?nickname=${writer}`, {

            },
                {

                })
                .then((res) => {
                    return res.data;
                })
                .then(data => {
                    setProfileImagePath(data.profileImgPath);
                })

        }


        const getWriterRole = (writer) => {
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

        const getLikers = (writer, regdate) => {
            axios.get(`${ip}/Board/article/likers?writer=${writer}&regdate=${regdate}`, {

            },
                {

                })
                .then(res => {
                    return res.data;
                })
                .then(data => {
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

        const getReCommentCount = (writer, regdate) => {
            axios.get(`${ip}/Board/article/totalcomment/count?writer=${writer}&regdate=${regdate}`, {

            },
                {

                })
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    setReCommentCount(data);
                })
        }

        const getComments = (writer, regdate) => {
            axios.get(`${ip}/Board/article/replies?original_writer=${writer}&original_regdate=${regdate}`, {
    
            },
                {
    
                })
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    setComments(data);
                })
        }



        axios.get(`${ip}/Board/article?writer=${writer}&regdate=${regdate}`, {

        },
            {

            })
            .then(res => res.data
            )
            .then(data => {
                setTitle(data.title);
                setContent(data.content);
                setUpdatedate(data.updatedate);
                setVisitcnt(data.visitcnt);
                getUserProfileImagePath(data.writer);
                getWriterRole(data.writer);
                getComments(data.writer, data.regdate);
                getLikers(data.writer, data.regdate);
                getReCommentCount(data.writer, data.regdate);
            })

    }, [toggleState]);

    const addLike = async (e) => {

        await axios.post(`${ip}/Board/article/like/`, {
            liker: loginMaintain == "true" ? userInfo.nickName : user.nickname,
            writer: writer,
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
            await axios.delete(`${ip}/Board/article/like/${loginMaintain == "true" ? userInfo.nickName : user.nickname}/${writer}/${regdate}`,
                {
                    headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` }
                })
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    setLikecount(data.length);
                    likeMode.current = false;
                })

        }
        else return;
    }

    const addComment = (data, Comments) => {
        if(Comments.length>0){
            const lastCmtIndex = Comments.length - 1;
            const addedCmtId = Comments[lastCmtIndex].id + 1;
            const newComment = {
            id: addedCmtId,
            original_writer: writer,
            original_regdate: regdate,
            replyer: loginMaintain == "true" ? userInfo.nickName : user.nickname,
            content: replyChangeValue,
            regdate: data.regdate,
            updatedate: data.updatedate,
            };
            setComments([...Comments, newComment]);
            setReplyChangeValue('');
        }
        else if(Comments.length===0){
            const addedCmtId = 1;
            const newComment = {
                id: addedCmtId,
                original_writer: writer,
                original_regdate: regdate,
                replyer: loginMaintain == "true" ? userInfo.nickName : user.nickname,
                content: replyChangeValue,
                regdate: data.regdate,
                updatedate: data.updatedate,
                };
            setComments([...Comments, newComment]);
            setReplyChangeValue('');
        }
       
    };

    const addComment2 = (data, Comments) => {
        if(Comments.length>0){
            const lastCmtIndex = Comments.length - 1;
            const addedCmtId = Comments[lastCmtIndex].id + 1;
            const newComment = {
            id: addedCmtId,
            original_writer: writer,
            original_regdate: regdate,
            replyer: loginMaintain == "true" ? userInfo.nickName : user.nickname,
            content: replyChangeValue2,
            regdate: data.regdate,
            updatedate: data.updatedate,
            };
            setComments([...Comments, newComment]);
            setReplyChangeValue2('');
        }
        else if(Comments.length===0){
            const addedCmtId = 1;
            const newComment = {
                id: addedCmtId,
                original_writer: writer,
                original_regdate: regdate,
                replyer: loginMaintain == "true" ? userInfo.nickName : user.nickname,
                content: replyChangeValue2,
                regdate: data.regdate,
                updatedate: data.updatedate,
                };
            setComments([...Comments, newComment]);
            setReplyChangeValue2('');
        }
    }

    const editComment = (commentId, editValue)=>{
        let newComments= Comments.map((item)=>{
            if(item.id===commentId){
                item.content=editValue;
            }
            return item;
        });
        console.log("-----------------------------");
        console.log(newComments);
        console.log("-----------------------------");

        setComments(newComments);
    };


    const deleteComment = (commentId) => {
        let newComments = Comments.filter(item=>item.id!==commentId);
        setComments(newComments);
    }

    const deleteArticle = (e) => {
        const check = window.confirm("정말 삭제하시겠습니까?");
        if (check == true) {
            axios.delete(`${ip}/Board/article/${writer}/${regdate}/${loginMaintain == "true" ? userInfo.role : user.role}`,
                {
                    headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` }
                })
                .then(res => {
                    /* regenerateAccessTokenOrLogout(res, deleteArticle, e); */
                    return res.data;
                })
                .then(data => {
                    navigate("/FreeBoard");
                });
        }
        else return;
    }

    const registerReply = async (e) => {
        e.preventDefault();
        if (replyChangeValue.length > 0) {
            await axios.post(`${ip}/Board/article/reply`, {
                original_writer: writer,
                original_regdate: regdate,
                replyer: loginMaintain == "true" ? userInfo.nickName : user.nickname,
                content: replyChangeValue,
            },
                {
                    headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` },
                })
                .then((res) => {
                    /* regenerateAccessTokenOrLogout(res, registerReply, e); */
                    return res.data;
                })
                .then((data) => {
                    setToggleState(!toggleState);
                    addComment(data, Comments);
                    const pointUp = (/* f */) => {
                        axios.patch(`${ip}/Users/point/up?writer=${loginMaintain == "true" ? userInfo.nickName : user.nickname}&point=5`,
                            {

                            },
                            {
                                headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` }
                            })
                            .then((res) => {
                                /*  f(res,pointUp,e) */
                                return res.data;
                            }
                            )
                            .then((data) => {
                                dispatch(point(data));
                                return;
                            });
                    }

                    pointUp();

                    return;

                });
        }
        else if (replyChangeValue.length == 0) {
            alert("댓글 내용을 입력해주세요.");
            return;
        }
    }

    const registerReply2 = async (e) => {
        e.preventDefault();
        if (replyChangeValue2.length > 0) {
            await axios.post(`${ip}/Board/article/reply`, {
                original_writer: writer,
                original_regdate: regdate,
                replyer: loginMaintain == "true" ? userInfo.nickName : user.nickname,
                content: replyChangeValue2
            },
                {
                    headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` },
                })
                .then((res) => {
                    /* regenerateAccessTokenOrLogout(res, registerReply2, e); */
                    return res.data;
                })
                .then((data) => {
                    addComment2(data, Comments);
                    setOnReplyBtn(false);
                    const pointUp = (/* f */) => {
                        axios.patch(`${ip}/Users/point/up?writer=${loginMaintain == "true" ? userInfo.nickName : user.nickname}&point=5`,
                            {

                            },
                            {
                                headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` }
                            })
                            .then((res) => {
                                /*  f(res,pointUp,e) */
                                return res.data;
                            }
                            )
                            .then((data) => {
                                dispatch(point(data));
                                return;
                            });
                    }

                    pointUp();

                    return;

                });
        }
        else if (replyChangeValue2.length == 0) {
            alert("댓글 내용을 입력해주세요.");
            return;
        }
    }

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

    const reportAbuse = () => {
        axios.patch(`${ip}/Board/report/article/abuse?writer=${writer}&regdate=${regdate}`, {

        }, {

        })
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                alert("신고가 접수되었습니다.");
                setReportMode(false);
            })
    }

    const report19 = async () => {
        axios.patch(`${ip}/Board/report/article/19?writer=${writer}&regdate=${regdate}`, {

        }, {

        })
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                alert("신고가 접수되었습니다.");
                setReportMode(false);
            })
    }

    const reportIncoporate = async () => {
        axios.patch(`${ip}/Board/report/article/incoporate?writer=${writer}&regdate=${regdate}`, {

        }, {

        })
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                alert("신고가 접수되었습니다.");
                setReportMode(false);
            })
    }

    const kakaoShare = async () => {
        setShareMode(false);
    }

    const instagramShare = async () => {
        setShareMode(false);
    }

    const downloadFile = async () => {
        setFileDownloadMode(false);
    }

    return (
        <FreeArticleBox>
            <UserBox>
                <UserinformationBox>
                    <UserProfileBox>
                        <UserProfile src={localStorage.getItem("profileImageDir") + profileImagePath} />
                        <WriteViewBox>
                            <div style={{ display: "flex" }}>
                                <WriterText>{writer}</WriterText>
                                <BiLogoDevTo size={25} style={{ margin: "1.5px 0px 0px 0px", display: writerRole === "DEVELOPER" ? "block" : "none" }}></BiLogoDevTo>
                                {regdate == updatedate ? "" :
                                    <div style={{ display: "flex", margin: "7.2px 0px 0px 2px" }}>
                                        <AiFillCheckCircle style={{ margin: "1px 3px 0px 3px" }} />
                                        수정됨
                                    </div>}

                            </div>
                            <LikeViewBox>
                                <LikeText><BsHandThumbsUp size={22} style={{ margin: "0px 0px -4px 0px" }}></BsHandThumbsUp> {likecount}</LikeText>
                                <BsDot style={{ margin: "4px 1px 0px 0px" }}></BsDot>
                                <ViewText><AiOutlineEye size={27} style={{ margin: "0px 0px -7px -2px" }}></AiOutlineEye> {visitcnt}</ViewText>
                                <BsDot style={{ margin: "4px 1px 0px 0px" }}></BsDot>
                                <ReplyText><AiOutlineComment size={27} style={{ margin: "0px 0px -7px -2px" }}></AiOutlineComment>{Comments.length + reCommentCount}</ReplyText>
                            </LikeViewBox>
                        </WriteViewBox>
                    </UserProfileBox>
                    <div style={{ margin: "0px 10px 0px 0px" }}>
                        <RedateBox>
                            신고
                            <SirenImg src={Siren} onClick={() => { setReportMode(!reportMode) }} />
                        </RedateBox>
                        <ReportBox ReportMode={reportMode}>
                            <div style={{ margin: "10px 10px 10px 10px", cursor: "pointer" }} onClick={reportAbuse}>
                                욕설/비방 신고
                            </div>
                            <div style={{ margin: "10px 10px 10px 10px", cursor: "pointer" }} onClick={report19}>
                                음란물 신고
                            </div>
                            <div style={{ margin: "10px 10px 10px 10px", cursor: "pointer" }} onClick={reportIncoporate}>
                                게시판 부적합 신고
                            </div>
                        </ReportBox>
                        <DayBox>
                            <RegdateText>등록일 : {dayjs(regdate).format("YY.MM.DD hh:mm")}</RegdateText>
                            <DayBoxBar></DayBoxBar>
                            <EditText>수정일 : {dayjs(updatedate).format("YY.MM.DD hh:mm")}</EditText>
                        </DayBox>
                    </div>

                </UserinformationBox>
            </UserBox>
            <InformationBox>
                <InformationAllBox>
                    <TitleBox>
                        <TitleText>{title}</TitleText>
                        <ShareArea>
                            <FcOpenedFolder size={35} style={{ margin: "0px 17px -4px 0px", cursor: "pointer" }} onClick={
                                () => {
                                    setFileDownloadMode(!fileDownloadMode);
                                    setShareMode(false);
                                }
                            } />
                            <FiShare size={30} style={{ cursor: "pointer" }} onClick={
                                () => {
                                    setShareMode(!shareMode);
                                    setFileDownloadMode(false);
                                }} />
                        </ShareArea>
                        <FileDownloadBox FileDownloadMode={fileDownloadMode}>
                            <div style={{ margin: "10px 10px 10px 10px", display: "flex", cursor: "pointer" }} onClick={downloadFile}>
                                첨부파일
                            </div>
                        </FileDownloadBox>
                        <ShareBox ShareMode={shareMode}>
                            <div style={{ margin: "10px 10px 10px 10px", display: "flex", cursor: "pointer" }} onClick={kakaoShare}>
                                <RiKakaoTalkFill size={22} style={{ margin: "0px 10px 0px 0px" }} />
                                kakao
                            </div>
                            <div style={{ margin: "10px 10px 10px 10px", display: "flex", cursor: "pointer" }} onClick={instagramShare}>
                                <RiInstagramFill size={22} style={{ margin: "0px 10px 0px 0px" }} />
                                instagram
                            </div>
                        </ShareBox>
                    </TitleBox>
                    <TitleLine></TitleLine>
                    <Information dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
                    <br></br>
                    {InformationImage.length > 0 &&
                        InformationImage.map(Image => {
                            return (
                                <InformaionImageBox
                                    key={Image.id}
                                    src={Image.src}
                                    style={{ width: "400px", height: "400px", borderRadius: "10px" }} />
                            );
                        })
                    }
                    <div style={{ height: "250px" }}>
                    </div>
                    <div style={{ display: "flex" }}>
                        <CommentreplyBtn2
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
                        </CommentreplyBtn2>
                    </div>

                    <div style={{ height: "70px" }}>
                    </div>
                    <CommentForm2
                        OnReplyBtn={onReplyBtn}
                        onSubmit={registerReply2}>
                        <CommentArea2>
                            <CommentProfile>
                                <CommentUserProfile src={loginMaintain=="true" ? localStorage.getItem("profileImageDir") + userInfo.profileImagePath : localStorage.getItem("profileImageDir") + user.profile_img_path} />
                            </CommentProfile>
                            <CommentInputBox>
                                <Editer2
                                    placeholder="여러분의 참신한 생각이 궁금해요. 댓글을 입력해주세요!"
                                    value={replyChangeValue2}
                                    onChange={(content, delta, source, editor) => setReplyChangeValue2(editor.getHTML())}
                                    modules={modules}
                                    formats={formats}>
                                </Editer2>
                            </CommentInputBox>
                        </CommentArea2>
                        <CommentBtnBox>
                            <CancelBtn type="button" onClick={() => { setOnReplyBtn(!onReplyBtn) }}>취소</CancelBtn>
                            <CommentBtn>댓글 쓰기</CommentBtn>
                        </CommentBtnBox>
                    </CommentForm2>
                </InformationAllBox>
            </InformationBox>
            {Comments.length > 0 ?
                <div style={{ display: "flex", fontSize: "20px", justifyContent: "start", margin: "0px 0px -22.5px 0px" }}>
                    {reCommentCount + Comments.length}개 댓글
                </div> : ""}
            <EditAllBox>
                <LikeBtn
                    LoginMaintain={loginMaintain}
                    UserInfo={userInfo == null ? null : userInfo.loginState}
                    User={user.login_state}
                    onClick={() => { likeMode.current === false ? addLike() : reduceLike() }}>
                    {likeMode.current === false ? <BsHandThumbsUp /> : <BsHandThumbsUpFill />}
                </LikeBtn>

                <Link
                    to='/UpdateBoard' state={{writer:writer, regdate:regdate, title:title, content:content}}
                    style={{
                        display: loginMaintain == null ? "none" : loginMaintain == "true" ?
                            (userInfo == null ?
                                "none" : (userInfo.loginState === "allok" ?
                                    (userInfo.nickName == writer ? "block" : "none") : "none")) :
                            (user.login_state === "allok" ?
                                (user.nickname == writer ?
                                    "block" : "none") : "none")
                    }}>
                    수정
                </Link>

                <DeleteBtn
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
                    Writer={writer}
                    onClick={deleteArticle}
                >
                    삭제
                </DeleteBtn>

                <Link to="/FreeBoard">목록</Link>

            </EditAllBox>

            <CommentLine></CommentLine>

            <CommentBox>
                {Comments.length > 0 &&
                    Comments.map(Comment => {
                        const commentId=Comment.id;
                        return (
                            <SingleReply
                                key={commentId}
                                Comment={Comment}
                                reCommentCount={reCommentCount}
                                isEditing={commentId===selectedCommentIndex? true : false}
                                setReCommentCount={setReCommentCount}
                                setSelectedCommentIndex={setSelectedCommentIndex}
                                addComment={addComment}
                                editComment={editComment}
                                deleteComment={deleteComment}
                            />
                        );
                    })
                }
                <br></br>
                <br></br>
                <CommentForm
                    LoginMaintain={loginMaintain}
                    UserInfo={userInfo} User={userInfo == null ?
                        null : userInfo.loginState}
                    UserCheck={user.login_state}
                    UserNicknameCheck={user.nickname}
                    UserNickname={userInfo == null ?
                        null : userInfo.nickName}
                    Writer={writer}
                    onSubmit={registerReply}>
                    <CommentArea>
                        <CommentProfile>
                            <CommentUserProfile src={loginMaintain == "true" ? localStorage.getItem("profileImageDir") + userInfo.profileImagePath : localStorage.getItem("profileImageDir") + user.profile_img_path} />
                        </CommentProfile>
                        <CommentInputBox>
                            <Editer
                                ref={inputRef}
                                placeholder="여러분의 참신한 생각이 궁금해요. 댓글을 입력해 주세요!"
                                value={replyChangeValue}
                                onChange={(content, delta, source, editor) => setReplyChangeValue(editor.getHTML())}
                                modules={modules}
                                formats={formats}>
                            </Editer>
                        </CommentInputBox>
                    </CommentArea>

                    <CommentBtnBox>
                        <CommentBtn>댓글 쓰기</CommentBtn>
                    </CommentBtnBox>
                </CommentForm>
            </CommentBox>
        </FreeArticleBox >
    );
}

export default FreeArticle;

const ReCommentBtnBox = styled.div
    `
    display: flex;
    justify-content: end;
`

const CommentBtnBox = styled.div
    `
    display: flex;
    justify-content: end;
`

const Editer = styled(ReactQuill)
    `
    display: flex;
    flex-direction: column;

    .ql-editor.ql-blank::before{
        color: ${props => props.theme.textColor};
    }

    .ql-editor
    {
        margin: 0px -2px -2px 0px;
        min-height: 200px;
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
        margin: 190px 0px 0px 150px;
    }

`

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
        min-height: 140px;
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

    .quill > .ql-container > .ql-editor.ql-blank::before{
        color: ${props => props.theme.textColor};
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
        margin: 50px 0px 0px 150px;
    }
`

const CommentreplyBox = styled.div
    `
    display: flex;
    justify-content: space-between;
    margin: 22px 10px 10px 67px;
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

const CommentreplyBtn2 = styled(CommentreplyBtn)
    `
    margin: 0px 0px 0px 0px;
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

const CommentLine = styled.hr
    `
    width: 100%;
    border: 0.1px solid ${props => props.theme.textColor};
`

const CommentUserBox = styled.div
    `
    display: flex;
`

const CommentArea = styled.div
    `
    display: grid;
    grid-template-columns: 0fr 3fr ;
`

const CommentArea2 = styled.div
    `
    display: grid;
    grid-template-columns: 0fr 3fr ;
`

const CommentProfile = styled.div
    `
    margin: -20px 22px 0px 0px;
`


const CommentUserProfile = styled.img
    `
    width: 43px;
    height: 43px;
    border: none;
    border-radius: 30px;
    margin: 21px 0px 0px 0px;
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
    background: ${props => props.theme.textColor};
    margin: 15px 0px 15px 0px;
`

const CommentBox = styled.div
    `
    
`

const CommentInputBox = styled.div
    `
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 2fr;
    border: solid 3px ${props => props.theme.textColor};
    border-radius: 10px;
    overflow: hidden;
    
`

const CommentBtn = styled.button
    `
    background: #55AAFF;
    outline: none;
    width: 9%;
    border-radius: 10px;
    margin: 10px 0px 0px 0px;
    border: solid 3px black;
    font-size: 19px;
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
`

const CancelBtn = styled(CommentBtn)
    `
    width: 7%;
    background: white;
    margin : 10px 10px 0px 0px;
`

const CommentForm = styled.form
    `
    display: ${props => props.LoginMaintain == null ? "none" : props.LoginMaintain == "true" ? (props.UserInfo == null ? "none" : (props.User === "allok" ? "block" : "none")) :
        (props.UserCheck === "allok" ? "block" : "none")};
`
const CommentForm2 = styled(CommentForm)
    `
    display: ${props => props.OnReplyBtn == false ? "none" : "block"};
`

const InformaionImageBox = styled.img
    `

`

const TitleBox = styled.div
    `
    display: flex;
    justify-content: space-between;
`

const DeleteBtn = styled.div
    `
    display: ${props => props.LoginMaintain == null ? "none" : props.LoginMaintain == "true" ? (props.UserInfo == null ? "none" : (props.UserInfoState === "allok" ? (props.UserInfoNickname == props.Writer || props.UserInfoRole == "ADMIN" ? "block" : "none") : "none")) :
        (props.User === "allok" ? (props.UserInfoNickname == props.Writer || props.UserInfoRole == "ADMIN" ? "block" : "none") : "none")};
    cursor : pointer;
    margin: 0px 0px 0px 13px;
`

const LikeBtn = styled.div
    `
    display: ${props => props.LoginMaintain == null ? "none" : (props.LoginMaintain == "true" ? (props.UserInfo === "allok" ? "block" : "none") : (props.User === "allok" ? "block" : "none"))};
    cursor : pointer;
    color: orange;
    font-size: 28.2px;
    margin: -3.5px 0px 0px 0px;
`

const EditAllBox = styled.div
    `
    display: flex;
    font-size: 22px;
    justify-content: end;
    color: ${props => props.theme.textColor};
    a{
        margin: 0px 0px 0px 13px;
        text-decoration: none;
        color: ${props => props.theme.textColor};
    }
`



const WriterText = styled.span
    `
    font-size: 24.5px;
    cursor: pointer;
    margin: 0px 0px 6.2px 0px;
`

const LikeText = styled.span
    `
    margin: 2px 2px 0px 0px;
`

const ViewText = styled.span
    `
    margin: 0px 2px 0px 0px;    
`

const ReplyText = styled.span
    `
`

const RegdateText = styled.span
    `
    @media (min-width:666px) and (max-width:910px)
    {
        margin: 0px 0px 0px 0px;
    }
`

const RedateBox = styled.div
    `
    display: flex;
    align-items: end;
    justify-content: end;
    cursor: pointer;
    margin: 0px 0px 17px 0px;
`

const ReportBox = styled.div
    `
    border: 1px solid ${props => props.theme.textColor};
    border-radius: 10px;
    position: absolute;
    z-index: 2;
    background: ${props => props.theme.backgroundColor};
    margin: 0px 0px 0px 260px;
    display: ${props => props.ReportMode == false ? "none" : "block"};
    
`

const EditText = styled.span
    `

`

const TitleText = styled.span
    `
    font-size: 45px;
    font-weight: bold;
`

const Information = styled.div
    `
    font-size: 30px;
`

const InformationAllBox = styled.div
    `
    border-radius: 10px;
    padding: 10px;
    min-height: 200px;
    border: none;
    color: ${props => props.theme.textColor};
`

const FreeArticleBox = styled.div
    `
    margin: 20px;
`

const WriteViewBox = styled.div
    `
    margin: 0px 0px 0px 11px;
`

const InformationBox = styled.div
    `
    display: flex;
    flex-direction: column;
    margin: 20px 0px 50px 0px;
    word-break: break-all;
`

const LikeViewBox = styled.div
    `
    display: flex;
    font-size: 20px;
    margin: 9px 0px 0px 0px;
`

const UserBox = styled.div
    `

`

const UserinformationBox = styled.div
    `
    display: flex;
    justify-content: space-between;
    margin: 0px 0px 10px 0px;
    @media (min-width:250px) and (max-width:666px)
    {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0px 0px 10px 0px;
    }
`

const UserProfile = styled.img
    `
    width: 70px;
    height: 70px;
    border-radius: 32px;
    cursor: pointer;
`

const UserProfileBox = styled.div
    `
    display: flex;
    align-items: center;
    @media (min-width:250px) and (max-width:666px)
    {
        display: flex;
        align-items: center;
        justify-content: center;
        margin : 0px 0px 10px 0px;
    }
    
`

const DayBoxBar = styled.div
    `
    display: inline-block;
    width: 2px;
    height: 11px;
    background: ${props => props.theme.textColor};
    margin: 0px 7px 6px 7px;
    @media (min-width:667px) and (max-width:910px)
    {
        display: none;
    };
    @media (min-width:250px) and (max-width:666px)
    {
        margin: 0px 7px 3px 7px;
    };
`

const DayBox = styled.div
    `
    font-size: 18px;
    display: flex;
    align-items: end;
    @media (min-width:667px) and (max-width:910px)
    {
        flex-direction: column;
        justify-content: end;
        align-items: center;
    };
    @media (min-width:250px) and (max-width:666px)
    {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

const ShareArea = styled.div
    `
    display: flex;
    align-items: end;
`

const FileDownloadBox = styled.div
    `
    border: 1px solid ${props => props.theme.textColor};
    border-radius: 10px;
    position: absolute;
    z-index: 2;
    margin: 60px 0px 0px 1112px;
    background: ${props => props.theme.backgroundColor};
    font-size: 18px;
    display: ${props => props.FileDownloadMode == false ? "none" : "block"};
`

const ShareBox = styled.div
    `
    border: 1px solid ${props => props.theme.textColor};
    border-radius: 10px;
    position: absolute;
    z-index: 2;
    margin: 60px 0px 0px 1132px;
    background: ${props => props.theme.backgroundColor};
    font-size: 18px;
    display: ${props => props.ShareMode == false ? "none" : "block"};
`

