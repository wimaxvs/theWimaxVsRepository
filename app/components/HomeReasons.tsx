

const HomeReasons = () => {
  return (
    <>
      <div className="py-12 md:py-16 lg:py-20 mx-auto w-full max-w-7xl px-5 md:px-10">
        <div className="flex flex-col gap-8 lg:gap-20">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold md:text-5xl">
              Why Choose <b className={"hover:text-velvet-blue"}>Me-CV</b>?
            </h2>
          </div>
          <div className="grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1px_1fr_1px_1fr_1px_1fr]">
              <div className="flex flex-col items-center gap-4 text-center max-[479px]:flex-col sm:gap-4">
                <img
                  src="https://assets.website-files.com/64f03c3722a98d614616c2d5/64f085469a6145cab15db3fd_feature%201.svg"
                  alt="The Me-CV creator saves you time"
                  className="flex min-w-[46px] items-center justify-center rounded-[100%] bg-[#f2f2f7] text-lg font-bold h-11 w-11"
                />
                <div className="flex flex-col gap-2">
                  <h4 className="text-xl font-bold md:text-xl">
                    Save Time and Effort
                  </h4>
                  <p className="text-[#636262]">
                    Creating a CV/resume could be painstakingly time-consuming
                    and frustrating... Unless you have the{" "}
                    <b>aesthetic aspect handled for you in advance</b>. 😉
                  </p>
                </div>
              </div>
              <div className="h-full w-px bg-gray-200 max-[991px]:hidden"></div>
              <div className="flex flex-col items-center gap-4 text-center max-[479px]:flex-col sm:gap-4">
                <img
                  src="https://assets.website-files.com/64f03c3722a98d614616c2d5/64f085463ba5cfc4489ec9f2_feature%202.svg"
                  alt="The Me-CV creator is highly reusable"
                  className="flex min-w-[46px] items-center justify-center rounded-[100%] bg-[#f2f2f7] text-lg font-bold h-11 w-11"
                />
                <div className="flex flex-col gap-2">
                  <h4 className="text-xl font-bold md:text-xl">
                    Reusability ♻️
                  </h4>
                  <p className="text-[#636262]">
                    We ensure that when you need to edit your CV/resume for that
                    one extra job application, you can do it quickly and easily!
                  </p>
                </div>
              </div>
              <div className="h-full w-px bg-gray-200 max-[991px]:hidden"></div>
              <div className="flex flex-col items-center gap-4 text-center max-[479px]:flex-col sm:gap-4">
                <img
                  src="https://assets.website-files.com/64f03c3722a98d614616c2d5/64f0854640ca0af098cdb5ca_feature%203.svg"
                  alt=""
                  className="flex min-w-[46px] items-center justify-center rounded-[100%] bg-[#f2f2f7] text-lg font-bold h-11 w-11"
                />
                <div className="flex flex-col gap-2">
                  <h4 className="text-xl font-bold md:text-xl">Variety</h4>
                  <p className="text-[#636262]">
                    We have <b>10+</b> CV/Resume templates for you to choose
                    from. Standing out has never been easier. 🌈
                  </p>
                </div>
              </div>
              <div className="h-full w-px bg-gray-200 max-[991px]:hidden"></div>
              <div className="flex flex-col items-center gap-4 text-center max-[479px]:flex-col sm:gap-4">
                <img
                  src="https://assets.website-files.com/64f03c3722a98d614616c2d5/64f08546db9edff387b844bd_fetaure%204.svg"
                  alt=""
                  className="flex min-w-[46px] items-center justify-center rounded-[100%] bg-[#f2f2f7] text-lg font-bold h-11 w-11"
                />
                <div className="flex flex-col gap-2">
                  <h4 className="text-xl font-bold md:text-xl">Save Money</h4>
                  <p className="text-[#636262]">
                    When we say free, we mean <b>F-R-E-E !</b> <br /> We get it,
                    you're looking for a job, cash is tight.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeReasons