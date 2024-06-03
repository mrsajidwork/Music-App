import '../App.css'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function Header(props) {

    const [playIcon, setPlayIcon] = useState('assets/images/play-buttton.png')

    const [audioStatus, setAudioStatus] = useState('Paused')

    const [muteIcon, setMuteIcon] = useState('assets/images/volume-up-interface-symbol.png')

    Header.propTypes = {
        currentPlaying: PropTypes.object,
        currentPlayingName: PropTypes.string,
    };

    const playPauseSwitch = () => {
        if (props.currentPlaying !== null) {
            if (props.currentPlaying.paused) {
                props.currentPlaying.play()
            } else {
                props.currentPlaying.pause()
            }
        }
    }

    const volumeControl = (e) => {

            if (props.currentPlaying !== null) {
                props.currentPlaying.volume = e.target.value / 100
                if (e.target.value == 0) {
                    setMuteIcon('assets/images/mute.png')
                } else {
                    setMuteIcon('assets/images/volume-up-interface-symbol.png')
                }
            }
     
    }

    const muteUnmute = () => {
        if (props.currentPlaying !== null) {
            if (props.currentPlaying.muted) {
                props.currentPlaying.muted = false
                setMuteIcon('assets/images/volume-up-interface-symbol.png')
            } else {
                props.currentPlaying.muted = true
                setMuteIcon('assets/images/mute.png')
            }
        }
    }

    useEffect(() => {
        if (props.currentPlaying !== null) {
            props.currentPlaying.onplay = () => {
                setPlayIcon('assets/images/pause.png')
                setAudioStatus('Playing')
            }
            props.currentPlaying.onpause = () => {
                setPlayIcon('assets/images/play-buttton.png')
                setAudioStatus('Paused')
            }
            props.currentPlaying.onended = () => {
                setPlayIcon('assets/images/play-buttton.png')
                setAudioStatus('Paused')
            }
        }

    }, [props.currentPlaying])


  return (
    <>

        <div className="header-b">
            <div className="container">
                <div className="header-bottom">
                    <img id="audio" src={playIcon} alt="" onClick={playPauseSwitch}/>
                    <div className="music">
                        <div className="inner-div">
                            <img src="assets/images/130_168.jpg" alt=""/>
                            <div className="content">
                                <p>{audioStatus}</p>
                                <h4 id="songname">{props.currentPlayingName}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="main-vol">
                        <div className="volume">
                            <div className="icon">
                            <img src={muteIcon} alt="" id="vol-icon" onClick={muteUnmute} />
                            </div>
                            <div className="range-container">
                                <input type="range" id="range-volume" onChange={volumeControl}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
