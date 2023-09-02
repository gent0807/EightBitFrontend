import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

function PaginationNav ({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);
  const [currPage, setCurrPage] = useState(page)
  let firstNum = currPage - (currPage % 10) + 1
  let lastNum = currPage - (currPage % 10) + 10
  console.log({"currPage is":currPage, "firsNum is" : firstNum, "page is" : page});

  return (
    <>
      <Nav>
        <Button onClick={() => {setPage(1); setCurrPage(0);}} disabled={page === 1}>
          &lt;
          &lt;
        </Button>
        <Button 
            onClick={() => {setPage(page-1); setCurrPage(page-2);}} 
            disabled={page===1}>
            &lt;
        </Button>
        <Button 
            onClick={() => setPage(firstNum)}
            aria-current={page === firstNum ? "page" : null}>
            {firstNum}
        </Button>
                {Array(9).fill().map((_, i) =>{
                    if(i <=9){
                        return (
                            <Button 
                                key={i+1} 
                                onClick={() => {setPage(firstNum+1+i)}}
                                aria-current={page === firstNum+1+i ? "page" : null}>
                                {firstNum+1+i}
                            </Button>
                        )
                    }
                    else if(i>=1){
                        return (
                            <Button
                                key ={i+1}
                                onClick={() => setPage(lastNum)}
                                aria-current={page === lastNum ? "page" : null}>
                                {lastNum}
                            </Button>
                        )  
                    }
                })}
        <Button 
            onClick={() => {setPage(page+1); setCurrPage(page);}} 
            disabled={page===numPages}>
            &gt;
        </Button>
        <Button onClick={() => {setPage(numPages); setCurrPage(numPages);}} disabled={page === numPages}>
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
  background: ${props => props.theme.textColor};
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: ${props => props.theme.PaginationSelect};
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default PaginationNav;