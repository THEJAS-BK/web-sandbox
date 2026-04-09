import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3000');

function App() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    socket.on('offer', async (offer) => {
      let pc = peerConnectionRef.current;
      if (!pc) {
        pc = initPeerConnection();
      }
      
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit('answer', answer);
    });

    socket.on('answer', async (answer) => {
      const pc = peerConnectionRef.current;
      if (pc) {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    socket.on('ice-candidate', async (candidate) => {
      const pc = peerConnectionRef.current;
      if (pc && candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    return () => {
      socket.off('offer');
      socket.off('answer');
      socket.off('ice-candidate');
    }
  }, []);

  const initPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', event.candidate);
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // If local stream was already captured by step 1, add it to this new connection
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
    }

    peerConnectionRef.current = pc;
    return pc;
  };

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      const pc = initPeerConnection();
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
      
      setHasStarted(true);
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  };

  const startCall = async () => {
    const pc = peerConnectionRef.current;
    if (!pc) return;
    
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit('offer', offer);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '10px' }}>Simple P2P WebRTC Call</h1>
      <p style={{ color: '#aaa', marginBottom: '30px' }}>Open this page in two browser windows side-by-side to test.</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px', flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ textTransform: 'uppercase', fontSize: '14px', letterSpacing: '1px' }}>Local</h3>
          <video ref={localVideoRef} autoPlay muted playsInline style={{ width: '400px', height: '300px', backgroundColor: '#333', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 8px 16px rgba(0,0,0,0.4)' }} />
        </div>
        <div>
           <h3 style={{ textTransform: 'uppercase', fontSize: '14px', letterSpacing: '1px' }}>Remote</h3>
          <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '400px', height: '300px', backgroundColor: '#333', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 8px 16px rgba(0,0,0,0.4)' }} />
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px' }}>
        {!hasStarted ? (
          <button onClick={startVideo} style={btnStyle}>Start Camera & Microphone</button>
        ) : (
          <button onClick={startCall} style={{ ...btnStyle, backgroundColor: '#10b981', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.3)' }}>Call Other User</button>
        )}
      </div>
    </div>
  );
}

const btnStyle = {
  padding: '12px 24px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#3b82f6',
  color: 'white',
  fontWeight: '600',
  transition: 'all 0.2s',
  boxShadow: '0 4px 6px rgba(59, 130, 246, 0.3)'
};

export default App;
