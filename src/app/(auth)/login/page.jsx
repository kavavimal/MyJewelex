import Image from "next/image";
import Form from "@/components/Form";
import Link from "next/link";
import Button from "@/components/Button";

export default async function Login() {
  return (
    <div className="h-screen bg-[#FFFCF5] w-full overflow-auto">
      <div className="h-full flex items-center justify-center">
        <div className="shadow-3xl p-10 bg-white rounded-2xl max-w-md w-full">
          <div className="flex justify-between items-center mb-5">
            <h4 className="text-2xl font-bold trekking-wide font-emirates">Sign in</h4>
            {/* <p className="text-sm trekking-wide mb-12 mt-5">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-blue-500 underline font-medium"
              >
                Get started
              </Link>
            </p> */}
            <Button variant={"outlined"}>
              <Link href={"/register"} className="font-emirates">Register</Link>
            </Button>
          </div>
          <Form type="login" />
        </div>
      </div>
    </div>
  );
}
