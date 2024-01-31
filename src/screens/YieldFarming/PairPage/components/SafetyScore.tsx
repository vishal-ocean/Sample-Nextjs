'use client';
import { UilExclamationTriangle, UilInfoCircle, UilShieldCheck } from '@/icons';
import { cn } from '@/utils';
import { useStaticData } from './useStaticData';

const SafetyScore = () => {
  const { SAFETY_SCORE_DATA } = useStaticData();
  return (
    <div className="bg-white relative rounded-[24px] p-5 lg:block lg:w-full sm:mt-4 md:mt-0 dark:bg-white/10">
      <div className="h-full max-h-[320px] lg:max-h-[320px] md:max-h-[375px] sm:max-h-[320px] overflow-y-scroll">
        <div className="flex justify-between">
          <div className="gap-2 flex">
            <UilShieldCheck className="h-4 w-4" />
            <p className="text-gray-300 dark:text-white/30 text-12 font-500 leading-4">
              Safety Score
            </p>
          </div>
          <div>
            <UilInfoCircle className="h-4 w-4" />
          </div>
        </div>
        <div className="flex-col flex gap-8 mt-8">
          {SAFETY_SCORE_DATA.map((item, index) => (
            <div className="flex" key={`safetyScoreList-${index}`}>
              <div
                className={cn(
                  'rounded-full p-3 justify-center items-center h-fit',
                  item.status === 'success'
                    ? 'bg-success-200/20'
                    : 'bg-danger-100/20'
                )}
              >
                {item.status === 'success' ? (
                  <UilShieldCheck className="h-4 w-4 text-success-200" />
                ) : (
                  <UilExclamationTriangle className="h-4 w-4 text-red-400" />
                )}
              </div>
              <div className="ms-3">
                <p className="text-gray-300 dark:text-white/30 overflow-hidden text-ellipsis text-16 font-500 leading-5 block">
                  {item.name}
                </p>
                <p className="text-blue-300 dark:text-white overflow-hidden text-ellipsis text-16 font-500 leading-5 block ">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafetyScore;
