import { Button, Flex,Input, Stack, FormLabel, FormControl,Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Box } from '@chakra-ui/react'
import Router from "next/router"
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import api from '../services/apiClient'


const FormAddPhoto = ({close, room_id}: { close: () => void; room_id:string | undefined | string[] }) => {

  const {register, handleSubmit} = useForm()
  const toast = useToast()
  
  const handleFormAddPhoto = async (data:any)=>{
    
    if(!data.file)
    {
      toast({
        title: 'Error',
        description: "could not add photo",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position:"top"
      })
      return
    }

    var formData = new FormData()
    formData.append("room_image", data.file[0])
    formData.append("filename", data.file[0].name)
    api.post(`room/upload/${room_id}`,formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(()=>{
    
      toast({
        title: 'Success',
        description: "you have successfully added the item",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position:"top-left"
      })

      Router.push(`/rooms/${room_id}`)
      close()

    })
    .catch((err)=>{

      
      toast({
        title: 'Error',
        description: "could not add photo",
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
      <Flex as="form" color="white" w="100%" bg="gray.900" flexDir={"column"} onSubmit={handleSubmit(handleFormAddPhoto)} >

        <Text pt={"2"} pb="6" textAlign={"center"} as="h2" fontSize={"2xl"} >Add Item</Text>
        <Stack   spacing="6" >
          
          <FormControl>
            <FormLabel htmlFor='file' >Arquivo</FormLabel>
            <Input type="file" p="2" color={"black"}  focusBorderColor='blue.500' 
              bgColor={"gray.400"} variant="flushed" _hover={{bgColor:"gray.400"}} 
              {...register("file")}
              size="lg" borderColor={"gray.900"}  required >
            </Input>
          </FormControl>

          <Button color={"black"}  type='submit' mt="6" bg={"#CCC"} >Submit</Button>

        </Stack>
        
        

      </Flex>
    </Flex>
  )
}

export default FormAddPhoto
