import { Button, Stack,Flex,
    Box,  Text, Icon, useDisclosure, Popover, 
    PopoverContent ,
    PopoverCloseButton, useToast } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'

import Router  from 'next/router'
import { FocusLock } from '@chakra-ui/focus-lock'
import { parseCookies } from 'nookies'
import {  FaTrash } from 'react-icons/fa'
import FormAddCategory from '../components/FormAddCategory'
import { Header } from '../components/Header'
import { useEffect, useState } from 'react'
import AuthContext, { Iuser } from '../hooks/AuthContext'
import api from '../services/apiClient'

interface ICategory{
    id: string,
    name: string
}

const DashBoard: NextPage<{user:Iuser}> = (props) => {

  const { onOpen, onClose, isOpen } = useDisclosure() 
  const toast = useToast()
  const [categories, setCategories] = useState<ICategory[]>([])

  const removeCategory = (category_id:string)=>
  {
    api.delete(`category/${category_id}`)
    .then(()=>{
        toast({
            title: 'Sucess',
            description: "category deleted successfully",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position:"top-left"
          })
    })
    .catch(()=>{
        toast({
            title: 'Error',
            description: "could not delete the category",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position:"top-left"
          })
    })
  }

  useEffect(()=>{
      
    if(!props.user)
        Router.push("/logIn")

    api.get("category")
    .then((res)=>{
        setCategories(res.data.categories)
    })
    .catch(()=>{
        toast({
            title: 'Error',
            description: "could not connect to the server",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position:"top-left"
          })
    })
  })

  return (
   <>
        <Header user={props.user}  />

        <Box  w="100vw" h="80" >
            
            <Stack spacing={"8"}   overflowY={"auto"} px="6" py="16" maxW="980" m="0 auto" >
                
                <Flex w="100%"  justifyContent={"center"} >
                    <Text mr="auto"   justifySelf={"center"} fontSize={"2xl"} mb="3" textAlign="center" as="h1" >Categories</Text>
                    <Button onClick={onOpen}  ml="auto" colorScheme={"blue"} >Add Category</Button>
                        <Popover
                            isOpen={isOpen} 
                            onOpen={onOpen}
                            onClose={onClose}
                            placement='bottom'
                            closeOnBlur={false}
                        >
                            <FocusLock persistentFocus >
                            <PopoverContent border="0" m="10px" _focus={{border:"0"}} position={"relative"} minW="350px" w="80%" bg="gray.900">
                                    <FormAddCategory close={onClose} />
                                    
                                    <PopoverCloseButton />
                                    
                            </PopoverContent>
                            </FocusLock>
                            
                        </Popover>
                </Flex>

                {
                    (!!categories && categories.length > 0) ?
                    categories.map(category=>(
                        <Flex alignItems="center" pl="2" onClick={()=>{ Router.push(`/items/${category.id}`) }} _hover={{cursor:"pointer"}} bg={"#CCC"}
                         borderRadius="10" color="black"  w="100%" h="16" >
                        
                            <Text as="h3" fontSize={"20"} >{category?.name}</Text>

                            <Icon as={FaTrash} fontSize="20" ml="auto" mr="4" 
                                color={"red.700"} _hover={{cursor:"pointer"}} onClick={()=>{removeCategory(category.id)}} >  
                            </Icon>
                           
                        </Flex>
                    ))

                    :

                    <Text>Add new categories to start</Text>
                }
               
            </Stack>
        </Box>

        
   </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx)=>
{
    const token = parseCookies(ctx)["@myMenu:token"]
    const user = parseCookies(ctx)["@myMenu:user"]

    if(!user){
        return {
            redirect:{
                destination:"/",
                permanent:false
            }
        }
    }

    return {
        props:{
            user:JSON.parse(user)
        }
    }
}

export default DashBoard


