import { Handlers, PageProps } from "$fresh/server.ts";
import VideoList from "../components/VideoList.tsx";
import { State, VideoType } from "../types.ts";

type Data = {
  videos: VideoType[];
};

export const handler: Handlers<Data, State> = {
  GET: async (req, ctx) => {
    try {
      const res = await fetch(
        `https://videoapp-api.deno.dev/videos/${ctx.state.id}`,
      );
      if (!res.ok) {
        return new Response(null, {
          status: 307,
          headers: { "location": "/login" },
        });
      }
      const data = await res.json() as VideoType[];
      return ctx.render({ videos: data });
    } catch (e) {
      throw new Error(`Error: ${e}`);
    }
  },
};

export default (props: PageProps<Data, State>) => {
  return (
    <div class="video-page-container">
      <VideoList videos={props.data.videos} userid={props.state.id} />
    </div>
  );
};
