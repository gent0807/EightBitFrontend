import axios from "axios";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {BsHandThumbsUpFill} from "react-icons/bs";
import {BsHandThumbsUp} from "react-icons/bs";
import {AiOutlineComment} from "react-icons/ai";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import { ImageDrop } from "quill-image-drop-module";
import SingleComment from "./SingleComment";

import Siren from "../../img/Siren/Siren.png";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

const FreeArticle = () => {
    const {writer}=useParams();
    const {regdate}=useParams();
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [updatedate, setUpdatedate]=useState("");
    const [visitcnt, setVisitcnt]=useState(0);
    const [likecount, setLikecount]=useState(0);
    const [profileImagePath, setProfileImagePath]=useState("");
    const [replyChangeValue, setReplyChangeValue ]=useState("");
    const [reCommentChangeValue, setReCommentChangeValue ]=useState("");
    const [showButton, setShowButton]=useState("display:block");
    const [replycnt, setReplycnt]=useState(0);
    const [InformationImage, setInformationImage]=useState([
        {
            id : 1,
            src : "http://218.155.175.176:8033/EightBitBackend/resources/Users/seopseop/file/image/image.png",
        }
    ]);


    const [Comment, setComment]=useState([
        {
            id : 1,
            writer: "올빼미",
            content: "ㅋㅋㅋㅋㅋ 개웃기네"
        },
        {
            id : 2,
            writer: "라따뚜이",
            content: "뭐라는 거임?"
        },
        {
            id : 3,
            writer: "누구세요",
            content: "누구세요??"
        }
    ]);


    const navigate=useNavigate();
    const ip=localStorage.getItem("ip");
    const user=useSelector(state=>state.user);
    const loginMaintain=localStorage.getItem("loginMaintain");
    let userInfo=localStorage.getItem("userInfo");
    userInfo=JSON.parse(userInfo);
    let likeMode=useRef(false);

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
      }),[]);

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
 
    useEffect( ()=>{

        const getUsreProfileImagePath= (writer)=>{
            axios.get(`${ip}/Users/profileImgPath?nickname=${writer}`,{
                
            },
            {

            })
            .then((res)=>{
              return res.data; 
            })
            .then(data=>{
                console.log(data);
                setProfileImagePath(data);
            })

        }

        axios.get(`${ip}/Board/article?writer=${writer}&regdate=${regdate}`,{
        	
        },
        {
        	
        })
        .then(res=>res.data
        )
        .then(data=>{
            setTitle(data.title);
            setContent(data.content);
            setUpdatedate(data.updatedate);
            setVisitcnt(data.visitcnt);
            setLikecount(data.likecount);
            console.log(data);
            getUsreProfileImagePath(writer);
        })
        .catch(err=>{
            navigate("/NotFound");
        })
    },[]);


    

    const deleteArticle=()=>{
        const check=window.confirm("정말 삭제하시겠습니까?");
        if(check==true){
            
            axios.delete(`${ip}/Board/article/${writer}/${regdate}`,{

            },{
                headers:{Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}`: `Bearer ${user.access_token}`}
            })
            .then(res=>{
                navigate("/FreeBoard");
            })
        }
        else{
            return;
        }

        
        
    }

    const getNewLikeCount=async ()=>{
        axios.get(`${ip}/Board/article/like?writer=${writer}&regdate=${regdate}`,{

        },{

        })
        .then(res=>{
            return res.data;
        })
        .then(data=>{
            setLikecount(data.likecount);
        })
    }

    const countUpLike=async (e)=>{
        if(loginMaintain != "true"){
            if(user.login_state!="allok"){
                alert("로그인이 필요합니다.");
                navigate("/Login");
                return;
            }
        }
           
        
        await axios.patch(`${ip}/Board/article/like/up?writer=${writer}&regdate=${regdate}`,{

        },
        {
            headers:{Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}`: `Bearer ${user.access_token}`}
        })
        .then(res=>{
            return res.data;       
        })
        .then(data=>{            
            likeMode.current=true;
            getNewLikeCount();
        })
    }


    

    const countDownLike=async()=>{
        if(likecount>0){
        await axios.patch(`${ip}/Board/article/like/down?writer=${writer}&regdate=${regdate}`,{ 
        },
        {
            headers:{Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}`: `Bearer ${user.access_token}`}
        })
        .then(res=>{
            return res.data;       
        })
        .then(data=>{
            likeMode.current=false;
            getNewLikeCount();
        })
       
        }
        else return;
    }

    const registerReply= async (e)=>{
        e.preventDefault();

        if(replyChangeValue.length>0){
            await axios.post(`${ip}/Board/freeReply`,{
                replyer:loginMaintain == "true" ? userInfo.nickName : user.nickname,
                content:replyChangeValue,
                original_writer:writer,
                original_regdate:regdate
            },
            {
                headers: {Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}`: `Bearer ${user.access_token}`},
            })
            .then(res=>{
                return res.data;
            })
            .then(data=>{
                
            })
        }
        else if(replyChangeValue.length==0){
            alert("댓글 내용을 입력해주세요.");
            return;
        }
    }
    
    return(
        <FreeArticleBox>
            <UserBox>
            <UserinformationBox>
            <UserProfileBox>
            <UserProfile src={localStorage.getItem("profileImageDir")+profileImagePath}/>
            <WriteViewBox>
            <WriterText>{writer}</WriterText>
            <LikeViewBox>
            <LikeText>좋아요 수 : {likecount}</LikeText>
            <ViewText>조회 수 : {visitcnt}</ViewText>
            <ReplyText>댓글 수 : {replycnt}</ReplyText>
            </LikeViewBox>
            </WriteViewBox>
            </UserProfileBox>
            <DayBox>
            <RegdateText>등록일 : {dayjs(regdate).format("YY.MM.DD hh:mm")}</RegdateText>
            <DayBoxBar></DayBoxBar>
            <EditText>수정일 : {dayjs(updatedate).format("YY.MM.DD hh:mm")}</EditText>  
            </DayBox>
            </UserinformationBox>
            </UserBox>
            <InformationBox>
            <InformationAllBox>
            <TitleBox>
            <TitleText>{title}</TitleText>
            </TitleBox>
            <TitleLine></TitleLine>
            <Information dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content)}}/>
            <br></br>
            <br></br>
            {InformationImage.length > 0 &&
                        InformationImage.map(Image => { 
                                return (
                                    <InformaionImageBox 
                                        key={Image.id} 
                                        src={Image.src} 
                                        style={{width:"70px", height:"70px", borderRadius:"26px"}}/>
                                );
                        })
            }
            </InformationAllBox>
            </InformationBox>
            <EditAllBox>
            <LikeBtn 
                LoginMaintain={loginMaintain} 
                UserInfo={userInfo==null? null : userInfo.loginState} 
                User={user.login_state} 
                onClick={ () => {likeMode.current === false ? countUpLike() : countDownLike()}}
            >
                {likeMode.current === false ? <BsHandThumbsUp/> : <BsHandThumbsUpFill/>}
            </LikeBtn>

            <Link 
                to={`/UpdateBoard/${writer}/${regdate}`} 
                style={{display:loginMaintain == null  ? "none" : loginMaintain=="true" ? 
                (userInfo==null ?
                "none" : (userInfo.loginState==="allok" ? 
                (userInfo.nickName==writer? "block" : "none" ) : "none" )) :
                (user.login_state==="allok" ?
                (user.nickname==writer ?
                "block":"none" ) : "none" )}}
            >
                수정
            </Link>

            <DeleteBtn 
                LoginMaintain={loginMaintain} 
                User={user.login_state} 
                UserInfo={userInfo} 
                UserInfoState={userInfo==null ?
                null : userInfo.loginState} 
                UserInfoNickname={userInfo==null ? 
                (user.login_state==="allok" ? 
                user.nickname : null) : userInfo.nickName} 
                Writer={writer} 
                onClick={deleteArticle}
            >
                삭제
            </DeleteBtn>

            <Link to="/FreeBoard">목록</Link>

            </EditAllBox>

        <CommentBox>
            {Comment.length > 0 &&
                Comment.map(Comment => { 
                    return (
                        <SingleComment
                            Comment={Comment}
                            profileImagePath={profileImagePath}
                        />
                            );
                    })
            }
            <br></br>
            <br></br>
            <CommentForm 
                LoginMaintain={loginMaintain} 
                UserInfo={userInfo} User={userInfo==null ? 
                null : userInfo.loginState}
                UserCheck={user.login_state} 
                UserNicknameCheck={user.nickname} 
                UserNickname={userInfo==null ? 
                null : userInfo.nickName}
                Writer={writer}
                onSubmit={registerReply}>   
                <CommentInputBox>
                    <Editer
                        placeholder="댓글을 입력해 주세요!"
                        value={replyChangeValue}
                        onChange={(content, delta, source, editor) => setReplyChangeValue(editor.getHTML())}
                        theme="snow" 
                        modules={modules}
                        formats={formats}>
                    </Editer>
                </CommentInputBox>
                <CommentBtn>등록</CommentBtn>
            </CommentForm>
        </CommentBox>
        </FreeArticleBox >
    );
}   

export default FreeArticle;

const Editer = styled(ReactQuill)
`
    display: flex;
    flex-direction: column;

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

`

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
    height: 1px;
    display: flex;
    background: black;
    margin: 12px 0px 12px 0px;
}
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
    width: 50px;
    height: 50px;
    border: solid 2px black;
    border-radius: 30px;
    margin: 21px 0px 0px 0px;
`

const UserCommentBox = styled.div
`

`

const CommentBox = styled.div
`

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

const CommentBtn = styled.button
`
    background: #55AAFF;
    outline: none;
    width: 100%;
    border-radius: 10px;
    margin: 10px 0px 0px 0px;
    border: solid 3px black;
    font-size: 19px;
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
`

const CommentForm = styled.form
`
    display: ${props => props.LoginMaintain == null  ? "none" : props.LoginMaintain=="true" ? (props.UserInfo==null ? "none" : (props.User==="allok"? "block" : "none" )):
    (props.UserCheck==="allok" ? "block" : "none" )};
`

const ReCommentForm=styled(CommentForm)
`
`
const ReCommentInputBox = styled(CommentInputBox)
`
`
const ReCommentBtn = styled(CommentBtn)
`
    width: 8%;
`

const CancelBtn=styled(ReCommentBtn)
`
    background: white;
    margin : 10px 10px 0px 0px;  
`

const InformaionImageBox = styled.img
`

`

const TitleBox = styled.div
`
`

const DeleteBtn = styled.div
`
    display: ${props => props.LoginMaintain == null  ? "none" : props.LoginMaintain=="true" ? (props.UserInfo==null ? "none" : (props.UserInfoState==="allok"? (props.UserInfoNickname==props.Writer? "block" :"none" ): "none" )):
    (props.User==="allok" ? (props.UserInfoNickname==props.Writer ? "block":"none" ):"none" )};
    cursor : pointer;
    margin: 0px 0px 0px 13px;
`

const LikeBtn = styled.div
`
    display: ${props => props.LoginMaintain==null ? "none":(props.LoginMaintain=="true" ? (props.UserInfo==="allok" ? "block":"none"):(props.User==="allok" ? "block":"none"))};
    cursor : pointer;
    color: orange;
    font-size: 37.2px;
    margin: -8px 0px 0px 0px;
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
    }
`

const WriterText = styled.span
`
    font-size: 27px;
`

const LikeText = styled.span
`
    margin: 0px 9px 0px 0px;
`

const ViewText = styled.span
`
    margin: 0px 9px 0px 0px;    
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

const EditText = styled.span
`

`

const TitleText = styled.span
`
    font-size: 28px;
    font-weight: bold;
`

const Information = styled.div
`
    font-size: 20px;
`

const InformationAllBox = styled.div
`
    background: white;
    border-radius: 10px;
    padding: 10px;
    min-height: 200px;
    border: none;
    box-shadow: 0 0 0 3px ${(props) => props.theme.WriterBorder} inset;
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
    margin: 20px 0px 86px 0px;
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
    color: ${props => props.theme.textColor};
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
    border-radius: 26px;
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