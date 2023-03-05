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
import { useData } from "@/useFetchData";
import { useRouter } from "next/router";
import HomeMobileView from "@/components/HomeMobileView";
import HomeDesktopView from "@/components/HomeDesktopView";

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
  const router = useRouter();
  const { data, size, isLoading, setSize, filterForm, width } = useData();
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

  React.useEffect(() => {
    setSize?.(1);
  }, []);

  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (
        e.currentTarget.scrollTop + e.currentTarget.offsetHeight + 1 >=
          e.currentTarget.scrollHeight &&
        !isReachingEnd
      ) {
        setSize?.(size + 1);
      }
    },
    []
  );

  const jobsData = React.useMemo(() => (jobs ? jobs.flat(1) : []), [jobs]);

  return (
    <div>
      <Head>
        <title>JoBless: Find your Job instanly</title>
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
            <HStack
              width={"container." + (width || "xl")}
              paddingX={width === "sm" ? "20px" : "0"}
            >
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
                marginTop={width !== "sm" ? "2.4rem" : "0"}
                gridTemplateColumns={"100%"}
                gridTemplateRows={"auto"}
                boxShadow={"0px 0px 0px 1px rgba(0,0,0,0.08)"}
              >
                <GridItem area={"main"} position={"relative"}>
                  {width === "sm" ? (
                    <HomeMobileView
                      filterForm={filterForm}
                      isEmpty={isEmpty}
                      isLoadingMore={isLoadingMore}
                      jobsData={jobsData}
                      setSize={setSize}
                      onScroll={handleScroll}
                    />
                  ) : (
                    <HomeDesktopView
                      filterForm={filterForm}
                      isEmpty={isEmpty}
                      isLoadingMore={isLoadingMore}
                      jobsData={jobsData}
                      setSize={setSize}
                      onScroll={handleScroll}
                    />
                  )}
                </GridItem>
              </Grid>
            </Flex>
          </Flex>
        </Flex>
      </main>
    </div>
  );
}
