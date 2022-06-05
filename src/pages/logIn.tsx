import { Button, Flex,Input, Stack, FormLabel, FormControl,Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Router from "next/router"
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import AuthContext from '../hooks/AuthContext'
import { useToast } from '@chakra-ui/react'
import Link from 'next/link'


const SignIn: NextPage = () => {

  const {register, handleSubmit} = useForm()
  const toast = useToast()
  const {signIn,user, token} = useContext(AuthContext)
  
  const handleSignIn = async (data:any)=>{
    
    
    signIn({
      email:data.email, password: data.password
    })
    .then(()=>{
    
      toast({
        title: 'Success',
        description: "you have successfully signed in",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position:"top-left"
      })

      Router.push("/dashboard")

    })
    .catch(()=>{
      toast({
        title: 'Error',
        description: "could not find the user",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position:"top"
      })
    })
  }
  
  useEffect(()=>{
    if(user && token)
    {
      Router.push("/dashboard")
    }
  })

  return (
    <Flex
    
    w={"100vw"}
    h={"100vh"}
    justifyContent="center"
    alignItems={"center"}
    padding="8"
    >
      <Flex as="form" color="white" p="8" w="100%" maxW="580" bg="gray.900" flexDir={"column"} onSubmit={handleSubmit(handleSignIn)} >

        <Text pt={"2"} pb="6" textAlign={"center"} as="h2" fontSize={"2xl"} >Login</Text>
        <Stack   spacing="6" >
          
          

          <FormControl>
            <FormLabel htmlFor='email' >Email</FormLabel>
            <Input p="2" color={"black"}  focusBorderColor='blue.500' 
              bgColor={"gray.400"} variant="flushed" _hover={{bgColor:"gray.400"}} 
              {...register("email")}
              size="lg" borderColor={"gray.900"} type="email" >
            </Input>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor='password' >Password</FormLabel>
            <Input color={"black"}  p="2" focusBorderColor='blue.500'
                {...register("password")}
              bgColor={"gray.400"} variant="flushed" _hover={{bgColor:"gray.400"}} size="lg" borderColor={"gray.900"}  type="password" >
            </Input>
          </FormControl>

          <Link href={"/createAccount"} >
            <a><Text pt={"2"} pb="2" textAlign={"left"} as="p" color={"pink"} fontSize={"1xl"} >Create an Account</Text></a>
          </Link>

          <Button color={"black"}  type='submit' mt="6" bg={"#CCC"} >Entrar</Button>

        </Stack>
        
        

      </Flex>
    </Flex>
  )
}

export default SignIn
