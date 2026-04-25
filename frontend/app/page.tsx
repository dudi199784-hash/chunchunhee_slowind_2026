import ScreenVideo from "./home/ScreenVideo";
import Recommend from "./home/Recommend";
import CustomMaker from "./home/CustomMaker";
import Slogan from "./home/Slogan";

export default function Home() {
  return (
    <div className="bg-white text-neutral-900 border border-red-500">
      <ScreenVideo />
      <Recommend />
      <CustomMaker />
      <Slogan />
    </div>
  );
}
