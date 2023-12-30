import { Outlet, useParams } from "react-router-dom";
import Drawer from "../components/drawer";
import { useCallback, useEffect, useState } from "react";
import { redirect } from "react-router-dom";

import drawerStateContext from "../services/providers/drawerStateHandlers";
export async function action({ request }) {
  const formData = await request.formData();
  const { id } = Object.fromEntries(formData);
  return redirect(`/${id}`);
}
export default function Root() {
  let { docId } = useParams();
  let [drawerState, setDrawerState] = useState("opened");
  const handleToggle = useCallback(() => {
    setDrawerState((prev) => {
      const nextValue = prev === "opened" ? "closed" : "opened";
      return nextValue;
    });
  }, []);
  useEffect(() => {
    if (!docId) {
      setDrawerState("opened");
    }
  }, [docId]);
  return (
    <main className="grid h-screen max-h-screen grid-cols-[auto_minmax(auto,_1fr)] overflow-hidden bg-white dark:bg-dark-100">
      <drawerStateContext.Provider
        value={{ drawerState, handleToggle, setDrawerState }}
      >
        <Drawer drawerState={drawerState} />
        <Outlet />
      </drawerStateContext.Provider>
    </main>
  );
}
