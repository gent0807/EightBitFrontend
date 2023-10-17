import { styled, keyframes } from "styled-components";
import { useState, useRef, useEffect } from "react";
import { SearchInputBox, SearchInput, SearchInputIconBox, SearchButton } from "../Header/TopNavBar";
import { ArrowBox } from "../Sign/Signinput";
import { HiOutlineSearch } from "react-icons/hi";
import Pagination from "./Pagination";
import { useRecoilState } from "recoil";
import { firstReset } from "../Darkmode/Darkmode";
import { Link, useNavigate } from "react-router-dom";
import NotPage from "./NotPage";
import { useSelector } from "react-redux";
import axios from "axios";
import dayjs from "dayjs";
import WriterProfile from "./WriterProfile";
import { AiOutlineEye } from "react-icons/ai";
import { BsHandThumbsUp } from "react-icons/bs";
import DOMPurify from "dompurify";

const FreeBoard = () => {
    const [posts, setPosts] = useState([]);
    const [Search, setSearch] = useState("");
    const [Fitter, setFitter] = useState("최신순");
    const [LimtText, setLimtText] = useState("20개씩");
    const [limit, setLimit] = useState(20);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const [FitterDropdown, setFitterDropdown] = useState(false);
    const [LimitDropdown, setLimitDropdown] = useState(false);
    const [FirstReset, setFirstReset] = useRecoilState(firstReset);
    const FillterRef = useRef("");
    const LimitRef = useRef("");
    const ip = localStorage.getItem("ip");
    const user = useSelector(state => state.user);
    const loginMaintain = localStorage.getItem("loginMaintain");
    const PostsSize = posts.slice(offset, offset + limit);
    const [SearchList, setSearchList] = useState([])
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    console.log("loginMaintain", loginMaintain);
    console.log("userInfo", userInfo);
    console.log("user", user);


    useEffect(() => {
        function handleOuside(e) {
            if (FillterRef.current && !FillterRef.current.contains(e.target)) {
                setFitterDropdown(false);
            };
        };

        if (!FitterDropdown) {
            document.addEventListener("mousedown", handleOuside);
        };
        return () => {
            document.removeEventListener("mousedown", handleOuside);
        };
    }, [FillterRef]);

    useEffect(() => {
        function handleOuside(e) {
            if (LimitRef.current && !LimitRef.current.contains(e.target)) {
                setLimitDropdown(false);
            };
        };

        if (!LimitDropdown) {
            document.addEventListener("mousedown", handleOuside);
        };
        return () => {
            document.removeEventListener("mousedown", handleOuside);
        };
    }, [LimitRef]);

    const OnSearch = (e) => {
        const currentSearch = e.target.value;
        setSearch(currentSearch);
    }

    const setCurrentValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
    }

    const setPastValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
    }

    const setLikeValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
    }

    const setViewValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
    }

    const setReplyValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
    }

    const setLimitValue = (e) => {
        const { innerText } = e.target;
        const Limit = e.target.value;
        setLimtText(innerText);
        setLimit(Limit);
        setPage(1);
        setFirstReset(false);
    }

    useEffect(() => {
        if (posts.length > 0 && PostsSize.length === 0) {
            setPage(page - 1);
        }
    }, [PostsSize.length, posts.length]);

    useEffect(() => {
        axios.get(`${ip}/Board/articles`, {

        },
            {

            })
            .then(res => res.data
            )
            .then(data => {
                console.log(data);
                setPosts(data);
                setSearchList(data);
            })
    }, [])

    const SearchSubmit = (e) => {
        e.preventDefault();

        if (Search === "") {
            axios.get(`${ip}/Board/articles`, {

            },
                {

                })
                .then(res => res.data
                )
                .then(data => {
                    console.log(data);
                    setPosts(data);
                    setSearchList(posts);
                })
        } else {
            const SearchResult = posts.filter((board) => board.title.toUpperCase().includes(Search.toUpperCase()));
            setSearchList(SearchResult);
            setSearch("");
        }
    }

    return (
        <FreeBoardBox>
            <InformationAllBox>
                <FreeBoardInformation>
                    <FreeBoardInformationText>자유게시판</FreeBoardInformationText>
                </FreeBoardInformation>
            </InformationAllBox>
            <SearchBox>
                <SearchAllBox>
                    <SearchForm onSubmit={(e) => SearchSubmit(e)}>
                        <FreeBoardSearchInputBox>
                            <FreeBoardSearchInput placeholder="제목 검색하기" value={Search} onChange={OnSearch} />
                            <FreeBoardSearchIconBox>
                                <FreeBoardSearchBtn><HiOutlineSearch /></FreeBoardSearchBtn>
                            </FreeBoardSearchIconBox>
                        </FreeBoardSearchInputBox>
                    </SearchForm>
                </SearchAllBox>
                <FitterBox>
                    <FitterSelectAllBox ref={FillterRef} onClick={() => setFitterDropdown(!FitterDropdown)}>
                        <FitterSelectBox show={FitterDropdown}>
                            <FitterSelectList onClick={() => setCurrentValue()}>최신순</FitterSelectList>
                            <FitterSelectList onClick={() => setPastValue()}>과거순</FitterSelectList>
                            <FitterSelectList onClick={() => setCurrentValue()}>댓글순</FitterSelectList>
                            <FitterSelectList onClick={() => setReplyValue()}>조회순</FitterSelectList>
                            <FitterSelectList onClick={() => setLikeValue()}>추천순</FitterSelectList>
                        </FitterSelectBox>
                        <FitterSelectValue><FitterSelectText>{Fitter}</FitterSelectText></FitterSelectValue>
                        <FitterArrowBox direction={FitterDropdown}>{FitterDropdown ? "▲" : "▼"}</FitterArrowBox>
                    </FitterSelectAllBox>
                    <LimitSelectAllBox ref={LimitRef} onClick={() => setLimitDropdown(!LimitDropdown)}>
                        <LimmitSelectBox show={LimitDropdown}>
                            <LimitSelectList value={10} onClick={setLimitValue}>10개씩</LimitSelectList>
                            <LimitSelectList value={20} onClick={setLimitValue}>20개씩</LimitSelectList>
                            <LimitSelectList value={50} onClick={setLimitValue}>50개씩</LimitSelectList>
                        </LimmitSelectBox>
                        <LimitSelectValue><FitterSelectText>{LimtText}</FitterSelectText></LimitSelectValue>
                        <LimitArrowBox direction={LimitDropdown}>{LimitDropdown ? "▲" : "▼"}</LimitArrowBox>
                    </LimitSelectAllBox>
                    <WriteBtn>{loginMaintain == null ? <Link to='/Login'><WriteBtnText>글쓰기</WriteBtnText></Link> : loginMaintain == "true" ? userInfo == null ? <Link to='/Login'><WriteBtnText>글쓰기</WriteBtnText></Link> :
                        (userInfo.loginState === "allok" ? <Link to='/WriteBoard'><WriteBtnText>글쓰기</WriteBtnText></Link> : <Link to='/Login'><WriteBtnText>글쓰기</WriteBtnText></Link>) : (user.login_state === "allok" ? <Link to='/WriteBoard'><WriteBtnText>글쓰기</WriteBtnText></Link> : <Link to='/Login'><WriteBtnText>글쓰기</WriteBtnText></Link>)}</WriteBtn>
                </FitterBox>
            </SearchBox>
            <BoardBox>
                <BoardContentAllBox>
                    {SearchList.length === 0 && <NotPage />}
                    {SearchList.length !== 0 && SearchList.slice(offset, offset + limit).map(({ id, seq, title, writer, regdate, visitcnt, reply_count, likecount, content }) => (
                        <BoardContentBox key={id}>
                            <ReplyCountAllBox>
                                <ReplyCountBox>
                                    <ReplyCountText>답변</ReplyCountText>
                                    {reply_count}
                                </ReplyCountBox>
                            </ReplyCountAllBox>

                            <FreeBoardViewAllBox>
                                <ProfileAllBox>
                                    <WriterProfile writer={writer} />
                                    <ProfileBox>
                                        <BoardContentWriter>{writer}</BoardContentWriter>
                                        <BoardContentViewtime>{dayjs(regdate).format("YY.MM.DD")}</BoardContentViewtime>
                                    </ProfileBox>
                                </ProfileAllBox>

                                <BoardTitleContentAllBox>
                                    <BoardContentTitle><Link to={`/FreeArticle/${writer}/${regdate}`}>{title}</Link></BoardContentTitle>
                                    <BoardCotent>
                                        <Link to={`/FreeArticle/${writer}/${regdate}`}><BoardCotentText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} /></Link>
                                    </BoardCotent>
                                </BoardTitleContentAllBox>
                                <ViewlikeAllBox>
                                    <ViewIcon><AiOutlineEye /></ViewIcon>
                                    <BoardContentCounter>{visitcnt}</BoardContentCounter>
                                    <LikeIcon><BsHandThumbsUp /></LikeIcon>
                                    <BoardlikeContentCounter>{likecount}</BoardlikeContentCounter>
                                </ViewlikeAllBox>

                            </FreeBoardViewAllBox>

                        </BoardContentBox>
                    ))}
                </BoardContentAllBox>
            </BoardBox>

            {posts.length > 0 &&
                <PageNationBox>
                    <Pagination
                        total={posts.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                        offset={offset}
                    />
                </PageNationBox>
            }

        </FreeBoardBox>
    );
}

export default FreeBoard;

const BoardTitleContentAllBox = styled.div
    `

`

const ProfileBox = styled.div
    `

`

const ViewIcon = styled.i
    `
    font-size: 22px;
    display: flex;
`

const LikeIcon = styled(ViewIcon)
    `
    font-size: 18px;
    margin: 0px 0px 0px 6px;
`

const ViewlikeAllBox = styled.div
    `
    display: flex;
    justify-content: end;
    margin: 30px 0px 0px 0px;
`

const ProfileAllBox = styled.div
    `
    display: flex;
`

const FreeBoardViewAllBox = styled.div
    `
    display: flex;
    flex-direction: column;
    width: 100%;
`

const ReplyCountAllBox = styled.div
    `

`

const ReplyCountText = styled.span
    `
    margin: 0px 0px 7px 0px;
`

const ReplyCountBox = styled.div
    `
    width: 64px;
    height: 73px;
    border: solid 2px ${props => props.theme.textColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 6px;
`

const WriteBtnText = styled.span
    `
    white-space: nowrap;
    -webkit-tap-highlight-color:transparent;
    -webkit-user-select: none;
`

const WriteBtn = styled.div
    `   
    text-align: center;
    width: 70px;
    height: 23px;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    background: #6A9DDA;
    color: white;
    overflow: hidden;
    padding: 13px 7px 7px 7px;
    font-weight:bold;
    -webkit-tap-highlight-color:transparent;
    &:hover
    {
        ${WriteBtnText}{
            background-color: rgba( 0, 0, 0, 0.2 );
            padding: 13px 24.2px 12px 24.2px;
            margin: 0px 0px 0px -11px;
        }
    }

    a
    {
            text-decoration: none;
            color: black;
    }
`

const SearchAllBox = styled.div
    `
    margin: 0px 0px 0px 0px;

    @media (min-width:250px) and (max-width:607px)
    {
        display: flex;
        justify-content: center;
        margin: -28px 0px 24px 0px;
    }
`

const SearchForm = styled.form
    `

`

const BoardContentNumber = styled.div
    `
    display: flex;
    align-items: center;
    justify-content: start;
    margin: 0px 10px 0px 10px;
    
`

const BoardCotent = styled(BoardContentNumber)
    `
    margin: 0px 0px 0px 0px;
    font-size: 14px;
    a{
        text-decoration: none;
    }
`

const BoardCotentText = styled.div
    `
    text-align: start;
    display: -webkit-box;
    word-break: break-all;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    cursor: pointer;
    p, span{
        color: ${props => props.theme.BoardTextView} !important;
        background-color: ${props => props.theme.backgroundColor} !important;
        transition: background-color 0.5s;
    }

    &:hover{
        p,span{
            color: #0090F9 !important;
        }
    }

`

const BoardContentTitle = styled(BoardContentNumber)
    `
    margin: 15px 0px 6px 0px;

    a{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-decoration: none;
        font-size: 20px;
        color: ${props => props.theme.textColor};

        &:hover
        {
            color: #0090F9;
        }
    }
`
const BoardContentViewtime = styled(BoardContentNumber)
    `
    font-size: 15px;
`
const BoardContentWriter = styled(BoardContentNumber)
    `
    font-size: 20px;
    margin: 0px 10px 6px 10px;
`
const BoardContentCounter = styled(BoardContentNumber)
    `
    margin: 0px 0px 0px 5px;
}
`

const BoardlikeContentCounter = styled(BoardContentNumber)
    `
    margin: 0px 0px 0px 5px;
`

const BoardTitle = styled.div
    `
    display: grid;
    grid-template-columns: minmax(50px, 100px) minmax(50px, 950px) minmax(50px, 100px) minmax(50px, 100px) minmax(50px, 100px);
    text-align: center;
    padding: 0px 0px 20px 0px;
    border-bottom: solid 2px ${(props) => props.theme.BoardTitle};
    font-weight: bold;
`

const BoardTitleText = styled.span
    `
`

const BoardContentAllBox = styled.div
    `

`

const BoardContentBox = styled.div
    `
        display: flex;
        column-gap: 20px;
        text-align: center;
        padding: 20px 10px 20px 10px;
        color: ${(props) => props.theme.BoardTitle};
        font-weight: bold;
        &:not(:last-child)
        {
            border-bottom: solid 2px black;
        }
`

const BoardTitleNumber = styled.div
    `
    color: ${(props) => props.theme.BoardTitle};
`

const BoardTitleTitle = styled(BoardTitleNumber)
    `
`

const BoardTitleViewCounter = styled(BoardTitleNumber)
    `
`

const BoardTitleViewTime = styled(BoardTitleNumber)
    `
`

const BoardTitleWriter = styled(BoardTitleNumber)
    `
`

const FitterSelectAllBox = styled.div
    `
    width: 127px;
    height: 21px;
    border: solid 2px ${(props) => props.theme.borderColor};
    cursor: pointer;
    background: #dee2e6;
    border-radius: 10px;
    margin: 0px 9px 0px 9px;
    height: 39px;
    -webkit-tap-highlight-color:transparent;
    @media (min-width:250px) and (max-width:607px)
    {
        margin: 0px 7px -12px 7px;
    }
`

const LimitSelectAllBox = styled(FitterSelectAllBox)
    `
    margin: 0px 9px 0px 0px;
`

const FitterArrowBox = styled(ArrowBox)
    `
    margin: 11px 0px 11px 104px;
    margin: ${props => props.direction ? "9px 0px 11px 104px" : "11px 0px 11px 104px"};
`

const LimitArrowBox = styled(ArrowBox)
    `
    margin: 11px 0px 11px 104px;
    margin: ${props => props.direction ? "9px 0px 11px 104px" : "11px 0px 11px 104px"};
`

const FillterSlideDown = keyframes
    `
    0%{
        height: 0px;
    }
    100%{
        height: 107px;
    }
`

const LimitSlideDown = keyframes
    `
    0%{
        height: 0px;
    }
    100%{
        height: 82px;
    }
`

const FitterSelectBox = styled.ul
    `
    position: absolute;
    display: ${props => props.show ? "block" : "none"};
    list-style: none; 
    margin: 44px 0px 0px -2px;
    border: solid 2px ${props => props.theme.borderColor};
    background: #dee2e6;
    width: 127px;
    padding: 0px;
    height: 107px;
    overflow: hidden;
    text-align: center;
    border-radius: 5px;
    animation: ${FillterSlideDown} 0.5s;
`

const LimmitSelectBox = styled(FitterSelectBox)
    `
    height: 82px;
    animation: ${LimitSlideDown} 0.5s;
`

const FitterSelectText = styled.span
    `
    color: black;
`

const FitterSelectValue = styled.div
    `
    position: absolute;
    margin: 11px 0px 11px 45px;
    white-space: nowrap;
`

const LimitSelectValue = styled(FitterSelectValue)
    `
    margin: 11px 0px 11px 36px;
`

const FitterSelectList = styled.li
    `
    color: black;
    padding: 4px 0px 4px 0px;
    &:hover
    {
        background-color: ${(props) => props.theme.DropDownListColor};
    }
`

const LimitSelectList = styled(FitterSelectList)
    `
`

const FreeBoardSearchInputBox = styled(SearchInputBox)
    `
    display: flex;
    border: solid 2px ${(props) => props.theme.borderColor};
    height: 39px;
    width: 248px;
`

const FreeBoardSearchInput = styled(SearchInput)
    `
    display: block;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 11px;
    height: 39px;
`

const FreeBoardSearchIconBox = styled(SearchInputIconBox)
    `
    display: block;
    margin: 0px 0px 0px 0px;
    height: 39px;
`

const FreeBoardSearchBtn = styled(SearchButton)
    `
    display: block;
    color: black;
    padding: 5px 8px 0px 0px;
`

const FreeBoardInformation = styled.div
    `
    width: 191px;
    padding: 10px;
    text-align: center;
    border-radius: 20px;
    border: solid 2px ${props => props.theme.textColor};
    margin: 0px 0px 20px 0px;
`

const InformationAllBox = styled.div
    `
    display: flex;
    justify-content: center;
`

const FreeBoardInformationText = styled.span
    `
    font-weight: bold;
    color: ${props => props.theme.BoardInformaiton};
`

const FreeBoardBox = styled.div
    `
    display: flex;
    flex-direction: column;
`

const BoardBox = styled.div
    `
    display: flex;
    margin: 10px 0px 10px 0px;
    flex-direction: column;
    border-bottom: solid 2px ${(props) => props.theme.BoardTitle};

`

const FitterBox = styled.div
    `
    display: flex;
    justify-content: right;
    
    @media (min-width:250px) and (max-width:607px)
    {
        margin: 15px 0px 0px 0px;
    }
`

const SearchBox = styled.div
    `
    display: flex;
    justify-content: space-between;
    border-bottom: solid 2px ${(props) => props.theme.BoardTitle};
    padding: 20px 15px 20px 15px;

    @media (min-width:250px) and (max-width:607px)
    {
        flex-direction: column;
    }
`

const PageNationBox = styled.div
    `
    margin: 20px 0px 0px 0px;
`