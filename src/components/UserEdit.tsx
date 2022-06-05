import { Button, Flex,Input, Stack, FormLabel, FormControl,Text, Box, useToast} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import AuthContext, { Iuser } from '../hooks/AuthContext'
import { ColorPicker } from "chakra-color-picker";
import { createRef, LegacyRef, MutableRefObject, useContext, useEffect, useRef, useState } from 'react';
import api from '../services/apiClient';
import QRCode from "react-qr-code";
import Link from 'next/link';
import html2canvas from 'html2canvas';

const UserEdit = ({onClose}:{onClose: () => void}) => {

  const toast = useToast()
  const {register, handleSubmit} = useForm()
  const {updateUser, user} = useContext(AuthContext)
  let qrCodeRef = createRef<HTMLDivElement>()
  const [fontColor,setFontColor] = useState(()=>{

    return user.fontColor

  })

  const [frontColor,setFrontColor] = useState(()=>{

    return user.frontColor

  })

  const [bgColor,setBgColor] = useState(()=>{

    return user.bgColor

  })

  const handleDonwloadQrCode = ()=>{

    if(qrCodeRef.current)
    {   
        console.log(qrCodeRef.current);
        
        html2canvas(qrCodeRef.current , {
            // // dpi: 144,
            backgroundColor: "#FFFFFF",
            // allowTaint: false,
            // taintTest: false,
        })
        .then((canvas) => {
            console.log(canvas);
            canvas.style.display = 'none';
            var image = canvas.toDataURL("png")
            var a = document.createElement("a");
            a.setAttribute('download', 'qrCode.png');
            a.setAttribute('href', image);
            a.click();
        })
    }
  }

  const handleSubmited = (data:any) =>{

    api.put("user",{
        id:user.id,
        name:data.name,
        email:data.email,
        menuName:data.menuName,
        bgColor:bgColor,
        fontColor:fontColor,
        frontColor:frontColor
    })
    .then(()=>{
        toast({
            title: 'Success',
            description: "you have successfully edited the user",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position:"top-left"
          })
        
        updateUser({
            id:user.id,
            name:data.name,
            email:data.email,
            menuName:data.menuName,
            bgColor:bgColor,
            fontColor:fontColor,
            frontColor:frontColor
        })
        onClose()
    })
    .catch(()=>{
        toast({
            title: 'Error',
            description: "could not edit user",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position:"top-left"
          })
    })

  }

  const ColorsArray = [
    "#FFF",
    "#111",
    "#CCC",
    "#171923",
    "rgba(0, 0, 0, 0.36)",
    "#1A202C",
    "#FEB2B2",
    "#C53030",
    "#38A169",
    "#1C4532",
    "#285E61",
    "#234E52",
    "#4299e1",
    "#1A365D",
    "#00A3C4",
    "#065666",
    "#6B46C1",
    "#322659",
    "#B83280",
    "#521B41"
  ]

  return (
    <Flex as="form" color="white" px="4" my="10" w="100%" maxW="580"  flexDir={"column"} onSubmit={handleSubmit(handleSubmited)} >

        <Text pt={"2"} pb="6" textAlign={"center"} mt="8" as="h2" fontSize={"2xl"} >Get Menu Link</Text>

        <Stack   spacing="6" >

            <Flex>
                <Text  as="span" pr="4" fontSize={"xl"} >Menu Url: </Text>
                <Link href={`https://my--menu.herokuapp.com/view/${user.id}`} >
                    <a>
                        <Text  as="p" color={"pink.500"} fontSize={"xl"} >here</Text>
                    </a>
                </Link>
            </Flex>
            <Text  as="span" pr="4" fontSize={"xl"} >QR COde: </Text>
            <Flex  >
                <div ref={qrCodeRef} >

                <QRCode value={`https://my--menu.herokuapp.com/view/${user.id}`} ></QRCode>
                </div>
                
            </Flex>

            <Button onClick={handleDonwloadQrCode} colorScheme={"pink"} > Download </Button>

            <hr/>
        </Stack>


        <Text pt={"2"} pb="6"  mt="8" textAlign={"center"} as="h2" fontSize={"2xl"} >Edit User Info</Text>
        <Stack   spacing="6" >

            <FormControl>
                    <FormLabel htmlFor='name' >Name</FormLabel>
                    <Input color={"black"}  p="2" focusBorderColor='blue.500'
                        {...register("name")} defaultValue={user.name}
                    bgColor={"gray.400"} variant="flushed" _hover={{bgColor:"gray.400"}} size="lg" borderColor={"gray.900"}  type="text" >
                    </Input>
            </FormControl>

            <FormControl>
                <FormLabel htmlFor='email' >Email</FormLabel>
                <Input p="2" color={"black"}  focusBorderColor='blue.500' 
                bgColor={"gray.400"} variant="flushed" _hover={{bgColor:"gray.400"}} 
                {...register("email")} defaultValue={user.email}
                size="lg" borderColor={"gray.900"} type="email" >
                </Input>
            </FormControl>
            <hr/>
        </Stack>
        
        <Text pt={"2"} pb="6" textAlign={"center"} mt="8" as="h2" fontSize={"2xl"} >Edit Menu Info</Text>

        <Stack   spacing="6" >

            <FormControl>
                <FormLabel htmlFor='name' >Menu Name</FormLabel>
                <Input color={"black"}  p="2" focusBorderColor='blue.500'
                    {...register("menuName")} defaultValue={user.menuName}
                bgColor={"gray.400"} variant="flushed" _hover={{bgColor:"gray.400"}} size="lg" borderColor={"gray.900"}  type="text" >
                </Input>
            </FormControl>

            <FormControl>
                <Flex alignItems={"center"} w="100%" >
                    <Text pr="8" fontSize={"18"} >Background Color</Text>
                    <ColorPicker defaultColor={user.bgColor}  colors={ColorsArray} onChange={(color)=>{
                        setBgColor(color)
                    }} ></ColorPicker>
                </Flex>
            </FormControl>

            <FormControl>
                <Flex alignItems={"center"} w="100%" >
                    <Text pr="10" fontSize={"18"} >Front Page Color</Text>
                    <ColorPicker defaultColor={user.frontColor}  colors={ColorsArray} onChange={(color)=>{
                        setFrontColor(color)
                    }} ></ColorPicker>
                </Flex>
            </FormControl>

            <FormControl>
                <Flex alignItems={"center"} w="100%" >
                    <Text pr="24" fontSize={"18"} >Text Color</Text>
                    <ColorPicker defaultColor={user.fontColor} colors={ColorsArray} onChange={(color)=>{
                        setFontColor(color)
                    }} ></ColorPicker>
                </Flex>
            </FormControl>
            <hr/>
        </Stack>
   
        

        <Button color={"black"}  type='submit' mt="10" bg={"#CCC"} >Edit</Button>
    </Flex>
  )
}

export default UserEdit
