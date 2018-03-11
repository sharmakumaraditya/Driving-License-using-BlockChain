pragma solidity ^0.4.19;

contract ForkDrivingLicense {
	struct License {
	string name;
	string sex;
	uint age;
	string reason;
	int fine;
	}


mapping (address => License) public licenses;

function AddDL(string newName,string newSex,uint newAge,string newReason,int newFine,address addr){
	licenses[addr].name = newName;
	licenses[addr].sex = newSex;
	licenses[addr].age = newAge;
	licenses[addr].reason = newReason;
	licenses[addr].fine = newFine;
	
}
function GetDL(address addr) public returns (string name,string sex,uint age,string reason,int fine){
	return (licenses[addr].name, licenses[addr].sex, licenses[addr].age, licenses[addr].reason, licenses[addr].fine);
}
function AddFine(address addr,int Nfine,string Nreason) public {
	licenses[addr].fine += Nfine;
	licenses[addr].reason = Nreason;

}


}