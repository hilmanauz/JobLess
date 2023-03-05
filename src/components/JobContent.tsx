import countingDays from "@/countingDays";
import { useData } from "@/useFetchData";
import { HStack, VStack, Text, Image, Icon, Box } from "@chakra-ui/react";
import { css } from "@emotion/react";
import React from "react";
import { CiClock2, CiLocationOn, CiSquareChevLeft } from "react-icons/ci";

function JobContent({ data }: { data?: Record<string, any> }) {
  const posted = React.useMemo(
    () => countingDays.postedTime(data?.created_at || ""),
    [data?.created_at]
  );
  const postedAt = React.useMemo(
    () => countingDays.postedAt(posted || ""),
    [posted]
  );
  return (
    <VStack
      alignItems={"normal"}
      paddingLeft={{
        sm: "20px",
        md: "16px",
      }}
      gap={2}
      mb={"2rem"}
    >
      <HStack
        position={"sticky"}
        top={"-2px"}
        bgColor={"white"}
        gap={2}
        borderBottom={"2px solid rgb(243, 243, 243)"}
        paddingTop={"10px"}
        paddingLeft={"16px"}
        paddingBottom={"12px"}
        marginLeft={"-16px"}
        marginBottom={"24px"}
      >
        <Image
          src={data?.company_logo}
          fallbackSrc={`https://ui-avatars.com/api/?name=${(data?.company || "")
            .split(" ")
            .join("+")}&background=random`}
          boxSize={"64px"}
        />
        <VStack alignItems={"normal"}>
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            {data?.title}
          </Text>
          <Text
            display={"inline-block"}
            fontSize={"md"}
            _hover={
              data?.company_url
                ? {
                    color: "rgb(1, 126, 183)",
                    textDecoration: "underline",
                  }
                : {}
            }
            onClick={() => {
              data?.company_url && window.open(data?.company_url, "_blank");
            }}
            color={"rgb(1, 126, 183)"}
            cursor={data?.company_url ? "pointer" : "auto"}
          >
            {data?.company}
          </Text>
        </VStack>
      </HStack>
      <HStack>
        <HStack color={posted.days < 1 ? "green" : "GrayText"}>
          <Icon as={CiClock2} fontSize={"md"} />
          <Text fontSize={"reg"}>Posted {postedAt}</Text>
        </HStack>
        <Text>&bull;</Text>
        <HStack>
          <Icon as={CiLocationOn} fontSize={"md"} />
          <Text fontSize={"reg"}>{data?.location}</Text>
        </HStack>
      </HStack>
      <VStack alignItems={"normal"}>
        <Text fontWeight={"bold"} fontSize={"md"}>
          Job Description for {data?.title} at {data?.company}
        </Text>
        <Box
          fontSize={"reg"}
          dangerouslySetInnerHTML={{ __html: data?.description }}
          css={css`
            a {
              color: rgb(1, 126, 183);
            }
            a:hover {
              text-decoration: underline;
            }
          `}
        />
      </VStack>
      <br />
      <VStack alignItems={"normal"}>
        <Text fontWeight={"bold"} fontSize={"md"}>
          How to apply:
        </Text>
        <Box
          fontSize={"reg"}
          dangerouslySetInnerHTML={{ __html: data?.how_to_apply }}
          css={css`
            a {
              color: rgb(1, 126, 183);
            }
            a:hover {
              text-decoration: underline;
            }
          `}
        />
      </VStack>
    </VStack>
  );
}

export default JobContent;
