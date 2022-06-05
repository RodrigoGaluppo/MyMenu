import {Flex, Icon, Text, Box, Avatar, HStack, useBreakpointValue, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, useDisclosure, Stack, FormControl, FormLabel} from "@chakra-ui/react"
import Router  from "next/router"
import { useContext, useEffect } from "react"
import { FaSignOutAlt, FaUser} from "react-icons/fa"
import AuthContext, { Iuser } from '../hooks/AuthContext'
import UserEdit from "./UserEdit"

export function Header({user}:{user:Iuser})
{
    const {signOut} = useContext(AuthContext)
    const { onOpen, onClose, isOpen } = useDisclosure() 
    const isDesktopVersion = useBreakpointValue({
        base:false,
        lg:true
    })

    useEffect(()=>{
        
        
        if(!user)
            Router.push("/logIn")
    })
    

    return (
        <Flex w="100%" as="header" m="0 auto" h="20" maxWidth={980} mt="4" align={"center"} px="6" >
            <Text _hover={{cursor:"pointer"}} 
            fontSize={"3xl"} onClick={()=>{Router.push("/dashboard")}}
            color={"blue.500"} as="span" fontWeight="bold" letterSpacing={"tight"} w="64" >
                my
                <Text as="span" color={"white"}  >
                    Menu
                </Text>
            </Text>

            <Flex align={"center"} ml="auto"  >

                <HStack  spacing={"6"} >
                   {user &&  
                        <Flex _hover={{cursor:"pointer"}} onClick={onOpen} >
                            <Avatar  size={"md"} name={user?.name} ></Avatar>

                            {isDesktopVersion && 
                                <Box ml="3" textAlign="left" >
                                    <Text>{user?.name}</Text>
                                    <Text color={"blue.500"} fontSize="small" >{user?.email}</Text>
                                </Box>
                            }
                            
                        </Flex>
                    }

                    <Icon as={FaSignOutAlt} onClick={()=>{signOut()}} _hover={{cursor:"pointer"}} color={"blue.600"} fontSize="20" ></Icon>
                </HStack>

                <Drawer  isOpen={isOpen} placement="end" onClose={onClose} >
                    <DrawerOverlay>
                        <DrawerContent  >
                            <DrawerCloseButton></DrawerCloseButton>
                            <DrawerBody px="1"  bg="gray.700" >
                                <UserEdit  onClose={onClose} />
                            </DrawerBody>
                        </DrawerContent>
                    </DrawerOverlay>
                </Drawer>
                
            </Flex>
        </Flex>
    )
}