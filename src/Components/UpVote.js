import { Fragment } from "react";

import { ThumbUpIcon } from "@heroicons/react/outline";

import "firebase/compact/database";
import {
  FirebaseDatabaseNode,
  FirebaseDatabaseTransaction,
} from "@react-firebase/database";

import {
    IfFirebaseAuthedAnd,
  } from "@react-firebase/auth";

const s = (a) => JSON.stringify(a, null, 2);

export default function UpVote(props) {
  const path = `/upvotes/${props.record.id}`;
  return (
    <Fragment>
      {props.record.id && (
        <div className="flex">
          <FirebaseDatabaseNode path={`${path}`}>
            {(d) => {
              console.log('d',d);
              return (
                <div>{d.value && <pre className="mr-2">{s(Object.keys(d.value).length)}</pre>}</div>
              );
            }}
          </FirebaseDatabaseNode>

          <IfFirebaseAuthedAnd
            filter={({ providerId }) => true}
          >
            {({ user }) => {
                return (
          <FirebaseDatabaseTransaction path={`${path}/${user.uid}`}>
            {({ runTransaction }) => {
              return (
                <div>
                  <button
                    onClick={() => {
                      runTransaction({
                        reducer: (val) => {
                          if (val === null) {
                            return 1;
                          } else {
                            return val + 1;
                          }
                        },
                      }).then(() => {
                        console.log("Ran transaction");
                      });
                    }}
                  >
                    <ThumbUpIcon className="h-6 w-6" />
                  </button>
                </div>
              );
            }}
          </FirebaseDatabaseTransaction>
                )

            }}
            </IfFirebaseAuthedAnd>
          
        </div>
      )}
    </Fragment>
  );
}
