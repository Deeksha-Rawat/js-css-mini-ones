//listen for submit

document.getElementById('loan-form').addEventListener('submit',function(e){
    //hide result
    document.getElementById('results').style.display = 'none';
    
    
    //show loader
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResult, 2000);
    
    e.preventDefault();
});

//calculate results
function calculateResult(e){
    console.log('calculating...');

    //UI Vars

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayment = parseFloat(years.value) * 12;


    //compute monthly payment

    const x = Math.pow(1+ calculatedInterest , calculatedPayment);
    const monthly = (principal * x * calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly *  calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment )-principal).toFixed(2);

        //show results
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';

    }else{
        showError('Please check your number');
    }



    
}


//SHOW ERROR{
    function showError(error){
        document.getElementById('results').style.display = 'none';
        document.getElementById('loading').style.display = 'none';


        //create a div
        const errorDiv = document.createElement('div');
        //get elements
        const card = document.querySelector('.card');
        const heading = document.querySelector('heading');

       //add class
        errorDiv.className=" alert alert-danger";

        //create text node and append div
        errorDiv.appendChild(document.createTextNode(error));

        //insert error above heading
        card.insertBefore(errorDiv , heading);

        //clear error after 3 seconds
        setTimeout(clearError,3000);
    }

    //clear
    function clearError(){
        document.querySelector('.alert').remove();
    }

