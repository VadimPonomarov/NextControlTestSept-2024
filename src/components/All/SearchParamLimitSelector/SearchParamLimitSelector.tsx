import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const SearchParamLimitSelector = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [inputValue, setInputValue] = useState(searchParams.get("limit") || "30");

  const handleLimitChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("limit", value);
    router.replace(`/users?${newParams.toString()}`);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputValue(event.target.value);
    handleLimitChange(event.target.value);
  };

  const handleReset = () => {
    setInputValue("30");
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("limit", "30");
    router.replace(`/users?${newParams.toString()}`);
  };

  useEffect(() => {
    const handleParamsChange = () => {
      const limit = searchParams.get("limit") || "30";
      setInputValue(limit);
    };

    handleParamsChange();
    window.addEventListener("popstate", handleParamsChange);

    return () => {
      window.removeEventListener("popstate", handleParamsChange);
    };
  }, [searchParams]);

  useEffect(() => {
    const limit = searchParams.get("limit") || "30";
    setInputValue(limit);
  }, [searchParams]);

  return (
      <div className="flex items-center gap-2">
        <span onClick={handleReset} className="text-xs">💥</span>
        <select value={inputValue} onChange={handleSelectChange} className="w-[70px] border-none text-xs focus:border-none">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>
  );
};

export default SearchParamLimitSelector;







