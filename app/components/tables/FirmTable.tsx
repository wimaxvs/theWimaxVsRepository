"use client";
import { SafeFirm, SafeJoinRequest } from "@/app/types";
import useDriver from "@/app/hooks/useCurrentDriver";
import useAllFirms from "@/app/hooks/useAllFirms";
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineLink,
} from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { MdJoinLeft } from "react-icons/md";
import { TbBrandDiscord } from "react-icons/tb";
import { FaTwitter } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";

interface FirmTableProps {
  allTheFirms: SafeFirm[];
}

const FirmTable: React.FC<FirmTableProps> = ({ allTheFirms }) => {
  const { currentDriver, setCurrentDriver } = useDriver();
  const { theFirms, setRequestedFirm, setTheFirms } = useAllFirms();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    allTheFirms && setTheFirms(allTheFirms as Partial<SafeFirm>[]);
  }, [allTheFirms, setTheFirms]);

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

  let onJoin = (driverId: string, firmId: string) => {
    let data = {
      requesterId: driverId,
      firmId,
    };
    console.log(data);
    let deets = JSON.stringify(data);

    axios
      .post("/api/request", deets)
      .then(
        (
          res: AxiosResponse<{
            message: string;
            code?: string | number;
            theNewRequest: SafeJoinRequest;
          }>
        ) => {
          console.log(res.data.theNewRequest);
          if (res.data.code === 500 || res.data.code === 400)
            throw new Error(res.data.message);
          toast.success(
            <>
              <div className="p-4 text-bold text-green-800 flex flex-col items-center bg-green-100 rounded-lg my-4">
                {`${res.data.message}`}
              </div>
            </>
          );
          if (res.data.theNewRequest.toFirm) {
            setRequestedFirm(res.data.theNewRequest.toFirm);
          }
          return setCurrentDriver(res.data.theNewRequest.requester);
        }
      )
      .catch((error: any) => {
        if (error.code) {
          switch (error.code) {
            case "ERR_BAD_RESPONSE":
              return toast.error(`Błąd`);
          }
        } else {
          return toast.error(error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div
        className={`zalozPage bg-gray-500 w-full h-[868px] flex flex-row justify-center py-10`}
      >
        <section
          className={`formSection rounded-md bg-gray-900 w-11/12 md:w-4/5 lg:w-2/3 md:min-h-5/6 md:h-5/6 p-2 md:p-10 flex flex-col gap-3 border border-primary`}
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
                {theFirms &&
                  theFirms.map((f: Partial<SafeFirm>, index: number) => {
                    let userHasJoinRequest = f.joinRequests?.some(
                      (jr) => jr.requesterId === (currentDriver?.id as string)
                    );
                    return (
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
                        <td>{f.drivers?.length}</td>
                        <td className="flex flex-row items-center gap-1">
                          {f.firmSocials?.map((link, i) => (
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
                          {f.joinRequests && (
                            <button
                              className={`p-2  ${
                                userHasJoinRequest && "disabled"
                              } ${
                                userHasJoinRequest
                                  ? "bg-[#ffaa33]"
                                  : "bg-green-600"
                              } rounded-md disabled:opacity-50`}
                              disabled={isLoading}
                              onClick={() =>
                                onJoin(currentDriver?.id as string, f.id!)
                              }
                            >
                              {userHasJoinRequest ? (
                                <FaCheck {...iconOptions} color="white" />
                              ) : (
                                <MdJoinLeft {...iconOptions} color="white" />
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default FirmTable;
