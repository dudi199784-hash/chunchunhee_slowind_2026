import MediaSlot from "@/components/media/MediaSlot";
import { recommendMedia } from "@/config/media";

export default function Recommend() {
  return (
    <div>
      <div className="mx-auto mt-20 grid max-w-9xl grid-cols-1 gap-8 px-6 pb-20 md:grid-cols-4 md:px-10">
        {recommendMedia.map((item) => (
          <div
            key={item.id}
            className="relative w-full min-h-[320px] overflow-hidden border border-neutral-200"
          >
            <div className="absolute inset-0">
              <MediaSlot
                media={item.media}
                sizes="(max-width: 768px) 100vw, 25vw"
                className="h-full"
                fallback={
                  <span className="text-sm font-medium text-neutral-700">
                    {item.label}
                  </span>
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
