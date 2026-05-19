import AiImagePlayground from "./components/AiImagePlayground";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">hello world</h1>
      <div className="mt-6 flex flex-col justify-between gap-8 md:flex-row md:gap-6">
        <div className="md:w-1/2">
          <p className="mb-1 font-medium">로고</p>
          <AiImagePlayground
            instanceId="logo"
            heading="로고 · 이미지 생성 테스트"
            previewAreaLabel="로고 영역"
            placeholder="로고 자리"
            defaultPrompt="심플한 원형 로고, 티셔츠 브랜드, 미니멀 벡터 스타일"
            previewAlt="생성된 로고"
            rootClassName="mt-2"
          />
        </div>
        <div className="md:w-1/2">
          <p className="mb-1 font-medium">유니폼</p>
          <AiImagePlayground
            instanceId="uniform"
            heading="유니폼 · 마스크 인페인트"
            previewAreaLabel="유니폼 미리보기"
            placeholder="유니폼 자리"
            defaultPrompt="가슴 마스크 영역만: 네이비 원형 엠블럼에 흰색 번개 아이콘, 그 아래 작은 글씨로 THUNDER FC, 나머지 틀·소매·배경은 그대로 유지"
            previewAlt="인페인트된 유니폼"
            rootClassName="mt-2"
            imageMode="uniform-inpaint"
          />
        </div>
      </div>
    </div>
  );
}
