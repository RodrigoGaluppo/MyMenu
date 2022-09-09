import { Button, Stack, Flex , Stat, StatNumber, 
    Box, Text, Icon, useDisclosure, Popover,  PopoverContent, PopoverArrow, 
    PopoverCloseButton, useToast, useColorModeValue, Textarea, FormControl, Input, FormLabel,Image, Center, Heading } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'

import Router  from 'next/router'
import { FocusLock } from '@chakra-ui/focus-lock'
import { parseCookies } from 'nookies'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { Header } from '../../components/Header'
import { useContext, useEffect, useRef, useState } from 'react'
import AuthContext, { Iuser } from '../../hooks/AuthContext'
import { useRouter } from 'next/router'
import api from '../../services/apiClient'
import { useForm } from 'react-hook-form'
import FormAddPhoto from '../../components/FormAddPhoto'


interface IRoom{
    _id: string,
    name: string,
    prices: string,
    description:string
    short_description:string
}

interface Iimage{
    _id:string
    filename:string
}

const Rooms: NextPage<{user:Iuser}> = (props) => {

  const { onOpen, onClose, isOpen } = useDisclosure() 
  const toast = useToast()
  const router = useRouter()

  const { room_id } = router.query

  const [Room, setRoom] = useState<IRoom>()

  const [images,setImages] = useState<Iimage[]>([])

  const {register, handleSubmit} = useForm()

  const removeroom = (roomPhoto_id:string)=>
  {

    api.delete(`roomPhoto/${roomPhoto_id}`)
    .then(()=>{
        toast({
            title: 'Sucess',
            description: "image deleted successfully",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position:"top-left"
          })

          api.get(`room/${room_id}`)
            .then((res)=>{ 

                setRoom(res.data.room)
                setImages(res.data.images)
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
    .catch(()=>{
        toast({
            title: 'Error',
            description: "could not delete the image",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position:"top-left"
          })
    })
  }

  const handleEdit = ( data: any)=>
  {
    api.put(`room`,{
        room_id:Room?._id,
        name:data.name,
        description: data.description,
        short_description:data.short_description,
        prices:data.short_description
    })
    .then((res)=>{ 

        setRoom(res.data.room)
        setImages(res.data.images)
        toast({
            title: "Success",
            description: "room edited",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position:"top-left"
          })
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
  }

  useEffect(()=>{
  
    if(!props.user || !room_id)
        Router.push("/")

    api.get(`room/${room_id}`)
    .then((res)=>{ 

        setRoom(res.data.room)
        setImages(res.data.images)
        
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
  },[])

  return (
   <>
    <Header user={props.user}  />

    <Box  w="100vw" h="80" >
            
        <Stack spacing={"8"}  overflowY={"auto"} px="6" py="16" maxW="980" m="0 auto"  >
                
            <Text mr="auto"   justifySelf={"center"} fontSize={"2xl"} mb="3" textAlign="center" as="h1" >Informaçao do {Room?.name} </Text>
            <Stack as="form" onSubmit={handleSubmit(handleEdit)} spacing="6" >
        
                <FormControl>
                    <FormLabel htmlFor='name' >Name</FormLabel>
                    <Input p="2" color={"black"} defaultValue={Room?.name}  focusBorderColor='blue.500' 
                    bgColor={"gray.400"} variant="flushed" _hover={{bgColor:"gray.400"}} 
                    {...register("name")}
                    size="lg" borderColor={"gray.900"} type="text" required >
                    </Input>

                    <FormLabel mt="6"  htmlFor='description' >Description</FormLabel>
                    <Textarea p="2" defaultValue={Room?.description}  color={"black"}  focusBorderColor='blue.500' 
                    bgColor={"gray.400"} variant="flushed" _hover={{bgColor:"gray.400"}} 
                    {...register("description")}
                    size="lg" borderColor={"gray.900"}  required >
                    </Textarea>

                    <FormLabel mt="6"  htmlFor='short_description' >Short Description</FormLabel>
                    <Textarea p="2" defaultValue={Room?.short_description}  color={"black"}  focusBorderColor='blue.500' 
                    bgColor={"gray.400"} variant="flushed" _hover={{bgColor:"gray.400"}} 
                    {...register("short_description")}
                    size="lg" borderColor={"gray.900"}  required >
                    </Textarea>


                    <FormLabel mt="6" htmlFor='prices' >Prices</FormLabel>
                    <Textarea p="2" defaultValue={Room?.prices}  color={"black"}  focusBorderColor='blue.500' 
                    bgColor={"gray.400"} variant="flushed" _hover={{bgColor:"gray.400"}} 
                    {...register("prices")}
                    size="lg" borderColor={"gray.900"} required >
                    </Textarea>
                </FormControl>

                <Button color={"black"} type='submit' mt="6" bg={"#CCC"} >Edit</Button>

            </Stack>
            <Flex w="100%"  justifyContent={"center"} >
                <Text mr="auto"   justifySelf={"center"} fontSize={"2xl"} mb="3" textAlign="center" as="h1" >Fotos</Text>
                <Button onClick={onOpen}  ml="auto" colorScheme={"blue"} >Add Photo</Button>
                    <Popover
                        isOpen={isOpen} 
                        onOpen={onOpen}
                        onClose={onClose}
                        placement='bottom'
                        closeOnBlur={false}
                    >
                        
                        <FocusLock persistentFocus >
                        <PopoverContent border="0" m="10px" _focus={{border:"0"}} position={"relative"} minW="350px" w="80%" bg="gray.900">
                                
                            <FormAddPhoto room_id={Room?._id} close={onClose} ></FormAddPhoto>
                            <PopoverCloseButton />
                        </PopoverContent>
                        </FocusLock>
                    </Popover>
            </Flex>
                <Flex flexWrap={"wrap"} justifyContent={"space-between"} py={4}>
                {
                    (!!images && images.length > 0) ?
                    
                    images.map(image=>(
                        /*
                        <Flex key={image._id} alignItems="center" pl="2" bg={"#CCC"} borderRadius="10" color="black"  w="100%" h="20" >
                            <Stat>
                                <StatLabel fontSize={"24"} >{image?.filename}</StatLabel>
                                <Image src={`https://paraisodapenha.herokuapp.com/images/${image.filename}`} ></Image>
                            </Stat>
                            <Icon as={FaTrash} fontSize="20" ml="auto" mr="4" 
                                    color={"red.700"} _hover={{cursor:"pointer"}} onClick={()=>{removeroom(image._id)}} >  
                            </Icon>
                        </Flex>*/
                    <Box 
                        role={'group'}
                        p={4}
                        w={{
                            sm:"100%",
                            md:"50%",
                            lg:"50%"
                        }}
                        m="4"
                        bg={"gray.900"}
                        boxShadow={'2xl'}
                        rounded={'lg'}
                        pos={'relative'}
                        zIndex={1}>
                        <Box
                            rounded={'lg'}
                            
                            pos={'relative'}
                            height={'300px'}
                           
                            >
                            <Image
                                rounded={'lg'}
                                height={300}
                                width={400}
                                objectFit={'cover'}
                                src={`https://paraisodapenha.herokuapp.com/images/${image.filename}`}
                            />
                        </Box>
                        <Stack pt={10} align={'center'}>
                       
                        <Button onClick={()=>{removeroom(image._id)}} fontSize={'2xl'} bg="black.900" _hover={{backgroundColor:"black.800"}} border={"1px solid white"} fontFamily={'body'} fontWeight={500}>
                            Delete <Icon  as={FaTrash} fontSize="20" ml="4" mr="4" 
                                    color={"red.700"} _hover={{cursor:"pointer"}}  >  
                            </Icon>
                        </Button  >
                        
                        </Stack>
                    </Box>
                            
                    ))

                    :

                    <Text>nao ha fotos</Text>
                   
                }
                </Flex>
            </Stack>
        </Box>

        
   </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx)=>
{
    const token = parseCookies(ctx)["@paraisoMenu:token"]
    const user = parseCookies(ctx)["@paraisoMenu:user"]

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

export default Rooms

