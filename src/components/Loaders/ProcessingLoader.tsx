import { cn } from '@/utils';

const ProcessingLoader = () => {
  return (
    <div className="relative flex justify-center">
      <div className="absolute aspect-square w-[52px] h-[52px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden rounded-3xl">
        <div
          className={cn('w-full h-full rounded-full progress-loader-animation')}
        />
      </div>
      <div
        className={cn(
          'p-0 h-11 w-11 flex justify-center items-center rounded-3xl bg-white z-20 dark:bg-gray-600'
        )}
      />
    </div>
  );
};

export default ProcessingLoader;
