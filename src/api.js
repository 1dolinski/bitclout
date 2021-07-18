const PROXY = "https://whispering-refuge-52033.herokuapp.com/";

const API = "https://bitcloutoffers.herokuapp.com";
// const API = "http://localhost:5000";
const ROOT_URL = "https://bitclout.com/api/v0/";
const POSTS_PUBLIC_KEY = `${ROOT_URL}get-posts-for-public-key`;
const SINGLE_PROFILE = `${ROOT_URL}get-single-profile`;
const SINGLE_POST = `${ROOT_URL}get-single-post`;
const HODLRS = `${ROOT_URL}get-hodlers-for-public-key`;
const EXCHANGE_RATE = `${ROOT_URL}`;

export default {
  getEvents: (queryString) =>
    fetch(`${API}/api/events?${queryString}`)
      .then((res) => res.json())
      .catch((err) => console.log(err)),
  updateEvent: (data) =>
    fetch(`${API}/api/events`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .catch((err) => console.log(err)),
  getExchangeRate: fetch(`${PROXY}${ROOT_URL}get-exchange-rate`, {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "sec-ch-ua":
        '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    referrerPolicy: "origin",
    body: null,
    method: "GET",
    mode: "cors",
  })
    .then((res) => res.json())
    .catch((err) => console.log("latest error", err)),
  getHodlersForPublicKey: (username) =>
    fetch(`${PROXY}${HODLRS}`, {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrerPolicy: "origin",
      body: `{\"PublicKeyBase58Check\":\"\",\"Username\":\"${username}\",\"LastPublicKeyBase58Check\":\"\",\"NumToFetch\":10000,\"FetchHodlings\":false,\"FetchAll\":false}`,
      method: "POST",
      mode: "cors",
    })
      .then((res) => res.json())
      .catch((err) => console.log("latest error", err)),
  getPostsForPublicKey: (username) =>
    fetch(`${PROXY}${POSTS_PUBLIC_KEY}`, {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      mode: "cors",
      referrerPolicy: "origin",
      body: `{\"PublicKeyBase58Check\":\"\",\"Username\":\"${username}\",\"LastPostHashHex\":\"\",\"NumToFetch\":1}`,
      method: "POST",
    })
      .then((res) => res.json())
      .catch((err) => console.log("latest error", err)),
  getSingleProfile: (username) =>
    fetch(`${PROXY}${SINGLE_PROFILE}`, {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      mode: "cors",
      referrerPolicy: "origin",
      body: `{\"PublicKeyBase58Check\":\"\",\"Username\":\"${username}\"}`,
      method: "POST",
    })
      .then((res) => res.json())
      .catch((err) => console.log("latest error", err)),
  getPost: (postHashHex) =>
    fetch(`${PROXY}${SINGLE_POST}`, {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      mode: "cors",
      referrerPolicy: "origin",
      body: `{\"PostHashHex\":\"${postHashHex}\",\"FetchParents\":false,\"CommentOffset\":0,\"CommentLimit\":0,\"AddGlobalFeedBool\":false}`,
      method: "POST",
    }).then((res) => res.json()),
};
