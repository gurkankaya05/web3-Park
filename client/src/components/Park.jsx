import { Stack,Button , Box , Image ,Text} from "@chakra-ui/react";
import React from "react";



import { useForm } from 'react-hook-form'

import { useContext } from 'react'

import { BlockchainContext } from "../context/Blockchaincontext";


const Park = ({park}) => {
 
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

 
  const {currentAccount} = useContext(BlockchainContext)
  

  const onSubmit = async (values) => {
    values['canRent'] = true;
    values['active'] = false;
    values['balance'] = 0;
    values['due'] = 0;
    values['start'] = 1;
    values['end'] = 0;
   const newValuesObject = {walletAddress: currentAccount,...values}
   const {walletAddress,canRent,active,balance,due,start,end} = newValuesObject
  addRenter(walletAddress,canRent,active,balance,due,start,end)

    
    
  }


return(
  <form onSubmit={handleSubmit(onSubmit)}>
   <Box boxSize='lg' mx={3}>
    <Image src ={park} mb={4}/>
    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor justo ac diam rutrum, vel posuere turpis laoreet. Morbi porttitor diam vitae arcu fermentum gravida. </Text>
    <Stack spacing={0} direction={'column'} align={'center'} justify={'center'} mt={1}>
    <Button mt={4} m={4} textAlign={'center'} fontSize={'medium'} display="flex" justifyContent="center" marginLeft="auto" marginRight="auto"  colorScheme='white' fontFamily='heading' fontWeight="200"  textColor='black' border={'1px'} shadow={'m'} borderColor="#A0AEC0" rounded={"md"}  type='submit'>
        Check Out
      </Button>

      <Button mt={4} textAlign={'center'} fontSize={'medium'} display="flex" justifyContent="center" marginLeft="auto" marginRight="auto"  colorScheme='white' fontFamily='heading' fontWeight="200"  textColor='black' border={'1px'} shadow={'m'} borderColor="#A0AEC0" rounded={"md"}  type='submit'>
        Check In
      </Button>

    </Stack>

   </Box>
   </form>
)
}

export default Park;