import LogoImagePlayground from "./components/LogoImagePlayground";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">hello world</h1>
      <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:gap-2">
        <div className="md:w-1/2">
          로고
          <br />
        </div>
        <div className="md:w-1/2">
          유니폼
          <br />
        </div>
      </div>
      <LogoImagePlayground />
    </div>
  );
}
