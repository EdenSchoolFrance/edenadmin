import {
  Card,
  Center,
  Heading,
  Img,
  Box,
  Divider,
  Link,
  Button,
} from "@chakra-ui/react";
import type { ErrorBoundaryComponent, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { MarkDownRender } from "~/components/MarkDownRender";
import Navbar from "~/components/Navbar";

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <Box h={"100vh"} w={"100vw"}>
      <Center h={"100%"} w={"100%"} flexDirection={"column"} gap={"1rem"}>
        <Heading as={"h1"}>Oh ! Une erreur est survenue !</Heading>
        <Heading as={"h2"} color={"red"}>
          {error.message}
        </Heading>
        <Link href={"/"}>
          <Button>Revenir à l'accueil</Button>
        </Link>
      </Center>
    </Box>
  );
};

export const loader = async ({ params }: LoaderArgs) => {
  const header = new Headers();
  header.append("Authorization", `Bearer ${process.env.STRAPI_TOKEN}`);
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/stories/${params.id}?populate=*`,
    { headers: header }
  );

  if (!res.ok) {
    switch (res.status) {
      case 404:
        throw new Error("Poste non trouvé !");

      case 401:
        throw new Error(`Token non valide !`);

      default:
        throw new Error(`${res.status}: ${res.statusText}`);
    }
  }

  const data = await res.json();
  data.meta.strapi_url = process.env.STRAPI_URL;

  return json({ rep: data });
};

export const DetailPost = () => {
  const { rep } = useLoaderData<typeof loader>();

  return (
    <>
      <Navbar />
      <Center>
        <Card
          w={"80%"}
          display={"flex"}
          flexDirection={"row"}
          mt="3rem"
          bg="#EDF2F7"
          h={"fit-content"}
          minHeight={"xl"}
        >
          <Box h="100%" w="30%">
            <Img
              w={"100%"}
              objectFit={"cover"}
              h={"xl"}
              borderRadius="md"
              src={`${rep.meta.strapi_url}${rep.data.attributes.img.data.attributes.url}`}
            ></Img>
          </Box>
          <Box w="70%" p={"1rem"}>
            <Heading as="h1" pb={"1rem"}>
              {rep.data.attributes.title}
            </Heading>
            <Divider w={"90%"} h={"2px"} bg={"black"} mb={"1rem"} />
            <MarkDownRender>{rep.data.attributes.content}</MarkDownRender>
          </Box>
        </Card>
      </Center>
    </>
  );
};

export default DetailPost;
