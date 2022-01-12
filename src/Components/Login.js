import { React, Fragment, useState, useEffect, useReducer } from "react";
import api from "../api.js";


export default function Login() {
    const [hodlrs, setHodlrs] = useState([]);

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);


    const setPremiumAccess = () => localStorage.setItem('bitcloutoffersPremiumCalendar', 'DiamondCalendar');
    const removePremiumAccess = () => localStorage.removeItem('bitcloutoffersPremiumCalendar');
    const hasPremiumAccess = () => localStorage.getItem('bitcloutoffersPremiumCalendar') === "DiamondCalendar";

      

    const currentUserKey = 'bitcloutoffersCurrentUser';

    const getHodlers = async () => {
      const response = await api.getHodlersForPublicKey("BitCloutOffers");
      console.log("getHodlers", response);
      setHodlrs(response);
    };

    function logout() {
        localStorage.removeItem(currentUserKey);
        removePremiumAccess();
        forceUpdate();
    }
  
    const currentUser = localStorage.getItem(currentUserKey);

    const isUserAHolder = () => {
        if (hodlrs.Hodlers) {
            const isHodlr = hodlrs.Hodlers.filter(user => user.HasPurchased).map(user => user.HODLerPublicKeyBase58Check).includes(currentUser);

            isHodlr ? setPremiumAccess() : removePremiumAccess();

            return isHodlr;
        }
    }

    useEffect(() => {
      const holders = getHodlers();
    }, []);


    function login() {
        identityWindow = window.open('https://identity.bitclout.com/log-in', null, 'toolbar=no, width=800, height=1000, top=0, left=0');    
    }
    
    function handleInit(e) {
        if (!init) {
            init = true;
            iframe = document.getElementById("identity");
    
            for (const e of pendingRequests) {
                postMessage(e);
            }
            
            pendingRequests = []
        }
        respond(e.source, e.data.id, {})
    }
    
    function handleLogin(payload) {
        if (identityWindow) {
            identityWindow.close();
            identityWindow = null;
    
            localStorage.setItem(currentUserKey, payload.publicKeyAdded);
            forceUpdate();
            window.location.reload(false);
        }
    }
    
    function respond(e, t, n) {
        e.postMessage({
            id: t,
            service: "identity",
            payload: n
        }, "*")    
    }
    
    function postMessage(e) {
        init ? this.iframe.contentWindow.postMessage(e, "*") : pendingRequests.push(e)    
    }
    
    window.addEventListener('message', message => {
    
        const {data: {id: id, method: method, payload: payload}} = message;    
    
        if (method == 'initialize') {
            handleInit(message);
        } else if (method == 'login') {
            handleLogin(payload);
        }
    });
    
    var init = false;
    var iframe = null;
    var pendingRequests = [];
    var identityWindow = null;

    
    return (
        <Fragment>
            <iframe id="identity" frameborder="0" src="https://identity.bitclout.com/embed?v=2" style={{"display": "none"}}></iframe>

            {
                currentUser ? isUserAHolder() ? 
            <button onClick={() => logout()} type="button">
                💎 Access Enabled - Logout
            </button> : 
            <button onClick={() => logout()} type="button">
                <p class="text-lg"><span class="font-semibold">Not a Hodlr - </span> Invest (0.1 or more) In @BitcloutOffers to See 💎 Events - logout</p>
            </button>  :
            <button onClick={() => login()} id="login" type="button">
                Login with BitClout
            </button>    

            }
            
            <div class="mt-6" id="loggedin">
                
            </div>
        </Fragment>
    )
}