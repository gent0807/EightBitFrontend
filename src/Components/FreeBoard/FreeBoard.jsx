import { styled, keyframes } from "styled-components";
import { useState, useRef, useEffect } from "react";
import { EmPwInformation } from "../EmailPwFound/EmailPwFound"
import { SearchInputBox, SearchInput, SearchInputIconBox, SearchButton } from "../Header/TopNavBar"
import { ArrowBox } from "../Sign/Signinput";
import { HiOutlineSearch } from "react-icons/hi";
import  Pagination  from "./Pagination";

const FreeBoard = () =>
{
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 2,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 3,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 4,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 5,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 6,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 7,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 8,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 9,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 10,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 11,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 12,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 13,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 14,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 15,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 16,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 17,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 18,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 19,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 20,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 21,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 22,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 23,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 24,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 25,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 26,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 27,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 28,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 29,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 30,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 31,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 32,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 33,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 34,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 35,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 36,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 37,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 38,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 39,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 40,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 41,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 42,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 43,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 44,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 45,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 46,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 47,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
        {
            id: 48,
            title: "슈퍼마리오",
            writer: "곰탱이",
            time: "2023-06-23",
            counter: "200",
        },
    ]);
    const [ Search, setSearch ] = useState("");
    const [ Fitter, setFitter ] = useState("미정");
    const [ LimtText, setLimtText ] = useState("10개씩");
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const [ FitterDropdown, setFitterDropdown ] = useState(false);
    const [ LimitDropdown, setLimitDropdown ] = useState(false);

    const FillterRef = useRef("");
    const LimitRef = useRef("");

    useEffect(() => {
        function handleOuside(e) {
          if (FillterRef.current && !FillterRef.current.contains(e.target)) {
                setFitterDropdown(false);
          };
        };
  
        if(!FitterDropdown) {
        document.addEventListener("mousedown", handleOuside);
        };
        return () => {
          document.removeEventListener("mousedown", handleOuside);
        };
      }, [FillterRef])

    useEffect(() => {
        function handleOuside(e) {
          if (LimitRef.current && !LimitRef.current.contains(e.target)) {
                setLimitDropdown(false);
          };
        };
  
        if(!LimitDropdown) {
        document.addEventListener("mousedown", handleOuside);
        };
        return () => {
          document.removeEventListener("mousedown", handleOuside);
        };
      }, [LimitRef])

    const OnSearch = (e) =>
    {
        const currentSearch = e.target.value;
        setSearch(currentSearch);
    }

    const setFitterValue = (e) =>
    {
        const { innerText }  = e.target;
        setFitter(innerText);
    }

    const setLimitValue = (e) =>
    {
        const { innerText }  = e.target;
        const Limit = e.target.value;
        setLimtText(innerText);
        setLimit(Limit);
    }

    return(
        <FreeBoardBox>
            <InformationAllBox>
            <FreeBoardInformation>
                <FreeBoardInformationText>자유게시판</FreeBoardInformationText>
            </FreeBoardInformation>
            </InformationAllBox>
            <SearchBox>
                <FreeBoardSearchInputBox>
                        <FreeBoardSearchInput placeholder="게임 검색하기" value={Search} onChange={OnSearch}/>
                    <FreeBoardSearchIconBox>
                        <FreeBoardSearchBtn><HiOutlineSearch/></FreeBoardSearchBtn>
                    </FreeBoardSearchIconBox>
                </FreeBoardSearchInputBox>
                <FitterBox>
                <FitterSelectAllBox ref={FillterRef} onClick={() => setFitterDropdown(!FitterDropdown)}>
                    <FitterSelectBox show={FitterDropdown}>
                        <FitterSelectList onClick={setFitterValue}>미정</FitterSelectList>
                        <FitterSelectList onClick={setFitterValue}>미정</FitterSelectList>
                        <FitterSelectList onClick={setFitterValue}>추천</FitterSelectList>
                        <FitterSelectList onClick={setFitterValue}>미정</FitterSelectList>
                    </FitterSelectBox>
                    <FitterSelectValue><FitterSelectText>{Fitter}</FitterSelectText></FitterSelectValue>
                    <FitterArrowBox direction={FitterDropdown}>{ FitterDropdown ? "▲" : "▼" }</FitterArrowBox>
                </FitterSelectAllBox>
                <LimitSelectAllBox ref={LimitRef} onClick={() => setLimitDropdown(!LimitDropdown)}>
                    <LimmitSelectBox show={LimitDropdown}>
                        <LimitSelectList value={10} onClick={setLimitValue}>10개씩</LimitSelectList>
                        <LimitSelectList value={20} onClick={setLimitValue}>20개씩</LimitSelectList>
                        <LimitSelectList value={50} onClick={setLimitValue}>50개씩</LimitSelectList>
                    </LimmitSelectBox>
                    <LimitSelectValue><FitterSelectText>{LimtText}</FitterSelectText></LimitSelectValue>
                    <LimitArrowBox direction={LimitDropdown}>{ LimitDropdown ? "▲" : "▼" }</LimitArrowBox>
                </LimitSelectAllBox>
            </FitterBox>
            </SearchBox>
            <BoardBox>
                <BoardTitle>
                    <BoardTitleNumber><BoardTitleText>번호</BoardTitleText></BoardTitleNumber>
                    <BoardTitleTitle><BoardTitleText>제목</BoardTitleText></BoardTitleTitle>
                    <BoardTitleWriter><BoardTitleText>작성자</BoardTitleText></BoardTitleWriter>
                    <BoardTitleViewTime><BoardTitleText>날짜</BoardTitleText></BoardTitleViewTime>
                    <BoardTitleViewCounter><BoardTitleText>조회수</BoardTitleText></BoardTitleViewCounter>
                </BoardTitle>
                <BoardContentAllBox>
                        {posts.slice(offset, offset + limit).map(({ id, title, writer, time, counter }) => (
                        <BoardContentBox key={id+1}>
                            <BoardContentNumber>{id}</BoardContentNumber>
                            <BoardContentTitle>{title}</BoardContentTitle>
                            <BoardContentWriter>{writer}</BoardContentWriter>
                            <BoardContentViewtime>{time}</BoardContentViewtime>
                            <BoardContentCounter>{counter}</BoardContentCounter>
                        </BoardContentBox>
                        ))}
                </BoardContentAllBox>
            </BoardBox>
            <PageNationBox>
            <Pagination
                total={posts.length}
                limit={limit}
                page={page}
                setPage={setPage}
            />
            </PageNationBox>
        </FreeBoardBox>
    );
}

export default FreeBoard;

const BoardContentNumber = styled.div
`
`
const BoardContentTitle = styled(BoardContentNumber)
`
`
const BoardContentViewtime = styled(BoardContentNumber)
`
`
const BoardContentWriter = styled(BoardContentNumber)
`
`
const BoardContentCounter = styled(BoardContentNumber)
`
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
        display: grid;
        grid-template-columns: minmax(50px, 100px) minmax(50px, 950px) minmax(50px, 100px) minmax(50px, 100px) minmax(50px, 100px);
        text-align: center;
        padding: 20px 0px 20px 0px;
        color: ${(props) => props.theme.BoardTitle};
        font-weight: bold;
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
    margin: 0px 0px 0px 33px;
    height: 39px;
    -webkit-tap-highlight-color:transparent;
`

const LimitSelectAllBox = styled(FitterSelectAllBox)
`

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
        height: 107px;
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
    border: solid 2px ${(props) => props.theme.borderColor};
    height: 39px;
`

const FreeBoardSearchInput = styled(SearchInput)
`
    margin: 0px 0px 0px 0px;
    padding: 3px 0px 0px 11px;
    height: 36px;
`

const FreeBoardSearchIconBox = styled(SearchInputIconBox)
`
    margin: 0px 0px 0px 0px;
    height: 39px;
`

const FreeBoardSearchBtn = styled(SearchButton)
`
    color: black;
    padding: 5px 8px 0px 0px;
`

const FreeBoardInformation = styled(EmPwInformation)
`
    border: solid 2px ${props => props.theme.BoardInformaiton};
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
    margin: 20px 0px 0px 0px;
    flex-direction: column;
    border-bottom: solid 2px ${(props) => props.theme.BoardTitle};

`

const FitterBox = styled.div
`
    display: flex;
    justify-content: right;
`

const SearchBox = styled.div
`
    display: flex;
    justify-content: right;
    border-bottom: solid 2px ${(props) => props.theme.BoardTitle};
    padding: 20px 15px 20px 0px;
`

const PageNationBox = styled.div
`
    margin: 20px 0px 0px 0px;
`