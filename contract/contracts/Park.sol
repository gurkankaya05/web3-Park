// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Park{
    struct Renters{ // Renters 
        address payable renter;
        uint start;
        uint end;
        uint due;
        uint balance;
        bool canRent;
        bool active;
    
    }
    address public owner; //

  

    mapping(address => Renters) public renters; 

    constructor(){
        owner = msg.sender;

    }

    function addRenter(address payable walletAdress,  uint start,uint end,uint due,uint balance,bool canRent,bool active)external{ 
        renters[walletAdress] = Renters(walletAdress , start,end,due,balance,canRent,active);
        require(start > 0 , "err!");
 }

    function checkIn(address walletAdress)external{
        require(renters[walletAdress].due == 0, "you have a pending balance");
        renters[walletAdress].start  = block.timestamp;
        renters[walletAdress].canRent = false;
        renters[walletAdress].active = true;        
    }

    function checkOut(address walletAdress) external{
        require(renters[walletAdress].active == true, "You have a not rent a park!" );
         renters[walletAdress].active = false; 
         renters[walletAdress].canRent = true; 
         renters[walletAdress].end  = block.timestamp;
    }

    function renderTimespan(uint start , uint end) internal pure returns(uint){
        return end - start;
    }

    function balanceOfRenter(address walletAdress)external view returns (uint){
        return renters[walletAdress].balance;
    }

    function balanceOf()external view returns (uint){
        return address(this).balance;
    }

   function getTotalDuration(address walletAdress) public view returns (uint){
        if(renters[walletAdress].start == 0 || renters[walletAdress].end == 0) {
            return 0;
        } else{
        uint timespan = renderTimespan(renters[walletAdress].start, renters[walletAdress].end);
        uint timespanInMinutes = timespan / 60;
        return timespanInMinutes;
        }
   }

   function canRentPark(address walletAdress) external view returns(bool){
       return renters[walletAdress].canRent;
   }

    function isActive(address walletAddress)external view returns(bool){
        return renters[walletAddress].active;
    }
    

    function getRenter(address walletAdress) external view returns(uint _balance ,uint _due , bool _canRent , bool _active, uint _start , uint _end , address _walletAdress){
            _balance = renters[walletAdress].balance;
            _due = renters[walletAdress].due;
            _canRent = renters[walletAdress].canRent;
            _active = renters[walletAdress].active;
            _start  = renters[walletAdress].start;
            _end  = renters[walletAdress].end;
            _walletAdress = renters[walletAdress].renter;
        
    }
    function deposit(address walletAddress)external payable{
        require(msg.value > 0 , "Value must be bigger than 0");
        renters[walletAddress].balance += msg.value;
    }
    
    function makePayment(address walletAddress) external payable {
        require(renters[walletAddress].due >0 , " You haven't rented a place!!");
        require(renters[walletAddress].balance >= msg.value ,"Please make a deposit!");
        renters[walletAddress].balance -= msg.value;
        renters[walletAddress].start = 0;
        renters[walletAddress].end = 0;
        renters[walletAddress].active = false;
        renters[walletAddress].canRent =true;
    }


    function setDue(address walletAddress)external{
        uint timespanMinutes = getTotalDuration(walletAddress);
        uint fiveMinuteIncrements = timespanMinutes / 5;
        renters[walletAddress].due = fiveMinuteIncrements * 5000000000000000;
    }
    function getDue(address walletAdress)external view returns(uint){
        return renters[walletAdress].due;
    }


    


}