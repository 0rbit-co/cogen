import { useTheme } from "../context/ThemeContext";

const Warning = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`${
        isDark
          ? "text-[#B4B99F]"
          : "text-[#25291C]"
      }`}
    >
      <p>
        Currently you can only generate text for ~300 words due to API rate
        limit
      </p>
    </div>
  );
};

export default Warning;
