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
import Header from "./Header.js";
import { get, useForm } from "react-hook-form";
import api from "./api.js";

const hasPremiumAccess = () =>
  localStorage.getItem("bitcloutoffersPremiumCalendar") === "DiamondCalendar";

export default function New() {
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(false);

    // form 2
    const {
        register: register2,
        errors: errors2,
        handleSubmit: handleSubmit2,
        setValue: setValue2
      } = useForm();

    const onSubmit2 = async (data) => {
        console.log(data);
    }

    // form 1
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "onBlur"
      });

      const onSubmit = async (data) => {
          setLoading(true);
          const post = await api.getPost(data.posthashhex);
          console.log(post);
          setPost(post);
        //   setValue2("username", post["ProfileEntryResponse"]["Username"]) // get the current loggedIn user
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
            
            <label name="posthashhex" class="col-span-1">Post Id</label>
            <input
              placeholder="Paste Your Post Hash"
              class="col-span-3 border inline-flex items-center justify-center px-5 py-3 border border-indigo text-base font-medium rounded-md text-indigo"
              type="input"
              {...register("posthashhex", { required: true })}
            />

            { post && post["PostFound"] &&
            <Fragment>
            <div class="mt-8 col-span-4"></div>
            <div class="col-span-1 font-bold">Body</div>
            <div class="col-span-3">
                { post["PostFound"]["Body"] }
            </div>

            <div class="col-span-1 font-bold">Username</div>
            <div class="col-span-3">
                ${ post["PostFound"]["ProfileEntryResponse"]["Username"] }
            </div>

            <div class="mb-8 col-span-4"></div>
            
            </Fragment>
            }

            <label name="posthashhex" class="col-span-1">Details</label>
            <textarea
              placeholder="Anything else you'd like us to know?"
              class="col-span-3 border inline-flex items-center justify-center px-5 py-3 border border-indigo text-base font-medium rounded-md text-indigo"
              type="input"
              {...register("details", { required: false })}
            />
            <input
              type="submit"
              value="Submit Post"
              class="col-end-5 col-span-1 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            />
          </form>


    
{/* 
            <div class="mt-8 font-bold text-xl">Build your Event</div>

          <form
            class="grid grid-cols-2 gap-2 mt-4"
            onSubmit={handleSubmit2(onSubmit2)}
          >

            <label htmlFor="label">Title</label>
            <input
              placeholder="Paste Your Post Hash"
              class="col-span-8 border inline-flex items-center justify-center px-5 py-3 border border-indigo text-base font-medium rounded-md text-indigo"
              type="input"
              {...register2("title", { required: true })}
            />


            <label htmlFor="label">Description</label>
            <input
              placeholder="Paste Your Post Hash"
              class="col-span-8 border inline-flex items-center justify-center px-5 py-3 border border-indigo text-base font-medium rounded-md text-indigo"
              type="input"
              {...register2("description", { required: true })}
            />

            <label htmlFor="label">Start Time</label>
            <input
              placeholder="Paste Your Post Hash"
              class="col-span-8 border inline-flex items-center justify-center px-5 py-3 border border-indigo text-base font-medium rounded-md text-indigo"
              type="input"
              {...register2("startTime", { required: true })}
            />

            <input  
              placeholder="Paste Your Post Hash"
              class="col-span-8 border inline-flex items-center justify-center px-5 py-3 border border-indigo text-base font-medium rounded-md text-indigo"
              type="input"
              {...register2("createdBy", { required: true })}
            />

            <input
              type="submit"
              value="Post Hash"
              class="col-span-4 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            />
          </form>
         */}
        

    </Fragment>
  );
}
