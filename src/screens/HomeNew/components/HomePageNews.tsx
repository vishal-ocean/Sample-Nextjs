import { UilAngleRight, UilNewspaper } from '@/icons';
import Image from 'next/image';
const data = [{ name: 'aaa' }, { name: 'aaa' }, { name: 'aaa' }];
const HomePageNews = () => {
  return (
    <div className="p-3 pr-5">
      <div className="flex gap-3 items-center">
        <span className="p-2 rounded-full bg-secondary dark:bg-white/15">
          <UilNewspaper className="w-4 h-4 text-blue-300 dark:text-white" />
        </span>
        <p className="text-12 leading-4 font-700 text-blue-300 dark:text-white">
          News and Updates
        </p>
      </div>
      <div className="flex divide-secondary dark:divide-white/15 divide-y flex-col">
        {data?.map((val, index) => {
          return (
            <div className="flex py-5 gap-3" key={index}>
              <div className="rounded-[4px] w-8  h-8">
                {' '}
                <Image
                  src="/images/news-profile.svg"
                  alt="news-profile"
                  width={0}
                  height={0}
                  className="w-full h-auto"
                ></Image>
              </div>
              <div className="flex flex-col">
                <p className="text-14 leading-4 font-700 text-blue-300 dark:text-white">
                  Alpha Release
                </p>
                <p className="text-14 leading-4 font-500 text-gray-300 dark:text-white/30">
                  {' '}
                  Explore crypto and wealth features. Your feedback shapes our
                  future.
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex rounded-3xl bg-secondary gap-2 h-10 justify-center mt-1 mb-2 mx-2 items-center dark:bg-white/15">
        {' '}
        <span className="text-14 leading-4 font-700 text-blue-300 dark:text-white">
          See All
        </span>
        <UilAngleRight className="text-blue-300 w-4 h-4 dark:text-white" />
      </div>
    </div>
  );
};
export default HomePageNews;
