import React,{ useState } from "react"
import{abi,contractAddress} from "../config.json";

import{ethers} from "ethers";
import { useEffect } from "react";

export const BlockchainContext = React.createContext("");

export const  BlockchainProvider = ({children}) => {

 const [currentAccount, setCurrentAccount] = useState("");

 const [renter,setRenter] = useState();

 const [balance,setBalance] = useState();

 function ethToNum(val){
        return  Number(ethers.utils.formatEther(val)); 
    }

//Metamask
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
// Metamask 

const address = contractAddress; // Contract address

//Abi   
const contractAbi = abi;


// The Contract Object
const contract = new ethers.Contract(address, contractAbi, signer);

  const addRenter = async (walletAddress,canRent,active,balance,due,start,end) => {
        try {
          const addRenter = await contract.addRenter(walletAddress,canRent,active,balance,due,start,end);
                await addRenter.wait();

                setRenter(renter);

         } catch (error) {
           console.log(error)
         }
    
    
      }

//Connect Wallet Function
const connectWallet = async() => {
        try {
                if(!window.ethereum) return alert("Please install Metamask!");
                const accounts = await provider.send("eth_requestAccounts");
                console.log("Current Account :", accounts[0]);            
                setCurrentAccount(accounts[0]);


        } catch (error) {
                console.log(error);
                throw new Error("No ethereum Object");
                
        }

//Connect Wallet Function
}


//Contract balance
const getBalance  = async() => {
        try {
             const contractBalance = await contract.balanceOf()
            setBalance(ethers.utils.formatEther(contractBalance));

        } catch (error) {
                console.log(error);
        }


}

//Get Renter
const getRenter = async() => {
        try {
        
                const renter = await contract.getRenter(currentAccount);
                setRenter(renter);
                console.log(renter);
        
                
        } catch (error) {
                
        }

}
//Get Renter


useEffect(()=>{
       
},[currentAccount])


return(

<BlockchainContext.Provider value={{
        connectWallet, 
        currentAccount,
        addRenter

        
}}>

        {children}
</BlockchainContext.Provider>


)


}