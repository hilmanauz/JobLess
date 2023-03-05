import JobContent from "@/components/JobContent";
import { useData } from "@/useFetchData";
import {
  Avatar,
  Button,
  Center,
  Flex,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function Jobid() {
  const router = useRouter();
  const session = useSession();
  const { data } = useData();
  const [jobData, setJobData] = React.useState<{
    data?: Record<string, any>;
    isRendered: boolean;
  }>({
    data: undefined,
    isRendered: false,
  });
  const { JobId } = router.query;
  React.useEffect(() => {
    const founded = data?.flat(1)?.find((item) => item.id === JobId);
    setJobData({ data: founded, isRendered: founded && data ? true : false });
  }, [data, JobId]);
  if (jobData.isRendered && !jobData.data) router.push("/");
  return (
    <Box height={"100vh"}>
      <HStack paddingX={"20px"} boxShadow={"0px 0px 0px 1px rgba(0,0,0,0.08)"}>
        <Image
          src={"/icon.png"}
          alt={"company"}
          width={110}
          height={55}
          onClick={() => router.push("/")}
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
                  <Text fontSize={"reg"}>{session.data?.user?.name || ""}</Text>
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
      <JobContent data={jobData.data} />
    </Box>
  );
}

export default Jobid;
