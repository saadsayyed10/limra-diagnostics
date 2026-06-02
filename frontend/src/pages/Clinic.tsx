import { getProfileAPI } from "@/api/clinic.api";
import { getToken } from "@clerk/react";
import { Loader2, Mail, CalendarDays, Shield } from "lucide-react";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ClinicInterface {
  createdAt: string;
  email: string;
  name: string;
  profilePicUrl: string;
  status: boolean;
  type: "DOCTOR" | "RECEPTIONIST" | null;
}

const Clinic = () => {
  const [profile, setProfile] = useState<ClinicInterface | null>(null);

  const handleProfile = async () => {
    try {
      const token = await getToken();
      const res = await getProfileAPI(token!);

      setProfile(res.data.clinic);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);

  if (!profile) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <Card className="overflow-hidden">
        <div className="h-32 bg-linear-to-r from-neutral-800 to-neutral-600" />

        <CardContent className="relative pt-0">
          <div className="-mt-12 flex flex-col gap-6 md:flex-row md:items-end">
            <img
              src={profile.profilePicUrl}
              alt={profile.name}
              className="h-24 w-24 rounded-full border-4 border-background object-cover shadow-lg"
            />

            <div className="flex-1">
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <h1 className="text-3xl font-bold">{profile.name}</h1>

                <Badge variant={profile.status ? "default" : "secondary"}>
                  {profile.status ? "Active" : "Inactive"}
                </Badge>
              </div>

              <p className="text-muted-foreground">
                {profile.type ?? "Role not assigned"}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium">{profile.type ?? "TBD"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Joined On</p>
                <p className="font-medium">
                  {new Date(profile.createdAt).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Clinic;
