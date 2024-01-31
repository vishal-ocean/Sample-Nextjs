interface CustomToastMessageProps {
  message: string;
  subText?: string;
}
const CustomToastMessage = ({
  message,
  subText = "",
}: CustomToastMessageProps) => {
  return (
    <div className="flex flex-col">
      <span className="font-700 text-blue-300 dark:text-white leading-5">
        {message}
      </span>
      <span className="font-500 text-12 text-blue-300 dark:text-white leading-4">
        {subText}
      </span>
    </div>
  );
};

export default CustomToastMessage;
