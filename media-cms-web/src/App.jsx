import { useEffect, useState } from 'react'
import './App.css'

function VideoList(){
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/api/videos")
    .then(res => {
      if (!res.ok) throw new Error("Network error");
      return res.json();
    })
    .then(setVideos).catch(err => setError(err.message));
  }, [])

  if (error) return <p>{error}</p>;

  return(
    <ul>
      {videos.map(v => (
        <li key={v.id}>
          {v.title} - {v.format} ({v.duration}s)
        </li>
      ))}
    </ul>
  );
}



function App() {
  
}

export default App
