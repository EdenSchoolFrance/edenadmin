import { ChakraProvider, Box, Heading, Center, Button } from "@chakra-ui/react";
import type { MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
});

function Document({
  children,
  title = "App title",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <ChakraProvider>
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  let reason = "";
  console.error(caught);

  switch (caught.status) {
    case 401:
      reason = "Vous n'êtes pas autoriser à accedez à cette page !";
      break;

    case 404:
      reason = "Page non trouvé";
      break;

    default:
      reason =
        process.env.NODE_ENV === "development" ? caught.data : "Erreur interne";
      break;
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <ChakraProvider>
        <Box h={"100vh"} w={"100vw"}>
          <Center h={"100%"} w={"100%"} flexDirection={"column"} gap={"1rem"}>
            <Heading as={"h1"}>Oh ! Une erreur est survenue !</Heading>
            <Heading as={"h2"} color={"red.400"} textAlign={"center"}>
              {reason}
            </Heading>
            <Link to={"/"}>
              <Button>Revenir à l'accueil</Button>
            </Link>
          </Center>
        </Box>
      </ChakraProvider>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Error!">
      <ChakraProvider>
        <Box h={"100vh"} w={"100vw"}>
          <Center h={"100%"} w={"100%"} flexDirection={"column"} gap={"1rem"}>
            <Heading as={"h1"}>Oh ! Une erreur est survenue !</Heading>
            <Link to={"/"}>
              <Button>Revenir à l'accueil</Button>
            </Link>
          </Center>
        </Box>
      </ChakraProvider>
    </Document>
  );
}
