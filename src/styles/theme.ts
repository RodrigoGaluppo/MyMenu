import {
    extendTheme
} from "@chakra-ui/react"

export const theme = extendTheme({
    styles:{
        global:{
            body:{
                bg:"blackAlpha.900",
                color:"white",
                overflowX:"hidden"
                
            }
        }
    }
})