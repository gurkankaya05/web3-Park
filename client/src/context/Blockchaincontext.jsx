import React,{ useState } from "react"
import{abi,contractAddress} from "../config.json";

import{ethers} from "ethers";

export const BlockchainContext = React.createContext();

export const  BlockchainProvider = ({children}) => {

const[currentAccount , setCurrentAccount] = useState("");


//Metamask
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
// Metamask 

const address = contractAddress; // Contract address

//Abi   
const contractAbi = abi;


// The Contract Object
const contract = new ethers.Contract(address, contractAbi, signer);


//Connect Wallet Function
const connectWallet = async() => {
        try {
                if(!window.ethereum) return alert("Please install Metamask!");
                const accounts = await provider.send("eth_requestAccounts");
                console.log(accounts[0]);            
                setCurrentAccount[accounts[0]]; //Set current account


        } catch (error) {
                console.log(error);
                
        }
}
//Connect Wallet Function





return(

<BlockchainContext.Provider value={{
        connectWallet, 
        currentAccount,

        
}}>

        {children}
</BlockchainContext.Provider>


)


}