import { Button, Stack, Flex , Stat, StatNumber, 
    Box, Text, Icon, useDisclosure, Popover,  PopoverContent, PopoverArrow, 
    PopoverCloseButton, useToast, StatLabel } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'

import Router  from 'next/router'
import { FocusLock } from '@chakra-ui/focus-lock'
import { parseCookies } from 'nookies'
import { FaPlus, FaTrash } from 'react-icons/fa'
import FormAddItem from '../../components/FormAddItem'
import { Header } from '../../components/Header'
import { useContext, useEffect, useRef, useState } from 'react'
import AuthContext, { Iuser } from '../../hooks/AuthContext'
import { useRouter } from 'next/router'
import api from '../../services/apiClient'


interface ISnack{
    id: string,
    name: string,
    price: string
}

const Items: NextPage<{user:Iuser}> = (props) => {

  const { onOpen, onClose, isOpen } = useDisclosure() 
  const toast = useToast()
  const router = useRouter()

  const { category_id } = router.query

  const [items, setItems] = useState<ISnack[]>([])

  const removeItem = (snack_id:string)=>
  {
    api.delete(`snack/${snack_id}`)
    .then(()=>{
        toast({
            title: 'Sucess',
            description: "item deleted successfully",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position:"top-left"
          })
    })
    .catch(()=>{
        toast({
            title: 'Error',
            description: "could not delete the item",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position:"top-left"
          })
    })
  }

  useEffect(()=>{
      
    if(!props.user || !category_id)
        Router.push("/logIn")

    api.get(`listsnacks/${category_id}`)
    .then((res)=>{ 
        setItems(res.data.snacks)
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
            
            <Stack spacing={"8"}  overflowY={"auto"} px="6" py="16" maxW="980" m="0 auto" >
                
                <Flex w="100%"  justifyContent={"center"} >
                    <Text mr="auto"   justifySelf={"center"} fontSize={"2xl"} mb="3" textAlign="center" as="h1" >items</Text>
                    <Button onClick={onOpen}  ml="auto" colorScheme={"blue"} >Add Item</Button>
                        <Popover
                            isOpen={isOpen} 
                            onOpen={onOpen}
                            onClose={onClose}
                            placement='bottom'
                            closeOnBlur={false}
                        >
                            
                            <FocusLock persistentFocus >
                            <PopoverContent border="0" m="10px" _focus={{border:"0"}} position={"relative"} minW="350px" w="80%" bg="gray.900">
                                    <FormAddItem category_id={category_id} close={onClose} />
                                    
                                    <PopoverCloseButton />
                                    
                            </PopoverContent>
                            </FocusLock>
                        </Popover>
                </Flex>

                {
                    (!!items && items.length > 0) ?
                    items.map(item=>(
                        <Flex key={item.id} alignItems="center" pl="2" bg={"#CCC"} borderRadius="10" color="black"  w="100%" h="20" >
                            <Stat>
                                <StatLabel fontSize={"24"} >{item?.name}</StatLabel>
                                <StatNumber fontStyle={"20"} > {item?.price} € </StatNumber>
                                
                            </Stat>
                            <Icon as={FaTrash} fontSize="20" ml="auto" mr="4" 
                                    color={"red.700"} _hover={{cursor:"pointer"}} onClick={()=>{removeItem(item.id)}} >  
                            </Icon>
                        </Flex>
                    ))

                    :

                    <Text>Add new items to start</Text>
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

export default Items

