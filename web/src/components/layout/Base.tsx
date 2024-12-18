import { Outlet } from "react-router-dom";

function Base() {
  return (
    <>
      {/* <UiComponent.Header /> */}
      <Outlet />
      {/* {enabledGlobalLoading && <UiComponent.Loading />} */}
    </>
  );
}

export default Base;
