"use client"
import { getUserById } from "@/services/auth.api";
import { useParams } from "next/navigation";
import { useEffect } from "react";

function page() {
  const { id } = useParams();
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return <div></div>;
}

export default page;
