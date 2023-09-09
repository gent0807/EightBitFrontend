import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useRecoilValue, useRecoilState } from 'recoil';
import { firstReset } from "../Darkmode/Darkmode";

function PaginationNav ({ total, limit, page, setPage }) {
  const numPages = total > 0 && limit > 0 ? Math.ceil(total / limit) : 1;
  const [currPage, setCurrPage] = useState(page);
  const [WindowLength, setWindowLength] = useState(window.innerWidth);
  const FirstReset = useRecoilValue(firstReset);
  const [CFirstReset, setCFirstReset] = useRecoilState(firstReset);
  let firstNum = FirstReset ? WindowLength <= 666 ? currPage - (currPage % 5) + 1 : currPage - (currPage % 10) + 1 : 1 ;
  console.log(WindowLength , firstNum, numPages);

  const handleResize = () => 
  {
      setWindowLength(window.innerWidth);
  };

  useEffect(() => {
      window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  })

  const ScrollTop = () =>
  {
      window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Nav>
        <Button onClick={() => {setPage(1); setCurrPage(1); setCFirstReset(true); ScrollTop();}} off={page === 1}>
          &lt;
          &lt;
        </Button>
        <Button 
            onClick={() => {setPage(page-1); setCurrPage(page-2); setCFirstReset(true); ScrollTop();}} 
            off={page===1}>
            &lt;
        </Button>
        <Button 
            onClick={() => {setPage(firstNum); setCFirstReset(true); ScrollTop();}}
            aria-current={page === firstNum ? "page" : null}>
            {firstNum}
        </Button>
                {Array(numPages - firstNum).fill().map((_, i) =>{
                    if(i <= Math.round(WindowLength <= 666 ? 3 : 8))
                    {
                        return (
                            <Button 
                                key={i+1} 
                                onClick={() => {setPage(firstNum+1+i); setCFirstReset(true); ScrollTop();}}
                                aria-current={page === firstNum+1+i ? "page" : null}>
                                {firstNum+1+i}
                            </Button>
                        )
                    }
                })}
        <Button 
            onClick={() => {setPage(page+1); setCurrPage(page); setCFirstReset(true); ScrollTop();}} 
            off={page === numPages}>
            &gt;
        </Button>
        <Button onClick={() => {setPage(numPages); setCurrPage(numPages); setCFirstReset(true); ScrollTop();}} off={page === numPages}>
          &gt;
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: ${props => props.off ? "grey" : props.theme.textColor};
  color: white;
  font-size: 1rem;
  cursor: ${props => props.off ? "revert" : "pointer"};
  transform: ${props => props.off ? "revert" : "none"};
  pointer-events: ${props => props.off ? "none" : "true"};

g  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
  }

  &[aria-current] {
    background: ${props => props.theme.PaginationSelect};
    font-weight: bold;
    cursor: revert;
    transform: revert;
  } 
`;

export default PaginationNav;

