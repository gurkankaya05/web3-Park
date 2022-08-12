import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stack,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { ReactNode } from 'react';
  import { BsPerson } from 'react-icons/bs';
  import { RiParkingBoxLine } from 'react-icons/ri';
  import {BiCar} from 'react-icons/bi';
  import { BsWallet } from 'react-icons/bs';
  import PayForm from './PayForm';
  import BalanceForm from './BalanceForm';  
import Park from './Park';
import Park1 from '../assets/parkkk.jpg';
  
  
  function StatsCard(props) {
    const { title, stat, icon } = props;
    return (
      <Stat
        px={{ base: 3, md: 4 }}
        py={'4'}
        shadow={'m'}
        border={'1px'}
        borderColor={useColorModeValue('gray.400', 'gray.200')}
        rounded={'xl'}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'small'} >
              {title}
            </StatLabel>
            <StatNumber fontSize={'xl'} fontWeight={'200    '}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.600', 'gray.200')}
            alignContent={'center'}>
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }
  
  export default function Dashboard() {
    return (
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'small'}>
         Your dashboard
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'Your Balance'}
            stat={'0.0 Avax'}
            icon={<BsPerson size={'2em'} />}
          />
          <StatsCard
            title={'Due'}
            stat={'0.0 Avax'}
            icon={<BsWallet size={'2em'} />}
          />
            <StatsCard
            title={'Park Minute'}
            stat={'0'}
            icon={<BiCar size={'2em'} />}
          />
          <StatsCard
            title={'Park Status'}
            stat={'Rentable'}
            icon={<RiParkingBoxLine size={'2em'} />}
          />
        </SimpleGrid>
        <Flex justifyContent={'center'} alignItems={'center'}> 

            <PayForm/>
            <BalanceForm/>
    

        </Flex>
        <Stack 
        as={Box}
        textAlign={'center'}
        spacing={{base: 8 , md:14}}
        py={{base : 20 , md:20}}
        >
          <Flex justifyContent={'center'} alignItems={'center'}>


     <Park park={Park1}/>
          </Flex>



        </Stack>

      </Box>
      
    );
    
  }