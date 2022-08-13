import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Text,
  Flex
} from '@chakra-ui/react'



import { useContext } from 'react'
import { BlockchainContext } from '../context/Blockchaincontext'
export default function PayForm() {
     const{makePayment} = useContext(BlockchainContext)

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  

  const  onSubmit = async (values) => {
    console.log(JSON.stringify(values, null, 2))

    const{payment} = values;
    await makePayment(payment)
   
  }

  return (
    <Flex justifyContent={'center'} alignItems={'center'} p={5} mt={2}>
    
    <form onSubmit={handleSubmit(onSubmit)}>

            <Text
              //textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              fontWeight={300}
              textAlign={'center'}
              fontSize={'xl'}
              
              //color={useColorModeValue('gray.800', 'white')}
              mt={20}
              mb={15}>
              Payment
            </Text> 
      <FormControl isInvalid={errors.payment}>
        <Input
          id='payment'
          placeholder='Payment'
          type="number"
          step="any"
          {...register('payment', {
            required: 'This is required'
          })}
        />
        <FormErrorMessage>
          {errors.payment && errors.payment.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} textAlign={'center'} fontSize={'medium'} display="flex" justifyContent="center" marginLeft="auto" marginRight="auto"  colorScheme='white' fontWeight="200" fontFamily='heading'   isLoading={isSubmitting} textColor='black' border={'1px'} shadow={'m'} borderColor="#A0AEC0" rounded={"md"}  type='submit'>
        Submit
      </Button>
      
    </form>
    
    </Flex>

    

  )

  
}