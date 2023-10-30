import Docbar from "./components/Docbar";
import TextEditor from "./components/TextEditor";

export default function Home() {
  return (
    <main className=" flex flex-row m-3">
      <Docbar />
      <div className="flex flex-col w-screen">
        <TextEditor />
      </div>
    </main>
  );
}
