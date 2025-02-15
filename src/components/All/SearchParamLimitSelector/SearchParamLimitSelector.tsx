import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input.tsx";

const SearchParamLimitSelector = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [inputValue, setInputValue] = useState(searchParams.get("limit") || "30");

  const handleLimitChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("limit", value);
    router.replace(`/users?${newParams.toString()}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  return (
      <div className="flex items-center gap-2">
        <span onClick={handleReset} className="text-xs">💥</span>
        <Input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            className="w-[70px] border-none text-xs focus:border-none"
            placeholder="Limit"
        />
      </div>
  );
};

export default SearchParamLimitSelector;
