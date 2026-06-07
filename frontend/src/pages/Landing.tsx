import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/react";
import { Activity, FileText, Stethoscope } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Left Side */}
        <div className="bg-slate-900 text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-3">LIMRA Sonography</h1>

          <p className="text-slate-300 mb-8">
            Secure diagnostic reporting and patient management platform for
            sonography and obstetrics workflows.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Stethoscope className="mt-1" />
              <div>
                <h3 className="font-semibold">Patient Management</h3>
                <p className="text-sm text-slate-400">
                  Manage patient records and medical history.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="mt-1" />
              <div>
                <h3 className="font-semibold">Report Generation</h3>
                <p className="text-sm text-slate-400">
                  Generate and store sonography reports instantly.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Activity className="mt-1" />
              <div>
                <h3 className="font-semibold">Clinical Workflow</h3>
                <p className="text-sm text-slate-400">
                  Streamlined workflow for doctors and staff.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-10 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome Back
            </h2>

            <p className="text-slate-500 mb-8">
              Sign in to access the LIMRA Clinic Management System.
            </p>

            <SignInButton mode="modal">
              <Button className="w-full h-11 text-base">Sign In</Button>
            </SignInButton>

            <div className="mt-10 pt-6 border-t text-sm text-slate-500">
              <p className="font-medium text-slate-700 mb-2">
                LIMRA Sonography & Clinic
              </p>

              <p>
                Natasha Enclave, C1 - 001
                <br />
                NIBM Post Office Road
                <br />
                Bhatnagar Colony, Kondhwa
                <br />
                Pune, Maharashtra 411048
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
