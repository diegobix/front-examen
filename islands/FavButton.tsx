import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";

type Props = {
  userid: string;
  videoid: string;
  fav: boolean;
};

const FavButton: FunctionComponent<Props> = ({ userid, videoid, fav }) => {
  const [isFav, setIsFav] = useState<boolean>(fav);

  const toggleFav = async (userid: string, videoid: string) => {
    const res = await fetch(
      `https://videoapp-api.deno.dev/fav/${userid}/${videoid}`,
      {
        method: "POST",
      },
    );
    if (!res.ok) {
      console.log("No funciona", userid, videoid);

      return;
    }
    setIsFav(!isFav);
  };

  return (
    <button class="fav-button" onClick={() => toggleFav(userid, videoid)}>
      {isFav ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
    </button>
  );
};

export default FavButton;
