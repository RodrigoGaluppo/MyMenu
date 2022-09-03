import { Button, Flex,Input, Stack, FormLabel, FormControl,Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Router from "next/router"
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import AuthContext from '../hooks/AuthContext'
import { useToast } from '@chakra-ui/react'
import api from '../services/apiClient'


const SignIn: NextPage = () => {

  const {register, handleSubmit} = useForm()
  const toast = useToast()
  const {signIn,user, token} = useContext(AuthContext)
  
  const handleSignIn = async (data:any)=>{
    
    if(data.password !== data.passwordConfirmation)
    {
        toast({
            title: 'Error',
            description: "passwords must match",
            status: 'error',
            duration: 9000,
            isClosable: true,
            position:"top-left"
          })
        
        return
    }


    api.post("user",{
        name: data.name,
        email:data.email,
        password:data.password
    })
    .then(()=>{
      
        toast({
            title: 'Success',
            description: "user was successfully created, now you may log in",
            status: 'success',
            duration: 9000,
            isClosable: true,
            position:"top-left"
        })
    
      Router.push("/logIn")

    })
    .catch(()=>{
      toast({
        title: 'Error',
        description: "could not create the user",
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

        <Text pt={"2"} pb="6" textAlign={"center"} as="h2" fontSize={"2xl"} >Create Account</Text>
        <Stack   spacing="6" >
          
        <FormControl>
            <FormLabel htmlFor='name' >Name</FormLabel>
            <Input p="2" color={"black"}  focusBorderColor='blue.500' 
              bgColor={"gray.400"} variant="flushed" _hover={{bgColor:"gray.400"}} 
              {...register("name")}
              size="lg" borderColor={"gray.900"} type="text" >
            </Input>
          </FormControl>

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

          <FormControl>
            <FormLabel htmlFor='passwordConfirmation' >Password Confirmation</FormLabel>
            <Input color={"black"}  p="2" focusBorderColor='blue.500'
                {...register("passwordConfirmation")}
              bgColor={"gray.400"} variant="flushed" _hover={{bgColor:"gray.400"}} size="lg" borderColor={"gray.900"}  type="password" >
            </Input>
          </FormControl>

          <Button color={"black"}  type='submit' mt="6" bg={"#CCC"} >Submit</Button>

        </Stack>
        
        

      </Flex>
    </Flex>
  )
}

export default SignIn
