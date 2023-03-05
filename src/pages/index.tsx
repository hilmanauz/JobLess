import JobCard from "@/components/JobCard";
import JobContent from "@/components/JobContent";
import {
  Box,
  HStack,
  Text,
  Spacer,
  Flex,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
  CircularProgress,
  Center,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Avatar,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import useSWRInfinite from "swr/infinite";
import { FormProvider, useForm } from "react-hook-form";
import FilterPopover from "@/components/FilterPopover";
import Head from "next/head";
import {
  getSession,
  GetSessionParams,
  signOut,
  useSession,
} from "next-auth/react";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 10;

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);
  if (!session) {
    // @ts-ignore
    context.res?.writeHead(302, { Location: "/api/auth/signin" });
    // @ts-ignore
    context.res?.end();
    return {};
  }
  return {
    props: {
      user: session.user,
    },
  };
}

export default function Home() {
  const session = useSession();
  const filterForm = useForm<{
    full_time: boolean;
    description: string;
    location: string;
  }>({
    mode: "onSubmit",
  });
  const formData = Object.entries(filterForm.getValues()).filter(
    ([key, value]) => value
  );
  const { data, mutate, size, setSize, isLoading } = useSWRInfinite(
    (index: number) =>
      `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?${
        formData.length
          ? `${formData.map(([key, value]) => `${key}=${value}`).join("&")}&`
          : ""
      }page=${index + 1}`,
    fetcher
  );
  const jobs = React.useMemo(
    () => (data ? data.map((item) => item.filter((el: any) => el)) : []),
    [data]
  );
  const isLoadingMore = React.useMemo(
    () =>
      isLoading || (size > 0 && jobs && typeof jobs[size - 1] === "undefined"),
    [isLoading, size, jobs]
  );
  const isEmpty = React.useMemo(() => jobs?.[0]?.length === 0, [jobs]);
  const isReachingEnd = React.useMemo(
    () => isEmpty || (jobs && jobs[jobs.length - 1]?.length < PAGE_SIZE),
    [jobs, PAGE_SIZE, isEmpty]
  );

  const jobsData = React.useMemo(() => (jobs ? jobs.flat(1) : []), [jobs]);
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

  return (
    <div>
      <Head>
        <title>JobLess: Find your Job instanly</title>
        <meta name={"description"} content={"wanna find your ideal job?"} />
      </Head>
      <main>
        <Flex
          direction={"column"}
          backgroundColor={"#F3F2EF"}
          height={"100vh"}
          overflow={"hidden"}
        >
          <Center h={"70px"} bgColor={"white"} width={"full"}>
            <HStack width={"container." + (width || "xl")}>
              <Image
                src={"/icon.png"}
                alt={"company"}
                width={110}
                height={55}
              />
              <Spacer />
              <Popover>
                <PopoverTrigger>
                  <Button variant={"unstyled"}>
                    <Center boxSize={"40px"}>
                      <Avatar
                        name={session.data?.user?.name || ""}
                        src={session.data?.user?.image || ""}
                      />
                    </Center>
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverBody>
                    <VStack alignItems={"start"}>
                      <HStack>
                        <Text fontSize={"md"}>E-mail:</Text>
                        <Text fontSize={"reg"}>
                          {session.data?.user?.email || ""}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text fontSize={"md"}>Name:</Text>
                        <Text fontSize={"reg"}>
                          {session.data?.user?.name || ""}
                        </Text>
                      </HStack>
                      <br />
                      <Button
                        width={"full"}
                        variant={"outline"}
                        colorScheme={"blue"}
                        onClick={() => signOut({ redirect: true })}
                      >
                        Sign Out
                      </Button>
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </HStack>
          </Center>
          <Flex direction={"column"} height={"calc(100vh - 70px)"}>
            <Flex
              direction={"column"}
              flexGrow={1}
              marginX={"auto"}
              width={"container." + (width || "xl")}
              maxWidth={"unset"}
            >
              <Grid
                backgroundColor={"white"}
                flexGrow={1}
                width={"100%"}
                borderTopRadius={"xl"}
                gridTemplateAreas={`"main"`}
                marginTop={"2.4rem"}
                gridTemplateColumns={"100%"}
                gridTemplateRows={"auto"}
                boxShadow={"0px 0px 0px 1px rgba(0,0,0,0.08)"}
              >
                <GridItem area={"main"} position={"relative"}>
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
                      flex={1.5}
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
                        <Text
                          color={"white"}
                          fontSize={"reg"}
                          fontWeight={"semibold"}
                        >
                          Recommended Jobs Curated for You
                        </Text>
                        <Spacer />
                        <FormProvider {...filterForm}>
                          <FilterPopover onSubmit={() => setSize(1)} />
                        </FormProvider>
                      </HStack>
                      {isEmpty ? (
                        <Center height={"full"}>
                          <Text fontWeight={"bold"} fontSize={"xl"}>
                            Result Not Found
                          </Text>
                        </Center>
                      ) : (
                        <TabList
                          overflowY={"auto"}
                          onScroll={(e) => {
                            if (
                              e.currentTarget.scrollTop +
                                e.currentTarget.offsetHeight +
                                1 >=
                                e.currentTarget.scrollHeight &&
                              !isReachingEnd
                            ) {
                              setSize(size + 1);
                            }
                          }}
                        >
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
                          <CircularProgress
                            isIndeterminate
                            color="rgb(1, 126, 183)"
                          />
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
                </GridItem>
              </Grid>
            </Flex>
          </Flex>
        </Flex>
      </main>
    </div>
  );
}
