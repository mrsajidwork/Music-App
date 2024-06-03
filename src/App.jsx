import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

function App() {

  // https://danisha18.sg-host.com/wp-json/mp3-tracks-api/v1/tracks

  const [tracks, setTracks] = useState([]);
  const [currentPlaying, setCurrentPlaying] = useState(null)
  const [currentPlayingName, setCurrentPlayingName] = useState('')

  const getTracks = async () => {
    try {
      const response = await axios.get('https://danisha18.sg-host.com/wp-json/mp3-tracks-api/v1/tracks')
      setTracks(response.data)
      console.log(response.data);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getTracks()
  }, [])

  const playingAudio = (e) => {
    e.preventDefault()
    const trackUrl = e.currentTarget.getAttribute('data-track-url')
    if(currentPlaying) {
      currentPlaying.pause()
    }

    //if previous playing is muted then mute the new playing
    if(currentPlaying && currentPlaying.muted) {
      const audio = new Audio(trackUrl)
      audio.muted = true
      audio.play()
      setCurrentPlaying(audio)
      setCurrentPlayingName(e.currentTarget.querySelector('p').innerText)
      return
    }

    const audio = new Audio(trackUrl)
    audio.play()
    setCurrentPlaying(audio)
    setCurrentPlayingName(e.currentTarget.querySelector('p').innerText)
  
  }

  return (
    <>

      <Header currentPlaying={currentPlaying} setCurrentPlaying={setCurrentPlaying} currentPlayingName={currentPlayingName} />
      <div className="song">
          <ul id="ul-song">
            {
              tracks.map((track, index) => (
                <li className="card" key={index} data-track-url={track.url} onClick={playingAudio} data-track-id={track.id}>
                  <a href="javascript.void(0)" id="card">
                    <img src="assets/images/130_168.jpg" alt="" />
                    <span><img src="assets/images/23_136.png" alt=""/></span>
                    <span><p>{track.name}</p></span>
                  </a>
                </li>
              ))
            }

          </ul>
      </div>
      <Footer />
    </>
  )
}

export default App
