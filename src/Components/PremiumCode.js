import { React, Fragment} from "react";
import { useForm } from "react-hook-form";

export default function PremiumCode() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
      if (data.password == "DiamondCalendar") {
          setPremiumAccess()
          

          setTimeout(function(){ window.location.reload();; }, 5000);

          alert("You have enabled the 💎 calendar! Please do not share the code.");
      } else {
          alert("Sorry that code is incorrect!");
      }
  }

  const setPremiumAccess = () => {
    localStorage.setItem('bitcloutoffersPremiumCalendar', 'DiamondCalendar');
  }

  const removePremiumAccess = () => {
    alert("Took off diamond level access");
    localStorage.removeItem('bitcloutoffersPremiumCalendar');
  }

  const hasPremiumAccess = () => localStorage.getItem('bitcloutoffersPremiumCalendar') === "DiamondCalendar";

  return (
    <Fragment>
          <p className="text-md font-bold m-4">
            {!hasPremiumAccess() && (
              <div class="">
                <p class="text-lg">Invest (0.1 or more) In @BitcloutOffers to See 💎 Events</p>
                <p class="text-sm text-blue-600">DM <a href="https://www.bitclout.com/u/bitcloutoffers" class="underline" target="_blank">@bitcloutoffers</a> for 💎 events code</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    class="border inline-flex items-center justify-center px-5 py-3 border border-indigo text-base font-medium rounded-md text-indigo mr-2 w-80"
                    type="password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && <p>Passcode is incorrect</p>}
                  <input type="submit" value="Submit" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700" />
                </form>
              </div>
            )}

            {hasPremiumAccess() && (
                <form onSubmit={handleSubmit(removePremiumAccess)}>
                <input type="submit" value="💎 Level Access Enabled" />
                </form>
            )}
          </p>
    </Fragment>
  )
}
