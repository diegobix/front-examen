import { Handlers, PageProps } from "$fresh/server.ts";
import VideoDetail from "../../components/VideoDetail.tsx";
import { State, VideoType } from "../../types.ts";

type Data = {
  video: VideoType;
};

export const handler: Handlers<Data, State> = {
  GET: async (req, ctx) => {
    const videoid = ctx.params.videoid;

    try {
      const res = await fetch(
        `https://videoapp-api.deno.dev/video/${ctx.state.id}/${videoid}`,
      );
      if (!res.ok) {
        if (res.status === 404) {
          return new Response(null, {
            status: 307,
            headers: { "location": "/login" },
          });
        } else {
          throw new Error("Error inesperado");
        }
      }

      const data = await res.json() as VideoType;
      return ctx.render({ video: data });
    } catch (e) {
      throw new Error(`Error: ${e}`);
    }
  },
};

export default (props: PageProps<Data, State>) => {
  return <VideoDetail userid={props.state.id} video={props.data.video} />;
};
