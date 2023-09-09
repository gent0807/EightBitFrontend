import { styled, keyframes } from "styled-components";
import { useState, useRef, useEffect } from "react";
import { EmPwInformation } from "../EmailPwFound/EmailPwFound";
import { SearchInputBox, SearchInput, SearchInputIconBox, SearchButton } from "../Header/TopNavBar";
import { ArrowBox } from "../Sign/Signinput";
import { HiOutlineSearch } from "react-icons/hi";
import Pagination from "./Pagination";
import { useRecoilState } from "recoil";
import { firstReset } from "../Darkmode/Darkmode";
import { Link, useNavigate } from "react-router-dom";
import NotPage from "./NotPage";

const FreeBoard = () =>
{
    const [posts, setPosts] = useState([
        {   
            id : 1,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 2,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 3,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 4,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 5,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 6,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 7,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 8,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 9,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 10,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 11,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 12,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 13,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 14,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 15,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 16,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 17,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 18,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 19,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 20,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 21,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 22,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 23,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 24,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 25,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 26,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 27,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 28,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 29,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 30,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 31,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 32,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 33,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 34,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 35,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 36,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 37,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 38,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 39,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 40,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 41,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 42,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 43,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 44,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 45,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 46,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 47,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 48,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 49,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 50,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 51,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 52,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 53,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 54,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 55,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 56,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 57,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 58,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 59,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 60,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 61,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 62,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 63,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 64,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 65,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 66,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 67,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 68,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 69,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 70,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 71,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 72,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 73,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 74,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 75,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 76,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 77,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 78,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 79,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 80,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 81,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 82,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 83,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 84,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 85,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 86,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 87,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 88,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 89,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 90,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 91,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 92,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 93,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 94,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 95,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 96,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 97,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 98,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 99,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 100,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 101,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 102,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 103,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 104,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 105,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 106,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 107,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 108,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 109,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 110,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 111,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 112,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 113,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 114,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 115,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 116,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 117,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 118,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 119,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 120,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 121,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 122,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
        {   
            id : 123,
            title : "방치모험가",
            writer : "박세준",
            time : "2023-06-05",
            counter : 1000,
        },
    ]);
    const [ Search, setSearch ] = useState("");
    const [ Fitter, setFitter ] = useState("미정");
    const [ LimtText, setLimtText ] = useState("10개씩");
    const [ limit, setLimit ] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const [ FitterDropdown, setFitterDropdown ] = useState(false);
    const [ LimitDropdown, setLimitDropdown ] = useState(false);
    const [FirstReset, setFirstReset] = useRecoilState(firstReset);
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
        setPage(1);
        setFirstReset(false);
    }

    const ScrollBottom = () =>
    {
      window.scrollTo({ top: 1, behavior: "smooth" });
    }

    return(
        <FreeBoardBox>
            <InformationAllBox>
            <FreeBoardInformation>
                <FreeBoardInformationText>자유게시판</FreeBoardInformationText>
            </FreeBoardInformation>
            </InformationAllBox>
            <SearchBox>
                <SearchAllBox>
                    <FreeBoardSearchInputBox>
                        <FreeBoardSearchInput placeholder="게임 검색하기" value={Search} onChange={OnSearch}/>
                    <FreeBoardSearchIconBox>
                        <FreeBoardSearchBtn><HiOutlineSearch/></FreeBoardSearchBtn>
                    </FreeBoardSearchIconBox>
                </FreeBoardSearchInputBox>
                </SearchAllBox>
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
                <WriteBtn><Link to='/WriteBoard'><WriteBtnText>글쓰기</WriteBtnText></Link></WriteBtn>
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
                 {posts.length === 0 && <NotPage />}
                  {posts.length !== 0 && posts.slice(offset, offset + limit).map(({ id, title, writer, time, counter }) => (
                        <BoardContentBox key={id}>
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
                offset={offset}
            />
            </PageNationBox>
        </FreeBoardBox>
    );
}

export default FreeBoard;

const WriteBtnText = styled.span
`
    white-space: nowrap;
    -webkit-tap-highlight-color:transparent;
    -webkit-user-select: none;
    background: ${props => props.theme.PaginationSelect};
`

const WriteBtn = styled.div
`   
    text-align: center;
    width: 70px;
    height: 23px;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    background: ${props => props.theme.PaginationSelect};
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
            color: ${props =>  props.theme.textColor};
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
    border: solid 2px ${(props) => props.theme.borderColor};
    height: 39px;
    width: 248px;
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