import { Card, Center, Heading, Img, Box, Divider,Flex } from "@chakra-ui/react";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { MarkDownRender } from "~/components/MarkDownRender";
import Navbar from "~/components/Navbar";
import { StorieCard } from "~/components/StorieCard";

export const loader = async ({ params }: LoaderArgs) => {
    const header = new Headers();
    header.append("Authorization", `Bearer ${process.env.STRAPI_TOKEN}`)
    const rep = await fetch(`${process.env.STRAPI_URL}/api/stories/${params.id}?populate=*`, { headers : header})
    const data = await rep.json()
    data.meta.strapi_url = process.env.STRAPI_URL

    return json({ rep: data });
}

export const DetailPost = () => {
    const {  rep } = useLoaderData<typeof loader>();
    console.log(rep);
    
    return (
        <>
            <Navbar/>
            <Center>
               <Card w={"80%"} display={"flex"} flexDirection={"row"} mt="3rem" bg="#EDF2F7" h={"fit-content"}  minHeight={"xl"}  >
                 <Box h="100%" w="30%"><Img w={"100%"} objectFit={"cover"} h={"xl"} borderRadius="md" src={`${rep.meta.strapi_url}${rep.data.attributes.img.data.attributes.url}`}></Img></Box>
                 <Box w="70%" p="1rem">                    
                    <Heading as="h1" pb="1rem" pt="1rem" >{rep.data.attributes.title}</Heading>
                        <Divider w={"90%"} bgColor="black" height="2px" mb="1rem" mt="1rem" />
                    <MarkDownRender>{rep.data.attributes.content}</MarkDownRender>
                 </Box>
               </Card>
            </Center>
        </>
    )
}

export default DetailPost