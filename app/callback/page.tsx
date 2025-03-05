import Redirect from "@/components/Redirect";
import { redirect } from "next/navigation";
import { apiUrl } from "@/constants/url";
import axios from "axios";

interface DashboardProps {
  searchParams: Promise<{ code?: string }>;
}

const getCodes = async (code: string) => {
  try {
    const response = await axios.post(
      `${apiUrl}/callback`,
      { code },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

const CallbackPage = async ({ searchParams }: DashboardProps) => {
  const { code } = await searchParams;

  const data = await getCodes(String(code));

  if (data && data.ok) {
    return (
      <div>
        <Redirect {...data} />
      </div>
    );
  } else {
    redirect("/googlerest");
  }
};

export default CallbackPage;
