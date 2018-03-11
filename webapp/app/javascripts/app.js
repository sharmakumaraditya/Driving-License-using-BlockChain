// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/style.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import ForkDrivingLicense_artifacts from '../../build/contracts/ForkDrivingLicense.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var ForkDrivingLicense = contract(ForkDrivingLicense_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    ForkDrivingLicense.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

    });
  },


  addDrivingLic: function(){
   
    var name = document.getElementById("name").value;
    console.log(name);
var sex = document.getElementById("sex").value;
console.log(sex);
    var age = parseInt(document.getElementById("age").value);
    console.log(age);
    var addr = document.getElementById("address").value;
    console.log(addr);
var fdl;
ForkDrivingLicense.deployed().then(function(instance){
  fdl=instance;
  return fdl.AddDL(name,sex,age,"",0,addr, {from: account});
}).then(function(){
  alert('sucessfully added');
}).catch(function(e){
  console.log(e);
});
  },






getDrivingLic: function(){
  var fdl;
  var addr = document.getElementById("loginid").value;
    console.log(addr);
    ForkDrivingLicense.deployed().then(function(instance){
  fdl=instance;
   fdl.GetDL.call(addr).then(function(r){console.log(r);
   })
 });
  }






};





  // sendCoin: function() {
  //   var self = this;

  //   var amount = parseInt(document.getElementById("amount").value);
  //   var receiver = document.getElementById("receiver").value;

  //   this.setStatus("Initiating transaction... (please wait)");

  //   var meta;
  //   MetaCoin.deployed().then(function(instance) {
  //     meta = instance;
  //     return meta.sendCoin(receiver, amount, {from: account});
  //   }).then(function() {
  //     self.setStatus("Transaction complete!");
  //     self.refreshBalance();
  //   }).catch(function(e) {
  //     console.log(e);
  //     self.setStatus("Error sending coin; see log.");
  //   });
  // }


window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }

  App.start();

});
