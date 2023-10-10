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
import SingleReply from "./Reply/SingleReply";
import { FiShare } from "react-icons/fi";
import { FcOpenedFolder } from "react-icons/fc";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { BiLogoDevTo } from "react-icons/bi";
import { RiKakaoTalkFill } from "react-icons/ri";
import { RiInstagramFill } from "react-icons/ri";
import Siren from "../../img/Siren/Siren.png";
import { clearLoginState, accessToken, point } from "../Redux/User";
import FreeReportModal from "./FreeReportModal";
import ReplyPagination from "./Reply/ReplyPagination";
import DeleteModal from "./DeleteModal";
import ReplyDeleteModal from "../Articles/Reply/ReplyDeleteModal"
import NotPage from "./NotPage";


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
    const [deleteMode, setDeleteMode] = useState(false);
    const [ReplyDeleteMode, setReplyDeleteMode] = useState(false);
    const [shareMode, setShareMode] = useState(false);
    const [fileDownloadMode, setFileDownloadMode] = useState(false);
    const [replyChangeValue, setReplyChangeValue] = useState("");
    const [replyChangeValue2, setReplyChangeValue2] = useState("");
    const [onReplyBtn, setOnReplyBtn] = useState(false);
    const [reCommentCount, setReCommentCount] = useState(0);
    const [selectedCommentIndex, setSelectedCommentIndex] = useState(0);
    const [ModalReplyDeleteRegdate, setModalReplyDeleteRegdate ] = useState("");
    const [ModalReplyDeleteReplyer, setModalReplyDeleteReplyer ] = useState("");
    const [ModalReplyDeleteSetToggleState, setModalReplyDeleteSetToggleState ] = useState("");
    const [ModalReplyDeleteToggleState, setModalReplyDeleteToggleState ] = useState("");
    const [ModalReplyDeleteId, setModalReplyDeleteId ] = useState("");

    const FolderRef = useRef(null);
    const ShareRef = useRef(null);

    const inputRef = useRef();
    const ip = localStorage.getItem("ip");

    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const loginMaintain = localStorage.getItem("loginMaintain");
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);

    const [toggleState, setToggleState] = useRecoilState(toggle);

    const [Comments, setComments] = useState([]);

    const [InformationImage, setInformationImage] = useState([
        {
            id: 1,
            src: `${ip}/resources/board/article/nomalfiles/image.png`,
        }
    ]);

    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;


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
        if (Comments.length > 0) {
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
        else if (Comments.length === 0) {
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
        if (Comments.length > 0) {
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
        else if (Comments.length === 0) {
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

    const editComment = (commentId, editValue) => {
        let newComments = Comments.map((item) => {
            if (item.id === commentId) {
                item.content = editValue;
            }
            return item;
        });
        console.log("-----------------------------");
        console.log(newComments);
        console.log("-----------------------------");

        setComments(newComments);
    };


    const deleteComment = (commentId) => {
        let newComments = Comments.filter(item => item.id !== commentId);
        setComments(newComments);
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
                    setReplyChangeValue("");
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
                            })
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

    console.log(replyChangeValue, replyChangeValue.length)

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

    const kakaoShare = async () => {
        setShareMode(false);
    }

    const instagramShare = async () => {
        setShareMode(false);
    }

    const downloadFile = async () => {
        setFileDownloadMode(false);
    }

    const Floderhandle = () => {
        setFileDownloadMode(!fileDownloadMode);
        setShareMode(false);
    }

    const Sharehandle = () => {
        setShareMode(!shareMode);
        setFileDownloadMode(false);
    }

    useEffect(() => {
        function handleOuside(e) {
            if (FolderRef.current && !FolderRef.current.contains(e.target)) {
                setFileDownloadMode(false);
            }
        };

        if (!fileDownloadMode) {
            document.addEventListener("click", handleOuside);
        }
        return () => {
            document.removeEventListener("click", handleOuside);
        };
    }, [FolderRef]);

    useEffect(() => {
        function handleOuside(e) {
            if (ShareRef.current && !ShareRef.current.contains(e.target)) {
                setShareMode(false);
            }
        };

        if (!shareMode) {
            document.addEventListener("click", handleOuside);
        }
        return () => {
            document.removeEventListener("click", handleOuside);
        };
    }, [ShareRef]);

    console.log( "삭제되는 reply, regdate",ModalReplyDeleteReplyer,ModalReplyDeleteRegdate);

    return (
        <FreeArticleBox>

            <FreeReportModal
                ReportMode={reportMode}
                setReportMode={setReportMode}
            />

            <UserBox>
                <UserinformationBox>
                    <UserProfileBox>
                        <UserProfile src={localStorage.getItem("profileImageDir") + profileImagePath} />
                        <WriteViewBox>

                            <Correction>
                                <WriterText>{writer}</WriterText>
                                <CorrectionIcon writerRole={writerRole}>
                                    <BiLogoDevTo />
                                </CorrectionIcon>

                                {regdate == updatedate ? "" :
                                    <CorrectionTextBox>
                                        <CorrectionTextBoxIcon>
                                            <AiFillCheckCircle />
                                        </CorrectionTextBoxIcon>
                                        <CorrectionText>
                                            수정됨
                                        </CorrectionText>
                                    </CorrectionTextBox>}

                            </Correction>

                            <LikeViewBox>
                                <LikeViewIcon>
                                    <BsHandThumbsUp />
                                </LikeViewIcon>

                                <LikeText>{likecount}</LikeText>

                                <LikeBtnDot>
                                    <BsDot />
                                </LikeBtnDot>

                                <ViewIcon>
                                    <AiOutlineEye />
                                </ViewIcon>

                                <ViewText>{visitcnt}</ViewText>

                                <LikeBtnDot>
                                    <BsDot />
                                </LikeBtnDot>

                                <ReplyIcon>
                                    <AiOutlineComment />
                                </ReplyIcon>

                                <ReplyText>{Comments.length + reCommentCount}</ReplyText>

                            </LikeViewBox>

                        </WriteViewBox>

                    </UserProfileBox>

                    <ReportAllBox>
                        <RedateBox>
                            <ReportAllBoxText>신고</ReportAllBoxText>
                            <SirenImg src={Siren} onClick={() => { setReportMode(!reportMode) }} />
                        </RedateBox>

                        <DayBox>
                            <RegdateText>등록일 : {dayjs(regdate).format("YY.MM.DD hh:mm")}</RegdateText>
                            <DayBoxBar></DayBoxBar>
                            <EditText>수정일 : {dayjs(updatedate).format("YY.MM.DD hh:mm")}</EditText>
                        </DayBox>

                    </ReportAllBox>

                </UserinformationBox>
            </UserBox>
            <InformationBox>
                <InformationAllBox>
                    <TitleBox>
                        <TitleText>{title}</TitleText>
                        <ShareArea>

                            <FloderBox ref={FolderRef}>
                                <FloderBoxIcon>
                                    <FcOpenedFolder
                                        onClick={
                                            () => {
                                                Floderhandle()
                                            }
                                        } />
                                </FloderBoxIcon>

                                <FloderMenu fileDownloadMode={fileDownloadMode}>
                                    <Floderli><FloderText>첨부파일</FloderText></Floderli>
                                </FloderMenu>
                            </FloderBox>

                            <ShareBox ref={ShareRef}>
                                <ShareBoxIcon>
                                    <FiShare
                                        onClick={
                                            () => {
                                                Sharehandle()
                                            }} />
                                </ShareBoxIcon>

                                <ShareMenu ShareMode={shareMode}>
                                    <Shareli>
                                        <RiKakaoTalkFill />
                                        <ShareText>kakao</ShareText>
                                    </Shareli>

                                    <Shareli>
                                        <RiInstagramFill />
                                        <ShareText>instagram</ShareText>
                                    </Shareli>
                                </ShareMenu>
                            </ShareBox>

                        </ShareArea>

                    </TitleBox>
                    <TitleLine></TitleLine>
                    <Information dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />

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
                                <CommentUserProfile src={loginMaintain == "true" ? localStorage.getItem("profileImageDir") + userInfo.profileImgPath : localStorage.getItem("profileImageDir") + user.profile_img_path} />
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
                    to='/UpdateBoard' state={{ writer: writer, regdate: regdate, title: title, content: content }}
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

                <DeleteModal
                    setDeleteMode={setDeleteMode}
                    deleteMode={deleteMode}
                    regdate={regdate}
                    writer={writer}
                    loginMaintain={loginMaintain}
                    userInfo={userInfo}
                    user={user}
                />

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
                    onClick={() => setDeleteMode(!deleteMode)}
                >
                    삭제
                </DeleteBtn>

                <Link to="/FreeBoard">목록</Link>

            </EditAllBox>

            <CommentLine></CommentLine>

            <ReplyDeleteModal
                setReplyDeleteMode={setReplyDeleteMode}
                ReplyDeleteMode={ReplyDeleteMode}
                loginMaintain={loginMaintain}
                userInfo={userInfo}
                user={user}
                deleteComment={deleteComment}
                regdate={ModalReplyDeleteRegdate}
                replyer={ModalReplyDeleteReplyer}
                setToggleState={setModalReplyDeleteSetToggleState}
                toggleState={ModalReplyDeleteToggleState}
                id={ModalReplyDeleteId}
            />

            <CommentBox>
                {Comments.length === 0 && <NotPage />}
                {Comments.length > 0 &&
                    Comments.slice(offset, offset + limit).map(Comment => {
                        const commentId = Comment.id;
                        return (
                            <SingleReply
                                key={commentId}
                                Comment={Comment}
                                reCommentCount={reCommentCount}
                                isEditing={commentId === selectedCommentIndex ? true : false}
                                setReCommentCount={setReCommentCount}
                                setSelectedCommentIndex={setSelectedCommentIndex}
                                addComment={addComment}
                                editComment={editComment}
                                deleteComment={deleteComment}

                                setModalReplyDeleteRegdate={setModalReplyDeleteRegdate}
                                setModalReplyDeleteReplyer={setModalReplyDeleteReplyer}

                                setModalReplyDeleteSetToggleState={setModalReplyDeleteSetToggleState}
                                setModalReplyDeleteToggleState={setModalReplyDeleteToggleState}

                                setModalReplyDeleteId={setModalReplyDeleteId}
                                
                                setReplyDeleteMode={setReplyDeleteMode}
                                ReplyDeleteMode={ReplyDeleteMode}
                            />
                        );
                    })
                }

                <ReplyPagination
                    total={Comments.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                    offset={offset}
                />

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
                            <CommentUserProfile src={loginMaintain == "true" ? localStorage.getItem("profileImageDir") + userInfo.profileImgPath : localStorage.getItem("profileImageDir") + user.profile_img_path} />
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

const FloderText = styled.span
    `
    font-weight: bold;
`

const ShareText = styled.span
    `
    margin: 2px 0px 0px 9px;
    font-weight: bold;
`

const ShareBox = styled.div
    `
    display: flex;
    align-items: end;
`

const ShareBoxIcon = styled.i
    `
    cursor: pointer;

    svg
    {
        font-size: 30px;
    }
`

const FloderBox = styled.div
    `
    display: flex;
    align-items: end;
`

const ShareMenu = styled.ul
    `
    display: ${props => props.ShareMode ? "block" : "none"};
    padding: 10px;
    position: absolute;
    list-style: none;
    margin: 0px 0px -76px -45px;
    background: ${props => props.theme.backgroundColor};
    border: solid 1px ${props => props.theme.borderColor};
    border-radius: 10px;
`

const Shareli = styled.li
    `
    display: flex;
    cursor: pointer;
    svg
    {
        font-size: 22px;
    }
`

const FloderMenu = styled.ul
    `
    display: ${props => props.fileDownloadMode ? "block" : "none"};
    position: absolute;
    padding: 10px;
    list-style: none;
    margin: 0px 0px -44px -24px;
    border: solid 1px ${props => props.theme.borderColor};
    border-radius: 10px;
    background: ${props => props.theme.backgroundColor};
`

const Floderli = styled.li
    `
    cursor: pointer;
`

const FloderBoxIcon = styled.i
    `
    cursor: pointer;
    svg
    {
        font-size: 35px;
        margin: 0px 10px -6px 0px;
    }
`

const ReportAllBox = styled.div
    `
    margin: 0px 10px 0px 0px;
`

const ReportAllBoxText = styled.span
    `

`

const Correction = styled.div
    `
    display: flex;
`

const CorrectionTextBox = styled.div
    `
    display: flex;
    margin: 7.2px 0px 0px 2px;
`

const CorrectionTextBoxIcon = styled.i
    `
    svg
    {
        margin: 1px 3px 0px 3px;
    }
`

const CorrectionText = styled.span
    `

`

const CorrectionIcon = styled.i
    `
    display: ${props => props.writerRole === "DEVELOPER" ? "block" : "none"};
    svg
    {
        font-size: 25px;
        margin: 1.5px 0px 0px 0px;
    }
`

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

    .ql-snow .ql-picker.ql-expanded .ql-picker-options
    {
        display: block;
        margin-top: -133px;
        top: 100%;
        z-index: 1;
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

    .ql-tooltip.ql-editing.ql-flip
    {
        left: 0% !important;
        top: 86% !important;
    }

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

    .ql-tooltip.ql-editing.ql-flip
    {
        left: 0% !important;
        top: 80% !important;
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

const CommentLine = styled.hr
    `
    width: 100%;
    border: 0.1px solid ${props => props.theme.textColor};
`

const CommentArea = styled.div
    `
    display: grid;
    grid-template-columns: 0fr 3fr ;
    margin: 60px 0px 0px 0px;
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
    margin: 2px 0px 0px 5px;
    svg
    {
        font-size: 22px;
        margin: 0px 0px -4px 0px;
    }
`

const ViewIcon = styled.i
    `
    svg
    {
        margin: 0px 0px -7px -2px;
        font-size: 27px;
    }
`

const ViewText = styled.span
    `
    margin: 2px 0px 0px 5px; 
`

const ReplyText = styled.span
    `
    margin: 2px 0px 0px 5px;
`

const ReplyIcon = styled.i
    `
    svg
    {
        font-size: 27px;
        margin: -1px 0px -7px -2px;
    }
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
`

const LikeViewIcon = styled.i
    `
    font-size: 22px;
`

const LikeBtnDot = styled.i
    `
    svg
    {
        margin: 4px 1px 0px 0px;
    }
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
`


