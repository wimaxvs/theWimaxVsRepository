
'use client';
import { useEffect, useState } from "react";
import { SafeDriver } from "@/app/types";

const useDrivers = () => {
  const [drivers, setDrivers] = useState<Partial<SafeDriver>[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/drivers");
        const data = await response.json();
        setDrivers(data.drivers);
      } catch (error) {
        console.error("Failed to fetch drivers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  return { drivers, loading };
};

export default useDrivers;
