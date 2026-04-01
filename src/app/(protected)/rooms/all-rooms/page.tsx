"use client";

import { fetchAllListings } from "@/services/rooms.api";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function page() {
  const [allListingsData, setAllListingsData] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetchAllListings();
        setAllListingsData(res.data);
        console.log(res.data);
      } catch (error) {
        toast.error("something went wrong");
      }
    };

    fetchListings();
  }, []);

  return <div></div>;
}

export default page;
