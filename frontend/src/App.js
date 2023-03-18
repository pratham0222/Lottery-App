import React, { useState, useEffect } from "react";
import web3 from "./web3";
import lottery from "./lottery";
 
function App() {
  const [data, setData] = useState({
    manager: "",
    players: [],
    balance: "",
  });
  const [value,setValue] = useState("");
  const [message,setMessage] = useState("");
 
  useEffect(() => {
    const fetchData = async () => {
      const [manager, players, balance] = await Promise.all([
        lottery.methods.manager().call(),
        lottery.methods.getPlayers().call(),
        await web3.eth.getBalance(lottery.options.address)
      ]);
      setData({
        manager,
        players,
        balance
      });
    };
    fetchData();
  }, [data]);

  const handleSubmit = async(event) =>{
    event.preventDefault();

    const accounts= await web3.eth.getAccounts();
    setMessage("Waiting on transaction success...")
    await lottery.methods.enter().send({
      from:accounts[0],
      value:web3.utils.toWei(value,'ether')
    })
    setMessage("You Have Been Entered")
  }

  const handlePickWinner = async(event) =>{
    const accounts = await web3.eth.getAccounts();
    setMessage("Waiting on transaction success...");
    await lottery.methods.pickWinner().send({
      from:accounts[0]
    })
    setMessage("The winner has been picked!");
  }

    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
        This contract is managed by {data.manager}.
        There are {data.players.length} people entered, competing to win {web3.utils.fromWei(data.balance,'ether')} ether!
        </p>

        <hr/>

        <form onSubmit={handleSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              onChange={event=>setValue(event.target.value)}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr/>
        <h4>Ready to pick a winner?</h4>
        <button onClick={handlePickWinner}>Pick a Winner!</button>
        
        <hr/>

        <h3>{message}</h3>
      </div>
    );
  
}
export default App;