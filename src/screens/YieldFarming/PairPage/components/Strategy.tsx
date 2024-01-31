'use client';
import { Button } from '@/components/UI/Button';
import { UilExternalLinkAlt, UilShieldCheck } from '@/icons';

const Strategy = () => {
  return (
    <>
      <div className="md:col-span-8 sm:col-span-7 sm:p-8 p-5 col-span-12">
        <div className="flex flex-col justify-between w-full h-full md:w-[85%] sm:w-[95%]">
          <div>
            <div className="text-16 font-700 leading-5 text-blue-300 dark:text-white dark:text-white">
              Strategy
            </div>
            <p className="mt-6 leading-5">
              The vault deposits the user&apos;s USDC-wUSDR vLP V2 in a
              Velodrome farm, earning the platform&apos;s governance token.
              Earned token is swapped for wUSDR and USDC in order to acquire
              more of the same LP token.
            </p>
            <p className="mt-4 leading-5">
              To complete the compounding cycle, the new USDC-wUSDR vLP V2 is
              added to the farm, ready to go for the next earning event. The
              transaction cost required to do all this is socialized among the
              vault&apos;s users.
            </p>
            <div className="sm:hidden visible mt-5 border-t-2">
              <div className="flex gap-4 my-5">
                <div className="flex gap-2">
                  <UilExternalLinkAlt className="w-4 h-4 text-gray-300 dark:text-white/30" />
                  <span className="text-14 font-700 leading-4 text-gray-300 dark:text-white/30">
                    Strategy Address
                  </span>
                </div>
                <div className="flex gap-2">
                  <UilExternalLinkAlt className="w-4 h-4 text-gray-300 dark:text-white/30" />
                  <span className="text-14 font-700 leading-4 text-gray-300 dark:text-white/30">
                    Vault Address
                  </span>
                </div>
              </div>
              <div>
                <Button className="text-blue-300 dark:text-white py-3 px-4 text-16 font-700 leading-5 bg-success-200">
                  <UilShieldCheck className="h-4 w-4 text-white me-2" />
                  <span className="text-white">Community Audit</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t-2 pt-8 lg:flex justify-between hidden dark:border-white/15">
            <Button className="text-blue-300 dark:text-white py-4 px-6 text-16 font-700 leading-5 bg-success-200">
              <UilShieldCheck className="h-4 w-4 text-white me-2" />
              <span className="text-white">Community Audit</span>
            </Button>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <UilExternalLinkAlt className="w-4 h-4 text-gray-300 dark:text-white/30" />
                <span className="text-14 font-700 leading-4 text-gray-300 dark:text-white/30">
                  Strategy Address
                </span>
              </div>
              <div className="flex gap-2">
                <UilExternalLinkAlt className="w-4 h-4 text-gray-300 dark:text-white/30" />
                <span className="text-14 font-700 leading-4 text-gray-300 dark:text-white/30">
                  Vault Address
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:col-span-4 sm:col-span-5 md:p-8 sm:p-4 p-5 sm:mt-0 -mt-5 col-span-12">
        <div className="text-16 font-700 leading-5 text-blue-300 dark:text-white">
          APY breakdown
        </div>
        <div className="flex flex-col gap-y-2 mt-6 leading-5">
          <div className="p-5 bg-gray-200 rounded-[12px] dark:bg-white/5">
            <div className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              Total APY
            </div>
            <div className="mt-5 text-24 font-500 leading-7 text-blue-300 dark:text-white">
              8.74%
            </div>
          </div>
          <div className="p-5 bg-gray-200 rounded-[12px] dark:bg-white/5">
            <div className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              Vault APR
            </div>
            <div className="mt-5 text-24 font-500 leading-7 text-blue-300 dark:text-white">
              8.38%
            </div>
          </div>
          <div className="p-5 bg-gray-200 rounded-[12px] dark:bg-white/5">
            <div className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              Boost APR
            </div>
            <div className="mt-5 text-24 font-500 leading-7 text-blue-300 dark:text-white">
              15.73%
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden hidden sm:block col-span-12 px-8">
        <div className="border-t-2 py-8  justify-between flex ">
          <Button className="text-blue-300 dark:text-white py-3 px-4 text-16 font-700 leading-5 bg-success-200">
            <UilShieldCheck className="h-4 w-4 text-white me-2" />
            <span className="text-white">Community Audit</span>
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <UilExternalLinkAlt className="w-4 h-4 text-gray-300 dark:text-white/30" />
              <span className="text-14 font-700 leading-4 text-gray-300 dark:text-white/30">
                Strategy Address
              </span>
            </div>
            <div className="flex gap-2">
              <UilExternalLinkAlt className="w-4 h-4 text-gray-300 dark:text-white/30" />
              <span className="text-14 font-700 leading-4 text-gray-300 dark:text-white/30">
                Vault Address
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Strategy;
