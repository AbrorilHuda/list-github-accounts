import { useEffect, useState } from "react";

export default function useGithub(usernames) {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const cacheKey = "githubProfilesCache";
    const cacheDuration = 24 * 60 * 60 * 1000; // 24 jam dalam milidetik
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
      try {
        const data = await Promise.all(
          usernames.map(async (username) => {
            const res = await fetch(`https://api.github.com/users/${username}`);
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
