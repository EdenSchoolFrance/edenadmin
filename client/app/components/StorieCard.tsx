import { CardProps, Divider } from "@chakra-ui/react";
import { Box, Card, Flex, Image, Link as ChakraLink, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { MarkDownRender } from "./MarkDownRender";
import type { MarkdownToJSX } from "markdown-to-jsx";
import { Link } from "@remix-run/react";

interface IStorieCard extends CardProps {
  storieId: number;
  storieTitle: string;
  storieDescription: string;
  storieImgSrc: string;
  options?: MarkdownToJSX.Options;
  [key: string]: any;
}

export const StorieCard = ({
  storieTitle,
  storieDescription,
  storieImgSrc,
  storieId,
  options,
  ...props
}: IStorieCard) => {
  return (
    <Link to={`/post/${storieId}`}>
    <Card
      w="35rem"
      h="15rem"
      bg="#EDF2F7"
      color="black"
      borderRadius="md"
      boxShadow="xl"
      {...props}
    >
      <Flex position={"relative"}>
        <Image
          boxSize="15rem"
          src={storieImgSrc}
          alt="Green double couch with wooden legs"
          borderRadius="md"
          objectFit={"cover"}
        />
          <Box p="1rem" w={"20rem"} h={"15rem"} overflow={"hidden"}>
          <Text fontSize="2xl" noOfLines={1}>
            {storieTitle}
            </Text>
          <Divider borderColor={"black"}/>
          <Box overflow={"hidden"}>
            <MarkDownRender options={options}>
              {storieDescription.slice(0, 100)}
            </MarkDownRender>
          </Box>
        </Box>
      </Flex>
      </Card>
      </Link>
  );
};
