import { FunctionComponent } from "preact";
import { VideoType } from "../types.ts";
import VideoItem from "./VideoItem.tsx";

type Props = {
  videos: VideoType[];
  userid: string;
};

const VideoList: FunctionComponent<Props> = ({ videos, userid }) => {
  return (
    <>
      <h1 class="video-list-title">Curso Deno Fresh</h1>
      <div class="video-list-container">
        {videos.map((video) => (
          <VideoItem key={video.id} userid={userid} video={video} />
        ))}
      </div>
    </>
  );
};

export default VideoList;
