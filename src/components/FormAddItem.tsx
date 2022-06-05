import { Button, Flex,Input, Stack, FormLabel, FormControl,Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Box } from '@chakra-ui/react'
import Router from "next/router"
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import api from '../services/apiClient'


const FormAddItem = ({close, category_id}: { close: () => void; category_id:string | undefined | string[] }) => {

  const {register, handleSubmit} = useForm()
  const toast = useToast()
  
  const handleFormAddItem = async (data:any)=>{
    
    if(!(!!data.price && data.price > 0))
    {
      toast({
        title: 'Error',
        description: "could not create the item",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position:"top"
      })
      return
    }

    if(!(data.name))
    {
      toast({
        title: 'Error',
        description: "could not create the item",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position:"top"
      })
      return
    }
    
    api.post("snack",{
        name:data.name,
        category_id:category_id,
        price:data.price
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

      Router.push(`/items/${category_id}`)
      close()

    })
    .catch(()=>{
      toast({
        title: 'Error',
        description: "could not create the item",
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
      <Flex as="form" color="white" w="100%" bg="gray.900" flexDir={"column"} onSubmit={handleSubmit(handleFormAddItem)} >

        <Text pt={"2"} pb="6" textAlign={"center"} as="h2" fontSize={"2xl"} >Add Item</Text>
        <Stack   spacing="6" >
          
          <FormControl>
            <FormLabel htmlFor='name' >Name</FormLabel>
            <Input p="2" color={"black"}  focusBorderColor='blue.500' 
              bgColor={"gray.400"} variant="flushed" _hover={{bgColor:"gray.400"}} 
              {...register("name")}
              size="lg" borderColor={"gray.900"} type="text" required >
            </Input>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor='price' >Price</FormLabel>
            <Box 
              p="2" color={"black"}   
              bgColor={"gray.400"} 
              
               borderColor={"gray.900"} 
            >
              <NumberInput 
              variant="flushed"  _hover={{bgColor:"gray.400"}} 
              focusBorderColor='blue.500' size="lg"
              step={0.1} defaultValue={0.00} precision={2} >

              <NumberInputField {...register("price")}  />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>

              </NumberInput>
            </Box>
            
          </FormControl>

          <Button color={"black"}  type='submit' mt="6" bg={"#CCC"} >Add</Button>

        </Stack>
        
        

      </Flex>
    </Flex>
  )
}

export default FormAddItem
