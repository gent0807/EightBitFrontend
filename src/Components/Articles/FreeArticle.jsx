import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";




const FreeArticle = () => {
    const {writer}=useParams();
    const {regdate}=useParams();
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [updatedate, setUpdatedate]=useState("");
    const [visitcnt, setVisitcnt]=useState(0);
    const [likecount, setLikecount]=useState(0);
    const [profileImagePath, setProfileImagePath]=useState("");
    
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
    
    return(
        <FreeArticleBox>
            <UserBox>
            <UserinformationBox>
            <UserProfileBox>
            <UserProfile src={localStorage.getItem("profileImageDir")+profileImagePath} style={{width:"70px", height:"70px", borderRadius:"26px"}}/>
            <WriteViewBox>
            <WriterText>작성자 : {writer}</WriterText>
            <LikeViewBox>
            <LikeText>좋아요 수 : {likecount}</LikeText>
            <ViewText>조회 수 : {visitcnt}</ViewText>
            </LikeViewBox>
            </WriteViewBox>
            </UserProfileBox>
            <DayBox>
            <RegdateText>등록일 : {regdate}</RegdateText>
            <EditText>수정일 : {updatedate}</EditText>  
            </DayBox>
            </UserinformationBox>
            </UserBox>
            <InformationBox>
            <TitleText>{title}</TitleText>
            <InformationAllBox>
            <InformationText>{content}</InformationText>
            </InformationAllBox>
            </InformationBox>
            <EditAllBox>
                <input type="button" style={{display:loginMaintain==null ? "none":(loginMaintain=="true" ? (userInfo.loginState==="allok" ? "block":"none"):(user.login_state==="allok" ? "block":"none"))}} onClick={ () => {likeMode.current === false ? countUpLike() : countDownLike()}} value="좋아요"/>
                <Link to={`/UpdateBoard/${writer}/${regdate}`} style={{display:loginMaintain == null  ? "none" : loginMaintain=="true" ? (userInfo==null ? "none" : (userInfo.loginState==="allok"? (userInfo.nickName==writer? "block" :"none" ): "none" )):
                (user.login_state==="allok" ? (user.nickname==writer ? "block":"none" ):"none" )}}>수정</Link> 
                <input type="button" style={{display:loginMaintain == null  ? "none" : loginMaintain=="true" ? (userInfo==null ? "none" : (userInfo.loginState==="allok"? (userInfo.nickName==writer? "block" :"none" ): "none" )):
                (user.login_state==="allok" ? (user.nickname==writer ? "block":"none" ):"none" )}} onClick={deleteArticle} value="삭제"></input>
                <Link to="/FreeBoard">목록</Link>
            </EditAllBox>
        </FreeArticleBox >
    );
}   

export default FreeArticle;

const EditAllBox = styled.div
`
    display: flex;
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
    margin: 0px 8px 0px 0px;
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

`

const WriteViewBox = styled.div
`
    margin: 0px 0px 0px 11px;
`

const InformationBox = styled.div
`
    display: flex;
    flex-direction: column;
    margin: 0px 0px 20px 0px;
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
`

const UserProfile = styled.img
`

`

const UserProfileBox = styled.div
`
    display: flex;
    align-items: center;
`

const DayBox = styled.div
`
    font-size: 20px;
    display: flex;
    align-items: end;
`