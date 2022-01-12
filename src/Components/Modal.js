/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/outline";
import dateFormatter from "../dateFormatter.js";
import Tag from "./Tag.js";

export default function Modal(props) {
  const cancelButtonRef = useRef();

  // let date;
  // if (event) {
  //   date = DateTime.fromSeconds(event.DateValue.seconds).toLocaleString(
  //     DateTime.TIME_SIMPLE
  //   );
  //   if (event.DateAllDay) {
  //     date = "All-day"
  //   }
  // } else {
  //   date = "2;";
  // }

  let date = "2";

  const { event } = props;

  return (
    <>
      {event && (
        <Transition.Root show={props.open} as={Fragment}>
          <Dialog
            as="div"
            static
            className="fixed z-10 inset-0 overflow-y-auto"
            initialFocus={cancelButtonRef}
            open={props.open}
            onClose={() => props.close()}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <CalendarIcon
                          className="h-6 w-6 text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h4"
                          className="text-md leading-6 font-bold text-red-700"
                        >
                          <div>
                            {dateFormatter.dateValue(
                              event.startTime,
                              event.precision,
                              "start"
                            )}
                            {event.endTime &&
                              dateFormatter.dateValue(
                                event.endTime,
                                event.precision,
                                "end"
                              )}
                          </div>
                        </Dialog.Title>
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          {/* {event.premium ? "💎" : ""} */}
                          {event.title}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 mb-4">
                            {event.description}
                          </p>
                          {(event.tags.length > 0 ||
                            event.users.length > 0) && (
                            <div class="flex">
                              
                              {event.tags.map((tag) => (
                                <Tag
                                  name={tag}
                                  tagColor="blue"
                                  class="text-xxs mr-1"
                                />
                              ))}
                            </div>
                          )}

                          <div class="flex mt-8 ">
                            <div class="flex">
                              {/* <div
                                class="w-24 h-24 max-w-xs rounded mr-2"
                                style={{
                                  "background-image": `url("${event.post.data.ProfileEntryResponse.ProfilePic}")`,
                                  backgroundSize: "cover",
                                }}
                              ></div> */}
                                                    <div
                        class="h-16 w-16 max-w-xs max-h-xs rounded mr-2 inline-block align-middle	"
                        style={{
                          backgroundImage: `url("https://bitclout.com/api/v0/get-single-profile-picture/${event.post.data["ProfileEntryResponse"]["PublicKeyBase58Check"]}?fallback=https://bitclout.com/assets/img/default_profile_pic.png")`,
                          backgroundSize: "cover",
                        }}
                      ></div>
                              <div>
                                <p>
                                  <a
                                    class="font-bold"
                                    target="_blank"
                                    href={`https://wwww.bitclout.com/u/${event.post.data.ProfileEntryResponse.Username}`}
                                  >
                                    {
                                      event.post.data.ProfileEntryResponse
                                        .Username
                                    }
                                  </a>
                                </p>
                                <p>
                                  <a
                                    class="text-sm underline"
                                    target="_blank"
                                    href={`https://www.bitclout.com/posts/${event.post.data.PostHashHex}`}
                                  >
                                    Original post
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={props.close}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}
