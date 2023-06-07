import { Box, List, ListItem, Text } from "@chakra-ui/react";
import { Link } from "@remix-run/react";

export default function Navbar() {
  return (
    <header>
      <Box
        display={"flex"}
        bg={"gray.700"}
        px={9}
        py={5}
        as="nav"
        alignItems={"center"}
      >
        <Text fontSize={"2xl"} as={"h1"} color={"teal.400"} fontWeight={"bold"} pr="10rem" >
          Eden Admin
        </Text>
        <List gap={"6rem"} display={"flex"}>
          <ListItem fontSize={"xl"} as={"li"}>
            <Link to={"/"}>
                 <Text color={"white"}>Home</Text>
            </Link>
          </ListItem>
          <ListItem fontSize={"xl"} as={"li"}>
            <Link to={"/stories"}>
              <Text color={"white"}>Stories</Text>
            </Link>
          </ListItem>
        </List>
      </Box>
    </header>
  );
}
