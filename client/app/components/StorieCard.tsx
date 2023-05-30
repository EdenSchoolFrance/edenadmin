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
        <Flex>
            <Image boxSize="15rem"
              src={storieImgSrc}
              alt='Green double couch with wooden legs'
              borderRadius='md'
            />
          <Box p="1rem">
            <Text pb="3rem" h="3px" fontSize="2xl" borderBottom="1px solid black">{storieTitle}</Text>
            <Text mt="1rem">{storieDescription}
            <Link href={`/post/${storieId}`} isExternal color='#319795' ml="0.5rem">
                Lire la suite<ExternalLinkIcon mx='2px' />
              </Link>
           </Text> 
          </Box>
        </Flex>
    </Card>
    )
}