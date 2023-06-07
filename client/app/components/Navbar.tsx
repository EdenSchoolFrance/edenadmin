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
        alignItems={"center"}
      >
        <Text fontSize={"2xl"} as={"h1"} color={"teal.400"} fontWeight={"bold"}>
          Eden Admin
        </Text>
        <List spacing={3} as="nav">
          <ListItem fontSize={"xl"} as={"li"}  display={'flex'} flexDirection={"row"} >
            <Link to={"/"}>
                 <Text color={"white"} pr="2rem">Home</Text>
            </Link>
            <Link to={"/stories"}>
              <Text color={"white"} pr="2rem">Stories</Text>
            </Link>
          </ListItem>
        </List>
      </Box>
    </header>
  );
}
