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
import { BlockchainContext } from '../context/Blockchaincontext';
export default function BalanceForm() {

  const {deposit} = useContext(BlockchainContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()


  const  onSubmit = async (values) => {
    console.log(JSON.stringify(values, null, 2))


    const{creditbalance} = values;
    await deposit(creditbalance)
   
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
              Deposit
            </Text> 
      <FormControl isInvalid={errors.creditbalance}>
        <Input
          id='creditbalance'
          placeholder='Credit Your Account'
          type="number"
          step="any"
          {...register('creditbalance', {
            required: 'This is required'
          })}
        />
        <FormErrorMessage>
          {errors.creditbalance && errors.creditbalance.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} textAlign={'center'} fontSize={'medium'} display="flex" justifyContent="center" marginLeft="auto" marginRight="auto"  colorScheme='white' fontFamily='heading' fontWeight="200"  isLoading={isSubmitting} textColor='black' border={'1px'} shadow={'m'} borderColor="#A0AEC0" rounded={"md"}  type='submit'>
        Submit
      </Button>
      
    </form>



    </Flex>

  )

  
}