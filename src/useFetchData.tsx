import { useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import useSWRInfinite from "swr/infinite";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export type DataResponse = {
  data?: Record<string, any>[];
  size: number;
  setSize?: (
    size: number | ((_size: number) => number)
  ) => Promise<any[] | undefined>;
  isLoading: boolean;
  filterForm: UseFormReturn<
    {
      full_time: boolean;
      description: string;
      location: string;
    },
    any
  >;
  width: string;
};

const DataContext = React.createContext<DataResponse>({
  size: 0,
  isLoading: false,
  width: "",
  // @ts-ignore
  filterForm: {},
});

export const useData = () => React.useContext(DataContext);

export const DataProvider: React.FC<{ children?: React.ReactNode }> = (
  props
) => {
  const filterForm = useForm<{
    full_time: boolean;
    description: string;
    location: string;
  }>({
    mode: "onSubmit",
  });
  const width = useBreakpointValue(
    {
      base: "sm",
      md: "md",
      lg: "lg",
      xl: "xl",
    },
    {
      fallback: "xl",
    }
  );
  const formData = Object.entries(filterForm.getValues()).filter(
    ([key, value]) => value
  );
  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index: number) =>
      `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?${
        formData.length
          ? `${formData.map(([key, value]) => `${key}=${value}`).join("&")}&`
          : ""
      }page=${index + 1}`,
    fetcher
  );

  return (
    <DataContext.Provider
      value={{
        data,
        size,
        setSize,
        isLoading,
        filterForm,
        width: width || "",
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
