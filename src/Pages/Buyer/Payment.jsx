import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CoinPurchase from "./CoinPurchase";


// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_keys);
const Payment = () => {
    return (
        <div>
            <div>
                <Elements stripe={stripePromise}>
                    <CoinPurchase ></CoinPurchase>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;