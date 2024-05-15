import Image from "next/image";

import Navbar from "../components/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {

  

  return (
    <div className="font-sans bg-white p-0 min-h-full m-0 w-full justify-between">
      <Navbar page="home"></Navbar>
      <div className="w-3/4 items-center mx-auto mb-50">
        <div className="flex flex-col items-center gap-5 p-10">
          <h1>Recent Forms</h1>
          <div className="flex w-1/2 justify-around bg-grey p-2 border-black border-4 border-solid rounded-lg items-center">
            <h2>Test Survey</h2>
            <div className="flex flex-row gap-20 items-center">
              <h2>35</h2>
              <Image alt="test" src="/tick.png" width={50} height={50} />
            </div>
          </div>
          <div className="flex w-1/2 justify-around bg-grey p-2 border-black border-4 border-solid rounded-lg items-center">
            <h2>Other Test</h2>
            <div className="flex flex-row gap-20 items-center">
              <h2>17</h2>
              <Image alt="test" src="/tick.png" width={50} height={50} />
            </div>
          </div>
          <div className="flex w-1/2 justify-around bg-grey p-2 border-black border-4 border-solid rounded-lg items-center">
            <h2>Third Test</h2>
            <div className="flex flex-row gap-20 items-center">
              <h2>24</h2>
              <Image alt="" src="/tick.png" width={50} height={50} />
            </div>
          </div>

          <div className="border-4 text-[25px] bg-[#2ca02c] text-white border-black p-2 border-solid rounded-lg hover:cursor-pointer">
            <input
              className="text-xl font-bold"
              type="button"
            />
          </div>

          <h1 className="margin-top: 50px;">Recent Evaluations</h1>
          <table>
            <tbody>
              <tr>
                <th>User</th>
                <th>Survey</th>
                <th>Date</th>
              </tr>
              <tr>
                <td>Terrence Crawford</td>
                <td>Test Survey</td>
                <td>Just a minute ago</td>
              </tr>
              <tr>
                <td>James McKinley</td>
                <td>Test Survey</td>
                <td>Just a minute ago</td>
              </tr>
              <tr>
                <td>Karl Thompson</td>
                <td>Test Survey</td>
                <td>Just a minute ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <footer className="absolute bottom-0 flex w-full justify-center">
        <p>&copy; 2024 EvalForm</p>
      </footer>
    </div>
  );
}
