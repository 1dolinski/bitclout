import { React, Fragment, useState, useEffect, useReducer } from "react";
import api from "../api.js";

export default function DesoLogin() {

    /*
iframe used for all background requets
window is for user interaction

https://docs.deso.org/identity/identity
https://docs.deso.org/identity/concepts
https://docs.deso.org/identity/window-api/basics
https://docs.deso.org/identity/iframe-api/basics
*/


var init = false;
var iframe = null;
var pendingRequests = [];
var identityWindow = null;
const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

const currentUserKey = 'bitcloutoffersCurrentUser';

const setPremiumAccess = () => localStorage.setItem('bitcloutoffersPremiumCalendar', 'DiamondCalendar');
const removePremiumAccess = () => localStorage.removeItem('bitcloutoffersPremiumCalendar');
const hasPremiumAccess = () => localStorage.getItem('bitcloutoffersPremiumCalendar') === "DiamondCalendar";

    function login() {
        identityWindow = window.open('https://identity.deso.org/log-in', null, 'toolbar=no, width=800, height=1000, top=0, left=0');    
    }

    function logout() {
        localStorage.removeItem(currentUserKey);
        removePremiumAccess();
        forceUpdate();
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
        alert("handle login?", JSON.stringify(payload));
        if (identityWindow) {
            identityWindow.close();
            identityWindow = null;

            alert("handle login part2?", JSON.stringify(payload));
    
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

    return (
        <Fragment>
            <iframe
            id="identity"
            frameborder="0"
            src="https://identity.deso.org/embed"
            style={{
                "height": "100vh",
                "width": "100vw",
                "display": "none",
                "position": "fixed",
                "zIndex": 1000, 
                "left": 0,
                "top": 0
            }}
            ></iframe>

            <button onClick={() => login()} type="button">
                Login   
            </button>

            <button onClick={() => logout()} type="button">
                Logout   
            </button>


        </Fragment>
    )
}