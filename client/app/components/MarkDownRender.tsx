import {
  Heading,
  Img,
  ListItem,
  OrderedList,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  UnorderedList,
  Link,
} from "@chakra-ui/react";
import Markdown from "markdown-to-jsx";
import React from "react";
import type { MarkdownToJSX } from "markdown-to-jsx";

interface IMarkdownRender {
  children: string;
  options?: MarkdownToJSX.Options;
  [key: string]: any;
}

export const TableRender = ({
  children,
}: {
  children: React.ReactNode | React.JSX.Element;
}) => {
  return (
    <TableContainer>
      <Table>{children}</Table>
    </TableContainer>
  );
};

export const MarkDownRender = ({
  children,
  options,
  ...props
}: IMarkdownRender) => {
  return (
    <Markdown
      options={
        options
          ? options
          : {
              overrides: {
                h1: { component: Heading, props: { as: "h1", size: "4xl" } },
                h2: { component: Heading, props: { as: "h2", size: "3xl" } },
                h3: { component: Heading, props: { as: "h3", size: "2xl" } },
                h4: { component: Heading, props: { as: "h4", size: "xl" } },
                h5: { component: Heading, props: { as: "h5", size: "lg" } },
                h6: { component: Heading, props: { as: "h6", size: "md" } },
                p: { component: Text, props: { as: "p", size: "lg" } },
                ul: { component: UnorderedList },
                ol: { component: OrderedList },
                li: {
                  component: ListItem,
                  props: { as: "li", fontSize: "lg" },
                },
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
            }
      }
      {...props}
    >
      {children}
    </Markdown>
  );
};
