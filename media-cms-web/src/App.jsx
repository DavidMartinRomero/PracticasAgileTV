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

function VideoForm({ onSaved }){
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [format, setFormat] = useState("DASH");
  const [drm, setDrm] = useState("WIDEVINE");
  const [loading, setLoading] = useState(false);
  const [error, serError] = useState(null);

  const isValid = title.trim() !== "" && Number(duration) > 0;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try{
      const res = await fetch("http://localhost:8081/api/videos", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          title,
          duration: Number(duration),
          format,
          drm,
        }),
      });
      if (!res.ok) throw new Error("Error al crear el video");
      setTitle("");
      setDuration("");
      onSaved();
    }catch (err){
      setError(err.message);
    }finally{
      setLoading(false)
    }
  }

  return(
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Titulo'/>
      <input value={duration} onChange={e => setDuration(e.target.value)} placeholder='Duración (s)' type='number'/>
      <select value={format} onChange={e => setFormat(e.target.value)}>
        <option>DASH</option>
        <option>HLS</option>
        <option>SMOOTHSTREAMING</option>
      </select>
      <select value={drm} onChange={e => setDrm(e.target.value)}>
        <option>WIDEVINE</option>
        <option>FAIRPLAY</option>
        <option>PLAYREADY</option>
      </select>
      {error && <p style={{color: "red"}}>{error}</p>}
      <button type='submit' disabled={!isValid || loading}>
        {loading ? "Guardando..." : "Crear vídeo"}
      </button>
    </form>
  );
}



function App() {
  
}

export default App
