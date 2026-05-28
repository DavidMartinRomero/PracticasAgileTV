import { useEffect, useState } from 'react'

function VideoList() {
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

  return (
    <ul>
      {videos.map(v => (
        <li key={v.id}>
          {v.title} - {v.format} ({v.duration}s)
        </li>
      ))}
    </ul>
  );
}

function AppConfig() {
  const [clientType, setClientType] = useState("consumer");
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8081/api/config?clientType=${clientType}`)
      .then(res => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then(cfg => {
        setConfig(cfg);
        document.documentElement.style.setProperty('--primary_color', cfg.theme.primaryColor);
        document.documentElement.style.setProperty('--secondary_color', cfg.theme.secondaryColor);
      })
      .catch(err => setError(err.message));
  }, [clientType])

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '6px' }}>
      <div style={{ width: '50%', backgroundColor: 'var(--secondary_color)', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.454)' }}>
        <div style={{backgroundColor: 'var(--primary_color)', borderRadius: '10px 10px 0 0', paddingBottom: '5px'}}>
          <label style={{ fontWeight: 'bold', color: 'white', marginRight: '10px' }}>Tipo de cliente:</label>
          <select value={clientType} onChange={e => setClientType(e.target.value)}>
            <option>CONSUMER</option>
            <option>ENTERPRISE</option>
            <option>PARTNER</option>
          </select>
        </div>
        {config && (
<<<<<<< HEAD
          <div style={{ color: 'black', padding: '10px 16px', borderRadius: '8px', margin: '10px 0', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '10px', fontSize: '0.85em' }}>
=======
          <div style={{ color: 'black', padding: '10px 16px', borderRadius: '8px', margin: '16px 0', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '16px', fontSize: '0.85em' }}>
>>>>>>> aec84802a350ba8c39fa7bbe6781a45378bff8fc
            <span style={{ backgroundColor: 'var(--primary_color)', border: '1px solid black', borderRadius: '2px' }}>🎨 Color Primario: <strong style={{ opacity: 1 }}>{config.theme.primaryColor}</strong></span>
            <span style={{ backgroundColor: 'var(--secondary_color)', border: '1px solid black', borderRadius: '2px' }}>🎨 Color Secundario: <strong style={{ opacity: 1 }}>{config.theme.secondaryColor}</strong></span>
            <span style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '2px' }}>📺 Streams: <strong style={{ opacity: 1 }}>{config.features.maxConcurrentStreams}</strong></span>
            <span style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '2px' }}>⬇️ Descarga: <strong style={{ opacity: 1 }}>{config.features.downloadEnabled ? "Activada" : "Desactivada"}</strong></span>
            <span style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '2px' }}>📦 Formatos: <strong style={{ opacity: 1 }}>{config.features.allowedFormats.join(", ")}</strong></span>
            <span style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '2px' }}>🔒 DRM: <strong style={{ opacity: 1 }}>{config.features.allowedDrm.join(", ")}</strong></span>
          </div>
        )}
      </div>
    </div>
  );
}

function VideoForm({ onSaved }) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [format, setFormat] = useState("DASH");
  const [drm, setDrm] = useState("WIDEVINE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isValid = title.trim() !== "" && Number(duration) > 0;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8081/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', margin: '10px 10px 10px 10px', gap: '6px' }}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Titulo' style={{ height: '25px' }} />
      <input value={duration} onChange={e => setDuration(e.target.value)} placeholder='Duración (s)' type='number' style={{ height: '25px' }} />
      <select value={format} onChange={e => setFormat(e.target.value)} style={{ height: '27px' }}>
        <option>DASH</option>
        <option>HLS</option>
        <option>SMOOTHSTREAMING</option>
      </select>
      <select value={drm} onChange={e => setDrm(e.target.value)} style={{ height: '27px' }}>
        <option>WIDEVINE</option>
        <option>FAIRPLAY</option>
        <option>PLAYREADY</option>
      </select>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type='submit' disabled={!isValid || loading} style={{ cursor: 'pointer' }}>
        {loading ? "Guardando..." : "Crear vídeo"}
      </button>
    </form>
  );
}

function VideoEditForm({ video, onSaved, onDeleted, onCancel }) {
  const [title, setTitle] = useState(video.title);
  const [duration, setDuration] = useState(video.duration);
  const [format, setFormat] = useState(video.format);
  const [drm, setDrm] = useState(video.drm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isValid = title.trim() !== "" && Number(duration) > 0;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8081/api/videos/${video.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          duration: Number(duration),
          format,
          drm,
        }),
      });
      if (!res.ok) throw new Error("Error al actualizar el video");
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("¿Seguro que quieres eliminar este vídeo?")) return;
    try {
      const res = await fetch(`http://localhost:8081/api/videos/${video.id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Error al actualizar el video");
      onDeleted();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', margin: '10px 10px 10px 10px', gap: '5px' }}>
      <div style={{ display: 'flex', gap: '5px' }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Titulo' style={{ flex: '3', width: '0' }} />
        <input value={duration} onChange={e => setDuration(e.target.value)} placeholder='Duración (s)' type='number' style={{ flex: '1', width: '0' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
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
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
        <button type='submit' disabled={!isValid || loading} style={{ cursor: 'pointer' }}>
          {loading ? "Guardando..." : "Guardar vídeo"}
        </button>
        <button type='button' onClick={handleDelete} style={{ cursor: 'pointer' }}>Borrar</button>
        <button type='button' onClick={onCancel} style={{ cursor: 'pointer' }}>Cancelar</button>
      </div>
    </form>
  );
}

function App() {
  const [videos, setVideos] = useState([]);
  const [editingVideo, setEditing] = useState(null);

  async function loadVideos() {
    const res = await fetch("http://localhost:8081/api/videos");
    setVideos(await res.json());
  }

  useEffect(() => { loadVideos(); }, []);

  return (
    <div style={{ dispay: 'flex', flexDirection: 'column' }}>

      <header>
        <img src="https://agiletv.com/wp-content/uploads/2024/11/agile-tv-icon-e1732018103457-75x75.png" alt="AgileTV logo" />
        <h1 style={{
          height: '50px', width: '100%', marginTop: '0', display: 'flex', justifyContent: 'center',
          alignItems: 'center', backgroundColor: 'rgb(0, 45, 114)', fontSize: '20px', color: 'white'
        }}>MediaAsset CMS</h1>
      </header>

      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>

        <div style={{ width: '50%', backgroundColor: '#8a93ba', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.454)' }}>
          <h4 style={{ borderRadius: '10px 10px 0 0', backgroundColor: 'rgba(0, 0, 0, 0.254)', color: 'white' }}>Añadir video</h4>
          <VideoForm onSaved={loadVideos} />
        </div>

        <div style={{ width: '50%', backgroundColor: 'rgb(138, 147, 186)', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.454)' }}>
          <h4 style={{ borderRadius: '10px 10px 0 0', backgroundColor: 'rgba(0, 0, 0, 0.254)', color: 'white' }}>Vídeos en el CMS. ({videos.length} videos.)</h4>
          <ul style={{ listStyle: 'none', paddingLeft: '0', backgroundColor: 'rgb(138, 147, 186)' }}>
            {videos.map(v => (
              <li style={{ backgroundColor: 'rgb(138, 147, 186)' }} key={v.id}>
                {editingVideo?.id === v.id ? (
                  <VideoEditForm
                    video={v}
                    onSaved={() => { setEditing(null); loadVideos(); }}
                    onDeleted={() => { setEditing(null); loadVideos(); }}
                    onCancel={() => setEditing(null)}
                  />
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'white', margin: '10px 10px 10px 10px' }}>
                    <span style={{ backgroundColor: 'white', color: 'black' }}>
                      {v.title}
                    </span>
                    <span style={{ backgroundColor: 'white', color: 'black' }}>
                      {v.format} · {v.drm} · ({v.duration}s)
                      <button style={{ margin: '3px 3px 3px 10px', cursor: 'pointer' }} onClick={() => setEditing(v)}>Editar</button>
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AppConfig>

      </AppConfig>
    </div >
  )
}

export default App
