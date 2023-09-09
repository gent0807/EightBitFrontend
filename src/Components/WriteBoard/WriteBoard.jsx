import { useState, useEffect, useRef, useCallback  } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { styled } from 'styled-components';

const WriteBoard = () =>
{

    const [ WriterChangeValue, setWriterChangeValue ] = useState("");
    const [ StoryChangeValue, setStoryChangeValue ] = useState("");
    const [ isDragging, setIsDragging ] = useState(false);
    const [ files, setFiles ] = useState([]);

    const dragRef = useRef(null);
    const fileId = useRef(0);

    const onChangeFiles = useCallback((e) => {
        let selectFiles = [];
        let tempFiles = files;

        if (e.type === "drop")
        {
            selectFiles = e.dataTransfer.files;
        } else {
            selectFiles = e.target.files;
        }

        if(files.length < 5)
        {
                for (const file of selectFiles) 
                {
                    tempFiles = [
                    ...tempFiles,
                    {
                        id: fileId.current++,
                        object: file
                    }
                    ];
                }
        }else{
            window.alert("업로드는 5개만 가능합니다!");
        }
        
        setFiles(tempFiles);

    }, [files]
    );

    console.log(files)

    const handleFilterFile = useCallback(
        (id) => {
            setFiles(files.filter(file => file.id !== id));
        }, [files]
    );

    const handleDragIn = useCallback(e => 
    {
        e.preventDefault();
        e.stopPropagation();
    }, []);
    
    const handleDragOut = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();
    
        setIsDragging(false);
    }, []);
    
    const handleDragOver = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();
    
        if (e.dataTransfer.files !== null) {
          setIsDragging(true);
        }
    }, []);
    
    const handleDrop = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();

        onChangeFiles(e);
        setIsDragging(false);
    }, [onChangeFiles]
    )

    const WriterChange = (e) =>
    {
        const currentWriter = e.target.value;
        setWriterChangeValue(currentWriter);
    }

    const StoryChange = (e) =>
    {
        const currentWriter = e.target.value;
        setStoryChangeValue(currentWriter);
    }

    const initDragEvents = useCallback(() => {
        if (dragRef.current !== null) {
          dragRef.current.addEventListener("dragenter", handleDragIn);
          dragRef.current.addEventListener("dragleave", handleDragOut);
          dragRef.current.addEventListener("dragover", handleDragOver);
          dragRef.current.addEventListener("drop", handleDrop);
        }
      }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);
    
      const resetDragEvents = useCallback(() => {
        if (dragRef.current !== null) {
          dragRef.current.removeEventListener("dragenter", handleDragIn);
          dragRef.current.removeEventListener("dragleave", handleDragOut);
          dragRef.current.removeEventListener("dragover", handleDragOver);
          dragRef.current.removeEventListener("drop", handleDrop);
        }
      }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

      useEffect(() => {
        initDragEvents();
    
        return () => resetDragEvents();
      }, [initDragEvents, resetDragEvents]);

      const OncheckSubmit = (e) =>
      {
        e.preventDefault();
        
      }

    return(
        <WriterInputBox>
            <WriterInformationTextAllBox>
            <WriterInformation><WriterInformationText>글쓰기</WriterInformationText></WriterInformation>
            </WriterInformationTextAllBox>
            <WriteBoardSubmit onSubmit={OncheckSubmit}>
            <WriterInput placeholder='제목' onChange={WriterChange} value={WriterChangeValue}/>
            <StoryInput placeholder='내용' onChange={StoryChange} value={StoryChangeValue}></StoryInput>
            <FileUploadBox ref={dragRef} checkFile={isDragging}>
            <FileUploadLabel checkFile={isDragging} htmlFor='fileUpload'>
                <FileUpload id='fileUpload' type="file" multiple={true} onChange={(e) => {onChangeFiles(e); e.target.value = '';}}/>
                <FileUploadText>파일첨부</FileUploadText>
            </FileUploadLabel>    
                <FileList>
                    {files.length > 0 &&
                        files.map(file => { 
                             const {
                                id,
                                object: { name }
                            } = file;
                                return (
                                    <FileNumber key={id}>
                                        <FileName>{ name }</FileName>
                                        <FileDelete onClick={() => handleFilterFile(id)}>
                                            X
                                        </FileDelete>
                                    </FileNumber>
                                );
                        })
                    }
                </FileList>
            </FileUploadBox>
            <SubmitBtnBox>
            <SubmitBtn>등록하기</SubmitBtn>
            </SubmitBtnBox>
            </WriteBoardSubmit>
        </WriterInputBox>
    );
}

export default WriteBoard;

const WriteBoardSubmit = styled.form
`
    display: flex;
    flex-direction: column;
`

const SubmitBtnBox = styled.div
`
    display: flex;
    justify-content: center;
`

const SubmitBtn = styled.button
`
    color: black;
    border: solid 2px #3c3c3c;
    background: #6a9dda;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    caret-color: transparent;
    &:hover
    {
        background : ${props => props.theme.HoverColor};
    }
`

const FileNumber = styled.div
`
    width: 300px;
    box-sizing: border-box;
    display: flex;
    padding: 10px;
    border: 2px solid ${props => props.theme.borderColor};
    margin: 0px 0px 10px 0px;
    color : ${props => props.theme.textColor};
    font-weight : bold;
    justify-content: space-between;
`

const FileName = styled.div
`
    width: 200px;
    box-sizing: border-box;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
`

const FileDelete = styled.div
`
    cursor: pointer;
`

const FileList = styled.div
`
    padding: 8px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    padding: 22px 0px 0px 0px;
    flex-direction: column;
    &:hover
    {
        opacity: 0.7;
    }
    
`

const FileUploadLabel = styled.label
`
    
    color: black;
    border: solid 2px #3c3c3c;
    background: #6a9dda;
    padding : 10px;
    border-radius : 10px;
    cursor : pointer;
    font-weight : bold;
    caret-color: transparent;
`

const FileUploadText = styled.span
`
`

const WriterInputBox = styled.div
`
    display: flex;
    flex-direction: column;
`

const FileUploadBox = styled.div
`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    border: solid 2px ${props => props.theme.borderColor};
    margin: 0px 20px 30px 20px;
    border-radius: 20px;
    justify-content: center;
    padding: 24px 0px 0px 0px;
    background: ${props => props.checkFile ? "rgb(0,0,0,0.04)" : "white" };
    @media (hover: hover)
    {
        &:hover
        {
            background: ${props => props.theme.HoverColor};
        } 
    }
`

const WriterInput = styled.input
`
    border: none;
    outline: none;
    padding: 10px 10px 10px 15px;
    box-shadow: 0 0 0 2px ${props => props.theme.borderColor} inset;
    border-radius: 10px;
    font-size: 20px;
    box-sizing: border-box;
    margin: 0px 20px 30px 20px;
`

const FileUpload = styled.input
`
    display : none;
    caret-color: transparent;
`

const StoryInput = styled.textarea
`
    box-sizing: border-box;
    height: 500px;
    border: none;
    resize: none;
    padding: 10px 10px 10px 15px;
    font-size: 15px;
    box-shadow: 0 0 0 2px ${props => props.theme.borderColor} inset;
    border-radius: 10px;
    outline: none;
    margin: 0px 20px 30px 20px;
`

const WriterInformation = styled.div
`
    text-align: center;
    border: solid 2px ${props => props.theme.borderColor};
    color : ${props => props.theme.textColor}
    width: 70px;
    padding: 15px;
    border-radius: 20px;
    font-weight: bold;
    font-size: 22px;
}
`

const WriterInformationText = styled.span
`
    color : ${props => props.theme.textColor};
`
const WriterInformationTextAllBox = styled.div
`
    display: flex;
    justify-content: center;
    margin: 0px 0px 40px 0px
`