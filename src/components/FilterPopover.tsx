import {
  Popover,
  PopoverTrigger,
  Button,
  Center,
  Icon,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  Select,
  Checkbox,
  VStack,
  Text,
  Spacer,
  HStack,
  Tag,
} from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { BiFilterAlt, BiText, BiSelectMultiple, BiTrash } from "react-icons/bi";

function FilterPopover({ onSubmit }: { onSubmit: () => void }) {
  const [descType, setDescType] = React.useState("input");
  const { register, handleSubmit, setValue, reset, getValues } =
    useFormContext();
  const formData = Object.entries(getValues()).filter(([key, value]) => value);
  return (
    <Popover size={"lg"}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button
              variant={"unstyled"}
              color={"white"}
              aria-label="filter"
              position={"relative"}
            >
              <Center>
                <Icon as={BiFilterAlt} fontSize={"xl"} />
                {formData.length > 1 && (
                  <Tag
                    variant="solid"
                    colorScheme="whiteAlpha"
                    borderRadius={"50%"}
                    position={"absolute"}
                    top={"-2"}
                    right={"-4"}
                  >
                    <Text fontSize={"xs"}>{formData.length}</Text>
                  </Tag>
                )}
              </Center>
            </Button>
          </PopoverTrigger>
          <PopoverContent fontSize={"reg"}>
            <PopoverArrow />
            <PopoverHeader>
              <HStack>
                <Text fontSize={"reg"}>Filter Job</Text>
                <Spacer />
                <Icon
                  as={BiTrash}
                  fontSize={"md"}
                  cursor={"pointer"}
                  onClick={() =>
                    reset({
                      full_time: true,
                      description: "",
                      location: "",
                    })
                  }
                />
              </HStack>
            </PopoverHeader>
            <PopoverBody>
              <form
                onSubmit={handleSubmit((data) => {
                  onSubmit();
                  onClose();
                  reset(data);
                })}
              >
                <VStack>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <InputGroup>
                      <InputLeftAddon
                        children={
                          <Button
                            onClick={() => {
                              setDescType(
                                descType === "input" ? "select" : "input"
                              );
                              setValue("description", "");
                            }}
                            size={"xs"}
                          >
                            <Center>
                              <Icon
                                as={
                                  descType === "input"
                                    ? BiText
                                    : BiSelectMultiple
                                }
                                fontSize={"md"}
                              />
                            </Center>
                          </Button>
                        }
                      />
                      {descType === "input" ? (
                        <Input
                          {...register("description")}
                          placeholder={"Search aliased"}
                        />
                      ) : (
                        <Select {...register("description")} variant="outline">
                          <option value="">Search aliased</option>
                          <option value="ruby">Ruby</option>
                          <option value="javascript">Javascript</option>
                          <option value="python">Python</option>
                          <option value="go">Go</option>
                          <option value="rust">Rust</option>
                        </Select>
                      )}
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Location</FormLabel>
                    <Input
                      {...register("location")}
                      placeholder={"City name, zip code, or other location"}
                    />
                  </FormControl>
                  <FormControl paddingTop={"5px"}>
                    <Checkbox {...register("full_time")}>
                      <Text fontSize={"sm"}>Full time</Text>
                    </Checkbox>
                  </FormControl>
                  <Button
                    type={"submit"}
                    width={"full"}
                    colorScheme={"blue"}
                    fontSize={"reg"}
                  >
                    Apply
                  </Button>
                </VStack>
              </form>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}

export default FilterPopover;
