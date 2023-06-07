import { Box, Button, Center, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import { Link, useLoaderData } from "@remix-run/react";
import type { ErrorBoundaryComponent } from "@remix-run/react/dist/routeModules";
import Navbar from "~/components/Navbar";
import { StorieCard } from "~/components/StorieCard";

type TStorie = {
  id: number;
  attributes: {
    title: string;
    content: string;
    img: TImg;
  };
};

type TImg = {
  data: { id: number; attributes: { url: string } };
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);

  return (
    <Box h={"100vh"} w={"100vw"}>
      <Center h={"100%"} w={"100%"} flexDirection={"column"} gap={"1rem"}>
        <Heading as={"h1"}>Oh ! Une erreur est survenue !</Heading>
        <Heading as={"h2"} color={"red.400"} textAlign={"center"}>
          {error.message}
        </Heading>
        <Link to={"/"}>
          <Button>Revenir à l'accueil</Button>
        </Link>
      </Center>
    </Box>
  );
};

export async function loader() {
  const header = new Headers();
  header.append("Authorization", `Bearer ${process.env.STRAPI_TOKEN}`);

  const res = await fetch(
    `${process.env.STRAPI_URL}/api/stories?populate=img`,
    {
      headers: header,
    }
  );
  if (!res.ok) {
    switch (res.status) {
      case 404:
        throw new Error(`Postes non trouvé !`);

      case 401:
        throw new Error(`Token non valide !`);

      default:
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "Erreur interne"
            : `${res.status}: ${res.statusText}`
        );
    }
  }
  let data = await res.json();
  if (!process.env.STRAPI_URL)
    throw new Error(
      "401: You must provide STRAPI_URL or your token is wrong !"
    );
  data.meta.strapi_url = process.env.STRAPI_URL;

  return data;
}

const Index = () => {
  const { data, meta } = useLoaderData<typeof loader>();
  const render = data.map((storie: TStorie) => (
    <>
      <WrapItem key={storie.id}>
        <StorieCard
          storieTitle={storie.attributes.title}
          storieImgSrc={`${meta.strapi_url}${storie.attributes.img.data.attributes.url}`}
          storieDescription={storie.attributes.content}
          storieId={storie.id}
          w={"100%"}
        />
      </WrapItem>
    </>
  ));
  return (
    <>
      <Navbar />
      <Center py={10}>
        <Wrap spacing={"2.5rem"} justify={"center"}>
          {render}
        </Wrap>
      </Center>
    </>
  );
};

export default Index;
