import Modal from "./Components/Modal";

import { Fragment, useState, useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/outline";
import EventRow from "./Components/EventRow.js";
import Constants from "./Constants";
import firebase from 'firebase/compat/app';
import { DateTime } from "luxon";
import PremiumCode from "./Components/PremiumCode";
import Sponsors from "./Components/Sponsors";
import Login from "./Components/Login";
import DesoLogin from "./Components/DesoLogin";
import Header from "./Header.js";
import { get, useForm } from "react-hook-form";
import api from "./api.js";

const hasPremiumAccess = () =>
  localStorage.getItem("bitcloutoffersPremiumCalendar") === "DiamondCalendar";

export default function New() {
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // form 1
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "onBlur"
      });

      const onSubmit = async (data) => {
        console.log("submitting", data);
          setLoading(true);

          try {
            const post = await api.submitPost(data);

            console.log(post);

            if (!post) {
              setError(true);
            } else {
              setSubmitted(true);
            }

          } catch (error) {
            setError(true);
            return; 
          }
          // setPost(post);
          // const submitPost = await api.submitPost(data);


          setLoading(false);
      }

  return (
    <Fragment>
        
        <Header
            title="Turn Your Post"
            subtitle="Into an Event"
            description="Enter your post hash, look it over and create your event!"
            unsplashId="photo-1505373877841-8d25f7d46678"
        />

        <div class="mt-8 font-bold text-xl">Submit your Post, We'll Turn it Into An Event</div>

        <form
            class="grid grid-cols-4 gap-2 mt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            
            <label name="postHash" class="col-span-1">DeSo Post Hash</label>
            <input
              placeholder="Paste Your Post Hash"
              class="col-span-3 border inline-flex items-center justify-center px-5 py-3 border border-indigo text-base font-medium rounded-md text-indigo"
              type="input"
              {...register("postHash", { required: true })}
            />
            <label name="postHash" class="col-span-1">Details</label>
            <textarea
              placeholder="Anything else you'd like us to know?"
              class="col-span-3 border inline-flex items-center justify-center px-5 py-3 border border-indigo text-base font-medium rounded-md text-indigo"
              type="input"
              {...register("details", { required: false })}
            />
            { !submitted && !error &&
              <input
                type="submit"
                value="Submit Post"
                disabled={loading}
                class="col-end-5 col-span-1 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              />
            }

            { submitted && !error && <input type="submit"
              disabled={true}
              value="Submitted - Thank you!"
              class="col-end-5 col-span-1 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700">
              
              </input>}

              { error && <input type="submit"
              disabled={true}
              value="Something went wrong :("
              class="col-end-5 col-span-1 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-400 hover:bg-red-700">
              </input>
              }

          </form>
    </Fragment>
  );
}



// { post && post["PostFound"] &&
// <Fragment>
  
// <div class="mt-8 col-span-4"></div>
// <div class="col-span-1 font-bold">Body</div>
// <div class="col-span-3">
//     { post["PostFound"]["Body"] }
// </div>

// <div class="col-span-1 font-bold">Username</div>
// <div class="col-span-3">
//     ${ post["PostFound"]["ProfileEntryResponse"]["Username"] }
// </div>

// <div class="mb-8 col-span-4"></div>


// </Fragment>
// }