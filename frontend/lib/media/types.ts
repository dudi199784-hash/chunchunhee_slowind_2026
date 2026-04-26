/**
 * 홈/네비 등에서 쓰는 이미지·비디오 소스 정의.
 * `src`는 보통 `public/` 기준 경로 (예: `/media/hero.mp4`).
 */
export type MediaImage = {
  kind: "image";
  src: string;
  alt: string;
  priority?: boolean;
};

export type MediaVideo = {
  kind: "video";
  src: string;
  poster?: string;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
};

export type MediaSource = MediaImage | MediaVideo;
