import countingDays from "@/countingDays";
import { VStack, HStack, Icon, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { CiLocationOn, CiKeyboard, CiClock2 } from "react-icons/ci";

function JobCard({ data }: { data: Record<string, any> }) {
  const posted = React.useMemo(
    () => countingDays.postedTime(data.created_at),
    [data.created_at]
  );
  const postedAt = React.useMemo(() => countingDays.postedAt(posted), [posted]);
  return (
    <React.Fragment>
      <VStack
        height={"100%"}
        textAlign={"start"}
        gap={3}
        width={"full"}
        alignItems={"start"}
      >
        <HStack gap={2}>
          <Image
            src={data.company_logo}
            fallbackSrc={`https://ui-avatars.com/api/?name=${data.company
              .split(" ")
              .join("+")}&background=random`}
            boxSize={"60px"}
          />
          <VStack alignItems={"normal"}>
            <Text fontSize={"md"} fontWeight={"semibold"}>
              {data.title}
            </Text>
            <Text
              display={"inline-block"}
              fontSize={"reg"}
              _hover={
                data.company_url
                  ? {
                      color: "rgb(1, 126, 183)",
                      textDecoration: "underline",
                    }
                  : {}
              }
              onClick={() => {
                data.company_url && window.open(data.company_url, "_blank");
              }}
              color={"rgb(1, 126, 183)"}
            >
              {data.company}
            </Text>
          </VStack>
        </HStack>
        <VStack alignItems={"start"}>
          <HStack>
            <Icon as={CiLocationOn} fontSize={"md"} />
            <Text fontSize={"reg"}>{data.location}</Text>
          </HStack>
          <HStack>
            <Icon as={CiKeyboard} fontSize={"md"} />
            <Text fontSize={"reg"}>{data.type}</Text>
          </HStack>
        </VStack>
        <HStack color={posted.days < 1 ? "green" : "GrayText"}>
          <Icon as={CiClock2} fontSize={"reg"} />
          <Text>Posted {postedAt}</Text>
        </HStack>
      </VStack>
    </React.Fragment>
  );
}

export default JobCard;
