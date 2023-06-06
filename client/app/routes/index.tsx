import { Center, Heading, ListItem, OrderedList, TableCaption, Text, Th, Thead, Tr, UnorderedList, Wrap, WrapItem, Tbody, Td, Tfoot, Img } from "@chakra-ui/react";
import { Link, useLoaderData } from "@remix-run/react";
import { MarkdownToJSX } from "markdown-to-jsx";
import { TableRender } from "~/components/MarkDownRender";
import Navbar from "~/components/Navbar";
import { StorieCard } from "~/components/StorieCard";

type TStorie = {
  id: number;
  attributes: {
    title: string;
    content: string;
    img: {
      data: {
        id: number;
        attributes: { url: string };
      };
    };
  };
};

type TMeta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  strapi_url: string;
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
    throw new Error(`${res.status}: ${res.statusText}`);
  }
  let data = await res.json();
  data.meta.strapi_url = process.env.STRAPI_URL;

  return data;
}

const Index = () => {
  const { data, meta } = useLoaderData<typeof loader>();
  console.log(data[0]);

  const markDownOptions: MarkdownToJSX.Options = {
    overrides: {
      h1: { component: Heading, props: { fontSize: "2xl" } },
      h2: { component: Heading, props: { fontSize: "xl" } },
      h3: { component: Heading, props: { fontSize: "lg" } },
      h4: { component: Heading, props: { fontSize: "md" } },
      h5: { component: Heading, props: { fontSize: "sm" } },
      h6: { component: Heading, props: { fontSize: "xs" } },
      p: { component: Text, props: { as: "p", size: "lg" } },
      ul: { component: UnorderedList, props: { pl: "0.5rem"} },
      ol: { component: OrderedList, props: { pl: "0.5rem"} },
      li: { component: ListItem,
        props: { as: "li", fontSize: "lg" },
      },
      table: {
        component: TableRender, props: { variant: "simple" },
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
    }
  }

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
