import API_URL from "./utils/config";

export default function Home() {

fetch(`${API_URL}/api/health`)
  .then(res => res.json())
  .then(data => console.log(data));


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Test</h1>
    </div>
  );
}
