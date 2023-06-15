import { Box, List, ListItem, Text, Link } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <header>
      <Box
        display={"flex"}
        bg={"gray.700"}
        px={9}
        py={5}
        alignItems={"center"}
      >
        <Text fontSize={"2xl"} as={"h1"} color={"teal.400"} fontWeight={"bold"} pr="10rem" >
          Eden Admin
        </Text>
        <List gap={"6rem"} display={"flex"}>
          <ListItem fontSize={"xl"} as={"li"}>
            <Link href={"/"}>
                 <Text color={"white"}>Home</Text>
            </Link>
          </ListItem>
          <ListItem fontSize={"xl"} as={"li"}>
            <Link href={"/stories"}>
              <Text color={"white"}>Stories</Text>
            </Link>
          </ListItem>
          <ListItem fontSize={"xl"} as={"li"}>
            <Link href={"/test-bug-css"} >
              <Text color={"white"}>test-bug-css</Text>
            </Link>
          </ListItem>
        </List>
      </Box>
    </header>
  );
}
