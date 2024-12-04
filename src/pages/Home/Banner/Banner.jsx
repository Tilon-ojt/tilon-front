import { ChevronDown } from 'lucide-react';
import "./Banner.css"

function Banner() {
    return (
        <div className='video-container'>
            {/* 배경 비디오 */}
            <video
                className="home-video"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="https://www.tilon.com/downloads/main_video.mp4" loop='loop' muted='muted' autoPlay='autoplay' type="video/mp4" />
            </video>
            <div className='description'>
                <div className="description-title">
                    <h1>Hyperwork</h1>
                    <h1>Solution for DX</h1>
                </div>
                <h5>언제, 어디서나, 어떠한 환경에서도 단 한번의 클릭으로 <br /></h5>
                <h5>업무 환경에 접속할 수 있도록 Hyper Connect 합니다.</h5>
            </div>
            <div className='arrow-icons-container'>
                <ChevronDown size={40} color='white' />
                <ChevronDown size={40} color='white' />
                <ChevronDown size={40} color='white' />
            </div>
        </div>
    )
}

export default Banner;