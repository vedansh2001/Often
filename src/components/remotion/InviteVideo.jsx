'use client';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { useState, useEffect } from 'react';
import useInviteStore from '../../lib/zustandStore';


export const InviteVideo = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  
  const {
    startDate,
    startTime,
    endDate,
    endTime,
    selectedTheme,
    selectedThemeType,
    price,
    isEditing,
    isApproved,
    capacity,
  } = useInviteStore();

  const isImage = selectedThemeType?.startsWith('image');
  const isVideo = selectedThemeType?.startsWith('video');

  const titleStart = 0; 
  const detailsStart = 10; 
  const statusStart = 60; 
  const particlesStart = 0; 

  const titleProgress = spring({
    frame: frame - titleStart,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
      mass: 0.5,
    },
  });

  const titleOpacity = interpolate(frame, [titleStart, titleStart + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleScale = interpolate(titleProgress, [0, 1], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const detailItems = [
    { label: 'Start', value: `${startDate} at ${startTime}`, delay: 0 },
    { label: 'End', value: `${endDate} at ${endTime}`, delay: 8 },
    { label: 'Price', value: price, delay: 16 },
    { label: 'Capacity', value: capacity, delay: 24 },
  ];

  const statusProgress = spring({
    frame: frame - statusStart,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
    },
  });

  const particleCount = 12;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    delay: i * 5,
    amplitude: 20 + (i % 3) * 10,
    frequency: 0.02 + (i % 4) * 0.01,
    offsetX: (i % 4) * 25,
    offsetY: (i % 3) * 30,
  }));

  const backgroundScale = isImage ? interpolate(
    frame,
    [0, durationInFrames],
    [1, 1.1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  ) : 1;

  const shimmerProgress = (frame * 0.02) % 2;

  return (
    <AbsoluteFill style={{ position: 'relative', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      {/* Background */}
      {isVideo ? (
        <video
          src={selectedTheme}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
      ) : isImage ? (
        <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
          <img
            src={selectedTheme}
            alt="Theme"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              transform: `scale(${backgroundScale})`,
              transition: 'transform 0.1s ease-out',
            }}
          />
          {/* Shimmer overlay for images */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: `${-100 + shimmerProgress * 100}%`,
              width: '200%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
              zIndex: 1,
            }}
          />
        </div>
      ) : (
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
        />
      )}

      <div
        style={{
          background: `linear-gradient(135deg, 
            rgba(0, 0, 0, ${0.3 + Math.sin(frame * 0.01) * 0.1}), 
            rgba(0, 0, 0, ${0.6 + Math.cos(frame * 0.008) * 0.15})
          )`,
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 2,
        }}
      />

      {isImage && frame > particlesStart && particles.map((particle) => {
        const particleFrame = frame - particlesStart - particle.delay;
        if (particleFrame < 0) return null;

        const particleOpacity = interpolate(particleFrame, [0, 30], [0, 0.6], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const floatY = Math.sin(particleFrame * particle.frequency) * particle.amplitude;
        const floatX = Math.cos(particleFrame * particle.frequency * 0.7) * (particle.amplitude * 0.5);

        return (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: `${20 + particle.offsetX}%`,
              top: `${20 + particle.offsetY}%`,
              transform: `translate(${floatX}px, ${floatY}px)`,
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.8)',
              opacity: particleOpacity,
              zIndex: 3,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            }}
          />
        );
      })}

      <div
        style={{
          zIndex: 4,
          position: 'relative',
          color: 'white',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        {frame > titleStart && (
          <div
            style={{
              opacity: titleOpacity,
              transform: `scale(${titleScale}) translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
              marginBottom: '60px',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #fff 0%, #f0f8ff 50%, #e6f3ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 20px rgba(255, 255, 255, 0.3)',
                margin: 0,
                letterSpacing: '2px',
              }}
            >
              You're Invited!
            </h1>
            <div
              style={{
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1)',
                margin: '20px auto',
                borderRadius: '2px',
                transform: `scaleX(${titleProgress})`,
              }}
            />
          </div>
        )}

        <div style={{ marginBottom: '40px' }}>
          {detailItems.map((item, index) => {
            const itemFrame = frame - (detailsStart + item.delay);
            if (itemFrame < 0) return null;

            const itemProgress = spring({
              frame: itemFrame,
              fps,
              config: {
                damping: 200,
                stiffness: 120,
              },
            });

            const itemOpacity = interpolate(itemFrame, [0, 20], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={index}
                style={{
                  opacity: itemOpacity,
                  transform: `translateX(${interpolate(itemProgress, [0, 1], [-50, 0])}px)`,
                  marginBottom: '20px',
                  padding: '15px 30px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '28px',
                  fontWeight: '600',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}
              >
                <span style={{ color: '#4ecdc4', marginRight: '15px' }}>
                  {item.label}:
                </span>
                <span style={{ color: '#ffffff' }}>
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>

        {frame > statusStart && (
          <div
            style={{
              opacity: interpolate(frame, [statusStart, statusStart + 20], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: `translateY(${interpolate(statusProgress, [0, 1], [30, 0])}px) scale(${interpolate(statusProgress, [0, 1], [0.9, 1])})`,
              display: 'flex',
              gap: '30px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                padding: '12px 24px',
                background: isApproved 
                  ? 'linear-gradient(135deg, #4CAF50, #45a049)' 
                  : 'linear-gradient(135deg, #f44336, #d32f2f)',
                borderRadius: '25px',
                fontSize: '18px',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              {isApproved ? '✅ Approved' : '❌ Pending'}
            </div>
            
            {isEditing && (
              <div
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #ff9800, #f57c00)',
                  borderRadius: '25px',
                  fontSize: '18px',
                  fontWeight: '600',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                🛠️ In Edit Mode
              </div>
            )}
          </div>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '60px',
          height: '60px',
          border: '3px solid rgba(255, 255, 255, 0.3)',
          borderRight: 'none',
          borderBottom: 'none',
          zIndex: 5,
          opacity: interpolate(frame, [0, 60], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          border: '3px solid rgba(255, 255, 255, 0.3)',
          borderLeft: 'none',
          borderTop: 'none',
          zIndex: 5,
          opacity: interpolate(frame, [0, 60], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />
    </AbsoluteFill>
  );
};