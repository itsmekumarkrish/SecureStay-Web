import React, { useState, useRef } from 'react';
import { Sparkles, Pause, Play, Volume2, VolumeX, Maximize, MapPin, CheckCircle } from 'lucide-react';

export default function ContactSection({ formData, setFormData, formSubmitted, handleSubmit }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [showControls, setShowControls] = useState(false);

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || !timeInSeconds) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    if (total > 0) {
      setVideoProgress((current / total) * 100);
      setCurrentTime(formatTime(current));
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(formatTime(videoRef.current.duration));
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const seekTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
    setVideoProgress(parseFloat(e.target.value));
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-card">
          <div className="contact-info">
            <h2>Contact SecureStay</h2>
            <p>Have questions or want to partner with us? Leave your message and our team will get back to you shortly.</p>
            
            {/* Left-Side Video Showcase */}
            <div 
              className={`contact-video-box ${!isPlaying ? 'is-paused' : ''}`}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              <video
                ref={videoRef}
                className="contact-video-element"
                src="https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-living-room-41525-large.mp4"
                poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                loop
                muted={isMuted}
                playsInline
                autoPlay
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlay}
              />

              {/* Sleek Center Play/Pause Button */}
              <button 
                type="button" 
                className={`video-center-play-btn ${!isPlaying || showControls ? 'visible' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                aria-label={isPlaying ? "Pause Video" : "Play Video"}
              >
                <span className="play-pulse-ring"></span>
                {isPlaying ? (
                  <Pause size={22} />
                ) : (
                  <Play size={22} className="play-icon-offset" />
                )}
              </button>

              {/* Top Badge Overlay */}
              <div className="contact-video-top-bar">
                <div className="video-tag-pill">
                  <Sparkles size={11} /> Verified Property Tour
                </div>
              </div>

              {/* Professional Bottom Control Bar & Progress Slider */}
              <div className={`video-controls-bar ${!isPlaying || showControls ? 'visible' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="video-progress-container">
                  <input 
                    type="range" 
                    className="video-progress-slider"
                    min="0" 
                    max="100" 
                    step="0.1"
                    value={videoProgress || 0}
                    onChange={handleSeek}
                    aria-label="Video Progress Scrubber"
                    style={{
                      background: `linear-gradient(to right, #c59b27 ${videoProgress}%, rgba(255, 255, 255, 0.3) ${videoProgress}%)`
                    }}
                  />
                </div>

                <div className="video-controls-bottom">
                  <div className="controls-left">
                    <button 
                      type="button" 
                      className="v-control-btn"
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause" : "Play"}
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                    </button>

                    <button 
                      type="button" 
                      className="v-control-btn"
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute" : "Mute"}
                      title={isMuted ? "Unmute Audio" : "Mute Audio"}
                    >
                      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>

                    <span className="video-time-display">
                      {currentTime} / {duration}
                    </span>
                  </div>

                  <div className="controls-right">
                    <button 
                      type="button" 
                      className="v-control-btn"
                      onClick={toggleFullscreen}
                      aria-label="Fullscreen"
                      title="Toggle Fullscreen"
                    >
                      <Maximize size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-details">
              <div className="contact-row">
                <MapPin size={18} className="text-green" />
                <span>Bangalore • Mysuru • Hyderabad • Chennai</span>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            {!formSubmitted ? (
              <form id="contact-form" onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Your Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="+91 98765 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>I am a</label>
                  <select 
                    value={formData.userType}
                    onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                  >
                    <option value="owner">Property Owner / Landlord (Want to list property / avail residential services)</option>
                    <option value="tenant">Tenant / Guest (Looking for a home to rent)</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message / Property Details</label>
                  <textarea 
                    rows={3} 
                    placeholder="Tell us a little about your property or stay requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            ) : (
              <div className="form-success text-center">
                <CheckCircle size={48} className="text-green mx-auto mb-2" />
                <h3>Thank You!</h3>
                <p>We have received your message. Our representative will contact you within 24 hours.</p>
                <button className="btn-secondary mt-3" onClick={() => setFormData({ name: '', phone: '', email: '', userType: 'owner', message: '' })}>
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
