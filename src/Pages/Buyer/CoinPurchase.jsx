import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const CoinPurchase = () => {
  const [error, setError] = useState("");
  const [clientSecret,setClientSecret]=useState('')
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure=useAxiosSecure();
  const [user]=useCart();
  const {users}=useAuth();
  const totalPrice=user.reduce((total,item)=>total+item.coin,0)
  
  useEffect (()=>{
   axiosSecure.post('/create-payment-intent',{price: totalPrice})
   .then(res=>{
    console.log(res.data.clientSecret)
    setClientSecret(res.data.clientSecret)
   })
  },[axiosSecure,totalPrice])
  
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

    if (error) {
      console.log('pay  error',error)
      setError(error.message)
    }

   else{
    console.log('pay',paymentMethod)
    setError("")
   }
   //confirm payment
   const {paymentIntent, errors} = await stripe.confirmCardPayment(clientSecret, {
    payment_method: paymentMethod.id,
    billing_details: {
      email: users?.email || 'anonymous',
      name: users?.name || 'anonymous',
    },
  });
   if(errors){
    console.log('confirm error')
   }
   else{
    console.log('payment intent',paymentIntent)
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
