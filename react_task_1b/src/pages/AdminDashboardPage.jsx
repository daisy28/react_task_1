import React from "react";

const AdminDashboardPage = () => {
  async function paginate () {
    const response = await fetch("https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-project": base64Encode,
      },
      Authorization: "Bearer " + localStorage.getItem("token"),
      body: JSON.stringify({
        payload: {},
        page: 1,
        limit: 10
      }),
    });
    if (response.status === 200) {
      console.log("true")
    } else {
      console.log("false");
    }
  }

  paginate().then(
    console.log(response.json())
  )

  return (
    <>
      <div className="w-full text-7xl h-screen text-gray-700 ">
        <header className="mt-[4rem]">
        This is the header
        </header>
      </div>
    </>
  );
};

export default AdminDashboardPage;
