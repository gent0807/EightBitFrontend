import { useState, useEffect, useRef, useCallback } from 'react';
import styled from "styled-components";
import VideoSample from "../../Video/video.mp4"
import videoLogo from "../../Video/videoLogo.png"

const VideoPlayler = () => {
    return(
    <VideoAllBox>
        <VideoBackgroundBox>
        </VideoBackgroundBox>
        <Video
            autoPlay
            loop
            muted
            playsInline
            width="100%"
            height="100%"
            controls
        >
            <VideoSource src={VideoSample} type="video/mp4" />
        </Video>
    </VideoAllBox>
    );
}

export default VideoPlayler

const VideoAllBox = styled.div
    `
    
`

const VideoSource = styled.source
    `
    
`

const Video = styled.video
    `
    
`

const VideoBackgroundBox = styled.div
    `
    position: absolute;
    background: linear-gradient(to top, black 6%, transparent 47%, black 98%);
    width: 100%;
    height: 47.5vw;
    top: 0;
    left: 0;
    right: 0;
`

const VideoContainerBox = styled.div
    `
    max-width: 1280px;
    margin: 0 auto;
`