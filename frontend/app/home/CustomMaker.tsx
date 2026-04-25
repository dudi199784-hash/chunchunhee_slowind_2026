export default function CustomMaker() {
  return (
    <section className="mt-20 pb-20 px-6 md:px-10 max-w-7xl mx-auto border border-red-500">
      <h2 className="flex justify-center mb-6">커스텀 제작</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full min-h-[650px] border border-white-100">
          <h2 className="flex flex-col items-center">팀 로고 생성</h2>
        </div>
        <div className="w-full min-h-[650px] border border-white-100">
          <h2 className="flex flex-col items-center">상품 디자인 생성</h2>
        </div>
      </div>
    </section>
  );
}
