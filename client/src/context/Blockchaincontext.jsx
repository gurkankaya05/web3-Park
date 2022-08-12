import React, { useState } from "react"
import { abi, contractAddress } from "../config.json";

import { ethers } from "ethers";
import { useEffect } from "react";

export const BlockchainContext = React.createContext("");

export const BlockchainProvider = ({ children }) => {

        const [currentAccount, setCurrentAccount] = useState("");
        const [balance,setBalance] = useState();
        const [renterExists,setRenterExists] = useState();
        const [renter, setRenter] = useState();
        const [renterBalance , setRenterBalance] = useState();
        const [due,setDue] = useState();
        const [duration,setDuration] = useState();
      


        //Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        // Metamask 

        const address = contractAddress; // Contract address

        //Abi   
        const contractAbi = abi;


        // The Contract Object
        const contract = new ethers.Contract(address, contractAbi, signer);

        // const addRenter = async (walletAddress, canRent, active, balance, due, start, end) => {
        //         try {

        //                 if(currentAccount){
        //                         const addRenter = await contract.addRenter(walletAddress, canRent, active, balance, due, start, end);
        //                 await addRenter.wait();
        //                 setRenter(renter);
        //                 }
                 



        //         } catch (error) {
        //                 console.log(error)
        //         }


        // }

        const addRenter = async (walletAddress,canRent,active,balance,due,start,end) => {
                try {
                  const addRenter = await contract.addRenter(walletAddress,canRent,active,balance,due,start,end)
                  await addRenter.wait()
                  console.log(` ${walletAddress} added!`)
                  
                   setRenter(renter);
                 } catch (error) {
                   console.log(error)
                 }
            
            
              }




        //Connect Wallet Function
     
                const checkIfWalletConnected = async () => {
                        try {
                        if (!window.ethereum) return alert("Plase install Metamask");
                        const accounts = await provider.send("eth_accounts");
                        if (accounts.length) {
                        setCurrentAccount(accounts[0])
                        }
                        else {
                        console.log("No Accounts Found.")
                        }
                        } catch (error) {
                        console.log(error)
                
                        }
                }



        //Contract balance
        const getBalance = async () => {
                try {
                    const contractBalance = await contract.balanceOf();
                    setBalance(ethers.utils.formatEther(contractBalance))
                } catch (error) {
                    console.log(error)
                }
              }


        //Get Renter
         const getRenter = async () => {
    try {
      if(currentAccount){
        const renter = await contract.getRenter(currentAccount)
       setRenter(renter)
      }
      
     } catch (error) {
       console.log(error)
     }


  }
        //Get Renter

        const connectWallet = async () => {
                try {
                        if (!window.ethereum) return alert("Please install Metamask!");
                        const accounts = await provider.send("eth_requestAccounts");
                        console.log("Current Account :", accounts[0]);
                        setCurrentAccount(accounts[0]);


                } catch (error) {
                        console.log(error);
                        throw new Error("No ethereum Object");

                }

              
        }

        const getRenterBalance = async() => {
                try {
                  if(currentAccount){
                    const balance = await contract.balanceOfRenter(currentAccount)
                    setRenterBalance(ethers.utils.formatEther(balance))
                  }
                } catch (error) {
                  console.log(error)
                  
                }
              }


  const deposit = async(value) => {
        try {
           const avaxValue = ethers.utils.parseEther(value) ;
           const deposit = await contract.deposit(currentAccount , {value:avaxValue})
           await deposit.wait()
           await getRenterBalance();
          }
         catch (error) {
          console.log(error)
        }
      }


  const getDue = async() => {
        try {
          if(currentAccount){
            const due = await contract.getDue(currentAccount)
            setDue(ethers.utils.formatEther(due))
          }
          }
         catch (error) {
          console.log(error)
          
        }
      }

      const getTotalDuration = async() => {
        try {
          if(currentAccount){
            const totalDuration = await contract.getTotalDuration(currentAccount)
            setDuration(Number(totalDuration))
          }
          }
         catch (error) {
          console.log(error)
          
        }
      }

      const makePayment = async(value) => {
        try {
          const avaxValue = ethers.utils.parseEther(value) ;
          const deposit = await contract.makePayment(currentAccount , {value:avaxValue})
          await deposit.wait()
          await getRenter()
          await getRenterBalance()
          await getTotalDuration()
          await getDue();
          }
         catch (error) {
          console.log(error)
          
        }
      }
      const checkOut = async() => {
        try {
          const checkOut = await contract.checkOut(currentAccount)
          await checkOut.wait()
          await getRenter()
          
          
        } catch (error) {
          console.log(error);
        }
      }

      const checkIn = async() => {
        try {
            const checkIn = await contract.chechkIn(currentAccount)
            await checkIn.wait()
            await getRenter()
            await getDue()
            await getTotalDuration()
        } catch (error) {
          console.log(error);
        }
        
      }



        useEffect(() => {
                checkIfWalletConnected()
                getRenterBalance()
                getDue()
                getTotalDuration()

        }, [currentAccount])


        return (

                <BlockchainContext.Provider value={{
                
                        connectWallet,
                        currentAccount,
                        addRenter,
                        renterBalance,
                        deposit,
                        due,
                        duration,
                        renter,
                        makePayment,
                        checkOut,
                        checkIn
                }}>

                        {children}
                </BlockchainContext.Provider>


        )


}