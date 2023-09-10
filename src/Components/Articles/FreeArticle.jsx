import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const FreeArticle = () => {
    const {writer}=useParams();
    const {regdate}=useParams();
    const [article,setArticle]=useState([]);
    const [likecount,setLikeCount]=useState(0);
    const navigate=useNavigate();
    const ip=localStorage.getItem("ip");
    const user=useSelector(state=>state.user);
    const [showButton, setShowButton]=useState("display:block");
    const loginMaintain=localStorage.getItem("loginMaintain");
    let userInfo=localStorage.getItem("userInfo");
    userInfo=JSON.parse(userInfo);

    let likeMode=useRef(false);

    console.log(loginMaintain);
    console.log(userInfo);
    console.log(user);

    console.log("좋아요 카운트 :"+likecount);

    useEffect( ()=>{
        axios.get(`${ip}/Board/article?writer=${writer}&regdate=${regdate}`,{
        	
        },
        {
        	
        })
        .then(res=>res.data
        )
        .then(data=>{
            setArticle(data);
            setLikeCount(data.likecount);
            console.log(data);
        })
        .catch(err=>{
            navigate("/NotFound");
        })
    },[]);

    const deleteArticle=()=>{
        axios.delete(`${ip}/Board/article?writer=${article.writer}&regdate=${regdate}`,{

        },{
            headers:{Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}`: `Bearer ${user.access_token}`}
        })
        .then(res=>{
            navigate("/FreeBoard");
        })
        
    }

    const countUpLike=()=>{
        axios.patch(`${ip}/Board/article/like/up?writer=${article.writer}&regdate=${regdate}`,{
            
        },{

        })
        .then(res=>{
            return res.data;       
        })
        .then(data=>{
            console.log(data);
            console.log("좋아요 카운트 :"+likecount);
            setLikeCount(data.likecount);
            console.log("좋아요 카운트 :"+likecount);
            likeMode.current=true;
        })
    }

    const countDownLike=()=>{
        if(likecount>0){
        axios.patch(`${ip}/Board/article/like/down?writer=${article.writer}&regdate=${regdate}`,{ 
        },
        {

        })
        .then(res=>{
            return res.data;       
        })
        .then(data=>{
            console.log(data);
            console.log("좋아요 카운트 :"+likecount);
            setLikeCount(data.likecount);
            console.log("좋아요 카운트 :"+likecount);
            likeMode.current=false;
        }

        )
        }
        
    }

    const LikeCountCheck = (e) => 
    {
        const LikeCountNumber = e.target.value;
        setLikeCount(LikeCountNumber);
    }
    
    return(
        <div>
            <h1>글 제목: {article.title}</h1>
            <h1>내용 : {article.content}</h1>
            <h1>작성자 : {article.writer}</h1>
            <h1>등록일 : {article.regdate}</h1>
            <h1>수정일 : {article.updatedate}</h1>  
            <h1>조회 수 : {article.visitcnt}</h1>
            <h1>좋아요 수 : {likecount}</h1>

            <input type="button" style={{display:loginMaintain==null ? "none":(loginMaintain=="true" ? (userInfo.loginState==="allok" ? "block":"none"):(user.login_state==="allok" ? "block":"none"))}} onClick={ likeMode.current === false ? countUpLike : countDownLike} value="좋아요"/>

            <Link to="/UpdateBoard" style={{display:loginMaintain == null  ? "none" : loginMaintain=="true" ? (userInfo==null ? "none" : (userInfo.loginState==="allok"? (userInfo.nickName==article.writer? "block" :"none" ): "none" )):
            (user.login_state==="allok" ? (user.nickname==article.writer ? "block":"none" ):"none" )}}>수정</Link> 
            
            <input type="button" style={{display:loginMaintain == null  ? "none" : loginMaintain=="true" ? (userInfo==null ? "none" : (userInfo.loginState==="allok"? (userInfo.nickName==article.writer? "block" :"none" ): "none" )):
            (user.login_state==="allok" ? (user.nickname==article.writer ? "block":"none" ):"none" )}} onClick={deleteArticle} value="삭제"></input>
            
            <Link to="/FreeBoard">목록</Link>
        </div>
    );
}   

export default FreeArticle;