import {
  Tabs,
  Text,
  Flex,
  HStack,
  Spacer,
  Center,
  TabList,
  Tab,
  CircularProgress,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import FilterPopover from "./FilterPopover";
import JobCard from "./JobCard";
import JobContent from "./JobContent";

function HomeDesktopView({
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
    <Tabs
      orientation="vertical"
      isFitted
      variant="unstyled"
      height={"100%"}
      width={"100%"}
      overflow={"hidden"}
      position={"absolute"}
    >
      <Flex
        direction={"column"}
        flex={{
          md: 2,
          lg: 1.5,
        }}
        position={"relative"}
        borderRight={"1px solid rgba(0,0,0,0.08)"}
      >
        <HStack
          paddingX={"20px"}
          paddingRight={"25px"}
          paddingY={"8px"}
          width={"full"}
          backgroundColor={"#0a66c2"}
          borderTopLeftRadius={"xl"}
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
          <TabList overflowY={"auto"} onScroll={onScroll}>
            {jobsData.map((item: any, i: number) => (
              <Tab
                key={i}
                borderRight={"2px solid rgb(243, 243, 243)"}
                borderBottom={"2px solid rgb(243, 243, 243)"}
                padding={"20px 16px"}
                _selected={{
                  backgroundColor: "rgb(235, 245, 250)",
                }}
                justifyContent={"start"}
              >
                <JobCard data={item} />
              </Tab>
            ))}
          </TabList>
        )}
        {isLoadingMore && (
          <Center width={"full"} height={"100px"}>
            <CircularProgress isIndeterminate color="rgb(1, 126, 183)" />
          </Center>
        )}
      </Flex>
      <TabPanels
        flex={3}
        position={"relative"}
        marginTop={"14px"}
        overflowY={"auto"}
      >
        {jobsData.map((item: any) => (
          <TabPanel>
            <JobContent data={item} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export default HomeDesktopView;
