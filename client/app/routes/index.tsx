import {
  Center,
  Heading,
  ListItem,
  OrderedList,
  TableCaption,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
  Wrap,
  WrapItem,
  Tbody,
  Td,
  Tfoot,
  Img,
  Button,
  Box,
  Link,
} from "@chakra-ui/react";
import type { ErrorBoundaryComponent } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MarkdownToJSX } from "markdown-to-jsx";
import { TableRender } from "~/components/MarkDownRender";
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
        <Link href={"/"}>
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
    `${process.env.STRAPI_URL}/api/stories?populate=img&sort=id:desc&pagination[page]=1&pagination[pageSize]=4`,
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

  const markDownOptions: MarkdownToJSX.Options = {
    overrides: {
      h1: { component: Heading, props: { fontSize: "2xl" } },
      h2: { component: Heading, props: { fontSize: "xl" } },
      h3: { component: Heading, props: { fontSize: "lg" } },
      h4: { component: Heading, props: { fontSize: "md" } },
      h5: { component: Heading, props: { fontSize: "sm" } },
      h6: { component: Heading, props: { fontSize: "xs" } },
      p: { component: Text, props: { as: "p", size: "lg" } },
      ul: { component: UnorderedList, props: { pl: "0.5rem" } },
      ol: { component: OrderedList, props: { pl: "0.5rem" } },
      li: { component: ListItem, props: { as: "li", fontSize: "lg" } },
      table: {
        component: TableRender,
        props: { variant: "simple" },
      },
      caption: { component: TableCaption },
      thead: { component: Thead },
      tr: { component: Tr },
      th: { component: Th },
      tbody: { component: Tbody },
      td: { component: Td },
      tfoot: { component: Tfoot },
      img: Img,
      a: { component: Link, props: { color: "teal.600" } },
    },
  };

  const render = data.map((storie: TStorie) => (
    <>
      <WrapItem key={storie.id}>
        <StorieCard
          storieTitle={storie.attributes.title}
          storieImgSrc={`${meta.strapi_url}${storie.attributes.img.data.attributes.url}`}
          storieDescription={storie.attributes.content}
          storieId={storie.id}
          options={markDownOptions}
          w={"100%"}
        />
      </WrapItem>
    </>
  ));
  return (
    <>
      <Navbar />
      <Center py={10}>
        <Wrap spacing={"3rem"} justify={"center"}>
          {render}
        </Wrap>
      </Center>
    </>
  );
};

export default Index;
