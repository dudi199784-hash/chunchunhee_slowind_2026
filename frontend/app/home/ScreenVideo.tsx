import MediaSlot from "@/components/media/MediaSlot";
import { heroMedia } from "@/config/media";

export default function ScreenVideo() {
  return (
    <div className="relative flex w-full min-h-dvh items-center justify-center border border-red-500 bg-white text-neutral-900">
      <div className="absolute inset-0">
        <MediaSlot
          media={heroMedia}
          className="h-full min-h-dvh"
          sizes="100vw"
          fallback={
            <h2 className="text-lg font-medium md:text-xl">비디오 영상</h2>
          }
        />
      </div>
    </div>
  );
}
