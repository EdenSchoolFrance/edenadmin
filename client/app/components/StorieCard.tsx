import { Box, Card, CardProps, Flex, Image, Link, Text } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"

interface IStorieCard extends CardProps {
    storieId: number;
    storieTitle: string;
    storieDescription: string;
    storieImgSrc: string;
}

export const StorieCard = ({ storieTitle, storieDescription, storieImgSrc, storieId, ...props}: IStorieCard) => {
    return (
        <Card w="35rem" h="15rem"  ml="5rem" mt='5rem' bg='#EDF2F7' color="black" borderRadius="md" boxShadow="xl" {...props}>
        <Flex position={"relative"}>
            <Image boxSize="15rem"
              src={storieImgSrc}
              alt='Green double couch with wooden legs'
              borderRadius='md'
            />
          <Box p="1rem" w={"20rem"} h={"15rem"} overflow={"hidden"} >
            <Text pb="3rem" h="3px" fontSize="2xl" borderBottom="1px solid black">{storieTitle}</Text>
            <Text mt="1rem" overflow={"hidden"}>{storieDescription.slice(0, 200)}
           <Link href={`/post/${storieId}`} isExternal color='#319795' ml={'1'}>
                Lire la suite<ExternalLinkIcon mx='2px' mb="5px" />
              </Link>
           </Text> 
          </Box>
        </Flex>
    </Card>
    )
}