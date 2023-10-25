import getAllFirms from "@/app/actions/getAllFirms";
import { SafeFirm } from "@/app/types";
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineLink,
} from "react-icons/ai";
import { TbBrandDiscord } from "react-icons/tb";
import { FaTwitter } from "react-icons/fa";
import React from "react";
import Link from "next/link";

const page = async () => {
  let allTheFirms: SafeFirm[] = await getAllFirms();

  let iconOptions: { size: number; color: string } = {
    size: 18,
    color: "rgb(166, 173, 186)",
  };

  let whichSocial: (socialLink: string) => JSX.Element | null = (socialLink) =>
    socialLink.includes("facebook") ? (
      <AiOutlineFacebook {...iconOptions} />
    ) : socialLink.includes("instagram") ? (
      <AiOutlineInstagram {...iconOptions} />
    ) : socialLink.includes("twitter") || socialLink.includes("x.com") ? (
      <FaTwitter {...iconOptions} />
    ) : socialLink.includes("discord") ? (
      <TbBrandDiscord {...iconOptions} />
    ) : (
      <AiOutlineLink {...iconOptions} />
    );

  return (
    <>
      <div
        className={`zalozPage bg-gray-500 w-full h-[868px] flex flex-row justify-center py-10`}
      >
        <section
          className={`formSection rounded-md bg-gray-900 w-11/12 md:w-4/5 lg:w-2/3 md:min-h-5/6 md:h-5/6 p-0 md:p-6 flex flex-col gap-3 border border-primary`}
        >
          {/* Table Title */}
          <h2
            className={`text-m md:text-xl lg:text-4xl font-bold text-white`}
          >{`Podróż tysiąca kilometrów...`}</h2>
          <p
            className={`text-sm md:text-md lg:text-xl font-semibold mb-3`}
          >{`zaczyna się od dołączenia do jednej z tych firm`}</p>
          <div className="max-w-[11/12] overflow-x-auto">
            <table className="table table-zebra rounded-md ">
              {/* head */}
              <thead className={`bg-[rgb(25,30,36)]`}>
                <tr>
                  <th></th>
                  <th>Imie</th>
                  <th>Etykieta</th>
                  <th>Ilość kierowców</th>
                  <th>Społecznościowe</th>
                  <th>Dołącz</th>
                </tr>
              </thead>
              <tbody>
                {/* the rows */}
                {allTheFirms &&
                  allTheFirms.map((f: SafeFirm, index: number) => (
                    <tr key={index} className={`border-none`}>
                      <th
                        className={`${
                          index % 2 == 1 && "rounded-tl-md rounded-bl-md"
                        }`}
                      >
                        {index + 1}
                      </th>
                      <td>{f.firmName}</td>
                      <td>{f.firmTag}</td>
                      <td>{f.drivers.length}</td>
                      <td className="flex flex-row items-center gap-1">
                        {f.firmSocials.map((link, i) => (
                          <Link key={i} href={link} replace={false}>
                            {whichSocial(link)}
                          </Link>
                        ))}
                      </td>
                      <td
                        className={`${
                          index % 2 == 1 && "rounded-tr-md rounded-br-md"
                        }`}
                      >
                        {f.drivers.length}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default page;
