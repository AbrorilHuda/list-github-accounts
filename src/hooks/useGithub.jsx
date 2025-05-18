import { useEffect, useState } from "react";

export default function useGithub(usernames) {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const cacheKey = "githubProfilesCache";
    // 24 * 60 * 60 * 1000 ini untuk 24 jam dalam milidetik
    const cacheDuration = 12 * 60 * 60 * 1000; // 12 jam dalam milidetik
    const cachedData = localStorage.getItem(cacheKey);

    const fetchProfiles = async () => {
      // Cek kalau ada cache dan belum expired
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < cacheDuration) {
          setProfiles(data);
          return; // Keluar dari fungsi, nggak perlu fetch
        }
      }

      // Kalau nggak ada cache atau expired, fetch baru
      // GITHUB token biar akses ke API github memiliki limitasi yang lebih tinggi
      // kalian bisa bikin token github di settingan github kalian dan simpan di .env
      try {
        const data = await Promise.all(
          usernames.map(async (username) => {
            const res = await fetch(
              `https://api.github.com/users/${username}`,
              {
                headers: {
                  Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
                  Accept: "application/vnd.github.v3+json",
                },
              }
            );
            if (!res.ok) throw new Error(`Failed to fetch user ${username}`);
            return await res.json();
          })
        );
        setProfiles(data);
        // Simpan ke cache dengan timestamp
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data, timestamp: Date.now() })
        );
      } catch (error) {
        console.error("Fetch error:", error);
        setProfiles([]); // Reset profiles kalau error
      }
    };

    fetchProfiles();
  }, [usernames]);

  return profiles;
}
