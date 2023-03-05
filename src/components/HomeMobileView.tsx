import {
  Flex,
  HStack,
  Spacer,
  Center,
  CircularProgress,
  Text,
} from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import FilterPopover from "./FilterPopover";
import JobCard from "./JobCard";

function HomeMobileView({
  filterForm,
  setSize,
  isEmpty,
  jobsData,
  onScroll,
  isLoadingMore,
}: {
  jobsData: Record<string, any>[];
  setSize?: (
    size: number | ((_size: number) => number)
  ) => Promise<any[] | undefined>;
  isEmpty: boolean;
  isLoadingMore: boolean;
  onScroll: React.UIEventHandler<HTMLDivElement>;
  filterForm: UseFormReturn<
    {
      full_time: boolean;
      description: string;
      location: string;
    },
    any
  >;
}) {
  return (
    <Flex
      direction={"column"}
      position={"absolute"}
      height={"100%"}
      width={"100vw"}
      overflow={"hidden"}
    >
      <HStack
        paddingX={"20px"}
        paddingRight={"25px"}
        paddingY={"8px"}
        width={"100vw"}
        backgroundColor={"#0a66c2"}
      >
        <Text color={"white"} fontSize={"reg"} fontWeight={"semibold"}>
          Recommended Jobs Curated for You
        </Text>
        <Spacer />
        <FormProvider {...filterForm}>
          <FilterPopover onSubmit={() => setSize?.(1)} />
        </FormProvider>
      </HStack>
      {isEmpty ? (
        <Center height={"full"}>
          <Text fontWeight={"bold"} fontSize={"xl"}>
            Result Not Found
          </Text>
        </Center>
      ) : (
        <Flex
          direction={"column"}
          overflowY={"auto"}
          overflowX={"hidden"}
          position={"relative"}
          onScroll={onScroll}
        >
          {jobsData.map((item: any, i: number) => (
            <HStack
              key={i}
              borderRight={"2px solid rgb(243, 243, 243)"}
              borderBottom={"2px solid rgb(243, 243, 243)"}
              padding={"20px 16px"}
              _selected={{
                backgroundColor: "rgb(235, 245, 250)",
              }}
              justifyContent={"start"}
              onClick={() => router.push(`/${item.id}`)}
            >
              <JobCard data={item} />
            </HStack>
          ))}
        </Flex>
      )}
      {isLoadingMore && (
        <Center width={"100vw"} height={"100px"}>
          <CircularProgress isIndeterminate color="rgb(1, 126, 183)" />
        </Center>
      )}
    </Flex>
  );
}

export default HomeMobileView;
