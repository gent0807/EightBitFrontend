import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const WriterProfile = ({ writer }) => {
    const [profileImagePath, setProfileImagePath] = useState("");
    const ip = localStorage.getItem("ip");

    useEffect(() => {
        const getUserProfileImagePath = (writer) => {
            axios.get(`${ip}/Users/profileImgPath?nickname=${writer}`, {

            },
                {

                })
                .then((res) => {
                    return res.data;
                })
                .then(data => {
                    setProfileImagePath(data.profileImgPath);
                })

        }

        getUserProfileImagePath(writer);
    });

    return (


        <img style={{ width: "45px", height: "45px", borderRadius: "32px", cursor: "pointer" }} src={localStorage.getItem("profileImageDir") + profileImagePath} />


    );
}

export default WriterProfile;