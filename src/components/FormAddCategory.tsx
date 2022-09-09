import { Button, Flex,Input, Stack, FormLabel, FormControl,Text, Textarea } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Router from "next/router"
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import api from '../services/apiClient'


const FormAddCategory = ({close}: { close: () => void }) => {

  const {register, handleSubmit} = useForm()
  const toast = useToast()
  
  const handleFormAddCategory = async (data:any)=>{
    
    
    api.post("room",{
        name:data.name,
        description:data.description,
        short_description:data.short_description,
        prices:data.prices
    })
    .then(()=>{
    
      toast({
        title: 'Success',
        description: "you have successfully created the room",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position:"top-left"
      })

      Router.push("/dashboard")
      close()

    })
    .catch((e)=>{
      toast({
        title: 'Error',
        description: "could not create the category",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position:"top"
      })
    })
  }
  
  

  return (
    <Flex
    
    w={"100%"}
    h={"100%"}
    justifyContent="center"
    alignItems={"center"}
    padding="8"
    >
      <Flex as="form" color="white" w="100%" bg="gray.900" flexDir={"column"} onSubmit={handleSubmit(handleFormAddCategory)} >

        <Text pt={"2"} pb="6" textAlign={"center"} as="h2" fontSize={"2xl"} >Add Room</Text>
        <Stack   spacing="6" >
          
          <FormControl>
            <FormLabel htmlFor='name' >Name</FormLabel>
            <Input p="2" color={"black"}  focusBorderColor='blue.500' 
              bgColor={"gray.400"} variant="flushed" _hover={{bgColor:"gray.400"}} 
              {...register("name")}
              size="lg" borderColor={"gray.900"} type="text" required >
            </Input>

            <FormLabel mt="6"  htmlFor='description' >Description</FormLabel>
            <Textarea p="2" color={"black"}  focusBorderColor='blue.500' 
              bgColor={"gray.400"} variant="flushed" _hover={{bgColor:"gray.400"}} 
              {...register("description")}
              size="lg" borderColor={"gray.900"}  required >
            </Textarea>

            <FormLabel mt="6"  htmlFor='short_description' >Short Description</FormLabel>
            <Textarea p="2" color={"black"}  focusBorderColor='blue.500' 
              bgColor={"gray.400"} variant="flushed" _hover={{bgColor:"gray.400"}} 
              {...register("short_description")}
              size="lg" borderColor={"gray.900"}  required >
            </Textarea>


            <FormLabel mt="6" htmlFor='prices' >Prices</FormLabel>
            <Textarea p="2" color={"black"}  focusBorderColor='blue.500' 
              bgColor={"gray.400"} variant="flushed" _hover={{bgColor:"gray.400"}} 
              {...register("prices")}
              size="lg" borderColor={"gray.900"} required >
            </Textarea>
          </FormControl>

          <Button color={"black"}  type='submit' mt="6" bg={"#CCC"} >Add</Button>

        </Stack>
        
        

      </Flex>
    </Flex>
  )
}

export default FormAddCategory
