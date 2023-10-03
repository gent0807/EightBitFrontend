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
import { BsPencilSquare } from "react-icons/bs";
import { BiLogoDevTo } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { clearLoginState, accessToken, point} from "../Redux/User";


Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

const SingleReComment = ({ ReComment }) => {
    const [originalReplyer, setOriginalReplyer] = useState("");
    const [originalRegdate, setOriginalRegdate] = useState("");
    const [reCommenter, setReCommenter] = useState("");
    const [content, setContent] = useState("");
    const [regdate, setRegdate] = useState("");
    const [updatedate, setUpdatedate] = useState("");
    const [likecount, setLikecount] = useState(0);
    const [profileImagePath, setProfileImagePath] = useState("");
    const [reCommenterRole, setReCommenterRole] = useState("");
    const [reportMode, setReportMode] = useState(false);
    const [reCommentChangeValue, setReCommentChangeValue] = useState("");
    const [timecount, setTimecount] = useState("1시간");
    const [reCommentStatusDivHide, setReCommentStatusDivHide] = useState(true);
    const [updateMode, setUpdateMode] = useState(false);
    const [updateReCommentText, setUpdateReCommentText] = useState("");

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
        const getReCommenterProfileImagePath = (reCommenter) => {
            axios.get(`${ip}/Users/profileImgPath?nickname=${reCommenter}`, {

            },
                {

                })
                .then((res) => {
                    return res.data;
                })
                .then(data => {
                    setProfileImagePath(data);
                })

        }

        const getReCommenterRole = (reCommenter) => {
            axios.get(`${ip}/Users/role?nickname=${reCommenter}`, {

            },
                {

                })
                .then((res) => {
                    return res.data;
                })
                .then(data => {
                    setReCommenterRole(data);
                })

        }

        const getLikers=(reCommenter, regdate)=>{
            axios.get(`${ip}/Board/article/reply/reComment/likers?reCommenter=${reCommenter}&regdate=${regdate}`,{

            },
            {

            })
            .then((res)=>{
                return res.data;
            })
            .then((data)=>{
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

        setOriginalReplyer(ReComment.original_replyer);
        setOriginalRegdate(ReComment.original_regdate);
        setReCommenter(ReComment.reCommenter);
        setContent(ReComment.content);
        setRegdate(ReComment.regdate);
        setUpdatedate(ReComment.updatedate);
        setUpdateReCommentText(ReComment.content);
        setReCommentChangeValue("@" + ReComment.reCommenter + "\n");

        getReCommenterProfileImagePath(ReComment.reCommenter);
        getReCommenterRole(ReComment.reCommenter);
        getLikers(ReComment.reCommenter, ReComment.regdate);
    }, [replyText, reCommentText]);

    const registerReComment = async (e) => {
        e.preventDefault();

        if (reCommentChangeValue.length > 11) {
            await axios.post(`${ip}/Board/article/reply/reComment`, {
                original_replyer: originalReplyer,
                original_regdate: originalRegdate, 
                reCommenter: loginMaintain == "true" ? userInfo.nickName : user.nickname,
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
                    setReCommentText(data+"_register");
                    const pointUp= (/* f */) => {
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
                        });
                    }

                    pointUp();
                })

        }
        else if (reCommentChangeValue.length <= 11) {
            alert("댓글 내용을 입력해주세요.");
            return;
        }

    }


    const addLike = async (e) => {

        await axios.post(`${ip}/Board/article/reply/reComment/like/`, {
            liker:loginMaintain=="true" ? userInfo.nickName : user.nickname,
            reCommenter: reCommenter,
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
           likeMode.current=true;
        })
    }




    const reduceLike = async (e) => {
        if (likecount > 0) {
            await axios.delete(`${ip}/Board/article/reply/reComment/like/${loginMaintain=="true" ? userInfo.nickName : user.nickname}/${reCommenter}/${regdate}`, 
            {
                headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` }
            })
            .then(res => {
                return res.data;
            })
            .then(data => {
                /* regenerateAccessTokenOrLogout(res, reduceLike, e); */
                setLikecount(data.length);
                likeMode.current=false;
            })

        }
        else return;
    }
    

    const updateReComment = async (e) => {
        e.preventDefault();
        if (updateReCommentText.length > 11) {
            await axios.patch(`${ip}/Board/article/reply/reComment?reCommenter=${reCommenter}&regdate=${regdate}`,
            {
                content: updateReCommentText,
            },
            {
                headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` }
            })
            .then((res) => {
                /* regenerateAccessTokenOrLogout(res, updateReComment, e); */
                return res.data;
            })
            .then((data) => {
                setReCommentText(data+"_update");
                setContent(data);
                setUpdateMode(false);
            });           
        }

        else if (updateReCommentText.length <= 11) {
            alert("댓글을 입력해주세요.");
            return;
        }

    };


    

    const deleteReComment = async () => {
        const check = window.confirm("정말 삭제하시겠습니까?");
        if(check==true){
            await axios.delete(`${ip}/Board/article/reply/reComment/${reCommenter}/${regdate}/${loginMaintain=="true" ? userInfo.role : user.role}`, 
            
            {
                headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` }
            })
            .then((res) => {
                /* regenerateAccessTokenOrLogout(res, deleteReComment, e); */
                return res.data;
            })
            .then((data) => {
                setReCommentText(data+"_delete");
            })
        }
        else return;
        
    }

    const regenerateAccessTokenOrLogout = (res, f , e) => {
        if(res.status==403){
            axios.patch(`${ip}/Users/token/${loginMaintain == "true" ? userInfo.nickName : user.nickname}`,{

            },
            {
                headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` },
            })
            .then((res) =>{
                return res.data
            }
            )
            .then((data)=>{
                if(data=="invalid"){
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("loginMaintain");
                    dispatch(clearLoginState());
                    deleteRefreshToken("refreshToken");
                    window.alert("인증되지 않은 접근입니다.");
                    navigate('/Login');
                }
                else if(data=="accesstoken valid"){
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("loginMaintain");
                    dispatch(clearLoginState());
                    deleteRefreshToken("refreshToken");
                    window.alert("인증되지 않은 접근입니다.");
                    navigate('/Login');
                }
                else if(data=="accesstoken not matched user"){
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("loginMaintain");
                    dispatch(clearLoginState());
                    deleteRefreshToken("refreshToken");
                    window.alert("인증되지 않은 접근입니다.");
                    navigate('/Login');
                }
                else if(data=="refreshtoken invalid"){
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("loginMaintain");
                    dispatch(clearLoginState());
                    deleteRefreshToken("refreshToken");
                    window.alert("인증되지 않은 접근입니다.");
                    navigate('/Login');
                }
                else if(data=="refreshtoken expired"){
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("loginMaintain");
                    dispatch(clearLoginState());
                    deleteRefreshToken("refreshToken");
                    window.alert("로그인이 만료되었습니다.");
                    navigate('/Login');
                }
                else if(data=="refreshtoken not matched user"){
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("loginMaintain");
                    dispatch(clearLoginState());
                    deleteRefreshToken("refreshToken");
                    window.alert("인증되지 않은 접근입니다.");
                    navigate('/Login');
                }
                else{
                    const object={
                        accessToken: data,
                    };
                    if(loginMaintain=="true"){
                        userInfo.accessToken=data;
                    }
                    dispatch(accessToken(object));
                    f(e);
                }
            })
            return;
        }
        else if(res.status==200){
            return res.data
        } 
    }

    const deleteRefreshToken = (name) => {
        document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
    }

    const reportAbuse = async () => {
        axios.patch(`${ip}/Board/report/reComment/abuse?reCommenter=${reCommenter}&regdate=${regdate}`,{

        },{

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
        axios.patch(`${ip}/Board/report/reComment/19?reCommenter=${reCommenter}&regdate=${regdate}`,{

        },{

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
        axios.patch(`${ip}/Board/report/reComment/incoporate?reCommenter=${reCommenter}&regdate=${regdate}`,{

        },{

        })
        .then((res) => {
            return res.data;
        })
        .then((data) => {
            alert("신고가 접수되었습니다.");
            setReportMode(false);
        })
    }




    return (
        <UserReCommentBox key={ReComment.id}>
            <div style={{ display: updateMode === true ? "none" : "block" }}>
                <ReCommentUserProfileBox>
                    <ReCommentUserBox>
                        <ReCommentUserProfile src={localStorage.getItem("profileImageDir") + profileImagePath} />
                        <ReCommentInformationAllBox>
                            <div style={{ display: "flex" }}>
                                <UserNicknameText>{reCommenter}</UserNicknameText>
                                <BiLogoDevTo size={21} style={{ margin: "0px 0px 0px 2px", display: reCommenterRole === "DEVELOPER" ? "block" : "none" }}></BiLogoDevTo>
                                {regdate == updatedate ? "" :
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
                        <Regdate>{dayjs(regdate).format("YYYY-MM-DD HH:mm")}</Regdate>
                    </div>
                </ReCommentUserProfileBox>
                <ReCommentInformationBox>
                    <ReCommentText>{content}</ReCommentText>
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
                            onClick={() => setOnReplyBtn(!onReplyBtn)}>
                            {onReplyBtn == false ? "댓글 쓰기" : "댓글 취소"}
                        </ReCommentreplyBtn>
                    </ReCommentreplyAllBox>
                    <div>
                        <ReCommentreplyLikeAllBox>
                            <ReCommentreplyLikeBtn
                                onClick={() => { likeMode.current === false ? addLike() : reduceLike() }}>
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
                                UserInfoRole={userInfo == null ?
                                    (user.login_state === "allok" ?
                                        user.role : null) : userInfo.role}
                                ReCommenter={reCommenter}
                                onClick={() => { setReCommentStatusDivHide(!reCommentStatusDivHide) }}><SlOptions />
                            </OptionBox>
                        </ReCommentreplyLikeAllBox>
                        <SettingReplyStatusDiv ReCommentStatusDivHide={reCommentStatusDivHide}>
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
                                    ReCommenter={reCommenter}
                                    onClick={() => {
                                        setReCommentStatusDivHide(true);
                                        setUpdateMode(true);
                                    }}>
                                    <span>
                                        <BsPencilSquare size={20} style={{ margin: "0px 10px -5px 0px" }} />
                                        수정하기
                                    </span>
                                </UpdateReply>
                                <DeleteReply 
                                    onClick={deleteReComment}
                                >
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
    display: ${props => props.LoginMaintain == null ? "none" : props.LoginMaintain == "true" ? (props.UserInfo == null ? "none" : (props.UserInfoState === "allok" ? (props.UserInfoNickname == props.ReCommenter ? "flex" : "none") : "none")) :
        (props.User === "allok" ? (props.UserInfoNickname == props.ReCommenter ? "flex" : "none") : "none")};
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
    display: ${props => props.LoginMaintain == null ? "none" : props.LoginMaintain == "true" ? (props.UserInfo == null ? "none" : (props.UserInfoState === "allok" ? (props.UserInfoNickname == props.ReCommenter || props.UserInfoRole == "ADMIN" ? "block" : "none") : "none")) :
        (props.User === "allok" ? (props.UserInfoNickname == props.ReCommenter || props.UserInfoRole == "ADMIN" ? "block" : "none") : "none")};
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
