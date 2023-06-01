import { Center, Wrap, WrapItem } from "@chakra-ui/react";
import { useLoaderData } from "@remix-run/react";
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
      <Center>
        <Wrap spacing={"2.5rem"} justify={"center"}>
          {render}
        </Wrap>
      </Center>
    </>
  );
};

export default Index;
