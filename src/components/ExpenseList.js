import React from 'react';
import ExpenseItem from './ExpenseItem';
import { MdDelete } from 'react-icons/md';

const ExpenseList = ({ 
// WE ARE CLABING THE PROPS HERE FROM THE APP COMPONENT
    expenses,
    handleEdit,
    handleDelete,
    clearItems
}) => {
    return (
       <>
        <ul className="list">
            {expenses.map((expense) => {
                return <ExpenseItem key={expense.id}
                                         expense={expense}
// WE ARE STILL PASSING THESE TWO FUNCTION AS PROPS HERE AND GRABBING IT FROM THE EXPENSE ITEM COMPONENT 
                                         handleEdit={handleEdit}
                                         handleDelete={handleDelete} 
                                        />;
            })}
        </ul>
        
        {/* THE DELETE BUTTON
        THE BUTTON WILL NOT DISPLAY WHEN NO ITEM ON THE PAGE, BUT
        WILL DISPLAY WHEN THERE IS ITEM ON THE PAGE */}
        {expenses.length > 0 && (
            <button className="btn" onClick={clearItems}>
                clear expenses
                {/* THE DELETE ICON */}
                <MdDelete className="btn-icon" />
            </button>
        )}
       </>
    );
};

export default ExpenseList
