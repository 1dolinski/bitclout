

import { React, Fragment, useState, useEffect, useCallback } from "react";
import Header from "./Header.js";
import api from "./api.js";

export default function Events() {
  return (
    <Fragment>
      <Header
        title="Build Your BitClout"
        subtitle="Watch List"
        description="Check in on your favorite creators. When were they last active?"
        unsplashId="photo-1500462918059-b1a0cb512f1d"
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:items-center lg:justify-between">
        {/* <div>
          <PremiumCode />
        </div> */}

        <div class="text-3xl font-bold">See When Creators Were Last Active</div>
        {
          <div class="h-12 font-bold text-gray-500">
            {refreshing && "💎 Refreshing... "}
          </div>
        }
        {
          <form
            class="grid grid-cols-12 gap-2"
            onSubmit={handleSubmit(async (data) => {
              await addCreator(data.username);
            })}
          >
            <input
              placeholder="Type a username..."
              class="col-span-6 border inline-flex items-center justify-center px-5 py-3 border border-indigo text-base font-medium rounded-md text-indigo"
              type="input"
              {...register("username", { required: true })}
            />
            <input
              type="submit"
              value="Add User"
              class="col-span-3 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            />
          </form>
        }
        <div>
          {watchlist &&
            watchlist.creators &&
            Object.values(watchlist.creators)
              .sort((a, b) => {
                console.log(
                  "sorting?",
                  a.lastPosted,
                  b.lastPosted,
                  a.creator,
                  b.creator
                );
                return a.lastPosted - b.lastPosted;
              })
              .map((creator) => creator.creator)
              .map(
                (creator) =>
                  creator && (
                    <div class="flex">
                      <div class="flex-grow">
                        <WatchListCreator
                          creator={watchlist["creators"][creator]}
                        />
                      </div>
                      <button
                        class="underline ml-4"
                        onClick={() => removeCreator(creator)}
                      >
                        Remove
                      </button>
                    </div>
                  )
              )}

          {watchlist && creatorList().length == 0 && (
            <div class="text-lg mt-16 font-semibold">Add your first user! 💎 </div>
          )}
        </div>
        <button
          class={`col-span-3 mt-24 bg-gray-300 hover:bg-gray-400 text-white font-bold py-3 px-3 rounded`}
          onClick={() => clearWatchList()}
        >
          Clear Watchlist
        </button>

        {/* <div id="embed"></div> */}
      </div>

      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Thanks To BitClout's</span>
            <span className="block text-indigo-600">OG Hype Creators</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow mr-4">
              <a
                href="https://www.bitclout.com/u/brockpierson"
                target="_blank"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <div
                  class="h-20 w-20 max-w-xs max-h-xs rounded mr-2"
                  style={{
                    backgroundImage: `url("data:image/webp;base64,UklGRqoFAABXRUJQVlA4IJ4FAABwFwCdASpkAEwAPm0uk0YkIqGhK/nboIANiWMAxcDCCQy+rePzI+lFAjs3/R5o/hCYKaZXDA9R7Pg9O+wh0skAhCIISuflsRWXtCf98hlG18xItIQI3lgg7SY3g30HssKn3RVzR842akZbNMwOqDOqnGuEDapBs1faBs4MXCkGodHcXSFjC3KJ+1/58kATn8VoRcKk+M24XbLJNOFdzx7TnIofn0qz/0PrlQx/s1EIKZU1///27s03APi+zpcCMkPqWd6AAP77T4ezyiIPe0zqV6dS4X3unJQJtt59PNXccsvWAadD3xZ1dMpA7krE71cT7cn55hztNVYXSUR5mWNOJ6Oqw+1Y5hU+r+ms5vQWBV4yt5R61Uds3+J6+uJ5xU6U/NfjxKOKRz48fSaD6LYavqSN061/C1e4YajjVsXbybIXLPBneZLibYOtX62HKh1ZYHez/Z0jcZlQSH/bKrs2I1KjkE0/cAM5bQAn1N2Xc6Fiw8qGedbnAyBPGh7KVGlEmlEVDBHEHNGdKUkrH/kuQi/VsloJoeDwJLajr9sCHKNDSK4VBIVY6W/f2iauX7+vBzhHD/102m0cOnwL7+oONx3SaDyi5Pas/1rf+68ZQNrxSb7VBzXPTdkwiASYwlOHRKcxq0IN1xQVq8DN0wqrvfgiby8NySjLewm1mcAPqd8Pp5H9//pFI871hb5z8TYpVE2Np4Pe/nQ92z815IHQxKeM6Vu5UONTcJDKNqUjNv217B7+hI8F6fsjbmZgOHT3R+uvoH6TbX1N8nf7xW7LuFErJVg7g1pWIsjooRWgrgSlIO3OWqRCevgi2DiB/9AxaH7Jt54SzSbP93/Q5pLKNCom5TzVtwjcsOXdGQmQ3ifkBp17HdnkhbgWCArVcmWnF0n3jV8vSWZ5eA96SCgteaGh/i1a+ohjvjWjeDew5GOHYWpOCPdRvur3nA9UVJhRjaoPzq5sxw2GJIWDiwZLngg0EjFf2FXuvmLXHx7jJDnyUf3tpP9wHkrMJxzKaoKVPdvxx/m8nwa7za6YqamL4LS75siO4e3p1jEA6oOY5rU3p0Yz7rItz4dvRH6DRtYz4SiURRzgVr0Athr408HsPptRPavJzRy8WKHxSSe+i3yGrOuto5q1P8pzT3JxeFdPFbcx4CxSl4xIViAT6/jvC41l9lODz9z9ymy7/9nRSoPmKrm6I03YvOVpSGhFAH5ZDAmy0wvCqZ9KpX4BzQbPeAhkOEVt/9QNvpmcSeVUrdVdzq+Ev02KSVH95aXBRgx7DZjyqhFpOyJiwRPG3APlhkLptd5I4TQdcil2WnV7MwQ5vHv7gx6I8qOglND1iq0f7DZEr+xkfkx/KSVx6JNa8b1rnek5dpuRZqI6PHXEVncBr6S4puIG7oziTtZ5te/KZzH/2j6DIqDbpeDZ1++2BYAJiiQxTnx4MGxqIJKvGDT+RZvw7DAOOXRuH7nnKjwrBlzFWTybb1/C3Rk4/9+0c1ccARSYbVbdIn57Mkym9XVmBEQ5dumvEr79qyJVE0rE1zzclq+1NZRtXE+a2YPr+OhmywemoQ+8Dcd/s/Zhm2C+vPo8exffso7IsdZ2glrRxuEQJkgxBvD0kl3MuynqrBdV1f7DPFLz7h/S21WBxi0Y3onCIjyDOzA5MLgT6lxQihr7Ek9obROvrOWo/DQxdyq3yeVIXdjMSt8lmEFtmacL5+XTFV+SQAUvZZXbg5q6chV3Cnoh8GHnp83lr0cys73ptU8rfq6kcvTvI9bUQuXt4FBZIMXkwhP4osgRbOiDhDWhBkw5Y/id+6kkZpxmm+iUvY6BJ28+MQpnZe2wrO79w9tXMWyo4gY363pgJa4b8YxCE0NtczSyChDQ2Rq3MVngBb3fMhWsFd0ma9RmMuj7o19xio1MdT8+oAAA")`,
                    backgroundSize: "cover",
                  }}
                ></div>
                Brock Pierson
              </a>
            </div>
            <div className="inline-flex rounded-md shadow">
              <a
                href="https://www.bitclout.com/u/RajLahoti"
                target="_blank"
                className="font-semibold inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <div
                  class="h-20 w-20 max-w-xs max-h-xs rounded mr-2"
                  style={{
                    backgroundImage: `url("data:image/webp;base64,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")`,
                    backgroundSize: "cover",
                  }}
                ></div>
                Raj Lahtoi
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-16 mb-16 pull-right">
        <span id="embed"></span>
      </div>
    </Fragment>
  );
}
