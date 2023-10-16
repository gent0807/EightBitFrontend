import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

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
        <Profile src={localStorage.getItem("profileImageDir") + profileImagePath} />
    );
}

export default WriterProfile;

const Profile = styled.img
`
    width: 20px;
    height: 20px;
    border-radius: 100%;
    cursor: pointer;
`