import React, { memo, useCallback, useState } from 'react';
import { Card } from 'react-bootstrap';

import { SelectComponent } from '../../app_components';

function Title(){
   console.log("title rendering")
   return(
      <div>
         <h2>useCallback Hook</h2>
      </div>
   )
}

const TitleMemo = memo(Title);

function Count(props){
   console.log("Count Rendering")
   return(
      <div>
         {props.text} is {props.count}
      </div>
   )
}
const CountMemo = memo(Count)

function Button(props) {
   console.log(`Button clicked ${props.children}`);
   return (
      <div>
         <button onClick = {props.handleClick}> {props.children} </button>
      </div>
   );
}
const ButtonMemo = memo(Button)

function ParentComponent() {
   const [age, setAge] = useState(25);
   const [salary, setSalary] = useState(25000)

   // const incrementAge = () => {
   //    setAge(age + 1);
   // }
   // with Callback
   const incrementAge = useCallback(() => {
      setAge(age + 1);
   }, [age])
   
   const incrementSalary = useCallback(() => {
      setSalary(salary + 1000);
   }, [salary])

   return (
      <div>
         {/* <Title/> */}
         <TitleMemo />
         {/* <Count text="age" count={age} /> */}
         <CountMemo text="age" count={age} />
         {/* <Button handleClick={incrementAge}>Increment my age</Button> */}
         <ButtonMemo handleClick={incrementAge}>Increment my age</ButtonMemo>
         {/* <Count text="salary" count={salary} /> */}
         <CountMemo text="salary" count={salary} />
         <ButtonMemo handleClick={incrementSalary}>Increment my salary</ButtonMemo>
      </div>
   );
}

const FormCard1 = memo(() => {
   return (
      <div className="row mx-2">
         <div className="col-md-4">
            <Card>
               <Card.Body>
                  <Card.Title>Form</Card.Title>
                  <Card.Text>
                     <SelectComponent />
                  </Card.Text>
               </Card.Body>
            </Card>
         </div>
         <div className="col-md-4">
            <div className="card">
               <h5 className="card-title px-3 pt-3 text-end text-decoration-underline">
                  Modal
               </h5>
               <div className="card-body">
                  <SelectComponent />
               </div>
            </div>
         </div>
         <div className="col-md-4">
            <ParentComponent />
         </div>
      </div>
   )
})

export default FormCard1;