import { useMemo } from "react";
import useGithub from "./hooks/useGithub";
import { nameGithub } from "./lib/data";
export default function App() {
  const nama = useMemo(() => nameGithub, []);
  const name = useGithub(nama);
  return (
    <div className="mt-10 justify-center flex flex-col items-center">
      <h1 className="text-2xl mb-4 font-bold text-gray-800 dark:text-white text-center">
        List pengumpulan Akun Github total {name.length}
      </h1>
      {name.length === 0 && (
        <div className="text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
      <div className="flex flex-wrap gap-6 justify-center">
        {name.map((profile, key) => (
          <div className="flex flex-col items-center w-24" key={key}>
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={profile.avatar_url}
                className="w-16 h-16 bg-gray-300 rounded-full"
              ></img>
            </a>

            <div className="w-full h-4 bg-white rounded-md shadow mt-2 text-center text-xs font-medium">
              {profile.login}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
