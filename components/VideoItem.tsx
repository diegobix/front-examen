import { FunctionComponent } from "preact";
import { VideoType } from "../types.ts";
import FavButton from "../islands/FavButton.tsx";

type Props = {
  video: VideoType;
  userid: string;
};

const VideoItem: FunctionComponent<Props> = ({ video, userid }) => {
  return (
    <div class="video-item">
      <a href={`/video/${video.id}`} class="video-link">
        <img src={video.thumbnail} alt={video.title} class="video-thumbnail" />
        <div class="video-info">
          <h3 class="video-title">{video.title}</h3>
          <p class="video-description">{video.description}</p>
          <p class="video-release-date">
            {`Release date: ${new Date(video.date).toLocaleDateString()}`}
          </p>
        </div>
      </a>
      <FavButton userid={userid} videoid={video.id} fav={video.fav} />
    </div>
  );
};

export default VideoItem;
