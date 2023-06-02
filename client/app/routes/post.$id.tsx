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
};

export const DetailPost = () => {
    const { rep } = useLoaderData<typeof loader>();
    console.log(rep);
    
    return (
        <>
            <Navbar/>
            <Center>
               <Card w={"80%"} display={"flex"} flexDirection={"row"} mt="3rem" bg="#EDF2F7">
                 <Box h="100%" w="30%"><Img w={"100%"} h={"lg"} borderRadius="md" src={`${rep.meta.strapi_url}${rep.data.attributes.img.data.attributes.url}`}></Img></Box>
                 <Box w="70%">                    
                    <Heading as="h1" p="1rem">{rep.data.attributes.title}</Heading>
                    <Flex justify={"center"}>
                        <Divider w={"80%"} />
                    </Flex>
                    <MarkDownRender p="1rem">{rep.data.attributes.content}</MarkDownRender>
                 </Box>
               </Card>
            </Center>
        </>
    )
}

export default DetailPost