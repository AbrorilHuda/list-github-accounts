import { useMemo } from "react";
import useGithub from "./hooks/useGithub";
import { nameGithub } from "./lib/data";
export default function App() {
  const nama = useMemo(() => nameGithub, []);
  const name = useGithub(nama);
  console.log(name);
  return (
    <div className="mt-10 justify-center flex flex-col items-center">
      <h1 className="text-2xl mb-4 font-bold text-gray-800 dark:text-white">
        List pengumpulan Akun Github total {name.length}
      </h1>
      {name.length === 0 && (
        <div className="text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
      <div className="flex flex-wrap gap-6 justify-start">
        {name.map((profile, key) => (
          <div className="flex flex-col items-center w-24" key={key}>
            <img
              src={profile.avatar_url}
              className="w-16 h-16 bg-gray-300 rounded-full"
            ></img>
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-full h-6 bg-white rounded-md shadow mt-2 text-center text-sm font-medium">
                {profile.login}
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
