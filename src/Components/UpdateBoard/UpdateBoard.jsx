import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import "../WriteBoard/CustomEditer.css";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { styled } from 'styled-components';
import axios from 'axios';
import { ImageDrop } from "quill-image-drop-module";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

const UpdateBoard = () =>
{
    const [ WriterChangeValue, setWriterChangeValue ] = useState("");
    const [ StoryChangeValue, setStoryChangeValue ] = useState("");
    const [ isDragging, setIsDragging ] = useState(false);
    const [ files, setFiles ] = useState([]);
    const user=useSelector(state => state.user);
    let userInfo=localStorage.getItem("userInfo");
    userInfo=JSON.parse(userInfo);         
    const loginMaintain=localStorage.getItem("loginMaintain");
    const ip=localStorage.getItem("ip");
    const navigate = useNavigate();

    const dragRef = useRef(null);
    const fileId = useRef(0);

    const quillRef = useRef(null);
    const [EditerValue, setEditerValue] = useState("");
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
            window.alert("업로드는 5개까지만 가능합니다!");
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

    console.log(WriterChangeValue);
    const WriterChange = (e) =>
    {
        const currentWriter = e.target.value;
        setWriterChangeValue(currentWriter);
        console.log(WriterChangeValue);
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
       /*  const registFile = (writer, regdate) => {
            const fd = new FormData();

            Object.values(files).forEach((file) => fd.append("file", file));

            axios({
                method: "post",
                url: `${ip}/Board/article/file/images`,
                data: fd,
                headers: {
                    Authorization: {Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}`: `Bearer ${user.access_token}`},
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                return res.data
            }
            )
            .then((data) =>{
                console.log(data);
                console.log(userInfo.accessToken);
                console.log(user.access_token);
                navigate('/FreeArticle/'+writer+'/'+regdate);
            }
                
            )
        } */
        
        e.preventDefault();

        console.log(files.map(file => file.object));
        if(WriterChangeValue.length<5&&EditerValue.length>20)
        {
            window.alert("제목을 5자 이상 입력해주세요!");
            return;
        }
        else if(WriterChangeValue.length>5&&EditerValue.length<20) {
            window.alert("내용을 20자 이상 입력해주세요!");
            return;
        }
        else if(WriterChangeValue.length<5 &&EditerValue.length<20) {                 
            window.alert("제목 5자 이상, 내용 20자 이상 입력해주세요!");
            return;
        }

        
        axios.post(`${ip}/Board/article`,{
        	title: WriterChangeValue,
            content: EditerValue,
            writer:loginMaintain == "true" ? userInfo.nickName : user.nickname,
        },
        {
        	headers: {Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}`: `Bearer ${user.access_token}`},
        })
        .then((res) => {
            return res.data
        })
        .then((data)=>{
            if(files.length==0){
                console.log("this is no file");
                navigate('/FreeArticle/'+data.writer+'/'+data.regdate);
                return ;    
            }
            else if(files.length>0){
                const writer=data.writer;
                const regdate=data.regdate;

                const fd = new FormData();  

                Object.values(files).forEach((file) => fd.append("file", file));
    
                axios.post(`${ip}/Board/article/file/images`,fd,{
                    headers: {
                        Authorization: {Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}`: `Bearer ${user.access_token}`},
                        "Content-Type": `multipart/form-data;   `
                    }
                }
                )
                .then((res) => {
                    return res.data
                }
                )
                .then((data) =>{
                    console.log(data);
                    console.log(userInfo.accessToken);
                    console.log(user.access_token);
                    navigate('/FreeArticle/'+writer+'/'+regdate);
                }
                    
                )
                
                
            }
        })

        

       
    }
    return(
        <WriterInputBox>
            <WriterInformationTextAllBox>
            <WriterInformation><WriterInformationText>글쓰기</WriterInformationText></WriterInformation>
            </WriterInformationTextAllBox>
            <WriteBoardSubmit onSubmit={OncheckSubmit}>
            <WriterInput placeholder='제목' onChange={WriterChange} value={WriterChangeValue}/>
            <EditerBox>
                <ReactQuill
                    placeholder="내용을 입력해 주세요!"
                    value={EditerValue}
                    onChange={(content, delta, source, editor) => setEditerValue(editor.getHTML())}
                    theme="snow" 
                    modules={modules}
                    formats={formats}
                ></ReactQuill>
            </EditerBox>
            <FileUploadBox ref={dragRef} checkFile={isDragging}>
            <FileUploadLabel checkFile={isDragging} htmlFor='fileUpload'>
                <FileUpload id='fileUpload' type="file" multiple={true} onChange={(e) => {onChangeFiles(e); e.target.value = '';}}/>
                <FileUploadText>이미지 첨부</FileUploadText>
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

export default UpdateBoard;

const EditerBox = styled.div
`
    max-width: 1240px;
    margin: 0px 20px 30px 20px;
    border: solid 3px ${props => props.theme.borderColor};
    border-radius: 20px;
    overflow: hidden;
    background: white;
`

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
    border: solid 3px ${props => props.theme.borderColor};
    background: ${props => props.theme.DropDownListColor};
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
    border: 3px solid ${props => props.theme.borderColor};
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
    border: solid 3px #3c3c3c;
    background: #6a9dda;
    padding : 10px;
    border-radius : 10px;
    cursor : pointer;
    font-weight : bold;
    caret-color: transparent;
    border: solid 3px ${props => props.theme.borderColor};
    background: ${props => props.theme.DropDownListColor};
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
    border: solid 3px ${props => props.theme.borderColor};
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
    box-shadow: 0 0 0 3px ${props => props.theme.borderColor} inset;
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
    box-shadow: 0 0 0 3px ${props => props.theme.borderColor} inset;
    border-radius: 10px;
    outline: none;
    margin: 0px 20px 30px 20px;
    &::-webkit-scrollbar{
        background: gray;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border: solid 3px ${props => props.theme.borderColor};
    }
    &::-webkit-scrollbar-thumb
    {
        background: #55AAFF;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        background-clip: padding-box;
        border: 5px solid transparent;
    }
    &::-webkit-scrollbar-track
    {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
`

const WriterInformation = styled.div
`
    text-align: center;
    border: solid 3px ${props => props.theme.borderColor};
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