'use client';
import { Player } from '@remotion/player';
import { InviteVideo } from './InviteVideo';

export const VideoPlayer = () => {
  return (
    <div className="w-full mt-10">
      <Player
        component={InviteVideo}
        durationInFrames={150}
        fps={30}
        compositionWidth={1280}
        compositionHeight={720}
        controls
        acknowledgeRemotionLicense
        style={{ width: '100%', maxWidth: '100%' }}
      />
    </div>
  );
};
