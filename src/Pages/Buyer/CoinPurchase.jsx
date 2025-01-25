import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const CoinPurchase = () => {
  const [error, setError] = useState("");
  const [clientSecret,setClientSecret]=useState('')
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure=useAxiosSecure();
  const {user}=useAuth()
  const {state}=useLocation();
  const { price, coins } = state || {};
  

  useEffect (()=>{
   axiosSecure.post('/create-payment-intent',{price})
   .then(res=>{
    //console.log(res.data)
    setClientSecret(res.data.clientSecret)
   })
  },[axiosSecure,price])
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      //setError("Card element not found.");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    console.log('Payment method created:', paymentMethod);
    if (error) {
      console.log('pay  error',error)
      setError(error.message)
    }
    
   else{
    console.log('pay',paymentMethod)
    setError("")
   }
   //confirm payment
   const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card:card,
      billing_details: {
        email: user?.email || 'anonymous',
        name: user?.name || 'anonymous',
      },
    }
  });
  if (confirmError) {
    console.error('Confirm payment error:', confirmError);
    setError(confirmError.message);
  } 
  else {
    if (paymentIntent.status === 'succeeded') {
      console.log('transaction id', paymentIntent.id);
      setTransactionId(paymentIntent.id);

      // now save the payment in the database
      const payment = {
          email: user.email,
          price,
          transactionId: paymentIntent.id,
          date: new Date(), 
          coinsPurchased: coins,
          
      }

      const res = await axiosSecure.post('/payments', payment);
      console.log('payment saved', res.data);
     // refetch();
      if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Purchase complete",
              showConfirmButton: false,
              timer: 1500
          });
        
      }

  }

    }
     
  }
  return (
    <form onSubmit={handleSubmit}>
       <Helmet>
          <title>Earnify | DashBoard | Purchase</title>
         </Helmet>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay $
      </button>
      {error && <p className="text-red-600">{error}</p>}
      {/* {transactionId && (
        <p className="text-green-600">
          Transaction ID: <strong>{transactionId}</strong>
        </p>
      )}  */}
    </form>
  );
};

export default CoinPurchase;
