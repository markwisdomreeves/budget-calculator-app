import React, {useState, useEffect} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseFrom from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from 'uuid/v4';


// FIRST STEP WE CREATE AN OBJECT
// const initialExpenses = [
//   {id: uuid(), charge: "rent", amount: 1600},
//   {id: uuid(), charge: "car payment", amount: 400},
//   {id: uuid(), charge: "credit card bill", amount: 1200}

// ];
// console.log(initialExpenses);

// THIS IS HOW TO USE THE useState METHOD OR FUNCTION
// 1. INPORT THE USESTATE METHOD
// 2. USE A FUNCTION AND RETURNS [] WITH TWO VALUES
// 3. THE FIRST VALUE IS THE ACTUAL VALUE OF THE STATE
// 4. AND THE SECOND VALUE, IS THE FUNCTION THAT RESPONSIBLE FOR THE UPDATES AND CONTROL
// 4. AND THE DEFAULT VALE


// WE ARE USING THE APPLICATION WITH LOCALSTORAGE INSTEAD OF THE THAT FIRST ONE
// IN THIS LOCALSTORAGE LOGIC IS THAT, WE ARE CHECKING INTO THE LOCALSTORAGE IF THERE IS A AN ITEM 
// IN IT, THAN IT WILL GET IT, BUT IF THERE IS NO ITEM IN IT, IT WILL SET THE ARRAY TO AN EMPTY ARRAY
// WHICH MEANS, NO ITEMS IS IN THE PAGE IN THE BROWSER APP
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses")) 
  : [];



function App() {
  // console.log(useState);

  // ALL EXPENSES AND ADD EXPENSE REACT HOOKS
  // WE ARE SETTING UP OUR STATE AND THE FUNCTION THAT CONTROL OUR  STATE  
  const [expenses, setExpenses] = useState(initialExpenses);
  // console.log(expenses);

  // SINGLE EXPENSE useSTATE HOOKS
  const [charge, setCharge] = useState("");

  // SINGLE AMOUNT useSTATE HOOKS
  const [amount, setAmount] = useState("");

  // WE ARE SETTING THE ALERT useSTATE HOOKS METHOD
  const [alert, setAlert] = useState({ show: false });

  // WE ARE SETTING THE EDIT useSTATE HOOKS
  const [edit, setEdit] = useState(true);

  // EDIT ITEM useSTATE HOOKS
  const [id, setId] = useState(0);

 // WE ARE CREATING THE useEffect hook method here
 // ***************************** USEEFFECT HOOKS *************************

// WE ARE USING THE useEffect Hooks BECAUSE IT PERFORM SIDE effects
// 1. BECAUSE IT RUNS AFTER EVERY RENDER OF THE PAGE
// 2. IT HAS TWO PARAMETERS, THE FIRST PARAMETER IS A CALLBACK FUNCTION THAT RUN AFTER A RENDER
// 3. THE SECOND PARAMETER IS AN THAT IS USE TO LET REACT KNOWS WHEN TO RUN THE useEffect HOOK
// 3. AND IT TELL REACT TO RE-RENDERS WHEN A STATE HAS CHANGED OR WHEN A PROPS HAS CHANGED
  useEffect(() => {
    // console.log("we called useEffect");
    localStorage.setItem("expenses", JSON.stringify(expenses));
    // useEffect WILL BE CALLED EVERY TIME A STATE OR A PROPS IS RENDER OR CHANGES
    // BUT IT IS NOT TOO GOOD TO CALLED THE USEEFFECT EVERY TIME, SO TO SOLVE THIS
    // PROBLEM, WE MUST PASSED IN THE ARRAY OF THE USEFFECT FUNCTION THE SAME THING WE PASS AS PARAMETER IN OUR FUNCTION. LOOK BELOW IN THE FUNCTION 
  }, [expenses]);

// ******************** FUNCTION ****************************

   // HANLDLE CHARGE METHOD
  // WE ARE CALLING THE SETCHARGE METHOD
  const handleCharge = e => {
    // console.log(`charge :  ${e.target.value}`);
    setCharge(e.target.value);
  };

  // HANLDLE AMOUNT METHOD
  // WE ARE CALLING THE SETAMOUNT METHOD
  const handleAmount = e => {
    // console.log(`amount :  ${e.target.value}`);
    setAmount(e.target.value);
  };

  // HANDLE ALERT METHOD WITH SETTIMER METHOD FOR VALIDATION ALERT
  const handleAlert = ({ type, text }) => {
    // WE CALLED THE SETALERT FROM THE SET ALERT STATE
    setAlert({ show:true, type, text });
    // WE SETTING THE SETTIMER FUNCTION OR METHOD
    setTimeout(() => {
      // WE CALLED THE SETALERT AGAIN, AND PASS IN FALSE TO REMOVE THE ALERT
      setAlert({ show:false })
    }, 3000);
  };

  // THIS IS THE SUBMIT FORM METHOD AND THE EDIT METHOD
  const handleSubmit = e => {
    e.preventDefault();
    // console.log(charge, amount);
    // WE ARE DOING A VALIDATION ON THE USER INPUT
    if (charge !== "" && amount > 0 ){
      // THIS IS THE EDIT METHOD AND LOGICS
      // IF EDIT IS SET TO TRUE, WHICH IF THE BUTTON IS CHANGE TO EDIT.
      if (edit) {
        // THEN, WE ARE USING THE MAP ARRAY METHOD TO ITERATE OVER ALL ITEMS IN THE LIST
        // AND IF AN ITEM MEETS THE CONDITION, WE STORE OR PUT THAT ITEM TO OUR NEW ARRAY USING THE SPREAD OPERATOR
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount} : item;
        });
        // THEN WE CALL THE setExpense METHOD AND PASS THE NEW ITERATED ITEMS TO IT
        setExpenses(tempExpenses);
        // THAN WE CALL THE SETEDIT METHOD AND SET IT TO FALSE
        setEdit(false);
        handleAlert({ type: "success", text: "You have Edited an item"});
      // ELSE, WE RUN THESE METHOD OR LOGICS
      } else {
        // THEN, WE ARE CREATING AN OBJECT FOR OUR NEW USER DATA
        const singleExpense = { id: uuid(), charge, amount };
        // AND THEN, WE ARE PUTTING TOGETHER THE OLD OBJECT AND NEW OJBECT
        setExpenses([...expenses, singleExpense]);
        // WE ARE CALLING THE ALERT HERE AND PASSING IN THE TPYE AND TEXT
        handleAlert({ type: "success", text: "You have added an item"});
      }
      // WE ARE SETTING THE setCharge AND setAmount TO CLEAR THE INPUTS
      setCharge('');
      setAmount('');
    } else {
      // AND THAN, WE ARE CALLING THE HANDLEALERT METHOD AND PASSING IN DANGER CLASS
      handleAlert({ type: "danger", text: "Both Fields are required"});
    }
  };

  // CLEAR ALL ITEMS METHOD OR FUNCTION
  const clearItems = () => {
    //TO CLEAR THE LIST. WE ARE JUST SETTING THE setExpenses METHOD THAT CONTROLS OUR ARRAY to an EMPTY OBJECT
    // console.log("All items are cleared");
    setExpenses([]);
    handleAlert({ type: "danger", text: "You have clear the list" });
  }

  // DELETE SINGLE ITEM METHOD OR FUNCTION
  // THE LOGIC WE WILL USE IN DELETING AN ITEM, IS THAT WE ARE GOING TO USE THE FILTER
  // METHOD ON OUR expenses array TO ITERATE OVER THE ALL THE ITEMS IN THE ARRAY, AND WE ARE GOING TO 
  // RETURN ONLY THE ITEM OR ITEMS THAT DO NOT MATCH THE UNIQUE ID, WHICH IS THE UUID
  const handleDelete = (id) => {
    // console.log(`item deleted : ${id}`);
    let tempExpenses = expenses.filter(item => item.id !== id);
    // THAN WE CALLED THE FUNCTION OR METHOD THAT CONTROLS OUR ARRAY AND PASS
    // THE NEW FILTERS OBJECT TO IT
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "An item has been deleted from the list" });
  }

  // EDIT SINGLE ITEM METHOD OR FUNCTION
  // THE LOGIC WE WILL USE IN EDITING AN ITEM, IS THAT WE ARE GOING TO USE THE FIND
  // METHOD AND A CALL BACK FUNCTION ON OUR expenses array TO ITERATE OVER THE ALL THE ITEMS IN THE ARRAY, AND WE ARE GOING TO 
  // RETURN ONLY THE ITEM OR ITEMS THAT DO NOT MATCH THE UNIQUE ID, WHICH IS THE UUID
  const handleEdit = (id) => {
    // console.log(`item edited : ${id}`);
    let expense = expenses.find(item => item.id === id);
    // WE ARE DECONSTRUCTING BOTH THE charge and amount items AND ASSIGN THE 
    // expense VARIABLE TO THEM
    let { charge, amount } = expense;
    // AND WE ARE SETTING EACH ITEM BACK INTO THE INPUT FIELD AGAIN
    setCharge(charge);
    setAmount(amount);
    // WE CALL THE setState hooks or function and change the edit to true
    setEdit(true);
    // THAN, WE DO THE SAME FOR THE setId useState FUNCTION
    setId(id)
  };


  return (
   <>
      {/* WE ARE SENDING THIS PROPS TO THE ALERT COMPONENT */}
      {alert.show && <Alert type={alert.type} text={alert.text} />}

     <Alert />
     <h1>React Budget Calculator App</h1>
     <main className="App">
       {/* WE ARE PASSING THEM AS A PROPS TO THEIR COMPONENTS BEFORE USING IT */} 
        <ExpenseFrom 
          charge={charge} 
          amount={amount} 
          handleAmount={handleAmount} 
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />

        <ExpenseList
        // WE ARE PASSING THEM AS A PROPS TO THEIR COMPONENTS BEFORE USING IT  
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
     </main>
     <h1>
       total spending :{" "}
       <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
       </span>
     </h1>
   </>
   
  //  THIS IS THE OTHER WAY
  //  <React.Fragment>
  //     <Alert />
  //     <ExpenseFrom />
  //     <ExpenseList />
  //  </React.Fragment>

  );
}

export default App;
