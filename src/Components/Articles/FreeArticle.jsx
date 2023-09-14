import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {BsHandThumbsUpFill} from "react-icons/bs";
import {BsHandThumbsUp} from "react-icons/bs";
import dayjs from "dayjs";




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
    const [InformationImage, setInformationImage]=useState([
        {
            id : 1,
            src : "http://localhost:8033/EightBitBackend/resources/Users/seopseop/file/image/image.png",
        }
    ]);
    const navigate=useNavigate();
    const ip=localStorage.getItem("ip");
    const user=useSelector(state=>state.user);
    const [showButton, setShowButton]=useState("display:block");
    const loginMaintain=localStorage.getItem("loginMaintain");
    let userInfo=localStorage.getItem("userInfo");
    userInfo=JSON.parse(userInfo);
    let likeMode=useRef(false);


 
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
        await axios.patch(`${ip}/Board/article/like/up?writer=${writer}&regdate=${regdate}`,{

        },
        {

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

    const replyChange=(e)=>{
        setReplyChangeValue(e.target.value);
    }
    
    return(
        <FreeArticleBox>
            <UserBox>
            <UserinformationBox>
            <UserProfileBox>
            <UserProfile src={localStorage.getItem("profileImageDir")+profileImagePath} style={{width:"70px", height:"70px", borderRadius:"26px"}}/>
            <WriteViewBox>
            <WriterText>{writer}</WriterText>
            <LikeViewBox>
            <LikeText>좋아요 수 : {likecount}</LikeText>
            <ViewText>조회 수 : {visitcnt}</ViewText>
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
            <TitleText>{title}</TitleText>
            <InformationAllBox>
            <InformationText>{content}</InformationText>
            {InformationImage.length > 0 &&
                        InformationImage.map(Image => { 
                                return (
                                    <InformaionImageBox key={Image.id} src={Image.src} style={{width:"70px", height:"70px", borderRadius:"26px"}}/>
                                );
                        })
                    }
            </InformationAllBox>
            </InformationBox>
            <EditAllBox>
                <LikeBtn  LoginMaintain={loginMaintain} UserInfo={userInfo==null ? null : userInfo.loginState} User={user.login_state} onClick={ () => {likeMode.current === false ? countUpLike() : countDownLike()}}>{likeMode.current === false ? <BsHandThumbsUp/> : <BsHandThumbsUpFill/>}</LikeBtn>

                <Link to={`/UpdateBoard/${writer}/${regdate}`} style={{display:loginMaintain == null  ? "none" : loginMaintain=="true" ? (userInfo==null ? "none" : (userInfo.loginState==="allok"? (userInfo.nickName==writer? "block" :"none" ): "none" )):
                (user.login_state==="allok" ? (user.nickname==writer ? "block":"none" ):"none" )}}>수정</Link> 

                <DeleteBtn LoginMaintain={loginMaintain} User={user.login_state} UserInfo={userInfo} UserInfoState={userInfo == null ? null : userInfo.loginState} UserInfoNickname={userInfo==null? null : userInfo.nickName} Writer={writer} onClick={deleteArticle}>삭제</DeleteBtn>
                <Link to="/FreeBoard">목록</Link>
            </EditAllBox>
            <form style={{display:loginMaintain == null  ? "none" : loginMaintain=="true" ? (userInfo==null ? "none" : (userInfo.loginState==="allok"? (userInfo.nickName==writer? "block" :"none" ): "none" )):
            (user.login_state==="allok" ? (user.nickname==writer ? "block":"none" ):"none" )}} onSubmit={registerReply}>
                <textarea placeholder='댓글 내용' onChange={replyChange} value={replyChangeValue}></textarea>
                <input type="button" value="댓글 등록"/>  
            </form>
        </FreeArticleBox >
    );
}   

export default FreeArticle;

const InformaionImageBox = styled.img
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
    font-size: 45px;
    margin: -8px 0px 0px 0px;
`

const EditAllBox = styled.div
`
    display: flex;
    font-size: 30px;
    justify-content: end;
    a{
        margin: 0px 0px 0px 13px;
        text-decoration: none;
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

const TitleText = styled.h1
`

`

const InformationText = styled.span
`
    font-size: 20px;
`

const InformationAllBox = styled.div
`
    max-height: 800px;
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
    background: black;
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