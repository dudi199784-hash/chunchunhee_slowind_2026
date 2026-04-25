import ScreenVideo from "./home/ScreenVideo";
import Recommend from "./home/Recommend";
import CustomMaker from "./home/CustomMaker";

export default function Home() {
  return (
    <div className="border border-red-500">
      <strong className="flex flex-col items-center">Home</strong>
      <div className="w-full min-h-dvh flex items-center justify-center border border-red-500">
        <ScreenVideo />
      </div>
      <div>
        <Recommend />
      </div>
      <CustomMaker />
    </div>
  );
}
