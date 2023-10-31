
import { useEffect, useState } from "react";
import axios from "axios";
const ip = localStorage.getItem("ip");


const GameMainImg = ({ uploader, regdate, contentType, storeType,depth }) => {
    const [gameImages, setGameImages] = useState([]);
    const [id, setId] = useState("");

    useEffect(() => {
        const getFileList = async (uploader, regdate, contentType, storeType) => {
            await axios.get(`${ip}/Files/files/${uploader}/${regdate}/${contentType}/${storeType}/${depth}`, {

            }, {

            })
                .then(res => {
                    return res.data
                })
                .then(data => {
                    console.log("메인 이미지 파일 1개 이상");
                    console.log(data);
                    setGameImages(data);
                })
        }

        getFileList(uploader, regdate, contentType, storeType);
        setId(gameImages[0].id);
    });

    


    return (
        <img src={`${ip}/Files/file/${id}/${gameImages[0].uploader}/${gameImages[0].regdate}/${gameImages[0].contentType}/${gameImages[0].storeType}/${gameImages[0].depth}`} alt="게임 이미지" />
    );

}

export default GameMainImg;