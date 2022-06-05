import { Button, Flex,Input, Stack, FormLabel, FormControl,Text, Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Router from "next/router"
import Image from 'next/image'


const Home: NextPage = () => {

  return (
   <>
   
   <Flex overflowX={"unset"} h="100vh"flexDir={"column"} w="100vh" >

      <Flex as="header" w="100%"  m="0 auto" h="20" maxWidth={980} mt="4" align={"center"} px="6" >
        <Text _hover={{cursor:"pointer"}} 
                fontSize={"3xl"} onClick={()=>{Router.push("/dashboard")}}
                color={"blue.500"} as="span" fontWeight="bold" letterSpacing={"tight"} w="64" >
                    my
                    <Text as="span" color={"white"}  >
                        Menu
                    </Text>
          </Text>
      </Flex>
    

      <Flex px="10" h="100%" alignItems={"center"} w="100%" >
        
        <Box w="60%" mt="-20" >
          <Text as="h1" fontSize={["4xl","5xl"]} >The easiest way to get a Qr-Code menu to your restaurant</Text>
          <Text p="2" as="p" fontSize={["xl","2xl"]} >start using it now, completely for free and make it easy and safe for your clients to go to your restaurant</Text>
          <Button mt="4" h="16" onClick={()=>{Router.push("/logIn")}} colorScheme={"blue"} size="lg" fontSize={"2xl"} >Try it now</Button>
        </Box>


        <img src="./WorkingGuy.svg" alt="" />
      </Flex>

      </Flex>
   </>
  )
}

export default Home
